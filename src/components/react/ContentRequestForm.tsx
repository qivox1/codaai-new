'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import type { ReactNode } from 'react';
import { X, Paperclip, Loader2, CheckCircle } from 'lucide-react';

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

// Hardcoded German translations (form is always German)
const de = {
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
  selectLanguage: 'Sprache wählen...',
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
  additionalPlaceholder: 'Teilen Sie Links, Wettbewerber-Artikel, Markenrichtlinien oder anderes Referenzmaterial, das uns hilft, Ihren Stil zu treffen.',
  additionalHint: 'Je mehr Kontext Sie bereitstellen, desto besser wird Ihr Artikel. Erwägen Sie: Referenz-URLs, Wettbewerber-Artikel, Markenrichtlinien, Ziel-Keywords oder bestimmte Punkte, die behandelt werden sollen.',
  attachPdf: 'PDF anhängen (max. 10 MB)',
  partnerCode: 'PARTNERCODE (OPTIONAL)',
  partnerPlaceholder: 'Partnercode eingeben',
  consentText: 'Ich stimme zu, meinen kostenlosen Artikel und gelegentliche Produktupdates, Tipps und Angebote von CodaAI zu erhalten. Sie können sich jederzeit abmelden. Mit dem Absenden akzeptieren Sie unsere',
  privacyPolicy: 'Datenschutzerklärung',
  and: 'und',
  termsConditions: 'AGB',
  back: 'Zurück',
  continue: 'Weiter',
  checking: 'Wird geprüft...',
  validatingTopic: 'Thema wird validiert...',
  sending: 'Wird gesendet...',
  getMyFreeArticle: 'Meinen kostenlosen Artikel erhalten',
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
  partnerCodeUnlocked: '✨ Partnercode aktiviert: bis zu 4.000 Wörter',
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

const steps = [
  { title: de.step1Title, subtitle: de.step1Subtitle },
  { title: de.step2Title, subtitle: de.step2Subtitle },
  { title: de.step3Title, subtitle: de.step3Subtitle },
];

export default function ContentRequestForm({
  lang,
  triggerType = 'button',
  triggerLabel,
}: ContentRequestFormProps) {
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

  const sliderMax = partnerCodeValid ? 4000 : 2000;

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
    } catch (e) {
      // Audio not supported
    }
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
      const response = await fetch(
        'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ partnerCode: code.trim(), checkPartnerCode: true }),
        }
      );
      const data = await response.json();
      setPartnerCodeValid(data?.isValid === true);

      if (!data?.isValid) {
        setFormData(prev => ({ ...prev, wordCount: Math.min(prev.wordCount, 2000) }));
      }
    } catch (err) {
      console.error('Error checking partner code:', err);
      setPartnerCodeValid(false);
    }
    setIsCheckingPartnerCode(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfError(null);

    if (file) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        setPdfError(de.pdfOnly);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setPdfError(de.pdfTooLarge);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setFormData(prev => ({ ...prev, pdfFile: file }));
    }
  };

  const removePdf = () => {
    setFormData(prev => ({ ...prev, pdfFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      if (!formData.name.trim() || !formData.email.trim()) {
        alert('Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }
      const emailDomain = formData.email.toLowerCase().split('@')[1];
      if (blockedEmailDomains.includes(emailDomain)) {
        setEmailError(de.blockedEmail);
        return;
      }

      setIsCheckingEmail(true);
      setEmailError(null);
      try {
        const response = await fetch(
          'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, checkEmailOnly: true }),
          }
        );
        const data = await response.json();
        if (data?.exists) {
          setEmailError(de.emailDuplicate);
          setIsCheckingEmail(false);
          return;
        }
      } catch (err) {
        console.error('Error checking email:', err);
      }
      setIsCheckingEmail(false);
    }

    if (currentStep === 1) {
      if (!formData.websiteUrl.trim()) {
        alert('Bitte geben Sie Ihre Website-URL ein.');
        return;
      }

      let url = formData.websiteUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        setFormData(prev => ({ ...prev, websiteUrl: url }));
      }

      setIsCheckingDomain(true);
      setDomainError(null);
      setEmailError(null);

      try {
        const reachabilityResponse = await fetch(
          'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteUrl: url, checkUrlReachable: true }),
          }
        );
        const reachabilityData = await reachabilityResponse.json();
        if (!reachabilityData?.isReachable) {
          setDomainError(de.urlNotReachable.replace('{url}', url));
          setIsCheckingDomain(false);
          return;
        }
      } catch (err) {
        console.error('Error checking URL reachability:', err);
        setDomainError(de.urlCheckFailed);
        setIsCheckingDomain(false);
        return;
      }

      try {
        const response = await fetch(
          'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteUrl: url, checkDomainOnly: true }),
          }
        );
        const data = await response.json();
        if (data?.domainExists) {
          setDomainError(de.domainDuplicate);
          setIsCheckingDomain(false);
          return;
        }
      } catch (err) {
        console.error('Error checking domain:', err);
      }

      setIsCheckingDomain(false);
    }

    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 2) {
      if (!formData.topic.trim()) {
        setTopicError(de.topicRequired);
        return;
      }
      const wordCount = formData.topic.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount < 5) {
        setTopicError(de.topicMinWords);
        return;
      }
      if (!formData.articleGoal) {
        alert(de.goalRequired);
        return;
      }
      if (!formData.marketingConsent) {
        alert(de.consentRequired);
        return;
      }

      setIsValidatingTopic(true);
      setTopicError(null);

      try {
        const response = await fetch(
          'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: formData.topic, validateTopic: true }),
          }
        );
        const data = await response.json();
        if (!data?.isValid) {
          setTopicError(data?.reason || 'Please enter a valid, meaningful blog topic.');
          setIsValidatingTopic(false);
          return;
        }
      } catch (err) {
        console.error('Error validating topic:', err);
      }

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
              const chunk = bytes.subarray(i, i + chunkSize);
              binary += String.fromCharCode(...chunk);
            }
            pdfBase64 = btoa(binary);
          } catch (pdfErr) {
            console.warn('PDF processing failed, continuing without PDF:', pdfErr);
          }
        }

        const submitResponse = await fetch(
          'https://svqpkltbqpsldvfwmsbd.supabase.co/functions/v1/send-content-request',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
          }
        );

        if (!submitResponse.ok) {
          const errorData = await submitResponse.json().catch(() => ({}));
          console.error('Request failed:', errorData);
          throw new Error(errorData.error || 'Request failed');
        }

        setIsSuccess(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.');
      } finally {
        setIsSubmitting(false);
      }
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  };

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
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md bg-cta rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="pt-4">
                {isSuccess ? (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="size-20 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="size-12 text-white" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-semibold text-white">
                      {de.successTitle}
                    </h2>
                    <p className="text-base text-white/80">
                      {de.successMessage.replace('{email}', formData.email)}
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-white text-cta font-medium hover:bg-white/90 transition-colors"
                    >
                      {de.gotIt}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center gap-2 mb-8">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 rounded-full transition-all ${
                            index === currentStep
                              ? 'w-8 bg-white'
                              : index < currentStep
                              ? 'w-4 bg-white/60'
                              : 'w-4 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-semibold text-white">
                        {steps[currentStep].title}
                      </h2>
                      <p className="text-base text-white/80">
                        {steps[currentStep].subtitle}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {currentStep === 0 && (
                        <>
                          <div>
                            <label htmlFor={nameId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.yourName}
                            </label>
                            <input
                              type="text"
                              id={nameId}
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                              placeholder={de.namePlaceholder}
                              className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor={emailId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.emailAddress}
                            </label>
                            <input
                              type="email"
                              id={emailId}
                              value={formData.email}
                              onChange={(e) => {
                                updateField('email', e.target.value);
                                setEmailError(null);
                              }}
                              placeholder={de.emailPlaceholder}
                              className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm ${
                                emailError ? 'ring-2 ring-red-500' : ''
                              }`}
                            />
                            {emailError && (
                              <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                                {emailError}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {currentStep === 1 && (
                        <>
                          <div>
                            <label htmlFor={websiteId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.websiteUrl}
                            </label>
                            <input
                              type="url"
                              id={websiteId}
                              value={formData.websiteUrl}
                              onChange={(e) => {
                                updateField('websiteUrl', e.target.value);
                                setDomainError(null);
                              }}
                              placeholder={de.websitePlaceholder}
                              className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm ${
                                domainError ? 'ring-2 ring-red-500' : ''
                              }`}
                            />
                            {domainError && (
                              <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                                {domainError}
                              </p>
                            )}
                            <p className="text-xs text-white/60 mt-2">{de.websiteHint}</p>
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div>
                            <label htmlFor={topicId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.blogTopic}
                            </label>
                            <textarea
                              id={topicId}
                              value={formData.topic}
                              onChange={(e) => {
                                updateField('topic', e.target.value);
                                setTopicError(null);
                              }}
                              placeholder={de.topicPlaceholder}
                              className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none h-24 ${
                                topicError ? 'ring-2 ring-red-500' : ''
                              }`}
                            />
                            {topicError && (
                              <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                                {topicError}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="articleGoal" className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.articleGoal}
                            </label>
                            <select
                              id="articleGoal"
                              value={formData.articleGoal}
                              onChange={(e) => updateField('articleGoal', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm appearance-none"
                            >
                              <option value="">{de.selectGoal}</option>
                              <option value="inform">{de.goalInform}</option>
                              <option value="enable">{de.goalEnable}</option>
                              <option value="evaluate">{de.goalEvaluate}</option>
                              <option value="assess">{de.goalAssess}</option>
                              <option value="buy">{de.goalBuy}</option>
                              <option value="use">{de.goalUse}</option>
                              <option value="thought-leader">{de.goalThoughtLeader}</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor={wordCountId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest flex justify-between">
                              <span>{de.articleLength}</span>
                              <span>{formData.wordCount} {de.words}</span>
                            </label>
                            <input
                              type="range"
                              id={wordCountId}
                              min="1000"
                              max={sliderMax}
                              step="500"
                              value={formData.wordCount}
                              onChange={(e) => updateField('wordCount', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label htmlFor={additionalId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.additionalContext}
                            </label>
                            <textarea
                              id={additionalId}
                              value={formData.additionalInfo}
                              onChange={(e) => updateField('additionalInfo', e.target.value)}
                              placeholder={de.additionalPlaceholder}
                              className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none h-20"
                            />
                            <p className="text-xs text-white/60 mt-2">{de.additionalHint}</p>
                          </div>

                          <div className="relative">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".pdf"
                              className="hidden"
                            />
                            {!formData.pdfFile ? (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-dashed border-white/30 hover:border-white/50 bg-white/5 text-white text-sm transition-colors flex items-center justify-center gap-2"
                              >
                                <Paperclip className="w-4 h-4" />
                                {de.attachPdf}
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-lg border border-white/20">
                                <span className="text-sm text-white truncate">{formData.pdfFile.name}</span>
                                <button
                                  type="button"
                                  onClick={removePdf}
                                  className="ml-2 text-white/60 hover:text-white transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                            {pdfError && (
                              <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                                {pdfError}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="partnerCode" className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                              {de.partnerCode}
                            </label>
                            <input
                              type="text"
                              id="partnerCode"
                              value={formData.partnerCode}
                              onChange={(e) => {
                                const code = e.target.value;
                                updateField('partnerCode', code);
                                if (partnerCodeTimeoutRef.current) {
                                  clearTimeout(partnerCodeTimeoutRef.current);
                                }
                                partnerCodeTimeoutRef.current = setTimeout(() => {
                                  validatePartnerCode(code);
                                }, 500);
                              }}
                              placeholder={de.partnerPlaceholder}
                              className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                            />
                            {isCheckingPartnerCode && (
                              <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" /> {de.checking}
                              </p>
                            )}
                            {partnerCodeValid && (
                              <p className="text-xs text-green-300 mt-1">{de.partnerCodeUnlocked}</p>
                            )}
                          </div>

                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="consent"
                              checked={formData.marketingConsent}
                              onChange={(e) => updateField('marketingConsent', e.target.checked)}
                              className="mt-1"
                            />
                            <label htmlFor="consent" className="text-xs text-white/80 leading-relaxed">
                              {de.consentText}{' '}
                              <a href="#" className="underline hover:text-white">
                                {de.privacyPolicy}
                              </a>{' '}
                              {de.and}{' '}
                              <a href="#" className="underline hover:text-white">
                                {de.termsConditions}
                              </a>
                            </label>
                          </div>
                        </>
                      )}

                      <div className="flex gap-3 pt-4">
                        {currentStep > 0 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium"
                          >
                            {de.back}
                          </button>
                        )}
                        <button
                          type={currentStep === 2 ? 'submit' : 'button'}
                          onClick={currentStep < 2 ? nextStep : undefined}
                          disabled={isCheckingEmail || isCheckingDomain || isSubmitting || isValidatingTopic}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-white text-cta hover:bg-white/90 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isCheckingEmail || isCheckingDomain ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> {de.checking}
                            </>
                          ) : isValidatingTopic ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> {de.validatingTopic}
                            </>
                          ) : isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> {de.sending}
                            </>
                          ) : currentStep === 2 ? (
                            de.getMyFreeArticle
                          ) : (
                            de.continue
                          )}
                        </button>
                      </div>

                      {currentStep === 2 && (
                        <p className="text-center text-xs text-white/60 py-2">{de.trustIndicator}</p>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default button trigger
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-cta h-8 px-4 py-0 text-sm"
      >
        {triggerLabel || de.freeTrial}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md bg-cta rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="pt-4">
              {isSuccess ? (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="size-20 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle className="size-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-semibold text-white">
                    {de.successTitle}
                  </h2>
                  <p className="text-base text-white/80">
                    {de.successMessage.replace('{email}', formData.email)}
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full bg-white text-cta font-medium hover:bg-white/90 transition-colors"
                  >
                    {de.gotIt}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center gap-2 mb-8">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentStep
                            ? 'w-8 bg-white'
                            : index < currentStep
                            ? 'w-4 bg-white/60'
                            : 'w-4 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-semibold text-white">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-base text-white/80">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {currentStep === 0 && (
                      <>
                        <div>
                          <label htmlFor={nameId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.yourName}
                          </label>
                          <input
                            type="text"
                            id={nameId}
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder={de.namePlaceholder}
                            className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor={emailId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.emailAddress}
                          </label>
                          <input
                            type="email"
                            id={emailId}
                            value={formData.email}
                            onChange={(e) => {
                              updateField('email', e.target.value);
                              setEmailError(null);
                            }}
                            placeholder={de.emailPlaceholder}
                            className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm ${
                              emailError ? 'ring-2 ring-red-500' : ''
                            }`}
                          />
                          {emailError && (
                            <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                              {emailError}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {currentStep === 1 && (
                      <>
                        <div>
                          <label htmlFor={websiteId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.websiteUrl}
                          </label>
                          <input
                            type="url"
                            id={websiteId}
                            value={formData.websiteUrl}
                            onChange={(e) => {
                              updateField('websiteUrl', e.target.value);
                              setDomainError(null);
                            }}
                            placeholder={de.websitePlaceholder}
                            className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm ${
                              domainError ? 'ring-2 ring-red-500' : ''
                            }`}
                          />
                          {domainError && (
                            <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                              {domainError}
                            </p>
                          )}
                          <p className="text-xs text-white/60 mt-2">{de.websiteHint}</p>
                        </div>
                      </>
                    )}

                    {currentStep === 2 && (
                      <>
                        <div>
                          <label htmlFor={topicId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.blogTopic}
                          </label>
                          <textarea
                            id={topicId}
                            value={formData.topic}
                            onChange={(e) => {
                              updateField('topic', e.target.value);
                              setTopicError(null);
                            }}
                            placeholder={de.topicPlaceholder}
                            className={`w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none h-24 ${
                              topicError ? 'ring-2 ring-red-500' : ''
                            }`}
                          />
                          {topicError && (
                            <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                              {topicError}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="articleGoal" className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.articleGoal}
                          </label>
                          <select
                            id="articleGoal"
                            value={formData.articleGoal}
                            onChange={(e) => updateField('articleGoal', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm appearance-none"
                          >
                            <option value="">{de.selectGoal}</option>
                            <option value="inform">{de.goalInform}</option>
                            <option value="enable">{de.goalEnable}</option>
                            <option value="evaluate">{de.goalEvaluate}</option>
                            <option value="assess">{de.goalAssess}</option>
                            <option value="buy">{de.goalBuy}</option>
                            <option value="use">{de.goalUse}</option>
                            <option value="thought-leader">{de.goalThoughtLeader}</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor={wordCountId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest flex justify-between">
                            <span>{de.articleLength}</span>
                            <span>{formData.wordCount} {de.words}</span>
                          </label>
                          <input
                            type="range"
                            id={wordCountId}
                            min="1000"
                            max={sliderMax}
                            step="500"
                            value={formData.wordCount}
                            onChange={(e) => updateField('wordCount', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor={additionalId} className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.additionalContext}
                          </label>
                          <textarea
                            id={additionalId}
                            value={formData.additionalInfo}
                            onChange={(e) => updateField('additionalInfo', e.target.value)}
                            placeholder={de.additionalPlaceholder}
                            className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none h-20"
                          />
                          <p className="text-xs text-white/60 mt-2">{de.additionalHint}</p>
                        </div>

                        <div className="relative">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="hidden"
                          />
                          {!formData.pdfFile ? (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full px-4 py-2.5 rounded-lg border-2 border-dashed border-white/30 hover:border-white/50 bg-white/5 text-white text-sm transition-colors flex items-center justify-center gap-2"
                            >
                              <Paperclip className="w-4 h-4" />
                              {de.attachPdf}
                            </button>
                          ) : (
                            <div className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-lg border border-white/20">
                              <span className="text-sm text-white truncate">{formData.pdfFile.name}</span>
                              <button
                                type="button"
                                onClick={removePdf}
                                className="ml-2 text-white/60 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {pdfError && (
                            <p className="text-white text-xs mt-2 bg-black/30 px-3 py-2 rounded-lg">
                              {pdfError}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="partnerCode" className="block text-xs font-mono text-white mb-2 uppercase tracking-widest">
                            {de.partnerCode}
                          </label>
                          <input
                            type="text"
                            id="partnerCode"
                            value={formData.partnerCode}
                            onChange={(e) => {
                              const code = e.target.value;
                              updateField('partnerCode', code);
                              if (partnerCodeTimeoutRef.current) {
                                clearTimeout(partnerCodeTimeoutRef.current);
                              }
                              partnerCodeTimeoutRef.current = setTimeout(() => {
                                validatePartnerCode(code);
                              }, 500);
                            }}
                            placeholder={de.partnerPlaceholder}
                            className="w-full px-4 py-2.5 rounded-lg bg-background border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                          />
                          {isCheckingPartnerCode && (
                            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> {de.checking}
                            </p>
                          )}
                          {partnerCodeValid && (
                            <p className="text-xs text-green-300 mt-1">{de.partnerCodeUnlocked}</p>
                          )}
                        </div>

                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            id="consent"
                            checked={formData.marketingConsent}
                            onChange={(e) => updateField('marketingConsent', e.target.checked)}
                            className="mt-1"
                          />
                          <label htmlFor="consent" className="text-xs text-white/80 leading-relaxed">
                            {de.consentText}{' '}
                            <a href="#" className="underline hover:text-white">
                              {de.privacyPolicy}
                            </a>{' '}
                            {de.and}{' '}
                            <a href="#" className="underline hover:text-white">
                              {de.termsConditions}
                            </a>
                          </label>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium"
                        >
                          {de.back}
                        </button>
                      )}
                      <button
                        type={currentStep === 2 ? 'submit' : 'button'}
                        onClick={currentStep < 2 ? nextStep : undefined}
                        disabled={isCheckingEmail || isCheckingDomain || isSubmitting || isValidatingTopic}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-white text-cta hover:bg-white/90 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isCheckingEmail || isCheckingDomain ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> {de.checking}
                          </>
                        ) : isValidatingTopic ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> {de.validatingTopic}
                          </>
                        ) : isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> {de.sending}
                          </>
                        ) : currentStep === 2 ? (
                          de.getMyFreeArticle
                        ) : (
                          de.continue
                        )}
                      </button>
                    </div>

                    {currentStep === 2 && (
                      <p className="text-center text-xs text-white/60 py-2">{de.trustIndicator}</p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
