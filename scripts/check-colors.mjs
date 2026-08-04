#!/usr/bin/env node
/**
 * check-colors.mjs — Farbwächter für codaai-new
 * ─────────────────────────────────────────────────────────────────────────────
 * Bricht den Build, wenn in src/ ein Farbwert steht, der nicht auf der
 * Erlaubnisliste ist. Grund: die Seite wurde am 04.08.2026 von 145 harten
 * Farbwerten auf eine Token-Schicht umgestellt. Ohne Wächter kommt in drei
 * Monaten eine neue Sektion dazu, jemand schreibt #2563EB hinein, es sieht
 * fast richtig aus, und niemandem fällt es auf. Nach einem Jahr ist wieder
 * Farbchaos und dieselbe Migration steht erneut an.
 *
 * Prüft ZWEI Schreibweisen:
 *   1. Hex-Literale   — #DF41FB, #fff, #2B3A5C25
 *   2. Zahlentripel   — rgb(12,17,32) / rgba(255,255,255,.1)
 *
 * Punkt 2 ist nicht theoretisch: am 04.08.2026 rutschte ein schwarzer
 * Vollbild-Schleier als rgba(10,10,15,.955) durch einen reinen Hex-Wächter
 * und setzte den schwarzen Kasten auf einer Abyss-Fläche wieder her.
 *
 * Aufruf:
 *   node scripts/check-colors.mjs            prüfen, Exit 1 bei Verstößen
 *   node scripts/check-colors.mjs --list     Bestandsaufnahme, immer Exit 0
 *
 * Keine Abhängigkeiten. Node 18+.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIR = join(ROOT, 'src');
const LIST_ONLY = process.argv.includes('--list');

/* ═══════════════════════════════════════════════════════════════════════════
   ERLAUBNISLISTE
   Vollständig dokumentiert in Design Guide.html, Abschnitt 19.
   Jeder Eintrag braucht einen technischen Grund. „Sieht besser aus" ist keiner.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Dateien, die komplett ausgenommen sind. */
const EXEMPT_FILES = [
  // Die Definition selbst — die Skalen müssen als echte Hex irgendwo stehen,
  // weil GSAP hsl(var(--x)) nicht interpolieren kann.
  'tailwind.config.ts',
  // Die Token-Schicht. Hier werden Farben definiert, nicht verwendet.
  'src/styles/global.css',
];

/** Überall erlaubt. Weiß ist in jedem System Weiß. */
const GLOBAL_ALLOW = new Set(['#fff', '#ffff', '#ffffff', '#ffffffff']);

/**
 * Erlaubt nur in bestimmten Dateien.
 * Schlüssel = Farbwert in Kleinschreibung, Wert = Liste von Pfad-Fragmenten.
 */
const SCOPED_ALLOW = {
  // ── Die Bildmarke. Sie darf keinem Theme folgen. ──────────────────────────
  '#df41fb': [
    'src/components/Navbar.astro',
    'src/components/Footer.astro',
    'src/components/BlogCard.astro',
    'src/components/StufenTeaser.astro',
    'src/pages/index.astro',
    'src/pages/auth/callback.astro',
    'src/components/react/BookingWidget.tsx',
    // GSAP-Animationsziele: hsl(var(--x)) ist nicht interpolierbar.
    'src/components/premium/Home.astro',
    // Flip-Word-Farben werden als String an die Komponente übergeben.
    'src/pages/webinar.astro',
  ],
  // ── Angebots-Magenta, benannte Ausnahme (F4). Die eine vollflächige
  //    Magenta-Fläche. Weiß darauf 4,7:1; auf #DF41FB wären es 3,34:1. ──────
  '#c405e6': [
    'src/components/premium/Home.astro',
    'src/pages/webinar.astro',
  ],
  // ── DottedMap baut aus diesem Wert ein SVG als Data-URL. Eine
  //    CSS-Variable kann darin nicht aufgelöst werden. ──────────────────────
  '#2b3a5c25': ['src/components/ui/WorldMap.tsx'],

  // ── Nachbildung von Googles Oberfläche im SERP-Mockup. In Navy verliert
  //    die Nachbildung ihre Glaubwürdigkeit. ────────────────────────────────
  '#8ab4f8': ['src/components/premium/Home.astro'],
  '#93c5a0': ['src/components/premium/Home.astro'],
  '#1a4fd6': ['src/components/premium/Home.astro'],
  '#0e7a4a': ['src/components/premium/Home.astro'],

  // ── GSAP-Animationsziele in Home.astro: Navy-Palette als echte Hex.
  //    Ausschließlich Werte, die es auch als Token gibt. ────────────────────
  '#131a2b': ['src/components/premium/Home.astro'],
  '#2b3a5c': ['src/components/premium/Home.astro'],
  '#3e5183': ['src/components/premium/Home.astro'],
  '#c9d3e6': ['src/components/premium/Home.astro'],
  '#e7ecf5': ['src/components/premium/Home.astro'],
};

/**
 * Erlaubte Zahlentripel. Genau zwei.
 * Schatten sind Navy-getönt, nie schwarz — das hält die Tiefe in der Familie.
 */
const ALLOWED_TRIPLETS = new Set(['255,255,255', '12,17,32']);

/* ═══════════════════════════════════════════════════════════════════════════ */

const SCAN_EXT = /\.(astro|css|ts|tsx|js|jsx|mjs|svelte|vue)$/;
const SKIP_DIR = new Set(['node_modules', 'dist', '.git', '.astro', 'scripts']);

const HEX = /#[0-9a-fA-F]{3,8}(?![0-9a-zA-Z_-])/g;
const TRIPLET = /\brgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g;

/** Nur 3, 4, 6 und 8 Stellen sind gültige Farben. Alles andere ist eine ID. */
const HEX_LENGTHS = new Set([4, 5, 7, 9]); // inkl. '#'

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIR.has(e.name)) continue;
      await walk(p, out);
    } else if (SCAN_EXT.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}

/**
 * Entfernt Kommentarinhalte, damit dokumentierte Farbwerte in Kommentaren
 * nicht als Verstoß gemeldet werden. Bewusst einfach gehalten: ein Hex in
 * einem mehrzeiligen Kommentar wird erkannt, ein Hex hinter Code in derselben
 * Zeile wie ein Kommentarbeginn nicht — dieser Fall existiert im Bestand nicht.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p1) => p1 + ' '.repeat(m.length - p1.length));
}

function isExempt(rel) {
  return EXEMPT_FILES.some((f) => rel === f || rel.endsWith('/' + f));
}

function hexAllowed(value, rel) {
  const v = value.toLowerCase();
  if (GLOBAL_ALLOW.has(v)) return true;
  const scopes = SCOPED_ALLOW[v];
  return Boolean(scopes && scopes.some((s) => rel === s || rel.endsWith('/' + s)));
}

function advice(value, rel) {
  const v = value.toLowerCase();
  if (SCOPED_ALLOW[v]) {
    return `\`${value}\` ist erlaubt — aber nicht in dieser Datei. Erlaubt in: ${SCOPED_ALLOW[v].join(', ')}`;
  }
  const known = {
    '#df41fb': '--cta (Fläche) bzw. --cta-accessible (Text auf Hell, 6,9:1)',
    '#b01fd1': '--cta-accessible',
    '#9904b4': '--cta-accessible',
    '#c231e0': '--cta-hover',
    '#ea82fc': '--cta-on-dark',
    '#141414': '--foreground',
    '#141419': '--foreground',
    '#0a0a0a': '--surface-abyss',
    '#0d0d10': '--surface-ink (mitten auf der Seite) bzw. --surface-abyss (Footer)',
    '#3b82f6': '--cta — Tailwind-Blau ist eine Fremdfarbe',
  };
  if (known[v]) return `statt \`${value}\`: ${known[v]}`;
  return `statt \`${value}\`: die passende Rolle aus src/styles/global.css (--foreground, --muted-foreground, --border, --data, --confirm, --error, --price, --cta …)`;
}

const findings = [];
const inventory = new Map();

const files = await walk(SCAN_DIR);
for (const abs of files) {
  const rel = relative(ROOT, abs).split(sep).join('/');
  const raw = await readFile(abs, 'utf8');
  const src = stripComments(raw);
  const lines = src.split('\n');
  const exempt = isExempt(rel);

  lines.forEach((line, i) => {
    for (const m of line.matchAll(HEX)) {
      const value = m[0];
      if (!HEX_LENGTHS.has(value.length)) continue; // CSS-ID, keine Farbe
      // Numerische HTML-Entities sind keine Farben: &#8202; (schmales
      // Leerzeichen), &#8211; (Gedankenstrich), &#9654; (Dreieck). Sie stehen
      // im Markup und sehen fuer das Muster wie ein 4-stelliger Hexwert aus.
      // Kennzeichen: ein & davor UND ein ; danach.
      if (line[m.index - 1] === '&' && line[m.index + value.length] === ';') continue;
      const key = value.toLowerCase();
      inventory.set(key, (inventory.get(key) || 0) + 1);
      if (exempt || hexAllowed(value, rel)) continue;
      findings.push({ rel, line: i + 1, value, why: advice(value, rel) });
    }
    for (const m of line.matchAll(TRIPLET)) {
      const trip = `${+m[1]},${+m[2]},${+m[3]}`;
      inventory.set(`rgba(${trip})`, (inventory.get(`rgba(${trip})`) || 0) + 1);
      if (exempt || ALLOWED_TRIPLETS.has(trip)) continue;
      findings.push({
        rel,
        line: i + 1,
        value: `rgb(${trip})`,
        why: 'Zahlentripel sind nur als 255,255,255 (Weiß mit Deckkraft) oder 12,17,32 (Navy-900 als Schatten-/Schleiertönung) erlaubt. Schatten sind Navy-getönt, nie schwarz.',
      });
    }
  });
}

if (LIST_ONLY) {
  console.log(`Bestandsaufnahme · ${files.length} Dateien in src/\n`);
  [...inventory.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([v, n]) => console.log(`  ${String(n).padStart(4)} ×  ${v}`));
  process.exit(0);
}

if (findings.length === 0) {
  console.log(`✓ Farbwächter: ${files.length} Dateien geprüft, keine Fremdfarben.`);
  process.exit(0);
}

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.rel)) byFile.set(f.rel, []);
  byFile.get(f.rel).push(f);
}

console.error(`\n✗ Farbwächter: ${findings.length} Farbwert(e) außerhalb der Erlaubnisliste.\n`);
for (const [rel, list] of byFile) {
  console.error(`  ${rel}`);
  for (const f of list) console.error(`    Zeile ${f.line}  ${f.value}\n      → ${f.why}`);
  console.error('');
}
console.error(
  'Farben gehören in die Token-Schicht, nicht in Seiten- oder Komponentencode.\n' +
    'Rollen sind Pflicht für alles Bedeutungstragende; Skalen (navy-*, verdigris-*,\n' +
    'oxblood-*, brass-*) sind für Verläufe, Dekoration, Diagramme und GSAP-Ziele.\n\n' +
    'Braucht dieser Wert wirklich eine Ausnahme, gibt es genau einen Weg:\n' +
    '  1. Grund in Design Guide.html, Abschnitt 19 eintragen — technisch, nicht\n' +
    '     geschmacklich. „Sieht besser aus" ist kein Grund.\n' +
    '  2. Eintrag in SCOPED_ALLOW in scripts/check-colors.mjs, mit Kommentar.\n' +
    'Beides, oder keins von beidem.\n',
);
process.exit(1);
