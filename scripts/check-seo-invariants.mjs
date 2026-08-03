#!/usr/bin/env node
/**
 * Build-Waechter fuer die SEO-Grundlagen. Laeuft automatisch als `postbuild`.
 * ---------------------------------------------------------------------------
 * Am 03.08.2026 kam heraus, dass 36 von 46 hreflang-Verweisen auf 404 zeigten
 * und die komplette Sitemap seit Wochen dasselbe hartkodierte Aenderungsdatum
 * meldete. Beides war monatelang unbemerkt, weil nichts es geprueft hat.
 * Dieses Skript bricht den Build ab, wenn einer der Fehler zurueckkommt.
 *
 * Geprueft wird gegen `dist/` — also gegen das, was wirklich ausgeliefert wird.
 *
 * Manuell: `node scripts/check-seo-invariants.mjs`
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://www.codaai.ai';

const errors = [];
const notes = [];

if (!existsSync(DIST)) {
  console.error('SEO-Check: dist/ fehlt — erst bauen.');
  process.exit(1);
}

/* ---------------------------------------------------------------- Helfer -- */

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/** Existiert die URL als ausgelieferte Datei in dist/? */
function servedInDist(url) {
  if (!url.startsWith(ORIGIN)) return false;
  const path = url.slice(ORIGIN.length).replace(/^\//, '').replace(/\/$/, '');
  if (path === '') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, path, 'index.html')) || existsSync(join(DIST, path));
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

/* ------------------------------------------------- 1) hreflang-Ziele -------- */

const hreflangRe = /<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/g;
let hreflangCount = 0;
const broken = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const [, lang, href] of html.matchAll(hreflangRe)) {
    hreflangCount++;
    if (!servedInDist(href)) {
      broken.push(`${relative(DIST, file)}  hreflang="${lang}" -> ${href}`);
    }
  }
}

if (broken.length) {
  errors.push(
    `hreflang: ${broken.length} von ${hreflangCount} Verweisen zeigen auf eine Seite, ` +
      `die es nicht gibt.\n         Sprachpaare stehen in src/lib/i18n-routes.ts — ` +
      `Seiten ohne Gegenstueck bekommen dort KEINEN Eintrag.\n` +
      broken.slice(0, 15).map((b) => `           ${b}`).join('\n') +
      (broken.length > 15 ? `\n           … und ${broken.length - 15} weitere` : ''),
  );
} else {
  notes.push(`hreflang: ${hreflangCount} Verweise, alle Ziele vorhanden.`);
}

/* -------------------------------------- 2) hreflang-Paare sind wechselseitig */

const pairIssues = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const links = [...html.matchAll(hreflangRe)]
    .filter(([, lang]) => lang === 'de' || lang === 'en')
    .map(([, lang, href]) => ({ lang, href }));
  if (links.length === 0) continue;
  if (links.length === 1) {
    pairIssues.push(`${relative(DIST, file)}: nur ein Sprach-Alternate (${links[0].lang})`);
  }
}
if (pairIssues.length) {
  errors.push(
    'hreflang: einseitige Verweise gefunden — ein Alternate ohne Gegenstueck ist ' +
      'fuer Google widerspruechlich.\n' +
      pairIssues.slice(0, 10).map((p) => `           ${p}`).join('\n'),
  );
}

/* ---------------------------------------------------- 3) Sitemap-lastmod ---- */

const sitemapFiles = allFiles.filter((f) => /sitemap-\d+\.xml$/.test(f));
if (sitemapFiles.length === 0) {
  errors.push('Sitemap: keine sitemap-N.xml in dist/ gefunden.');
} else {
  for (const file of sitemapFiles) {
    const xml = readFileSync(file, 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const mods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    const name = relative(DIST, file);

    if (mods.length === 0) {
      errors.push(
        `Sitemap ${name}: kein einziges <lastmod>. In CI braucht der Checkout ` +
          '`fetch-depth: 0`, sonst liefert `git log` in astro.config.mjs nichts.',
      );
      continue;
    }
    if (mods.length < locs.length) {
      notes.push(`Sitemap ${name}: ${locs.length - mods.length} von ${locs.length} URLs ohne lastmod.`);
    }
    const distinct = new Set(mods.map((m) => m.slice(0, 10)));
    if (distinct.size === 1 && locs.length > 3) {
      errors.push(
        `Sitemap ${name}: alle ${locs.length} URLs melden dasselbe Datum ` +
          `(${[...distinct][0]}). Genau dieser Zustand hat Google von Juni bis ` +
          'August 2026 vom Neulesen abgehalten. lastmod kommt aus der ' +
          'Git-Historie — stimmt die Ableitung in astro.config.mjs noch?',
      );
    } else {
      notes.push(`Sitemap ${name}: ${locs.length} URLs, ${distinct.size} verschiedene Datumsangaben.`);
    }
  }
}

/* ---------------------------------------------------------- 4) robots.txt --- */

const robots = join(DIST, 'robots.txt');
if (!existsSync(robots)) {
  errors.push('robots.txt fehlt in dist/.');
} else {
  const txt = readFileSync(robots, 'utf8');
  const line = txt.split('\n').find((l) => l.toLowerCase().startsWith('sitemap:'));
  if (!line) errors.push('robots.txt: keine Sitemap-Zeile.');
  else if (!line.includes(`${ORIGIN}/`)) {
    errors.push(
      `robots.txt: Sitemap-Zeile zeigt nicht auf ${ORIGIN} — jede andere Variante ` +
        `kostet eine 301-Weiterleitung.\n           ${line.trim()}`,
    );
  } else notes.push('robots.txt: Sitemap-Zeile zeigt auf die kanonische www-Domain.');
}

/* -------------------------------------------------------------- Ausgabe ---- */

console.log('\nSEO-Check');
for (const n of notes) console.log(`  ok   ${n}`);
for (const e of errors) console.log(`  FEHLER ${e}`);

if (errors.length) {
  console.log(`\n${errors.length} Problem(e) — Build abgebrochen.\n`);
  process.exit(1);
}
console.log('  Alles in Ordnung.\n');
