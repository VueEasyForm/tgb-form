import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: {
    tsgo: {},
  },
  sourcemap: true,
  exports: true,
});
