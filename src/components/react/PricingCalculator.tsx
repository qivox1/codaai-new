import { useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';

// ─── GA4 / GTM funnel tracking helper ─────────────────────────────────────
// Pushes a custom event onto window.dataLayer for GTM to pick up.
// Silent no-op if dataLayer is unavailable (e.g. consent denied).
const pushDL = (event: string, params: Record<string, unknown> = {}) => {
  try {
    const dl = (window as any).dataLayer = (window as any).dataLayer || [];
    dl.push({ event, ...params });
  } catch (_) { /* swallow */ }
};

// ─── Pricing tiers ──────────────────────────────────────────────────────────
// Annual rates — the base prices (what CodaAI charges on an annual contract)
const getAnnualPricePerPiece = (pieces: number): number => {
  if (pieces >= 10) return 349;
  if (pieces >= 7)  return 390;
  if (pieces >= 4)  return 420;
  return 490;
};

// Quarterly rates = annual ÷ 0.80 (25 % more, i.e. annual is 20 % cheaper)
const getQuarterlyPricePerPiece = (pieces: number): number => {
  if (pieces >= 10) return 435;
  if (pieces >= 7)  return 490;
  if (pieces >= 4)  return 525;
  return 615;
};

const getAnnualVideoPricePerVideo = (pieces: number): number => {
  if (pieces >= 10) return 100;
  if (pieces >= 7)  return 110;
  if (pieces >= 4)  return 120;
  return 140;
};

const getQuarterlyVideoPricePerVideo = (pieces: number): number => {
  if (pieces >= 10) return 125;
  if (pieces >= 7)  return 140;
  if (pieces >= 4)  return 150;
  return 175;
};

const getAnnualTranslationBasePrice = (pieces: number): number => {
  if (pieces >= 10) return 89;
  if (pieces >= 7)  return 99;
  if (pieces >= 4)  return 105;
  return 125;
};

const getQuarterlyTranslationBasePrice = (pieces: number): number => {
  if (pieces >= 10) return 112;
  if (pieces >= 7)  return 124;
  if (pieces >= 4)  return 131;
  return 156;
};

const getTranslationTotalPerArticle = (
  pieces: number,
  languages: number,
  isAnnual: boolean
): number => {
  const basePrice = isAnnual
    ? getAnnualTranslationBasePrice(pieces)
    : getQuarterlyTranslationBasePrice(pieces);
  let total = 0;
  for (let i = 0; i < languages; i++) {
    total += Math.max(basePrice - i * 10, 10);
  }
  return total;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// ─── Features list ─────────────────────────────────────────────────────────
// Interleaved left/right so the md:grid-cols-2 renders two logical columns:
// odd indices → left column, even indices → right column
const FEATURES_DE = [
  'Langform-Blogartikel bis max. 4.000 Wörter',       // left
  'Professionelle Übersetzungen (opt.)',                // right
  'Redaktionsplanung & Content-Strategie',              // left
  '2 Social-Media-Videos pro Artikel (opt.)',           // right
  'Keyword-Recherche & Wettbewerbsanalyse',             // left
  'Performance-Auswertung',                             // right
  'SEO & GEO Optimierung',                              // left
  'Persönlicher Ansprechpartner',                       // right
  '3 Bilder bzw. 1 Infografik pro Blogartikel',        // left
];

const FEATURES_EN = [
  'Long-form blog articles up to 4,000 words',         // left
  'Professional translations (opt.)',                   // right
  'Editorial planning & content strategy',              // left
  '2 social media videos per article (opt.)',           // right
  'Keyword research & competitive analysis',            // left
  'Performance reporting',                              // right
  'SEO & GEO optimisation',                            // left
  'Dedicated account manager',                          // right
  '3 images or 1 infographic per blog article',        // left
];

const SUPABASE_URL      = 'https://fcauvtwqkluvsbicaojo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXV2dHdxa2x1dnNiaWNhb2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODA2NjcsImV4cCI6MjA2NTQ1NjY2N30.7Y3VDYZH3RhXpt_Dswn21sLrfDrkFQU7ZXVt38sa45c';
const FN = (name: string) => `${SUPABASE_URL}/functions/v1/${name}`;
const HEADERS = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` };

type CheckoutStep = 'form' | 'sms' | 'waiting' | 'done';

interface PricingCalculatorProps {
  lang?: 'de' | 'en';
  base?: string;
}

export default function PricingCalculator({ lang = 'de', base = '' }: PricingCalculatorProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'quarterly'>('annual');
  const [contentPieces, setContentPieces] = useState(2);
  const [includeSocialVideos, setIncludeSocialVideos] = useState(false);
  const [includeTranslations, setIncludeTranslations] = useState(false);
  const [translationLanguages, setTranslationLanguages] = useState(1);

  // ── Checkout flow state ───────────────────────────────────
  const [step, setStep] = useState<CheckoutStep>('form');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [magicUrl, setMagicUrl] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // GA4 funnel: fire pricing_view exactly once when the calculator mounts.
  // We don't include the (mutating) package config here — pricing_view should
  // mark the entry into the funnel, not every config change.
  useEffect(() => {
    pushDL('pricing_view', { lang });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAnnual = billingCycle === 'annual';

  // ── Dynamic pricing based on cycle ──
  const pricePerPiece = isAnnual
    ? getAnnualPricePerPiece(contentPieces)
    : getQuarterlyPricePerPiece(contentPieces);

  const videoPricePerVideo = isAnnual
    ? getAnnualVideoPricePerVideo(contentPieces)
    : getQuarterlyVideoPricePerVideo(contentPieces);

  const translationTotalPerArticle = getTranslationTotalPerArticle(
    contentPieces,
    translationLanguages,
    isAnnual
  );

  const videosCostPerMonth = includeSocialVideos
    ? contentPieces * 2 * videoPricePerVideo
    : 0;
  const translationsCostPerMonth = includeTranslations
    ? contentPieces * translationTotalPerArticle
    : 0;
  const monthlyTotal =
    contentPieces * pricePerPiece + videosCostPerMonth + translationsCostPerMonth;

  // Annual equivalent for savings display (when quarterly is selected)
  const annualEquivalent =
    contentPieces * getAnnualPricePerPiece(contentPieces)
    + (includeSocialVideos ? contentPieces * 2 * getAnnualVideoPricePerVideo(contentPieces) : 0)
    + (includeTranslations ? contentPieces * getTranslationTotalPerArticle(contentPieces, translationLanguages, true) : 0);
  const monthlySavings = monthlyTotal - annualEquivalent;

  const langLabel = translationLanguages === 1
    ? (lang === 'de' ? 'Sprache' : 'language')
    : (lang === 'de' ? 'Sprachen' : 'languages');

  const FEATURES = lang === 'de' ? FEATURES_DE : FEATURES_EN;

  // ── Step 1: Trigger email Magic Link + SMS OTP ────────────
  const handleStartVerification = async () => {
    setEmailError('');
    setPhoneError('');
    let valid = true;
    if (!email.trim() || !email.includes('@')) {
      setEmailError(lang === 'de' ? 'Bitte gültige E-Mail eingeben.' : 'Please enter a valid email.');
      valid = false;
    }
    if (!phone.trim() || !/^\+[1-9]\d{6,14}$/.test(phone.trim())) {
      setPhoneError(lang === 'de' ? 'Bitte Mobilnummer im Format +49170… eingeben.' : 'Enter phone as +49170…');
      valid = false;
    }
    if (!valid) return;

    // GA4 funnel: user clicked "Jetzt starten" / "Get started" with valid input.
    pushDL('checkout_started', {
      content_pieces: contentPieces,
      billing_cycle: billingCycle,
      include_social_videos: includeSocialVideos,
      include_translations: includeTranslations,
      translation_languages: translationLanguages,
      value: monthlyTotal,
      currency: 'EUR',
      lang,
    });

    setIsLoading(true);
    try {
      const packageConfig = {
        contentPieces,
        billingCycle,
        includeSocialVideos,
        includeTranslations,
        translationLanguages,
        monthlyTotal,
      };
      const res  = await fetch(FN('start-verification'), { method: 'POST', headers: HEADERS, body: JSON.stringify({ email: email.trim(), phone: phone.trim(), packageConfig, lang }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Fehler');
      setRegistrationId(data.registrationId);
      if (data.magicUrl) setMagicUrl(data.magicUrl);
      setStep('sms');
    } catch (err: any) {
      setEmailError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Step 2: Verify SMS OTP ────────────────────────────────
  const handleVerifySMS = async () => {
    setOtpError('');
    if (otpCode.trim().length !== 6) {
      setOtpError(lang === 'de' ? 'Bitte 6-stelligen Code eingeben.' : 'Please enter the 6-digit code.');
      return;
    }
    setOtpLoading(true);
    try {
      const res  = await fetch(FN('verify-sms'), { method: 'POST', headers: HEADERS, body: JSON.stringify({ registrationId, otpCode: otpCode.trim() }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Fehler');
      setOtpVerified(true);

      // GA4 funnel: phone OTP verified, user about to confirm email magic link.
      pushDL('otp_verified', {
        value: monthlyTotal,
        currency: 'EUR',
        lang,
      });

      setStep('waiting');
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  // Tier data for Staffelpreise display
  const tiers = isAnnual
    ? [
        { range: '2–3',   price: 490, value: 2,  active: contentPieces <= 3 },
        { range: '4–6',   price: 420, value: 4,  active: contentPieces >= 4 && contentPieces <= 6 },
        { range: '7–9',   price: 390, value: 7,  active: contentPieces >= 7 && contentPieces <= 9 },
        { range: '10–12', price: 349, value: 10, active: contentPieces >= 10 },
      ]
    : [
        { range: '2–3',   price: 615, value: 2,  active: contentPieces <= 3 },
        { range: '4–6',   price: 525, value: 4,  active: contentPieces >= 4 && contentPieces <= 6 },
        { range: '7–9',   price: 490, value: 7,  active: contentPieces >= 7 && contentPieces <= 9 },
        { range: '10–12', price: 435, value: 10, active: contentPieces >= 10 },
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">

          {/* Page Title */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-cta-accessible uppercase tracking-wider mb-4">
              {lang === 'de' ? 'Preise' : 'Pricing'}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              {lang === 'de'
                ? 'Content Produktion zum Festpreis ohne Überraschungen'
                : 'Fixed-price content production — no surprises'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {lang === 'de'
                ? 'Wählen Sie Ihr Volumen und Ihre Laufzeit. Mit Jahreslizenz 20 % günstiger als quartalsweise.'
                : 'Choose your volume and billing cycle. Save 20% compared to quarterly with an annual plan.'}
            </p>
          </div>

          {/* ── Billing Cycle Toggle ─────────────────────────────────────── */}
          <div className="flex justify-center mb-10">
            <div className="relative inline-flex items-center bg-muted/50 border border-border rounded-full p-1 gap-1">
              {/* Annual pill */}
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isAnnual
                    ? 'bg-cta text-white shadow-md shadow-cta/25'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'de' ? 'Jährlich' : 'Annual'}
                {/* Savings badge */}
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide transition-all duration-300 ${
                  isAnnual
                    ? 'bg-white/20 text-white'
                    : 'bg-cta/15 text-cta'
                }`}>
                  –20%
                </span>
              </button>
              {/* Quarterly pill */}
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  !isAnnual
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'de' ? 'Quartalsweise' : 'Quarterly'}
              </button>
            </div>
          </div>

          {/* Billing info strip — always monthly billing, no "einmalig" */}
          <div className="text-center mb-8">
            {isAnnual ? (
              <p className="text-sm text-muted-foreground">
                {lang === 'de'
                  ? <>Jährliche Vertragslaufzeit &middot; monatliche Abrechnung &middot; <span className="text-cta-accessible font-medium">20&nbsp;% günstiger als quartalsweise</span></>
                  : <>Annual contract &middot; billed monthly &middot; <span className="text-cta-accessible font-medium">20% cheaper than quarterly</span></>
                }
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {lang === 'de'
                  ? 'Quartalsweise Vertragslaufzeit · monatliche Abrechnung · Mindestlaufzeit 3 Monate'
                  : 'Quarterly contract · billed monthly · minimum term 3 months'}
              </p>
            )}
          </div>

          {/* Pricing Card */}
          <h2 className="sr-only">{lang === 'de' ? 'Preisrechner' : 'Pricing Calculator'}</h2>
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="px-8 py-10">

              {/* Slider */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="content-pieces-slider" className="text-foreground font-semibold text-lg">
                    {lang === 'de' ? 'Wie viele Premium-Blog-Artikel pro Monat?' : 'How many premium blog articles per month?'}
                  </label>
                  <span className="text-3xl font-bold text-cta" aria-live="polite" aria-atomic="true">{contentPieces}</span>
                </div>
                <input
                  id="content-pieces-slider"
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={contentPieces}
                  onChange={(e) => setContentPieces(Number(e.target.value))}
                  aria-label={lang === 'de' ? `Anzahl Artikel: ${contentPieces}` : `Number of articles: ${contentPieces}`}
                  className="w-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>2</span>
                  <span>12</span>
                </div>
                <p className="text-cta-accessible text-sm font-medium mt-3">
                  {lang === 'de'
                    ? 'inkl. 3 individuelle Grafiken (HighRes) pro Artikel'
                    : 'incl. 3 individual high-res graphics per article'}
                </p>
              </div>

              {/* Translations Toggle */}
              <div className={`mb-6 rounded-xl border p-5 transition-all duration-300 ${
                includeTranslations ? 'bg-cta/10 border-cta/30' : 'bg-border/30 border-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={includeTranslations}
                      onChange={(e) => setIncludeTranslations(e.target.checked)}
                      className="w-5 h-5 accent-cta cursor-pointer"
                      id="toggle-translations"
                    />
                    <label htmlFor="toggle-translations" className="cursor-pointer">
                      <p className="text-sm font-semibold text-foreground">
                        + {lang === 'de' ? 'Übersetzungen' : 'Translations'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lang === 'de' ? 'Professionelle Übersetzung in 30+ Sprachen' : 'Professional translation into 30+ languages'}
                      </p>
                    </label>
                  </div>
                  <div className="text-right">
                    {includeTranslations ? (
                      <>
                        <p className="text-sm font-bold text-cta-accessible">
                          +{formatCurrency(translationsCostPerMonth)}/{lang === 'de' ? 'Monat' : 'month'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(translationTotalPerArticle)}/{lang === 'de' ? 'Artikel' : 'article'} ({translationLanguages} {langLabel})
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {lang === 'de' ? `ab ${isAnnual ? 89 : 112} €*/Artikel` : `from ${isAnnual ? 89 : 112} €*/article`}
                      </p>
                    )}
                  </div>
                </div>
                {includeTranslations && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">
                      {lang === 'de' ? 'Zusätzliche Sprachen pro Artikel' : 'Additional languages per article'}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTranslationLanguages(num)}
                          aria-label={lang === 'de' ? `${num} ${num === 1 ? 'Sprache' : 'Sprachen'}` : `${num} ${num === 1 ? 'language' : 'languages'}`}
                          aria-pressed={translationLanguages === num}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                            translationLanguages === num
                              ? 'bg-cta text-white'
                              : 'bg-border text-muted-foreground border border-border hover:bg-border/80'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Videos Toggle */}
              <div className={`mb-10 rounded-xl border p-5 transition-all duration-300 ${
                includeSocialVideos ? 'bg-cta/10 border-cta/30' : 'bg-border/30 border-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={includeSocialVideos}
                      onChange={(e) => setIncludeSocialVideos(e.target.checked)}
                      className="w-5 h-5 accent-cta cursor-pointer"
                      id="toggle-videos"
                    />
                    <label htmlFor="toggle-videos" className="cursor-pointer">
                      <p className="text-sm font-semibold text-foreground">
                        + Social Videos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lang === 'de'
                          ? '2 Kurzvideos pro Artikel für Reels, Shorts, TikTok & LinkedIn'
                          : '2 short videos per article for Reels, Shorts, TikTok & LinkedIn'}
                      </p>
                    </label>
                  </div>
                  <div className="text-right">
                    {includeSocialVideos ? (
                      <>
                        <p className="text-sm font-bold text-cta-accessible">
                          +{formatCurrency(videosCostPerMonth)}/{lang === 'de' ? 'Monat' : 'month'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(videoPricePerVideo)}/{lang === 'de' ? 'Video' : 'video'}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {lang === 'de' ? `ab ${isAnnual ? 100 : 125} €*/Video` : `from ${isAnnual ? 100 : 125} €*/video`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Price Display ─────────────────────────────────────────── */}
              <div className="text-center mb-10">
                <div className={`rounded-2xl p-6 transition-all duration-300 ${
                  isAnnual ? 'bg-cta/10 border border-cta/20' : 'bg-muted/40 border border-border'
                }`}>
                  {isAnnual && (
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-cta-accessible bg-cta/10 px-3 py-1 rounded-full">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {lang === 'de' ? '20 % günstiger als quartalsweise' : '20% cheaper than quarterly'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl font-bold text-foreground">
                      {formatCurrency(monthlyTotal)}<sup className="text-2xl align-super">*</sup>
                    </span>
                    <span className="text-muted-foreground text-lg">
                      /{lang === 'de' ? 'Monat' : 'month'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {(() => {
                      const pricePerArticle = formatCurrency(Math.round(monthlyTotal / contentPieces));
                      const cycle = isAnnual
                        ? (lang === 'de' ? 'Jahreslizenz' : 'Annual licence')
                        : (lang === 'de' ? 'Quartalsweise' : 'Quarterly');

                      const parts: string[] = [];
                      if (lang === 'de') {
                        parts.push(`${pricePerArticle} pro Artikel`);
                        if (includeTranslations) {
                          parts.push(`inkl. ${translationLanguages} ${translationLanguages === 1 ? 'Übersetzung' : 'Übersetzungen'}`);
                        }
                        if (includeSocialVideos) {
                          parts.push('inkl. 2 Kurzvideos');
                        }
                        parts.push(cycle);
                      } else {
                        parts.push(`${pricePerArticle} per article`);
                        if (includeTranslations) {
                          parts.push(`incl. ${translationLanguages} ${translationLanguages === 1 ? 'translation' : 'translations'}`);
                        }
                        if (includeSocialVideos) {
                          parts.push('incl. 2 short videos');
                        }
                        parts.push(cycle);
                      }
                      return parts.join(' · ');
                    })()}
                  </p>
                  {!isAnnual && (
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cta-accessible bg-cta/10 hover:bg-cta/20 px-4 py-2 rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/></svg>
                      {lang === 'de'
                        ? `Mit Jahreslizenz ${formatCurrency(monthlySavings)}/Monat sparen`
                        : `Save ${formatCurrency(monthlySavings)}/month with annual plan`}
                    </button>
                  )}
                </div>
              </div>

              {/* ── Staffelpreise ──────────────────────────────────────────── */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="h-px flex-1 bg-border" />
                  <span>{lang === 'de' ? 'Staffelpreise pro Artikel' : 'Volume prices per article'}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {tiers.map((tier) => (
                    <button
                      key={tier.range}
                      type="button"
                      onClick={() => setContentPieces(tier.value)}
                      aria-label={lang === 'de' ? `${tier.range} Stk., ${formatCurrency(tier.price)} pro Artikel` : `${tier.range} pcs., ${formatCurrency(tier.price)} per article`}
                      aria-pressed={tier.active}
                      className={`py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        tier.active
                          ? 'bg-cta/20 border border-cta text-foreground'
                          : 'bg-border/50 border border-border text-muted-foreground hover:bg-border'
                      }`}
                    >
                      <div className="text-xs">{tier.range} {lang === 'de' ? 'Stk.' : 'pcs.'}</div>
                      <div className={`text-sm font-semibold ${tier.active ? 'text-cta-accessible' : ''}`}>{formatCurrency(tier.price)}*</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="text-xs uppercase tracking-wider text-cta-accessible mb-4 font-semibold">
                  {lang === 'de' ? 'Alles inklusive' : 'Everything included'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cta" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                {/* ── Step 1: Email + Phone form ─────────────────── */}
                {step === 'form' && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <p className="text-muted-foreground text-sm">
                      {lang === 'de' ? 'E-Mail und Mobilnummer eingeben, um zu starten' : 'Enter your email and mobile number to get started'}
                    </p>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label htmlFor="checkout-email" className="sr-only">
                          {lang === 'de' ? 'E-Mail-Adresse' : 'Email address'}
                        </label>
                        <input
                          id="checkout-email"
                          type="email"
                          placeholder={lang === 'de' ? 'ihre@email.de' : 'your@email.com'}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                          className={`w-full h-12 px-4 bg-input border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${emailError ? 'border-red-500' : 'border-border'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handleStartVerification()}
                          aria-describedby={emailError ? 'checkout-email-error' : undefined}
                          aria-invalid={emailError ? true : undefined}
                        />
                        {emailError && <p id="checkout-email-error" className="text-red-500 text-xs mt-1 text-left" role="alert">{emailError}</p>}
                      </div>
                      <div>
                        <label htmlFor="checkout-phone" className="sr-only">
                          {lang === 'de' ? 'Mobilnummer' : 'Mobile number'}
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          placeholder="+49 170 123 456"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
                          className={`w-full h-12 px-4 bg-input border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${phoneError ? 'border-red-500' : 'border-border'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handleStartVerification()}
                          aria-describedby={phoneError ? 'checkout-phone-error' : undefined}
                          aria-invalid={phoneError ? true : undefined}
                        />
                        {phoneError && <p id="checkout-phone-error" className="text-red-500 text-xs mt-1 text-left" role="alert">{phoneError}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={handleStartVerification}
                        disabled={isLoading}
                        className="btn-cta h-12 px-8 text-base disabled:opacity-50 w-full"
                        style={{ borderRadius: '9999px' }}
                      >
                        {isLoading
                          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" />{lang === 'de' ? 'Wird gesendet…' : 'Sending…'}</>
                          : (lang === 'de' ? 'Jetzt starten' : 'Get started')}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 2: SMS OTP input ──────────────────────── */}
                {step === 'sms' && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-3 py-2">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cta/10 ring-1 ring-cta/30">
                        <svg className="w-7 h-7 text-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground mb-1">
                          {lang === 'de' ? 'SMS-Code eingeben' : 'Enter SMS code'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lang === 'de'
                            ? <>Wir haben einen 6-stelligen Code an <strong className="text-foreground">{phone}</strong> gesendet.</>
                            : <>We sent a 6-digit code to <strong className="text-foreground">{phone}</strong>.</>}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="checkout-otp" className="sr-only">
                        {lang === 'de' ? 'SMS-Code (6 Stellen)' : 'SMS code (6 digits)'}
                      </label>
                      <input
                        id="checkout-otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                        className={`w-full h-12 px-4 bg-input border rounded-full text-foreground text-center text-xl tracking-widest placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${otpError ? 'border-red-500' : 'border-border'}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifySMS()}
                        aria-describedby={otpError ? 'checkout-otp-error' : undefined}
                        aria-invalid={otpError ? true : undefined}
                        autoComplete="one-time-code"
                      />
                      {otpError && <p id="checkout-otp-error" className="text-red-500 text-xs mt-1 text-center" role="alert">{otpError}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifySMS}
                      disabled={otpLoading}
                      className="btn-cta h-12 px-8 text-base disabled:opacity-50 w-full"
                      style={{ borderRadius: '9999px' }}
                    >
                      {otpLoading
                        ? <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" />{lang === 'de' ? 'Wird geprüft…' : 'Verifying…'}</>
                        : (lang === 'de' ? 'Mobilnummer bestätigen' : 'Confirm mobile number')}
                    </button>
                    <button type="button" onClick={() => setStep('form')} className="text-muted-foreground hover:text-foreground text-xs w-full text-center">
                      ← {lang === 'de' ? 'Zurück / Daten korrigieren' : 'Back / Correct details'}
                    </button>
                  </div>
                )}

                {/* ── Step 3: Phone verified — now click magic link ── */}
                {step === 'waiting' && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-3 py-2">
                      {/* Progress indicators */}
                      <div className="flex items-center gap-3 text-sm w-full justify-center">
                        <div className="flex items-center gap-1.5 text-green-400">
                          <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{lang === 'de' ? 'Mobilnummer bestätigt' : 'Mobile confirmed'}</span>
                        </div>
                        <span className="text-muted-foreground/50">·</span>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-cta/20 ring-1 ring-cta/50 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          </div>
                          <span>{lang === 'de' ? 'E-Mail bestätigen' : 'Confirm email'}</span>
                        </div>
                      </div>

                      <div className="text-center mt-1">
                        <p className="text-base font-semibold text-foreground mb-1">
                          {lang === 'de' ? 'Fast geschafft — ein Klick genügt!' : 'Almost there — one click to go!'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lang === 'de'
                            ? <>Mit dem Button bestätigen Sie direkt, dass <strong className="text-foreground">{email}</strong> Ihre E-Mail-Adresse ist. <strong className="text-foreground">Kein Postfach öffnen nötig.</strong></>
                            : <>Clicking the button instantly confirms that <strong className="text-foreground">{email}</strong> is your email address. <strong className="text-foreground">No inbox required.</strong></>}
                        </p>
                      </div>
                    </div>

                    <a
                      href={magicUrl}
                      onClick={() => pushDL('magic_link_clicked', {
                        value: monthlyTotal,
                        currency: 'EUR',
                        lang,
                      })}
                      className="btn-cta h-12 px-8 text-base w-full flex items-center justify-center gap-2 no-underline"
                      style={{ borderRadius: '9999px' }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {lang === 'de' ? 'Bestätigen & zur Zahlung →' : 'Confirm & proceed to payment →'}
                    </a>

                    <p className="text-xs text-muted-foreground/70 text-center">
                      {lang === 'de'
                        ? 'Sie werden anschließend automatisch zu Stripe weitergeleitet.'
                        : 'You will be redirected to Stripe automatically afterwards.'}
                    </p>

                    <button type="button" onClick={() => setStep('form')} className="text-muted-foreground hover:text-foreground text-xs w-full text-center">
                      ← {lang === 'de' ? 'Andere E-Mail-Adresse eingeben' : 'Use a different email address'}
                    </button>
                  </div>
                )}
                <p className="text-foreground font-medium text-sm mt-4">
                  {isAnnual
                    ? (lang === 'de' ? 'Jahreslizenz · monatliche Abrechnung · Kündigung zum Laufzeitende' : 'Annual licence · billed monthly · cancel at end of term')
                    : (lang === 'de' ? 'Mindestlaufzeit 3 Monate · monatliche Abrechnung · Kündigung zum Laufzeitende' : 'Minimum 3 months · billed monthly · cancel at end of term')}
                </p>
              </div>

            </div>
          </div>

          {/* FAQ link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              {lang === 'de' ? <>Noch Fragen? Antworten im{' '}<a href={`${base}/#faq`} className="text-cta-accessible hover:underline">FAQ</a></> : <>Still have questions? See the{' '}<a href={`${base}/en/#faq`} className="text-cta-accessible hover:underline">FAQ</a></>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
