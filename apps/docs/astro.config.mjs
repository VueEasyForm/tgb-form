// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import starlight from '@astrojs/starlight';
import astroTakumi from 'astro-takumi';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';
import { OgCard } from './src/components/OgCard.tsx';
import { prefixOgImageBasePath } from './src/integrations/prefix-og-image-base-path.mts';

import tailwindcss from '@tailwindcss/vite';

// Twoslash won't work, as documented at https://expressive-code.com/key-features/syntax-highlighting/#transformers
// Disable them for now

export default defineConfig({
  output: 'static',
  site: process.env.DOCS_SITE_URL ?? 'http://localhost:4321',
  base: process.env.DOCS_BASE_PATH ?? '/',
  vite: {
    ssr: { external: ['astro-takumi', 'jsdom'] },
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'TGB Form',
      description: 'Portable, JSON-safe form definitions for TanStack Form and Valibot.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/VueEasyForm/tgb-form' },
      ],
      components: { Head: './src/components/Head.astro' },
      customCss: ['./src/styles/global.css'],
      plugins: [
        starlightLlmsTxt({
          projectName: 'TGB Form',
          details:
            'TGB Form provides portable, JSON-safe form definitions for TypeScript applications using TanStack Form and Valibot.',
        }),
        starlightTypeDoc({
          entryPoints: [
            '../../packages/core/src/index.ts',
            '../../packages/react/src/index.ts',
            '../../packages/vue/src/index.ts',
          ],
          tsconfig: './typedoc.tsconfig.json',
          typeDoc: { entryPointStrategy: 'expand' },
        }),
      ],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Getting Started', slug: '' },
            { label: 'Form Definitions', slug: 'form-definitions' },
          ],
        },
        {
          label: 'Core',
          items: [{ slug: 'json-serialization' }, { slug: 'tanstack-form-integration' }],
        },
        {
          label: 'Validators',
          items: [{ slug: 'built-in-validators' }, { slug: 'custom-validators' }],
        },
        {
          label: 'Components',
          items: [{ slug: 'defining-custom-components' }, { slug: 'renderer-registries' }],
        },
        { label: 'Adapters', items: [{ slug: 'react-adapter' }, { slug: 'vue-adapter' }] },
        typeDocSidebarGroup,
      ],
    }),
    // This will only build in prod build, no dev generation
    astroTakumi({
      options: {
        fonts: [
          readFileSync(
            new URL(
              './node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
              import.meta.url,
            ),
          ),
          readFileSync(
            new URL(
              './node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
              import.meta.url,
            ),
          ),
          readFileSync(
            new URL(
              './node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-italic.woff2',
              import.meta.url,
            ),
          ),
        ],
        format: 'webp',
        width: 1200,
        height: 630,
      },
      render: async ({ description, title }) => {
        return createElement(OgCard, {
          description: description ?? 'Schema-first forms for React and Vue',
          title,
        });
      },
    }),
    prefixOgImageBasePath(process.env.DOCS_BASE_PATH ?? '/'),
  ],
});
