/**
 * Studie „KI-Blindtest Mittelstand 2026" — eine Quelle für Kennzahlen,
 * Kernaussagen und Zitierangaben (seit 22.09.2026, Maßnahme 5 „zitierfähig").
 * ---------------------------------------------------------------------------
 * Wer eine Zahl ändert, ändert sie HIER. Seiten (/studie/, /en/study/),
 * Markdown-Fassungen (/studie.md, /en/study.md), die CSV-Downloads und das
 * Schema lesen alle aus dieser Datei. Bis 22.09.2026 standen die Kennzahlen
 * doppelt in studie.astro und en/study.astro, und an sechs Stellen der Website
 * hieß es fälschlich „bei 47 % der FRAGEN" statt „bei 47 % der UNTERNEHMEN".
 *
 * Datenstand/Version beziehen sich auf die Erhebung (v1.0, Juni/Juli 2026).
 * STUDIE_UPDATED ist das Datum der letzten inhaltlichen Überarbeitung der
 * Seite (steuert Sitemap-lastmod und dateModified über src/lib/lastmod.mjs).
 */
import { AUTOR } from './autor';

export type StudieLang = 'de' | 'en';

const SITE_URL = 'https://www.codaai.ai';

export const STUDIE_PUBLISHED = new Date('2026-07-14T08:00:00+02:00');
export const STUDIE_UPDATED = new Date('2026-09-22T12:00:00+02:00');
export const STUDIE_VERSION = '1.0';

export const STUDIE_PATH: Record<StudieLang, string> = { de: '/studie/', en: '/en/study/' };
export const STUDIE_MD: Record<StudieLang, string> = { de: '/studie.md', en: '/en/study.md' };
export const STUDIE_CSV: Record<StudieLang, string> = { de: '/studie/kennzahlen.csv', en: '/en/study/key-figures.csv' };

export const STUDIE_IDS = {
  report: `${SITE_URL}/studie/#report`,
  dataset: `${SITE_URL}/studie/#dataset`,
};

export const STUDIE_TITLE: Record<StudieLang, string> = {
  de: 'KI-Blindtest Mittelstand 2026',
  en: 'AI Blind Test 2026',
};
export const STUDIE_SUBTITLE: Record<StudieLang, string> = {
  de: 'Auswertung von 7.184 KI-Antworten zu 449 mittelständischen Unternehmen',
  en: 'Analysis of 7,184 AI answers on 449 mid-sized companies in Germany',
};
export const DATENSTAND: Record<StudieLang, string> = { de: 'Juni/Juli 2026', en: 'June/July 2026' };

/** Rohwerte. Prozentwerte mit einer Nachkommastelle, wie ausgewertet. */
export const K = {
  unternehmen: 449,
  branchen: 258,
  fragen: 3592,
  antworten: 7184,
  fragenOhneNennung: 1965,
  ohneNennung: 54.7,        // % aller Fragen ohne Nennung des Unternehmens
  ersetztN: 210,
  ersetzt: 46.8,            // % Firmen: KI empfiehlt Wettbewerber, Firma fehlt mehrheitlich
  seoParadox: 34.9,         // % der SEO-starken Firmen (>100 Top-10) in ChatGPT unsichtbar
  seoStarkN: 361,
  komplettUnsichtbar: 12.9, // % Firmen: 0 von 8 Fragen
  kategorieBlind: 25.6,     // % Firmen: bei Marktfrage zum eigenen Kerngeschäft unsichtbar
  chatgptAvg: 24.9,
  googleAvg: 39.4,
  nieChatgpt: 39.6,
  nieGoogle: 15.1,
  nieZitiert: 39.0,
  platz1: 23.8,
  avgPosition: 1.8,
  verlustMedian: 47000,
};


/** Methodik und Limitationen — von Seiten und Markdown-Fassung gemeinsam genutzt. */
export const METHODIK: Record<StudieLang, { t: string; d: string }[]> = {
  de: [
    {
      t: 'Stichprobe',
      d: `${K.unternehmen} mittelständische Unternehmen aus dem deutschsprachigen Raum, überwiegend B2B (u. a. Maschinenbau, Elektrotechnik, Bauzulieferer, industrielle Dienstleistungen). Auswahl aus der eigenen Audit-Praxis — keine Zufallsstichprobe (siehe Limitationen).`,
    },
    {
      t: 'Fragen-Generierung',
      d: 'Pro Unternehmen 8 qualifizierte deutsche Einkäuferfragen in drei Archetypen: Marktübersicht (2), Anwendungsfall (4), Wettbewerbsvergleich (2). Erstellt auf Basis einer automatisierten Analyse von Website, Branche und Wettbewerbsumfeld, mit deterministischer Qualitätsprüfung. Die Fragensätze werden eingefroren und sind damit für Verlaufsmessungen exakt wiederholbar.',
    },
    {
      t: 'Abfrage',
      d: 'Jede Frage wurde an zwei Oberflächen gestellt: ChatGPT (Modellantwort ohne Live-Websuche — misst das strukturelle „Wissen" des Modells) und Google KI-Übersicht (deutsche Lokalisierung). Erhebungszeitraum: Juni/Juli 2026.',
    },
    {
      t: 'Auswertung',
      d: 'Pro Antwort wurden erfasst: Nennung des Unternehmens (inkl. Marken-Aliase), Position der Nennung, namentlich empfohlene Wettbewerber sowie die Frage, ob die eigene Website als Quelle zitiert wird. Aggregation zu Sichtbarkeits-Kennzahlen je Unternehmen und über den Gesamtdatensatz.',
    },
    {
      t: 'Monetäre Einordnung',
      d: 'Die genannten Opportunitätskosten sind eine konservative Modellrechnung auf Basis organischer Traffic-Werte (Sistrix-Datenbasis) und Discovery-Annahmen — als Größenordnung gedacht, nicht als Prognose. Sie ist durchgängig als Modellrechnung gekennzeichnet.',
    },
  ],
  en: [
    {
      t: 'Sample',
      d: `${K.unternehmen} mid-sized companies from the German-speaking market, predominantly B2B (among others mechanical engineering, electrical engineering, construction suppliers, industrial services). Selected from our own audit practice — not a random sample (see limitations).`,
    },
    {
      t: 'Question generation',
      d: 'Per company, 8 qualified German buyer questions in three archetypes: market overview (2), use case (4), competitor comparison (2). Created on the basis of an automated analysis of the website, the industry and the competitive landscape, with a deterministic quality check. The question sets are frozen and can therefore be repeated exactly for tracking over time.',
    },
    {
      t: 'Query',
      d: 'Every question was put to two interfaces: ChatGPT (model answer without live web search — this measures the structural "knowledge" of the model) and Google AI Overviews (German localisation). Collection period: June/July 2026.',
    },
    {
      t: 'Evaluation',
      d: 'For each answer we recorded: mention of the company (including brand aliases), position of the mention, competitors recommended by name, and whether the company website is cited as a source. Aggregated into visibility metrics per company and across the full dataset.',
    },
    {
      t: 'Monetary context',
      d: 'The opportunity costs quoted are a conservative model calculation based on organic traffic values (SISTRIX data) and discovery assumptions — intended as an order of magnitude, not as a forecast. It is labelled as a model calculation throughout.',
    },
  ],
};

export const LIMITATIONEN: Record<StudieLang, string[]> = {
  de: [
    'Keine Zufallsstichprobe: Die Unternehmen stammen aus unserer Audit-Praxis und sind B2B-lastig. Aussagen gelten für die untersuchten 449 Unternehmen — nicht für „den deutschen Mittelstand" insgesamt.',
    'Momentaufnahme: KI-Antworten sind volatil; Modell-Updates können Nennungen verschieben. Datenstand ist ausgewiesen; die eingefrorenen Fragensätze machen Verlaufsmessungen möglich.',
    'ChatGPT wurde bewusst ohne Live-Websuche abgefragt, um das strukturelle Modell-Wissen zu messen. Mit aktivierter Websuche können einzelne Antworten abweichen.',
    'Die monetäre Einordnung ist eine Modellrechnung mit konservativen Annahmen, keine Umsatzprognose.',
    'Zwei kleinere, unabhängige Erhebungen Dritter (24 bzw. 150 Unternehmen, Frühjahr 2026) kommen zu ähnlichen Größenordnungen — das stützt die Richtung der Befunde, ersetzt aber keine Repräsentativität.',
  ],
  en: [
    'Not a random sample: the companies come from our audit practice and are B2B-heavy. The statements hold for the 449 companies analysed — not for mid-sized companies in Germany as a whole.',
    'A snapshot: AI answers are volatile; model updates can shift mentions. The data date is stated; the frozen question sets make tracking over time possible.',
    'ChatGPT was deliberately queried without live web search in order to measure the structural knowledge of the model. With web search enabled, individual answers can differ.',
    'The monetary context is a model calculation with conservative assumptions, not a revenue forecast.',
    'Two smaller, independent third-party surveys (24 and 150 companies, spring 2026) arrive at similar orders of magnitude — that supports the direction of the findings, but does not replace representativeness.',
    'The study measures the German market in German. AI systems work the same way elsewhere, but we have not measured other markets — so we do not claim them.',
  ],
};

const pct = (v: number, lang: StudieLang) =>
  lang === 'de' ? `${v.toLocaleString('de-DE', { minimumFractionDigits: 1 })} %` : `${v.toFixed(1)}%`;
const num = (v: number, lang: StudieLang) => v.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB');

export interface Kernaussage { id: string; text: string; basis: string }

/** Kernaussagen: jede für sich zitierbar, mit Zahl, Bezugsgröße und Anker. */
export function kernaussagen(lang: StudieLang): Kernaussage[] {
  const p = (v: number) => pct(v, lang);
  const n = (v: number) => num(v, lang);
  if (lang === 'de') return [
    { id: 'befund-1', text: `In ${p(K.ohneNennung)} der ${n(K.fragen)} untersuchten Einkäuferfragen (${n(K.fragenOhneNennung)} Fragen) nennen weder ChatGPT noch die Google KI-Übersicht das jeweils untersuchte Unternehmen.`, basis: `${n(K.fragen)} Fragen` },
    { id: 'befund-2', text: `Bei ${p(K.ersetzt)} der ${n(K.unternehmen)} untersuchten Unternehmen (${n(K.ersetztN)}) empfehlen die KI-Systeme namentlich Wettbewerber, während das Unternehmen selbst bei der Mehrheit seiner Einkäuferfragen fehlt.`, basis: `${n(K.unternehmen)} Unternehmen` },
    { id: 'befund-3', text: `${p(K.komplettUnsichtbar)} der untersuchten Unternehmen werden bei keiner ihrer acht Einkäuferfragen genannt.`, basis: `${n(K.unternehmen)} Unternehmen` },
    { id: 'befund-4', text: `${p(K.seoParadox)} der ${n(K.seoStarkN)} Unternehmen mit mehr als 100 Top-10-Rankings bei Google sind in ChatGPT komplett unsichtbar.`, basis: `${n(K.seoStarkN)} Unternehmen` },
    { id: 'befund-5', text: `${p(K.kategorieBlind)} der Unternehmen werden selbst bei der Marktübersichts-Frage zu ihrer eigenen Kategorie nicht genannt.`, basis: `${n(K.unternehmen)} Unternehmen` },
    { id: 'befund-6', text: `Die durchschnittliche Sichtbarkeit liegt in ChatGPT bei ${p(K.chatgptAvg)} und in der Google KI-Übersicht bei ${p(K.googleAvg)}; ${p(K.nieChatgpt)} der Unternehmen werden von ChatGPT nie genannt, ${p(K.nieGoogle)} von der Google KI-Übersicht nie.`, basis: `${n(K.unternehmen)} Unternehmen` },
    { id: 'befund-7', text: `Bei ${p(K.nieZitiert)} der Unternehmen wird die eigene Website in keiner KI-Antwort als Quelle zitiert.`, basis: `${n(K.unternehmen)} Unternehmen` },
    { id: 'befund-8', text: `Wo Unternehmen genannt werden, stehen sie im Schnitt an Position ${K.avgPosition.toLocaleString('de-DE')}; in ${p(K.platz1)} aller Fragen erreicht das Unternehmen Platz 1.`, basis: `${n(K.fragen)} Fragen` },
  ];
  return [
    { id: 'befund-1', text: `In ${p(K.ohneNennung)} of the ${n(K.fragen)} buyer questions examined (${n(K.fragenOhneNennung)} questions), neither ChatGPT nor Google AI Overviews names the company concerned.`, basis: `${n(K.fragen)} questions` },
    { id: 'befund-2', text: `For ${p(K.ersetzt)} of the ${n(K.unternehmen)} companies examined (${n(K.ersetztN)}), the AI systems recommend competitors by name while the company itself is missing from the majority of its buyer questions.`, basis: `${n(K.unternehmen)} companies` },
    { id: 'befund-3', text: `${p(K.komplettUnsichtbar)} of the companies examined are not named in any of their eight buyer questions.`, basis: `${n(K.unternehmen)} companies` },
    { id: 'befund-4', text: `${p(K.seoParadox)} of the ${n(K.seoStarkN)} companies with more than 100 top-10 rankings on Google are completely invisible in ChatGPT.`, basis: `${n(K.seoStarkN)} companies` },
    { id: 'befund-5', text: `${p(K.kategorieBlind)} of the companies are not named even in the market-overview question about their own category.`, basis: `${n(K.unternehmen)} companies` },
    { id: 'befund-6', text: `Average visibility is ${p(K.chatgptAvg)} in ChatGPT and ${p(K.googleAvg)} in Google AI Overviews; ${p(K.nieChatgpt)} of companies are never named by ChatGPT, ${p(K.nieGoogle)} never by Google AI Overviews.`, basis: `${n(K.unternehmen)} companies` },
    { id: 'befund-7', text: `For ${p(K.nieZitiert)} of the companies, their own website is not cited as a source in any AI answer.`, basis: `${n(K.unternehmen)} companies` },
    { id: 'befund-8', text: `Where companies are named, their average position is ${K.avgPosition.toFixed(1)}; the company takes first place in ${p(K.platz1)} of all questions.`, basis: `${n(K.fragen)} questions` },
  ];
}

/** Kurzbeleg, der an jede Kernaussage angehängt wird. */
export function kurzbeleg(lang: StudieLang): string {
  return lang === 'de'
    ? `Quelle: CodaAI, ${STUDIE_TITLE.de} (n = ${num(K.unternehmen, 'de')} Unternehmen, ${DATENSTAND.de}), ${SITE_URL}${STUDIE_PATH.de}`
    : `Source: CodaAI, ${STUDIE_TITLE.en} (n = ${num(K.unternehmen, 'en')} companies, ${DATENSTAND.en}), ${SITE_URL}${STUDIE_PATH.en}`;
}

export interface Zitierformat { id: string; label: string; text: string }

export function zitierformate(lang: StudieLang): Zitierformat[] {
  const url = `${SITE_URL}${STUDIE_PATH[lang]}`;
  const t = STUDIE_TITLE[lang];
  const sub = STUDIE_SUBTITLE[lang];
  if (lang === 'de') return [
    { id: 'apa', label: 'APA (7. Auflage)', text: `Parrizas, O. (2026). ${t}: ${sub} (Version ${STUDIE_VERSION}). CodaAI. ${url}` },
    { id: 'din', label: 'Deutsche Zitierweise', text: `Parrizas, Oliver (2026): ${t}. ${sub}. Version ${STUDIE_VERSION}, Datenstand ${DATENSTAND.de}. Gütersloh: CodaAI (AMP Beratung). Online unter: ${url}` },
    { id: 'kurz', label: 'Kurzbeleg für Artikel und Folien', text: kurzbeleg('de') },
    { id: 'bibtex', label: 'BibTeX', text: `@techreport{parrizas2026kiblindtest,\n  author      = {Parrizas, Oliver},\n  title       = {${t}: ${sub}},\n  institution = {CodaAI (AMP Beratung)},\n  address     = {Gütersloh},\n  year        = {2026},\n  month       = jul,\n  note        = {Version ${STUDIE_VERSION}, Datenstand ${DATENSTAND.de}},\n  url         = {${url}}\n}` },
  ];
  return [
    { id: 'apa', label: 'APA (7th edition)', text: `Parrizas, O. (2026). ${t} [KI-Blindtest Mittelstand 2026]: ${sub} (Version ${STUDIE_VERSION}). CodaAI. ${url}` },
    { id: 'harvard', label: 'Harvard', text: `Parrizas, O. (2026) ${t}: ${sub}. Version ${STUDIE_VERSION}, data as of ${DATENSTAND.en}. Gütersloh: CodaAI (AMP Beratung). Available at: ${url}` },
    { id: 'kurz', label: 'Short credit for articles and slides', text: kurzbeleg('en') },
    { id: 'bibtex', label: 'BibTeX', text: `@techreport{parrizas2026aiblindtest,\n  author      = {Parrizas, Oliver},\n  title       = {${t}: ${sub}},\n  institution = {CodaAI (AMP Beratung)},\n  address     = {G{\\"u}tersloh},\n  year        = {2026},\n  month       = jul,\n  note        = {Version ${STUDIE_VERSION}, data as of ${DATENSTAND.en}},\n  url         = {${url}}\n}` },
  ];
}

/** Kennzahlen als CSV (aggregiert, keine Einzeldaten). */
export function kennzahlenCsv(lang: StudieLang): string {
  const de = lang === 'de';
  const rows: [string, string, number, string][] = de ? [
    ['unternehmen', 'Untersuchte Unternehmen', K.unternehmen, 'Anzahl'],
    ['branchen', 'Branchen', K.branchen, 'Anzahl'],
    ['fragen', 'Einkäuferfragen', K.fragen, 'Anzahl'],
    ['antworten', 'Dokumentierte KI-Antworten (ChatGPT + Google KI-Übersicht)', K.antworten, 'Anzahl'],
    ['fragen_ohne_nennung', 'Fragen ohne Nennung des Unternehmens', K.fragenOhneNennung, 'Anzahl'],
    ['anteil_fragen_ohne_nennung', 'Anteil der Fragen ohne Nennung', K.ohneNennung, '% der Fragen'],
    ['unternehmen_durch_wettbewerber_ersetzt', 'Unternehmen, bei denen namentlich Wettbewerber empfohlen werden', K.ersetztN, 'Anzahl'],
    ['anteil_durch_wettbewerber_ersetzt', 'Anteil Unternehmen, bei denen namentlich Wettbewerber empfohlen werden', K.ersetzt, '% der Unternehmen'],
    ['anteil_komplett_unsichtbar', 'Anteil Unternehmen ohne Nennung in allen 8 Fragen', K.komplettUnsichtbar, '% der Unternehmen'],
    ['seo_starke_unternehmen', 'Unternehmen mit mehr als 100 Top-10-Rankings bei Google', K.seoStarkN, 'Anzahl'],
    ['anteil_seo_stark_chatgpt_unsichtbar', 'Davon in ChatGPT komplett unsichtbar', K.seoParadox, '% der SEO-starken Unternehmen'],
    ['anteil_kategorie_blind', 'Anteil Unternehmen, bei der Marktübersichts-Frage zur eigenen Kategorie nicht genannt', K.kategorieBlind, '% der Unternehmen'],
    ['sichtbarkeit_chatgpt', 'Durchschnittliche Sichtbarkeit in ChatGPT', K.chatgptAvg, '%'],
    ['sichtbarkeit_google_ki', 'Durchschnittliche Sichtbarkeit in der Google KI-Übersicht', K.googleAvg, '%'],
    ['anteil_nie_chatgpt', 'Anteil Unternehmen, von ChatGPT nie genannt', K.nieChatgpt, '% der Unternehmen'],
    ['anteil_nie_google_ki', 'Anteil Unternehmen, von der Google KI-Übersicht nie genannt', K.nieGoogle, '% der Unternehmen'],
    ['anteil_website_nie_zitiert', 'Anteil Unternehmen, deren Website in keiner Antwort als Quelle zitiert wird', K.nieZitiert, '% der Unternehmen'],
    ['anteil_platz_1', 'Anteil der Fragen, in denen das Unternehmen Platz 1 erreicht', K.platz1, '% der Fragen'],
    ['durchschnittliche_position', 'Durchschnittliche Position, wenn genannt', K.avgPosition, 'Position'],
    ['opportunitaet_median_eur', 'Mediane Opportunität pro Unternehmen und Jahr (Modellrechnung)', K.verlustMedian, 'EUR'],
  ] : [
    ['companies', 'Companies examined', K.unternehmen, 'count'],
    ['industries', 'Industries', K.branchen, 'count'],
    ['questions', 'Buyer questions', K.fragen, 'count'],
    ['answers', 'Documented AI answers (ChatGPT + Google AI Overviews)', K.antworten, 'count'],
    ['questions_without_mention', 'Questions without a mention of the company', K.fragenOhneNennung, 'count'],
    ['share_questions_without_mention', 'Share of questions without a mention', K.ohneNennung, '% of questions'],
    ['companies_replaced_by_competitors', 'Companies for which competitors are recommended by name', K.ersetztN, 'count'],
    ['share_replaced_by_competitors', 'Share of companies for which competitors are recommended by name', K.ersetzt, '% of companies'],
    ['share_completely_invisible', 'Share of companies not named in any of the 8 questions', K.komplettUnsichtbar, '% of companies'],
    ['seo_strong_companies', 'Companies with more than 100 top-10 rankings on Google', K.seoStarkN, 'count'],
    ['share_seo_strong_invisible_chatgpt', 'Of those, completely invisible in ChatGPT', K.seoParadox, '% of SEO-strong companies'],
    ['share_category_blind', 'Share of companies not named in the market-overview question about their own category', K.kategorieBlind, '% of companies'],
    ['visibility_chatgpt', 'Average visibility in ChatGPT', K.chatgptAvg, '%'],
    ['visibility_google_ai', 'Average visibility in Google AI Overviews', K.googleAvg, '%'],
    ['share_never_chatgpt', 'Share of companies never named by ChatGPT', K.nieChatgpt, '% of companies'],
    ['share_never_google_ai', 'Share of companies never named by Google AI Overviews', K.nieGoogle, '% of companies'],
    ['share_website_never_cited', 'Share of companies whose website is not cited as a source in any answer', K.nieZitiert, '% of companies'],
    ['share_first_place', 'Share of questions in which the company takes first place', K.platz1, '% of questions'],
    ['average_position', 'Average position when named', K.avgPosition, 'position'],
    ['opportunity_median_eur', 'Median opportunity per company and year (model calculation)', K.verlustMedian, 'EUR'],
  ];
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const head = de
    ? `# ${STUDIE_TITLE.de} — Kennzahlen (aggregiert). Version ${STUDIE_VERSION}, Datenstand ${DATENSTAND.de}. ${kurzbeleg('de')}`
    : `# ${STUDIE_TITLE.en} — key figures (aggregated). Version ${STUDIE_VERSION}, data as of ${DATENSTAND.en}. ${kurzbeleg('en')}`;
  const cols = de ? 'kennzahl,beschreibung,wert,einheit' : 'metric,description,value,unit';
  return [head, cols, ...rows.map(([k, d, v, u]) => `${k},${esc(d)},${v},${esc(u)}`)].join('\n') + '\n';
}

/** Schema: Report + Dataset, beide mit @id, Autor und Zitierangabe. */
export function studieSchemas(lang: StudieLang, description: string) {
  const url = `${SITE_URL}${STUDIE_PATH[lang]}`;
  const datasetId = lang === 'de' ? STUDIE_IDS.dataset : `${url}#dataset`;
  const author = {
    '@type': 'Person',
    '@id': AUTOR.id,
    name: AUTOR.name,
    url: AUTOR.url[lang],
    sameAs: AUTOR.sameAs,
  };
  const report = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    '@id': lang === 'de' ? STUDIE_IDS.report : `${url}#report`,
    name: `${STUDIE_TITLE[lang]} — ${STUDIE_SUBTITLE[lang]}`,
    alternateName: lang === 'de' ? ['Empfohlen oder unsichtbar?', STUDIE_TITLE.en] : [STUDIE_TITLE.de, 'Recommended or invisible?'],
    headline: STUDIE_TITLE[lang],
    url,
    mainEntityOfPage: url,
    datePublished: STUDIE_PUBLISHED.toISOString(),
    dateModified: STUDIE_UPDATED.toISOString(),
    inLanguage: lang,
    version: STUDIE_VERSION,
    author,
    publisher: { '@id': `${SITE_URL}/#organization` },
    copyrightHolder: { '@id': `${SITE_URL}/#organization` },
    copyrightYear: 2026,
    description,
    abstract: kernaussagen(lang).slice(0, 4).map((k) => k.text).join(' '),
    isBasedOn: { '@id': datasetId },
    encoding: { '@type': 'MediaObject', contentUrl: `${SITE_URL}${STUDIE_MD[lang]}`, encodingFormat: 'text/markdown' },
    about: [
      { '@type': 'Thing', name: 'Generative Engine Optimization (GEO)' },
      { '@type': 'Thing', name: lang === 'de' ? 'KI-Sichtbarkeit' : 'AI visibility' },
      { '@type': 'Thing', name: lang === 'de' ? 'Mittelstand' : 'Mid-sized companies (Mittelstand)' },
    ],
    usageInfo: `${url}#zitieren`,
  };
  const dataset = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': datasetId,
    name: lang === 'de' ? `${STUDIE_TITLE.de} — aggregierte Kennzahlen` : `${STUDIE_TITLE.en} — aggregated key figures`,
    description: lang === 'de'
      ? `${K.unternehmen} mittelständische Unternehmen aus ${K.branchen} Branchen × 8 qualifizierte Einkäuferfragen, abgefragt in ChatGPT und der Google KI-Übersicht (${num(K.antworten, 'de')} dokumentierte Antworten). Erhoben ${DATENSTAND.de}. Aggregierte Kennzahlen öffentlich als CSV; Einzeldaten unternehmensbezogen und nicht öffentlich.`
      : `${K.unternehmen} mid-sized companies from ${K.branchen} industries × 8 qualified buyer questions, asked in ChatGPT and Google AI Overviews (${num(K.antworten, 'en')} documented answers). Collected ${DATENSTAND.en}. Aggregated key figures public as CSV; company-level data is not public.`,
    url,
    creator: author,
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: STUDIE_PUBLISHED.toISOString(),
    dateModified: STUDIE_UPDATED.toISOString(),
    version: STUDIE_VERSION,
    inLanguage: lang,
    temporalCoverage: '2026-06/2026-07',
    spatialCoverage: { '@type': 'Place', name: lang === 'de' ? 'Deutschsprachiger Raum (DACH)' : 'German-speaking region (DACH)' },
    isAccessibleForFree: true,
    keywords: lang === 'de'
      ? ['KI-Sichtbarkeit', 'GEO', 'ChatGPT', 'Google KI-Übersicht', 'Mittelstand', 'B2B', 'Einkäuferfragen']
      : ['AI visibility', 'GEO', 'ChatGPT', 'Google AI Overviews', 'Mittelstand', 'B2B', 'buyer questions'],
    measurementTechnique: lang === 'de'
      ? 'Je Unternehmen 8 Einkäuferfragen (Marktübersicht, Anwendungsfall, Wettbewerbsvergleich), gestellt an ChatGPT (ohne Live-Websuche) und die Google KI-Übersicht (deutsche Lokalisierung); erfasst: Nennung, Position, genannte Wettbewerber, Zitierung der eigenen Website.'
      : '8 buyer questions per company (market overview, use case, competitor comparison), asked in ChatGPT (without live web search) and Google AI Overviews (German localisation); recorded: mention, position, competitors named, citation of the company website.',
    variableMeasured: lang === 'de'
      ? ['Nennung des Unternehmens', 'Position der Nennung', 'Namentlich empfohlene Wettbewerber', 'Zitierung der eigenen Website als Quelle']
      : ['Mention of the company', 'Position of the mention', 'Competitors recommended by name', 'Citation of the company website as a source'],
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}${STUDIE_CSV[lang]}`, name: lang === 'de' ? 'Kennzahlen (CSV)' : 'Key figures (CSV)' },
    ],
    usageInfo: `${url}#zitieren`,
  };
  return [JSON.stringify(report), JSON.stringify(dataset)];
}

/** Markdown-Fassung (für /studie.md, /en/study.md): Kernaussagen, Methodik-Kurzfassung, Zitierformate. */
export function studieMarkdown(lang: StudieLang, methodik: { t: string; d: string }[], limitationen: string[]): string {
  const de = lang === 'de';
  const out: string[] = [];
  out.push(de ? `**Autor:** ${AUTOR.name} ([Autorenseite](${AUTOR.url.de})) · **Herausgeber:** CodaAI (AMP Beratung, Gütersloh) · **Version:** ${STUDIE_VERSION} · **Datenstand:** ${DATENSTAND.de}`
    : `**Author:** ${AUTOR.name} ([author page](${AUTOR.url.en})) · **Publisher:** CodaAI (AMP Beratung, Gütersloh) · **Version:** ${STUDIE_VERSION} · **Data as of:** ${DATENSTAND.en}`, '');
  out.push(de ? '## Kernaussagen' : '## Key findings', '');
  kernaussagen(lang).forEach((k, i) => out.push(`${i + 1}. ${k.text}`));
  out.push('', `_${kurzbeleg(lang)}_`, '');
  out.push(de ? '## Methodik' : '## Methodology', '');
  for (const m of methodik) out.push(`- **${m.t}:** ${m.d}`);
  out.push('', de ? '## Limitationen' : '## Limitations', '');
  for (const l of limitationen) out.push(`- ${l}`);
  out.push('', de ? '## Zitieren' : '## How to cite', '');
  out.push(de
    ? 'Die aggregierten Kennzahlen dürfen mit Quellenangabe frei zitiert werden. Bitte die Bezugsgröße mitnennen (Anteil der Fragen oder Anteil der Unternehmen) und den Hinweis, dass es sich um keine Zufallsstichprobe handelt.'
    : 'The aggregated figures may be quoted freely with attribution. Please state the base (share of questions or share of companies) and note that this is not a random sample.', '');
  for (const z of zitierformate(lang)) {
    out.push(`**${z.label}**`, '', z.id === 'bibtex' ? '```bibtex\n' + z.text + '\n```' : z.text, '');
  }
  out.push(de ? `Kennzahlen als CSV: ${SITE_URL}${STUDIE_CSV.de}` : `Key figures as CSV: ${SITE_URL}${STUDIE_CSV.en}`);
  return out.join('\n').trim() + '\n';
}
