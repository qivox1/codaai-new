/**
 * GEO-Glossar — gemeinsame Daten für Übersicht und Begriffsseiten.
 * ---------------------------------------------------------------------------
 * Die Begriffe selbst liegen als Markdown in src/content/glossar/ (Schema in
 * src/content.config.ts). Hier steht nur, was beide Seiten teilen: die
 * Gruppen in ihrer Reihenfolge, die Autorin und die Zuordnung der Stufen zu
 * den Ankern auf /digital-visibility/.
 */

export const GLOSSAR_PATH = '/wissen/geo-glossar/';

export type GlossarCategory =
  | 'grundlagen'
  | 'grounding'
  | 'pipeline'
  | 'content'
  | 'technik'
  | 'offpage'
  | 'messung';

/** Reihenfolge = Weg eines Inhalts in die KI-Antwort. */
export const GLOSSAR_CATEGORIES: ReadonlyArray<{
  id: GlossarCategory;
  title: string;
  intro: string;
}> = [
  {
    id: 'grundlagen',
    title: 'Wie Sprachmodelle funktionieren',
    intro:
      'Was ein LLM tut, woher sein Wissen stammt und warum es Inhalte in Zahlen verwandelt, bevor es sie vergleicht.',
  },
  {
    id: 'grounding',
    title: 'Websuche und Grounding',
    intro:
      'Wann ein KI-System live im Web nachsieht — und was passieren muss, damit Ihre Seite dabei als Quelle infrage kommt.',
  },
  {
    id: 'pipeline',
    title: 'Vom Ranking zur Zitierung',
    intro:
      'Die vier Schritte, in denen ein KI-System Quellen auswählt: Initial Retrieval, Re-Ranking, Grounding Snippets, Antwort.',
  },
  {
    id: 'content',
    title: 'Content-Faktoren',
    intro:
      'Was einen Text für KI-Systeme lesbar, extrahierbar und zitierfähig macht.',
  },
  {
    id: 'technik',
    title: 'Technik',
    intro:
      'Die Eintrittskarte: Was ein Crawler vorfinden muss, damit Inhalte überhaupt erfasst werden.',
  },
  {
    id: 'offpage',
    title: 'Offpage und Marke',
    intro:
      'Warum die KI Ihr Unternehmen auch über Drittseiten beurteilt — und welche zählen.',
  },
  {
    id: 'messung',
    title: 'Messung und Tracking',
    intro:
      'Wie sich KI-Sichtbarkeit messen lässt, warum eine Position dabei nichts nützt und welche Kennzahlen stattdessen tragen.',
  },
];

/**
 * Didaktische Reihenfolge innerhalb der Gruppen — vom Grundlegenden zum
 * Abgeleiteten. Begriffe, die hier fehlen, folgen alphabetisch am Ende ihrer
 * Gruppe; ein neuer Begriff braucht also keinen Eintrag, um zu erscheinen.
 */
export const TERM_ORDER: ReadonlyArray<string> = [
  // grundlagen
  'geo', 'llm', 'token', 'modellwissen', 'common-crawl', 'knowledge-cutoff',
  'embedding', 'kosinus-aehnlichkeit', 'chunking',
  // grounding
  'websuche', 'grounding', 'query-fan-out', 'document-relevance', 'grounding-budget',
  'grounded-response-generation',
  // pipeline
  'initial-retrieval', 're-ranking', 'grounding-snippets', 'mention', 'citation', 'zero-click',
  // content
  'bottom-line-up-front', 'semantisches-chunking', 'entity-echoing', 'entitaet',
  'information-gain', 'topical-authority', 'query-coverage', 'e-e-a-t', 'freshness',
  'ki-freundliche-formate', 'llms-txt',
  // technik
  'llm-crawler', 'ttfb', 'url-discovery', 'crawl-budget', 'index-management',
  // offpage
  'brand-mentions', 'konsistente-markenbeschreibung', 'digital-pr', 'listicles',
  'community-praesenz', 'review-plattformen', 'youtube-praesenz', 'domain-authority',
  // messung
  'llm-visibility-tracking', 'promptset', 'nullmessung', 'mention-rate', 'sentiment',
  'citation-rate', 'ai-overview-citation-rate', 'share-of-ai-search', 'quellenanalyse',
  'logfiles',
];

export function termSort(a: { id: string; data: { title: string } }, b: { id: string; data: { title: string } }): number {
  const ia = TERM_ORDER.indexOf(a.id);
  const ib = TERM_ORDER.indexOf(b.id);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return a.data.title.localeCompare(b.data.title, 'de');
}

export function categoryTitle(id: GlossarCategory): string {
  return GLOSSAR_CATEGORIES.find((c) => c.id === id)?.title ?? id;
}

/** Anker auf /digital-visibility/ je Stufe (Stand 28.07.2026). */
export const STUFE_ANCHOR: Record<1 | 2 | 3, { anchor: string; label: string }> = {
  1: { anchor: 'lesbar', label: 'Stufe 1 · Gefunden' },
  2: { anchor: 'quellen', label: 'Stufe 2 · Empfohlen' },
  3: { anchor: 'quelle-werden', label: 'Stufe 3 · Zitiert' },
};

/**
 * Autorin aller Glossarseiten. Dieselbe Person wie im Organization-Schema
 * (Layout.astro) und auf /co-create/ — deshalb die @id, damit Google und
 * KI-Systeme beides als eine Entität lesen. Named Experts werden häufiger
 * zitiert als anonyme Redaktionen.
 */
export const GLOSSAR_AUTHOR = {
  id: 'https://www.codaai.ai/co-create/#anja-miebach',
  name: 'Anja Miebach',
  jobTitle: 'Gründerin & Inhaberin, CodaAI',
  bio: 'Verantwortet Methodik und Auswertung der Studie „KI-Blindtest Mittelstand 2026" und die Arbeit an der KI-Sichtbarkeit mittelständischer Unternehmen.',
  image: '/images/team/anja-miebach.webp',
  url: 'https://www.codaai.ai/co-create/',
};
