#!/usr/bin/env node
/**
 * pre-commit: Aktualitätsdatum automatisch pflegen (seit 22.09.2026, Regel in CLAUDE.md
 * „Pflicht bei jeder Inhaltsänderung").
 * ---------------------------------------------------------------------------
 * 1. Blog/Glossar (src/content/{blog,glossar}/**.md): Hat sich der TEXT (nicht nur das
 *    Frontmatter) gegenüber HEAD geändert, setzt der Hook `updatedDate` auf heute
 *    (Europe/Berlin) und staged die Datei neu. Reine Frontmatter-Änderungen (Autor,
 *    Tags, noindex) lassen das Datum unverändert — sie sind keine inhaltliche Aktualisierung.
 *    Neue Dateien brauchen `pubDate`, sonst bricht der Commit ab.
 * 2. Seiten mit Datumskonstante (src/data/*.ts, `*_UPDATED`): Wird die Datei geändert,
 *    ohne dass die Konstante mitgeändert wurde, gibt es einen HINWEIS (kein Abbruch,
 *    weil reine Code-Änderungen die Seite nicht aktuell machen).
 * 3. Alle übrigen Seiten: Datum kommt automatisch aus der Git-Historie.
 *
 * Aktivierung (einmal pro Klon): git config core.hooksPath .githooks
 * (erledigt `npm install` über das prepare-Skript).
 * Umgehen im Ausnahmefall: git commit --no-verify
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const tryGit = (...a) => { try { return git(...a); } catch { return null; } };
const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });

const staged = git('diff', '--cached', '--name-only', '--diff-filter=AM').split('\n').filter(Boolean);
const unstaged = new Set(git('diff', '--name-only').split('\n').filter(Boolean));
const splitFm = (src) => {
  if (!src.startsWith('---')) return ['', src];
  const end = src.indexOf('\n---', 3);
  return [src.slice(0, end + 4), src.slice(end + 4)];
};
let failed = false;

for (const f of staged.filter((p) => /^src\/content\/(blog|glossar)\/.+\.md$/.test(p))) {
  const now = git('show', `:${f}`);
  const [fm, body] = splitFm(now);
  if (!/^pubDate:/m.test(fm)) {
    console.error(`✗ ${f}: pubDate fehlt im Frontmatter.`);
    failed = true;
    continue;
  }
  const before = tryGit('show', `HEAD:${f}`);
  if (before === null) continue; // neue Datei: pubDate reicht
  const [, oldBody] = splitFm(before);
  if (oldBody.trim() === body.trim()) continue; // nur Frontmatter geändert
  const m = fm.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  if (m && m[1] === today) continue;
  if (unstaged.has(f)) {
    console.error(`! ${f}: Text geändert, aber die Datei hat zusätzlich ungestagte Änderungen — updatedDate bitte selbst auf ${today} setzen.`);
    continue;
  }
  const newFm = m
    ? fm.replace(/^updatedDate:.*$/m, `updatedDate: ${today}`)
    : fm.replace(/^(pubDate:.*)$/m, `$1\nupdatedDate: ${today}`);
  writeFileSync(f, newFm + body);
  git('add', f);
  console.log(`✓ ${f}: updatedDate → ${today}`);
}

const CONSTS = {
  'src/data/fakten.ts': 'FAKTEN_UPDATED',
  'src/data/autor.ts': 'AUTOR_UPDATED',
  'src/data/studie.ts': 'STUDIE_UPDATED',
  'src/data/geo-optimierung.ts': 'GEO_UPDATED',
};
for (const [f, name] of Object.entries(CONSTS)) {
  if (!staged.includes(f)) continue;
  const re = new RegExp(`${name}\\s*=\\s*new Date\\(['"]([^'"]+)['"]\\)`);
  const nowV = git('show', `:${f}`).match(re)?.[1];
  const oldV = tryGit('show', `HEAD:${f}`)?.match(re)?.[1];
  if (nowV && nowV === oldV && !nowV.startsWith(today)) {
    console.log(`Hinweis: ${f} geändert, ${name} steht noch auf ${nowV}. Bei inhaltlicher Änderung auf ${today} setzen.`);
  }
}

if (failed) process.exit(1);
