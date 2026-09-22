/*
 * Markdown-Varianten der Inhaltsseiten (seit 14.09.2026)
 * ---------------------------------------------------------------------------
 * Jede Blog- und Glossarseite gibt es zusaetzlich als reine .md-Datei unter
 * derselben URL ohne Schraegstrich, also /blog/<slug>.md und
 * /wissen/geo-glossar/<slug>.md.
 *
 * Warum: Ein KI-Agent, der /wissen/geo-glossar/chunking/ liest, bekommt 46 KB
 * HTML, von denen rund ein Neuntel sichtbarer Text ist — der Rest ist Markup,
 * Navigation, Footer und JSON-LD, fuer das er Token bezahlt (squirrelscan
 * ax/token-weight, ax/markdown-response). Dieselbe Substanz als Markdown wiegt
 * ein Bruchteil und enthaelt keine Navigation, die in einem Zitat nichts zu
 * suchen hat.
 *
 * Der Kopf jeder Datei nennt Quelle, Stand und Zitierregel — dieselbe Regel,
 * die in public/AGENTS.md steht. Ohne diese drei Zeilen zitiert ein Modell den
 * Text ohne Herkunft.
 *
 * noindex-Inhalte bekommen KEINE Markdown-Variante: was aus dem Index raus
 * soll, soll auch nicht ueber einen zweiten Weg wieder hinein.
 */

import YAML from 'yaml';

const SITE = 'https://www.codaai.ai';

/*
 * ```grafik-Bloecke (src/lib/remark-grafik.mjs) in der Markdown-Fassung als
 * Text ausgeben: Titel, Befund (alt), die Werte als Liste und die Quelle.
 * Ein Agent soll den Inhalt der Grafik bekommen, nicht ihren Quelltext.
 */
export function grafikAlsText(md: string, lang: 'de' | 'en' = 'de'): string {
  let nr = 0;
  return md.replace(/```grafik\n([\s\S]*?)```/g, (_m, body: string) => {
    nr += 1;
    let g: any;
    try { g = YAML.parse(body); } catch { return ''; }
    const abb = lang === 'en' ? 'Figure' : 'Abbildung';
    const quelle = lang === 'en' ? 'Source' : 'Quelle';
    const out: string[] = [`**${abb} ${nr}: ${g.titel ?? ''}**`];
    if (g.alt) out.push('', g.alt);
    const list: string[] = [];
    (g.werte ?? []).forEach((w: any) => list.push(`- ${w.label}: ${w.anzeige ?? w.wert}`));
    (g.schritte ?? []).forEach((st: any, i: number) => list.push(`${i + 1}. ${st.t}${st.s ? ` – ${st.s}` : ''}`));
    (g.punkte ?? []).forEach((x: any) => list.push(`- ${x.frage} ${x.antwort ?? ''}${x.text ? ` – ${x.text}` : ''}`));
    if (g.vorher) list.push(`- ${g.vorher.label}: ${g.vorher.text}`, `- ${g.nachher?.label}: ${g.nachher?.text}`);
    if (list.length) out.push('', ...list);
    if (g.quelle) out.push('', `${quelle}: ${g.quelle}`);
    return out.join('\n');
  });
}

export interface MdSource {
  title: string;
  /** Ein bis zwei Saetze — Description bzw. Kurzdefinition. */
  lead: string;
  /** Kanonische URL der HTML-Fassung, mit abschliessendem Schraegstrich. */
  url: string;
  body: string;
  pubDate?: Date;
  updatedDate?: Date;
  lang?: 'de' | 'en';
}

const LABELS = {
  de: { source: 'Quelle', published: 'Veroeffentlicht', updated: 'Aktualisiert', cite: 'Zitieren mit Quellenangabe und Link auf die Quelle erlaubt.' },
  en: { source: 'Source', published: 'Published', updated: 'Updated', cite: 'May be quoted with attribution and a link to the source.' },
} as const;

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/*
 * Wurzel-relative Links absolut machen.
 *
 * Im Quelltext steht `[Embedding](/wissen/geo-glossar/embedding/)`. Auf der
 * HTML-Seite stimmt das, in einer Datei, die ein Agent aus dem Zusammenhang
 * reisst, zeigt es ins Leere — `/wissen/...` ist ohne Herkunft keine Adresse.
 * Deshalb bekommt jedes Linkziel, das mit einem einzelnen Schraegstrich
 * beginnt, die Domain davor. Protokoll-relative Ziele (`//`) bleiben unberuehrt.
 */
function absolutiseLinks(md: string): string {
  return md.replace(/(\]\()(\/(?!\/))/g, `$1${SITE}$2`);
}

export function renderMarkdown(src: MdSource): string {
  const t = LABELS[src.lang ?? 'de'];
  const meta = [
    `${t.source}: ${src.url}`,
    src.pubDate ? `${t.published}: ${isoDay(src.pubDate)}` : null,
    src.updatedDate ? `${t.updated}: ${isoDay(src.updatedDate)}` : null,
    `${t.cite}`,
  ].filter(Boolean);

  return [
    `# ${src.title}`,
    '',
    `> ${src.lead}`,
    '',
    ...meta,
    '',
    '---',
    '',
    absolutiseLinks(grafikAlsText(src.body.trim(), src.lang ?? 'de')),
    '',
  ].join('\n');
}

export const MD_HEADERS = { 'Content-Type': 'text/markdown; charset=utf-8' };
export { SITE as MD_SITE };
