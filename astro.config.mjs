import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://qivox1.github.io',
  base: '/codaai-new',
  build: {
    // Inline all CSS into the HTML <head> as <style> tags — eliminates render-blocking
    // external CSS requests (e.g. Footer chunk). Saves ~390 ms on slow mobile.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Merge small JS chunks — reduces the number of separate HTTP requests
      // (currently 9+ small files each 1–57 KiB, each with its own round-trip)
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Bundle all React + Astro runtime into a single vendor chunk
            if (id.includes('node_modules/react') || id.includes('node_modules/@astrojs') || id.includes('node_modules/jsx-runtime')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    }
  },
  output: 'static',
});
