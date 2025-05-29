import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import handleModuleResolution from './src/vite-plugins/handle-module-resolution';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to inject Next.js compatibility layer
    {
      name: 'inject-next-compat',
      transformIndexHtml(html) {
        return html.replace(
          /<head>/,
          `<head>
    <script>
      // Minimal process polyfill
      window.process = window.process || {
        env: {
          NODE_ENV: '${process.env.NODE_ENV || 'development'}',
          __NEXT_ROUTER_BASEPATH: '',
          __NEXT_SCROLL_RESTORATION: false,
          __NEXT_HAS_REWRITES: false,
          NEXT_PUBLIC_BASE_PATH: ''
        },
        browser: true,
        platform: 'browser',
        version: '',
        cwd: function() { return '/'; }
      };
    </script>`
        );
      }
    },
    // Handle missing Next.js module imports
    handleModuleResolution(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/link': path.resolve(__dirname, './src/shims/next-link.jsx'),
      'next/image': path.resolve(__dirname, './src/shims/next-image.jsx'),
      'next/router': path.resolve(__dirname, './src/shims/next-router.js'),
      'next/head': path.resolve(__dirname, './src/shims/next-head.jsx'),
      'next/dynamic': path.resolve(__dirname, './src/shims/next-dynamic.jsx'),
    },
  },
  // Serve at base path
  base: '/',
  // Server options
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ],
    },
  },
  define: {
    // Polyfill for Next.js's process.env
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      __NEXT_ROUTER_BASEPATH: JSON.stringify(''),
      __NEXT_SCROLL_RESTORATION: JSON.stringify(false),
      __NEXT_HAS_REWRITES: JSON.stringify(false),
    },
    'process.browser': true,
    'process.platform': JSON.stringify('browser'),
  },
});
