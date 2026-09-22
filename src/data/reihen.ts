/**
 * Die vier Themenreihen des Blogs (Beschluss Oli, 22.09.2026 —
 * docs/2026-09-22-blog-redaktionsplan-2026-27.md).
 * ---------------------------------------------------------------------------
 * Gerüst ist die Formel der Pillar-Seite /wissen/geo-optimierung/:
 * KI-Sichtbarkeit = (Technik + Content + Offpage) × Prozesse.
 * Jeder Artikel gehört zu GENAU einer Reihe (Frontmatter `reihe`). Die Reihe
 * steuert: Kategorie-Anzeige und Filter auf der Blog-Übersicht, den Kasten
 * „Teil der Reihe …" mit Link auf den passenden Pillar-Abschnitt und den
 * Zweitlink des Abschluss-CTA (Hauptlink immer /check/).
 */
export type ReiheId = 'technik' | 'content' | 'offpage' | 'messung';
export type Lang = 'de' | 'en';

export interface Reihe {
  id: ReiheId;
  name: Record<Lang, string>;
  /** Fachbegriff als Unterzeile — Brücke zur Pillar-Formel. */
  fach: Record<Lang, string>;
  /** Ein Satz: worum es in der Reihe geht. */
  worum: Record<Lang, string>;
  pillar: Record<Lang, string>;
  zweit: Record<Lang, { href: string; label: string }>;
}

export const REIHEN: Reihe[] = [
  {
    id: 'technik',
    name: { de: 'Lesbar für KI', en: 'Readable for AI' },
    fach: { de: 'Technik', en: 'Technology' },
    worum: {
      de: 'Ob ein KI-System Ihre Seiten überhaupt abrufen, lesen und einordnen kann.',
      en: 'Whether an AI system can fetch, read and classify your pages at all.',
    },
    pillar: { de: '/wissen/geo-optimierung/#technik', en: '/en/knowledge/geo-optimization/#technology' },
    zweit: {
      de: { href: '/webinar/', label: 'Im Webinar zeigen wir, wie Ihr Team das selbst prüft' },
      en: { href: '/en/webinar/', label: 'Our webinar shows how your team can check this itself' },
    },
  },
  {
    id: 'content',
    name: { de: 'Zitierfähige Inhalte', en: 'Citable Content' },
    fach: { de: 'Content', en: 'Content' },
    worum: {
      de: 'Wie Inhalte gebaut sein müssen, damit eine KI sie als Beleg übernimmt.',
      en: 'How content has to be built for an AI to take it over as evidence.',
    },
    pillar: { de: '/wissen/geo-optimierung/#content', en: '/en/knowledge/geo-optimization/#content' },
    zweit: {
      de: { href: '/webinar/', label: 'Im Webinar zeigen wir, wie Ihr Team zitierfähig schreibt' },
      en: { href: '/en/webinar/', label: 'Our webinar shows how your team writes citable content' },
    },
  },
  {
    id: 'offpage',
    name: { de: 'Erwähnt werden', en: 'Getting Mentioned' },
    fach: { de: 'Offpage', en: 'Off-page' },
    worum: {
      de: 'Wo über Ihr Unternehmen geschrieben werden muss, damit die KI es als Kandidaten führt.',
      en: 'Where your company needs to be written about for AI to treat it as a candidate.',
    },
    pillar: { de: '/wissen/geo-optimierung/#offpage', en: '/en/knowledge/geo-optimization/#off-page' },
    zweit: {
      de: { href: '/digital-visibility/', label: 'Das Komplett-Audit zeigt, welche Quellen die KI in Ihrer Branche heranzieht' },
      en: { href: '/en/digital-visibility/', label: 'The full audit shows which sources AI draws on in your industry' },
    },
  },
  {
    id: 'messung',
    name: { de: 'Messen & steuern', en: 'Measure & Steer' },
    fach: { de: 'Messung', en: 'Measurement' },
    worum: {
      de: 'Wie sich KI-Sichtbarkeit ehrlich messen lässt und was daraus als Nächstes folgt.',
      en: 'How AI visibility can be measured honestly and what follows from it next.',
    },
    pillar: { de: '/wissen/geo-optimierung/#messen', en: '/en/knowledge/geo-optimization/#measuring' },
    zweit: {
      de: { href: '/digital-visibility/', label: 'Das Komplett-Audit misst Ihre Ausgangslage an echten Einkäuferfragen' },
      en: { href: '/en/digital-visibility/', label: 'The full audit measures your baseline against real buyer questions' },
    },
  },
];

export const REIHE_BY_ID = Object.fromEntries(REIHEN.map((r) => [r.id, r])) as Record<ReiheId, Reihe>;
