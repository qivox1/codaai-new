'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Video, Phone, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CodaAI Termin-Buchungs-Widget
 * -------------------------------------------------------------------------
 * 1:1-Portierung des regionalflat.de-Buchungswidgets (Apps-Script-Backend),
 * umgesetzt als React-Komponente im CodaAI-Designsystem (Magenta #DF41FB).
 *
 * Backend: Google-Apps-Script-Web-App unter hi@codaai.ai.
 * → /exec-URL unten in BOOKING_ENDPOINT eintragen, sobald deployt.
 *
 * Contract:
 *   GET  ?action=slots           -> { ok, ver, slots: Day[] }
 *   POST { action:'send_code', phone } -> { ok, token, phone } | { ok:false, error }
 *   POST { name,email,company,iso,type,phone,token,code } -> { ok, type, meetLink, when } | { ok:false, error }
 */

// ⚠️ Nach dem Apps-Script-Deploy unter hi@codaai.ai hier die /exec-URL eintragen.
const BOOKING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyr-OljJObRAtbuujuCIAyv5StyK2hgN_sxiaQZo2RzauxIsizjzSFx5Ij3KJ2t8pvb/exec';
// Fallback, falls das Backend (noch) nicht erreichbar ist:
const FALLBACK_URL = '/kontakt';

type Slot = { iso: string; hm: string };
type Day = { date: string; dayLabel: string; dateLabel: string; times: Slot[] };
type Week = { key: string; days: { day: Day; gIdx: number }[] };
type BookType = 'meeting' | 'call';
type View = 'loading' | 'steps' | 'verify' | 'fallback' | 'done';
type StepName = 'type' | 'day' | 'time' | 'contact';

interface Props {
  lang?: 'de' | 'en';
}

const T = {
  de: {
    headline: '30-Minuten-Strategiegespräch',
    sub: 'Per Video oder Telefon',
    duration: '30 Min',
    reassurePill: 'Kostenlos & unverbindlich',
    reassureCta: 'Kein Verkaufsgespräch · Antwort sofort per E-Mail',
    doneLead: 'Wir haben Ihren Termin reserviert.',
    doneWhenLabel: 'Termin', doneType: 'Art',
    doneTypeMeeting: 'Webmeeting (Video)', doneTypeCall: 'Telefontermin',
    doneMailHint: 'Bestätigung & Kalender-Datei sind unterwegs an Ihre E-Mail.',
    doneCallHint: 'Wir rufen Sie pünktlich an.',
    doneMeetHint: 'Den Video-Link finden Sie in der E-Mail.',
    loading: 'Freie Termine werden geladen …',
    q1: 'Wie möchten Sie sprechen?',
    meeting: 'Webmeeting', meetingSub: 'per Video',
    call: 'Telefonat', callSub: 'wir rufen an',
    q2: 'Tag wählen',
    q3: 'Uhrzeit wählen',
    q4: 'Ihre Kontaktdaten',
    am: 'Vormittags', pm: 'Nachmittags',
    edit: 'ändern',
    name: 'Ihr Name', email: 'Ihre E-Mail',
    phone: 'Ihre Handynummer (für den Anruf)', company: 'Firma',
    book: 'Termin verbindlich buchen',
    sendingCode: 'Code wird gesendet …', booking: 'Wird gebucht …',
    week: 'Woche', of: 'von',
    verifyTitle: 'Handynummer bestätigen',
    verifyInfo1: 'Wir haben Ihnen einen 6-stelligen Code per SMS an',
    verifyInfo2: ' gesendet. Bitte hier eingeben:',
    codePlaceholder: '6-stelliger Code',
    verifyBook: 'Bestätigen & Termin buchen',
    resend: 'Code erneut senden', resending: 'Senden …', changeNum: 'Nummer ändern',
    fallbackText: 'Aktuell können wir keine Termine laden. Schreiben Sie uns kurz – wir melden uns mit einem Terminvorschlag.',
    fallbackBtn: 'Termin per Kontakt anfragen →',
    doneTitle: 'Termin bestätigt!',
    meetingLabel: 'Webmeeting', callLabel: 'Telefontermin',
    doneIsBooked: 'ist gebucht:',
    afterCall: ' Wir rufen Sie pünktlich an. Den Termin finden Sie in der Bestätigungs-E-Mail.',
    afterMeet: ' Den Video-Link finden Sie in der Bestätigungs-E-Mail.',
    afterMeetNoLink: ' Sie erhalten gleich eine Bestätigungs-E-Mail.',
    uhr: 'Uhr',
    errors: {
      slot_taken: 'Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.',
      email_invalid: 'Bitte prüfen Sie Ihre E-Mail-Adresse.',
      company_missing: 'Bitte geben Sie Ihre Firma an.',
      phone_invalid: 'Bitte geben Sie eine gültige Handynummer ein.',
      too_soon: 'Dieser Termin liegt zu kurzfristig. Bitte wählen Sie einen späteren.',
      too_many_codes: 'Zu viele SMS-Anfragen für diese Nummer. Bitte später erneut versuchen.',
      sms_not_configured: 'SMS-Versand ist derzeit nicht möglich. Bitte wählen Sie ein Webmeeting.',
      sms_send_failed: 'Die SMS konnte nicht gesendet werden. Bitte Nummer prüfen oder erneut versuchen.',
      code_missing: 'Bitte geben Sie den Code aus der SMS ein.',
      code_invalid: 'Der Code stimmt nicht. Bitte erneut eingeben.',
      code_expired: 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.',
      code_attempts: 'Zu viele Fehlversuche. Bitte fordern Sie einen neuen Code an.',
      conn: 'Verbindung fehlgeschlagen. Bitte erneut versuchen.',
      generic: 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.',
    },
  },
  en: {
    headline: '30-minute strategy call',
    sub: 'Via video or phone',
    duration: '30 min',
    reassurePill: 'Free & no obligation',
    reassureCta: 'No sales pitch · instant email confirmation',
    doneLead: 'We’ve reserved your appointment.',
    doneWhenLabel: 'When', doneType: 'Type',
    doneTypeMeeting: 'Web meeting (video)', doneTypeCall: 'Phone call',
    doneMailHint: 'Confirmation & calendar file are on their way to your email.',
    doneCallHint: 'We’ll call you on time.',
    doneMeetHint: 'The video link is in the email.',
    loading: 'Loading available times …',
    q1: 'How would you like to talk?',
    meeting: 'Web meeting', meetingSub: 'via video',
    call: 'Phone call', callSub: 'we call you',
    q2: 'Choose a day',
    q3: 'Choose a time',
    q4: 'Your details',
    am: 'Morning', pm: 'Afternoon',
    edit: 'change',
    name: 'Your name', email: 'Your email',
    phone: 'Your mobile number (for the call)', company: 'Company',
    book: 'Book appointment',
    sendingCode: 'Sending code …', booking: 'Booking …',
    week: 'Week', of: 'of',
    verifyTitle: 'Confirm mobile number',
    verifyInfo1: 'We sent a 6-digit code via SMS to',
    verifyInfo2: '. Please enter it here:',
    codePlaceholder: '6-digit code',
    verifyBook: 'Confirm & book',
    resend: 'Resend code', resending: 'Sending …', changeNum: 'Change number',
    fallbackText: 'We can’t load times right now. Drop us a line and we’ll get back with a proposed time.',
    fallbackBtn: 'Request via contact →',
    doneTitle: 'Appointment confirmed!',
    meetingLabel: 'web meeting', callLabel: 'phone call',
    doneIsBooked: 'is booked:',
    afterCall: ' We’ll call you on time. You’ll find the details in the confirmation email.',
    afterMeet: ' The video link is in the confirmation email.',
    afterMeetNoLink: ' You’ll receive a confirmation email shortly.',
    uhr: '',
    errors: {
      slot_taken: 'This slot was just taken. Please choose another.',
      email_invalid: 'Please check your email address.',
      company_missing: 'Please enter your company.',
      phone_invalid: 'Please enter a valid mobile number.',
      too_soon: 'This slot is too soon. Please pick a later one.',
      too_many_codes: 'Too many SMS requests for this number. Please try again later.',
      sms_not_configured: 'SMS is currently unavailable. Please choose a web meeting.',
      sms_send_failed: 'The SMS could not be sent. Check the number or try again.',
      code_missing: 'Please enter the code from the SMS.',
      code_invalid: 'The code is incorrect. Please try again.',
      code_expired: 'The code has expired. Please request a new one.',
      code_attempts: 'Too many attempts. Please request a new code.',
      conn: 'Connection failed. Please try again.',
      generic: 'That didn’t work. Please try again.',
    },
  },
};

const STEP_ORDER: StepName[] = ['type', 'day', 'time', 'contact'];

function emailOk(v: string) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }
function phoneOk(v: string) {
  const digits = (v || '').replace(/[^\d]/g, '');
  return /^\+?[\d\s/()-]{7,20}$/.test(v || '') && digits.length >= 7 && digits.length <= 15;
}
function mondayKey(ymd: string) {
  const p = (ymd || '').split('-');
  const d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
  const wd = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - wd);
  return d.toISOString().slice(0, 10);
}

export default function BookingWidget({ lang = 'de' }: Props) {
  const t = T[lang];

  const [view, setView] = useState<View>('loading');
  const [openStep, setOpenStep] = useState<StepName>('type');

  const [days, setDays] = useState<Day[]>([]);
  const [curWeek, setCurWeek] = useState(0);

  const [selType, setSelType] = useState<BookType>('meeting');
  const [typeChosen, setTypeChosen] = useState(false);
  const [selDayIdx, setSelDayIdx] = useState<number | null>(null);
  const [selPart, setSelPart] = useState<'am' | 'pm'>('am');
  const [selIso, setSelIso] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  const [token, setToken] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [resendLeft, setResendLeft] = useState(0);
  const resendRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [busy, setBusy] = useState(false);
  const [stepErr, setStepErr] = useState('');
  const [verifyErr, setVerifyErr] = useState('');
  const [doneInfo, setDoneInfo] = useState<{ when: string; isCall: boolean; hasMeet: boolean } | null>(null);

  const weeks: Week[] = useMemo(() => {
    const map: Record<string, Week> = {};
    const out: Week[] = [];
    days.forEach((day, gIdx) => {
      const k = mondayKey(day.date);
      if (!map[k]) { map[k] = { key: k, days: [] }; out.push(map[k]); }
      map[k].days.push({ day, gIdx });
    });
    out.sort((a, b) => (a.key < b.key ? -1 : 1));
    return out;
  }, [days]);

  const selDayObj = selDayIdx !== null ? days[selDayIdx] : null;

  // ---- Slots laden ----
  useEffect(() => {
    if (!BOOKING_ENDPOINT) { setView('fallback'); return; }
    // cache:'reload' ist Pflicht, nicht Kosmetik. Die /exec-URL antwortet mit
    // einer Weiterleitung auf script.googleusercontent.com, deren Ziel einen
    // kurzlebigen user_content_key traegt. Chrome merkt sich diese
    // Weiterleitung. Wird im Apps Script eine neue Version bereitgestellt,
    // zeigt der gemerkte Link ins Leere: Google liefert eine 404-HTML-Seite,
    // r.json() wirft, und das Widget faellt fuer jeden wiederkehrenden
    // Besucher auf „Aktuell koennen wir keine Termine laden" — genau so am
    // 03.08.2026 nach dem Deploy der 30-Minuten-Version beobachtet.
    // 'reload' erzwingt eine frische Anfrage und umgeht den Redirect-Cache.
    //
    // KEIN Cache-Buster als Query-Parameter: ein zusaetzlicher Parameter an
    // der /exec-URL laesst Google die Weiterleitung mit 404 beantworten —
    // serverseitig reproduzierbar, also nicht browserabhaengig. Wer hier
    // '&cb=' + Date.now() ergaenzt, legt die Terminbuchung lahm.
    const url = BOOKING_ENDPOINT + (BOOKING_ENDPOINT.indexOf('?') > -1 ? '&' : '?') + 'action=slots';
    fetch(url, { cache: 'reload' })
      .then((r) => r.json())
      .then((res) => {
        if (!res || !res.ok || !res.slots || !res.slots.length) { setView('fallback'); return; }
        setDays(res.slots);
        setView('steps');
        setOpenStep('type');
      })
      .catch(() => setView('fallback'));
  }, []);

  useEffect(() => () => { if (resendRef.current) clearInterval(resendRef.current); }, []);

  function errMsg(err?: string) {
    return (t.errors as Record<string, string>)[err || ''] || t.errors.generic;
  }
  function isStepDone(nm: StepName) {
    if (nm === 'type') return typeChosen;
    if (nm === 'day') return selDayIdx !== null;
    if (nm === 'time') return !!selIso;
    return false;
  }

  function chooseType(ty: BookType) {
    setSelType(ty); setTypeChosen(true);
    if (ty !== 'call') setPhone('');
    setOpenStep('day');
  }
  function selectDay(idx: number) {
    setSelDayIdx(idx); setSelIso(null);
    const d = days[idx];
    const am = d.times.some((x) => parseInt(x.hm, 10) < 12);
    setSelPart(am ? 'am' : 'pm');
    setOpenStep('time');
  }
  function selectSlot(iso: string) { setSelIso(iso); setOpenStep('contact'); }

  function editStep(nm: StepName) {
    if (nm === 'type') { setSelDayIdx(null); setSelIso(null); }
    if (nm === 'day') { setSelIso(null); }
    setOpenStep(nm);
  }

  const contactOk =
    !!selIso && name.trim() && emailOk(email.trim()) && company.trim() &&
    (selType !== 'call' || phoneOk(phone.trim()));

  function startResend(sec: number) {
    if (resendRef.current) clearInterval(resendRef.current);
    setResendLeft(sec);
    resendRef.current = setInterval(() => {
      setResendLeft((l) => {
        if (l <= 1) { if (resendRef.current) clearInterval(resendRef.current); resendRef.current = null; return 0; }
        return l - 1;
      });
    }, 1000);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactOk || busy) return;
    setStepErr('');
    if (selType === 'call') requestCode();
    else doBook(false);
  }

  function requestCode() {
    setBusy(true); setStepErr('');
    fetch(BOOKING_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'send_code', phone: phone.trim() }),
    })
      .then((r) => r.json())
      .then((res) => {
        setBusy(false);
        if (res && res.ok) {
          setToken(res.token);
          setVerifyNum(res.phone || phone.trim());
          setCode(''); setVerifyErr('');
          setView('verify');
          startResend(60);
        } else {
          setStepErr(errMsg(res && res.error));
        }
      })
      .catch(() => { setBusy(false); setStepErr(t.errors.conn); });
  }

  function doBook(fromVerify: boolean) {
    setBusy(true);
    if (fromVerify) setVerifyErr(''); else setStepErr('');
    fetch(BOOKING_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: name.trim(), email: email.trim(), company: company.trim(),
        iso: selIso, type: selType,
        phone: selType === 'call' ? phone.trim() : '',
        token: token || '', code: selType === 'call' ? code.trim() : '',
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        setBusy(false);
        if (res && res.ok) {
          const isCall = res.type === 'call';
          setDoneInfo({ when: res.when || '', isCall, hasMeet: !!res.meetLink });
          if (resendRef.current) { clearInterval(resendRef.current); resendRef.current = null; }
          setView('done');
        } else {
          if (fromVerify) setVerifyErr(errMsg(res && res.error));
          else setStepErr(errMsg(res && res.error));
        }
      })
      .catch(() => { setBusy(false); if (fromVerify) setVerifyErr(t.errors.conn); else setStepErr(t.errors.conn); });
  }

  function changeNumber() {
    if (resendRef.current) { clearInterval(resendRef.current); resendRef.current = null; }
    setToken(null); setCode(''); setVerifyErr('');
    setView('steps'); setOpenStep('contact');
  }

  // ---------- UI Bausteine ----------
  const cardCls = 'overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl';

  function StepHead({ n, name: nm, title, summary }: { n: number; name: StepName; title: string; summary?: string }) {
    const done = openStep !== nm && isStepDone(nm);
    return (
      <button
        type="button"
        onClick={() => { if (done) editStep(nm); }}
        className={`flex w-full items-center gap-3 text-left ${done ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${openStep === nm || done ? 'bg-cta text-cta-foreground' : 'bg-muted text-muted-foreground'}`}>
          {done ? <Check className="h-4 w-4" /> : n}
        </span>
        <span className="font-semibold text-foreground">{title}</span>
        {done && summary && <span className="ml-auto truncate text-sm text-muted-foreground">{summary}</span>}
        {done && <span className="ml-2 shrink-0 text-xs font-medium text-cta-accessible">{t.edit}</span>}
      </button>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/40';

  const summaryType = typeChosen ? (selType === 'call' ? t.call : t.meeting) : '';
  const summaryDay = selDayObj ? `${selDayObj.dayLabel}, ${selDayObj.dateLabel}` : '';
  const summaryTime = selIso ? (days.flatMap((d) => d.times).find((x) => x.iso === selIso)?.hm || '') + ' ' + t.uhr : '';

  const slotTimes = selDayObj
    ? selDayObj.times.filter((x) => (selPart === 'am' ? parseInt(x.hm, 10) < 12 : parseInt(x.hm, 10) >= 12))
    : [];
  const hasAm = selDayObj?.times.some((x) => parseInt(x.hm, 10) < 12);
  const hasPm = selDayObj?.times.some((x) => parseInt(x.hm, 10) >= 12);

  return (
    <div className={cardCls}>
      {/* Kopf */}
      <div className="flex items-start gap-3 border-b border-border bg-gradient-to-br from-cta/10 via-cta/5 to-transparent px-6 py-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cta/10 ring-1 ring-cta/20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#DF41FB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 leading-tight">
          <b className="block text-foreground">{t.headline}</b>
          <span className="text-sm text-muted-foreground">{t.sub}</span>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-cta/10 px-2 py-0.5 text-xs font-medium text-cta-accessible">
            <Check className="h-3 w-3" /> {t.reassurePill}
          </span>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-cta/10 px-3 py-1 text-xs font-semibold text-cta-accessible">{t.duration}</span>
      </div>

      <div className="p-6">
        {view === 'loading' && (
          <div className="flex items-center gap-3 py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-cta" /> {t.loading}
          </div>
        )}

        {view === 'fallback' && (
          <div className="py-4">
            <p className="mb-4 text-muted-foreground">{t.fallbackText}</p>
            <a href={FALLBACK_URL} className="inline-flex items-center justify-center rounded-[14px] bg-cta px-5 py-3 font-semibold text-cta-foreground transition-opacity hover:opacity-90">
              {t.fallbackBtn}
            </a>
          </div>
        )}

        {view === 'steps' && (
          <div className="space-y-5">
            {/* Schritt 1: Terminart */}
            <section>
              <StepHead n={1} name="type" title={t.q1} summary={summaryType} />
              {openStep === 'type' && (
                <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup" aria-label={t.q1}>
                  {([['meeting', Video, t.meeting, t.meetingSub], ['call', Phone, t.call, t.callSub]] as const).map(
                    ([ty, Icon, label, sub]) => {
                      const on = selType === ty && typeChosen;
                      return (
                        <button
                          key={ty}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => chooseType(ty as BookType)}
                          className={`flex flex-col items-center gap-1 rounded-[14px] border p-4 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50 ${on ? 'border-cta bg-cta/10 shadow-sm' : 'border-border hover:border-cta hover:bg-cta/5'}`}
                        >
                          <Icon className={`h-6 w-6 ${on ? 'text-cta' : 'text-muted-foreground'}`} />
                          <span className="font-semibold text-foreground">{label}</span>
                          <span className="text-xs text-muted-foreground">{sub}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </section>

            {/* Schritt 2: Tag */}
            <section className={openStep === 'type' && !typeChosen ? 'pointer-events-none opacity-40' : ''}>
              <StepHead n={2} name="day" title={t.q2} summary={summaryDay} />
              {openStep === 'day' && (
                <div className="mt-3">
                  {weeks.length > 1 && (
                    <div className="mb-2 text-center text-xs text-muted-foreground">
                      {t.week} {curWeek + 1} {t.of} {weeks.length}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {weeks.length > 1 && (
                      <button type="button" disabled={curWeek <= 0} onClick={() => setCurWeek((w) => Math.max(0, w - 1))}
                        className="shrink-0 rounded-[14px] border border-border p-2 text-foreground disabled:opacity-30" aria-label="Vorherige Woche">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}
                    <div className="grid flex-1 grid-cols-5 gap-2">
                      {(weeks[curWeek]?.days || []).map(({ day, gIdx }) => (
                        <button
                          key={gIdx}
                          type="button"
                          onClick={() => selectDay(gIdx)}
                          className={`rounded-[14px] border px-1 py-2 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50 ${gIdx === selDayIdx ? 'border-cta bg-cta/10 shadow-sm' : 'border-border hover:border-cta hover:bg-cta/10'}`}
                        >
                          <div className="text-xs text-muted-foreground">{day.dayLabel}</div>
                          <div className="text-sm font-semibold text-foreground">{day.dateLabel}</div>
                        </button>
                      ))}
                    </div>
                    {weeks.length > 1 && (
                      <button type="button" disabled={curWeek >= weeks.length - 1} onClick={() => setCurWeek((w) => Math.min(weeks.length - 1, w + 1))}
                        className="shrink-0 rounded-[14px] border border-border p-2 text-foreground disabled:opacity-30" aria-label="Nächste Woche">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Schritt 3: Uhrzeit */}
            <section className={selDayIdx === null ? 'pointer-events-none opacity-40' : ''}>
              <StepHead n={3} name="time" title={t.q3} summary={summaryTime} />
              {openStep === 'time' && selDayObj && (
                <div className="mt-3">
                  {hasAm && hasPm && (
                    <div className="mb-3 inline-flex rounded-lg border border-border p-1">
                      {(['am', 'pm'] as const).map((p) => (
                        <button key={p} type="button" onClick={() => setSelPart(p)}
                          className={`rounded-[14px] px-3 py-1 text-sm font-medium transition-colors ${selPart === p ? 'bg-cta text-cta-foreground' : 'text-muted-foreground hover:text-cta-accessible'}`}>
                          {p === 'am' ? t.am : t.pm}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slotTimes.map((s) => (
                      <button key={s.iso} type="button" onClick={() => selectSlot(s.iso)}
                        className={`rounded-[14px] border py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50 ${s.iso === selIso ? 'border-cta bg-cta text-cta-foreground shadow-sm' : 'border-border text-foreground hover:border-cta hover:bg-cta/10'}`}>
                        {s.hm}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Schritt 4: Kontakt */}
            <section className={!selIso ? 'pointer-events-none opacity-40' : ''}>
              <StepHead n={4} name="contact" title={t.q4} />
              {openStep === 'contact' && (
                <form onSubmit={submit} className="mt-3 space-y-3">
                  <input className={inputCls} type="text" placeholder={t.name} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <input className={inputCls} type="email" placeholder={t.email} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  {selType === 'call' && (
                    <input className={inputCls} type="tel" inputMode="tel" placeholder={t.phone} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  )}
                  <input className={inputCls} type="text" placeholder={t.company} autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} required />
                  <button type="submit" disabled={!contactOk || busy}
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-cta px-5 py-3 font-semibold text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                    {busy ? (<><Loader2 className="h-4 w-4 animate-spin" /> {selType === 'call' ? t.sendingCode : t.booking}</>) : t.book}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">{t.reassureCta}</p>
                  {stepErr && <p className="text-sm text-destructive">{stepErr}</p>}
                </form>
              )}
            </section>
          </div>
        )}

        {view === 'verify' && (
          <div>
            <div className="mb-1 font-semibold text-foreground">{t.verifyTitle}</div>
            <p className="mb-3 text-sm text-muted-foreground">{t.verifyInfo1} <b className="text-foreground">{verifyNum}</b>{t.verifyInfo2}</p>
            <input
              className={inputCls + ' text-center text-lg tracking-[0.4em]'}
              type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
              placeholder={t.codePlaceholder} value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <button type="button" disabled={!/^\d{6}$/.test(code) || busy} onClick={() => doBook(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-[14px] bg-cta px-5 py-3 font-semibold text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              {busy ? (<><Loader2 className="h-4 w-4 animate-spin" /> {t.booking}</>) : t.verifyBook}
            </button>
            <div className="mt-3 flex justify-between text-sm">
              <button type="button" disabled={resendLeft > 0} onClick={requestCode}
                className="font-medium text-cta-accessible disabled:text-muted-foreground">
                {resendLeft > 0 ? `${t.resend} (${resendLeft} s)` : t.resend}
              </button>
              <button type="button" onClick={changeNumber} className="font-medium text-cta-accessible">{t.changeNum}</button>
            </div>
            {verifyErr && <p className="mt-2 text-sm text-destructive">{verifyErr}</p>}
          </div>
        )}

        {view === 'done' && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cta/10 ring-4 ring-cta/10">
              <Check className="h-8 w-8 text-cta" />
            </div>
            <b className="block text-lg text-foreground">{t.doneTitle}</b>
            <p className="mt-1 text-sm text-muted-foreground">{t.doneLead}</p>
            {doneInfo && (
              <dl className="mx-auto mt-4 max-w-sm divide-y divide-border rounded-xl border border-border bg-muted/40 text-left">
                <div className="px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.doneWhenLabel}</dt>
                  <dd className="mt-1 font-semibold leading-snug text-foreground">{doneInfo.when}</dd>
                </div>
                <div className="px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.doneType}</dt>
                  <dd className="mt-1 font-semibold leading-snug text-foreground">{doneInfo.isCall ? t.doneTypeCall : t.doneTypeMeeting}</dd>
                </div>
              </dl>
            )}
            <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              {doneInfo?.isCall ? t.doneCallHint : doneInfo?.hasMeet ? t.doneMeetHint : ''} {t.doneMailHint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
