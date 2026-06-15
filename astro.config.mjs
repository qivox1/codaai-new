import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/** @type {Record<string, string>} */
const BLOG_LASTMOD = {
  'blog/ai-crawler-server-performance-geo':        '2026-03-22',
  'blog/b2b-videomarketing-erklaervideos-mittelstand': '2026-03-20',
  'blog/marketingagentur-alternative-ki-mittelstand':  '2026-03-17',
  'blog/marketingkosten-senken-ki-content-b2b':    '2026-03-12',
  'blog/b2b-blog-als-vertriebskanal':              '2026-03-05',
  'blog/content-marketing-vs-google-ads-b2b':      '2026-03-01',
  'blog/content-marketing-mittelstand-ki':          '2026-03-01',
  'blog/chatgpt-seo-perplexity-sichtbarkeit':      '2026-03-01',
  'blog/redaktionsplan-ki-erstellen':              '2026-03-01',
  'blog/ki-blog-erstellen':                        '2026-03-01',
  'blog/blogartikel-schreiben-lassen-kosten':      '2026-03-01',
  'blog/ki-content-marketing-strategie':           '2026-03-01',
  'en/blog/ai-crawler-server-performance-geo':     '2026-03-22',
  'en/blog/b2b-explainer-videos-lead-generation':  '2026-03-20',
  'en/blog/marketing-agency-alternative-ai':       '2026-03-17',
  'en/blog/reduce-marketing-costs-ai-content':     '2026-03-12',
  'en/blog/b2b-blog-as-sales-channel':             '2026-03-05',
  'en/blog/content-marketing-vs-google-ads-b2b':   '2026-03-01',
  'en/blog/chatgpt-seo-perplexity-visibility':     '2026-03-01',
  'en/blog/create-editorial-plan-with-ai':         '2026-03-01',
  'en/blog/create-ai-powered-blog':                '2026-03-01',
  'en/blog/outsource-blog-writing-costs':          '2026-03-01',
  'en/blog/ai-content-marketing-strategy':         '2026-03-01',
  'en/blog/ai-content-marketing-strategy-guide':   '2026-03-01',
  'en/blog/ai-content-marketing-for-smb':          '2026-03-01',
};


/** Rehype plugin: add aria-label to GFM task-list checkboxes */
function rehypeTaskListAriaLabel() {
  return (tree) => {
    const visit = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'input' &&
        node.properties?.type === 'checkbox'
      ) {
        if (!node.properties['aria-label']) {
          node.properties['aria-label'] = node.properties.checked ? 'Erledigt' : 'Aufgabe';
        }
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}

const SITE_BASE = 'https://www.codaai.ai/';

export default defineConfig({
  site: 'https://www.codaai.ai',
  base: '/',
  build: { inlineStylesheets: 'always' },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/checkout-success') &&
        !page.includes('/auth/') &&
        !page.endsWith('/en/404/'),
      serialize(item) {
        const path = item.url.replace(SITE_BASE, '').replace(/\/$/, '');
        item.lastmod = BLOG_LASTMOD[path] || '2026-05-10';
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeTaskListAriaLabel],
  },
});
