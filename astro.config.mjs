import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * lastmod fuer die Sitemap — aus der Git-Historie, nicht hartkodiert.
 * ---------------------------------------------------------------------------
 * Bis 03.08.2026 stand hier `item.lastmod = BLOG_LASTMOD[path] || '2026-05-10'`.
 * Damit meldete JEDE Nicht-Blog-Seite den 10.05.2026 — auch /digital-visibility/,
 * die es an dem Tag noch gar nicht gab. Google hat die Sitemap zuletzt am
 * 16.06.2026 gelesen; seither behauptete jede URL, aelter zu sein als dieser
 * Besuch. Aus Googles Sicht hatte sich nichts geaendert, also kam es nicht
 * wieder — 27 der 46 URLs waren dem Index nie bekannt.
 *
 * Jetzt: das Commit-Datum der jeweiligen Quelldatei. Findet der Build kein
 * Datum (z. B. flacher Clone ohne Historie), wird `lastmod` WEGGELASSEN statt
 * geraten — eine fehlende Angabe ist fuer Google unproblematisch, eine falsche
 * kostet die Neuindexierung.
 *
 * ACHTUNG: Der Deploy-Workflow braucht dafuer `fetch-depth: 0`
 * (.github/workflows/deploy.yml). Ohne die volle Historie liefert
 * `git log` nichts.
 */

// 22.09.2026: Logik nach src/lib/lastmod.mjs verschoben — dieselbe Quelle
// speist jetzt auch dateModified (Layout) und die Footer-Zeile.
import { lastmodFor } from './src/lib/lastmod.mjs';
import remarkGrafik from './src/lib/remark-grafik.mjs';

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
  /* 04.09.2026: von 'always' auf 'auto'. 'always' kopierte das komplette
     Tailwind-CSS (85-92 KB) in JEDE der 170 Seiten — eine Glossarseite bestand
     zu zwei Dritteln aus CSS, das der Browser laengst hatte. Mit 'auto' liegt
     das grosse Stylesheet als eine gecachte Datei unter _astro/ und kommt als
     blockierendes <link> in den Head (kein FOUC); kleine Bloecke bleiben inline.
     Erste Seite gleich schwer, jede weitere deutlich leichter — genau das
     Nutzungsmuster des Glossars (mehrere Begriffe hintereinander). */
  build: { inlineStylesheets: 'auto' },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/checkout-success') &&
        // /leistungen/ ist seit 28.07.2026 nur noch eine Weiterleitung auf
        // /digital-visibility/ und gehoert nicht in die Sitemap.
        !page.endsWith('/leistungen/') &&
        // /kontakt/ und /en/contact/ sind seit 04.08.2026 ebenfalls nur noch
        // Weiterleitungen (auf #termin der jeweiligen Startseite).
        !page.endsWith('/kontakt/') &&
        !page.endsWith('/en/contact/') &&
        // Der Videoartikel wurde am 05.08.2026 auf Digital Visibility umgestellt
        // und liegt jetzt unter /blog/youtube-ki-sichtbarkeit-b2b/. Die alten
        // Slugs sind nur noch Weiterleitungen.
        !page.endsWith('/blog/b2b-videomarketing-erklaervideos-mittelstand/') &&
        !page.endsWith('/en/blog/b2b-explainer-videos-lead-generation/') &&
        // 03.09.2026 (Beschluss Oli): die drei Kosten-/Agentur-Artikel stehen auf
        // noindex (Blog-Umbaukonzept, Gruppe C) — DE und EN raus aus der Sitemap.
        !page.endsWith('/blog/blogartikel-schreiben-lassen-kosten/') &&
        !page.endsWith('/blog/marketingkosten-senken-ki-content-b2b/') &&
        !page.endsWith('/blog/marketingagentur-alternative-ki-mittelstand/') &&
        !page.endsWith('/en/blog/outsource-blog-writing-costs/') &&
        !page.endsWith('/en/blog/reduce-marketing-costs-ai-content/') &&
        !page.endsWith('/en/blog/marketing-agency-alternative-ai/') &&
        // 22.09.2026: aufgelöste Artikel, nur noch Weiterleitungen (Redaktionsplan 2026/27)
        !page.endsWith('/blog/b2b-blog-als-vertriebskanal/') &&
        !page.endsWith('/blog/ki-content-marketing-strategie/') &&
        !page.endsWith('/en/blog/b2b-blog-as-sales-channel/') &&
        !page.endsWith('/en/blog/ai-content-marketing-strategy/') &&
        !page.endsWith('/en/blog/ai-content-marketing-strategy-guide/') &&
        // 19.09.2026: Visibility Circle ist nur fuer eingeladene Unternehmen.
        !page.includes('/visibility-circle') &&
        !page.includes('/auth/') &&
        !page.endsWith('/en/404/'),
      serialize(item) {
        const path = item.url.replace(SITE_BASE, '').replace(/\/$/, '');
        const lastmod = lastmodFor(path);
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;
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
    // 22.09.2026: ```grafik-Bloecke im Blog -> HTML-Grafiken (src/lib/remark-grafik.mjs)
    remarkPlugins: [remarkGrafik],
    rehypePlugins: [rehypeTaskListAriaLabel],
  },
});
