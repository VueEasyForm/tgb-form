import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { defaultHandlers, toHast } from 'mdast-util-to-hast';
import { rehypeCodeDefaultOptions, remarkSteps, remarkNpm } from 'fumadocs-core/mdx-plugins';
import type { ElementContent, Root } from 'hast';
import { transformerTwoslash } from 'fumadocs-twoslash';
import {
  createFileSystemGeneratorCache,
  createGenerator,
  type DocEntry,
  remarkAutoTypeTable,
} from 'fumadocs-typescript';
import { preprocessApiReferenceMarkdown } from './src/lib/api-reference-links';
import { ShikiError } from 'shiki';
import ts from 'typescript';

const docsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(docsDir, '../..');

const fromRoot = (...paths: string[]) => resolve(workspaceRoot, ...paths);

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

function renderTwoslashMarkdown(this: any, markdown: string): ElementContent[] {
  const mdast = fromMarkdown(preprocessApiReferenceMarkdown(markdown), {
    mdastExtensions: [gfmFromMarkdown()],
  });

  const onCode = (lang: string, node: { value: string; meta?: string | null }) =>
    this.codeToHast(node.value, {
      ...this.options,
      transformers: [],
      meta: node.meta ? { __raw: node.meta } : {},
      lang,
    }).children[0];

  return (
    toHast(mdast, {
      handlers: {
        code: (state, node) => {
          const lang = node.lang;
          if (!lang) return defaultHandlers.code(state, node);
          try {
            return onCode(lang, node);
          } catch (error) {
            const fallback = defaultHandlers.code(state, node);
            if (error instanceof ShikiError) {
              this.meta._fd_postprocess ??= [];
              this.meta._fd_postprocess.push(async ({ highlighter }: { highlighter: any }) => {
                await highlighter.loadLanguage(lang);
                Object.assign(fallback, onCode(lang, node));
              });
              return fallback;
            }
            return fallback;
          }
        },
      },
    }) as Root
  ).children.filter((node): node is ElementContent => node.type !== 'doctype');
}

function renderTwoslashMarkdownInline(
  this: any,
  markdown: string,
  context: string,
): ElementContent[] {
  const text =
    context === 'tag:param'
      ? preprocessApiReferenceMarkdown(markdown).replace(/^(?<link>[\w$-]+)/, '`$1` ')
      : preprocessApiReferenceMarkdown(markdown);
  const children = renderTwoslashMarkdown.call(this, text);
  if (children.length === 1 && children[0].type === 'element' && children[0].tagName === 'p') {
    return children[0].children;
  }
  return children;
}

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [
        remarkAutoTypeTable,
        {
          generator,
          options: {
            transform(entry: DocEntry) {
              if (entry.description) {
                entry.description = preprocessApiReferenceMarkdown(entry.description);
              }
            },
          },
        },
      ],
      remarkNpm,
      remarkSteps,
    ],
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          twoslashOptions: {
            compilerOptions: {
              allowSyntheticDefaultImports: true,
              baseUrl: docsDir,
              esModuleInterop: true,
              jsx: ts.JsxEmit.ReactJSX,
              lib: ['lib.dom.d.ts', 'lib.dom.iterable.d.ts', 'lib.es2022.d.ts'],
              module: ts.ModuleKind.ESNext,
              moduleResolution: ts.ModuleResolutionKind.Bundler,
              noImplicitAny: false,
              paths: {
                '@tgb-form/core': [fromRoot('packages/core/src/index.ts')],
                '@tgb-form/react': [fromRoot('packages/react/src/index.ts')],
                '@tgb-form/vue': [fromRoot('packages/vue/src/index.ts')],
                '@tanstack/form-core': [
                  fromRoot('packages/core/node_modules/@tanstack/form-core/dist/esm/index.d.ts'),
                ],
                '@tanstack/react-form': [
                  fromRoot('apps/docs/node_modules/@tanstack/react-form/dist/esm/index.d.ts'),
                ],
                '@tanstack/vue-form': [
                  fromRoot('packages/vue/node_modules/@tanstack/vue-form/dist/esm/index.d.ts'),
                ],
                valibot: [fromRoot('packages/core/node_modules/valibot/dist/index.d.mts')],
                vue: [fromRoot('packages/vue/node_modules/vue/dist/vue.d.ts')],
              },
              skipLibCheck: true,
              strict: true,
              target: ts.ScriptTarget.ES2022,
            },
          },
          rendererRich: {
            renderMarkdown: renderTwoslashMarkdown,
            renderMarkdownInline: renderTwoslashMarkdownInline,
          },
        }),
      ],
      langs: ['js', 'jsx', 'ts', 'tsx'],
    },
  },
});
