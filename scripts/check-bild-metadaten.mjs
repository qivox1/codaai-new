#!/usr/bin/env node
/**
 * Waechter: Herkunftskennzeichnung der Titelbilder.
 *
 * Jedes Titelbild eines sichtbaren Artikels muss das IPTC-Feld
 * DigitalSourceType in der Datei tragen (trainedAlgorithmicMedia fuer
 * KI-Bilder, digitalCapture fuer Fotos). Gesetzt wird es mit
 * scripts/bild-metadaten.py; die Seite /ki-transparenz/ sagt oeffentlich zu,
 * dass es gesetzt ist.
 *
 * Fehlt es bei einem sichtbaren Artikel, bricht der Build ab. Bilder, die nur
 * noch an ausgeblendeten oder nicht indexierten Artikeln haengen, werden als
 * ungeklaerte Altbestaende gemeldet, ohne den Build zu stoppen.
 *
 * Aufruf: node scripts/check-bild-metadaten.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BLOG = 'src/content/blog';
const BILDER = 'public/images/blog';
const FELD = /digitalsourcetype\/(trainedAlgorithmicMedia|digitalCapture)/;

function artikel(verzeichnis) {
  const liste = [];
  for (const eintrag of readdirSync(verzeichnis, { withFileTypes: true })) {
    const pfad = join(verzeichnis, eintrag.name);
    if (eintrag.isDirectory()) liste.push(...artikel(pfad));
    else if (eintrag.name.endsWith('.md')) liste.push(pfad);
  }
  return liste;
}

const sichtbar = new Map();   // Bilddatei -> Artikel
const verborgen = new Set();

for (const pfad of artikel(BLOG)) {
  const text = readFileSync(pfad, 'utf8');
  const kopf = text.match(/^---\n([\s\S]*?)\n---/);
  if (!kopf) continue;
  const bild = kopf[1].match(/^heroImage:\s*(\S+)/m);
  if (!bild) continue;
  const datei = 'public' + bild[1].trim().replace(/^['"]|['"]$/g, '');
  const aus = /^inUebersicht:\s*false/m.test(kopf[1]) || /^noindex:\s*true/m.test(kopf[1]);
  if (aus) verborgen.add(datei);
  else sichtbar.set(datei, pfad);
}

const fehlend = [];
for (const [datei, pfad] of sichtbar) {
  if (!existsSync(datei)) { fehlend.push(`${datei} fehlt (verwendet in ${pfad})`); continue; }
  if (!FELD.test(readFileSync(datei, 'latin1'))) fehlend.push(`${datei} ohne DigitalSourceType (${pfad})`);
}

const offen = [];
for (const name of readdirSync(BILDER)) {
  if (!name.endsWith('.webp')) continue;
  const datei = join(BILDER, name);
  if (sichtbar.has(datei)) continue;
  if (!FELD.test(readFileSync(datei, 'latin1'))) offen.push(datei);
}

console.log('\nBild-Herkunft');
console.log(`  ok   ${sichtbar.size - fehlend.length} von ${sichtbar.size} Titelbildern sichtbarer Artikel gekennzeichnet.`);
if (offen.length) {
  console.log(`  hinweis  ${offen.length} Bild(er) ohne Kennzeichnung, nur an ausgeblendeten Artikeln oder unbenutzt:`);
  for (const d of offen) console.log(`           ${d}`);
}
if (fehlend.length) {
  console.log('  FEHLER');
  for (const z of fehlend) console.log(`           ${z}`);
  console.log('  Setzen mit: python3 scripts/bild-metadaten.py <datei> --typ ki|foto\n');
  process.exit(1);
}
console.log('  Alles in Ordnung.\n');
