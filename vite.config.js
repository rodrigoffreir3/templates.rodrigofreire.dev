import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'roupa-feminina': resolve(__dirname, 'roupa-feminina/index.html'),
      },
    },
  },
});
