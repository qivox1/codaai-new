import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

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

/** Seiten, deren Substanz in einer Komponente statt in der .astro-Datei liegt. */
const EXTRA_SOURCES = {
  'preise': ['src/components/react/PricingCalculatorV2.tsx', 'src/data/faq.ts'],
  'en/pricing': ['src/components/react/PricingCalculatorV2.tsx', 'src/data/faq.en.ts'],
  // 04.08.2026: Beide Startseiten bestehen fast vollstaendig aus Home.astro.
  // Ohne diesen Eintrag meldete die Sitemap das Datum von index.astro — einer
  // Datei, die seit Monaten nur Schema-Bloecke und Importe enthaelt. Jede
  // Textaenderung an der Startseite blieb fuer Google damit unsichtbar.
  '': ['src/components/premium/Home.astro', 'src/components/premium/AuditCTA.astro'],
  'en': ['src/components/premium/Home.astro', 'src/components/premium/AuditCTA.astro'],
  // Gleiches Muster: die FAQ-Inhalte liegen in der Datenquelle, nicht in der Seite.
  'faq': ['src/data/faq.ts'],
  'en/faq': ['src/data/faq.en.ts'],
  'digital-visibility': ['src/data/faq.ts'],
  'en/digital-visibility': ['src/data/faq.en.ts'],
  'webinar': ['src/components/premium/WebinarSignup.astro', 'src/data/faq.ts'],
  'en/webinar': ['src/components/premium/WebinarSignup.astro', 'src/data/faq.en.ts'],
};

/** Projektwurzel — damit die Pfade unabhaengig vom Arbeitsverzeichnis stimmen. */
const ROOT = fileURLToPath(new URL('.', import.meta.url));
const _gitDateCache = new Map();

function gitLastModified(file) {
  if (_gitDateCache.has(file)) return _gitDateCache.get(file);
  let iso = null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) iso = out;
  } catch {
    iso = null;
  }
  _gitDateCache.set(file, iso);
  return iso;
}

/** URL-Pfad (ohne fuehrenden/abschliessenden Slash) -> Quelldateien im Repo. */
function sourceFilesFor(path) {
  const candidates = [];
  if (path === '') {
    candidates.push('src/pages/index.astro');
  } else {
    candidates.push(`src/pages/${path}.astro`, `src/pages/${path}/index.astro`);
    const de = path.match(/^blog\/(.+)$/);
    if (de) candidates.push(`src/content/blog/${de[1]}.md`);
    const en = path.match(/^en\/blog\/(.+)$/);
    if (en) candidates.push(`src/content/blog/en/${en[1]}.md`, `src/content/blog/${en[1]}.md`);
  }
  for (const extra of EXTRA_SOURCES[path] ?? []) candidates.push(extra);
  return candidates.filter((f) => existsSync(join(ROOT, f)));
}

function lastmodFor(path) {
  const dates = sourceFilesFor(path)
    .map(gitLastModified)
    .filter(Boolean)
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

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
        // /leistungen/ ist seit 28.07.2026 nur noch eine Weiterleitung auf
        // /digital-visibility/ und gehoert nicht in die Sitemap.
        !page.endsWith('/leistungen/') &&
        // /kontakt/ und /en/contact/ sind seit 04.08.2026 ebenfalls nur noch
        // Weiterleitungen (auf #termin der jeweiligen Startseite).
        !page.endsWith('/kontakt/') &&
        !page.endsWith('/en/contact/') &&
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
    rehypePlugins: [rehypeTaskListAriaLabel],
  },
});
