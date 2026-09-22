#!/usr/bin/env node
/*
 * Interne Verlinkung der Blogartikel prüfen (Regel seit 22.09.2026,
 * docs/2026-09-22-blog-redaktionsplan-2026-27.md, Abschnitt „Verlinkung").
 *
 * Zählt je Blogartikel (DE und EN, ohne noindex) die verschiedenen Seiten in
 * dist/, die auf ihn verlinken. Nicht mitgezählt: die Artikelseite selbst, die
 * Blog-Übersichten und die automatischen „Verwandte Artikel"-Karten (die
 * entstehen ohne redaktionelle Entscheidung). Ziel: mindestens 5.
 *
 *   node scripts/check-blog-links.mjs [dist-Pfad]
 * Exit 1, wenn ein Artikel verwaist ist (0 Links); Warnung unter 5.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const MIN = 5;
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') files.push(p);
  }
})(DIST);

const urlOf = (p) => '/' + p.slice(DIST.length + 1).replace(/index\.html$/, '');
const pages = files.map((p) => ({ url: urlOf(p), html: readFileSync(p, 'utf8') }));
const isArticle = (u) => /^\/(en\/)?blog\/[^/]+\/$/.test(u);
const articles = pages.filter((p) => isArticle(p.url) && !/name="robots" content="noindex/.test(p.html));

// „Verwandte Artikel"-Block herausschneiden
const strip = (html) => html.replace(/<section aria-label="(Verwandte Artikel|Related Articles)"[\s\S]*?<\/section>/g, '');

let orphan = 0, weak = 0;
const rows = articles.map((a) => {
  const src = pages.filter((p) => p.url !== a.url && !/^\/(en\/)?blog\/$/.test(p.url) && strip(p.html).includes(`href="${a.url}"`));
  return { url: a.url, n: src.length };
}).sort((x, y) => x.n - y.n);

for (const r of rows) {
  const flag = r.n === 0 ? 'FEHLT' : r.n < MIN ? 'wenig' : 'ok   ';
  if (r.n === 0) orphan++; else if (r.n < MIN) weak++;
  console.log(`  ${flag} ${String(r.n).padStart(3)}  ${r.url}`);
}
console.log(`\n${rows.length} Artikel · ${orphan} verwaist · ${weak} unter ${MIN} Links`);
process.exit(orphan ? 1 : 0);
