import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: {
    sourcemap: true,
    tsgo: true,
  },
  sourcemap: true,
  exports: true,
});
