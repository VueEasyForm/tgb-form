import { defineConfig } from 'tsdown';

export default defineConfig({
  platform: 'neutral',
  sourcemap: true,
  exports: true,
  fromVite: true,
  dts: { vue: true },
});
