#!/usr/bin/env node
/**
 * Markdown-Fassung fuer jede indexierbare Seite, die noch keine hat.
 * ---------------------------------------------------------------------------
 * Laeuft als `postbuild` VOR dem SEO-Waechter und arbeitet gegen `dist/`.
 *
 * Hintergrund (27.09.2026): Startseite, Blog, Glossar, Leitfaden, Studie,
 * Fakten und Autorenseite haben eine gepflegte `.md.ts`-Fassung aus derselben
 * Datenquelle wie die HTML-Seite (src/lib/md-variant.ts). Alle anderen Seiten
 * — Digital Visibility, Preise, FAQ, Webinar, Co-Create, Check, Snapshot,
 * Rechtsseiten, Blog- und Glossar-Uebersicht — hatten keine: 23 von 169
 * Sitemap-URLs. Statt fuer jede eine eigene Datei zu pflegen, leitet dieses
 * Skript die Fassung aus dem fertigen HTML ab. Damit kann sie nicht veralten,
 * und jede kuenftige Seite bekommt ihre Fassung automatisch.
 *
 * Regeln:
 * - Nur Seiten OHNE eigene Markdown-Fassung (erkennbar am
 *   `<link rel="alternate" type="text/markdown">`). Gepflegte `.md.ts`
 *   haben Vorrang und werden nie ueberschrieben.
 * - `noindex`, Weiterleitungen (meta refresh) und 404 bekommen keine Fassung —
 *   was aus dem Index raus soll, soll nicht ueber einen zweiten Weg hinein.
 * - Inhalt ist `<main>` ohne Navigation, Formulare, React-Inseln (Rechner,
 *   Buchungs-Widget), Grafiken und alles mit `aria-hidden`, `hidden` oder
 *   `data-md="skip"`. Wer auf einer Seite etwas ausblenden will, setzt
 *   `data-md="skip"` am Element.
 * - Kopf wie bei den gepflegten Fassungen: Titel, Kurzbeschreibung, Quelle,
 *   Stand (aus der Footer-Zeile „Seite zuletzt aktualisiert“), Zitierregel.
 * - Die HTML-Seite bekommt den Alternate-Link nachtraeglich eingesetzt.
 *
 * Manuell: `node scripts/build-md-variants.mjs` (nach `astro build`).
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const DIST = 'dist';
const SITE = 'https://www.codaai.ai';

const DROP_TAGS = new Set([
  'script', 'style', 'noscript', 'svg', 'form', 'input', 'select', 'textarea',
  'iframe', 'template', 'canvas', 'video', 'audio', 'img', 'picture', 'nav',
  'astro-island', 'dialog', 'label', 'output',
]);
/*
 * Zustandsflaechen interaktiver Module: Lade-, Ergebnis- und Dankeszustaende,
 * die per CSS erst nach einer Eingabe sichtbar werden. Im HTML stehen sie als
 * leere Schablonen („Prüfe …“, „Vielen Dank!“) und haben in einem Text fuer
 * Agenten nichts zu suchen. Bewusst hier und nicht als `data-md="skip"` in den
 * Komponenten: jede Aenderung dort wuerde ueber EXTRA_SOURCES (lastmod.mjs) das
 * Seitendatum hochsetzen, obwohl sich am Inhalt nichts aendert.
 */
const DROP_CLASSES = new Set([
  'acta-done',   // AuditCTA: Bestaetigung nach dem Absenden
  'wacta-done',  // WebinarSignup: Bestaetigung nach der Anmeldung
  'snap-load',   // Visibility Snapshot: Ladezustand
  'snap-res',    // Visibility Snapshot: Ergebnis-Schablone
  'ps-work',     // Webinar-Live-Check: Ladezustand
  'ps-res',      // Webinar-Live-Check: Befund-Schablone
]);
const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const LABELS = {
  de: { source: 'Quelle', updated: 'Aktualisiert', cite: 'Zitieren mit Quellenangabe und Link auf die Quelle erlaubt.' },
  en: { source: 'Source', updated: 'Updated', cite: 'May be quoted with attribution and a link to the source.' },
};

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) out.push(...walk(f));
    else if (e === 'index.html') out.push(f);
  }
  return out;
}

const cls = (n) => {
  const c = n.properties?.className;
  return Array.isArray(c) ? c : [];
};

function shouldDrop(n) {
  if (n.type === 'comment') return true;
  if (n.type !== 'element') return false;
  if (DROP_TAGS.has(n.tagName)) return true;
  const p = n.properties || {};
  if (p.hidden) return true;
  if (p.ariaHidden === 'true' || p.ariaHidden === true) return true;
  if (p.dataMd === 'skip') return true;
  if (cls(n).some((c) => c === 'sr-only' || DROP_CLASSES.has(c))) return true;
  const style = String(p.style || '').replace(/\s/g, '');
  if (style.includes('display:none')) return true;
  return false;
}

/* Knopf in einer Ueberschrift (Akkordeon, FAQ): Text behalten, Knopf weg.
   Knopf anderswo ist Bedienung („Kopieren“, „Weiter“) und faellt raus. */
function clean(node, inHeading = false) {
  if (!node.children) return;
  const next = [];
  for (const ch of node.children) {
    if (shouldDrop(ch)) continue;
    if (ch.type === 'element' && ch.tagName === 'button') {
      if (!inHeading) continue;
      clean(ch, true);
      next.push(...ch.children);
      continue;
    }
    if (ch.type === 'element') clean(ch, inHeading || HEADINGS.has(ch.tagName));
    next.push(ch);
  }
  node.children = next;
}

function find(node, test) {
  if (test(node)) return node;
  for (const ch of node.children || []) {
    const r = find(ch, test);
    if (r) return r;
  }
  return null;
}

function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(text).join('');
}

function removeFirst(node, test) {
  if (!node.children) return false;
  const i = node.children.findIndex(test);
  if (i >= 0) { node.children.splice(i, 1); return true; }
  return node.children.some((ch) => removeFirst(ch, test));
}

const attr = (html, re) => (html.match(re) || [])[1];
const decode = (s) => s
  .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)))
  .replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const pages = walk(DIST);
let written = 0;
const skipped = [];

for (const file of pages) {
  const rel = relative(DIST, dirname(file)).split('\\').join('/');
  if (rel === '') continue;                                   // Startseite: gepflegt (index.md.ts)
  const html = readFileSync(file, 'utf8');
  if (/rel="alternate"\s+type="text\/markdown"/.test(html)) continue; // hat eigene Fassung
  if (/<meta\s+name="robots"\s+content="noindex/i.test(html)) { skipped.push(`${rel} (noindex)`); continue; }
  if (/<meta\s+http-equiv="refresh"/i.test(html)) { skipped.push(`${rel} (Weiterleitung)`); continue; }

  const target = join(DIST, `${rel}.md`);
  if (existsSync(target)) { skipped.push(`${rel} (.md existiert)`); continue; }

  const lang = attr(html, /<html[^>]*\slang="([a-z]{2})/) === 'en' ? 'en' : 'de';
  const t = LABELS[lang];
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/) || `${SITE}/${rel}/`;
  const description = decode(attr(html, /<meta name="description" content="([^"]*)"/) || '');
  const pageTitle = decode(attr(html, /<title>([^<]*)<\/title>/) || rel);
  const updated = attr(html, /(?:zuletzt aktualisiert|last updated):?\s*(?:<[^>]+>\s*)*(\d{4}-\d{2}-\d{2}|\d{1,2}\.\s?\d{1,2}\.\s?\d{4}|[0-9]{1,2}\s+\w+\s+\d{4})/i);
  const dt = attr(html, /(?:zuletzt aktualisiert|last updated)[\s\S]{0,200}?datetime="(\d{4}-\d{2}-\d{2})/i);

  const tree = unified().use(rehypeParse).parse(html);
  const main = find(tree, (n) => n.type === 'element' && n.tagName === 'main')
            || find(tree, (n) => n.type === 'element' && n.tagName === 'body');
  clean(main);

  const h1 = find(main, (n) => n.type === 'element' && n.tagName === 'h1');
  const heading = (h1 ? text(h1) : pageTitle).replace(/\s+/g, ' ').trim();
  if (h1) removeFirst(main, (n) => n === h1);

  const mdast = await unified().use(rehypeRemark).run({ type: 'root', children: main.children });
  let body = unified().use(remarkGfm).use(remarkStringify, { bullet: '-', rule: '-' }).stringify(mdast);

  body = body
    .replace(/\]\(#/g, `](${canonical}#`)                     // Sprungmarken absolut
    .replace(/\]\(\/(?!\/)/g, `](${SITE}/`)                   // wurzel-relative Links absolut
    .replace(/^#{1,6}\s*$/gm, '')                             // leere Ueberschriften
    .replace(/^\[\]\([^)]*\)\s*$/gm, '')                      // leere Links
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (body.length < 200) { skipped.push(`${rel} (zu wenig Text: ${body.length} Zeichen)`); continue; }

  const meta = [
    `${t.source}: ${canonical}`,
    (dt || updated) ? `${t.updated}: ${dt || updated}` : null,
    t.cite,
  ].filter(Boolean);

  const md = [
    `# ${heading}`,
    '',
    description ? `> ${description}` : null,
    description ? '' : null,
    ...meta,
    '',
    '---',
    '',
    body,
    '',
  ].filter((l) => l !== null).join('\n');

  writeFileSync(target, md);

  const href = `/${rel}.md`;
  const link = `<link rel="alternate" type="text/markdown" href="${href}" title="${pageTitle.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')} (Markdown)">`;
  const patched = html.replace(/(<link rel="canonical"[^>]*>)/, `$1${link}`);
  if (patched === html) { skipped.push(`${rel} (kein canonical — Link nicht gesetzt)`); }
  writeFileSync(file, patched);
  written += 1;
}

console.log(`Markdown-Fassungen: ${written} erzeugt.`);
if (skipped.length) console.log(`  ausgelassen: ${skipped.join(' · ')}`);
