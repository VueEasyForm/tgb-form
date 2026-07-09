import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { transformerTwoslash } from 'fumadocs-twoslash';
import * as ts from 'typescript';

const docsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(docsDir, '../..');

const fromRoot = (...paths: string[]) => resolve(workspaceRoot, ...paths);

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
                '@tanstack/react-form': ['twoslash-stubs/tanstack-react-form.d.ts'],
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
            extraFiles: {
              'fields.ts': `
export const CheckboxInput = () => null;
export const EmailInput = () => null;
export const NumberInput = () => null;
export const TextInput = () => null;
`,
              'globals.d.ts': `
import type { ReactNode } from 'react';
import type {
  RuntimeFormDefinition,
  ValidatorRegistry,
  createRendererRegistry as createCoreRendererRegistry,
  FieldDataType as CoreFieldDataType,
} from '@easyform/core';
import type { ReactRendererRegistry } from '@easyform/react';

declare global {
  const CheckboxInput: unknown;
  const EmailInput: unknown;
  const NumberInput: unknown;
  const TextInput: unknown;
  const EzForm: (props: Record<string, unknown>) => ReactNode;
  const EzFormContext: (props: Record<string, unknown>) => ReactNode;
  const FieldDataType: typeof CoreFieldDataType;
  const createRendererRegistry: typeof createCoreRendererRegistry;
  const definition: RuntimeFormDefinition;
  const localRenderers: ReactRendererRegistry;
  const newsletterForm: RuntimeFormDefinition;
  const renderers: ReactRendererRegistry;
  const storedJson: string;
  const validators: ValidatorRegistry;
  function subscribe(email: unknown, subscribed: unknown): Promise<void>;
}

export {};
`,
              'newsletter-form.ts': `
import { defineForm, FieldDataType, ValidationRuleKind } from '@easyform/core';

export const newsletterForm = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      component: 'email-input',
      props: { placeholder: 'you@example.com', autocomplete: 'email' },
      rules: [
        { kind: ValidationRuleKind.Required, message: 'Email is required' },
        { kind: ValidationRuleKind.Email, message: 'Enter a valid email' },
      ],
    },
    subscribed: {
      type: FieldDataType.Boolean,
      defaultValue: true,
      label: 'Subscribe',
    },
  },
});
`,
              'renderers.ts': `
import { createRendererRegistry, FieldDataType } from '@easyform/core';
import { CheckboxInput, EmailInput, TextInput } from './fields';

export const renderers = createRendererRegistry({
  byName: {
    'email-input': EmailInput,
  },
  byType: {
    [FieldDataType.String]: TextInput,
    [FieldDataType.Boolean]: CheckboxInput,
  },
});
`,
              'twoslash-stubs/tanstack-react-form.d.ts': `
export function useForm(options: Record<string, unknown>): any;
`,
            },
          },
        }),
      ],
      langs: ['js', 'jsx', 'ts', 'tsx'],
    },
  },
});
