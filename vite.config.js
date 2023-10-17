import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'smm',
      fileName: 'smm',
      formats: ['es', 'umd', 'iife'],
    },
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
});
