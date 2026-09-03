/**
 * Sprachpaare DE <-> EN — die einzige Quelle für `hreflang`.
 * ---------------------------------------------------------------------------
 * Regel: Nur was hier als Paar steht, bekommt ein
 * `<link rel="alternate" hreflang="…">`. Seiten ohne Gegenstück bekommen
 * bewusst KEINEN Alternate.
 *
 * Hintergrund: Bis 03.08.2026 hat `Layout.astro` den deutschen Slug stumpf in
 * den `/en/`-Pfad gespiegelt (`/preise/` -> `/en/preise/`). Die englische Seite
 * heißt aber `pricing`. 36 von 46 Alternates zeigten dadurch auf 404, und die
 * Search Console führte `/en/preise/` seit dem 23.07.2026 als „Nicht gefunden".
 * Gleichzeitig waren `/preise/` und `/en/pricing/` für Google überhaupt nicht
 * als Sprachpaar erkennbar.
 *
 * ACHTUNG: Wird eine neue englische Seite gebaut (AP11 `/en/services`,
 * Nachzug `/en/pricing`), hier eine Zeile ergänzen — sonst bleibt sie
 * sprachlich unverknüpft. Der Build-Wächter `scripts/check-seo-invariants.mjs`
 * prüft nur, dass eingetragene Ziele existieren; er kann nicht wissen, dass
 * ein Paar fehlt.
 *
 * Pfade immer mit führendem UND abschließendem Slash.
 */

export const LOCALE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  // -- Statische Seiten ----------------------------------------------------
  ['/', '/en/'],
  ['/preise/', '/en/pricing/'],
  // 04.08.2026 (EN-Relaunch): Die englische Version bildet ab jetzt denselben
  // Arbeitsstand ab wie die deutsche. Damit fallen die vier bisherigen
  // DE-only-Seiten als Paare an.
  ['/digital-visibility/', '/en/digital-visibility/'],
  ['/faq/', '/en/faq/'],
  ['/studie/', '/en/study/'],
  ['/webinar/', '/en/webinar/'],
  // 04.08.2026: /kontakt/ ↔ /en/contact/ entfernt. Beide Seiten sind seither
  // reine Weiterleitungen mit noindex — ein hreflang-Paar auf noindex-Seiten
  // wäre ein Widerspruch (wir sagen Google „nicht indexieren" und gleichzeitig
  // „das ist die Sprachversion").
  ['/co-create/', '/en/co-create/'],
  ['/impressum/', '/en/legal-notice/'],
  ['/datenschutz/', '/en/privacy-policy/'],
  ['/agb/', '/en/terms/'],
  ['/blog/', '/en/blog/'],

  // -- Blogartikel ---------------------------------------------------------
  ['/blog/ai-crawler-server-performance-geo/', '/en/blog/ai-crawler-server-performance-geo/'],
  ['/blog/b2b-blog-als-vertriebskanal/', '/en/blog/b2b-blog-as-sales-channel/'],
  ['/blog/youtube-ki-sichtbarkeit-b2b/', '/en/blog/youtube-ai-visibility-b2b/'],
  ['/blog/chatgpt-seo-perplexity-sichtbarkeit/', '/en/blog/chatgpt-seo-perplexity-visibility/'],
  ['/blog/content-marketing-mittelstand-ki/', '/en/blog/ai-content-marketing-for-smb/'],
  ['/blog/content-marketing-vs-google-ads-b2b/', '/en/blog/content-marketing-vs-google-ads-b2b/'],
  ['/blog/ki-blog-erstellen/', '/en/blog/create-ai-powered-blog/'],
  ['/blog/ki-content-marketing-strategie/', '/en/blog/ai-content-marketing-strategy/'],
  ['/blog/redaktionsplan-ki-erstellen/', '/en/blog/create-editorial-plan-with-ai/'],
  // 03.09.2026: drei Paare entfernt (Kosten-/Agentur-Artikel auf noindex, Beschluss
  // Oli) — ein Sprachpaar zwischen zwei noindex-Seiten waere ein Widerspruch:
  //   blogartikel-schreiben-lassen-kosten <-> outsource-blog-writing-costs
  //   marketingkosten-senken-ki-content-b2b <-> reduce-marketing-costs-ai-content
  //   marketingagentur-alternative-ki-mittelstand <-> marketing-agency-alternative-ai

  // -- GEO-Glossar (03.09.2026) ---------------------------------------------
  // Hub + ein Paar je Begriff. Quelle der Zuordnung: das `de:`-Feld im
  // Frontmatter jeder EN-Datei (src/content/glossar/en/<en-slug>.md). Wer einen
  // Begriff ergaenzt, traegt das Paar hier nach — sonst bleibt die Seite
  // sprachlich unverknuepft, und der Sprachumschalter faellt auf die
  // Startseite zurueck.
  ['/wissen/geo-glossar/', '/en/knowledge/geo-glossary/'],
  ['/wissen/geo-glossar/geo/', '/en/knowledge/geo-glossary/geo/'],
  ['/wissen/geo-glossar/llm/', '/en/knowledge/geo-glossary/llm/'],
  ['/wissen/geo-glossar/token/', '/en/knowledge/geo-glossary/token/'],
  ['/wissen/geo-glossar/modellwissen/', '/en/knowledge/geo-glossary/model-knowledge/'],
  ['/wissen/geo-glossar/common-crawl/', '/en/knowledge/geo-glossary/common-crawl/'],
  ['/wissen/geo-glossar/knowledge-cutoff/', '/en/knowledge/geo-glossary/knowledge-cutoff/'],
  ['/wissen/geo-glossar/embedding/', '/en/knowledge/geo-glossary/embedding/'],
  ['/wissen/geo-glossar/kosinus-aehnlichkeit/', '/en/knowledge/geo-glossary/cosine-similarity/'],
  ['/wissen/geo-glossar/chunking/', '/en/knowledge/geo-glossary/chunking/'],
  ['/wissen/geo-glossar/websuche/', '/en/knowledge/geo-glossary/web-search/'],
  ['/wissen/geo-glossar/grounding/', '/en/knowledge/geo-glossary/grounding/'],
  ['/wissen/geo-glossar/query-fan-out/', '/en/knowledge/geo-glossary/query-fan-out/'],
  ['/wissen/geo-glossar/document-relevance/', '/en/knowledge/geo-glossary/document-relevance/'],
  ['/wissen/geo-glossar/grounding-budget/', '/en/knowledge/geo-glossary/grounding-budget/'],
  ['/wissen/geo-glossar/grounded-response-generation/', '/en/knowledge/geo-glossary/grounded-response-generation/'],
  ['/wissen/geo-glossar/initial-retrieval/', '/en/knowledge/geo-glossary/initial-retrieval/'],
  ['/wissen/geo-glossar/re-ranking/', '/en/knowledge/geo-glossary/re-ranking/'],
  ['/wissen/geo-glossar/grounding-snippets/', '/en/knowledge/geo-glossary/grounding-snippets/'],
  ['/wissen/geo-glossar/mention/', '/en/knowledge/geo-glossary/mention/'],
  ['/wissen/geo-glossar/citation/', '/en/knowledge/geo-glossary/citation/'],
  ['/wissen/geo-glossar/zero-click/', '/en/knowledge/geo-glossary/zero-click/'],
  ['/wissen/geo-glossar/bottom-line-up-front/', '/en/knowledge/geo-glossary/bottom-line-up-front/'],
  ['/wissen/geo-glossar/semantisches-chunking/', '/en/knowledge/geo-glossary/semantic-chunking/'],
  ['/wissen/geo-glossar/entity-echoing/', '/en/knowledge/geo-glossary/entity-echoing/'],
  ['/wissen/geo-glossar/entitaet/', '/en/knowledge/geo-glossary/entity/'],
  ['/wissen/geo-glossar/information-gain/', '/en/knowledge/geo-glossary/information-gain/'],
  ['/wissen/geo-glossar/topical-authority/', '/en/knowledge/geo-glossary/topical-authority/'],
  ['/wissen/geo-glossar/query-coverage/', '/en/knowledge/geo-glossary/query-coverage/'],
  ['/wissen/geo-glossar/e-e-a-t/', '/en/knowledge/geo-glossary/e-e-a-t/'],
  ['/wissen/geo-glossar/freshness/', '/en/knowledge/geo-glossary/freshness/'],
  ['/wissen/geo-glossar/ki-freundliche-formate/', '/en/knowledge/geo-glossary/ai-friendly-content-formats/'],
  ['/wissen/geo-glossar/llms-txt/', '/en/knowledge/geo-glossary/llms-txt/'],
  ['/wissen/geo-glossar/llm-crawler/', '/en/knowledge/geo-glossary/llm-crawlers/'],
  ['/wissen/geo-glossar/ttfb/', '/en/knowledge/geo-glossary/ttfb/'],
  ['/wissen/geo-glossar/url-discovery/', '/en/knowledge/geo-glossary/url-discovery/'],
  ['/wissen/geo-glossar/crawl-budget/', '/en/knowledge/geo-glossary/crawl-budget/'],
  ['/wissen/geo-glossar/index-management/', '/en/knowledge/geo-glossary/index-management/'],
  ['/wissen/geo-glossar/brand-mentions/', '/en/knowledge/geo-glossary/brand-mentions/'],
  ['/wissen/geo-glossar/konsistente-markenbeschreibung/', '/en/knowledge/geo-glossary/consistent-brand-description/'],
  ['/wissen/geo-glossar/digital-pr/', '/en/knowledge/geo-glossary/digital-pr/'],
  ['/wissen/geo-glossar/listicles/', '/en/knowledge/geo-glossary/listicles/'],
  ['/wissen/geo-glossar/community-praesenz/', '/en/knowledge/geo-glossary/community-presence/'],
  ['/wissen/geo-glossar/review-plattformen/', '/en/knowledge/geo-glossary/review-platforms/'],
  ['/wissen/geo-glossar/youtube-praesenz/', '/en/knowledge/geo-glossary/youtube-presence/'],
  ['/wissen/geo-glossar/domain-authority/', '/en/knowledge/geo-glossary/domain-authority/'],
  ['/wissen/geo-glossar/llm-visibility-tracking/', '/en/knowledge/geo-glossary/llm-visibility-tracking/'],
  ['/wissen/geo-glossar/promptset/', '/en/knowledge/geo-glossary/prompt-set/'],
  ['/wissen/geo-glossar/nullmessung/', '/en/knowledge/geo-glossary/baseline-measurement/'],
  ['/wissen/geo-glossar/mention-rate/', '/en/knowledge/geo-glossary/mention-rate/'],
  ['/wissen/geo-glossar/sentiment/', '/en/knowledge/geo-glossary/sentiment/'],
  ['/wissen/geo-glossar/citation-rate/', '/en/knowledge/geo-glossary/citation-rate/'],
  ['/wissen/geo-glossar/ai-overview-citation-rate/', '/en/knowledge/geo-glossary/ai-overview-citation-rate/'],
  ['/wissen/geo-glossar/share-of-ai-search/', '/en/knowledge/geo-glossary/share-of-ai-search/'],
  ['/wissen/geo-glossar/quellenanalyse/', '/en/knowledge/geo-glossary/source-analysis/'],
  ['/wissen/geo-glossar/logfiles/', '/en/knowledge/geo-glossary/log-files/'],
];

/*
 * Seiten, die bewusst nur in einer Sprache existieren. Rein dokumentarisch —
 * der Code braucht die Liste nicht, aber sie beantwortet bei der nächsten
 * Durchsicht die Frage „vergessen oder Absicht?".
 *
 *   DE-only : /leistungen/ (noindex-Weiterleitung)
 *             /blog/ki-sichtbarkeit-praxis-chatgpt-empfehlung/
 *             /checkout-success/ (Stripe abgeschaltet, noindex)
 *   EN-only : /en/blog/ai-content-marketing-strategy-guide/
 *
 *   Kein Paar trotz beidseitiger Existenz:
 *     /kontakt/ ↔ /en/contact/ — beide sind noindex-Weiterleitungen (s. o.)
 */

function normalise(pathname: string): string {
  let p = pathname.split('?')[0].split('#')[0];
  if (!p.startsWith('/')) p = `/${p}`;
  if (!p.endsWith('/')) p = `${p}/`;
  return p;
}

const DE_TO_EN = new Map(LOCALE_PAIRS.map(([de, en]) => [de, en]));
const EN_TO_DE = new Map(LOCALE_PAIRS.map(([de, en]) => [en, de]));

export interface Alternates {
  de?: string;
  en?: string;
}

/**
 * Liefert die Sprachvarianten zu einem Pfad. Leeres Objekt = kein Gegenstück,
 * also kein hreflang ausgeben.
 */
export function alternatesFor(pathname: string): Alternates {
  const p = normalise(pathname);
  const en = DE_TO_EN.get(p);
  if (en) return { de: p, en };
  const de = EN_TO_DE.get(p);
  if (de) return { de, en: p };
  return {};
}
