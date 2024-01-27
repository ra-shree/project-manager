import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@components': resolve(root, 'components'),
      '@hooks': resolve(root, 'hooks'),
      '@pages': resolve(root, 'pages'),
      '@utils': resolve(root, 'utils'),
    },
  },
});
