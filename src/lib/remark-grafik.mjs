/*
 * Grafiken im Blogartikel (seit 22.09.2026, Blog-Redaktionsplan 2026/27)
 * ---------------------------------------------------------------------------
 * Prinzip aus den LinkedIn-Karussells übernommen: Inhalt und Gestaltung sind
 * getrennt. Im Artikel steht nur ein Datenblock mit einem benannten Typ,
 *
 *   ```grafik
 *   typ: kennzahl_vergleich
 *   titel: Markennennungen korrelieren dreimal stärker als Backlinks
 *   werte:
 *     - { label: Markennennungen, wert: 0.664, anzeige: "0,664", markiert: true }
 *     - { label: Backlinks, wert: 0.218, anzeige: "0,218" }
 *   quelle: Ahrefs, 75.000 Marken, Mai 2025
 *   alt: Ein Satz, der den Befund nennt (für Screenreader und die .md-Fassung).
 *   ```
 *
 * und dieses Plugin macht daraus HTML im CodaAI-Look (global.css, Abschnitt
 * „Blog-Grafiken"). Kein Bild, keine Datei: der Text bleibt für Suchmaschinen
 * und KI-Systeme lesbar, ist zweisprachig ohne Mehraufwand und in jeder
 * Größe scharf. Design Guide v2.2, Abschnitt 11: Motivtyp 2 (Diagramm).
 *
 * Magenta-Regel: höchstens EIN markiertes Element je Grafik — die Fehlstelle
 * oder die Pointe. Alles andere ist Navy/Grau.
 *
 * Sechs Typen: kennzahl_vergleich · anteil · kette · ki_antwort ·
 * vorher_nachher · entscheidung. Neue Typen hier ergänzen UND in
 * docs/2026-09-22-blog-redaktionsplan-2026-27.md dokumentieren.
 *
 * Die Markdown-Fassung (/blog/<slug>.md) ersetzt denselben Block durch einen
 * Textabsatz — siehe grafikAlsText() in src/lib/md-variant.ts.
 */
import { visit } from 'unist-util-visit';
import YAML from 'yaml';

const L = {
  de: { abb: 'Abb.', quelle: 'Quelle', typ: { kennzahl_vergleich: 'Kennzahl', anteil: 'Anteil', kette: 'Ablauf', ki_antwort: 'KI-Antwort', vorher_nachher: 'Vorher / nachher', entscheidung: 'Prüfliste' }, frage: 'Frage', antwort: 'Antwort', quellen: 'Quellen', ja: 'Ja', nein: 'Nein' },
  en: { abb: 'Fig.', quelle: 'Source', typ: { kennzahl_vergleich: 'Key figure', anteil: 'Share', kette: 'Process', ki_antwort: 'AI answer', vorher_nachher: 'Before / after', entscheidung: 'Checklist' }, frage: 'Question', antwort: 'Answer', quellen: 'Sources', ja: 'Yes', nein: 'No' },
};

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** **fett** erlaubt, sonst reiner Text. */
const inl = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

function kennzahlVergleich(g) {
  const werte = g.werte ?? [];
  const max = g.max ?? (Math.max(...werte.map((w) => Number(w.wert) || 0), 0) || 1);
  return `<div class="bg-bars">${werte.map((w) => {
    const pct = Math.max(2, Math.min(100, ((Number(w.wert) || 0) / max) * 100));
    return `<div class="bg-bar-row${w.markiert ? ' is-mark' : ''}${w.stark ? ' is-strong' : ''}">
<div class="bg-bar-head"><span class="bg-bar-label">${inl(w.label)}</span><span class="bg-bar-value">${esc(w.anzeige ?? w.wert)}</span></div>
<div class="bg-bar-track" aria-hidden="true"><div class="bg-bar-fill" style="width:${pct.toFixed(1)}%"></div></div></div>`;
  }).join('')}</div>`;
}

function anteil(g) {
  const n = Math.round(Number(g.wert) || 0);
  const cells = Array.from({ length: 100 }, (_, i) => `<span${i < n ? ' class="on"' : ''}></span>`).join('');
  return `<div class="bg-share${g.fehlstelle ? ' is-mark' : ''}">
<div class="bg-share-grid" aria-hidden="true">${cells}</div>
<div class="bg-share-text"><p class="bg-share-value">${esc(g.anzeige ?? `${g.wert} %`)}</p><p class="bg-share-label">${inl(g.label)}</p>
<ul class="bg-legend"><li><i class="sw on"></i>${inl(g.label_kurz ?? g.label)}</li>${g.rest_label ? `<li><i class="sw"></i>${inl(g.rest_label)}</li>` : ''}</ul></div></div>`;
}

function kette(g) {
  const s = g.schritte ?? [];
  const nach = g.schwelle?.nach; // 1-basiert: Schwelle NACH diesem Schritt
  return `<ol class="bg-chain" style="--n:${s.length}">${s.map((st, i) => `<li class="bg-step${nach === i + 1 ? ' has-threshold' : ''}">
<span class="bg-step-n">${i + 1}</span><span class="bg-step-t">${inl(st.t)}</span>${st.s ? `<span class="bg-step-s">${inl(st.s)}</span>` : ''}
${nach === i + 1 ? `<span class="bg-threshold">${inl(g.schwelle.text)}</span>` : ''}</li>`).join('')}</ol>`;
}

function kiAntwort(g, t) {
  const namen = g.namen ?? [];
  return `<div class="bg-chat">
<p class="bg-chat-q"><span class="bg-chat-k">${t.frage}</span>${inl(g.frage)}</p>
<div class="bg-chat-a"><span class="bg-chat-k">${t.antwort}</span>${g.intro ? `<p>${inl(g.intro)}</p>` : ''}
<ol>${namen.map((n) => `<li>${inl(n)}</li>`).join('')}${g.fehlt ? `<li class="bg-chat-gap">${inl(g.fehlt)}</li>` : ''}</ol>
${g.quellen?.length ? `<p class="bg-chat-src"><span>${t.quellen}:</span> ${g.quellen.map(inl).join(' · ')}</p>` : ''}</div></div>`;
}

function vorherNachher(g) {
  const card = (c, cls) => `<div class="bg-vn-card ${cls}"><p class="bg-vn-label">${inl(c?.label)}</p><p class="bg-vn-text">${inl(c?.text)}</p>${c?.hinweis ? `<p class="bg-vn-note">${inl(c.hinweis)}</p>` : ''}</div>`;
  return `<div class="bg-vn">${card(g.vorher, 'is-before')}${card(g.nachher, 'is-after')}</div>`;
}

function entscheidung(g, t) {
  const p = g.punkte ?? [];
  return `<ul class="bg-check">${p.map((x) => {
    const a = String(x.antwort ?? '').trim().toLowerCase();
    const ja = ['ja', 'j', 'yes', 'y'].includes(a);
    const nein = ['nein', 'n', 'no'].includes(a);
    // freier Text (z. B. „Pflicht") wird als dunkles Etikett gezeigt
    const label = ja ? t.ja : nein ? t.nein : esc(x.antwort);
    return `<li class="${x.markiert ? 'is-mark' : ''}"><span class="bg-check-q">${inl(x.frage)}</span><span class="bg-check-a ${nein ? 'no' : 'yes'}">${label}</span>${x.text ? `<span class="bg-check-t">${inl(x.text)}</span>` : ''}</li>`;
  }).join('')}</ul>`;
}

const RENDER = { kennzahl_vergleich: kennzahlVergleich, anteil, kette, ki_antwort: kiAntwort, vorher_nachher: vorherNachher, entscheidung };

export function renderGrafik(g, lang = 'de', nr = 1) {
  const t = L[lang] ?? L.de;
  const fn = RENDER[g.typ];
  if (!fn) throw new Error(`Grafik-Typ unbekannt: ${g.typ}`);
  return `<figure class="blog-grafik not-prose" data-typ="${esc(g.typ)}"${g.alt ? ` aria-label="${esc(g.alt)}"` : ''}>
<p class="bg-eyebrow">${t.abb} ${nr} · ${esc(t.typ[g.typ])}</p>
${g.titel ? `<p class="bg-title">${inl(g.titel)}</p>` : ''}
${fn(g, t)}
${g.quelle ? `<figcaption class="bg-source">${t.quelle}: ${inl(g.quelle)}</figcaption>` : ''}
</figure>`;
}

export default function remarkGrafik() {
  return (tree, file) => {
    const p = String(file?.path ?? file?.history?.[0] ?? '');
    const lang = /[\\/]blog[\\/]en[\\/]/.test(p) ? 'en' : 'de';
    let nr = 0;
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'grafik' || !parent) return;
      nr += 1;
      let g;
      try { g = YAML.parse(node.value); } catch (e) {
        throw new Error(`Grafik-Block ${nr} in ${p}: YAML fehlerhaft – ${e.message}`);
      }
      parent.children[index] = { type: 'html', value: renderGrafik(g, lang, nr) };
    });
  };
}
