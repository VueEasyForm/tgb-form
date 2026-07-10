import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import ImageResponse from 'takumi-js/response';
import { OgCard } from '../src/components/og-card';
import { getOgImageEntries, type DocsOgEntry } from './og-entries';

const docsDirectory = new URL('../content/docs/', import.meta.url);
const publicDirectory = new URL('../public/', import.meta.url);

async function getMdxFiles(directory: URL): Promise<URL[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const url = new URL(entry.name, directory);
      return entry.isDirectory() ? getMdxFiles(new URL(`${entry.name}/`, directory)) : [url];
    }),
  );

  return files.flat().filter((file) => ['.md', '.mdx'].includes(extname(file.pathname)));
}

function getFrontmatterValue(frontmatter: string, key: 'title' | 'description') {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) throw new Error(`Missing ${key} in ${frontmatter}`);
  return match[1].replace(/^['"]|['"]$/g, '');
}

async function getDocsEntries(): Promise<DocsOgEntry[]> {
  const files = await getMdxFiles(docsDirectory);

  return Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, 'utf8');
      const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1];
      if (!frontmatter) throw new Error(`Missing frontmatter in ${file.pathname}`);

      const path = relative(docsDirectory.pathname, file.pathname).replace(/\.(md|mdx)$/, '');
      const slugs = path === 'index' ? [] : path.split('/');

      return {
        description: getFrontmatterValue(frontmatter, 'description'),
        slugs,
        title: getFrontmatterValue(frontmatter, 'title'),
      };
    }),
  );
}

async function generateOgImages() {
  const outputDirectory = new URL('./og/', publicDirectory);
  await rm(outputDirectory, { force: true, recursive: true });

  const entries = getOgImageEntries(await getDocsEntries());
  await Promise.all(
    entries.map(async ({ description, outputPath, title }) => {
      const output = new URL(outputPath, publicDirectory);
      const response = new ImageResponse(
        <OgCard
          description={description}
          title={title}
        />,
        {
          format: 'webp',
          height: 630,
          width: 1200,
        },
      );

      await response.ready;
      await mkdir(dirname(output.pathname), { recursive: true });
      await writeFile(output, Buffer.from(await response.arrayBuffer()));
    }),
  );
}

await generateOgImages();
