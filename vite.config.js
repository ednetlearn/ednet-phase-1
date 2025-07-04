import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional alias for cleaner imports
    },
  },
  build: {
    outDir: 'dist',  // default already, but good to be explicit
    emptyOutDir: true,
  },
  server: {
    port: 5173,       // Or any other port if 5173 is busy
    open: true,
  },
});
