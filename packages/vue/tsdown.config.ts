import { defineConfig } from 'tsdown';

export default defineConfig({
  deps: {
    neverBundle: ['@easyform/core', '@tanstack/vue-form', 'vue'],
  },
  platform: 'neutral',
  sourcemap: true,
  exports: true,
  fromVite: true,
  dts: { vue: true },
});
