#!/usr/bin/env node
/**
 * IndexNow-Ping (seit 22.09.2026)
 * ---------------------------------------------------------------------------
 * Meldet geaenderte URLs sofort an Bing (und alle IndexNow-Teilnehmer wie
 * Yandex, Seznam, Naver). Bing speist u. a. ChatGPT-Suche und Copilot —
 * neue Seiten sind darueber in Stunden statt Wochen bekannt.
 *
 * Schluessel: public/cacc2ba448d2b81250ca4ca93e63358b.txt (Dateiname = Inhalt = Schluessel). Die Datei
 * muss live unter https://www.codaai.ai/cacc2ba448d2b81250ca4ca93e63358b.txt erreichbar sein, sonst
 * lehnt IndexNow ab. NICHT loeschen oder umbenennen.
 *
 * Aufruf NACH dem Deploy (GitHub Pages braucht ~1-2 Minuten):
 *   node scripts/indexnow.mjs /fakten/ /en/facts/
 * Ohne Argumente: nichts wird gesendet.
 * Missbrauch vermeiden: nur wirklich geaenderte oder neue URLs melden.
 */
const HOST = 'www.codaai.ai';
const KEY = 'cacc2ba448d2b81250ca4ca93e63358b';
const paths = process.argv.slice(2);
if (!paths.length) {
  console.log('Keine URLs angegeben. Beispiel: node scripts/indexnow.mjs /fakten/ /en/facts/');
  process.exit(0);
}
const urlList = paths.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : '/' + p}`));
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} fuer ${urlList.length} URL(s)`);
for (const u of urlList) console.log('  ' + u);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
