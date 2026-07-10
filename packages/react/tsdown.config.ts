import { defineConfig } from 'tsdown';

export default defineConfig({
  deps: {
    neverBundle: ['@tgb-form/core', '@tanstack/react-form', 'react', 'react-dom'],
  },
  platform: 'neutral',
  dts: {
    tsgo: true,
  },
  exports: true,
  sourcemap: true,
});
