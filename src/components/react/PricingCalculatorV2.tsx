import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   PricingCalculator V2 — Beschluss 27.07.2026
   (Konzept: umbau-digital-visibility/2026-07-27_Preise-Neukonzept_Beschluss.md)

   Modellwechsel gegenüber V1:
   · Sichtbarkeit ist das Produkt, Content die Dosierung → "Ohne Stufe" entfällt
   · Stückpreis hängt an der STUFE, nicht an der Menge (490 / 420 / 390 €)
   · Je Stufe ein disjunktes Artikelfenster (2–3 / 4–7 / 8–12)
   · Übersetzungen flat 99 € je Sprache und Artikel (keine degressive Formel)
   · Videos flat 120 €, gekoppelt an den Artikel (0 / 1 / 2 je Artikel)
   · Laufzeit: 6 Monate Standard · 12 Monate −10 % auf die Gesamtsumme
   · Kein Stripe-Checkout mehr → Termin (primär) + Angebots-PDF (sekundär)
   ────────────────────────────────────────────────────────────────────────── */

const pushDL = (event: string, params: Record<string, unknown> = {}) => {
  try {
    const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
    dl.push({ event, ...params });
  } catch (_) { /* consent denied → no-op */ }
};

type TierKey = 'basis' | 'aktiv' | 'dominanz';

const TIERS: Record<TierKey, { unit: number; min: number; max: number; prog: number }> = {
  basis:    { unit: 490, min: 2,  max: 3,  prog: 490 },
  aktiv:    { unit: 420, min: 4,  max: 7,  prog: 990 },
  dominanz: { unit: 390, min: 8,  max: 12, prog: 1790 },
};

const LANG_PRICE = 99;
const VIDEO_PRICE = 120;
const TERM_DISCOUNT = 0.9; // 12 Monate = −10 %
const MAX_LANGS = 12;

/* Zählt einen Betrag weich auf den neuen Wert — macht die Rechnung sichtbar
   arbeiten, statt sie springen zu lassen. Respektiert reduced-motion und setzt
   bei einer Unterbrechung am aktuell angezeigten Wert an. */
function useCountUp(value: number, ms = 480) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (_) { /* SSR */ }
    if (reduced || fromRef.current === value) {
      fromRef.current = value;
      setShown(value);
      return;
    }
    const a = fromRef.current;
    const b = value;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(a + (b - a) * eased);
      fromRef.current = v;
      setShown(v);
      if (k < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, ms]);

  return shown;
}

const OFFER_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyr-OljJObRAtbuujuCIAyv5StyK2hgN_sxiaQZo2RzauxIsizjzSFx5Ij3KJ2t8pvb/exec';

const T = {
  de: {
    kicker: 'Ihr individuelles Paket',
    h2: 'Stellen Sie zusammen, was Sie brauchen.',
    lead: 'Vier Angaben genügen. Sie sehen jede Position einzeln — und am Ende genau die Summe, die auf Ihrer Rechnung steht. Kein Angebot einholen, kein Gespräch nötig.',
    s1: 'Welche Stufe?',
    s2: 'Wie viele Fachbeiträge pro Monat?',
    s3: 'Übersetzungen?',
    s4: 'Social Videos?',
    s5: 'Laufzeit',
    tierNames: { basis: 'Gefunden', aktiv: 'Empfohlen', dominanz: 'Zitiert' } as Record<TierKey, string>,
    articles: 'Artikel',
    each: 'je',
    artHint: '1.500–4.000 Wörter je Beitrag, inklusive 3 Bilder oder 1 Infografik. Die Länge richtet sich nach dem Thema, nicht nach Ihrem Budget.',
    langUnit: 'Sprachen · je 99 € pro Artikel',
    langHint: 'Beliebig viele Sprachen. Jede kostet dasselbe — keine Staffel, keine Formel.',
    vidNone: 'Keine',
    vidOne: '1 je Artikel',
    vidTwo: '2 je Artikel',
    vidHint: 'Kurzvideos für Reels, Shorts, TikTok und LinkedIn — aus Ihrem Beitrag geschnitten.',
    term6: '6 Monate', term6sub: 'Standardpreis',
    term12: '12 Monate', term12sub: '−10 %',
    extensions: 'Erweiterungen',
    extNone: 'keine gewählt',
    language: 'Sprache', languages: 'Sprachen',
    video: 'Video', videos: 'Videos',
    perArticle: 'je Artikel',
    program: 'Grundpreis',
    showBreakdown: 'Aufschlüsselung anzeigen',
    hideBreakdown: 'Aufschlüsselung ausblenden',
    yourPrice: 'Ihr Monatspreis',
    noteBase: (m: number) => `Netto zzgl. MwSt. · ${m} Monate Mindestlaufzeit · monatliche Abrechnung.`,
    save: (v: string) => `Sie sparen ${v} pro Monat gegenüber 6 Monaten.`,
    ctaCall: '15 Minuten sprechen →',
    ctaPdf: 'Dieses Angebot als PDF anfordern',
    pdfTitle: 'Angebot als PDF',
    pdfLead: 'Ihre Konfiguration als unterschriftsreifes Angebot — zum Weiterleiten an Geschäftsführung oder Einkauf.',
    pdfMail: 'Ihre Unternehmens-E-Mail',
    pdfSend: 'Anfordern',
    pdfSending: 'Wird gesendet …',
    pdfOk: 'Angefordert. Sie erhalten das Angebot in wenigen Minuten per E-Mail.',
    pdfFail: 'Das hat gerade nicht funktioniert. Schreiben Sie uns direkt:',
    pdfFailLink: 'Angebot per E-Mail anfordern',
    pdfInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    pdfConsent: 'Wir verwenden Ihre Adresse ausschließlich für dieses Angebot.',
    cancel: 'Abbrechen',
  },
  en: {
    kicker: 'Your individual package',
    h2: 'Build the package you need.',
    lead: 'Four inputs. You see every item separately — and the exact figure that ends up on your invoice. No quote request, no call needed.',
    s1: 'Which tier?',
    s2: 'How many expert articles per month?',
    s3: 'Translations?',
    s4: 'Social videos?',
    s5: 'Term',
    tierNames: { basis: 'Found', aktiv: 'Recommended', dominanz: 'Cited' } as Record<TierKey, string>,
    articles: 'articles',
    each: 'at',
    artHint: '1,500–4,000 words per article, including 3 images or 1 infographic. Length follows the topic, not your budget.',
    langUnit: 'languages · €99 per article each',
    langHint: 'Any number of languages. Each costs the same — no tiers, no formula.',
    vidNone: 'None',
    vidOne: '1 per article',
    vidTwo: '2 per article',
    vidHint: 'Short videos for Reels, Shorts, TikTok and LinkedIn — cut from your article.',
    term6: '6 months', term6sub: 'standard price',
    term12: '12 months', term12sub: '−10 %',
    extensions: 'Extensions',
    extNone: 'none selected',
    language: 'language', languages: 'languages',
    video: 'video', videos: 'videos',
    perArticle: 'per article',
    program: 'Base fee',
    showBreakdown: 'Show breakdown',
    hideBreakdown: 'Hide breakdown',
    yourPrice: 'Your monthly price',
    noteBase: (m: number) => `Net, excl. VAT · ${m}-month minimum term · billed monthly.`,
    save: (v: string) => `You save ${v} per month compared to 6 months.`,
    ctaCall: 'Talk for 15 minutes →',
    ctaPdf: 'Request this quote as a PDF',
    pdfTitle: 'Quote as PDF',
    pdfLead: 'Your configuration as a signature-ready quote — to forward to management or procurement.',
    pdfMail: 'Your business email',
    pdfSend: 'Request',
    pdfSending: 'Sending …',
    pdfOk: 'Requested. You will receive the quote by email within minutes.',
    pdfFail: 'That did not work just now. Write to us directly:',
    pdfFailLink: 'Request quote by email',
    pdfInvalid: 'Please enter a valid email address.',
    pdfConsent: 'We use your address solely for this quote.',
    cancel: 'Cancel',
  },
};

interface Props { lang?: 'de' | 'en'; base?: string; bookingHref?: string }

export default function PricingCalculatorV2({ lang = 'de', base = '', bookingHref }: Props) {
  const t = T[lang];
  const locale = lang === 'de' ? 'de-DE' : 'en-GB';
  const eur = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

  const [tier, setTier] = useState<TierKey>('aktiv');
  const [articles, setArticles] = useState(TIERS.aktiv.min);
  const [langs, setLangs] = useState(0);
  const [videos, setVideos] = useState(0);
  const [term, setTerm] = useState<6 | 12>(6);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [pdfState, setPdfState] = useState<'idle' | 'sending' | 'ok' | 'fail' | 'invalid'>('idle');

  useEffect(() => { pushDL('pricing_view', { lang }); }, [lang]);

  /* Stufen-Vorauswahl aus der URL — die Spalten der Matrix und die Stufen-Links
     auf /digital-visibility zeigen auf /preise/?stufe=basis|aktiv|dominanz#rechner.
     EN-Schreibweisen werden mitgenommen, damit /en/pricing/?tier=active greift. */
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const raw = (q.get('stufe') || q.get('tier') || '').toLowerCase();
      const map: Record<string, TierKey> = {
        basis: 'basis', base: 'basis', gefunden: 'basis', found: 'basis',
        aktiv: 'aktiv', active: 'aktiv', empfohlen: 'aktiv', recommended: 'aktiv',
        dominanz: 'dominanz', dominance: 'dominanz', zitiert: 'dominanz', cited: 'dominanz',
      };
      const picked = map[raw];
      if (picked) { setTier(picked); setArticles(TIERS[picked].min); }
    } catch (_) { /* kein window/URLSearchParams → Default bleibt */ }
  }, []);

  // Slider immer im Fenster der gewählten Stufe halten
  const cfg = TIERS[tier];
  useEffect(() => {
    setArticles((a) => Math.min(Math.max(a, cfg.min), cfg.max));
  }, [tier, cfg.min, cfg.max]);
  const art = Math.min(Math.max(articles, cfg.min), cfg.max);

  const content = art * cfg.unit;
  const langSum = art * langs * LANG_PRICE;
  const videoSum = art * videos * VIDEO_PRICE;
  const ext = langSum + videoSum;
  const subtotal = content + ext + cfg.prog;
  const total = term === 12 ? Math.round(subtotal * TERM_DISCOUNT) : subtotal;

  /* Die Rechnung zählt sichtbar mit: beim ersten Einscrollen von 0 hoch, danach
     bei jeder Änderung weich auf den neuen Wert. `armed` startet auf true, damit
     das serverseitig gerenderte HTML sofort die echte Summe zeigt — erst beim
     Mounten wird zurückgesetzt, und nur wenn der Kasten noch unter der Kante steht. */
  const billRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(true);

  useEffect(() => {
    const el = billRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let reduced = false;
    try {
      reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (_) { /* egal */ }
    if (reduced) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // schon sichtbar → kein Flackern
    setArmed(false);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          setArmed(true);
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shownContent = useCountUp(armed ? content : 0);
  const shownExt = useCountUp(armed ? ext : 0);
  const shownProg = useCountUp(armed ? cfg.prog : 0);
  const shownTotal = useCountUp(armed ? total : 0, 620);
  const settled = shownTotal === total;

  const extParts: string[] = [];
  if (langs > 0) extParts.push(`${langs} ${langs === 1 ? t.language : t.languages}`);
  if (videos > 0) extParts.push(`${videos} ${videos === 1 ? t.video : t.videos} ${t.perArticle}`);

  const configLine = [
    `${t.tierNames[tier]}`,
    `${art} ${t.articles}`,
    langs > 0 ? `${langs} ${langs === 1 ? t.language : t.languages}` : null,
    videos > 0 ? `${videos * art} ${t.videos}` : null,
    `${term} ${lang === 'de' ? 'Monate' : 'months'}`,
    `${eur(total)}/${lang === 'de' ? 'Monat' : 'month'}`,
  ].filter(Boolean).join(' · ');

  const mailtoHref =
    `mailto:hi@codaai.ai?subject=${encodeURIComponent(lang === 'de' ? 'Angebot anfordern' : 'Quote request')}` +
    `&body=${encodeURIComponent((lang === 'de'
      ? 'Bitte senden Sie mir ein Angebot für diese Konfiguration:\n\n'
      : 'Please send me a quote for this configuration:\n\n') + configLine)}`;

  async function requestPdf(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setPdfState('invalid'); return; }
    setPdfState('sending');
    pushDL('offer_pdf_requested', {
      lang, tier, articles: art, languages: langs, videos_per_article: videos,
      term_months: term, value: total, currency: 'EUR',
    });
    try {
      const body = new URLSearchParams({
        action: 'pricing_offer', email, lang, tier, articles: String(art),
        languages: String(langs), videos: String(videos), term: String(term),
        unit_price: String(cfg.unit), program_price: String(cfg.prog),
        content_sum: String(content), ext_sum: String(ext), total: String(total),
        config: configLine,
      });
      const res = await fetch(OFFER_ENDPOINT, { method: 'POST', body });
      const json = await res.json().catch(() => ({ ok: false }));
      setPdfState(json && (json as any).ok ? 'ok' : 'fail');
    } catch (_) {
      setPdfState('fail');
    }
  }

  const segBtn = (active: boolean) =>
    `flex-1 min-w-[104px] rounded-xl border px-3 py-3 text-sm font-semibold leading-tight transition-colors ${
      active
        ? 'border-cta bg-cta/10 text-foreground'
        : 'border-border bg-card text-foreground hover:border-cta/50'
    }`;

  const stepBox = 'py-6 border-b border-border last:border-b-0 first:pt-0 last:pb-0';
  const stepLabel = 'flex items-center gap-3 text-sm font-semibold text-foreground mb-4';
  const stepNum = 'flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cta text-[11px] font-bold text-white';

  return (
    <section
      id="rechner"
      data-theme="dark"
      aria-label={t.h2}
      className="bg-background py-20 lg:py-28 scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta-accessible">{t.kicker}</p>
        <h2 className="cai-h2 text-foreground">{t.h2}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.lead}</p>

        <div className="mt-10 grid gap-7 lg:grid-cols-[1.25fr_.95fr] lg:items-start">
          {/* ── Konfigurator ─────────────────────────────────────────── */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
            {/* 1 Stufe */}
            <div className={stepBox}>
              <div className={stepLabel}><span className={stepNum}>1</span>{t.s1}</div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.s1}>
                {(Object.keys(TIERS) as TierKey[]).map((k) => (
                  <button
                    key={k} type="button" onClick={() => setTier(k)}
                    aria-pressed={tier === k} className={segBtn(tier === k)}
                  >
                    {t.tierNames[k]}
                    <small className={`mt-1 block text-[11.5px] font-medium ${tier === k ? 'text-cta-accessible' : 'text-muted-foreground'}`}>
                      +{eur(TIERS[k].prog)}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* 2 Artikel */}
            <div className={stepBox}>
              <div className={stepLabel}><span className={stepNum}>2</span>{t.s2}</div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {art}{' '}
                <span className="text-sm font-medium tracking-normal text-muted-foreground">
                  {t.articles} · {t.each} {eur(cfg.unit)}
                </span>
              </p>
              <input
                type="range" min={cfg.min} max={cfg.max} step={1} value={art}
                onChange={(e) => setArticles(Number(e.target.value))}
                aria-label={t.s2}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded bg-border accent-cta
                           [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px]
                           [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-cta
                           [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-cta"
              />
              <div className="mt-2 flex justify-between text-[11.5px] text-muted-foreground">
                <span>{cfg.min}</span><span>{cfg.max}</span>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{t.artHint}</p>
            </div>

            {/* 3 Sprachen */}
            <div className={stepBox}>
              <div className={stepLabel}><span className={stepNum}>3</span>{t.s3}</div>
              <div className="flex items-center gap-4">
                <button
                  type="button" onClick={() => setLangs((n) => Math.max(0, n - 1))}
                  aria-label={lang === 'de' ? 'Eine Sprache weniger' : 'One language less'}
                  className="h-10 w-10 rounded-xl border border-border bg-card text-lg font-semibold text-foreground hover:border-cta hover:text-cta-accessible"
                >−</button>
                <b className="min-w-[2.2ch] text-center text-2xl font-bold tabular-nums text-foreground">{langs}</b>
                <button
                  type="button" onClick={() => setLangs((n) => Math.min(MAX_LANGS, n + 1))}
                  aria-label={lang === 'de' ? 'Eine Sprache mehr' : 'One more language'}
                  className="h-10 w-10 rounded-xl border border-border bg-card text-lg font-semibold text-foreground hover:border-cta hover:text-cta-accessible"
                >+</button>
                <span className="text-[13.5px] text-muted-foreground">{t.langUnit}</span>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{t.langHint}</p>
            </div>

            {/* 4 Videos */}
            <div className={stepBox}>
              <div className={stepLabel}><span className={stepNum}>4</span>{t.s4}</div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.s4}>
                {[0, 1, 2].map((v) => (
                  <button
                    key={v} type="button" onClick={() => setVideos(v)}
                    aria-pressed={videos === v} className={segBtn(videos === v)}
                  >
                    {v === 0 ? t.vidNone : v === 1 ? t.vidOne : t.vidTwo}
                    {v > 0 && (
                      <small className={`mt-1 block text-[11.5px] font-medium ${videos === v ? 'text-cta-accessible' : 'text-muted-foreground'}`}>
                        {eur(v * VIDEO_PRICE)}
                      </small>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{t.vidHint}</p>
            </div>

            {/* 5 Laufzeit */}
            <div className={stepBox}>
              <div className={stepLabel}><span className={stepNum}>5</span>{t.s5}</div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.s5}>
                {([6, 12] as const).map((m) => (
                  <button
                    key={m} type="button" onClick={() => setTerm(m)}
                    aria-pressed={term === m} className={segBtn(term === m)}
                  >
                    {m === 6 ? t.term6 : t.term12}
                    <small className={`mt-1 block text-[11.5px] font-medium ${term === m ? 'text-cta-accessible' : 'text-muted-foreground'}`}>
                      {m === 6 ? t.term6sub : t.term12sub}
                    </small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Rechnung ─────────────────────────────────────────────── */}
          <div ref={billRef} className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border py-3 text-[14.5px] text-foreground">
              <span>{art} {t.articles} × {eur(cfg.unit)}</span>
              <b className="whitespace-nowrap font-semibold tabular-nums">{eur(shownContent)}</b>
            </div>

            <div className={`flex items-baseline justify-between gap-4 border-b border-dashed border-border py-3 text-[14.5px] text-foreground ${ext === 0 ? 'opacity-50' : ''}`}>
              <span>
                {t.extensions}
                <small className="mt-1 block text-xs font-normal text-muted-foreground">
                  {extParts.length ? extParts.join(', ') : t.extNone}
                </small>
                {ext > 0 && (
                  <>
                    <button
                      type="button" onClick={() => setShowBreakdown((s) => !s)}
                      className="mt-1 text-[12.5px] font-semibold text-cta-accessible hover:text-cta"
                    >
                      {showBreakdown ? t.hideBreakdown : t.showBreakdown}
                    </button>
                    {showBreakdown && (
                      <span className="block pt-2 text-[12.5px] leading-loose text-muted-foreground">
                        {langSum > 0 && <>{langs} × {art} {t.articles} × {eur(LANG_PRICE)} = {eur(langSum)}<br /></>}
                        {videoSum > 0 && <>{videos * art} {t.videos} × {eur(VIDEO_PRICE)} = {eur(videoSum)}</>}
                      </span>
                    )}
                  </>
                )}
              </span>
              <b className="whitespace-nowrap font-semibold tabular-nums">{eur(shownExt)}</b>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border py-3 text-[14.5px] text-foreground">
              <span>{t.program} {t.tierNames[tier]}</span>
              <b className="whitespace-nowrap font-semibold tabular-nums">{eur(shownProg)}</b>
            </div>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <span className="text-sm text-muted-foreground">{t.yourPrice}</span>
              <span
                className={`origin-right text-4xl font-bold tracking-tight tabular-nums transition-[transform,color] duration-200 ${
                  settled ? 'scale-100 text-foreground' : 'scale-[1.04] text-cta-accessible'
                }`}
              >
                {eur(shownTotal)}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {t.noteBase(term)}{term === 12 && <> {t.save(eur(subtotal - total))}</>}
            </p>

            {/* Ausgänge */}
            {!pdfOpen ? (
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={bookingHref || `${base}/#termin`}
                  onClick={() => pushDL('booking_click', { lang, source: 'pricing', value: total, currency: 'EUR' })}
                  className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white"
                >
                  {t.ctaCall}
                </a>
                <button
                  type="button" onClick={() => { setPdfOpen(true); setPdfState('idle'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-cta hover:text-cta-accessible"
                >
                  {t.ctaPdf}
                </button>
              </div>
            ) : pdfState === 'ok' ? (
              <div className="mt-6 rounded-xl border border-cta/40 bg-cta/10 p-4 text-sm leading-relaxed text-foreground">
                {t.pdfOk}
              </div>
            ) : (
              <form onSubmit={requestPdf} className="mt-6">
                <p className="text-sm font-semibold text-foreground">{t.pdfTitle}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{t.pdfLead}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <input
                    type="email" required value={email} placeholder={t.pdfMail}
                    onChange={(e) => { setEmail(e.target.value); if (pdfState === 'invalid') setPdfState('idle'); }}
                    aria-label={t.pdfMail}
                    className="min-w-[170px] flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-cta"
                  />
                  <button
                    type="submit" disabled={pdfState === 'sending'}
                    className="btn-cta inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {pdfState === 'sending' ? t.pdfSending : t.pdfSend}
                  </button>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">{t.pdfConsent}</p>
                {pdfState === 'invalid' && <p className="mt-2 text-[12.5px] font-medium text-cta-accessible">{t.pdfInvalid}</p>}
                {pdfState === 'fail' && (
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                    {t.pdfFail}{' '}
                    <a href={mailtoHref} className="font-semibold text-cta-accessible hover:text-cta">{t.pdfFailLink}</a>
                  </p>
                )}
                <button
                  type="button" onClick={() => setPdfOpen(false)}
                  className="mt-3 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
                >
                  {t.cancel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
