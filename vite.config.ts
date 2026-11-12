// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/src\/generated/],
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api/profile': {
        target: 'http://localhost:8282',
        changeOrigin: true,
        secure: false,
      },
      '/oauth2/token': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
      '/userinfo': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
      '/api/common': {
        target: 'http://localhost:8181',
        changeOrigin: true,
        secure: false,
      },
      '/api/products': {
        target: 'http://localhost:8182',
        changeOrigin: true,
        secure: false,
      },
      '/api/createOrder': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
