import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@ts': path.resolve(__dirname, 'src/lib/ts'),
      '@json': path.resolve(__dirname, 'src/lib/json'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
