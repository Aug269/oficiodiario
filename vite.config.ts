import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Ofício Diário & Lecionário — Rede Episcopal Brasileira',
        short_name: 'Ofício Diário',
        description:
          'Ofício Diário e Lecionário segundo o uso da Rede Episcopal Brasileira: ofícios canônicos, coletas, lecionário trienal e calendário litúrgico perpétuo, disponíveis offline.',
        lang: 'pt-BR',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#4a153b',
        background_color: '#FAF8F5',
        categories: ['books', 'lifestyle', 'education'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pré-armazena todo o app shell, o lecionário (chunk separado),
        // os ícones e o PDF integral do livro para uso 100% offline.
        globPatterns: ['**/*.{html,js,css,png,svg,woff,woff2,json,pdf}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Fontes do Google (tipografia litúrgica) com cache persistente.
            urlPattern: ({ url }) =>
              url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
  server: {
    // Permite o host do preview em sandbox (subdomínios e2b.app).
    allowedHosts: true,
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  preview: {
    allowedHosts: true,
  },
});
