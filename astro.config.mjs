import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.codaai.ai',
  base: '/',
  build: {
    // Inline all CSS into <style> tags — eliminates render-blocking external
    // stylesheet requests (e.g. /_astro/Footer.css) and improves FCP/LCP.
    inlineStylesheets: 'always',
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Exclude utility/auth pages from the sitemap
      filter: (page) =>
        !page.includes('/checkout-success') &&
        !page.includes('/auth/'),
    }),
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
