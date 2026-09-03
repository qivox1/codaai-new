/**
 * GEO-Glossar — gemeinsame Daten für Übersicht und Begriffsseiten (DE + EN).
 * ---------------------------------------------------------------------------
 * Die Begriffe selbst liegen als Markdown in src/content/glossar/ (DE) und
 * src/content/glossar/en/ (EN, `lang: en`, `de: <de-slug>` für das Sprachpaar).
 * Schema in src/content.config.ts. Hier steht nur, was Hub und Begriffsseite
 * teilen: Gruppen in ihrer Reihenfolge, die Autorin, die Zuordnung der Stufen
 * zu den Ankern auf /digital-visibility/ — je Sprache.
 *
 * Sprachpaare für hreflang stehen in src/lib/i18n-routes.ts (03.09.2026, aus
 * den `de:`-Feldern der EN-Dateien erzeugt). Wer einen Begriff ergänzt, trägt
 * dort das Paar nach — der Build-Wächter erkennt ein fehlendes Paar nicht.
 */

export type GlossarLang = 'de' | 'en';

export const GLOSSAR_PATH: Record<GlossarLang, string> = {
  de: '/wissen/geo-glossar/',
  en: '/en/knowledge/geo-glossary/',
};

export type GlossarCategory =
  | 'grundlagen'
  | 'grounding'
  | 'pipeline'
  | 'content'
  | 'technik'
  | 'offpage'
  | 'messung';

type CategoryCopy = { id: GlossarCategory; title: string; intro: string };

/** Reihenfolge = Weg eines Inhalts in die KI-Antwort. */
export const GLOSSAR_CATEGORIES: Record<GlossarLang, ReadonlyArray<CategoryCopy>> = {
  de: [
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
      intro: 'Was einen Text für KI-Systeme lesbar, extrahierbar und zitierfähig macht.',
    },
    {
      id: 'technik',
      title: 'Technik',
      intro: 'Die Eintrittskarte: Was ein Crawler vorfinden muss, damit Inhalte überhaupt erfasst werden.',
    },
    {
      id: 'offpage',
      title: 'Offpage und Marke',
      intro: 'Warum die KI Ihr Unternehmen auch über Drittseiten beurteilt — und welche zählen.',
    },
    {
      id: 'messung',
      title: 'Messung und Tracking',
      intro:
        'Wie sich KI-Sichtbarkeit messen lässt, warum eine Position dabei nichts nützt und welche Kennzahlen stattdessen tragen.',
    },
  ],
  en: [
    {
      id: 'grundlagen',
      title: 'How language models work',
      intro:
        'What an LLM does, where its knowledge comes from and why it turns content into numbers before comparing it.',
    },
    {
      id: 'grounding',
      title: 'Web search and grounding',
      intro:
        'When an AI system looks things up live on the web — and what has to happen for your page to qualify as a source.',
    },
    {
      id: 'pipeline',
      title: 'From ranking to citation',
      intro:
        'The four steps in which an AI system selects its sources: initial retrieval, re-ranking, grounding snippets, answer.',
    },
    {
      id: 'content',
      title: 'Content factors',
      intro: 'What makes a text readable, extractable and citable for AI systems.',
    },
    {
      id: 'technik',
      title: 'Technology',
      intro: 'The entry ticket: what a crawler has to find so that content is captured at all.',
    },
    {
      id: 'offpage',
      title: 'Off-page and brand',
      intro: 'Why the AI judges your company through third-party sites as well — and which ones count.',
    },
    {
      id: 'messung',
      title: 'Measurement and tracking',
      intro:
        'How AI visibility can be measured, why a position is useless here and which metrics carry the weight instead.',
    },
  ],
};

/**
 * Didaktische Reihenfolge innerhalb der Gruppen — vom Grundlegenden zum
 * Abgeleiteten. Begriffe, die hier fehlen, folgen alphabetisch am Ende ihrer
 * Gruppe; ein neuer Begriff braucht also keinen Eintrag, um zu erscheinen.
 * EN-Liste = dieselbe Reihenfolge mit den englischen Slugs.
 */
export const TERM_ORDER: Record<GlossarLang, ReadonlyArray<string>> = {
  de: [
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
  ],
  en: [
    'geo', 'llm', 'token', 'model-knowledge', 'common-crawl', 'knowledge-cutoff',
    'embedding', 'cosine-similarity', 'chunking',
    'web-search', 'grounding', 'query-fan-out', 'document-relevance', 'grounding-budget',
    'grounded-response-generation',
    'initial-retrieval', 're-ranking', 'grounding-snippets', 'mention', 'citation', 'zero-click',
    'bottom-line-up-front', 'semantic-chunking', 'entity-echoing', 'entity',
    'information-gain', 'topical-authority', 'query-coverage', 'e-e-a-t', 'freshness',
    'ai-friendly-content-formats', 'llms-txt',
    'llm-crawlers', 'ttfb', 'url-discovery', 'crawl-budget', 'index-management',
    'brand-mentions', 'consistent-brand-description', 'digital-pr', 'listicles',
    'community-presence', 'review-platforms', 'youtube-presence', 'domain-authority',
    'llm-visibility-tracking', 'prompt-set', 'baseline-measurement', 'mention-rate', 'sentiment',
    'citation-rate', 'ai-overview-citation-rate', 'share-of-ai-search', 'source-analysis',
    'log-files',
  ],
};

/**
 * Slug eines Eintrags ohne Sprachpräfix: Der glob-Loader liefert für
 * src/content/glossar/en/grounding.md die id "en/grounding".
 */
export function termSlug(id: string): string {
  return id.replace(/^en\//, '');
}

export function termSort(lang: GlossarLang) {
  const order = TERM_ORDER[lang];
  return (a: { id: string; data: { title: string } }, b: { id: string; data: { title: string } }): number => {
    const ia = order.indexOf(termSlug(a.id));
    const ib = order.indexOf(termSlug(b.id));
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.data.title.localeCompare(b.data.title, lang);
  };
}

export function categoryTitle(lang: GlossarLang, id: GlossarCategory): string {
  return GLOSSAR_CATEGORIES[lang].find((c) => c.id === id)?.title ?? id;
}

/** Anker auf /digital-visibility/ je Stufe (Stand 28.07.2026; EN-Anker laut KONVENTIONEN.md). */
export const STUFE_ANCHOR: Record<GlossarLang, Record<1 | 2 | 3, { anchor: string; label: string }>> = {
  de: {
    1: { anchor: 'lesbar', label: 'Stufe 1 · Gefunden' },
    2: { anchor: 'quellen', label: 'Stufe 2 · Empfohlen' },
    3: { anchor: 'quelle-werden', label: 'Stufe 3 · Zitiert' },
  },
  en: {
    1: { anchor: 'readable', label: 'Tier 1 · Found' },
    2: { anchor: 'sources', label: 'Tier 2 · Recommended' },
    3: { anchor: 'become-the-source', label: 'Tier 3 · Cited' },
  },
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
  image: '/images/team/anja-miebach.webp',
  jobTitle: {
    de: 'Gründerin & Inhaberin, CodaAI',
    en: 'Founder & Owner, CodaAI',
  } as Record<GlossarLang, string>,
  url: {
    de: 'https://www.codaai.ai/co-create/',
    en: 'https://www.codaai.ai/en/co-create/',
  } as Record<GlossarLang, string>,
};
