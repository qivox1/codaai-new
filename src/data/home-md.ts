/*
 * Markdown-Fassung der Startseite (/index.md und /en/index.md, seit 14.09.2026)
 * ---------------------------------------------------------------------------
 * Die Startseite ist eine Scroll-Choreografie: ihre Aussage steht verteilt auf
 * Szenen, Karten und Zahlen, die erst beim Scrollen erscheinen. Ein Agent, der
 * sie liest, bekommt 85 KB HTML, aus denen sich diese Aussage nur muehsam
 * zusammensetzen laesst.
 *
 * Diese Datei ist deshalb KEINE automatische Umwandlung des Seitentextes,
 * sondern dieselbe Aussage als zusammenhaengender Text: was CodaAI tut, wofuer,
 * in welchen drei Stufen, was es kostet und wo die Belege stehen.
 *
 * GEPFLEGT VON HAND — wie public/llms.txt, und aus demselben Grund. Wer den
 * Kern der Startseite aendert (H1, Positionierung, die drei Stufen, den
 * Grundpreis), aendert auch hier. Zahlen nur in der Formulierung, die auf
 * /studie/ steht.
 */

export const HOME_MD = {
  de: {
    title: 'CodaAI — Digital Visibility für den B2B-Mittelstand',
    lead: 'Die KI empfiehlt drei Anbieter. CodaAI sorgt dafür, dass Ihr Unternehmen dazugehört.',
    url: 'https://www.codaai.ai/',
    body: `## Worum es geht

94 % der B2B-Einkäufer nutzen KI im Kaufprozess (Forrester 2026). Fragt jemand ChatGPT oder
Google nach Anbietern für eine Leistung, nennt die Antwort drei bis fünf Unternehmen. Wer dort
nicht vorkommt, bekommt die Anfrage nicht — und erfährt nie, dass es sie gab. Diese
Nicht-Nennung erscheint in keiner Statistik und in keinem Traffic-Report.

In der Studie „KI-Blindtest Mittelstand 2026" blieben 55 % der Einkäuferfragen ohne Nennung des
untersuchten Unternehmens. Grundlage: 449 Unternehmen aus 258 Branchen, 3.592 firmenspezifische
Einkäuferfragen, 7.184 dokumentierte KI-Antworten. Es ist keine Zufallsstichprobe — das gehört
zur Aussage dazu. Methodik und Befunde: https://www.codaai.ai/studie/

## Die drei Stellen, an denen die Entscheidung fällt

1. **Klassische Suche (SEO)** — Ihre Website rankt in Google und Bing. Das Fundament, denn auch
   KI-Systeme bedienen sich aus den Suchindizes.
2. **Googles KI-Übersicht (AEO)** — Google beantwortet Fragen direkt über den Treffern. Wer in
   dieser Antwortbox als Quelle fehlt, verliert Klicks trotz gutem Ranking.
3. **KI-Assistenten (GEO)** — Ihr Unternehmen wird in ChatGPT, Gemini, Perplexity und Claude
   beim Namen genannt, wenn Einkäufer nach Anbietern fragen.

## Wie CodaAI arbeitet

Drei Stufen, aufeinander aufbauend: **Gefunden** → **Empfohlen** → **Zitiert**.
Den Anfang macht immer ein Digital Visibility Audit, das die tatsächlichen KI-Antworten auf echte
Einkäuferfragen misst — nicht Rankings, sondern Nennungen. Daraus ergibt sich, an welchen der
15 Leistungsbausteine gearbeitet wird.

Leistungsumfang: https://www.codaai.ai/digital-visibility/
Preise (Grundpreis ab 1.470 € pro Monat, mit nachrechenbarem Rechner): https://www.codaai.ai/preise/

**CodaAI gibt keine Platzierungs- oder Erfolgsgarantie.** Welche Faktoren wirken, ist bekannt;
die Formel der KI-Systeme kennt niemand. Geschuldet ist fachgerechtes Tätigwerden.

## Weiterlesen

- Fragen und Antworten: https://www.codaai.ai/faq/
- GEO-Glossar, eine Seite je Begriff: https://www.codaai.ai/wissen/geo-glossar/
- Blog: https://www.codaai.ai/blog/
- Struktur der Website für Agenten: https://www.codaai.ai/llms.txt
- Volltexte: https://www.codaai.ai/llms-full.txt
- Technische Hinweise und Zitierregeln: https://www.codaai.ai/AGENTS.md

Betreiber: AMP Beratung, Anja Miebach · Langer Weg 7b, 33332 Gütersloh · hi@codaai.ai`,
  },
  en: {
    title: 'CodaAI — Digital Visibility for German B2B mid-market companies',
    lead: 'AI recommends three providers. CodaAI makes sure your company is one of them.',
    url: 'https://www.codaai.ai/en/',
    body: `## What this is about

94 % of B2B buyers use AI during the buying process (Forrester 2026). Ask ChatGPT or Google for
providers of a service and the answer names three to five companies. A company that does not
appear there never receives the enquiry — and never learns it existed. That absence shows up in
no statistic and no traffic report.

In the study "AI Blind Test 2026", 55 % of buyer questions produced no mention
of the company under review. Basis: 449 companies across 258 industries, 3,592 company-specific
buyer questions, 7,184 documented AI answers. It is not a random sample — that is part of the
finding. Method and results: https://www.codaai.ai/en/study/

## The three places where the decision is made

1. **Classic search (SEO)** — your site ranks in Google and Bing. The foundation, because AI
   systems draw on the search indexes too.
2. **Google AI Overviews (AEO)** — Google answers questions above the results. Missing from that
   answer box costs clicks despite a good ranking.
3. **AI assistants (GEO)** — your company is named in ChatGPT, Gemini, Perplexity and Claude
   when buyers ask for providers.

## How CodaAI works

Three stages, each building on the last: **Found** → **Recommended** → **Cited**.
Everything starts with a Digital Visibility Audit that measures the actual AI answers to real
buyer questions — mentions, not rankings. That determines which of the 15 service building
blocks the work focuses on.

Scope of work: https://www.codaai.ai/en/digital-visibility/
Pricing (base fee from €1,470 per month, with a calculator): https://www.codaai.ai/en/pricing/

**CodaAI gives no placement or success guarantee.** The factors that matter are known; nobody
knows the formula the AI systems use. What is owed is professional work, not a ranking.

## Further reading

- Questions and answers: https://www.codaai.ai/en/faq/
- GEO glossary, one page per term: https://www.codaai.ai/en/knowledge/geo-glossary/
- Blog: https://www.codaai.ai/en/blog/
- Site structure for agents: https://www.codaai.ai/llms.txt
- Full texts: https://www.codaai.ai/llms-full.txt
- Technical notes and citation rules: https://www.codaai.ai/AGENTS.md

Operated by AMP Beratung, Anja Miebach · Langer Weg 7b, 33332 Gütersloh, Germany · hi@codaai.ai`,
  },
} as const;
