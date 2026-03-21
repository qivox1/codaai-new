import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qivox1.github.io',
  base: '/codaai-new',
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
