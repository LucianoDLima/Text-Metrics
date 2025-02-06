import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // For scss absolute imports
      '@app': path.resolve(__dirname, 'src/app'),
    },
  },
  plugins: [react(), tsconfigPaths()],
});
