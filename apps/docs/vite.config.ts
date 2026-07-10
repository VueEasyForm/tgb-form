import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { getSiteConfig } from './src/lib/site';

export default defineConfig(({ mode }) => {
  const site = getSiteConfig(loadEnv(mode, process.cwd(), ''));

  return {
    base: site.basePath,
    server: {
      port: 3000,
    },
    plugins: [
      mdx(),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoStaticPathsDiscovery: true,
          autoSubfolderIndex: true,
          failOnError: true,
        },

        pages: [
          {
            path: '/',
          },
          {
            path: '/docs',
          },
          {
            path: '/api/search',
          },
          {
            path: '/llms-full.txt',
          },
          {
            path: '/llms.txt',
          },
        ],
      }),
      react(),
    ],
    resolve: {
      tsconfigPaths: true,
      alias: {
        tslib: 'tslib/tslib.es6.js',
      },
    },
  };
});
