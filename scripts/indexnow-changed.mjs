#!/usr/bin/env node
/**
 * IndexNow automatisch nach jedem Deploy (seit 22.09.2026, Maßnahme 4).
 * ---------------------------------------------------------------------------
 * Liest die LIVE-Sitemap und meldet alle URLs, deren lastmod auf den Tag des
 * aktuellen Commits fällt (Europe/Berlin). lastmod kommt aus src/lib/lastmod.mjs
 * — also nur Seiten mit echter inhaltlicher Änderung (Blog/Glossar nur bei
 * gesetztem `updatedDate`). Läuft im Workflow als Job `indexnow` nach `deploy`.
 *
 * Manuell: node scripts/indexnow-changed.mjs [YYYY-MM-DD] [--dry]
 */
import { execFileSync } from 'node:child_process';

const HOST = 'www.codaai.ai';
const KEY = 'cacc2ba448d2b81250ca4ca93e63358b';
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const berlinDay = (d) => new Date(d).toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });

let day = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
if (!day) {
  const iso = execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf8' }).trim();
  day = berlinDay(iso);
}

// GitHub Pages braucht nach dem Deploy manchmal einen Moment bis zum CDN.
let xml = '';
for (let i = 0; i < 6; i++) {
  const res = await fetch(`https://${HOST}/sitemap-0.xml`, { headers: { 'cache-control': 'no-cache' } });
  xml = await res.text();
  if (res.ok && xml.includes('<loc>')) break;
  await new Promise((r) => setTimeout(r, 20000));
}

const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)]
  .filter(([, , lm]) => lm && berlinDay(lm.length === 10 ? `${lm}T12:00:00+02:00` : lm) === day)
  .map(([, loc]) => loc)
  .slice(0, 200);

console.log(`Tag ${day}: ${urls.length} URL(s) mit passendem lastmod`);
for (const u of urls) console.log('  ' + u);
if (!urls.length || dry) process.exit(0);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status}`);
// Ein IndexNow-Fehler darf den Deploy nicht rot färben — nur melden.
if (res.status !== 200 && res.status !== 202) console.log(await res.text());
