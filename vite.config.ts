import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@api': resolve(root, 'api'),
      '@components': resolve(root, 'components'),
      '@hooks': resolve(root, 'hooks'),
      '@pages': resolve(root, 'pages'),
      '@utils': resolve(root, 'utils'),
      '@interfaces': resolve(root, 'interfaces'),
      '@store': resolve(root, 'store'),
    },
  },
});
