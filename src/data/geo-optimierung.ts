/*
 * Pillar-Seite „GEO-Optimierung" — Inhalt für /wissen/geo-optimierung/ und
 * /en/knowledge/geo-optimization/ (seit 18.09.2026).
 * ---------------------------------------------------------------------------
 * Warum eine eigene Seite: Das GEO-Wissen lag bis dahin verteilt auf 55
 * Glossarseiten, die Studie und die Blogartikel. Es gab keine einzelne Seite,
 * die die Frage „Was ist GEO und was wirkt nachweislich?" vollständig
 * beantwortet — also auch keine, die ein KI-System dafür zitieren könnte.
 * LLMs nennen je Antwort nur wenige Quellen und bevorzugen die, die die Frage
 * ganz beantwortet, statt zehn Fragmente.
 *
 * Aufbau (bewusst starr, gleiches Extraktionsmuster wie das Glossar):
 *   Kippsatz-H1 → Lead (data-speakable) → „Das Wichtigste in Kürze" (BLUF)
 *   → Sprungmarken → H2 im Frageformat, erster Satz mit dem gefragten Begriff
 *   (Entity Echoing) → Tabellen für Vergleiche → Belegtabelle → FAQ → Audit.
 *
 * Regeln für jede Zahl (STAND.md / Faktencheck 17.09.2026):
 *   - Quelle im selben Satz, Fundstelle im Volltext geprüft (Stand 18.09.2026).
 *   - Eigene Studienzahlen nur im Wortlaut von /studie/.
 *   - Vortragswerte mit Zuschreibung „Chrissy Kunisch, SISTRIX Meetup 09/2026".
 *   - Keine Kostenaussage, kein Erfolgsversprechen, keine Platzierungszusage.
 *
 * Links im HTML-Feld sind wurzel-relativ (/wissen/...). Die Komponente setzt
 * die Base davor, die Markdown-Fassung macht sie absolut (md-variant.ts).
 *
 * GEPFLEGT VON HAND. Wer eine Zahl ändert, ändert die Belegtabelle mit.
 * Beide Sprachen im selben Zug (Regel seit 04.08.2026).
 */

export type GeoLang = 'de' | 'en';

export type Block =
  | { type: 'p'; html: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'quote'; text: string; name: string; role: string; href?: string }
  | { type: 'stats'; items: { value: string; label: string; source: string }[] }
  | { type: 'callout'; title: string; html: string }
  | { type: 'diagram'; id: 'retrieval' | 'formel' };

export interface Section {
  id: string;
  h2: string;
  blocks: Block[];
}

export interface Source {
  name: string;
  what: string;
  sample: string;
  date: string;
  href?: string;
}

export interface GeoPage {
  path: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  line1: string;
  line2: string;
  lead: string;
  brief: { title: string; items: string[] };
  tocLabel: string;
  sections: Section[];
  sourcesTitle: string;
  sourcesIntro: string;
  sourcesHead: string[];
  sources: Source[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: { kicker: string; h2: string; p: string };
  headline: string;
  tags: string[];
}

export const GEO_PUBLISHED = new Date('2026-09-18T08:00:00+02:00');
export const GEO_UPDATED = new Date('2026-09-22T14:00:00+02:00');

const G = '/wissen/geo-glossar';
const GE = '/en/knowledge/geo-glossary';

export const GEO_PAGE: Record<GeoLang, GeoPage> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // DEUTSCH
  // ═══════════════════════════════════════════════════════════════════════════
  de: {
    path: '/wissen/geo-optimierung/',
    metaTitle: 'GEO-Optimierung für B2B: In KI-Antworten zitiert werden | CodaAI',
    metaDescription:
      'GEO-Optimierung für B2B-Unternehmen: Wie ChatGPT, Gemini und die Google KI-Übersicht Quellen auswählen, was nachweislich wirkt, was nicht — mit Zahlen aus 7.184 KI-Antworten zu 449 Mittelständlern.',
    kicker: 'GEO-Optimierung · Leitfaden für B2B-Unternehmen',
    line1: 'Ihre Website rankt bei Google.',
    line2: 'In der KI fehlt sie trotzdem.',
    lead:
      'Generative Engine Optimization (GEO) ist die Arbeit daran, dass KI-Systeme wie ChatGPT, Gemini, Perplexity und die Google KI-Übersicht ein Unternehmen nennen und seine Inhalte als Quelle zitieren. GEO ersetzt SEO nicht, es setzt darauf auf: Ohne Ranking kein Grounding, ohne Grounding keine KI-Sichtbarkeit. Diese Seite erklärt für B2B-Unternehmen, wie eine KI-Antwort entsteht, welche Maßnahmen nachweislich wirken, was nicht wirkt und wie sich Erfolg messen lässt — belegt mit unserer Studie zu 449 mittelständischen Unternehmen.',
    brief: {
      title: 'Das Wichtigste in Kürze',
      items: [
        'GEO-Optimierung macht Inhalte für KI-Antworten zitierfähig. Sie baut auf SEO auf: Eine Seite muss für die Frage und ihre Teilfragen ranken, bevor ein KI-System sie überhaupt als Quelle prüft.',
        'Im B2B-Mittelstand ist die Lücke groß: In 55 % von 3.592 Einkäuferfragen fiel der Firmenname nicht, und 35 % der Unternehmen mit über 100 Top-10-Rankings bei Google waren in ChatGPT komplett unsichtbar (CodaAI-Studie, 449 Unternehmen).',
        'KI-Systeme zitieren Passagen, nicht Seiten. Google gibt je Anfrage rund 2.000 Wörter Grounding-Budget frei, und die erstplatzierte Quelle bekommt davon 28 %, die fünfte 13 % (dejan.ai, 7.060 Anfragen).',
        'Nachweislich wirken Zitate, Statistiken und Quellenangaben im Text: In der Princeton-Studie (KDD 2024) stieg die Sichtbarkeit damit um 28 bis 41 %, für Seiten auf Rang 5 durch Quellenangaben um 115 %.',
        'Markennennungen auf Drittseiten korrelieren stärker mit KI-Sichtbarkeit (0,664) als Backlinks (0,218) — Ahrefs, 75.000 Marken.',
        'Nicht wirken: Keyword-Stuffing, llms.txt, Schema-Markup als Zitiergarantie, Server-Logs als Sichtbarkeitsbeweis und jede Platzierungszusage. Gemessen wird GEO als Wahrscheinlichkeit über viele Durchläufe, nicht als Position.',
      ],
    },
    tocLabel: 'Auf dieser Seite',
    sections: [
      // ── 1 ──────────────────────────────────────────────────────────────────
      {
        id: 'definition',
        h2: 'Was ist GEO-Optimierung?',
        blocks: [
          {
            type: 'p',
            html: `<strong>GEO-Optimierung</strong> (Generative Engine Optimization) ist die systematische Arbeit daran, dass generative KI-Systeme ein Unternehmen in ihren Antworten <a href="${G}/mention/">erwähnen</a>, es empfehlen und seine Inhalte als <a href="${G}/citation/">Quelle zitieren</a>. Gemeint sind ChatGPT, Google Gemini, Perplexity, Microsoft Copilot sowie die Google KI-Übersicht und der AI Mode — also jede Oberfläche, die statt einer Linkliste eine zusammengefasste Antwort liefert.`,
          },
          {
            type: 'p',
            html: `Für dieselbe Disziplin kursieren weitere Namen: AEO (Answer Engine Optimization), LLMO, AIO, GAIO. Sie meinen im Kern dasselbe. Wir verwenden <a href="${G}/geo/">GEO</a>, weil sich der Begriff als Standard durchgesetzt hat. Was GEO <em>nicht</em> ist: ein Ersatz für SEO. Ein KI-System, das das Web durchsucht, greift auf dieselben Suchindizes zu wie Google und Bing — wer dort nicht gefunden wird, kommt auch in der Antwort nicht vor.`,
          },
          {
            type: 'quote',
            text: 'Kein Ranking. Kein Grounding. Keine AI-Sichtbarkeit.',
            name: 'Chrissy Kunisch',
            role: 'Founder & Managing Director, ONE Beyond Search — SISTRIX Meetup, September 2026',
            href: 'https://onebeyondsearch.com/',
          },
        ],
      },
      // ── 2 ──────────────────────────────────────────────────────────────────
      {
        id: 'seo-vs-geo',
        h2: 'Warum reicht SEO allein nicht mehr?',
        blocks: [
          {
            type: 'p',
            html: `SEO allein reicht nicht mehr, weil ein gutes Google-Ranking nicht mehr bedeutet, dass ein potenzieller Kunde die Seite zu sehen bekommt. Wer ChatGPT oder die Google KI-Übersicht nach Anbietern fragt, erhält eine Antwort mit drei bis fünf Namen — und nur diese Unternehmen bekommen die Anfrage. In unserer <a href="/studie/">Studie mit 449 Unternehmen aus 258 Branchen</a> (3.592 Einkäuferfragen, 7.184 dokumentierte KI-Antworten) blieben <strong>55 % der Einkäuferfragen ohne Nennung</strong> des untersuchten Unternehmens, und bei <strong>47 % der Unternehmen</strong> nannte die KI stattdessen namentlich Wettbewerber. Gute Rankings schützten davor nicht.`,
          },
          {
            type: 'stats',
            items: [
              { value: '55 %', label: 'der Einkäuferfragen bleiben ohne Nennung des Unternehmens', source: 'CodaAI-Studie 2026, 7.184 KI-Antworten' },
              { value: '47 %', label: 'werden durch einen Wettbewerber ersetzt', source: 'CodaAI-Studie 2026' },
              { value: '26 %', label: 'der Marken haben keine einzige Nennung in der Google KI-Übersicht', source: 'Ahrefs, 75.000 Marken' },
              { value: '<\u00a01:100', label: 'Chance, dass ChatGPT oder Google AI dieselbe Empfehlungsliste zweimal liefert', source: 'SparkToro, 2.961 Durchläufe' },
            ],
          },
          {
            type: 'p',
            html: `Der Unterschied liegt nicht im Handwerk, sondern in der Gewichtung und im Ergebnisformat. Die Tabelle stellt beide Disziplinen gegenüber:`,
          },
          {
            type: 'table',
            caption: 'SEO und GEO im Vergleich',
            head: ['Aspekt', 'SEO (klassische Suche)', 'GEO (KI-Antworten)'],
            rows: [
              ['Ziel', 'Auf Seite eins ranken und den Klick bekommen', 'In der Antwort genannt und als Quelle zitiert werden'],
              ['Ergebnisformat', 'Liste von Links, der Nutzer wählt', 'Eine synthetisierte Antwort mit wenigen Quellen'],
              ['Wettbewerb', 'Zehn Positionen auf Seite eins', 'Wenige Nennungen je Antwort — wer fehlt, wird nicht gesehen'],
              ['Einheit der Bewertung', 'Die Seite (URL)', 'Die Passage — extrahierte Auszüge von wenigen hundert Wörtern'],
              ['Was zählt', 'Keywords, Links, technische Basis', 'Dieselbe Basis plus Faktendichte, Struktur, Markennennungen auf Drittseiten'],
              ['Erfolgsmessung', 'Position, Impressionen, Klicks — reproduzierbar', 'Mention Rate, Citation Rate, Share of AI Search — als Wahrscheinlichkeit über viele Durchläufe'],
              ['Stabilität', 'Rankings bleiben über Wochen ähnlich', 'Jede Antwort ist neu generiert; dieselbe Frage wird verschieden beantwortet'],
            ],
          },
          {
            type: 'p',
            html: `Die Schnittmenge ist größer, als die meisten denken: Technische Zugänglichkeit, Inhaltsqualität und Autorität wirken auf beiden Seiten. GEO verschiebt die Prioritäten und ergänzt einige Anforderungen — es beginnt nicht bei null.`,
          },
        ],
      },
      // ── 2b ─────────────────────────────────────────────────────────────────
      {
        id: 'studie',
        h2: 'Was zeigt die Studie für B2B-Unternehmen?',
        blocks: [
          {
            type: 'p',
            html: `Die Studie zeigt für B2B-Unternehmen, dass klassische Suchmaschinenstärke nicht in KI-Antworten übersetzt wird. Wir haben im Juni und Juli 2026 <a href="/studie/">449 mittelständische Unternehmen aus 258 Branchen</a> untersucht: je acht qualifizierte Einkäuferfragen in drei Archetypen (Marktübersicht, Anwendungsfall, Wettbewerbsvergleich), gestellt an ChatGPT und die Google KI-Übersicht — 3.592 Fragen, 7.184 dokumentierte Antworten. Vier Befunde tragen diesen Leitfaden:`,
          },
          {
            type: 'p',
            html: `<strong>Das SEO-Paradox.</strong> 361 der untersuchten Unternehmen haben mehr als 100 Top-10-Rankings bei Google. <strong>35 % davon sind in ChatGPT trotzdem komplett unsichtbar</strong> — null Nennungen in acht Fragen. Über ein Drittel der Firmen, die bei Google alles richtig gemacht haben, existiert für die KI nicht. Die Ursache steht im nächsten Abschnitt: ChatGPT antwortet überwiegend aus Trainingsdaten, und wer dort fehlt, fehlt strukturell.`,
          },
          {
            type: 'p',
            html: `<strong>Unsichtbar beim eigenen Kerngeschäft.</strong> <strong>26 % der Unternehmen werden selbst bei der Marktübersichtsfrage zu ihrer eigenen Kategorie nicht genannt</strong> („Welche Anbieter für … gelten als führend?"). Das ist die Frage, mit der ein Einkäufer die Discovery-Phase beginnt. Wer hier fehlt, kommt in die Auswahl gar nicht erst hinein.`,
          },
          {
            type: 'p',
            html: `<strong>Wettbewerber statt Lücke.</strong> Eine KI-Antwort bleibt nicht leer, wenn ein Unternehmen fehlt — sie nennt jemand anderen. <strong>Bei 47 % der Unternehmen empfiehlt die KI mehrheitlich namentlich Wettbewerber.</strong> Wo Unternehmen genannt werden, stehen sie im Schnitt an Position 1,8 — die Antwort ist also kurz, und die ersten zwei Plätze entscheiden.`,
          },
          {
            type: 'p',
            html: `<strong>Zwei Systeme, zwei Realitäten.</strong> Dieselben Fragen ergaben in ChatGPT eine durchschnittliche Sichtbarkeit von <strong>24,9 %</strong>, in der Google KI-Übersicht <strong>39,4 %</strong>. 39,6 % der Unternehmen werden von ChatGPT nie genannt, 15,1 % auch von Google nicht. Die Google KI-Übersicht greift stärker auf den Live-Index zu — dort wirkt <a href="${G}/grounding/">Grounding</a> schneller; in ChatGPT muss die Marke erst ins <a href="${G}/modellwissen/">Modellwissen</a> oder über Drittseiten in den Kandidatenpool.`,
          },
          {
            type: 'callout',
            title: 'Beispiel aus dem Datensatz',
            html: `Ein Maschinenbauer für Fabrikautomation und Fördertechnik, rund 640 Top-10-Rankings bei Google. Einkäuferfrage: „Welche Hersteller von Aluminium-Profilsystemen für die Fabrikautomation gelten als führend in Europa?" Ergebnis: <strong>keine Nennung in ChatGPT und Google KI-Übersicht, 0 von 8 Fragen.</strong> Der meistgenannte Wettbewerber erscheint siebenmal — ein DAX-naher Großkonzern besetzt die Kategorie. Das Unternehmen rankt für dieselben Begriffe auf Seite eins; es fehlt nicht an Relevanz, sondern an <a href="${G}/brand-mentions/">Nennungen auf Drittseiten</a>, die die KI als Kandidatenliste liest. Weitere Beispiele und die Methodik stehen in der <a href="/studie/">Studie</a>.`,
          },
          {
            type: 'p',
            html: `Was daraus für B2B folgt: Die Fremdstudien weiter unten messen große Marken im englischsprachigen Markt. Unsere Zahlen messen deutsche Mittelständler mit Nischenprodukten — und dort ist die Lücke größer, weil das Modellwissen über eine Firma mit 200 Mitarbeitern dünn ist und Grounding der einzige Weg in die Antwort bleibt.`,
          },
        ],
      },
      // ── 3 ──────────────────────────────────────────────────────────────────
      {
        id: 'retrieval',
        h2: 'Wie kommt ein Inhalt in eine KI-Antwort?',
        blocks: [
          {
            type: 'p',
            html: `Ein Inhalt kommt auf zwei Wegen in eine KI-Antwort: über das <a href="${G}/modellwissen/">Modellwissen</a>, das beim Training aus Quellen wie <a href="${G}/common-crawl/">Common Crawl</a> und Wikipedia entstanden ist, oder über die <a href="${G}/websuche/">Websuche</a>, die das System auslöst, wenn es sich der Antwort aus dem Gedächtnis nicht sicher ist. Das Modellwissen endet am <a href="${G}/knowledge-cutoff/">Knowledge Cutoff</a>; wer sich seitdem umbenannt, neu positioniert, ausgegründet oder fusioniert hat, existiert dort nicht — im B2B-Mittelstand ein häufiger Fall, und einer, den die Studie als „SEO-Paradox" sichtbar macht. Für alles Aktuelle ist die Websuche der einzige Weg, und sie läuft in vier Schritten:`,
          },
          { type: 'diagram', id: 'retrieval' },
          {
            type: 'ol',
            items: [
              `<strong><a href="${G}/query-fan-out/">Query Fan-out</a>:</strong> Das System zerlegt die Frage in mehrere Teilfragen und schickt sie an einen Suchindex.`,
              `<strong><a href="${G}/initial-retrieval/">Initial Retrieval</a>:</strong> Für jede Teilfrage kommen die bestplatzierten Seiten in den Kandidatenpool — das ist der klassische SEO-Anteil.`,
              `<strong><a href="${G}/re-ranking/">Re-Ranking</a>:</strong> Innerhalb der Kandidaten werden einzelne Passagen bewertet. Nur was über der Relevanzschwelle liegt, kommt weiter. Abgerufen zu werden heißt noch nicht, zitiert zu werden.`,
              `<strong><a href="${G}/grounding-snippets/">Grounding Snippets</a> und Antwort:</strong> Die relevantesten Auszüge werden extrahiert und zur Antwort zusammengesetzt; die Quellen erscheinen als Zitate.`,
            ],
          },
          {
            type: 'p',
            html: `Wie eng dieses Nadelöhr ist, hat Dan Petrovic (dejan.ai) an 7.060 Google-Anfragen mit 2.275 Quellseiten gemessen: Je Anfrage stehen rund <strong>2.000 Wörter <a href="${G}/grounding-budget/">Grounding-Budget</a></strong> zur Verfügung, verteilt nach Relevanzrang. Die erstplatzierte Quelle erhält davon im Schnitt 531 Wörter (28 %), die fünfte noch 266 Wörter (13 %). Aus einer typischen Seite werden 377 Wörter ausgewählt, in Abschnitten von rund 15 Wörtern. Daraus folgt die Regel, die alles Weitere trägt:`,
          },
          {
            type: 'callout',
            title: 'Die Regel',
            html: `<strong>Optimieren Sie Seiten, damit sie ranken — und Passagen, damit sie relevant sind.</strong> Ein KI-System extrahiert Absätze, nicht Seiten. Jeder Absatz muss für sich allein verständlich sein und eine Frage vollständig beantworten.`,
          },
        ],
      },
      // ── 4 ──────────────────────────────────────────────────────────────────
      {
        id: 'massnahmen',
        h2: 'Welche Maßnahmen erhöhen die Zitierwahrscheinlichkeit nachweislich?',
        blocks: [
          {
            type: 'p',
            html: `Die Zitierwahrscheinlichkeit steigt auf drei Ebenen, die sich nicht ersetzen, sondern multiplizieren. Chrissy Kunisch (ONE Beyond Search) hat sie beim SISTRIX Meetup im September 2026 auf eine Formel gebracht: <strong>KI-Sichtbarkeit = (Technik + Content + Offpage) × Prozesse</strong>. Die Technik bringt eine Seite ins Rennen, der Content entscheidet über die Zitierung, das Umfeld auf Drittseiten darüber, ob die Marke überhaupt als Kandidat gilt — und ohne Messung bleibt jede Maßnahme eine Einmalaktion.`,
          },
          { type: 'diagram', id: 'formel' },
          { type: 'h3', text: 'Technik: das Eintrittsticket', id: 'technik' },
          {
            type: 'p',
            html: `Technik entscheidet, ob ein KI-System die Seite überhaupt lesen kann. Der wichtigste Unterschied zu Google: <strong>Kein Crawler von OpenAI, Anthropic, Perplexity, Meta oder ByteDance führt JavaScript aus</strong> (Vercel und MERJ, Dezember 2024). ClaudeBot lädt in 23,8 % der Abrufe JavaScript-Dateien, GPTBot in 11,5 % — ausgeführt wird keine davon. Inhalte, die erst im Browser entstehen, sind für diese Systeme unsichtbar. Gemini und Applebot rendern dagegen. Warum für ChatGPT zusätzlich der Bing-Index zählt, erklärt der Artikel <a href="/blog/chatgpt-seo-perplexity-sichtbarkeit/">ChatGPT SEO: Woher KI-Systeme ihre Quellen nehmen</a>.`,
          },
          {
            type: 'ul',
            items: [
              `<a href="${G}/llm-crawler/">KI-Crawler</a> in der robots.txt erlauben (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) und nur indexierbare URLs in die Sitemap aufnehmen.`,
              `Wichtige Inhalte als HTML ausliefern, nicht per JavaScript nachladen; schlankes, semantisches Markup mit klarer Überschriftenhierarchie H1 → H2 → H3.`,
              `<a href="${G}/ttfb/">Antwortzeit</a> niedrig halten und keine Klick- oder Login-Wände vor wichtige Inhalte setzen — ein abgebrochener Abruf wird meist nicht wiederholt.`,
              `Interne Verlinkung als echte HTML-Links, damit <a href="${G}/url-discovery/">URL Discovery</a> und <a href="${G}/crawl-budget/">Crawl-Budget</a> auf den Seiten landen, die zählen.`,
            ],
          },
          { type: 'h3', text: 'Content: entscheidet über die Zitierung', id: 'content' },
          {
            type: 'p',
            html: `Content wird zitiert, wenn er faktendicht, klar strukturiert und ohne Kontext verständlich ist. Die bislang gründlichste Messung dazu stammt aus Princeton: Aggarwal et al. haben für die KDD 2024 an 10.000 Anfragen (GEO-bench) neun Textmaßnahmen getestet. Die wirksamsten drei fügen dem Text etwas hinzu, das ein Modell nicht selbst erzeugen kann:`,
          },
          {
            type: 'table',
            caption: 'Wirkung von Textmaßnahmen auf die Sichtbarkeit in KI-Antworten (Princeton GEO-Studie, KDD 2024, positionsgewichteter Wortanteil gegenüber unverändertem Text)',
            head: ['Maßnahme', 'Was sie tut', 'Veränderung'],
            rows: [
              ['Zitate einfügen (Quotation Addition)', 'Wörtliche Aussagen benannter Fachleute in den Text', '+ 41 %'],
              ['Statistiken ergänzen (Statistics Addition)', 'Quantitative Daten statt qualitativer Beschreibung', '+ 34 %'],
              ['Quellen angeben (Cite Sources)', 'Belege mit Herkunft im Satz', '+ 28 % · für Seiten auf Rang 5: + 115 %'],
              ['Textfluss verbessern (Fluency)', 'Kurze, klare Sätze, dialogisch', '+ 28 %'],
              ['Keyword-Stuffing', 'Mehr relevante Suchbegriffe einstreuen', 'kein Gewinn; bei Perplexity − 10 %'],
            ],
          },
          {
            type: 'p',
            html: `Die beste Kombination in der Studie war Textfluss plus Statistiken. Auffällig ist der Effekt für schwächer platzierte Seiten: Quellenangaben steigerten die Sichtbarkeit von Seiten auf Rang 5 um 115,1 % — GEO wirkt am stärksten dort, wo klassisches SEO noch nicht gewonnen hat. Die Werte stammen aus englischsprachigen Tests unter Laborbedingungen; sie zeigen die Richtung, nicht die Garantie.`,
          },
          {
            type: 'p',
            html: `Dazu kommen Strukturregeln, die aus der Funktionsweise der Extraktion folgen: <a href="${G}/bottom-line-up-front/">Antwort zuerst</a> (Kernaussage in den ersten 30 % der Seite), <a href="${G}/semantisches-chunking/">semantisches Chunking</a> (ein Gedanke je Absatz, jeder Absatz allein verständlich), Überschriften als Frage und <a href="${G}/entity-echoing/">Entity Echoing</a> (die Antwort beginnt mit dem gefragten Begriff). Vergleiche gehören in Tabellen, Kriterien in Listen: In der Auswertung von 75.000 KI-Antworten mit über einer Million Zitaten durch das Wix Studio AI Search Lab (März 2026) entfielen 21,9 % aller Zitate auf Listen-Artikel, 16,7 % auf Fachartikel und 13,7 % auf Produktseiten; bei kommerziellen Anfragen führten Listen mit 40,9 %.`,
          },
          {
            type: 'p',
            html: `<a href="${G}/freshness/">Aktualität</a> zählt messbar: KI-Assistenten zitieren im Schnitt 25,7 % frischere Inhalte als die organische Google-Suche (Ahrefs, 16,975 Millionen zitierte URLs, Juli 2025). Die Google KI-Übersicht ist die Ausnahme — sie zitiert sogar 16 Tage ältere Inhalte als die organische Suche. Sichtbares Datum, aktualisierte Zahlen und ein gepflegtes <code>dateModified</code> im Schema gehören deshalb zur Routine, nicht zum Relaunch.`,
          },
          { type: 'h3', text: 'Offpage: entscheidet, ob die Marke als Kandidat gilt', id: 'offpage' },
          {
            type: 'p',
            html: `Offpage-Signale wiegen bei KI-Systemen schwerer als bei Google, weil der KI gleichgültig ist, ob eine Information von der eigenen Website oder von Drittseiten stammt — es zählt das konsistente Markenbild. Ahrefs hat für 75.000 Marken gemessen, welche Faktoren mit Nennungen in der Google KI-Übersicht zusammenhängen: <strong><a href="${G}/brand-mentions/">Markennennungen im Web</a> korrelieren mit 0,664, Backlinks nur mit 0,218</strong> (Spearman). 26 % der untersuchten Marken hatten keine einzige Nennung. Korrelation ist keine Kausalität, und die Studie betrachtet große Marken — die Rangfolge der Faktoren ist trotzdem eindeutig (Einordnung im Artikel <a href="/blog/markennennungen-drittseiten-ki/">Markennennungen auf Drittseiten</a>).`,
          },
          {
            type: 'ul',
            items: [
              `<strong>Präsenz in Vergleichslisten:</strong> In einer Auswertung von rund 1.260 B2B-Kaufprompts (Overthink Group, Juli 2026) verwiesen 70,8 % aller Zitate auf Seiten mit „best", „top" oder „leading" im Titel. Wer in den <a href="${G}/listicles/">Listen</a> fehlt, die die KI bereits zitiert, fehlt in der Antwort (<a href="/blog/vergleichsartikel-anbieterlisten-ki/">mehr dazu</a>).`,
              `<strong>Die eigene Startseite:</strong> Unter den 1.000 meistzitierten Seiten in ChatGPT sind 23,8 % Start- und Landingpages (Ahrefs, Oktober 2025) — die zweitgrößte Kategorie nach Wikipedia, und die einzige, die dem Unternehmen vollständig gehört. Eine <a href="${G}/konsistente-markenbeschreibung/">konsistente Markenbeschreibung</a> dort und auf allen Profilen ist die Grundlage (<a href="/blog/chatgpt-quellen-startseite-markenkonsistenz/">mehr dazu</a>).`,
              `<strong><a href="${G}/review-plattformen/">Bewertungsplattformen</a>, Fachmedien, <a href="${G}/digital-pr/">Digital PR</a>:</strong> Erwähnungen in Quellen, die die KI in der Branche ohnehin zitiert — auch ohne Link. Im B2B sind das nicht Trustpilot und Google-Rezensionen, sondern Branchenportale, Fachmedien, Verbandsverzeichnisse und Software-Vergleichsplattformen wie Capterra oder G2. Benannte Fachleute mit Zitat werden häufiger übernommen als anonyme Redaktionen.`,
              `<strong><a href="${G}/youtube-praesenz/">Eigene Videos</a> mit Transkript und <a href="${G}/entitaet/">Entitäten</a> in Wissensdatenbanken:</strong> beides Quellen, auf die Modelle trainiert werden und die sie beim Grounding bevorzugen (<a href="/blog/youtube-ki-sichtbarkeit-b2b/">YouTube im B2B</a>).`,
            ],
          },
          {
            type: 'p',
            html: `Wie diese Offpage-Signale mit Lesbarkeit und zitierfähigen Inhalten zusammenspielen, wenn ein Einkäufer ChatGPT nach Anbietern fragt, beschreibt der Artikel <a href="/blog/in-chatgpt-als-anbieter-empfohlen-werden/">In ChatGPT als Anbieter empfohlen werden</a>.`,
          },
        ],
      },
      // ── 5 ──────────────────────────────────────────────────────────────────
      {
        id: 'nicht-wirksam',
        h2: 'Was funktioniert bei GEO nicht?',
        blocks: [
          {
            type: 'p',
            html: `Bei GEO funktioniert vieles nicht, was gerade verkauft wird. Die folgenden fünf Punkte sind gemessen, nicht gemeint — und sie sparen Budget:`,
          },
          {
            type: 'table',
            caption: 'Maßnahmen ohne belegten Effekt auf KI-Zitierungen',
            head: ['Maßnahme', 'Befund', 'Quelle'],
            rows: [
              ['Keyword-Stuffing', 'Kein Gewinn, bei Perplexity 10 % schlechter als der unveränderte Text', 'Princeton GEO-Studie, KDD 2024'],
              [`<a href="${G}/llms-txt/">llms.txt</a>`, 'Kein signifikanter Zusammenhang mit Zitierungen bei rund 300.000 Domains; 97 % der Dateien wurden bei 137.210 untersuchten Domains nie abgerufen; laut Google nutzt kein großer Anbieter die Datei', 'SE Ranking · Ahrefs · SISTRIX'],
              ['Schema-Markup als Zitiergarantie', 'Keine Korrelation zwischen Schema-Abdeckung und Zitierrate (Search Atlas, Dezember 2024). Schema hilft Google und Bing beim Verstehen von Entitäten — es ist Infrastruktur, kein Hebel', 'Search Engine Land, März 2026'],
              [`<a href="${G}/logfiles/">Server-Logs</a> als Sichtbarkeitsbeweis`, 'Die Google KI-Übersicht und der AI Mode greifen in der Regel nicht live zu; ein Abruf durch ChatGPT-User heißt „geprüft", nicht „zitiert"', 'SISTRIX, März 2026'],
              ['Platzierungszusagen', 'Bei 2.961 Durchläufen lag die Chance unter 1 : 100, dass ChatGPT oder Google AI dieselbe Liste zweimal liefert', 'SparkToro, Januar 2026'],
            ],
          },
          {
            type: 'quote',
            text: 'Wer heute sagt „ich will nur in Perplexity sichtbar sein", optimiert für ein sehr kleines Fenster. Plattformspezifische Feinoptimierung kommt erst in einem zweiten Schritt — wenn die Basis steht.',
            name: 'Chrissy Kunisch',
            role: 'ONE Beyond Search — SISTRIX Meetup, September 2026',
            href: 'https://onebeyondsearch.com/',
          },
          {
            type: 'p',
            html: `Aus demselben Grund bieten wir sechs Dinge bewusst nicht an — darunter llms.txt als Leistung, Reddit-Seeding im B2B und Platzierungsgarantien. Die Liste steht auf der <a href="/digital-visibility/#nicht-im-angebot">Leistungsseite</a>.`,
          },
        ],
      },
      // ── 6 ──────────────────────────────────────────────────────────────────
      {
        id: 'messen',
        h2: 'Wie misst man den Erfolg von GEO-Optimierung?',
        blocks: [
          {
            type: 'p',
            html: `Der Erfolg von GEO-Optimierung wird als Wahrscheinlichkeit gemessen, nicht als Position. Ein Ranking ist reproduzierbar: gleiches Keyword, gleicher Ort, gleiche Liste. Eine KI-Antwort ist jedes Mal neu generiert. Rand Fishkin (SparkToro) hat das mit 2.961 Durchläufen über zwölf Prompts in ChatGPT, Claude und Google AI belegt: Die Chance, zweimal dieselbe Empfehlungsliste zu erhalten, lag unter 1 : 100; für dieselbe Reihenfolge unter 1 : 1.000. Ein Werkzeug, das einen einzelnen Sichtbarkeitswert meldet, misst deshalb Rauschen.`,
          },
          {
            type: 'p',
            html: `Belastbar ist ein festes <a href="${G}/promptset/">Promptset</a>, das mehrfach und regelmäßig abgefragt wird, und daraus drei Kennzahlen: die <a href="${G}/mention-rate/">Mention Rate</a> (in wie vielen Antworten wird das Unternehmen genannt), die <a href="${G}/citation-rate/">Citation Rate</a> (in wie vielen wird die eigene Seite als Quelle verlinkt) und der <a href="${G}/share-of-ai-search/">Share of AI Search</a> im Vergleich zu den Wettbewerbern. Dazu das <a href="${G}/sentiment/">Sentiment</a>: Erwähnt heißt nicht empfohlen, und eine falsche Aussage über das Unternehmen ist dringender als keine.`,
          },
          {
            type: 'ul',
            items: [
              `<strong>Prompts entlang der Kaufentscheidung wählen.</strong> Empfehlungs-, Vergleichs- und Vertrauensfragen stehen der Entscheidung am nächsten; allgemeine Recherchefragen sind am wenigsten wert. Die Tabelle unten zeigt die Kategorien mit B2B-Beispielen.`,
              `<strong>Eine <a href="${G}/nullmessung/">Nullmessung</a> vor der ersten Maßnahme.</strong> Ohne Referenzwert lässt sich acht Wochen später nichts belegen.`,
              `<strong>Modellwissen getrennt abfragen.</strong> Was sagt die KI ohne Websuche über das Unternehmen? Falsche Leistung, alter Standort — dann liegt die Aufgabe bei der Markenbeschreibung, nicht beim Content.`,
              `<strong><a href="${G}/quellenanalyse/">Quellenanalyse</a>:</strong> Welche Drittseiten zitiert die KI bei den eigenen Prompts? Das ist die Liste, auf der man stehen muss.`,
            ],
          },
          {
            type: 'table',
            caption: 'Promptkategorien nach Kaufnähe — mit B2B-Beispielen (Einteilung nach Chrissy Kunisch, SISTRIX Meetup 09/2026; Archetypen wie in der CodaAI-Studie)',
            head: ['Kategorie', 'B2B-Beispiel', 'Einfluss auf die Kaufentscheidung'],
            rows: [
              ['Allgemeine Recherche', '„Worauf kommt es bei der Auswahl eines Fördersystems an?"', 'gering — kein Kaufinteresse erkennbar'],
              ['Problemlösung', '„Wie lassen sich Kühlschmierstoffe in der Zerspanung länger nutzen?"', 'mittel — Problem vorhanden, Anbieter noch offen'],
              ['Marktübersicht / Empfehlung', '„Welche Hersteller von Aluminium-Profilsystemen gelten als führend in Europa?"', 'hoch — hier entsteht die Kandidatenliste'],
              ['Vergleich', '„Anbieter A oder Anbieter B für die Oberflächenveredelung von Kleinteilen?"', 'hoch — kurz vor der Entscheidung'],
              ['Vertrauen / Reputation', '„Gibt es Erfahrungen mit Anbieter A bei Großserien?"', 'hoch — wer hier nicht überzeugt, hat den Einkäufer verloren'],
              ['Kauf / Abschluss', '„Wo bekomme ich Anbieter A mit Lieferzeit unter vier Wochen?"', 'mittel — Marke steht, Verfügbarkeit zählt'],
            ],
          },
          {
            type: 'p',
            html: `So misst auch unser <a href="/digital-visibility/">Digital Visibility Audit</a>: an echten Einkäuferfragen, in ChatGPT und der Google KI-Übersicht, als Anteil über Durchläufe — mit den Wettbewerbern daneben, die stattdessen genannt werden. Wie so eine Auswertung in der Praxis aussieht, zeigt der Artikel <a href="/blog/ki-sichtbarkeit-praxis-chatgpt-empfehlung/">7.184 KI-Antworten ausgewertet</a>.`,
          },
        ],
      },
      // ── 7 ──────────────────────────────────────────────────────────────────
      {
        id: 'reihenfolge',
        h2: 'Womit fängt man bei GEO-Optimierung an?',
        blocks: [
          {
            type: 'p',
            html: `GEO-Optimierung beginnt mit dem, was die Basis für alle Plattformen zugleich legt — nicht mit Feinoptimierung für ein einzelnes System. Die Reihenfolge, die sich aus den Belegen oben ergibt:`,
          },
          {
            type: 'ol',
            items: [
              `<strong>Messen.</strong> Promptset festlegen, Nullmessung durchführen, Modellwissen abfragen. Erst dann weiß man, ob das Problem bei Technik, Content oder Marke liegt.`,
              `<strong>Lesbar werden.</strong> robots.txt, JavaScript-freie Inhalte, Antwortzeit, saubere Struktur — Stufe 1 · <a href="/digital-visibility/#lesbar">Gefunden</a>.`,
              `<strong>Zitierfähig schreiben.</strong> Antwort zuerst, ein Gedanke je Absatz, Zahlen mit Quelle im Satz, Vergleiche als Tabelle, sichtbares Datum. Bestehende Seiten zuerst, dann neue.`,
              `<strong>Dort präsent sein, wo die KI ihre Belege holt.</strong> Konsistente Markenbeschreibung auf allen Profilen, Bewertungsplattformen der Branche, Vergleichslisten, Fachmedien — Stufe 2 · <a href="/digital-visibility/#quellen">Empfohlen</a>.`,
              `<strong>Selbst zur Quelle werden.</strong> Eigene Daten, eigene Studien, benannte Fachleute — Inhalte, für die es nur eine Quelle gibt: das eigene Unternehmen. Stufe 3 · <a href="/digital-visibility/#quelle-werden">Zitiert</a>.`,
            ],
          },
          {
            type: 'p',
            html: `Wer die Begriffe vertiefen will, findet sie im <a href="${G}/">GEO-Glossar</a> — 56 Begriffe, je einer pro Seite, in der Reihenfolge, in der ein Inhalt den Weg in eine KI-Antwort nimmt.`,
          },
        ],
      },
    ],
    sourcesTitle: 'Belege',
    sourcesIntro:
      'Jede Zahl auf dieser Seite hat eine Fundstelle im Volltext, geprüft am 18. September 2026. Die meisten Studien stammen aus dem englischsprachigen Markt; wo sie große Marken untersuchen, ist die Übertragung auf den Mittelstand eine Annahme, keine Messung.',
    sourcesHead: ['Quelle', 'Was gemessen wurde', 'Grundlage', 'Stand'],
    sources: [
      { name: 'CodaAI, Digital-Visibility-Studie', what: 'Nennung von 449 Unternehmen in ChatGPT und der Google KI-Übersicht auf Einkäuferfragen', sample: '3.592 Fragen, 7.184 Antworten', date: 'Juni–Juli 2026', href: '/studie/' },
      { name: 'Aggarwal et al., Princeton — „GEO: Generative Engine Optimization", KDD 2024', what: 'Wirkung von neun Textmaßnahmen auf die Sichtbarkeit in generativen Antworten', sample: '10.000 Anfragen (GEO-bench)', date: '2024', href: 'https://arxiv.org/abs/2311.09735' },
      { name: 'Dan Petrovic, dejan.ai — „How big are Google’s grounding chunks?"', what: 'Grounding-Budget je Anfrage und Verteilung nach Quellenrang', sample: '7.060 Anfragen, 2.275 Seiten', date: 'Dezember 2025', href: 'https://dejan.ai/blog/how-big-are-googles-grounding-chunks/' },
      { name: 'Vercel und MERJ — „The rise of the AI crawler"', what: 'JavaScript-Verhalten von KI-Crawlern', sample: 'Crawler-Traffic im Vercel-Netz', date: 'Dezember 2024', href: 'https://vercel.com/blog/the-rise-of-the-ai-crawler' },
      { name: 'Wix Studio AI Search Lab (via Search Engine Land)', what: 'Zitierte Seitentypen in ChatGPT, Google AI Mode und Perplexity', sample: '75.000 Antworten, > 1 Mio. Zitate', date: 'März 2026', href: 'https://searchengineland.com/ai-citations-favor-listicles-articles-product-pages-study-472364' },
      { name: 'Ahrefs — „AI Overview Brand Visibility Factors"', what: 'Korrelation von Markennennungen, Backlinks u. a. mit Nennungen in der Google KI-Übersicht', sample: '75.000 Marken', date: 'Mai 2025, akt. April 2026', href: 'https://ahrefs.com/blog/ai-overview-brand-correlation/' },
      { name: 'Ahrefs — „ChatGPT’s most cited pages"', what: 'Seitentypen unter den 1.000 meistzitierten Seiten in ChatGPT', sample: 'Top 1.000 Zitate', date: 'Oktober 2025', href: 'https://ahrefs.com/blog/chatgpts-most-cited-pages/' },
      { name: 'Ahrefs — „Do AI assistants prefer to cite fresh content?"', what: 'Alter zitierter Inhalte in KI-Assistenten gegenüber organischer Suche', sample: '16,975 Mio. zitierte URLs', date: 'Juli 2025', href: 'https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/' },
      { name: 'Ahrefs — llms.txt-Studie', what: 'Abrufe von llms.txt-Dateien durch KI-Crawler', sample: '137.210 Domains', date: '2025', href: 'https://ahrefs.com/blog/llmstxt-study/' },
      { name: 'SE Ranking (via Search Engine Journal)', what: 'Zusammenhang zwischen llms.txt und KI-Zitierungen', sample: 'rund 300.000 Domains', date: '2026', href: 'https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/' },
      { name: 'Overthink Group mit Amadora — B2B AI Citation Stats', what: 'Title-Muster und Domains zitierter Seiten bei B2B-SaaS-Kaufprompts (US-Markt)', sample: 'rund 1.260 Prompts', date: 'Juli 2026', href: 'https://overthinkgroup.com/b2b-ai-citation-stats-2026-q2/' },
      { name: 'Rand Fishkin, SparkToro — „AIs are highly inconsistent when recommending brands"', what: 'Konsistenz von Markenempfehlungen über wiederholte Durchläufe', sample: '2.961 Durchläufe, 12 Prompts, 3 Systeme', date: 'Januar 2026', href: 'https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/' },
      { name: 'Johannes Beus, SISTRIX — „Was sagen Zugriffe von AI-Userbots wirklich aus?"', what: 'Aussagekraft von Server-Logs für KI-Sichtbarkeit', sample: 'Analyse', date: 'März 2026, akt. August 2026', href: 'https://www.sistrix.de/news/was-sagen-zugriffe-von-ai-userbots-auf-die-eigene-webseite-wirklich-aus/' },
      { name: 'SISTRIX — Frag SISTRIX: llms.txt', what: 'Nutzung von llms.txt durch KI-Anbieter', sample: 'Einordnung', date: 'August 2026', href: 'https://www.sistrix.de/frag-sistrix/ai-grundlagen/llms-txt/' },
      { name: 'Aimee Jurenka, Search Engine Land — „Schema markup and AI search: no hype"', what: 'Wirkung von Schema-Markup auf KI-Zitierungen, inkl. Search-Atlas-Daten', sample: 'Einordnung', date: 'März 2026', href: 'https://searchengineland.com/schema-markup-ai-search-no-hype-472339' },
      { name: 'Chrissy Kunisch, ONE Beyond Search — „Step into Confidence: AI Search verstehen und richtig messen"', what: 'Retrieval-Kette, Formel, Messlogik', sample: 'Vortrag, SISTRIX Meetup', date: 'September 2026', href: 'https://onebeyondsearch.com/' },
    ],
    faqTitle: 'Häufige Fragen zur GEO-Optimierung im B2B',
    faq: [
      {
        q: 'Ersetzt GEO-Optimierung die klassische Suchmaschinenoptimierung?',
        a: 'Nein. GEO-Optimierung setzt auf SEO auf: Ein KI-System, das das Web durchsucht, zieht seine Kandidaten aus denselben Suchindizes wie Google und Bing. Eine Seite, die für die Frage und ihre Teilfragen nicht rankt, kommt gar nicht erst in den Kandidatenpool. GEO verschiebt die Gewichtung — von der Seite zur Passage, von Links zu Markennennungen — und ergänzt einige Anforderungen, ersetzt aber keine.',
      },
      {
        q: 'Welche Textmaßnahmen erhöhen die Sichtbarkeit in KI-Antworten am stärksten?',
        a: 'In der Princeton-Studie (KDD 2024, 10.000 Anfragen) wirkten drei Maßnahmen am stärksten: wörtliche Zitate benannter Fachleute (+41 %), Statistiken (+34 %) und Quellenangaben (+28 %, für Seiten auf Rang 5 sogar +115 %). Alle drei fügen dem Text etwas hinzu, das ein Modell nicht selbst erzeugen kann. Keyword-Stuffing brachte keinen Gewinn.',
      },
      {
        q: 'Warum zitiert die KI Passagen und nicht ganze Seiten?',
        a: 'Weil das Grounding-Budget begrenzt ist. Google stellt je Anfrage rund 2.000 Wörter aus allen Quellen zusammen (dejan.ai, 7.060 Anfragen); aus einer typischen Seite werden 377 Wörter in Abschnitten von rund 15 Wörtern ausgewählt. Jeder Absatz muss deshalb für sich allein verständlich sein und eine Frage vollständig beantworten — sonst wird er nicht extrahiert.',
      },
      {
        q: 'Hilft eine llms.txt-Datei bei der GEO-Optimierung?',
        a: 'Nach heutigem Stand nicht messbar. SE Ranking fand bei rund 300.000 Domains keinen signifikanten Zusammenhang zwischen llms.txt und Zitierungen, Ahrefs stellte bei 137.210 Domains fest, dass 97 % der Dateien nie abgerufen wurden, und laut Google nutzt keiner der großen Anbieter die Datei. Sie schadet nicht, ersetzt aber keine Maßnahme mit Beleg.',
      },
      {
        q: 'Wie lässt sich GEO-Erfolg messen, wenn jede KI-Antwort anders ausfällt?',
        a: 'Als Anteil über viele Durchläufe statt als Position. Ein festes Set von Prompts wird regelmäßig mehrfach abgefragt; gemessen werden Mention Rate, Citation Rate und Share of AI Search im Vergleich zu Wettbewerbern, jeweils ausgehend von einer Nullmessung. Ein einzelner Sichtbarkeitswert aus einer einzigen Abfrage misst dagegen Rauschen — SparkToro fand bei 2.961 Durchläufen eine Chance unter 1 : 100, dieselbe Liste zweimal zu erhalten.',
      },
      {
        q: 'Warum ist ein B2B-Unternehmen bei Google sichtbar, in ChatGPT aber nicht?',
        a: 'Weil ChatGPT überwiegend aus Trainingsdaten antwortet und die Google KI-Übersicht stärker auf den Live-Index zugreift. In der CodaAI-Studie (449 Unternehmen, 7.184 KI-Antworten) waren 35 % der Unternehmen mit mehr als 100 Top-10-Rankings bei Google in ChatGPT komplett unsichtbar; die durchschnittliche Sichtbarkeit lag in ChatGPT bei 24,9 %, in der Google KI-Übersicht bei 39,4 %. Ein Nischenhersteller mit 200 Mitarbeitern ist im Modellwissen schlicht nicht vorhanden — er kommt nur über Grounding und über Nennungen auf Drittseiten in die Antwort.',
      },
      {
        q: 'Lohnt sich GEO-Optimierung auch für Nischenanbieter im B2B-Mittelstand?',
        a: 'Gerade dort. In der CodaAI-Studie wurden 26 % der Unternehmen selbst bei der Marktübersichtsfrage zu ihrer eigenen Kategorie nicht genannt, und bei 47 % empfahl die KI stattdessen namentlich Wettbewerber. Je enger die Nische, desto kürzer die Kandidatenliste der KI — und desto größer der Anteil einer einzelnen Nennung. Wo Unternehmen genannt werden, stehen sie im Schnitt an Position 1,8; die Antwort ist kurz, und die ersten beiden Plätze entscheiden.',
      },
      {
        q: 'Zählen Markennennungen ohne Link für die KI-Sichtbarkeit?',
        a: 'Ja, und sie zählen stärker als Backlinks. Ahrefs hat für 75.000 Marken gemessen, dass Markennennungen im Web mit 0,664 mit Nennungen in der Google KI-Übersicht korrelieren, Backlinks nur mit 0,218. Der KI ist gleichgültig, ob eine Information von der eigenen Website oder von Drittseiten stammt — entscheidend ist ein konsistentes Markenbild über alle Quellen.',
      },
    ],
    cta: {
      kicker: 'Vom Leitfaden zur Zahl',
      h2: 'Wo steht Ihr Unternehmen heute in den KI-Antworten Ihrer Branche?',
      p: 'Das Digital Visibility Audit misst zu echten Einkäuferfragen, ob ChatGPT und die Google KI-Übersicht Ihr Unternehmen nennen, wer stattdessen genannt wird — und an welcher der drei Ebenen es liegt.',
    },
    headline: 'GEO-Optimierung für B2B-Unternehmen: Wie Mittelständler in KI-Antworten genannt und zitiert werden',
    tags: ['GEO-Optimierung', 'Generative Engine Optimization', 'KI-Sichtbarkeit', 'B2B', 'Mittelstand', 'ChatGPT', 'Google KI-Übersicht'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════
  en: {
    path: '/en/knowledge/geo-optimization/',
    metaTitle: 'GEO Optimization for B2B: Getting Cited in AI Answers | CodaAI',
    metaDescription:
      'GEO optimization for B2B companies: how ChatGPT, Gemini and Google AI Overviews select sources, what demonstrably works, what does not — with figures from 7,184 AI answers on 449 mid-sized companies.',
    kicker: 'GEO optimization · Guide for B2B companies',
    line1: 'Your website ranks on Google.',
    line2: 'AI answers still leave it out.',
    lead:
      'Generative Engine Optimization (GEO) is the work of making AI systems such as ChatGPT, Gemini, Perplexity and Google AI Overviews mention a company and cite its content as a source. GEO does not replace SEO, it builds on it: no ranking, no grounding; no grounding, no AI visibility. This page explains, for B2B companies, how an AI answer is built, which measures demonstrably work, what does not work and how success is measured — backed by our study of 449 mid-sized companies.',
    brief: {
      title: 'The short version',
      items: [
        'GEO optimization makes content citable in AI answers. It builds on SEO: a page has to rank for the question and its sub-questions before an AI system even considers it as a source.',
        'In mid-sized B2B the gap is wide: in 55 % of 3,592 buyer questions the company name did not come up, and 35 % of companies with more than 100 top-10 Google rankings were completely invisible in ChatGPT (CodaAI study, 449 companies).',
        'AI systems cite passages, not pages. Google grants roughly 2,000 words of grounding budget per query; the top-ranked source gets 28 % of it, the fifth 13 % (dejan.ai, 7,060 queries).',
        'Quotes, statistics and cited sources in the text demonstrably work: in the Princeton study (KDD 2024) they raised visibility by 28 to 41 %, and citing sources lifted pages ranked fifth by 115 %.',
        'Brand mentions on third-party sites correlate more strongly with AI visibility (0.664) than backlinks (0.218) — Ahrefs, 75,000 brands.',
        'What does not work: keyword stuffing, llms.txt, schema markup as a citation guarantee, server logs as proof of visibility, and any ranking promise. GEO is measured as a probability over many runs, not as a position.',
      ],
    },
    tocLabel: 'On this page',
    sections: [
      {
        id: 'definition',
        h2: 'What is GEO optimization?',
        blocks: [
          {
            type: 'p',
            html: `<strong>GEO optimization</strong> (Generative Engine Optimization) is the systematic work of making generative AI systems <a href="${GE}/mention/">mention</a> a company in their answers, recommend it and <a href="${GE}/citation/">cite its content as a source</a>. That means ChatGPT, Google Gemini, Perplexity, Microsoft Copilot as well as Google AI Overviews and AI Mode — every interface that returns a synthesised answer instead of a list of links.`,
          },
          {
            type: 'p',
            html: `The same discipline goes by other names: AEO (Answer Engine Optimization), LLMO, AIO, GAIO. They mean essentially the same thing. We use <a href="${GE}/geo/">GEO</a> because it has become the standard term. What GEO is <em>not</em>: a replacement for SEO. An AI system that searches the web draws on the same search indexes as Google and Bing — a page that cannot be found there will not appear in the answer either.`,
          },
          {
            type: 'quote',
            text: 'No ranking. No grounding. No AI visibility.',
            name: 'Chrissy Kunisch',
            role: 'Founder & Managing Director, ONE Beyond Search — SISTRIX Meetup, September 2026',
            href: 'https://onebeyondsearch.com/',
          },
        ],
      },
      {
        id: 'seo-vs-geo',
        h2: 'Why is SEO alone no longer enough?',
        blocks: [
          {
            type: 'p',
            html: `SEO alone is no longer enough because a good Google ranking no longer means a potential customer gets to see the page. Someone who asks ChatGPT or Google AI Overviews for suppliers receives an answer with three to five names — and only those companies get the enquiry. In our <a href="/en/study/">study of 449 German companies from 258 industries</a> (3,592 buyer questions, 7,184 documented AI answers), <strong>55 % of buyer questions went without a mention</strong> of the company examined, and for <strong>47 % of the companies</strong> the AI named competitors instead. Good rankings did not protect against it.`,
          },
          {
            type: 'stats',
            items: [
              { value: '55 %', label: 'of buyer questions go without a mention of the company', source: 'CodaAI study 2026, 7,184 AI answers' },
              { value: '47 %', label: 'are answered with a competitor instead', source: 'CodaAI study 2026' },
              { value: '26 %', label: 'of brands have not a single mention in Google AI Overviews', source: 'Ahrefs, 75,000 brands' },
              { value: '<\u00a01:100', label: 'chance that ChatGPT or Google AI returns the same recommendation list twice', source: 'SparkToro, 2,961 runs' },
            ],
          },
          {
            type: 'p',
            html: `The difference is not in the craft but in the weighting and the result format. The table sets the two disciplines side by side:`,
          },
          {
            type: 'table',
            caption: 'SEO and GEO compared',
            head: ['Aspect', 'SEO (classic search)', 'GEO (AI answers)'],
            rows: [
              ['Goal', 'Rank on page one and win the click', 'Be named in the answer and cited as a source'],
              ['Result format', 'A list of links; the user chooses', 'One synthesised answer with a few sources'],
              ['Competition', 'Ten positions on page one', 'A few mentions per answer — whoever is missing is not seen'],
              ['Unit of evaluation', 'The page (URL)', 'The passage — extracted excerpts of a few hundred words'],
              ['What counts', 'Keywords, links, technical basics', 'The same basics plus fact density, structure, brand mentions on third-party sites'],
              ['Measuring success', 'Position, impressions, clicks — reproducible', 'Mention rate, citation rate, share of AI search — as a probability over many runs'],
              ['Stability', 'Rankings stay similar for weeks', 'Every answer is generated anew; the same question is answered differently'],
            ],
          },
          {
            type: 'p',
            html: `The overlap is larger than most people think: technical accessibility, content quality and authority work on both sides. GEO shifts the priorities and adds a few requirements — it does not start from zero.`,
          },
        ],
      },
      {
        id: 'study',
        h2: 'What does the study show for B2B companies?',
        blocks: [
          {
            type: 'p',
            html: `The study shows, for B2B companies, that classic search-engine strength does not translate into AI answers. In June and July 2026 we examined <a href="/en/study/">449 mid-sized German companies from 258 industries</a>: eight qualified buyer questions each in three archetypes (market overview, use case, competitor comparison), put to ChatGPT and Google AI Overviews — 3,592 questions, 7,184 documented answers. Four findings carry this guide:`,
          },
          {
            type: 'p',
            html: `<strong>The SEO paradox.</strong> 361 of the companies examined have more than 100 top-10 rankings on Google. <strong>35 % of them are nevertheless completely invisible in ChatGPT</strong> — zero mentions across eight questions. More than a third of the firms that did everything right on Google do not exist for the AI. The cause is in the next section: ChatGPT answers mostly from training data, and whoever is missing there is missing structurally.`,
          },
          {
            type: 'p',
            html: `<strong>Invisible in their own core business.</strong> <strong>26 % of companies are not mentioned even for the market-overview question about their own category</strong> (“Which providers of … are considered leaders?”). That is the question a buyer starts the discovery phase with. Whoever is missing here never makes it onto the shortlist.`,
          },
          {
            type: 'p',
            html: `<strong>Competitors instead of a gap.</strong> An AI answer does not stay empty when a company is missing — it names someone else. <strong>For 47 % of companies the AI predominantly recommends competitors by name.</strong> Where companies are mentioned, they sit at position 1.8 on average — the answer is short, and the first two places decide.`,
          },
          {
            type: 'p',
            html: `<strong>Two systems, two realities.</strong> The same questions yielded an average visibility of <strong>24.9 %</strong> in ChatGPT and <strong>39.4 %</strong> in Google AI Overviews. 39.6 % of companies are never mentioned by ChatGPT, 15.1 % not by Google either. Google AI Overviews draw more on the live index — <a href="${GE}/grounding/">grounding</a> works faster there; in ChatGPT the brand first has to make it into <a href="${GE}/model-knowledge/">model knowledge</a> or into the candidate pool via third-party sites.`,
          },
          {
            type: 'callout',
            title: 'Example from the data set',
            html: `A mechanical engineering firm for factory automation and conveyor systems, around 640 top-10 rankings on Google. Buyer question: “Which manufacturers of aluminium profile systems for factory automation are considered leaders in Europe?” Result: <strong>no mention in ChatGPT or Google AI Overviews, 0 out of 8 questions.</strong> The most frequently named competitor appears seven times — a DAX-adjacent corporation occupies the category. The company ranks on page one for the same terms; what it lacks is not relevance but <a href="${GE}/brand-mentions/">mentions on third-party sites</a>, which the AI reads as its candidate list. Further examples and the methodology are in the <a href="/en/study/">study</a>.`,
          },
          {
            type: 'p',
            html: `What follows for B2B: the third-party studies further down measure large brands in the English-speaking market. Our figures measure German mid-sized companies with niche products — and there the gap is wider, because model knowledge about a firm with 200 employees is thin and grounding remains the only route into the answer.`,
          },
        ],
      },
      {
        id: 'retrieval',
        h2: 'How does content get into an AI answer?',
        blocks: [
          {
            type: 'p',
            html: `Content gets into an AI answer in one of two ways: through <a href="${GE}/model-knowledge/">model knowledge</a>, built during training from sources such as <a href="${GE}/common-crawl/">Common Crawl</a> and Wikipedia, or through <a href="${GE}/web-search/">web search</a>, which the system triggers when it is not confident it can answer from memory. Model knowledge ends at the <a href="${GE}/knowledge-cutoff/">knowledge cutoff</a>; a company that has rebranded, repositioned, spun off or merged since then does not exist there — a frequent case in mid-sized B2B, and the one the study makes visible as the “SEO paradox”. For anything current, web search is the only route, and it runs in four steps:`,
          },
          { type: 'diagram', id: 'retrieval' },
          {
            type: 'ol',
            items: [
              `<strong><a href="${GE}/query-fan-out/">Query fan-out</a>:</strong> The system splits the question into several sub-queries and sends them to a search index.`,
              `<strong><a href="${GE}/initial-retrieval/">Initial retrieval</a>:</strong> For each sub-query, the top-ranked pages enter the candidate pool — this is the classic SEO part.`,
              `<strong><a href="${GE}/re-ranking/">Re-ranking</a>:</strong> Within the candidates, individual passages are scored. Only what clears the relevance threshold moves on. Being retrieved does not mean being cited.`,
              `<strong><a href="${GE}/grounding-snippets/">Grounding snippets</a> and answer:</strong> The most relevant excerpts are extracted and composed into the answer; the sources appear as citations.`,
            ],
          },
          {
            type: 'p',
            html: `Dan Petrovic (dejan.ai) measured how narrow this bottleneck is across 7,060 Google queries and 2,275 source pages: each query has roughly <strong>2,000 words of <a href="${GE}/grounding-budget/">grounding budget</a></strong>, distributed by relevance rank. The top-ranked source receives 531 words on average (28 %), the fifth still 266 words (13 %). From a typical page, 377 words are selected, in chunks of around 15 words. This yields the rule that carries everything else:`,
          },
          {
            type: 'callout',
            title: 'The rule',
            html: `<strong>Optimize pages to rank — and passages to be relevant.</strong> An AI system extracts paragraphs, not pages. Every paragraph has to stand on its own and answer one question completely.`,
          },
        ],
      },
      {
        id: 'measures',
        h2: 'Which measures demonstrably raise the probability of being cited?',
        blocks: [
          {
            type: 'p',
            html: `The probability of being cited rises on three levels that do not substitute for each other but multiply. Chrissy Kunisch (ONE Beyond Search) put it into a formula at the SISTRIX Meetup in September 2026: <strong>AI visibility = (technology + content + off-page) × processes</strong>. Technology gets a page into the race, content decides whether it is cited, the environment on third-party sites decides whether the brand counts as a candidate at all — and without measurement every measure remains a one-off.`,
          },
          { type: 'diagram', id: 'formel' },
          { type: 'h3', text: 'Technology: the entry ticket', id: 'technology' },
          {
            type: 'p',
            html: `Technology decides whether an AI system can read the page at all. The most important difference from Google: <strong>no crawler from OpenAI, Anthropic, Perplexity, Meta or ByteDance executes JavaScript</strong> (Vercel and MERJ, December 2024). ClaudeBot loads JavaScript files in 23.8 % of its requests, GPTBot in 11.5 % — none of it is executed. Content that only appears in the browser is invisible to these systems. Gemini and Applebot, by contrast, do render. Why the Bing index also matters for ChatGPT is explained in <a href="/en/blog/chatgpt-seo-perplexity-visibility/">ChatGPT SEO: where AI systems get their sources</a>.`,
          },
          {
            type: 'ul',
            items: [
              `Allow <a href="${GE}/llm-crawlers/">AI crawlers</a> in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and list only indexable URLs in the sitemap.`,
              `Deliver important content as HTML rather than loading it via JavaScript; lean, semantic markup with a clear heading hierarchy H1 → H2 → H3.`,
              `Keep <a href="${GE}/ttfb/">response time</a> low and put no click or login walls in front of important content — an aborted request is usually not retried.`,
              `Internal linking as real HTML links, so that <a href="${GE}/url-discovery/">URL discovery</a> and <a href="${GE}/crawl-budget/">crawl budget</a> land on the pages that matter.`,
            ],
          },
          { type: 'h3', text: 'Content: decides whether you are cited', id: 'content' },
          {
            type: 'p',
            html: `Content gets cited when it is dense with facts, clearly structured and understandable without context. The most thorough measurement to date comes from Princeton: for KDD 2024, Aggarwal et al. tested nine text measures on 10,000 queries (GEO-bench). The three most effective add something to the text that a model cannot generate itself:`,
          },
          {
            type: 'table',
            caption: 'Effect of text measures on visibility in AI answers (Princeton GEO study, KDD 2024, position-adjusted word share versus unchanged text)',
            head: ['Measure', 'What it does', 'Change'],
            rows: [
              ['Add quotations (Quotation Addition)', 'Verbatim statements by named experts in the text', '+ 41 %'],
              ['Add statistics (Statistics Addition)', 'Quantitative data instead of qualitative description', '+ 34 %'],
              ['Cite sources (Cite Sources)', 'Evidence with its origin in the sentence', '+ 28 % · for pages ranked fifth: + 115 %'],
              ['Improve fluency', 'Short, clear, conversational sentences', '+ 28 %'],
              ['Keyword stuffing', 'Sprinkle in more relevant keywords', 'no gain; on Perplexity − 10 %'],
            ],
          },
          {
            type: 'p',
            html: `The best combination in the study was fluency plus statistics. The effect on weaker-ranked pages stands out: citing sources raised the visibility of pages ranked fifth by 115.1 % — GEO works hardest where classic SEO has not yet won. The figures come from English-language tests under lab conditions; they show the direction, not a guarantee.`,
          },
          {
            type: 'p',
            html: `Add to that the structural rules that follow from how extraction works: <a href="${GE}/bottom-line-up-front/">answer first</a> (key message in the first 30 % of the page), <a href="${GE}/semantic-chunking/">semantic chunking</a> (one idea per paragraph, each paragraph understandable on its own), headings as questions and <a href="${GE}/entity-echoing/">entity echoing</a> (the answer starts with the term asked about). Comparisons belong in tables, criteria in lists: in the Wix Studio AI Search Lab analysis of 75,000 AI answers with more than one million citations (March 2026), 21.9 % of all citations went to listicles, 16.7 % to articles and 13.7 % to product pages; for commercial queries, listicles led with 40.9 %.`,
          },
          {
            type: 'p',
            html: `<a href="${GE}/freshness/">Freshness</a> counts measurably: AI assistants cite content that is on average 25.7 % fresher than organic Google search (Ahrefs, 16.975 million cited URLs, July 2025). Google AI Overviews are the exception — they cite content that is actually 16 days older than organic search. A visible date, updated figures and a maintained <code>dateModified</code> in the schema therefore belong to routine, not to a relaunch.`,
          },
          { type: 'h3', text: 'Off-page: decides whether the brand counts as a candidate', id: 'off-page' },
          {
            type: 'p',
            html: `Off-page signals weigh more heavily with AI systems than with Google, because the AI does not care whether a piece of information comes from your own website or from third-party sites — what counts is a consistent brand picture. Ahrefs measured for 75,000 brands which factors correlate with mentions in Google AI Overviews: <strong><a href="${GE}/brand-mentions/">brand mentions on the web</a> correlate at 0.664, backlinks at only 0.218</strong> (Spearman). 26 % of the brands examined had not a single mention. Correlation is not causation, and the study looks at large brands — the order of the factors is nevertheless unambiguous (see <a href="/en/blog/brand-mentions-third-party-sites-ai/">brand mentions on third-party sites</a>).`,
          },
          {
            type: 'ul',
            items: [
              `<strong>Presence in comparison lists:</strong> In an analysis of around 1,260 B2B buying prompts (Overthink Group, July 2026), 70.8 % of all citations pointed to pages with “best”, “top” or “leading” in the title. A company missing from the <a href="${GE}/listicles/">lists</a> the AI already cites is missing from the answer (<a href="/en/blog/comparison-articles-vendor-lists-ai/">more on this</a>).`,
              `<strong>Your own homepage:</strong> Among the 1,000 most-cited pages in ChatGPT, 23.8 % are home and landing pages (Ahrefs, October 2025) — the second-largest category after Wikipedia, and the only one the company fully owns. A <a href="${GE}/consistent-brand-description/">consistent brand description</a> there and on every profile is the foundation (<a href="/en/blog/chatgpt-sources-homepage-brand-consistency/">more on this</a>).`,
              `<strong><a href="${GE}/review-platforms/">Review platforms</a>, trade media, <a href="${GE}/digital-pr/">digital PR</a>:</strong> mentions in sources the AI already cites in your industry — even without a link. In B2B that is not Trustpilot or Google reviews but industry portals, trade media, association directories and software comparison platforms such as Capterra or G2. Named experts with a quote are picked up more often than anonymous editorial teams.`,
              `<strong><a href="${GE}/youtube-presence/">Your own videos</a> with transcripts and <a href="${GE}/entity/">entities</a> in knowledge bases:</strong> both are sources models are trained on and prefer during grounding (<a href="/en/blog/youtube-ai-visibility-b2b/">YouTube for B2B</a>).`,
            ],
          },
          {
            type: 'p',
            html: `How these off-page signals combine with readability and citable content when a buyer asks ChatGPT for suppliers is covered in <a href="/en/blog/get-recommended-by-chatgpt-as-a-supplier/">Getting recommended by ChatGPT as a supplier</a>.`,
          },
        ],
      },
      {
        id: 'what-does-not-work',
        h2: 'What does not work in GEO?',
        blocks: [
          {
            type: 'p',
            html: `Much of what is currently being sold does not work in GEO. The following five points are measured, not opined — and they save budget:`,
          },
          {
            type: 'table',
            caption: 'Measures with no proven effect on AI citations',
            head: ['Measure', 'Finding', 'Source'],
            rows: [
              ['Keyword stuffing', 'No gain; on Perplexity 10 % worse than the unchanged text', 'Princeton GEO study, KDD 2024'],
              [`<a href="${GE}/llms-txt/">llms.txt</a>`, 'No significant relationship with citations across roughly 300,000 domains; 97 % of the files across 137,210 domains examined were never requested; according to Google, no major provider uses the file', 'SE Ranking · Ahrefs · SISTRIX'],
              ['Schema markup as a citation guarantee', 'No correlation between schema coverage and citation rate (Search Atlas, December 2024). Schema helps Google and Bing understand entities — it is infrastructure, not a lever', 'Search Engine Land, March 2026'],
              [`<a href="${GE}/log-files/">Server logs</a> as proof of visibility`, 'Google AI Overviews and AI Mode generally do not fetch live; a request by ChatGPT-User means “checked”, not “cited”', 'SISTRIX, March 2026'],
              ['Ranking promises', 'Across 2,961 runs, the chance that ChatGPT or Google AI returned the same list twice was below 1 in 100', 'SparkToro, January 2026'],
            ],
          },
          {
            type: 'quote',
            text: 'Anyone who says today “I only want to be visible in Perplexity” is optimizing for a very small window. Platform-specific fine-tuning comes in a second step — once the basics are in place.',
            name: 'Chrissy Kunisch',
            role: 'ONE Beyond Search — SISTRIX Meetup, September 2026',
            href: 'https://onebeyondsearch.com/',
          },
          {
            type: 'p',
            html: `For the same reason there are six things we deliberately do not offer — among them llms.txt as a service, Reddit seeding in B2B and ranking guarantees. The list is on the <a href="/en/digital-visibility/#not-included">service page</a>.`,
          },
        ],
      },
      {
        id: 'measuring',
        h2: 'How do you measure the success of GEO optimization?',
        blocks: [
          {
            type: 'p',
            html: `The success of GEO optimization is measured as a probability, not as a position. A ranking is reproducible: same keyword, same location, same list. An AI answer is generated anew every time. Rand Fishkin (SparkToro) demonstrated this with 2,961 runs across twelve prompts in ChatGPT, Claude and Google AI: the chance of getting the same recommendation list twice was below 1 in 100; for the same order, below 1 in 1,000. A tool that reports a single visibility score is therefore measuring noise.`,
          },
          {
            type: 'p',
            html: `What holds up is a fixed <a href="${GE}/prompt-set/">prompt set</a>, queried repeatedly and regularly, and three metrics derived from it: the <a href="${GE}/mention-rate/">mention rate</a> (in how many answers the company is named), the <a href="${GE}/citation-rate/">citation rate</a> (in how many its own page is linked as a source) and the <a href="${GE}/share-of-ai-search/">share of AI search</a> compared with competitors. Plus <a href="${GE}/sentiment/">sentiment</a>: mentioned does not mean recommended, and a false statement about the company is more urgent than none.`,
          },
          {
            type: 'ul',
            items: [
              `<strong>Choose prompts along the buying decision.</strong> Recommendation, comparison and trust questions are closest to the decision; general research questions are worth the least. The table below shows the categories with B2B examples.`,
              `<strong>A <a href="${GE}/baseline-measurement/">baseline measurement</a> before the first measure.</strong> Without a reference value, nothing can be proven eight weeks later.`,
              `<strong>Query model knowledge separately.</strong> What does the AI say about the company without web search? Wrong service, old location — then the task lies with the brand description, not the content.`,
              `<strong><a href="${GE}/source-analysis/">Source analysis</a>:</strong> Which third-party sites does the AI cite for your prompts? That is the list you need to be on.`,
            ],
          },
          {
            type: 'table',
            caption: 'Prompt categories by proximity to purchase — with B2B examples (classification after Chrissy Kunisch, SISTRIX Meetup 09/2026; archetypes as in the CodaAI study)',
            head: ['Category', 'B2B example', 'Influence on the buying decision'],
            rows: [
              ['General research', '“What matters when choosing a conveyor system?”', 'low — no buying intent visible'],
              ['Problem solving', '“How can cutting fluids be used longer in machining?”', 'medium — problem exists, supplier still open'],
              ['Market overview / recommendation', '“Which manufacturers of aluminium profile systems are considered leaders in Europe?”', 'high — this is where the shortlist is formed'],
              ['Comparison', '“Supplier A or supplier B for surface finishing of small parts?”', 'high — just before the decision'],
              ['Trust / reputation', '“Is there any experience with supplier A on large production runs?”', 'high — whoever fails to convince here has lost the buyer'],
              ['Purchase / closing', '“Where can I get supplier A with a lead time under four weeks?”', 'medium — brand is set, availability counts'],
            ],
          },
          {
            type: 'p',
            html: `This is also how our <a href="/en/digital-visibility/">Digital Visibility Audit</a> measures: on real buyer questions, in ChatGPT and Google AI Overviews, as a share over runs — with the competitors named instead shown alongside. What such an analysis looks like in practice is shown in <a href="/en/blog/ai-visibility-chatgpt-recommendation-practice/">7,184 AI answers analysed</a>.`,
          },
        ],
      },
      {
        id: 'where-to-start',
        h2: 'Where do you start with GEO optimization?',
        blocks: [
          {
            type: 'p',
            html: `GEO optimization starts with what lays the foundation for all platforms at once — not with fine-tuning for a single system. The order that follows from the evidence above:`,
          },
          {
            type: 'ol',
            items: [
              `<strong>Measure.</strong> Define the prompt set, run the baseline measurement, query model knowledge. Only then do you know whether the problem lies with technology, content or brand.`,
              `<strong>Become readable.</strong> robots.txt, JavaScript-free content, response time, clean structure — Tier 1 · <a href="/en/digital-visibility/#readable">Found</a>.`,
              `<strong>Write to be cited.</strong> Answer first, one idea per paragraph, figures with their source in the sentence, comparisons as tables, a visible date. Existing pages first, then new ones.`,
              `<strong>Be present where the AI gets its evidence.</strong> Consistent brand description on every profile, your industry's review platforms, comparison lists, trade media — Tier 2 · <a href="/en/digital-visibility/#sources">Recommended</a>.`,
              `<strong>Become the source yourself.</strong> Your own data, your own studies, named experts — content for which there is only one source: your company. Tier 3 · <a href="/en/digital-visibility/#become-the-source">Cited</a>.`,
            ],
          },
          {
            type: 'p',
            html: `To go deeper into the terms, see the <a href="${GE}/">GEO Glossary</a> — 56 terms, one page each, in the order in which content makes its way into an AI answer.`,
          },
        ],
      },
    ],
    sourcesTitle: 'Evidence',
    sourcesIntro:
      'Every figure on this page has a location in the full text, verified on 18 September 2026. Most studies come from the English-speaking market; where they examine large brands, applying them to mid-sized companies is an assumption, not a measurement.',
    sourcesHead: ['Source', 'What was measured', 'Basis', 'Date'],
    sources: [
      { name: 'CodaAI, Digital Visibility Study', what: 'Mentions of 449 German companies in ChatGPT and Google AI Overviews on buyer questions', sample: '3,592 questions, 7,184 answers', date: 'June–July 2026', href: '/en/study/' },
      { name: 'Aggarwal et al., Princeton — “GEO: Generative Engine Optimization”, KDD 2024', what: 'Effect of nine text measures on visibility in generative answers', sample: '10,000 queries (GEO-bench)', date: '2024', href: 'https://arxiv.org/abs/2311.09735' },
      { name: 'Dan Petrovic, dejan.ai — “How big are Google’s grounding chunks?”', what: 'Grounding budget per query and its distribution by source rank', sample: '7,060 queries, 2,275 pages', date: 'December 2025', href: 'https://dejan.ai/blog/how-big-are-googles-grounding-chunks/' },
      { name: 'Vercel and MERJ — “The rise of the AI crawler”', what: 'JavaScript behaviour of AI crawlers', sample: 'Crawler traffic on the Vercel network', date: 'December 2024', href: 'https://vercel.com/blog/the-rise-of-the-ai-crawler' },
      { name: 'Wix Studio AI Search Lab (via Search Engine Land)', what: 'Page types cited in ChatGPT, Google AI Mode and Perplexity', sample: '75,000 answers, > 1 m citations', date: 'March 2026', href: 'https://searchengineland.com/ai-citations-favor-listicles-articles-product-pages-study-472364' },
      { name: 'Ahrefs — “AI Overview Brand Visibility Factors”', what: 'Correlation of brand mentions, backlinks and others with mentions in Google AI Overviews', sample: '75,000 brands', date: 'May 2025, updated April 2026', href: 'https://ahrefs.com/blog/ai-overview-brand-correlation/' },
      { name: 'Ahrefs — “ChatGPT’s most cited pages”', what: 'Page types among the 1,000 most-cited pages in ChatGPT', sample: 'Top 1,000 citations', date: 'October 2025', href: 'https://ahrefs.com/blog/chatgpts-most-cited-pages/' },
      { name: 'Ahrefs — “Do AI assistants prefer to cite fresh content?”', what: 'Age of content cited by AI assistants versus organic search', sample: '16.975 m cited URLs', date: 'July 2025', href: 'https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/' },
      { name: 'Ahrefs — llms.txt study', what: 'Requests for llms.txt files by AI crawlers', sample: '137,210 domains', date: '2025', href: 'https://ahrefs.com/blog/llmstxt-study/' },
      { name: 'SE Ranking (via Search Engine Journal)', what: 'Relationship between llms.txt and AI citations', sample: 'around 300,000 domains', date: '2026', href: 'https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/' },
      { name: 'Overthink Group with Amadora — B2B AI Citation Stats', what: 'Title patterns and domains of cited pages for B2B SaaS buying prompts (US market)', sample: 'around 1,260 prompts', date: 'July 2026', href: 'https://overthinkgroup.com/b2b-ai-citation-stats-2026-q2/' },
      { name: 'Rand Fishkin, SparkToro — “AIs are highly inconsistent when recommending brands”', what: 'Consistency of brand recommendations over repeated runs', sample: '2,961 runs, 12 prompts, 3 systems', date: 'January 2026', href: 'https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/' },
      { name: 'Johannes Beus, SISTRIX — “What do AI user-bot requests really tell you?” (German)', what: 'What server logs can and cannot say about AI visibility', sample: 'Analysis', date: 'March 2026, updated August 2026', href: 'https://www.sistrix.de/news/was-sagen-zugriffe-von-ai-userbots-auf-die-eigene-webseite-wirklich-aus/' },
      { name: 'SISTRIX — Ask SISTRIX: llms.txt (German)', what: 'Use of llms.txt by AI providers', sample: 'Assessment', date: 'August 2026', href: 'https://www.sistrix.de/frag-sistrix/ai-grundlagen/llms-txt/' },
      { name: 'Aimee Jurenka, Search Engine Land — “Schema markup and AI search: no hype”', what: 'Effect of schema markup on AI citations, incl. Search Atlas data', sample: 'Assessment', date: 'March 2026', href: 'https://searchengineland.com/schema-markup-ai-search-no-hype-472339' },
      { name: 'Chrissy Kunisch, ONE Beyond Search — “Step into Confidence: understanding and measuring AI search” (German)', what: 'Retrieval chain, formula, measurement logic', sample: 'Talk, SISTRIX Meetup', date: 'September 2026', href: 'https://onebeyondsearch.com/' },
    ],
    faqTitle: 'Frequently asked questions about GEO optimization in B2B',
    faq: [
      {
        q: 'Does GEO optimization replace classic search engine optimization?',
        a: 'No. GEO optimization builds on SEO: an AI system that searches the web draws its candidates from the same search indexes as Google and Bing. A page that does not rank for the question and its sub-questions never enters the candidate pool. GEO shifts the weighting — from the page to the passage, from links to brand mentions — and adds a few requirements, but replaces none.',
      },
      {
        q: 'Which text measures raise visibility in AI answers the most?',
        a: 'In the Princeton study (KDD 2024, 10,000 queries) three measures worked best: verbatim quotes from named experts (+41 %), statistics (+34 %) and cited sources (+28 %, and +115 % for pages ranked fifth). All three add something to the text that a model cannot generate itself. Keyword stuffing brought no gain.',
      },
      {
        q: 'Why does the AI cite passages rather than whole pages?',
        a: 'Because the grounding budget is limited. Google assembles roughly 2,000 words from all sources per query (dejan.ai, 7,060 queries); from a typical page, 377 words are selected in chunks of around 15 words. Every paragraph therefore has to stand on its own and answer one question completely — otherwise it is not extracted.',
      },
      {
        q: 'Does an llms.txt file help with GEO optimization?',
        a: 'Not measurably, as things stand. SE Ranking found no significant relationship between llms.txt and citations across roughly 300,000 domains, Ahrefs found across 137,210 domains that 97 % of the files were never requested, and according to Google none of the major providers uses the file. It does no harm, but it replaces no measure with evidence behind it.',
      },
      {
        q: 'How can GEO success be measured when every AI answer is different?',
        a: 'As a share over many runs rather than as a position. A fixed set of prompts is queried repeatedly and regularly; mention rate, citation rate and share of AI search are measured against competitors, each starting from a baseline measurement. A single visibility score from a single query measures noise — SparkToro found, across 2,961 runs, a chance below 1 in 100 of receiving the same list twice.',
      },
      {
        q: 'Why is a B2B company visible on Google but not in ChatGPT?',
        a: 'Because ChatGPT answers mostly from training data, while Google AI Overviews draw more on the live index. In the CodaAI study (449 companies, 7,184 AI answers), 35 % of companies with more than 100 top-10 Google rankings were completely invisible in ChatGPT; average visibility was 24.9 % in ChatGPT and 39.4 % in Google AI Overviews. A niche manufacturer with 200 employees simply is not present in model knowledge — it only gets into the answer through grounding and through mentions on third-party sites.',
      },
      {
        q: 'Is GEO optimization worthwhile for niche providers in mid-sized B2B?',
        a: 'Especially there. In the CodaAI study, 26 % of companies were not mentioned even for the market-overview question about their own category, and for 47 % the AI recommended competitors by name instead. The narrower the niche, the shorter the AI’s candidate list — and the larger the share of a single mention. Where companies are mentioned, they sit at position 1.8 on average; the answer is short, and the first two places decide.',
      },
      {
        q: 'Do brand mentions without a link count for AI visibility?',
        a: 'Yes, and they count more than backlinks. Ahrefs measured for 75,000 brands that brand mentions on the web correlate at 0.664 with mentions in Google AI Overviews, backlinks at only 0.218. The AI does not care whether a piece of information comes from your own website or from third-party sites — what matters is a consistent brand picture across all sources.',
      },
    ],
    cta: {
      kicker: 'From the guide to the number',
      h2: 'Where does your company stand today in the AI answers of your industry?',
      p: 'The Digital Visibility Audit measures, on real buyer questions, whether ChatGPT and Google AI Overviews mention your company, who is named instead — and on which of the three levels the cause lies.',
    },
    headline: 'GEO optimization for B2B companies: how mid-sized firms get named and cited in AI answers',
    tags: ['GEO optimization', 'Generative Engine Optimization', 'AI visibility', 'B2B', 'mid-sized companies', 'ChatGPT', 'Google AI Overviews'],
  },
};

// ── Markdown-Fassung ──────────────────────────────────────────────────────────
// Dieselbe Substanz als Markdown für /wissen/geo-optimierung.md (md-variant.ts).

function htmlToMd(html: string): string {
  return html
    .replace(/<a href="([^"]+)">([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<\/?strong>/g, '**')
    .replace(/<\/?em>/g, '_')
    .replace(/<\/?code>/g, '`')
    .replace(/<[^>]+>/g, '');
}

function blockToMd(b: Block): string {
  switch (b.type) {
    case 'p':
      return htmlToMd(b.html);
    case 'h3':
      return `### ${b.text}`;
    case 'ul':
      return b.items.map((i) => `- ${htmlToMd(i)}`).join('\n');
    case 'ol':
      return b.items.map((i, n) => `${n + 1}. ${htmlToMd(i)}`).join('\n');
    case 'table': {
      const head = `| ${b.head.join(' | ')} |`;
      const sep = `| ${b.head.map(() => '---').join(' | ')} |`;
      const rows = b.rows.map((r) => `| ${r.map(htmlToMd).join(' | ')} |`);
      return [`**${b.caption}**`, '', head, sep, ...rows].join('\n');
    }
    case 'quote':
      return `> „${b.text}“\n> — ${b.name}, ${b.role}`;
    case 'stats':
      return b.items.map((s) => `- **${s.value}** ${s.label} (${s.source})`).join('\n');
    case 'callout':
      return `> **${b.title}:** ${htmlToMd(b.html)}`;
    case 'diagram':
      return '';
  }
}

export function geoPageMarkdown(lang: GeoLang): string {
  const p = GEO_PAGE[lang];
  const parts: string[] = [];
  parts.push(`## ${p.brief.title}`, '', p.brief.items.map((i) => `- ${i}`).join('\n'), '');
  for (const s of p.sections) {
    parts.push(`## ${s.h2}`, '');
    for (const b of s.blocks) {
      const md = blockToMd(b);
      if (md) parts.push(md, '');
    }
  }
  parts.push(`## ${p.sourcesTitle}`, '', p.sourcesIntro, '');
  parts.push(`| ${p.sourcesHead.join(' | ')} |`, `| ${p.sourcesHead.map(() => '---').join(' | ')} |`);
  for (const s of p.sources) {
    const name = s.href ? `[${s.name}](${s.href})` : s.name;
    parts.push(`| ${name} | ${s.what} | ${s.sample} | ${s.date} |`);
  }
  parts.push('', `## ${p.faqTitle}`, '');
  for (const f of p.faq) parts.push(`### ${f.q}`, '', f.a, '');
  return parts.join('\n');
}
