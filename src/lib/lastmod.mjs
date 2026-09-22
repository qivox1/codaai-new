/**
 * Aktualitätsdatum je Seite — EINE Quelle für Sitemap-lastmod, das
 * dateModified im WebPage-Schema und die sichtbare Zeile
 * „Seite zuletzt aktualisiert" im Footer (seit 22.09.2026, Maßnahme 4).
 * ---------------------------------------------------------------------------
 * Grundsatz: Sitemap, Schema und sichtbares Datum sagen dasselbe. Widersprechen
 * sie sich (Sitemap „heute", Seite „8. Januar"), lernt Google, dem lastmod
 * dieser Domain nicht zu trauen — dann wirkt es auch bei echten Änderungen nicht.
 *
 * Reihenfolge der Quellen:
 *  1. Redaktionelles Datum, wo es eines gibt:
 *     - Blog und Glossar: Frontmatter `updatedDate`, sonst `pubDate`.
 *       Eine reine Template-Änderung (z. B. neue Autorenzeile) macht einen
 *       Artikel nicht aktuell — erst ein gesetztes `updatedDate`.
 *     - Blog-Übersicht / Glossar-Übersicht: jüngstes Datum ihrer Einträge.
 *     - Seiten mit Datenkonstante (`*_UPDATED` in src/data/*.ts): diese.
 *  2. Sonst: Commit-Datum der Quelldateien aus der Git-Historie
 *     (statische Seiten wie Preise, FAQ, Digital Visibility).
 *  3. Kein Datum ermittelbar → null (lastmod wird weggelassen, nie geraten).
 *
 * WER EINEN ARTIKEL ODER BEGRIFF INHALTLICH ÜBERARBEITET, SETZT `updatedDate`.
 * Sonst bleibt das Datum überall beim alten Stand.
 *
 * Der Deploy-Workflow braucht `fetch-depth: 0`, sonst liefert `git log` nichts.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// process.cwd(), nicht import.meta.url: im Build bündelt Vite diese Datei nach
// dist/, dort zeigte der relative Pfad ins Leere (kein Datum im Footer/Schema).
const ROOT = process.cwd();

/** Seiten, deren Substanz in einer Komponente statt in der .astro-Datei liegt (Git-Datum). */
export const EXTRA_SOURCES = {
  'preise': ['src/components/react/PricingCalculatorV2.tsx', 'src/data/faq.ts'],
  'en/pricing': ['src/components/react/PricingCalculatorV2.tsx', 'src/data/faq.en.ts'],
  // 04.08.2026: Beide Startseiten bestehen fast vollstaendig aus Home.astro.
  '': ['src/components/premium/Home.astro', 'src/components/premium/AuditCTA.astro'],
  'en': ['src/components/premium/Home.astro', 'src/components/premium/AuditCTA.astro'],
  'faq': ['src/data/faq.ts'],
  'en/faq': ['src/data/faq.en.ts'],
  'digital-visibility': ['src/data/faq.ts'],
  'en/digital-visibility': ['src/data/faq.en.ts'],
  'webinar': ['src/components/premium/WebinarSignup.astro', 'src/data/faq.ts'],
  'en/webinar': ['src/components/premium/WebinarSignup.astro', 'src/data/faq.en.ts'],
  'check': ['src/components/check/CheckPage.astro', 'src/components/premium/AuditCTA.astro'],
  'en/check': ['src/components/check/CheckPage.astro', 'src/components/premium/AuditCTA.astro'],
  'studie': ['src/data/studie.ts'],
  'en/study': ['src/data/studie.ts'],
};

/** Seiten mit redaktioneller Datumskonstante in einer Datendatei. */
const DATE_CONSTANTS = {
  'wissen/geo-optimierung': ['src/data/geo-optimierung.ts', 'GEO_UPDATED'],
  'en/knowledge/geo-optimization': ['src/data/geo-optimierung.ts', 'GEO_UPDATED'],
  'fakten': ['src/data/fakten.ts', 'FAKTEN_UPDATED'],
  'en/facts': ['src/data/fakten.ts', 'FAKTEN_UPDATED'],
  'autor/oliver-parrizas': ['src/data/autor.ts', 'AUTOR_UPDATED'],
  'en/author/oliver-parrizas': ['src/data/autor.ts', 'AUTOR_UPDATED'],
  'studie': ['src/data/studie.ts', 'STUDIE_UPDATED'],
  'en/study': ['src/data/studie.ts', 'STUDIE_UPDATED'],
};

const cache = new Map();
const memo = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
};

function gitDate(file) {
  return memo(`git:${file}`, () => {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
        cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      return out || null;
    } catch {
      return null;
    }
  });
}

/** Frontmatter-Datum (updatedDate ?? pubDate) einer Markdown-Datei, als YYYY-MM-DD. */
function editorialDate(file) {
  return memo(`fm:${file}`, () => {
    const full = join(ROOT, file);
    if (!existsSync(full)) return null;
    const src = readFileSync(full, 'utf8');
    const fm = src.startsWith('---') ? src.slice(3, src.indexOf('\n---', 3)) : '';
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1] ?? null;
    return { date: get('updatedDate') ?? get('pubDate'), noindex: /^noindex:\s*true/m.test(fm), lang: fm.match(/^lang:\s*(\w+)/m)?.[1] ?? 'de' };
  });
}

function constantDate(file, name) {
  return memo(`const:${file}:${name}`, () => {
    const full = join(ROOT, file);
    if (!existsSync(full)) return null;
    const m = readFileSync(full, 'utf8').match(new RegExp(`${name}\\s*=\\s*new Date\\(['"]([^'"]+)['"]\\)`));
    return m ? m[1] : null;
  });
}

function newestEntry(dir, lang) {
  return memo(`dir:${dir}:${lang}`, () => {
    const full = join(ROOT, dir);
    if (!existsSync(full)) return null;
    const dates = readdirSync(full)
      .filter((f) => f.endsWith('.md'))
      .map((f) => editorialDate(`${dir}/${f}`))
      .filter((e) => e && e.date && !e.noindex && e.lang === lang)
      .map((e) => e.date)
      .sort();
    return dates.length ? dates[dates.length - 1] : null;
  });
}

const newest = (dates) => {
  const d = dates.filter(Boolean).sort((a, b) => new Date(a) - new Date(b));
  return d.length ? d[d.length - 1] : null;
};

/**
 * @param {string} path URL-Pfad ohne führenden/abschließenden Slash ('' = Startseite)
 * @returns {string|null} ISO-Datum (YYYY-MM-DD oder volles ISO)
 */
export function lastmodFor(path) {
  path = path.replace(/^\/+|\/+$/g, '');
  return memo(`path:${path}`, () => {
    // 1a. Blog- und Glossar-Einträge: Frontmatter
    let m;
    if ((m = path.match(/^blog\/(.+)$/))) return editorialDate(`src/content/blog/${m[1]}.md`)?.date ?? null;
    if ((m = path.match(/^en\/blog\/(.+)$/))) return editorialDate(`src/content/blog/en/${m[1]}.md`)?.date ?? null;
    if ((m = path.match(/^wissen\/geo-glossar\/(.+)$/))) return editorialDate(`src/content/glossar/${m[1]}.md`)?.date ?? null;
    if ((m = path.match(/^en\/knowledge\/geo-glossary\/(.+)$/))) return editorialDate(`src/content/glossar/en/${m[1]}.md`)?.date ?? null;
    // 1b. Übersichten: jüngster Eintrag
    if (path === 'blog') return newestEntry('src/content/blog', 'de');
    if (path === 'en/blog') return newestEntry('src/content/blog/en', 'en');
    if (path === 'wissen/geo-glossar') return newestEntry('src/content/glossar', 'de');
    if (path === 'en/knowledge/geo-glossary') return newestEntry('src/content/glossar/en', 'en');
    // 1c. Datenkonstante
    if (DATE_CONSTANTS[path]) {
      const [file, name] = DATE_CONSTANTS[path];
      const c = constantDate(file, name);
      if (c) return c;
    }
    // 2. Git-Historie der Quelldateien
    const candidates = path === ''
      ? ['src/pages/index.astro']
      : [`src/pages/${path}.astro`, `src/pages/${path}/index.astro`];
    for (const extra of EXTRA_SOURCES[path] ?? []) candidates.push(extra);
    return newest(candidates.filter((f) => existsSync(join(ROOT, f))).map(gitDate));
  });
}
