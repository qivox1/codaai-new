import { useState } from 'react';
import { Loader2, Mail, Check } from 'lucide-react';

// CodaAI pricing with volume discounts
const getCodaAIPricePerPiece = (pieces: number): number => {
  if (pieces >= 10) return 349;
  if (pieces >= 7) return 390;
  if (pieces >= 4) return 420;
  return 490;
};

// Social Video pricing: 2 videos per article, price per video
const getVideoPricePerVideo = (pieces: number): number => {
  if (pieces >= 10) return 100;
  if (pieces >= 7) return 110;
  if (pieces >= 4) return 120;
  return 140;
};

// Translation base price per article (first language)
const getTranslationBasePrice = (pieces: number): number => {
  if (pieces >= 10) return 89;
  if (pieces >= 7) return 99;
  if (pieces >= 4) return 105;
  return 125;
};

// Total translation cost per article for N languages (€10 less per additional language)
const getTranslationTotalPerArticle = (pieces: number, languages: number): number => {
  const basePrice = getTranslationBasePrice(pieces);
  let total = 0;
  for (let i = 0; i < languages; i++) {
    total += Math.max(basePrice - i * 10, 10); // minimum €10 per language
  }
  return total;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const FEATURES = [
  "SEO-optimierte Blogartikel bis 4.000 Wörter",
  "Keyword-Recherche & Wettbewerbsanalyse inklusive",
  "3 Grafiken & Infografiken pro Artikel",
  "2 Social-Media-Videos pro Artikel (optional)",
  "Professionelle Übersetzungen (optional)",
  "Redaktionskalender & Content-Strategie",
  "Monatliche Performance-Auswertung",
  "Persönlicher Ansprechpartner",
  "Keine Vertragslaufzeit – monatlich kündbar",
  "Hosting auf deutschen Servern (DSGVO-konform)"
];

interface PricingCalculatorProps {
  lang?: 'de' | 'en';
}

export default function PricingCalculator({ lang = 'de' }: PricingCalculatorProps) {
  const [contentPieces, setContentPieces] = useState(2);
  const [includeSocialVideos, setIncludeSocialVideos] = useState(false);
  const [includeTranslations, setIncludeTranslations] = useState(false);
  const [translationLanguages, setTranslationLanguages] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate pricing
  const pricePerPiece = getCodaAIPricePerPiece(contentPieces);
  const videoPricePerVideo = getVideoPricePerVideo(contentPieces);
  const translationTotalPerArticle = getTranslationTotalPerArticle(contentPieces, translationLanguages);
  const videosCostPerMonth = includeSocialVideos ? contentPieces * 2 * videoPricePerVideo : 0;
  const translationsCostPerMonth = includeTranslations ? contentPieces * translationTotalPerArticle : 0;
  const monthlyTotal = contentPieces * pricePerPiece + videosCostPerMonth + translationsCostPerMonth;

  const langLabel = translationLanguages === 1 ? 'Sprache' : 'Sprachen';

  const handleMagicLink = async () => {
    setEmailError('');

    if (!email || !email.trim()) {
      setEmailError('Bitte geben Sie Ihre E-Mail-Adresse ein');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/pricing?checkout=true&quantity=${contentPieces}&socialVideos=${includeSocialVideos}&translations=${includeTranslations}&translationLangs=${translationLanguages}`;

      const response = await fetch(
        `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/send-magic-link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            email: email.trim(),
            redirectUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Magic Link versand fehlgeschlagen');
      }

      setEmailSent(true);
    } catch (error: any) {
      console.error('Magic link error:', error);
      setEmailError(error.message || 'Fehler beim Senden der Magic Link');
    } finally {
      setIsLoading(false);
    }
  };

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
                ? 'Wählen Sie Ihr Volumen. Jederzeit anpassbar, monatlich kündbar.'
                : 'Choose your volume. Adjustable anytime, cancel monthly.'}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="px-8 py-10">
              {/* Slider Section */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-foreground font-semibold text-lg">
                    {lang === 'de' ? 'Wie viele Premium-Blog-Artikel pro Monat?' : 'How many premium blog articles per month?'}
                  </label>
                  <span className="text-3xl font-bold text-cta">
                    {contentPieces}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={contentPieces}
                  onChange={(e) => setContentPieces(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-cta"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1</span>
                  <span>12</span>
                </div>
                <p className="text-cta text-sm font-medium mt-3">
                  inkl. 3 individuelle Grafiken (HighRes) pro Monat
                </p>
              </div>

              {/* Translations Toggle */}
              <div className={`mb-10 rounded-xl border p-5 transition-all duration-300 ${
                includeTranslations
                  ? 'bg-cta/10 border-cta/30'
                  : 'bg-border/30 border-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={includeTranslations}
                      onChange={(e) => setIncludeTranslations(e.target.checked)}
                      className="w-5 h-5 accent-cta cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        + Übersetzungen
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Professionelle Übersetzung in 30+ Sprachen
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {includeTranslations ? (
                      <>
                        <p className="text-sm font-bold text-cta">
                          +{formatCurrency(translationsCostPerMonth)}/Monat
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(translationTotalPerArticle)}/Artikel ({translationLanguages} {langLabel})
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        ab €89/Artikel
                      </p>
                    )}
                  </div>
                </div>

                {/* Language count selector */}
                {includeTranslations && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">Zusätzliche Sprachen pro Premium-Blogartikel</p>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
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
                includeSocialVideos
                  ? 'bg-cta/10 border-cta/30'
                  : 'bg-border/30 border-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={includeSocialVideos}
                      onChange={(e) => setIncludeSocialVideos(e.target.checked)}
                      className="w-5 h-5 accent-cta cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        + Social Videos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 Kurzvideos pro Artikel für Reels, Shorts, TikTok & LinkedIn
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {includeSocialVideos ? (
                      <>
                        <p className="text-sm font-bold text-cta">
                          +{formatCurrency(videosCostPerMonth)}/Monat
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(videoPricePerVideo)}/Video
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        ab €100/Video
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="text-center mb-10 bg-cta/5 rounded-xl p-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-foreground">
                    {formatCurrency(monthlyTotal)}
                  </span>
                  <span className="text-muted-foreground text-lg">/Monat</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {formatCurrency(Math.round(monthlyTotal / contentPieces))} pro Blogartikel
                </p>
              </div>

              {/* Volume Discount Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="h-px flex-1 bg-border" />
                  <span>Staffelpreise</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { range: '1-3', price: '€490', value: 3, active: contentPieces <= 3 },
                    { range: '4-6', price: '€420', value: 4, active: contentPieces >= 4 && contentPieces <= 6 },
                    { range: '7-9', price: '€390', value: 7, active: contentPieces >= 7 && contentPieces <= 9 },
                    { range: '10-12', price: '€349', value: 10, active: contentPieces >= 10 },
                  ].map((tier) => (
                    <button
                      key={tier.range}
                      onClick={() => setContentPieces(tier.value)}
                      className={`py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        tier.active
                          ? 'bg-cta/20 border border-cta text-foreground'
                          : 'bg-border/50 border border-border text-muted-foreground hover:bg-border'
                      }`}
                    >
                      <div className="text-xs">{tier.range} Stk.</div>
                      <div className={`text-sm font-semibold ${tier.active ? 'text-cta' : ''}`}>{tier.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="text-xs uppercase tracking-wider text-cta mb-4 font-semibold">
                  Alles inklusive
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
                {emailSent ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-cta">
                      <Mail className="w-6 h-6" />
                      <span className="text-lg font-medium">Prüfen Sie Ihren Posteingang!</span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Wir haben einen Magic Link an <span className="text-foreground font-medium">{email}</span> gesendet. Klicken Sie auf den Link, um zu bestätigen und Ihr Abonnement zu starten.
                    </p>
                    <button
                      onClick={() => setEmailSent(false)}
                      className="text-cta hover:underline text-sm"
                    >
                      Andere E-Mail verwenden
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm mb-4">
                      Geben Sie Ihre E-Mail ein, um zu starten
                    </p>
                    <div className="flex flex-col gap-2 max-w-md mx-auto">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="email"
                            placeholder="ihre@email.de"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError('');
                            }}
                            className={`w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta ${
                              emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                            }`}
                            onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                          />
                        </div>
                        <button
                          onClick={handleMagicLink}
                          disabled={isLoading}
                          className="btn-cta h-12 px-8 text-base disabled:opacity-50 whitespace-nowrap"
                          style={{ borderRadius: '0.5rem' }}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                              Wird gesendet...
                            </>
                          ) : (
                            'Magic Link erhalten'
                          )}
                        </button>
                      </div>
                      {emailError && (
                        <p className="text-red-500 text-sm text-left">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-foreground font-medium text-sm mt-4">
                  Keine Mindestlaufzeit, monatlich kündbar
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Noch Fragen? Antworten im{' '}
              <a href="/#faq" className="text-cta hover:underline">
                FAQ
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
