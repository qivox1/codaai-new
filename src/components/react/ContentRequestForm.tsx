'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { X, Paperclip, Loader2, CheckCircle, Upload } from 'lucide-react';

interface ContentRequestFormProps {
  lang: 'de' | 'en';
  triggerType?: 'button' | 'email-input';
  triggerLabel?: ReactNode;
}

interface FormData {
  name: string;
  email: string;
  websiteUrl: string;
  topic: string;
  articleLanguage: string;
  articleGoal: string;
  wordCount: number;
  additionalInfo: string;
  pdfFile: File | null;
  marketingConsent: boolean;
  partnerCode: string;
}

const translations = {
  de: {
    freeTrial: 'Kostenlos testen',
    step1Title: 'Holen Sie sich Ihren kostenlosen Premium-Blogartikel',
    step1Subtitle: 'SEO- & KI-optimierter Content – komplett kostenlos.',
    step2Title: 'Ihre Website',
    step2Subtitle: 'Wir passen uns Ihrer Markenstimme an.',
    step3Title: 'Ihr Thema',
    step3Subtitle: 'Worüber sollen wir schreiben?',
    yourName: 'IHR NAME *',
    namePlaceholder: 'Max Mustermann',
    emailAddress: 'E-MAIL-ADRESSE *',
    emailPlaceholder: 'max@firma.de',
    websiteUrl: 'IHRE WEBSITE-URL *',
    websitePlaceholder: 'https://ihre-website.de',
    websiteHint: 'Für Markenstimme & Keyword-Analyse.',
    blogTopic: 'BLOGARTIKEL-THEMA *',
    topicPlaceholder: 'z.B. 10 Vorteile von Remote Work für kleine Unternehmen',
    articleLanguage: 'ARTIKELSPRACHE *',
    langDe: 'Deutsch',
    langEn: 'English',
    articleGoal: 'WAS MÖCHTEN SIE MIT IHREM BLOGARTIKEL ERREICHEN? *',
    selectGoal: 'Ziel: Phase der Customer Journey nach Schuster-Modell®',
    goalInform: '01 - Informieren',
    goalEnable: '02 - Befähigen',
    goalEvaluate: '03 - Evaluieren',
    goalAssess: '04 - Bewerten',
    goalBuy: '05 - Kaufen',
    goalUse: '06 - Nutzen',
    goalThoughtLeader: 'Unternehmen als Thought Leader positionieren',
    articleLength: 'ARTIKELLÄNGE',
    words: 'Wörter',
    additionalContext: 'ZUSÄTZLICHER KONTEXT (OPTIONAL)',
    additionalPlaceholder: 'Fügen Sie Links zu Produktseiten, Wettbewerber-Artikeln, Landingpages oder anderen Quellen ein, die uns helfen, Ihren Inhalt und Stil zu verstehen. Je mehr Material Sie bereitstellen, desto gezielter und wirkungsvoller wird Ihr Artikel.',
    additionalHint: '💡 Tipp: Referenz-URLs, Wettbewerber-Artikel, Keywords und konkrete Punkte, die behandelt werden sollen – das alles erhöht die Qualität erheblich.',
    attachPdf: 'PDF-Dokument anhängen',
    attachPdfSub: 'Markenrichtlinien, Briefings oder Referenzmaterial (max. 10 MB)',
    attachPdfDrop: 'PDF hier ablegen',
    partnerCode: 'PARTNERCODE (OPTIONAL)',
    partnerPlaceholder: 'Partnercode eingeben',
    consentText: 'Ich stimme zu, meinen kostenlosen Artikel und gelegentliche Produktupdates, Tipps und Angebote von CodaAI zu erhalten. Sie können sich jederzeit abmelden. Mit dem Absenden akzeptieren Sie unsere',
    privacyPolicy: 'Datenschutzerklärung',
    and: 'und',
    termsConditions: 'AGB',
    back: '← Zurück',
    continue: 'Weiter →',
    checking: 'Wird geprüft...',
    validatingTopic: 'Thema wird validiert...',
    sending: 'Wird gesendet...',
    getMyFreeArticle: 'Kostenlose Artikel erhalten',
    trustIndicator: '🔒 Ihre Daten sind sicher. Kein Spam, niemals.',
    successTitle: 'Wir sind dran!',
    successMessage: 'Ihr Artikel wird erstellt. Prüfen Sie {email} innerhalb von 24 Std.',
    gotIt: 'Verstanden!',
    blockedEmail: 'Bitte verwenden Sie Ihre Firmen-E-Mail-Adresse. Persönliche E-Mail-Adressen (Gmail, GMX etc.) werden nicht akzeptiert.',
    emailDuplicate: 'Diese E-Mail-Adresse wurde bereits für ein kostenloses Testangebot verwendet. Jede E-Mail kann nur ein kostenloses Content-Paket anfordern.',
    domainDuplicate: 'Jemand hat bereits ein kostenloses Testangebot für diese Domain angefordert. Das kostenlose Testangebot ist auf eine pro Domain begrenzt.',
    urlNotReachable: 'Die Website {url} ist nicht erreichbar. Bitte überprüfen Sie die URL und versuchen Sie es erneut.',
    urlCheckFailed: 'Die Website konnte nicht überprüft werden. Bitte überprüfen Sie die URL und versuchen Sie es erneut.',
    pdfOnly: 'Bitte laden Sie ein PDF-Dokument hoch.',
    pdfTooLarge: 'Datei zu groß. Maximale Größe ist 10 MB.',
    topicRequired: 'Bitte geben Sie das Thema für Ihren Blogartikel ein.',
    topicMinWords: 'Bitte beschreiben Sie Ihr Thema in mindestens 5 Wörtern, damit wir es besser verstehen können.',
    goalRequired: 'Artikelziel erforderlich',
    goalRequiredDesc: 'Bitte wählen Sie, was Sie mit Ihrem Blogartikel erreichen möchten.',
    consentRequired: 'Zustimmung erforderlich',
    consentRequiredDesc: 'Bitte stimmen Sie zu, Ihren kostenlosen Artikel und gelegentliche Updates zu erhalten.',
    partnerCodeUnlocked: '✨ Partnercode aktiviert: bis zu 4.000 Wörter verfügbar',
    submitFailed: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.',
  },
  en: {
    freeTrial: 'Try for free',
    step1Title: 'Get your free premium blog article',
    step1Subtitle: 'SEO- & AI-optimised content – completely free.',
    step2Title: 'Your website',
    step2Subtitle: 'We adapt to your brand voice.',
    step3Title: 'Your topic',
    step3Subtitle: 'What should we write about?',
    yourName: 'YOUR NAME *',
    namePlaceholder: 'Jane Smith',
    emailAddress: 'EMAIL ADDRESS *',
    emailPlaceholder: 'jane@company.com',
    websiteUrl: 'YOUR WEBSITE URL *',
    websitePlaceholder: 'https://your-website.com',
    websiteHint: 'For brand voice & keyword analysis.',
    blogTopic: 'BLOG ARTICLE TOPIC *',
    topicPlaceholder: 'e.g. 10 benefits of remote work for small businesses',
    articleLanguage: 'ARTICLE LANGUAGE *',
    langDe: 'German',
    langEn: 'English',
    articleGoal: 'WHAT DO YOU WANT TO ACHIEVE WITH YOUR BLOG ARTICLE? *',
    selectGoal: 'Goal: Customer journey phase (Schuster model®)',
    goalInform: '01 - Inform',
    goalEnable: '02 - Enable',
    goalEvaluate: '03 - Evaluate',
    goalAssess: '04 - Assess',
    goalBuy: '05 - Buy',
    goalUse: '06 - Use',
    goalThoughtLeader: 'Position company as thought leader',
    articleLength: 'ARTICLE LENGTH',
    words: 'words',
    additionalContext: 'ADDITIONAL CONTEXT (OPTIONAL)',
    additionalPlaceholder: 'Add links to product pages, competitor articles, landing pages or other sources that help us understand your content and style. The more material you provide, the more targeted and impactful your article will be.',
    additionalHint: '💡 Tip: Reference URLs, competitor articles, keywords and specific points to cover – all of this significantly increases quality.',
    attachPdf: 'Attach PDF document',
    attachPdfSub: 'Brand guidelines, briefs or reference material (max. 10 MB)',
    attachPdfDrop: 'Drop PDF here',
    partnerCode: 'PARTNER CODE (OPTIONAL)',
    partnerPlaceholder: 'Enter partner code',
    consentText: 'I agree to receive my free article and occasional product updates, tips and offers from CodaAI. You can unsubscribe at any time. By submitting you accept our',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    termsConditions: 'Terms & Conditions',
    back: '← Back',
    continue: 'Continue →',
    checking: 'Checking...',
    validatingTopic: 'Validating topic...',
    sending: 'Sending...',
    getMyFreeArticle: 'Get free article',
    trustIndicator: '🔒 Your data is safe. No spam, ever.',
    successTitle: 'We\'re on it!',
    successMessage: 'Your article is being created. Check {email} within 24 hrs.',
    gotIt: 'Got it!',
    blockedEmail: 'Please use your business email address. Personal email addresses (Gmail, Yahoo etc.) are not accepted.',
    emailDuplicate: 'This email address has already been used for a free trial. Each email can only request one free content package.',
    domainDuplicate: 'Someone has already requested a free trial for this domain. The free trial is limited to one per domain.',
    urlNotReachable: 'The website {url} is not reachable. Please check the URL and try again.',
    urlCheckFailed: 'The website could not be verified. Please check the URL and try again.',
    pdfOnly: 'Please upload a PDF document.',
    pdfTooLarge: 'File too large. Maximum size is 10 MB.',
    topicRequired: 'Please enter the topic for your blog article.',
    topicMinWords: 'Please describe your topic in at least 5 words so we can understand it better.',
    goalRequired: 'Article goal required',
    goalRequiredDesc: 'Please select what you want to achieve with your blog article.',
    consentRequired: 'Consent required',
    consentRequiredDesc: 'Please agree to receive your free article and occasional updates.',
    partnerCodeUnlocked: '✨ Partner code activated: up to 4,000 words available',
    submitFailed: 'Something went wrong. Please try again later.',
  },
};

const blockedEmailDomains = [
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.de', 'yahoo.co.uk', 'yahoo.fr',
  'hotmail.com', 'hotmail.de', 'hotmail.co.uk',
  'outlook.com', 'outlook.de',
  'live.com', 'live.de',
  'msn.com',
  'aol.com', 'aol.de',
  'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'gmx.com',
  'web.de',
  't-online.de',
  'freenet.de',
  'mail.de',
  'email.de',
  'arcor.de',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me',
  'zoho.com',
  'yandex.com', 'yandex.ru',
  'mail.ru',
  'inbox.com',
  'fastmail.com',
  'tutanota.com', 'tutamail.com',
  'posteo.de', 'posteo.net',
  'mailbox.org',
];

// steps are built inside the component using the active translation

const SUPABASE_FN = 'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request';

// ─── Logo SVG ────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="hsl(var(--cta))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-xl font-semibold text-foreground">CodaAI</span>
    </div>
  );
}

// ─── Input / Label helpers ────────────────────────────────────────────────────
// Matches PricingCalculator exactly: rounded-full, bg-input, border-border
const inputCls = (hasError?: boolean) =>
  `w-full h-12 px-4 bg-input border ${hasError ? 'border-red-500' : 'border-border'} rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-all text-sm`;

// For multi-line fields (textarea, select) use rounded-xl instead of rounded-full
const inputClsBox = (hasError?: boolean) =>
  `w-full px-4 py-3 bg-input border ${hasError ? 'border-red-500' : 'border-border'} rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-all text-sm`;

const labelCls = 'block text-[11px] font-mono text-muted-foreground mb-1.5 uppercase tracking-widest';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContentRequestForm({
  lang,
  triggerType = 'button',
  triggerLabel,
}: ContentRequestFormProps) {
  const t = translations[lang] ?? translations.de;
  const steps = [
    { title: t.step1Title, subtitle: t.step1Subtitle },
    { title: t.step2Title, subtitle: t.step2Subtitle },
    { title: t.step3Title, subtitle: t.step3Subtitle },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isValidatingTopic, setIsValidatingTopic] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [topicError, setTopicError] = useState<string | null>(null);
  const [partnerCodeValid, setPartnerCodeValid] = useState(false);
  const [isCheckingPartnerCode, setIsCheckingPartnerCode] = useState(false);
  const [sliderUnlocked, setSliderUnlocked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    websiteUrl: '',
    topic: '',
    articleLanguage: 'de',
    articleGoal: '',
    wordCount: 1000,
    additionalInfo: '',
    pdfFile: null,
    marketingConsent: false,
    partnerCode: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const partnerCodeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nameId = useId();
  const emailId = useId();
  const websiteId = useId();
  const topicId = useId();
  const wordCountId = useId();
  const additionalId = useId();
  const langId = useId();
  const goalId = useId();

  const sliderMax = partnerCodeValid ? 4000 : 2000;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const playUnlockSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playTone(523, now, 0.15);
      playTone(659, now + 0.1, 0.15);
      playTone(784, now + 0.2, 0.25);
    } catch (e) { /* Audio not supported */ }
  }, []);

  useEffect(() => {
    if (partnerCodeValid && !sliderUnlocked) {
      setSliderUnlocked(true);
      playUnlockSound();
    } else if (!partnerCodeValid) {
      setSliderUnlocked(false);
    }
  }, [partnerCodeValid, sliderUnlocked, playUnlockSound]);

  const validatePartnerCode = async (code: string) => {
    if (!code.trim()) {
      setPartnerCodeValid(false);
      setFormData(prev => ({ ...prev, wordCount: Math.min(prev.wordCount, 2000) }));
      return;
    }
    setIsCheckingPartnerCode(true);
    try {
      const response = await fetch(SUPABASE_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerCode: code.trim(), checkPartnerCode: true }),
      });
      const data = await response.json();
      setPartnerCodeValid(data?.isValid === true);
      if (!data?.isValid) {
        setFormData(prev => ({ ...prev, wordCount: Math.min(prev.wordCount, 2000) }));
      }
    } catch (err) {
      setPartnerCodeValid(false);
    }
    setIsCheckingPartnerCode(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfError(null);
    if (file) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) { setPdfError(t.pdfOnly); if (fileInputRef.current) fileInputRef.current.value = ''; return; }
      if (file.size > 10 * 1024 * 1024) { setPdfError(t.pdfTooLarge); if (fileInputRef.current) fileInputRef.current.value = ''; return; }
      setFormData(prev => ({ ...prev, pdfFile: file }));
    }
  };

  const removePdf = () => {
    setFormData(prev => ({ ...prev, pdfFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) { setPdfError(t.pdfOnly); return; }
    if (file.size > 10 * 1024 * 1024) { setPdfError(t.pdfTooLarge); return; }
    setPdfError(null);
    setFormData(prev => ({ ...prev, pdfFile: file }));
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragActive(false); };

  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ── Step button disabled logic ───────────────────────────────────────────
  const isStep0Incomplete = !formData.name.trim() || !formData.email.trim();
  const isStep1Incomplete = !formData.websiteUrl.trim();
  const isStep2Incomplete = !formData.topic.trim() || !formData.articleGoal || !formData.marketingConsent;
  const isBusy = isCheckingEmail || isCheckingDomain || isSubmitting || isValidatingTopic;

  const isNextDisabled =
    isBusy ||
    (currentStep === 0 && isStep0Incomplete) ||
    (currentStep === 1 && isStep1Incomplete) ||
    (currentStep === 2 && isStep2Incomplete);

  const nextStep = async () => {
    if (currentStep === 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setEmailError(lang === 'en' ? 'Please enter a valid email address.' : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }
      const emailDomain = formData.email.toLowerCase().split('@')[1];
      if (blockedEmailDomains.includes(emailDomain)) {
        setEmailError(t.blockedEmail);
        return;
      }
      setIsCheckingEmail(true);
      setEmailError(null);
      try {
        const response = await fetch(SUPABASE_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, checkEmailOnly: true }),
        });
        const data = await response.json();
        if (data?.exists) {
          setEmailError(t.emailDuplicate);
          setIsCheckingEmail(false);
          return;
        }
      } catch (err) { /* continue */ }
      setIsCheckingEmail(false);
    }

    if (currentStep === 1) {
      let url = formData.websiteUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        setFormData(prev => ({ ...prev, websiteUrl: url }));
      }
      setIsCheckingDomain(true);
      setDomainError(null);

      try {
        const reachabilityResponse = await fetch(SUPABASE_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ websiteUrl: url, checkUrlReachable: true }),
        });
        if (reachabilityResponse.ok) {
          const reachabilityData = await reachabilityResponse.json();
          if (reachabilityData?.isReachable === false) {
            setDomainError(t.urlNotReachable.replace('{url}', url));
            setIsCheckingDomain(false);
            return;
          }
        }
        // If check fails or returns non-OK, silently continue
      } catch (err) { /* silently continue */ }

      try {
        const response = await fetch(SUPABASE_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ websiteUrl: url, checkDomainOnly: true }),
        });
        const data = await response.json();
        if (data?.domainExists) {
          setDomainError(t.domainDuplicate);
          setIsCheckingDomain(false);
          return;
        }
      } catch (err) { /* continue */ }
      setIsCheckingDomain(false);
    }

    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 2) return;

    const wordCount = formData.topic.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 5) { setTopicError(t.topicMinWords); return; }

    setIsValidatingTopic(true);
    setTopicError(null);
    try {
      const response = await fetch(SUPABASE_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: formData.topic, validateTopic: true }),
      });
      const data = await response.json();
      if (!data?.isValid) {
        setTopicError(data?.reason || 'Bitte geben Sie ein gültiges, sinnvolles Blog-Thema ein.');
        setIsValidatingTopic(false);
        return;
      }
    } catch (err) { /* continue */ }
    setIsValidatingTopic(false);

    setIsSubmitting(true);
    try {
      let pdfBase64: string | null = null;
      let pdfFileName: string | null = null;

      if (formData.pdfFile) {
        try {
          pdfFileName = formData.pdfFile.name;
          const arrayBuffer = await formData.pdfFile.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
          }
          pdfBase64 = btoa(binary);
        } catch (pdfErr) { /* continue without PDF */ }
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let submitResponse: Response;
      try {
        submitResponse = await fetch(SUPABASE_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            websiteUrl: formData.websiteUrl,
            topic: formData.topic,
            articleLanguage: formData.articleLanguage,
            articleGoal: formData.articleGoal,
            wordCount: formData.wordCount,
            additionalInfo: formData.additionalInfo,
            pdfBase64,
            pdfFileName,
            partnerCode: formData.partnerCode || null,
          }),
        });
      } catch (fetchErr: any) {
        clearTimeout(timeout);
        setSubmitError(t.submitFailed);
        setIsSubmitting(false);
        return;
      }
      clearTimeout(timeout);

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json().catch(() => ({}));
        throw new Error(errorData.error || t.submitFailed);
      }
      setSubmitError(null);
      setIsSuccess(true);
    } catch (error: any) {
      setSubmitError(error?.message || t.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setIsSuccess(false);
    setPdfError(null);
    setEmailError(null);
    setDomainError(null);
    setTopicError(null);
    setPartnerCodeValid(false);
    setSliderUnlocked(false);
    setFormData({
      name: '', email: '', websiteUrl: '', topic: '',
      articleLanguage: 'de', articleGoal: '', wordCount: 1000,
      additionalInfo: '', pdfFile: null, marketingConsent: false, partnerCode: '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300);
  };

  // ── Shared overlay markup ──────────────────────────────────────────────────
  const overlayContent = isOpen ? (
    <div
      className="fixed inset-0 z-[100] bg-background overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Kostenlosen Artikel anfordern"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-5 right-5 z-10 p-2 hover:bg-muted rounded-full transition-colors"
        aria-label="Schließen"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center py-16 px-6">
        <div className="w-full max-w-[420px]">
          <Logo />

          {isSuccess ? (
            /* ── Success screen ────────────────────────────────────── */
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="size-20 rounded-full bg-cta/10 flex items-center justify-center">
                  <CheckCircle className="size-12 text-cta" />
                </div>
              </div>
              <h2 className="text-3xl font-semibold text-foreground">{t.successTitle}</h2>
              <p className="text-base text-muted-foreground">
                {t.successMessage.replace('{email}', formData.email)}
              </p>
              <button
                onClick={handleClose}
                className="btn-cta h-12 px-8 text-base"
              >
                {t.gotIt}
              </button>
            </div>
          ) : (
            /* ── Form screens ──────────────────────────────────────── */
            <div>
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-8" aria-label={lang === 'en' ? `Step ${currentStep + 1} of ${steps.length}` : `Schritt ${currentStep + 1} von ${steps.length}`}>
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'w-8 bg-cta' :
                      index < currentStep ? 'w-4 bg-cta/50' : 'w-4 bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Step header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-base text-muted-foreground">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* ── Step 0: Name + Email ──────────────────────────── */}
                {currentStep === 0 && (
                  <>
                    <div>
                      <label htmlFor={nameId} className={labelCls}>{t.yourName}</label>
                      <input
                        type="text"
                        id={nameId}
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder={t.namePlaceholder}
                        autoComplete="name"
                        className={inputCls()}
                      />
                    </div>
                    <div>
                      <label htmlFor={emailId} className={labelCls}>{t.emailAddress}</label>
                      <input
                        type="email"
                        id={emailId}
                        value={formData.email}
                        onChange={(e) => { updateField('email', e.target.value); setEmailError(null); }}
                        placeholder={t.emailPlaceholder}
                        autoComplete="email"
                        className={inputCls(!!emailError)}
                        aria-describedby={emailError ? 'email-err' : undefined}
                        aria-invalid={emailError ? true : undefined}
                      />
                      {emailError && (
                        <p id="email-err" role="alert" className="text-red-500 text-xs mt-2">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* ── Step 1: Website URL ───────────────────────────── */}
                {currentStep === 1 && (
                  <div>
                    <label htmlFor={websiteId} className={labelCls}>{t.websiteUrl}</label>
                    <input
                      type="url"
                      id={websiteId}
                      value={formData.websiteUrl}
                      onChange={(e) => { updateField('websiteUrl', e.target.value); setDomainError(null); }}
                      placeholder={t.websitePlaceholder}
                      autoComplete="url"
                      className={inputCls(!!domainError)}
                      aria-describedby={domainError ? 'domain-err' : undefined}
                      aria-invalid={domainError ? true : undefined}
                    />
                    {domainError && (
                      <p id="domain-err" role="alert" className="text-red-500 text-xs mt-2">
                        {domainError}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">{t.websiteHint}</p>
                  </div>
                )}

                {/* ── Step 2: Topic form ────────────────────────────── */}
                {currentStep === 2 && (
                  <>
                    {/* Blog topic */}
                    <div>
                      <label htmlFor={topicId} className={labelCls}>{t.blogTopic}</label>
                      <textarea
                        id={topicId}
                        value={formData.topic}
                        onChange={(e) => { updateField('topic', e.target.value); setTopicError(null); }}
                        placeholder={t.topicPlaceholder}
                        className={`${inputClsBox(!!topicError)} resize-none h-24`}
                        aria-describedby={topicError ? 'topic-err' : undefined}
                        aria-invalid={topicError ? true : undefined}
                      />
                      {topicError && (
                        <p id="topic-err" role="alert" className="text-red-500 text-xs mt-2">
                          {topicError}
                        </p>
                      )}
                    </div>

                    {/* Article language */}
                    <div>
                      <label htmlFor={langId} className={labelCls}>{t.articleLanguage}</label>
                      <div className="relative">
                        <select
                          id={langId}
                          value={formData.articleLanguage}
                          onChange={(e) => updateField('articleLanguage', e.target.value)}
                          className={`${inputClsBox()} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="de">{t.langDe}</option>
                          <option value="en">{t.langEn}</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>

                    {/* Article goal */}
                    <div>
                      <label htmlFor={goalId} className={labelCls}>{t.articleGoal}</label>
                      <div className="relative">
                        <select
                          id={goalId}
                          value={formData.articleGoal}
                          onChange={(e) => updateField('articleGoal', e.target.value)}
                          className={`${inputClsBox()} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="">{t.selectGoal}</option>
                          <option value="inform">{t.goalInform}</option>
                          <option value="enable">{t.goalEnable}</option>
                          <option value="evaluate">{t.goalEvaluate}</option>
                          <option value="assess">{t.goalAssess}</option>
                          <option value="buy">{t.goalBuy}</option>
                          <option value="use">{t.goalUse}</option>
                          <option value="thought-leader">{t.goalThoughtLeader}</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>

                    {/* Article length slider */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor={wordCountId} className={labelCls + ' mb-0'}>{t.articleLength}</label>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${partnerCodeValid ? 'bg-green-100 text-green-700' : 'bg-muted text-foreground'} transition-colors`}>
                          {formData.wordCount.toLocaleString(lang === 'en' ? 'en' : 'de')} {t.words}
                        </span>
                      </div>
                      <input
                        type="range"
                        id={wordCountId}
                        min="1000"
                        max={sliderMax}
                        step="500"
                        value={formData.wordCount}
                        onChange={(e) => updateField('wordCount', parseInt(e.target.value))}
                        aria-label={lang === 'en' ? `Article length: ${formData.wordCount} words` : `Artikellänge: ${formData.wordCount} Wörter`}
                        className="w-full accent-cta"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>{(1000).toLocaleString(lang === 'en' ? 'en' : 'de')}</span>
                        <span>{sliderMax.toLocaleString(lang === 'en' ? 'en' : 'de')}</span>
                      </div>
                      {partnerCodeValid && (
                        <p className="text-xs text-green-600 mt-1 font-medium">{t.partnerCodeUnlocked}</p>
                      )}
                    </div>

                    {/* Additional context */}
                    <div>
                      <label htmlFor={additionalId} className={labelCls}>{t.additionalContext}</label>
                      <textarea
                        id={additionalId}
                        value={formData.additionalInfo}
                        onChange={(e) => updateField('additionalInfo', e.target.value)}
                        placeholder={t.additionalPlaceholder}
                        className={`${inputClsBox()} resize-none h-28`}
                      />
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{t.additionalHint}</p>
                    </div>

                    {/* PDF upload — prominent card */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                        aria-label="PDF-Dokument hochladen"
                      />
                      {!formData.pdfFile ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className={`w-full py-4 px-5 rounded-xl border-2 border-dashed transition-all duration-200 group ${
                            dragActive
                              ? 'border-cta bg-cta/5 scale-[1.01]'
                              : 'border-border hover:border-cta bg-muted hover:bg-muted/70'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className={`size-10 rounded-full border flex items-center justify-center transition-colors ${dragActive ? 'bg-cta/10 border-cta' : 'bg-background border-border group-hover:border-cta'}`}>
                              <Upload className={`w-5 h-5 transition-colors ${dragActive ? 'text-cta' : 'text-muted-foreground group-hover:text-cta'}`} aria-hidden="true" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-semibold text-foreground">
                                {dragActive ? t.attachPdfDrop : t.attachPdf}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{t.attachPdfSub}</p>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-muted px-4 py-3 rounded-xl border border-border">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                              <Paperclip className="w-4 h-4 text-cta" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-foreground font-medium truncate">{formData.pdfFile.name}</p>
                              <p className="text-xs text-muted-foreground">{(formData.pdfFile.size / 1024 / 1024).toFixed(1)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removePdf}
                            className="ml-3 p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors flex-shrink-0"
                            aria-label="PDF entfernen"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {pdfError && (
                        <p role="alert" className="text-red-500 text-xs mt-2">{pdfError}</p>
                      )}
                    </div>

                    {/* Partner code */}
                    <div>
                      <label htmlFor="partnerCode" className={labelCls}>{t.partnerCode}</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="partnerCode"
                          value={formData.partnerCode}
                          onChange={(e) => {
                            const code = e.target.value;
                            updateField('partnerCode', code);
                            if (partnerCodeTimeoutRef.current) clearTimeout(partnerCodeTimeoutRef.current);
                            partnerCodeTimeoutRef.current = setTimeout(() => validatePartnerCode(code), 500);
                          }}
                          placeholder={t.partnerPlaceholder}
                          className={`${inputCls()} ${partnerCodeValid ? 'border-green-500' : ''} pr-10`}
                        />
                        {isCheckingPartnerCode && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" aria-hidden="true" />
                        )}
                        {partnerCodeValid && !isCheckingPartnerCode && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" aria-hidden="true">✓</span>
                        )}
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.marketingConsent}
                        onChange={(e) => updateField('marketingConsent', e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-cta flex-shrink-0"
                      />
                      <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        {t.consentText}{' '}
                        <a href={lang === 'en' ? '/en/privacy-policy' : '/datenschutz'} className="underline hover:text-foreground text-foreground" target="_blank" rel="noopener">{t.privacyPolicy}</a>
                        {' '}{t.and}{' '}
                        <a href={lang === 'en' ? '/en/terms' : '/agb'} className="underline hover:text-foreground text-foreground" target="_blank" rel="noopener">{t.termsConditions}</a>.
                      </label>
                    </div>
                  </>
                )}

                {/* Navigation buttons */}
                <div className={`flex gap-3 pt-2 ${currentStep === 0 ? '' : ''}`}>
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="h-12 px-5 rounded-full bg-muted hover:bg-muted/70 text-foreground transition-colors text-sm font-medium whitespace-nowrap border border-border"
                    >
                      {t.back}
                    </button>
                  )}
                  <button
                    type={currentStep === 2 ? 'submit' : 'button'}
                    onClick={currentStep < 2 ? nextStep : undefined}
                    disabled={isNextDisabled}
                    className={`btn-cta flex-1 h-12 px-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isCheckingEmail || isCheckingDomain ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> {t.checking}</>
                    ) : isValidatingTopic ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> {t.validatingTopic}</>
                    ) : isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> {t.sending}</>
                    ) : currentStep === 2 ? (
                      t.getMyFreeArticle
                    ) : (
                      t.continue
                    )}
                  </button>
                </div>

                {submitError && currentStep === 2 && (
                  <p role="alert" className="text-red-500 text-xs text-center">{submitError}</p>
                )}

                {currentStep !== 0 && (
                  <p className="text-center text-xs text-muted-foreground py-1">{t.trustIndicator}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  // Portal renders directly to document.body so fixed inset-0 is never
  // constrained by ancestor elements that have transform/perspective/filter.
  const portal = typeof document !== 'undefined' && overlayContent
    ? createPortal(overlayContent, document.body)
    : null;

  // ── Email-input trigger ────────────────────────────────────────────────────
  if (triggerType === 'email-input') {
    return (
      <div className="relative">
        <input
          type="email"
          placeholder="Ihre E-Mail..."
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="flex-1 bg-background/40 border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cta/50 transition-all"
        />
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Kostenlosen Artikel anfragen"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground hover:text-foreground"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        {portal}
      </div>
    );
  }

  // ── Default button trigger ─────────────────────────────────────────────────
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-cta h-8 px-4 py-0 text-sm"
      >
        {triggerLabel || t.freeTrial}
      </button>
      {portal}
    </>
  );
}
