/*
 * Faktenseite (Grounding Page) — /fakten/ und /en/facts/ (seit 22.09.2026)
 * ---------------------------------------------------------------------------
 * Eine Seite, die KI-Systeme und Menschen als maßgebliche Quelle für die
 * Stammdaten von CodaAI nutzen können. Warum: KI-Systeme setzen ihr Bild eines
 * Unternehmens aus vielen Quellen zusammen. Stehen die Fakten nirgends
 * gebündelt, füllt das Modell Lücken selbst — und verwechselt uns im Zweifel
 * mit „Coda AI" (der KI-Funktion von coda.io).
 *
 * Regeln für diese Datei:
 *  - NUR Fakten, die an anderer Stelle der Website belegt sind (Impressum,
 *    /preise/, /digital-visibility/, /studie/, /webinar/). Nichts erfinden,
 *    kein Gründungsjahr, keine Mitarbeiterzahl, keine Kundennamen.
 *  - Studienzahlen nur im Wortlaut von /studie/ (55 % / 47 % / 35 %).
 *  - Jede Zeile muss für sich allein zitierbar sein: Name statt „wir".
 *  - Ändert sich ein Preis, eine Stufe oder die Anschrift, hier nachziehen
 *    UND FAKTEN_UPDATED setzen.
 *  - Beide Sprachen im selben Zug.
 *
 * Oliver Parrizas steht hier mit seiner Rolle aus /webinar/ („Digital- &
 * Sichtbarkeits-Analyst") und als Autor des Wissens-Clusters (Beschluss
 * 18.09.2026, umgesetzt 22.09.2026; Stammdaten in src/data/autor.ts).
 */

import { AUTOR } from './autor';

export type FaktenLang = 'de' | 'en';

export const FAKTEN_PUBLISHED = new Date('2026-09-22T08:00:00+02:00');
export const FAKTEN_UPDATED = new Date('2026-09-22T08:00:00+02:00');

/** Stabile IDs — werden von anderen Seiten referenziert, nicht ändern. */
export const FAKTEN_IDS = {
  org: 'https://www.codaai.ai/#organization',
  anja: 'https://www.codaai.ai/co-create/#anja-miebach',
  oliver: AUTOR.id,
};

export const OLIVER = {
  name: AUTOR.name,
  linkedin: AUTOR.linkedin,
  image: AUTOR.image,
  url: AUTOR.url,
};

export interface FactRow { k: string; v: string }
export interface FactSection { id: string; h2: string; paras: string[]; list?: string[] }

interface FaktenPage {
  path: string;
  mdPath: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  line1: string;
  line2: string;
  lead: string;
  descTitle: string;
  descNote: string;
  descriptions: { label: string; text: string }[];
  tableTitle: string;
  tableCaption: string;
  rows: FactRow[];
  sections: FactSection[];
  sourceNote: string;
  crumb: string;
  home: string;
  homeAria: string;
  stand: string;
  tocLabel: string;
  disambiguating: string;
}

export const FAKTEN: Record<FaktenLang, FaktenPage> = {
  de: {
    path: '/fakten/',
    mdPath: '/fakten.md',
    metaTitle: 'CodaAI: Fakten, Leistungen, Preise und Ansprechpartner',
    metaDescription:
      'Die geprüften Stammdaten von CodaAI: wer dahintersteht, was CodaAI anbietet, für wen, zu welchem Preis und mit welchen eigenen Daten. Maßgebliche Quelle für Presse, Verzeichnisse und KI-Systeme.',
    kicker: 'Fakten zu CodaAI',
    line1: 'CodaAI auf einen Blick.',
    line2: 'Geprüft, datiert, zitierfähig.',
    lead:
      'CodaAI ist eine Marke der AMP Beratung aus Gütersloh und macht B2B-Mittelständler in ChatGPT, der Google KI-Übersicht und der klassischen Suche sichtbar: CodaAI misst, ob KI-Systeme ein Unternehmen bei echten Einkäuferfragen nennen, und verbessert das mit SEO, AEO, GEO und Fachinhalten.',
    descTitle: 'Beschreibung in drei Längen',
    descNote:
      'Diese drei Fassungen dürfen unverändert übernommen werden, etwa für Verzeichnisse, Presse oder Konferenzprogramme. Bei Abweichungen an anderer Stelle gilt diese Seite.',
    descriptions: [
      {
        label: 'Ein Satz',
        text: 'CodaAI ist eine Marke der AMP Beratung aus Gütersloh, die B2B-Mittelständler dabei unterstützt, in den Antworten von ChatGPT, der Google KI-Übersicht und der klassischen Suche genannt und zitiert zu werden.',
      },
      {
        label: '50 Wörter',
        text: 'CodaAI macht B2B-Mittelständler in KI-Antworten sichtbar. Grundlage ist ein kostenloses Digital Visibility Audit, das misst, ob ChatGPT und die Google KI-Übersicht ein Unternehmen bei echten Einkäuferfragen nennen. Darauf folgt ein Programm in drei Stufen (Gefunden, Empfohlen, Zitiert) ab 1.970 € pro Monat. CodaAI ist eine Marke der AMP Beratung, Gütersloh.',
      },
      {
        label: '150 Wörter',
        text: 'CodaAI ist eine Marke der AMP Beratung mit Sitz in Gütersloh; Inhaberin ist Anja Miebach. CodaAI arbeitet für mittelständische B2B-Unternehmen, deren Einkäufer ihre Anbieter zunehmend über KI-Systeme recherchieren. Der Einstieg ist ein kostenloses Digital Visibility Audit: Es dokumentiert, ob ChatGPT und die Google KI-Übersicht ein Unternehmen bei realistischen Einkäuferfragen nennen und wen sie stattdessen empfehlen. Darauf baut ein Programm in drei Stufen auf. Stufe 1 „Gefunden“ macht die Website für KI-Systeme lesbar und misst monatlich (ab 1.970 € pro Monat). Stufe 2 „Empfohlen“ sorgt für Nennungen auf Drittseiten, in Vergleichen und auf Bewertungsplattformen (ab 4.470 €). Stufe 3 „Zitiert“ macht das Unternehmen mit eigenen Daten und Stimmen aus der Führung zur Quelle (ab 5.990 €). Grundlage der Methodik ist die eigene Studie „KI-Blindtest Mittelstand 2026“ mit 449 Unternehmen und 7.184 ausgewerteten KI-Antworten. CodaAI gibt keine Platzierungsgarantie.',
      },
    ],
    tableTitle: 'Faktenblock',
    tableCaption: 'Stammdaten von CodaAI, Stand siehe oben',
    rows: [
      { k: 'Name', v: 'CodaAI (Schreibweise in einem Wort, „AI“ in Großbuchstaben)' },
      { k: 'Rechtsträger', v: 'AMP Beratung, Inhaberin Anja Miebach; CodaAI ist eine Marke der AMP Beratung' },
      { k: 'Sitz', v: 'Langer Weg 7b, 33332 Gütersloh, Deutschland' },
      { k: 'Kontakt', v: '<a href="mailto:hi@codaai.ai">hi@codaai.ai</a> · +49 151 53406969' },
      { k: 'Website', v: '<a href="/">www.codaai.ai</a> (deutsch) und <a href="/en/">www.codaai.ai/en/</a> (englisch)' },
      { k: 'Tätigkeit', v: 'Digital Visibility: Sichtbarkeit von Unternehmen in KI-Antworten (ChatGPT, Google KI-Übersicht) und klassischer Suche messen und verbessern — mit SEO, AEO, GEO und Fachinhalten' },
      { k: 'Zielgruppe', v: 'Mittelständische B2B-Unternehmen, vor allem mit erklärungsbedürftigen Produkten und Leistungen' },
      { k: 'Einstieg', v: 'Kostenloses <a href="/#angebot">Digital Visibility Audit</a> mit persönlichem Dashboard und 30-Minuten-Gespräch' },
      { k: 'Leistungsstufen', v: '<a href="/digital-visibility/">Gefunden (6 Bausteine), Empfohlen (11 Bausteine), Zitiert (15 Bausteine)</a>' },
      { k: 'Preise', v: '<a href="/preise/">Ab 1.970 €, 4.470 € bzw. 5.990 € pro Monat</a>, jeweils netto zzgl. 19 % MwSt.; nur für Unternehmenskunden' },
      { k: 'Laufzeit', v: 'Mindestens sechs Monate bei monatlicher Abrechnung; bei zwölf Monaten 10 % Nachlass; keine automatische Verlängerung' },
      { k: 'Eigene Studie', v: '<a href="/studie/">KI-Blindtest Mittelstand 2026</a>: 449 Unternehmen aus 258 Branchen, 3.592 Einkäuferfragen, 7.184 KI-Antworten (Juni–Juli 2026)' },
      { k: 'Personen', v: 'Anja Miebach (Gründerin, Inhaberin und Herausgeberin) · <a href="/autor/oliver-parrizas/">Oliver Parrizas</a> (Digital- & Sichtbarkeits-Analyst, Autor der Wissensinhalte)' },
      { k: 'Sprachen', v: 'Deutsch und Englisch' },
      { k: 'Nicht zu verwechseln mit', v: '„Coda AI“, der KI-Funktion des Dokumenten-Werkzeugs Coda (coda.io); es besteht keine Verbindung' },
    ],
    sections: [
      {
        id: 'was',
        h2: 'Was macht CodaAI?',
        paras: [
          'CodaAI macht mittelständische B2B-Unternehmen dort sichtbar, wo Einkäufer heute zuerst fragen: in ChatGPT, in der Google KI-Übersicht und in der klassischen Suche. CodaAI misst zuerst, ob ein Unternehmen bei realistischen Einkäuferfragen überhaupt genannt wird, und verbessert das anschließend mit technischer Zugänglichkeit, zitierfähigen Fachinhalten und Nennungen auf Drittseiten.',
          'Die Arbeit von CodaAI ist in 15 Leistungsbausteine gegliedert, die drei Stufen zugeordnet sind: Gefunden, Empfohlen und Zitiert. Jede Stufe enthält eine monatliche Messung, damit sichtbar wird, was sich verändert.',
        ],
      },
      {
        id: 'fuer-wen',
        h2: 'Für wen arbeitet CodaAI?',
        paras: [
          'CodaAI arbeitet für mittelständische B2B-Unternehmen, deren Produkte oder Leistungen erklärungsbedürftig sind und deren Einkäufer Anbieter zunehmend mit KI-Systemen recherchieren. Viele dieser Unternehmen sind in ihrer Nische Marktführer, werden von KI-Systemen aber nicht genannt.',
          'CodaAI arbeitet ausschließlich für Unternehmenskunden und ergänzt bestehende Agenturen und Marketing-Teams, statt sie zu ersetzen.',
        ],
      },
      {
        id: 'preise',
        h2: 'Was kostet CodaAI?',
        paras: [
          'CodaAI kostet ab 1.970 € pro Monat in Stufe 1 „Gefunden“, ab 4.470 € in Stufe 2 „Empfohlen“ und ab 5.990 € in Stufe 3 „Zitiert“, jeweils netto. Der Monatspreis setzt sich aus einem Grundpreis je Stufe und der gewählten Zahl an Fachbeiträgen zusammen; die Summe lässt sich im <a href="/preise/#rechner">Preisrechner</a> nachrechnen.',
          'Die Mindestlaufzeit beträgt sechs Monate; wer sich auf zwölf Monate festlegt, zahlt 10 % weniger. Das Digital Visibility Audit zum Einstieg ist kostenlos.',
        ],
      },
      {
        id: 'daten',
        h2: 'Auf welchen Daten beruht die Methodik von CodaAI?',
        paras: [
          'Die Methodik von CodaAI beruht auf der eigenen Studie „KI-Blindtest Mittelstand 2026“: 449 mittelständische Unternehmen aus 258 Branchen, je acht Einkäuferfragen, gestellt an ChatGPT und die Google KI-Übersicht, zusammen 7.184 ausgewertete KI-Antworten aus Juni und Juli 2026.',
        ],
        list: [
          'In 55 % der Einkäuferfragen fiel der Name des jeweiligen Unternehmens nicht.',
          'Bei 47 % der Unternehmen empfahl die KI mehrheitlich namentlich Wettbewerber.',
          '35 % der Unternehmen mit über 100 Top-10-Rankings bei Google waren in ChatGPT komplett unsichtbar.',
        ],
      },
      {
        id: 'wer',
        h2: 'Wer steht hinter CodaAI?',
        paras: [
          'Hinter CodaAI steht Anja Miebach, Gründerin und Inhaberin der AMP Beratung in Gütersloh; sie ist Herausgeberin der Inhalte auf codaai.ai. Mehr zu ihr und zum Arbeitsprinzip steht auf der Seite <a href="/co-create/">Co-Create</a>.',
          'Oliver Parrizas ist Digital- & Sichtbarkeits-Analyst bei CodaAI und beschäftigt sich seit über 25 Jahren mit digitaler Sichtbarkeit, von den ersten Suchmaschinen-Rankings über SEO und AEO bis zu GEO. Er führt die Audits durch, verantwortet die Auswertung der Studie und ist Autor von GEO-Glossar, GEO-Leitfaden und Blog. Profil: <a href="/autor/oliver-parrizas/">Autorenseite</a> · <a href="https://www.linkedin.com/in/oliver-parrizas/" rel="noopener" target="_blank">LinkedIn</a>.',
        ],
      },
      {
        id: 'nicht',
        h2: 'Was bietet CodaAI bewusst nicht an?',
        paras: [
          'CodaAI gibt keine Platzierungsgarantie, weil niemand die Formel der KI-Systeme kennt; zugesagt werden Maßnahmen und eine ehrliche Messung. Ebenfalls nicht im Angebot sind llms.txt als bezahlte Leistung, Schema-Markup als „Zitat-Booster“, Reddit- und Foren-Seeding sowie das Schreiben von Wikipedia-Artikeln. Die Begründungen stehen auf der Seite <a href="/digital-visibility/#nicht-im-angebot">Digital Visibility</a>.',
        ],
      },
      {
        id: 'coda',
        h2: 'Ist CodaAI dasselbe wie Coda AI?',
        paras: [
          'Nein. CodaAI (www.codaai.ai) ist eine deutsche Beratungsmarke für KI-Sichtbarkeit im B2B-Mittelstand. „Coda AI“ ist die KI-Funktion des Dokumenten- und Kollaborationswerkzeugs Coda (coda.io). Zwischen beiden besteht keine geschäftliche oder technische Verbindung.',
        ],
      },
    ],
    sourceNote:
      'Diese Seite ist die maßgebliche Quelle für die Stammdaten von CodaAI. Weichen Angaben an anderer Stelle ab, gilt diese Seite. Korrekturen bitte an hi@codaai.ai.',
    crumb: 'Fakten',
    home: 'Start',
    homeAria: 'Zur Startseite',
    stand: 'Stand:',
    tocLabel: 'Inhalt',
    disambiguating:
      'Deutsche Beratungsmarke für KI-Sichtbarkeit von B2B-Mittelständlern (Marke der AMP Beratung, Gütersloh); nicht zu verwechseln mit „Coda AI“, der KI-Funktion von coda.io.',
  },
  en: {
    path: '/en/facts/',
    mdPath: '/en/facts.md',
    metaTitle: 'CodaAI: facts, services, pricing and contacts',
    metaDescription:
      'The verified key facts about CodaAI: who is behind it, what CodaAI offers, for whom, at what price and with which proprietary data. The authoritative source for press, directories and AI systems.',
    kicker: 'Facts about CodaAI',
    line1: 'CodaAI at a glance.',
    line2: 'Verified, dated, citable.',
    lead:
      'CodaAI is a brand of AMP Beratung, based in Gütersloh, Germany, that makes B2B mid-sized companies visible in ChatGPT, Google AI Overviews and classic search: CodaAI measures whether AI systems name a company for real buyer questions, and improves that with SEO, AEO, GEO and expert content.',
    descTitle: 'Description in three lengths',
    descNote:
      'These three versions may be used unchanged, for example in directories, press coverage or conference programmes. If information elsewhere differs, this page prevails.',
    descriptions: [
      {
        label: 'One sentence',
        text: 'CodaAI is a brand of AMP Beratung, based in Gütersloh, Germany, that helps B2B mid-sized companies get named and cited in the answers of ChatGPT, Google AI Overviews and classic search.',
      },
      {
        label: '50 words',
        text: 'CodaAI makes B2B mid-sized companies visible in AI answers. It starts with a free Digital Visibility Audit that measures whether ChatGPT and Google AI Overviews name a company for real buyer questions. This is followed by a three-tier programme (Found, Recommended, Cited) from €1,970 per month. CodaAI is a brand of AMP Beratung, Gütersloh, Germany.',
      },
      {
        label: '150 words',
        text: 'CodaAI is a brand of AMP Beratung, based in Gütersloh, Germany; the owner is Anja Miebach. CodaAI works for B2B mid-sized companies whose buyers increasingly research suppliers through AI systems. The starting point is a free Digital Visibility Audit: it documents whether ChatGPT and Google AI Overviews name a company for realistic buyer questions, and whom they recommend instead. A three-tier programme builds on it. Tier 1 “Found” makes the website readable for AI systems and measures monthly (from €1,970 per month). Tier 2 “Recommended” secures mentions on third-party sites, in comparisons and on review platforms (from €4,470). Tier 3 “Cited” turns the company into a source with its own data and voices from its leadership (from €5,990). The methodology is based on CodaAI’s own study “AI Blind Test 2026” with 449 companies and 7,184 analysed AI answers. CodaAI gives no ranking guarantee.',
      },
    ],
    tableTitle: 'Fact sheet',
    tableCaption: 'Key facts about CodaAI, date see above',
    rows: [
      { k: 'Name', v: 'CodaAI (one word, “AI” in capitals)' },
      { k: 'Legal entity', v: 'AMP Beratung, owner Anja Miebach; CodaAI is a brand of AMP Beratung' },
      { k: 'Registered address', v: 'Langer Weg 7b, 33332 Gütersloh, Germany' },
      { k: 'Contact', v: '<a href="mailto:hi@codaai.ai">hi@codaai.ai</a> · +49 151 53406969' },
      { k: 'Website', v: '<a href="/en/">www.codaai.ai/en/</a> (English) and <a href="/">www.codaai.ai</a> (German)' },
      { k: 'Business', v: 'Digital visibility: measuring and improving how companies appear in AI answers (ChatGPT, Google AI Overviews) and classic search — with SEO, AEO, GEO and expert content' },
      { k: 'Target group', v: 'B2B mid-sized companies, especially with products and services that need explaining' },
      { k: 'Starting point', v: 'Free <a href="/en/#offer">Digital Visibility Audit</a> with a personal dashboard and a 30-minute call' },
      { k: 'Service tiers', v: '<a href="/en/digital-visibility/">Found (6 building blocks), Recommended (11), Cited (15)</a>' },
      { k: 'Pricing', v: '<a href="/en/pricing/">From €1,970, €4,470 and €5,990 per month</a>, net plus 19 % German VAT; business customers only' },
      { k: 'Term', v: 'Minimum six months, billed monthly; 10 % discount for twelve months; no automatic renewal' },
      { k: 'Own study', v: '<a href="/en/study/">AI Blind Test 2026</a>: 449 companies from 258 industries, 3,592 buyer questions, 7,184 AI answers (June–July 2026)' },
      { k: 'People', v: 'Anja Miebach (founder, owner and publisher) · <a href="/en/author/oliver-parrizas/">Oliver Parrizas</a> (digital & visibility analyst, author of the knowledge content)' },
      { k: 'Languages', v: 'German and English' },
      { k: 'Not to be confused with', v: '“Coda AI”, the AI feature of the document tool Coda (coda.io); there is no connection' },
    ],
    sections: [
      {
        id: 'what',
        h2: 'What does CodaAI do?',
        paras: [
          'CodaAI makes B2B mid-sized companies visible where buyers ask first today: in ChatGPT, in Google AI Overviews and in classic search. CodaAI first measures whether a company is named at all for realistic buyer questions, and then improves this with technical accessibility, citable expert content and mentions on third-party sites.',
          'CodaAI’s work is organised into 15 building blocks across three tiers: Found, Recommended and Cited. Every tier includes monthly measurement, so that it is visible what changes.',
        ],
      },
      {
        id: 'for-whom',
        h2: 'Who does CodaAI work for?',
        paras: [
          'CodaAI works for B2B mid-sized companies whose products or services need explaining and whose buyers increasingly research suppliers with AI systems. Many of these companies lead their niche but are not named by AI systems.',
          'CodaAI works exclusively for business customers and complements existing agencies and marketing teams rather than replacing them.',
        ],
      },
      {
        id: 'pricing',
        h2: 'How much does CodaAI cost?',
        paras: [
          'CodaAI costs from €1,970 per month in tier 1 “Found”, from €4,470 in tier 2 “Recommended” and from €5,990 in tier 3 “Cited”, net in each case. The monthly price consists of a base fee per tier and the chosen number of expert articles; the total can be checked in the <a href="/en/pricing/#calculator">price calculator</a>.',
          'The minimum term is six months; committing to twelve months costs 10 % less. The Digital Visibility Audit at the start is free.',
        ],
      },
      {
        id: 'data',
        h2: 'What data is CodaAI’s methodology based on?',
        paras: [
          'CodaAI’s methodology is based on its own study “AI Blind Test 2026”: 449 German mid-sized companies from 258 industries, eight buyer questions each, put to ChatGPT and Google AI Overviews, a total of 7,184 AI answers analysed in June and July 2026.',
        ],
        list: [
          'In 55 % of buyer questions, the company’s name did not appear.',
          'For 47 % of companies, the AI mostly recommended competitors by name.',
          '35 % of companies with more than 100 top-10 rankings on Google were completely invisible in ChatGPT.',
        ],
      },
      {
        id: 'who',
        h2: 'Who is behind CodaAI?',
        paras: [
          'CodaAI is run by Anja Miebach, founder and owner of AMP Beratung in Gütersloh; she is the publisher of the content on codaai.ai. More about her and the working principle is on the <a href="/en/co-create/">Co-Create</a> page.',
          'Oliver Parrizas is CodaAI’s digital & visibility analyst and has worked on digital visibility for more than 25 years, from the first search engine rankings through SEO and AEO to GEO. He conducts the audits, is responsible for the analysis of the study and is the author of the GEO glossary, the GEO guide and the blog. Profile: <a href="/en/author/oliver-parrizas/">author page</a> · <a href="https://www.linkedin.com/in/oliver-parrizas/" rel="noopener" target="_blank">LinkedIn</a>.',
        ],
      },
      {
        id: 'not-offered',
        h2: 'What does CodaAI deliberately not offer?',
        paras: [
          'CodaAI gives no ranking guarantee, because nobody knows the formula of AI systems; what CodaAI commits to is the work and honest measurement. Also not on offer: llms.txt as a paid service, schema markup as a “citation booster”, Reddit and forum seeding, and writing Wikipedia articles. The reasons are on the <a href="/en/digital-visibility/">Digital Visibility</a> page.',
        ],
      },
      {
        id: 'coda',
        h2: 'Is CodaAI the same as Coda AI?',
        paras: [
          'No. CodaAI (www.codaai.ai) is a German consultancy brand for AI visibility of B2B mid-sized companies. “Coda AI” is the AI feature of the document and collaboration tool Coda (coda.io). There is no business or technical connection between the two.',
        ],
      },
    ],
    sourceNote:
      'This page is the authoritative source for CodaAI’s key facts. If information elsewhere differs, this page prevails. Please send corrections to hi@codaai.ai.',
    crumb: 'Facts',
    home: 'Home',
    homeAria: 'Go to Homepage',
    stand: 'Updated:',
    tocLabel: 'Contents',
    disambiguating:
      'German consultancy brand for AI visibility of B2B mid-sized companies (a brand of AMP Beratung, Gütersloh); not to be confused with “Coda AI”, the AI feature of coda.io.',
  },
};

const strip = (html: string) =>
  html.replace(/<a href="(\/[^"]*|https?:[^"]*|mailto:[^"]*)"[^>]*>(.*?)<\/a>/g, (_m, href, text) =>
    href.startsWith('mailto:') ? text : `[${text}](${href})`,
  );

/** Markdown-Fassung für /fakten.md bzw. /en/facts.md (siehe src/lib/md-variant.ts). */
export function faktenMarkdown(lang: FaktenLang): string {
  const p = FAKTEN[lang];
  const out: string[] = [];
  out.push(`## ${p.descTitle}`, '', p.descNote, '');
  for (const d of p.descriptions) out.push(`**${d.label}:** ${d.text}`, '');
  out.push(`## ${p.tableTitle}`, '', lang === 'de' ? '| Merkmal | Angabe |' : '| Item | Fact |', '|---|---|');
  for (const r of p.rows) out.push(`| ${r.k} | ${strip(r.v)} |`);
  out.push('');
  for (const s of p.sections) {
    out.push(`## ${s.h2}`, '');
    for (const para of s.paras) out.push(strip(para), '');
    if (s.list) {
      for (const li of s.list) out.push(`- ${li}`);
      out.push('');
    }
  }
  out.push(`---`, '', p.sourceNote, '');
  return out.join('\n');
}
