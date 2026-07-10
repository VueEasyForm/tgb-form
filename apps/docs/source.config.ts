import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions, remarkSteps, remarkNpm } from 'fumadocs-core/mdx-plugins';
import { transformerTwoslash } from 'fumadocs-twoslash';
import {
  createFileSystemGeneratorCache,
  createGenerator,
  remarkAutoTypeTable,
} from 'fumadocs-typescript';
import ts from 'typescript';

const docsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(docsDir, '../..');

const fromRoot = (...paths: string[]) => resolve(workspaceRoot, ...paths);

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

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
    remarkPlugins: [[remarkAutoTypeTable, { generator }], remarkNpm, remarkSteps],
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
                '@easyform/core': [fromRoot('packages/core/src/index.ts')],
                '@easyform/react': [fromRoot('packages/react/src/index.ts')],
                '@easyform/vue': [fromRoot('packages/vue/src/index.ts')],
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
        }),
      ],
      langs: ['js', 'jsx', 'ts', 'tsx'],
    },
  },
});
