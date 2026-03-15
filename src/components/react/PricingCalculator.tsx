import { useState } from 'react';
import { Loader2, Mail, Check } from 'lucide-react';

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
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // kept for compat

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
      const res  = await fetch(FN('start-verification'), { method: 'POST', headers: HEADERS, body: JSON.stringify({ email: email.trim(), phone: phone.trim(), packageConfig }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Fehler');
      setRegistrationId(data.registrationId);
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
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">

          {/* Page Title */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-cta uppercase tracking-wider mb-4">
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
                  ? <>Jährliche Vertragslaufzeit &middot; monatliche Abrechnung &middot; <span className="text-cta font-medium">20&nbsp;% günstiger als quartalsweise</span></>
                  : <>Annual contract &middot; billed monthly &middot; <span className="text-cta font-medium">20% cheaper than quarterly</span></>
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
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="px-8 py-10">

              {/* Slider */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-foreground font-semibold text-lg">
                    {lang === 'de' ? 'Wie viele Premium-Blog-Artikel pro Monat?' : 'How many premium blog articles per month?'}
                  </label>
                  <span className="text-3xl font-bold text-cta">{contentPieces}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={contentPieces}
                  onChange={(e) => setContentPieces(Number(e.target.value))}
                  className="w-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>2</span>
                  <span>12</span>
                </div>
                <p className="text-cta text-sm font-medium mt-3">
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
                        <p className="text-sm font-bold text-cta">
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
                        <p className="text-sm font-bold text-cta">
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
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-cta bg-cta/10 px-3 py-1 rounded-full">
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
                      className="mt-3 text-xs text-cta hover:underline font-medium"
                    >
                      {lang === 'de'
                        ? `→ Mit Jahreslizenz nur ${formatCurrency(contentPieces * getAnnualPricePerPiece(contentPieces) + (includeSocialVideos ? contentPieces * 2 * getAnnualVideoPricePerVideo(contentPieces) : 0) + (includeTranslations ? contentPieces * getTranslationTotalPerArticle(contentPieces, translationLanguages, true) : 0))}/Monat`
                        : `→ With annual plan only ${formatCurrency(contentPieces * getAnnualPricePerPiece(contentPieces) + (includeSocialVideos ? contentPieces * 2 * getAnnualVideoPricePerVideo(contentPieces) : 0) + (includeTranslations ? contentPieces * getTranslationTotalPerArticle(contentPieces, translationLanguages, true) : 0))}/month`}
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
                      className={`py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        tier.active
                          ? 'bg-cta/20 border border-cta text-foreground'
                          : 'bg-border/50 border border-border text-muted-foreground hover:bg-border'
                      }`}
                    >
                      <div className="text-xs">{tier.range} {lang === 'de' ? 'Stk.' : 'pcs.'}</div>
                      <div className={`text-sm font-semibold ${tier.active ? 'text-cta' : ''}`}>{formatCurrency(tier.price)}*</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="text-xs uppercase tracking-wider text-cta mb-4 font-semibold">
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
                        <input
                          type="email"
                          placeholder={lang === 'de' ? 'ihre@email.de' : 'your@email.com'}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                          className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${emailError ? 'border-red-500' : 'border-border'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handleStartVerification()}
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1 text-left">{emailError}</p>}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="+49 170 123 456"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
                          className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${phoneError ? 'border-red-500' : 'border-border'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handleStartVerification()}
                        />
                        {phoneError && <p className="text-red-500 text-xs mt-1 text-left">{phoneError}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={handleStartVerification}
                        disabled={isLoading}
                        className="btn-cta h-12 px-8 text-base disabled:opacity-50 w-full"
                        style={{ borderRadius: '0.5rem' }}
                      >
                        {isLoading
                          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" />{lang === 'de' ? 'Wird gesendet…' : 'Sending…'}</>
                          : (lang === 'de' ? 'Jetzt starten' : 'Get started')}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 2: SMS OTP verification ──────────────── */}
                {step === 'sms' && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-xl text-left">
                      <Mail className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        {lang === 'de'
                          ? <>Magic Link gesendet an <strong className="text-foreground">{email}</strong>. Bitte E-Mail öffnen und Link anklicken.</>
                          : <>Magic link sent to <strong className="text-foreground">{email}</strong>. Please open your email and click the link.</>}
                      </p>
                    </div>
                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-sm font-medium text-foreground mb-3 text-left">
                        📱 {lang === 'de' ? `SMS-Code an ${phone} eingeben:` : `Enter SMS code sent to ${phone}:`}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="______"
                          value={otpCode}
                          onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                          className={`flex-1 h-12 px-4 bg-input border rounded-lg text-foreground text-center text-xl tracking-widest font-mono focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${otpError ? 'border-red-500' : 'border-border'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handleVerifySMS()}
                        />
                        <button
                          type="button"
                          onClick={handleVerifySMS}
                          disabled={otpLoading || otpCode.length !== 6}
                          className="btn-cta h-12 px-6 text-sm disabled:opacity-50 whitespace-nowrap"
                          style={{ borderRadius: '0.5rem' }}
                        >
                          {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === 'de' ? 'Bestätigen' : 'Verify')}
                        </button>
                      </div>
                      {otpError && <p className="text-red-500 text-xs mt-2 text-left">{otpError}</p>}
                    </div>
                    <button type="button" onClick={() => setStep('form')} className="text-muted-foreground hover:text-foreground text-xs">
                      ← {lang === 'de' ? 'Zurück' : 'Back'}
                    </button>
                  </div>
                )}

                {/* ── Step 3: Waiting for email click ───────────── */}
                {step === 'waiting' && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="flex items-center gap-2 text-cta">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                        <span className="font-medium text-sm">{lang === 'de' ? 'Mobilnummer bestätigt ✓' : 'Mobile number verified ✓'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">
                          {lang === 'de'
                            ? <>Warte auf E-Mail-Bestätigung… Bitte Magic Link in <strong className="text-foreground">{email}</strong> anklicken.</>
                            : <>Waiting for email confirmation… Please click the Magic Link in <strong className="text-foreground">{email}</strong>.</>}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70">
                        {lang === 'de' ? 'Stripe-Checkout öffnet sich automatisch nach der Bestätigung.' : 'Stripe checkout opens automatically after confirmation.'}
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-foreground font-medium text-sm mt-4">
                  {isAnnual
                    ? (lang === 'de' ? 'Jahreslizenz · monatliche Abrechnung · Kündigung zum Jahresende' : 'Annual licence · billed monthly · cancel at year end')
                    : (lang === 'de' ? 'Mindestlaufzeit 3 Monate · monatliche Abrechnung · Kündigung zum Quartalsende' : 'Minimum 3 months · billed monthly · cancel at end of quarter')}
                </p>
              </div>

            </div>
          </div>

          {/* FAQ link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              {lang === 'de' ? <>Noch Fragen? Antworten im{' '}<a href={`${base}/#faq`} className="text-cta hover:underline">FAQ</a></> : <>Still have questions? See the{' '}<a href={`${base}/en/#faq`} className="text-cta hover:underline">FAQ</a></>}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
