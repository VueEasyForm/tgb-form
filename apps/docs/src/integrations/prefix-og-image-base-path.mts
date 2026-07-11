import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

/**
 * Resolves an Astro output route to the HTML file written to the build directory.
 *
 * @param dir - The build output directory provided by Astro.
 * @param pathname - The route pathname provided by Astro.
 * @returns The absolute path to the route's generated HTML document.
 */
async function getOutputFilePath(dir: URL, pathname: string): Promise<string> {
  const outputDir = fileURLToPath(dir);
  const directoryIndex = path.join(outputDir, pathname, 'index.html');

  try {
    await access(directoryIndex);
    return directoryIndex;
  } catch {
    return path.join(outputDir, `${pathname.replace(/\/$/, '')}.html`);
  }
}

/**
 * Adds Astro's deployment base path to generated Open Graph image URLs.
 *
 * Takumi validates image URLs against files in the output directory, whose paths
 * do not include Astro's deployment base. This integration runs after Takumi and
 * restores that base path in the published HTML.
 *
 * @param base - The configured Astro deployment base path.
 * @returns An Astro integration that rewrites generated `og:image` metadata.
 */
export function prefixOgImageBasePath(base: string): AstroIntegration {
  const normalizedBase = base.replace(/\/$/, '');

  return {
    name: 'prefix-og-image-base-path',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        if (normalizedBase === '') {
          return;
        }

        await Promise.all(
          pages.map(async ({ pathname }) => {
            const outputFile = await getOutputFilePath(dir, pathname);
            const html = await readFile(outputFile, 'utf8');
            const updatedHtml = html.replace(
              /(<meta property="og:image" content=")([^"]+)(")/,
              (_match, prefix, image, suffix) => {
                const imageUrl = new URL(image);
                imageUrl.pathname = `${normalizedBase}${imageUrl.pathname}`;
                return `${prefix}${imageUrl.href}${suffix}`;
              },
            );

            if (updatedHtml !== html) {
              await writeFile(outputFile, updatedHtml);
            }
          }),
        );
      },
    },
  };
}
