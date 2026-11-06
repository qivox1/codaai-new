/**
 * Studie „KI-Blindtest B2B-Tech 2026" — eine Quelle für Kennzahlen,
 * Kernaussagen, Zitierangaben, CSV, Markdown-Fassung und Schema (seit 06.11.2026).
 * ---------------------------------------------------------------------------
 * Wer eine Zahl ändert, ändert sie HIER. Seiten (/studie-b2b-tech/,
 * /en/study-b2b-tech/), Markdown-Fassungen, CSV-Downloads und das Schema lesen
 * alle aus dieser Datei. Grundlage: Messung vom 5./6. November 2026,
 * 100 Firmen, 800 Fragen, 3.744 auswertbare Antworten (von 4.000).
 *
 * Bezugsgrößen nie vertauschen: „20,5 % der ANTWORTEN" ≠ „20 % der FIRMEN".
 * TECH_UPDATED steuert Sitemap-lastmod und dateModified (src/lib/lastmod.mjs).
 * Keine Firmennamen, Domains oder Wettbewerbernamen aus der Studie verwenden.
 */
import { AUTOR } from './autor';

export type StudieLang = 'de' | 'en';

const SITE_URL = 'https://www.codaai.ai';

export const TECH_PUBLISHED = new Date('2026-11-06T12:00:00+01:00');
export const TECH_UPDATED = new Date('2026-11-06T12:00:00+01:00');
export const TECH_VERSION = '1.0';

export const TECH_PATH: Record<StudieLang, string> = { de: '/studie-b2b-tech/', en: '/en/study-b2b-tech/' };
export const TECH_MD: Record<StudieLang, string> = { de: '/studie-b2b-tech.md', en: '/en/study-b2b-tech.md' };
export const TECH_CSV: Record<StudieLang, string> = { de: '/studie-b2b-tech/kennzahlen.csv', en: '/en/study-b2b-tech/key-figures.csv' };
/** Grafiken als PNG (3.200 px) und Vektor-PDF zum Herunterladen. */
export const TECH_GRAFIKEN = '/studie-b2b-tech/grafiken/';

export const TECH_IDS = {
  report: `${SITE_URL}/studie-b2b-tech/#report`,
  dataset: `${SITE_URL}/studie-b2b-tech/#dataset`,
};

export const TECH_TITLE: Record<StudieLang, string> = {
  de: 'KI-Blindtest B2B-Tech 2026',
  en: 'AI Blind Test B2B Tech 2026',
};
export const TECH_SUBTITLE: Record<StudieLang, string> = {
  de: 'Auswertung von 3.744 KI-Antworten zu 100 Softwareherstellern, Systemhäusern und IT-Dienstleistern',
  en: 'Analysis of 3,744 AI answers on 100 software vendors, system integrators and IT service providers',
};
export const TECH_DATENSTAND: Record<StudieLang, string> = { de: '5./6. November 2026', en: '5–6 November 2026' };

/** Rohwerte (Prozent mit einer Nachkommastelle, wie ausgewertet). */
export const T = {
  firmen: 100,
  fragen: 800,
  antworten: 3744,
  antwortenGeplant: 4000,
  systeme: 5,
  genannt: 766,
  nennung: 20.5,             // % der Antworten mit Nennung der gefragten Firma
  nieGenanntN: 20,           // Firmen ohne jede Nennung
  wettbewerberStattN: 1737,
  wettbewerberStatt: 46.4,   // % der Antworten: Firma fehlt, Wettbewerber genannt
  firmenMeistErsetzt: 84,    // Firmen: in der Mehrzahl der Antworten fehlt die Firma, Wettbewerber genannt
  websiteQuelleN: 365,
  websiteQuelle: 9.7,        // % der Antworten: eigene Website als Quelle
  websiteNieN: 26,           // Firmen: eigene Website in keiner Antwort Quelle
  avgPosition: 2.2,
  platz1: 42.0,              // % der Nennungen auf Platz 1
  mittelstaendler: 59,       // % der genannten Wettbewerber: Mittelständler
  wettbewerberNennungen: 5814,
  quellenangaben: 21508,
  antwortenMitQuellen: 3499,
  quellenWebsites: 6446,
};

export interface Segment { key: string; de: string; en: string; firmen: number; antworten: number; genannt: number; quote: number; nie: number; website: number; mittelstaendler: number }
export const SEGMENTE: Segment[] = [
  { key: 'software', de: 'Softwarehersteller', en: 'Software vendors', firmen: 40, antworten: 1568, genannt: 511, quote: 32.6, nie: 2, website: 15, mittelstaendler: 52 },
  { key: 'security', de: 'IT-Sicherheit & Cloud', en: 'IT security & cloud', firmen: 20, antworten: 657, genannt: 165, quote: 25.1, nie: 2, website: 13, mittelstaendler: 71 },
  { key: 'systemhaus', de: 'Systemhäuser & IT-Dienstleister', en: 'System integrators & IT services', firmen: 40, antworten: 1519, genannt: 90, quote: 5.9, nie: 16, website: 3, mittelstaendler: 72 },
];

/** Nennungsquote je System (Gesamt und je Segment, % der Antworten). */
export const SYSTEME = [
  { name: 'ChatGPT', gesamt: 18.4, software: 28, systemhaus: 5, security: 25 },
  { name: 'Claude', gesamt: 23.3, software: 38, systemhaus: 5, security: 30 },
  { name: 'Gemini', gesamt: 22.1, software: 33, systemhaus: 9, security: null },
  { name: 'Perplexity', gesamt: 21.0, software: 34, systemhaus: 5, security: 26 },
  { name: 'Google KI-Modus', nameEn: 'Google AI Mode', gesamt: 18.1, software: 30, systemhaus: 6, security: 20 },
];

/** Vergleich mit dem KI-Blindtest Mittelstand 2026 (nur ChatGPT + Google, je Frage). */
export const VERGLEICH = [
  { de: 'Fragen ohne Nennung', en: 'Questions without a mention', mittelstand: 55, it: 74, software: 59, systemhaus: 92, security: 66 },
  { de: 'Firmen in keiner der 8 Fragen genannt', en: 'Companies not named in any of the 8 questions', mittelstand: 13, it: 30, software: 10, systemhaus: 58, security: 15 },
  { de: 'ChatGPT nennt die Firma nie', en: 'ChatGPT never names the company', mittelstand: 40, it: 48, software: 30, systemhaus: 78, security: 25 },
  { de: 'Website nie als Quelle zitiert', en: 'Website never cited as a source', mittelstand: 39, it: 40, software: 25, systemhaus: 65, security: 20 },
];

/** Art der Quellen, Anteil an allen 21.508 Quellenangaben (gerundet). */
export const QUELLEN = [
  { de: 'Websites von Anbietern', en: 'Vendor websites', anteil: 70 },
  { de: 'Vergleichsportale, Verzeichnisse, Bestenlisten', en: 'Comparison portals, directories, best-of lists', anteil: 13 },
  { de: 'Fachmedien und Presse', en: 'Trade media and press', anteil: 5 },
  { de: 'Agentur- und Ratgeberblogs', en: 'Agency and advice blogs', anteil: 4 },
  { de: 'Behörden, Verbände, Institute', en: 'Public bodies, associations, institutes', anteil: 3 },
  { de: 'Analysten und Beratungen', en: 'Analysts and consultancies', anteil: 3 },
  { de: 'Wikipedia, YouTube, LinkedIn', en: 'Wikipedia, YouTube, LinkedIn', anteil: 1 },
];

export const TECH_METHODIK: Record<StudieLang, { t: string; d: string }[]> = {
  de: [
    { t: 'Firmen', d: '100 Unternehmen mit 20 bis 1.000 Mitarbeitenden: 40 Softwarehersteller, 40 Systemhäuser und IT-Dienstleister, 20 Anbieter für IT-Sicherheit und Cloud. 91 sitzen in Deutschland, 6 in der Schweiz, 3 in Österreich.' },
    { t: 'Auswahl', d: 'Aus Verbands-, Siegel- und Partnerverzeichnissen (zum Beispiel „Software Made in Germany", Bundesverband IT-Mittelstand, BSI-Liste qualifizierter Dienstleister, TeleTrusT, eco, Partnernetze von Systemhäusern) — bewusst nicht aus Vergleichsportalen oder KI-Antworten. Nicht aufgenommen: Konzerntöchter, Kunden und Interessenten von CodaAI. Keine Zufallsstichprobe.' },
    { t: 'Fragen', d: 'Je Firma acht Fragen ohne Firmennamen, wie Einkäufer sie stellen: zwei zur Marktübersicht, vier zum Anwendungsfall, zwei zum Vergleich mit Wettbewerbern. Abgeleitet aus Website und Marktumfeld jeder Firma und vor der Messung geprüft. Insgesamt 800 Fragen.' },
    { t: 'Systeme', d: 'ChatGPT, Claude, Gemini, Perplexity und Googles KI-Modus, alle mit Websuche, auf Deutsch, Modellstand November 2026. Je Frage und System eine Antwort. Messung am 5. und 6. November 2026.' },
    { t: 'Auswertung', d: 'Erfasst wurde, ob die Firma genannt wird (einschließlich gängiger Kurzformen), an welcher Stelle, welche Wettbewerber aus ihrem Vergleichsfeld genannt werden, welche Websites als Quelle dienen und ob die eigene darunter ist. Von 4.000 Antworten waren 3.744 auswertbar; die übrigen fielen aus, weil ein System zeitweise nicht antwortete.' },
    { t: 'Quellen und Unternehmensgröße', d: 'Die 420 häufigsten Quell-Websites wurden einzeln einer Art zugeordnet, der Rest über eine Zufallsstichprobe von 200 Angaben hochgerechnet. Als Konzern zählt, wer mehr als 1.000 Beschäftigte hat oder zu einem Konzern gehört, nach öffentlichen Angaben.' },
  ],
  en: [
    { t: 'Companies', d: '100 companies with 20 to 1,000 employees: 40 software vendors, 40 system integrators and IT service providers, 20 IT security and cloud providers. 91 are based in Germany, 6 in Switzerland, 3 in Austria.' },
    { t: 'Selection', d: 'From association, label and partner directories (for example "Software Made in Germany", the German IT SME association BITMi, the BSI list of qualified incident-response providers, TeleTrusT, eco, system-integrator partner networks) — deliberately not from comparison portals or AI answers. Excluded: subsidiaries of corporations, customers and prospects of CodaAI. Not a random sample.' },
    { t: 'Questions', d: 'Eight questions per company without the company name, phrased the way buyers ask: two on the market overview, four on the use case, two comparing competitors. Derived from each company\'s website and market and checked before measuring. 800 questions in total, in German.' },
    { t: 'Systems', d: 'ChatGPT, Claude, Gemini, Perplexity and Google AI Mode, all with web search, in German, model versions as of November 2026. One answer per question and system. Measured on 5 and 6 November 2026.' },
    { t: 'Evaluation', d: 'We recorded whether the company is named (including common short forms), in which position, which competitors from its peer set are named, which websites serve as sources and whether its own website is among them. Of 4,000 answers, 3,744 could be evaluated; the rest failed because one system intermittently did not respond.' },
    { t: 'Sources and company size', d: 'The 420 most frequent source websites were classified individually, the rest extrapolated from a random sample of 200 citations. A corporation is a company with more than 1,000 employees or one that belongs to a group, based on public information.' },
  ],
};

export const TECH_LIMITATIONEN: Record<StudieLang, string[]> = {
  de: [
    'Keine Zufallsstichprobe: Die Ergebnisse gelten für diese 100 Firmen, nicht für „die IT-Branche" insgesamt.',
    'Momentaufnahme: KI-Antworten schwanken von Tag zu Tag, Modell-Updates können Nennungen verschieben. Je Frage und System gibt es eine Antwort.',
    'Gezählt sind nur Wettbewerber aus dem vorab festgelegten Vergleichsfeld jeder Firma — die Zahl der Antworten mit Wettbewerbern ist deshalb eher zu niedrig als zu hoch. Eine Nennung ist nicht in jedem Fall eine Empfehlung.',
    'Die Anteile der Quellenarten sind gerundet und können um einige Prozentpunkte abweichen.',
    'Gemini antwortete bei IT-Sicherheit und Cloud nur 17-mal; dieser Einzelwert ist nicht belastbar und wird nicht ausgewiesen.',
    'Der Vergleich mit dem KI-Blindtest Mittelstand 2026 ist nur eingeschränkt möglich: Dort antwortete ChatGPT ohne Websuche, gemessen wurde Googles KI-Übersicht statt des KI-Modus, und die Modelle waren älter. Die Richtung ist belastbar, den Abstand bitte nur als Größenordnung lesen.',
  ],
  en: [
    'Not a random sample: the results hold for these 100 companies, not for "the IT industry" as a whole.',
    'A snapshot: AI answers vary from day to day and model updates can shift mentions. There is one answer per question and system.',
    'Only competitors from each company\'s pre-defined peer set are counted — the number of answers naming competitors is therefore more likely too low than too high. A mention is not always a recommendation.',
    'The shares of source types are rounded and may differ by a few percentage points.',
    'Gemini answered only 17 times for IT security and cloud; that single value is not reliable and is not shown.',
    'The comparison with the KI-Blindtest Mittelstand 2026 is only partly possible: there, ChatGPT answered without web search, Google AI Overviews were measured instead of AI Mode, and the models were older. The direction is robust; read the gap as an order of magnitude only.',
    'The study measures the German-speaking market in German. AI systems work the same way elsewhere, but we have not measured other markets — so we do not claim them.',
  ],
};

const pct = (v: number, lang: StudieLang, d = 1) =>
  lang === 'de' ? `${v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d })} %` : `${v.toFixed(d)}%`;
const num = (v: number, lang: StudieLang) => v.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB');

export interface Kernaussage { id: string; text: string; basis: string }

export function techKernaussagen(lang: StudieLang): Kernaussage[] {
  const p = (v: number, d = 1) => pct(v, lang, d);
  const n = (v: number) => num(v, lang);
  const [sw, sec, sys] = SEGMENTE;
  if (lang === 'de') return [
    { id: 'befund-1', text: `In ${p(100 - T.nennung)} der ${n(T.antworten)} ausgewerteten KI-Antworten wird die gefragte IT- oder Softwarefirma nicht genannt; genannt wird sie in ${p(T.nennung)} (${n(T.genannt)} Antworten).`, basis: `${n(T.antworten)} Antworten` },
    { id: 'befund-2', text: `Softwarehersteller werden in ${p(sw.quote)} der Antworten genannt, Anbieter für IT-Sicherheit und Cloud in ${p(sec.quote)}, Systemhäuser und IT-Dienstleister in ${p(sys.quote)}.`, basis: `${n(T.antworten)} Antworten` },
    { id: 'befund-3', text: `${T.nieGenanntN} der ${T.firmen} Firmen werden in keiner einzigen Antwort genannt — bei den Systemhäusern und IT-Dienstleistern ${sys.nie} von ${sys.firmen}.`, basis: `${T.firmen} Firmen` },
    { id: 'befund-4', text: `In ${p(T.wettbewerberStatt)} der Antworten (${n(T.wettbewerberStattN)}) fehlt die gefragte Firma, und die KI nennt stattdessen namentlich mindestens einen Wettbewerber.`, basis: `${n(T.antworten)} Antworten` },
    { id: 'befund-5', text: `${T.mittelstaendler} % der genannten Wettbewerber sind Mittelständler, keine Konzerne (bei Fragen nach Systemhäusern und IT-Dienstleistern ${sys.mittelstaendler} %).`, basis: `${n(T.wettbewerberNennungen)} Wettbewerber-Nennungen` },
    { id: 'befund-6', text: `Nur in ${p(T.websiteQuelle)} der Antworten (${n(T.websiteQuelleN)}) dient die Website der gefragten Firma als Quelle; ${T.websiteNieN} der ${T.firmen} Firmen werden nie mit ihrer eigenen Website zitiert.`, basis: `${n(T.antworten)} Antworten` },
    { id: 'befund-7', text: `Rund 70 % aller Quellenangaben führen zu Websites von Anbietern, rund 13 % zu Vergleichsportalen und Verzeichnissen.`, basis: `${n(T.quellenangaben)} Quellenangaben` },
    { id: 'befund-8', text: `Kein KI-System ist die Ausnahme: Die Nennungsquote liegt je System zwischen 18 % und 23 % der Antworten.`, basis: `${n(T.antworten)} Antworten` },
  ];
  return [
    { id: 'befund-1', text: `In ${p(100 - T.nennung)} of the ${n(T.antworten)} AI answers evaluated, the IT or software company asked about is not named; it is named in ${p(T.nennung)} (${n(T.genannt)} answers).`, basis: `${n(T.antworten)} answers` },
    { id: 'befund-2', text: `Software vendors are named in ${p(sw.quote)} of answers, IT security and cloud providers in ${p(sec.quote)}, system integrators and IT service providers in ${p(sys.quote)}.`, basis: `${n(T.antworten)} answers` },
    { id: 'befund-3', text: `${T.nieGenanntN} of the ${T.firmen} companies are not named in a single answer — among system integrators and IT service providers, ${sys.nie} of ${sys.firmen}.`, basis: `${T.firmen} companies` },
    { id: 'befund-4', text: `In ${p(T.wettbewerberStatt)} of answers (${n(T.wettbewerberStattN)}) the company is missing and the AI names at least one competitor instead.`, basis: `${n(T.antworten)} answers` },
    { id: 'befund-5', text: `${T.mittelstaendler}% of the competitors named are mid-sized firms, not corporations (for questions about system integrators and IT service providers, ${sys.mittelstaendler}%).`, basis: `${n(T.wettbewerberNennungen)} competitor mentions` },
    { id: 'befund-6', text: `Only in ${p(T.websiteQuelle)} of answers (${n(T.websiteQuelleN)}) is the company's own website used as a source; ${T.websiteNieN} of the ${T.firmen} companies are never cited with their own website.`, basis: `${n(T.antworten)} answers` },
    { id: 'befund-7', text: `Around 70% of all source citations lead to vendor websites, around 13% to comparison portals and directories.`, basis: `${n(T.quellenangaben)} source citations` },
    { id: 'befund-8', text: `No AI system is the exception: the mention rate per system lies between 18% and 23% of answers.`, basis: `${n(T.antworten)} answers` },
  ];
}

export function techKurzbeleg(lang: StudieLang): string {
  return lang === 'de'
    ? `Quelle: CodaAI, ${TECH_TITLE.de} (n = ${T.firmen} Firmen, ${num(T.antworten, 'de')} KI-Antworten, ${TECH_DATENSTAND.de}), ${SITE_URL}${TECH_PATH.de}`
    : `Source: CodaAI, ${TECH_TITLE.en} (n = ${T.firmen} companies, ${num(T.antworten, 'en')} AI answers, ${TECH_DATENSTAND.en}), ${SITE_URL}${TECH_PATH.en}`;
}

export interface Zitierformat { id: string; label: string; text: string }

export function techZitierformate(lang: StudieLang): Zitierformat[] {
  const url = `${SITE_URL}${TECH_PATH[lang]}`;
  const t = TECH_TITLE[lang];
  const sub = TECH_SUBTITLE[lang];
  if (lang === 'de') return [
    { id: 'apa', label: 'APA (7. Auflage)', text: `Parrizas, O. (2026). ${t}: ${sub} (Version ${TECH_VERSION}). CodaAI. ${url}` },
    { id: 'din', label: 'Deutsche Zitierweise', text: `Parrizas, Oliver (2026): ${t}. ${sub}. Version ${TECH_VERSION}, Datenstand ${TECH_DATENSTAND.de}. Gütersloh: CodaAI (AMP Beratung). Online unter: ${url}` },
    { id: 'kurz', label: 'Kurzbeleg für Artikel und Folien', text: techKurzbeleg('de') },
    { id: 'bibtex', label: 'BibTeX', text: `@techreport{parrizas2026kiblindtestb2btech,\n  author      = {Parrizas, Oliver},\n  title       = {${t}: ${sub}},\n  institution = {CodaAI (AMP Beratung)},\n  address     = {Gütersloh},\n  year        = {2026},\n  month       = nov,\n  note        = {Version ${TECH_VERSION}, Datenstand ${TECH_DATENSTAND.de}},\n  url         = {${url}}\n}` },
  ];
  return [
    { id: 'apa', label: 'APA (7th edition)', text: `Parrizas, O. (2026). ${t} [KI-Blindtest B2B-Tech 2026]: ${sub} (Version ${TECH_VERSION}). CodaAI. ${url}` },
    { id: 'harvard', label: 'Harvard', text: `Parrizas, O. (2026) ${t}: ${sub}. Version ${TECH_VERSION}, data as of ${TECH_DATENSTAND.en}. Gütersloh: CodaAI (AMP Beratung). Available at: ${url}` },
    { id: 'kurz', label: 'Short credit for articles and slides', text: techKurzbeleg('en') },
    { id: 'bibtex', label: 'BibTeX', text: `@techreport{parrizas2026aiblindtestb2btech,\n  author      = {Parrizas, Oliver},\n  title       = {${t}: ${sub}},\n  institution = {CodaAI (AMP Beratung)},\n  address     = {G{\\"u}tersloh},\n  year        = {2026},\n  month       = nov,\n  note        = {Version ${TECH_VERSION}, data as of ${TECH_DATENSTAND.en}},\n  url         = {${url}}\n}` },
  ];
}

export function techKennzahlenCsv(lang: StudieLang): string {
  const de = lang === 'de';
  const rows: [string, string, number, string][] = [];
  const add = (k: string, dDe: string, dEn: string, v: number, uDe: string, uEn: string) => rows.push([k, de ? dDe : dEn, v, de ? uDe : uEn]);
  add('firmen', 'Untersuchte Firmen', 'Companies examined', T.firmen, 'Anzahl', 'count');
  add('fragen', 'Käuferfragen', 'Buyer questions', T.fragen, 'Anzahl', 'count');
  add('antworten', 'Auswertbare KI-Antworten (5 Systeme mit Websuche)', 'Evaluable AI answers (5 systems with web search)', T.antworten, 'Anzahl', 'count');
  add('antworten_mit_nennung', 'Antworten mit Nennung der gefragten Firma', 'Answers naming the company', T.genannt, 'Anzahl', 'count');
  add('anteil_nennung', 'Anteil der Antworten mit Nennung', 'Share of answers with a mention', T.nennung, '% der Antworten', '% of answers');
  for (const s of SEGMENTE) {
    add(`anteil_nennung_${s.key}`, `Anteil der Antworten mit Nennung — ${s.de}`, `Share of answers with a mention — ${s.en}`, s.quote, '% der Antworten', '% of answers');
    add(`firmen_nie_genannt_${s.key}`, `Firmen ohne jede Nennung — ${s.de} (von ${s.firmen})`, `Companies never named — ${s.en} (of ${s.firmen})`, s.nie, 'Anzahl', 'count');
  }
  add('firmen_nie_genannt', 'Firmen ohne jede Nennung (von 100)', 'Companies never named (of 100)', T.nieGenanntN, 'Anzahl', 'count');
  add('anteil_wettbewerber_statt', 'Anteil der Antworten: Firma fehlt, Wettbewerber genannt', 'Share of answers: company missing, competitor named', T.wettbewerberStatt, '% der Antworten', '% of answers');
  add('anteil_mittelstaendler', 'Anteil Mittelständler unter den genannten Wettbewerbern', 'Share of mid-sized firms among competitors named', T.mittelstaendler, '% der Wettbewerber-Nennungen', '% of competitor mentions');
  add('anteil_website_quelle', 'Anteil der Antworten mit eigener Website als Quelle', 'Share of answers citing the company website', T.websiteQuelle, '% der Antworten', '% of answers');
  add('firmen_website_nie_quelle', 'Firmen, deren Website nie als Quelle dient (von 100)', 'Companies whose website is never cited (of 100)', T.websiteNieN, 'Anzahl', 'count');
  add('durchschnittliche_position', 'Durchschnittliche Position, wenn genannt', 'Average position when named', T.avgPosition, 'Position', 'position');
  add('anteil_platz_1', 'Anteil der Nennungen auf Platz 1', 'Share of mentions in first place', T.platz1, '% der Nennungen', '% of mentions');
  for (const q of QUELLEN) add(`quellen_${q.en.toLowerCase().replace(/[^a-z]+/g, '_').replace(/_$/, '')}`, `Quellenart: ${q.de}`, `Source type: ${q.en}`, q.anteil, '% der Quellenangaben (gerundet)', '% of source citations (rounded)');
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const head = de
    ? `# ${TECH_TITLE.de} — Kennzahlen (aggregiert). Version ${TECH_VERSION}, Datenstand ${TECH_DATENSTAND.de}. ${techKurzbeleg('de')}`
    : `# ${TECH_TITLE.en} — key figures (aggregated). Version ${TECH_VERSION}, data as of ${TECH_DATENSTAND.en}. ${techKurzbeleg('en')}`;
  const cols = de ? 'kennzahl,beschreibung,wert,einheit' : 'metric,description,value,unit';
  return [head, cols, ...rows.map(([k, d, v, u]) => `${k},${esc(d)},${v},${esc(u)}`)].join('\n') + '\n';
}

export function techSchemas(lang: StudieLang, description: string) {
  const url = `${SITE_URL}${TECH_PATH[lang]}`;
  const datasetId = lang === 'de' ? TECH_IDS.dataset : `${url}#dataset`;
  const author = { '@type': 'Person', '@id': AUTOR.id, name: AUTOR.name, url: AUTOR.url[lang], sameAs: AUTOR.sameAs };
  const report = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    '@id': lang === 'de' ? TECH_IDS.report : `${url}#report`,
    name: `${TECH_TITLE[lang]} — ${TECH_SUBTITLE[lang]}`,
    alternateName: lang === 'de' ? ['Die KI schreibt die Shortlist', TECH_TITLE.en] : [TECH_TITLE.de, 'AI writes the shortlist'],
    headline: TECH_TITLE[lang],
    url,
    mainEntityOfPage: url,
    datePublished: TECH_PUBLISHED.toISOString(),
    dateModified: TECH_UPDATED.toISOString(),
    inLanguage: lang,
    version: TECH_VERSION,
    author,
    publisher: { '@id': `${SITE_URL}/#organization` },
    copyrightHolder: { '@id': `${SITE_URL}/#organization` },
    copyrightYear: 2026,
    description,
    abstract: techKernaussagen(lang).slice(0, 4).map((k) => k.text).join(' '),
    isBasedOn: { '@id': datasetId },
    encoding: { '@type': 'MediaObject', contentUrl: `${SITE_URL}${TECH_MD[lang]}`, encodingFormat: 'text/markdown' },
    about: [
      { '@type': 'Thing', name: 'Generative Engine Optimization (GEO)' },
      { '@type': 'Thing', name: lang === 'de' ? 'KI-Sichtbarkeit' : 'AI visibility' },
      { '@type': 'Thing', name: lang === 'de' ? 'IT- und Softwarebranche' : 'IT and software industry' },
    ],
    usageInfo: `${url}#zitieren`,
  };
  const dataset = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': datasetId,
    name: lang === 'de' ? `${TECH_TITLE.de} — aggregierte Kennzahlen` : `${TECH_TITLE.en} — aggregated key figures`,
    description: lang === 'de'
      ? `${T.firmen} Softwarehersteller, Systemhäuser, IT-Dienstleister und Anbieter für IT-Sicherheit und Cloud × 8 Käuferfragen, gestellt an ChatGPT, Claude, Gemini, Perplexity und Googles KI-Modus mit Websuche (${num(T.antworten, 'de')} auswertbare Antworten). Erhoben am ${TECH_DATENSTAND.de}. Aggregierte Kennzahlen öffentlich als CSV; Einzeldaten unternehmensbezogen und nicht öffentlich.`
      : `${T.firmen} software vendors, system integrators, IT service providers and IT security and cloud providers × 8 buyer questions, asked in ChatGPT, Claude, Gemini, Perplexity and Google AI Mode with web search (${num(T.antworten, 'en')} evaluable answers). Collected ${TECH_DATENSTAND.en}. Aggregated key figures public as CSV; company-level data is not public.`,
    url,
    creator: author,
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: TECH_PUBLISHED.toISOString(),
    dateModified: TECH_UPDATED.toISOString(),
    version: TECH_VERSION,
    inLanguage: lang,
    temporalCoverage: '2026-11-05/2026-11-06',
    spatialCoverage: { '@type': 'Place', name: lang === 'de' ? 'Deutschsprachiger Raum (DACH)' : 'German-speaking region (DACH)' },
    isAccessibleForFree: true,
    keywords: lang === 'de'
      ? ['KI-Sichtbarkeit', 'GEO', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Google KI-Modus', 'Software', 'Systemhaus', 'IT-Dienstleister', 'Käuferfragen']
      : ['AI visibility', 'GEO', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Google AI Mode', 'software', 'system integrator', 'IT services', 'buyer questions'],
    measurementTechnique: lang === 'de'
      ? 'Je Firma 8 Käuferfragen ohne Firmennamen (Marktübersicht, Anwendungsfall, Wettbewerbsvergleich), gestellt an fünf KI-Systeme mit Websuche; erfasst: Nennung, Position, genannte Wettbewerber aus dem Vergleichsfeld, Quellen, Zitierung der eigenen Website.'
      : '8 buyer questions per company without the company name (market overview, use case, competitor comparison), asked in five AI systems with web search; recorded: mention, position, competitors from the peer set, sources, citation of the company website.',
    variableMeasured: lang === 'de'
      ? ['Nennung der Firma', 'Position der Nennung', 'Genannte Wettbewerber', 'Quellenangaben', 'Zitierung der eigenen Website']
      : ['Mention of the company', 'Position of the mention', 'Competitors named', 'Source citations', 'Citation of the company website'],
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}${TECH_CSV[lang]}`, name: lang === 'de' ? 'Kennzahlen (CSV)' : 'Key figures (CSV)' },
    ],
    usageInfo: `${url}#zitieren`,
  };
  return [JSON.stringify(report), JSON.stringify(dataset)];
}

export function techMarkdown(lang: StudieLang): string {
  const de = lang === 'de';
  const out: string[] = [];
  out.push(de ? `**Autor:** ${AUTOR.name} ([Autorenseite](${AUTOR.url.de})) · **Herausgeber:** CodaAI (AMP Beratung, Gütersloh) · **Version:** ${TECH_VERSION} · **Datenstand:** ${TECH_DATENSTAND.de}`
    : `**Author:** ${AUTOR.name} ([author page](${AUTOR.url.en})) · **Publisher:** CodaAI (AMP Beratung, Gütersloh) · **Version:** ${TECH_VERSION} · **Data as of:** ${TECH_DATENSTAND.en}`, '');
  out.push(de ? '## Kernaussagen' : '## Key findings', '');
  techKernaussagen(lang).forEach((k, i) => out.push(`${i + 1}. ${k.text}`));
  out.push('', `_${techKurzbeleg(lang)}_`, '');
  out.push(de ? '## Nennung je Segment' : '## Mentions by segment', '');
  out.push(de ? '| Segment | Firmen | Antworten | Nennungsquote | nie genannt |' : '| Segment | Companies | Answers | Mention rate | never named |', '|---|---|---|---|---|');
  for (const s of SEGMENTE) out.push(`| ${de ? s.de : s.en} | ${s.firmen} | ${num(s.antworten, lang)} | ${pct(s.quote, lang)} | ${s.nie} ${de ? 'von' : 'of'} ${s.firmen} |`);
  out.push('', de ? '## Quellen der KI' : '## Sources the AI relies on', '');
  for (const q of QUELLEN) out.push(`- ${de ? q.de : q.en}: ${de ? 'rund' : 'around'} ${pct(q.anteil, lang, 0)}`);
  out.push('', de ? '## Methodik' : '## Methodology', '');
  for (const m of TECH_METHODIK[lang]) out.push(`- **${m.t}:** ${m.d}`);
  out.push('', de ? '## Limitationen' : '## Limitations', '');
  for (const l of TECH_LIMITATIONEN[lang]) out.push(`- ${l}`);
  out.push('', de ? '## Zitieren' : '## How to cite', '');
  out.push(de
    ? 'Die aggregierten Kennzahlen dürfen mit Quellenangabe frei zitiert werden. Bitte die Bezugsgröße mitnennen (Anteil der Antworten oder Anzahl der Firmen) und den Hinweis, dass es sich um keine Zufallsstichprobe handelt.'
    : 'The aggregated figures may be quoted freely with attribution. Please state the base (share of answers or number of companies) and note that this is not a random sample.', '');
  for (const z of techZitierformate(lang)) out.push(`**${z.label}**`, '', z.id === 'bibtex' ? '```bibtex\n' + z.text + '\n```' : z.text, '');
  out.push(de ? `Kennzahlen als CSV: ${SITE_URL}${TECH_CSV.de}` : `Key figures as CSV: ${SITE_URL}${TECH_CSV.en}`);
  return out.join('\n').trim() + '\n';
}
