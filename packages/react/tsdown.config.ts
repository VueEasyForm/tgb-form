import { defineConfig } from 'tsdown';

export default defineConfig({
  deps: {
    neverBundle: ['@easyform/core', '@tanstack/react-form', 'react', 'react-dom'],
  },
  platform: 'neutral',
  dts: true,
  exports: true,
  sourcemap: true,
});
