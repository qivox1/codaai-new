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
  ['/blog/b2b-videomarketing-erklaervideos-mittelstand/', '/en/blog/b2b-explainer-videos-lead-generation/'],
  ['/blog/blogartikel-schreiben-lassen-kosten/', '/en/blog/outsource-blog-writing-costs/'],
  ['/blog/chatgpt-seo-perplexity-sichtbarkeit/', '/en/blog/chatgpt-seo-perplexity-visibility/'],
  ['/blog/content-marketing-mittelstand-ki/', '/en/blog/ai-content-marketing-for-smb/'],
  ['/blog/content-marketing-vs-google-ads-b2b/', '/en/blog/content-marketing-vs-google-ads-b2b/'],
  ['/blog/ki-blog-erstellen/', '/en/blog/create-ai-powered-blog/'],
  ['/blog/ki-content-marketing-strategie/', '/en/blog/ai-content-marketing-strategy/'],
  ['/blog/marketingagentur-alternative-ki-mittelstand/', '/en/blog/marketing-agency-alternative-ai/'],
  ['/blog/marketingkosten-senken-ki-content-b2b/', '/en/blog/reduce-marketing-costs-ai-content/'],
  ['/blog/redaktionsplan-ki-erstellen/', '/en/blog/create-editorial-plan-with-ai/'],
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
