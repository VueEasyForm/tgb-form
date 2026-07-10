import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    typeAware: true,
  },

  ignorePatterns: ['**/dist/*', '**/.astro/*'],

  jsPlugins: ['eslint-plugin-astro'],

  plugins: [
    'typescript',
    'import',
    'unicorn',
    'jsx-a11y',
    'oxc',
    'vue',
    'react',
    'react-perf',
    'jsdoc',
    'vitest',
  ],
});
