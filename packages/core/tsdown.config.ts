import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: {
    tsgo: true,
  },
  sourcemap: true,
  exports: true,
});
