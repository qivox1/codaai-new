/**
 * Autorenprofil Oliver Parrizas — die einzige Quelle für Autorenangaben im
 * Wissens-Cluster (Glossar, Leitfaden /wissen/geo-optimierung/, Blog).
 * ---------------------------------------------------------------------------
 * Beschluss 18.09.2026 (Oli): Oliver Parrizas wird als Autor des
 * Wissens-Clusters genannt; Anja Miebach bleibt Gründerin, Inhaberin und
 * Herausgeberin (Organization.founder, publisher = Organization).
 * Umgesetzt 22.09.2026 (Maßnahme 2 aus der GEO-Maßnahmenliste).
 *
 * Eine Person = eine @id. Dieselbe @id steht auf der Autorenseite
 * (/autor/oliver-parrizas/, /en/author/oliver-parrizas/), in jedem
 * Article-/BlogPosting-Schema, auf der Faktenseite und im Webinar-Schema.
 * sameAs: nur LinkedIn (Stand 22.09.2026, weitere Profile auf Zuruf ergänzen).
 */

export type AutorLang = 'de' | 'en';

export const AUTOR_PUBLISHED = new Date('2026-09-22T12:00:00+02:00');
export const AUTOR_UPDATED = new Date('2026-09-22T12:00:00+02:00');

const SITE_URL = 'https://www.codaai.ai';

export const AUTOR_PATH: Record<AutorLang, string> = {
  de: '/autor/oliver-parrizas/',
  en: '/en/author/oliver-parrizas/',
};

export const AUTOR = {
  id: `${SITE_URL}/autor/oliver-parrizas/#person`,
  name: 'Oliver Parrizas',
  givenName: 'Oliver',
  familyName: 'Parrizas',
  linkedin: 'https://www.linkedin.com/in/oliver-parrizas/',
  sameAs: ['https://www.linkedin.com/in/oliver-parrizas/'],
  image: '/images/speaker-oliver-parrizas.webp',
  imageSmall: '/images/team/oliver-parrizas-80.webp',
  image96: '/images/team/oliver-parrizas-96.webp',
  jobTitle: {
    de: 'Digital- & Sichtbarkeits-Analyst, CodaAI',
    en: 'Digital & Visibility Analyst, CodaAI',
  } as Record<AutorLang, string>,
  /** Rolle ohne Firmenzusatz — für Schema jobTitle neben worksFor */
  role: {
    de: 'Digital- & Sichtbarkeits-Analyst',
    en: 'Digital & Visibility Analyst',
  } as Record<AutorLang, string>,
  url: {
    de: `${SITE_URL}${AUTOR_PATH.de}`,
    en: `${SITE_URL}${AUTOR_PATH.en}`,
  } as Record<AutorLang, string>,
  knowsAbout: [
    'Generative Engine Optimization (GEO)',
    'Answer Engine Optimization (AEO)',
    'Suchmaschinenoptimierung (SEO)',
    'KI-Sichtbarkeit',
    'Corporate Websites für den B2B-Mittelstand',
  ],
};

/** Person-Knoten für Article.author — vollständig, weil Google/Validatoren
 *  am Article einen auflösbaren Autor mit url erwarten. */
export function autorSchemaRef(lang: AutorLang) {
  return {
    '@type': 'Person',
    '@id': AUTOR.id,
    name: AUTOR.name,
    jobTitle: AUTOR.role[lang],
    url: AUTOR.url[lang],
    image: `${SITE_URL}${AUTOR.image}`,
    sameAs: AUTOR.sameAs,
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
}

interface AutorPage {
  path: string;
  mdPath: string;
  metaTitle: string;
  metaDescription: string;
  home: string;
  homeAria: string;
  crumb: string;
  kicker: string;
  lead: string;
  stand: string;
  factsTitle: string;
  rows: { k: string; v: string }[];
  sections: { id: string; h2: string; paras: string[]; list?: string[] }[];
  worksTitle: string;
  works: { label: string; href: string; note: string }[];
  linkedinLabel: string;
}

export const AUTOR_PAGE: Record<AutorLang, AutorPage> = {
  de: {
    path: AUTOR_PATH.de,
    mdPath: '/autor/oliver-parrizas.md',
    metaTitle: 'Oliver Parrizas – Autor und Sichtbarkeits-Analyst | CodaAI',
    metaDescription: 'Oliver Parrizas ist Digital- & Sichtbarkeits-Analyst bei CodaAI und Autor des GEO-Glossars, des GEO-Leitfadens und des Blogs. Über 25 Jahre Erfahrung mit SEO, AEO und GEO.',
    home: 'Startseite',
    homeAria: 'Zur Startseite',
    crumb: 'Oliver Parrizas',
    kicker: 'Autor',
    lead: 'Oliver Parrizas ist Digital- & Sichtbarkeits-Analyst bei CodaAI und Autor der Wissensinhalte auf codaai.ai. Er beschäftigt sich seit 2001 beruflich mit digitaler Sichtbarkeit – von den ersten Suchmaschinen-Rankings über SEO und AEO bis zur Sichtbarkeit in KI-Antworten (GEO).',
    stand: 'Stand:',
    factsTitle: 'Auf einen Blick',
    rows: [
      { k: 'Name', v: 'Oliver Parrizas' },
      { k: 'Rolle', v: 'Digital- & Sichtbarkeits-Analyst bei <a href="/fakten/">CodaAI</a>' },
      { k: 'Im Online-Marketing seit', v: '2001 (über 25 Jahre)' },
      { k: 'Schwerpunkte', v: 'Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), SEO, Corporate Websites für den B2B-Mittelstand' },
      { k: 'Autor von', v: '<a href="/wissen/geo-glossar/">GEO-Glossar</a> · <a href="/wissen/geo-optimierung/">GEO-Leitfaden</a> · <a href="/blog/">Blog</a>' },
      { k: 'Verantwortet', v: 'Die Sichtbarkeits-Audits und die Auswertung der Studie <a href="/studie/">KI-Blindtest Mittelstand 2026</a>' },
      { k: 'Profil', v: '<a href="https://www.linkedin.com/in/oliver-parrizas/" rel="me noopener" target="_blank">LinkedIn</a>' },
    ],
    sections: [
      {
        id: 'wer',
        h2: 'Wer ist Oliver Parrizas?',
        paras: [
          'Oliver Parrizas arbeitet seit 2001 im professionellen Online-Marketing und hat alle Phasen der Suche miterlebt: die ersten Suchmaschinen-Rankings, den Aufstieg von Google, SEO als Disziplin, Answer Engines und jetzt die Antworten von ChatGPT, Perplexity, Gemini und der Google KI-Übersicht.',
          'In den vergangenen rund zwanzig Jahren hat er Corporate Websites und SEO für mittelständische Unternehmen umgesetzt, darunter viele Hidden Champions aus Industrie und Technik: Unternehmen, die erklärungsbedürftige Produkte entwickeln und weltweit vertreiben, in ihrer Nische führend sind und außerhalb der eigenen Branche kaum bekannt.',
        ],
      },
      {
        id: 'codaai',
        h2: 'Was macht Oliver Parrizas bei CodaAI?',
        paras: [
          'Bei CodaAI führt Oliver Parrizas die Sichtbarkeits-Audits durch: Er prüft, ob und wie KI-Systeme ein Unternehmen auf typische Einkäuferfragen nennen, und leitet daraus die Maßnahmen ab. Er hat die Studie <a href="/studie/">KI-Blindtest Mittelstand 2026</a> ausgewertet (449 Unternehmen, 3.592 Einkäuferfragen, 7.184 KI-Antworten) und führt im <a href="/webinar/">Webinar</a> die Live-Audits durch.',
          'Herausgeberin der Inhalte auf codaai.ai ist Anja Miebach, Gründerin und Inhaberin der AMP Beratung (<a href="/co-create/">Co-Create</a>). Alle Stammdaten zu CodaAI stehen auf der <a href="/fakten/">Faktenseite</a>.',
        ],
      },
      {
        id: 'arbeitsweise',
        h2: 'Wie entstehen seine Texte?',
        paras: [
          'Die Wissensinhalte auf codaai.ai stützen sich auf eigene Messungen aus den Audits und der Studie sowie auf öffentlich zugängliche Studien, Dokumentationen der Suchmaschinen- und KI-Anbieter und Fachquellen. Jede Seite nennt ihre Quellen und das Datum der letzten Prüfung.',
        ],
        list: [
          'Eigene Daten zuerst: Befunde aus Audits und dem KI-Blindtest.',
          'Aussagen mit Zahlen tragen eine Quelle.',
          'Keine Platzierungsversprechen – niemand kennt die Formel der KI-Systeme.',
          'Seiten werden überarbeitet, wenn sich Messungen oder Quellen ändern; das Datum steht sichtbar auf der Seite.',
        ],
      },
    ],
    worksTitle: 'Veröffentlichungen auf codaai.ai',
    works: [
      { label: 'GEO-Glossar', href: '/wissen/geo-glossar/', note: 'Begriffe rund um Generative Engine Optimization, jeweils mit Definition und Beispiel' },
      { label: 'GEO-Optimierung: der Leitfaden', href: '/wissen/geo-optimierung/', note: 'Wie Unternehmen in KI-Antworten sichtbar werden' },
      { label: 'Studie KI-Blindtest Mittelstand 2026', href: '/studie/', note: 'Auswertung: 449 Unternehmen aus 258 Branchen' },
      { label: 'Blog', href: '/blog/', note: 'Beiträge zu KI-Sichtbarkeit und B2B-Content' },
    ],
    linkedinLabel: 'Oliver Parrizas auf LinkedIn',
  },
  en: {
    path: AUTOR_PATH.en,
    mdPath: '/en/author/oliver-parrizas.md',
    metaTitle: 'Oliver Parrizas – Author and Visibility Analyst | CodaAI',
    metaDescription: 'Oliver Parrizas is CodaAI’s digital & visibility analyst and the author of the GEO glossary, the GEO guide and the blog. More than 25 years of experience with SEO, AEO and GEO.',
    home: 'Home',
    homeAria: 'Go to home page',
    crumb: 'Oliver Parrizas',
    kicker: 'Author',
    lead: 'Oliver Parrizas is CodaAI’s digital & visibility analyst and the author of the knowledge content on codaai.ai. He has worked professionally on digital visibility since 2001 – from the first search engine rankings through SEO and AEO to visibility in AI answers (GEO).',
    stand: 'Last reviewed:',
    factsTitle: 'At a glance',
    rows: [
      { k: 'Name', v: 'Oliver Parrizas' },
      { k: 'Role', v: 'Digital & visibility analyst at <a href="/en/facts/">CodaAI</a>' },
      { k: 'In online marketing since', v: '2001 (more than 25 years)' },
      { k: 'Focus', v: 'Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), SEO, corporate websites for B2B mid-sized companies' },
      { k: 'Author of', v: '<a href="/en/knowledge/geo-glossary/">GEO glossary</a> · <a href="/en/knowledge/geo-optimization/">GEO guide</a> · <a href="/en/blog/">Blog</a>' },
      { k: 'Responsible for', v: 'The visibility audits and the analysis of the study <a href="/en/study/">AI Blind Test 2026</a>' },
      { k: 'Profile', v: '<a href="https://www.linkedin.com/in/oliver-parrizas/" rel="me noopener" target="_blank">LinkedIn</a>' },
    ],
    sections: [
      {
        id: 'who',
        h2: 'Who is Oliver Parrizas?',
        paras: [
          'Oliver Parrizas has worked in professional online marketing since 2001 and has seen every phase of search: the first search engine rankings, the rise of Google, SEO as a discipline, answer engines and now the answers of ChatGPT, Perplexity, Gemini and Google’s AI Overviews.',
          'Over the past twenty years or so he has delivered corporate websites and SEO for mid-sized companies, many of them hidden champions in industry and engineering: companies that develop technically complex products and sell them worldwide, lead their niche and are barely known outside their own industry.',
        ],
      },
      {
        id: 'codaai',
        h2: 'What does Oliver Parrizas do at CodaAI?',
        paras: [
          'At CodaAI, Oliver Parrizas conducts the visibility audits: he checks whether and how AI systems name a company in response to typical buyer questions and derives the measures from that. He analysed the study <a href="/en/study/">AI Blind Test 2026</a> (449 companies, 3,592 buyer questions, 7,184 AI answers) and runs the live audits in the <a href="/en/webinar/">webinar</a>.',
          'The publisher of the content on codaai.ai is Anja Miebach, founder and owner of AMP Beratung (<a href="/en/co-create/">Co-Create</a>). All core facts about CodaAI are on the <a href="/en/facts/">facts page</a>.',
        ],
      },
      {
        id: 'method',
        h2: 'How are his texts written?',
        paras: [
          'The knowledge content on codaai.ai is based on our own measurements from audits and the study, and on publicly available studies, documentation from search engine and AI providers, and specialist sources. Every page names its sources and the date of its last review.',
        ],
        list: [
          'Own data first: findings from audits and the AI Blind Test.',
          'Statements with figures carry a source.',
          'No ranking promises – nobody knows the formula of AI systems.',
          'Pages are revised when measurements or sources change; the date is shown on the page.',
        ],
      },
    ],
    worksTitle: 'Publications on codaai.ai',
    works: [
      { label: 'GEO glossary', href: '/en/knowledge/geo-glossary/', note: 'Terms around Generative Engine Optimization, each with definition and example' },
      { label: 'GEO optimization: the guide', href: '/en/knowledge/geo-optimization/', note: 'How companies become visible in AI answers' },
      { label: 'Study: AI Blind Test 2026', href: '/en/study/', note: 'Analysis of 449 companies from 258 industries' },
      { label: 'Blog', href: '/en/blog/', note: 'Articles on AI visibility and B2B content' },
    ],
    linkedinLabel: 'Oliver Parrizas on LinkedIn',
  },
};

const stripHtml = (s: string) => s.replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g, (_, h, t) => `[${t}](${h.startsWith('/') ? SITE_URL + h : h})`).replace(/<[^>]+>/g, '');

export function autorMarkdown(lang: AutorLang): string {
  const p = AUTOR_PAGE[lang];
  const out: string[] = [];
  out.push(`## ${p.factsTitle}`, '');
  for (const r of p.rows) out.push(`- **${r.k}:** ${stripHtml(r.v)}`);
  for (const s of p.sections) {
    out.push('', `## ${s.h2}`, '');
    for (const para of s.paras) out.push(stripHtml(para), '');
    if (s.list) for (const li of s.list) out.push(`- ${li}`);
  }
  out.push('', `## ${p.worksTitle}`, '');
  for (const w of p.works) out.push(`- [${w.label}](${SITE_URL}${w.href}): ${w.note}`);
  return out.join('\n').trim() + '\n';
}
