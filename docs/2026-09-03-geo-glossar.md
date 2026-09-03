# 2026-09-03 — GEO-Glossar als Themen-Cluster unter /wissen/geo-glossar/

## Ausgangspunkt

Oli hat aus dem SISTRIX-Meetup-Vortrag „Step into Confidence: AI Search verstehen und richtig messen" (Chrissy Kunisch, ONE Beyond Search, September 2026) zwei Markdown-Übersichten erstellen lassen — ein Begriffsglossar und eine Maßnahmenübersicht (Ordner `SEO-GEO Wissen`). Daraus entstand die Frage, wie das Glossar auf codaai.ai so implementiert wird, dass es auf die Auffindbarkeit in KI-Antworten einzahlt. Entscheidungen Oli: Hub-Struktur statt Einzelseite, alle ~50 Begriffe im ersten Wurf, Autorin Anja Miebach (passt zur Diskretionsregel für Oli bis 30.10.2026), URL-Pfad `/wissen/geo-glossar/`.

## Warum eine Seite je Begriff

KI-Systeme extrahieren Passagen, nicht Seiten. Eine Glossarseite mit 55 Begriffen konkurriert bei der Frage „Was ist Grounding?" mit einer semantischen Nähe, die von 54 anderen Begriffen verwässert wird. Eine Seite, die nur Grounding behandelt, ist im Initial Retrieval der klarere Kandidat und im Re-Ranking ein sauberer Chunk. Über das Cluster hinweg entsteht Topical Authority für das Themenfeld, in dem CodaAI verkauft — und Query Coverage für die Fan-out-Queries, die ein LLM zu „KI-Sichtbarkeit" erzeugt.

Ehrliche Einordnung, die Oli vorab bekommen hat: Definitionsfragen sind Awareness-Phase (★ von ★★★ in Chrissys Bewertung). Das Glossar bringt Citations, Topical Authority und Vertrauen, selten direkte Leads. Der Business-Case ist, dass es die Seiten stützt, die Leads bringen.

## Was gebaut wurde

**Content Collection `glossar`** (`src/content.config.ts`): eine Markdown-Datei je Begriff unter `src/content/glossar/`. Frontmatter: `title`, `seoTitle` (≤ 32 Zeichen, weil „ – GEO-Glossar | CodaAI" 24 kostet), `shortDefinition` (≤ 240; Lead, Übersicht, Schema), `synonyms` (→ `alternateName`), `category` (7 Gruppen), `stufe` (1/2/3 → Anker auf `/digital-visibility/`), `related` (Slugs → Chips), `pubDate`/`updatedDate`, `faq` (2 je Begriff), `noindex`.

**Gemeinsame Daten** (`src/data/glossar.ts`): Gruppen mit Intro in der Reihenfolge „Weg eines Inhalts in die KI-Antwort" (Grundlagen → Websuche & Grounding → Vom Ranking zur Zitierung → Content → Technik → Offpage → Messung), `TERM_ORDER` für die didaktische Reihenfolge innerhalb der Gruppen (nicht alphabetisch — Grundlage vor Ableitung), `STUFE_ANCHOR`, `GLOSSAR_AUTHOR` mit derselben `@id` wie im Organization-Schema (`/co-create/#anja-miebach`).

**Hub** `src/pages/wissen/geo-glossar/index.astro`: Kippsatz-H1 „Die KI-Suche hat ihre eigene Sprache. / Hier verstehen Sie jedes Wort.", Intro mit `data-speakable`, Gruppen-Chips, je Gruppe eine `<dl>` (Begriff/Definition-Paar ist genau das Format, das extrahiert wird), Audit-CTA im Band. Schema `DefinedTermSet` mit allen Begriffen als `hasDefinedTerm` + `BreadcrumbList`. **Kein** FAQPage auf dem Hub (Regel 03.08.2026).

**Begriffsseite** `[slug].astro`: H1 = Begriff, einzeilig und dunkel (Einwortseite im Sinne der Kippsatz-Regel — kein Farbwechsel ohne Wendung). Lead = `shortDefinition` (`data-speakable`), Synonymzeile, Autorinnenleiste mit Bild/Funktion, „Stand"-Datum, Lesezeit, Stufen-Badge als Link auf den Anker. Body aus Markdown mit den Blog-Prose-Klassen (Links auf `--cta-accessible`, nicht `--cta` — 6,9:1). Verwandte Begriffe als Chips, FAQ-Block, Sidebar (Stufe → Digital Visibility, Zurück zur Übersicht), Audit-CTA im Band. Schema: `DefinedTerm` (in `DefinedTermSet`), `Article` mit Autorin, `dateModified`, `speakable`, `isPartOf`; `BreadcrumbList`; `FAQPage`. Meta-Description wird aus `shortDefinition` auf ≤ 158 Zeichen gekürzt (erster Satz, sonst Wortgrenze).

**Textregeln** (in `content.config.ts` dokumentiert): erster Absatz deklarative Definition, die mit dem Begriff beginnt (BLUF + Entity Echoing); H2 im Frageformat („Wie funktioniert X?", „Warum ist X für die KI-Sichtbarkeit wichtig?", „Was bedeutet das für Ihre Website?"); jeder Absatz ohne Kontext verständlich; keine Weichmacher; Tabellen, wo Vergleiche sind (Promptset-Kategorien, SEO- vs. LLM-Tracking, Contentformate, Metriken).

**Zahlen:** Studienzahlen nur im Wortlaut von `/studie/` und `llms.txt` (55 % / 47 % / schwache Korrelation), an fünf Stellen (GEO, Mention, Mention Rate, Document Relevance, Nullmessung als Audit-Bezug). Chrissys Zahlen (4× Reddit, 3× Reviews, TTFB 500–800 ms) stehen mit expliziter Zuschreibung auf den Vortrag. Fremdstudien (Ahrefs, OtterlyAI, SISTRIX, dejan.ai, growth.pro, Search Engine Land, almcorp) sind namentlich genannt, Zahlen daraus nur qualitativ oder mit dem Wert, der bereits im Blog belegt ist. Regel „nichts erfinden" eingehalten.

**Drumherum:** Footer-Link „GEO-Glossar" in der DE-Linkliste (Hauptnavigation unverändert — Beschluss 28.07.: vier Punkte; kein EN-Gegenstück). `public/llms.txt` um Hub-Eintrag und Abschnitt „GEO-Glossar (Deutsch)" erweitert, Stand-Zeile auf 03.09.2026. `src/pages/llms-full.txt.ts` gibt alle Begriffe mit Definition, Body und FAQ aus. `astro.config.mjs`: `sourceFilesFor` kennt `wissen/geo-glossar/<slug>` → `src/content/glossar/<slug>.md` (sonst hätte jede Begriffsseite das Datum des Templates gemeldet); Hub zusätzlich an `src/data/glossar.ts` gekoppelt.

## Build und Prüfung

`npm ci --legacy-peer-deps` (wie im Deploy-Workflow; ohne das Flag bricht `@astrojs/tailwind` gegen Astro 6 ab). Build: **104 Sitemap-URLs** (48 + 55 Begriffe + Hub), SEO-Wächter grün — 138 hreflang-Ziele, 544 JSON-LD-Knoten, 282 FAQ-Fragen jede genau einmal. Vor dem Commit meldete der Wächter 56 URLs ohne `lastmod` (kein Git-Datum) — erwartet, nach dem Commit gefüllt. Playwright-Screenshots Hub/Begriff (1280 px) und Begriff (390 px): kein horizontales Scrollen, Kippsatz einzeilig, Tabellen im Prose-Container.

Stolpersteine: Typografische Anführungszeichen „…" in YAML-Frontmatter brechen den Parser, wenn das schließende Zeichen das ASCII-`"` ist — in 20 Dateien per Skript auf „…“ (U+201C) umgestellt. Die ersten Kurzdefinitionen lagen bei 170–230 Zeichen; statt 55 Texte zu kürzen wurde das Schema auf 240 gesetzt und die Meta-Description im Template gekürzt.

## Sync-Weg

Gebaut wurde im Cloud-Container (frischer Clone, kein EPERM im Vite-Cache), die Dateien als `tgz` in den lokalen Ordner übertragen und dort entpackt; Commit und Push aus dem lokalen Repo mit dem Deploy-Key nach Abschnitt 1a der CLAUDE.md. Nebenbei: eine verwaiste `.git/index.lock` vom Verbindungsabbruch entfernt, `refs/remotes/origin/main` war seit dem 04.08. nicht mehr aktualisiert (zeigte „ahead 14", tatsächlich identisch mit GitHub).

## Offen / nächste Schritte

- **Nullmessung** mit ~20 Definitions-Prompts in ChatGPT, Perplexity, Gemini vor der Indexierung; danach monatlich Citation Rate + Mentions, GSC „Generative KI"-Report, GPTBot-Zugriffe in den Logfiles.
- **Rückverlinkung aus dem Blog:** Glossar verlinkt auf `ai-crawler-server-performance-geo` und `youtube-ki-sichtbarkeit-b2b`; die Artikel verlinken noch nicht zurück auf TTFB / LLM-Crawler / YouTube-Präsenz.
- **EN-Version** (Welle 2) — dann Sprachpaare in `i18n-routes.ts` und EN-Footer-Link.
- **Studiendaten je Begriff:** aktuell nur die drei veröffentlichten Kernzahlen; weitere Kennzahlen aus dem Datensatz (z. B. Anteil Drittquellen bei Citations) würden den Information Gain einzelner Begriffe erhöhen.
- Indexierung in der Search Console beobachten (55 neue URLs, Sitemap-Lesung nach dem Deploy).

## Nachtrag (abends): Englische Fassung LIVE

Auf Olis Wunsch direkt im Anschluss: alle 55 Begriffe plus Hub auf Englisch unter **`/en/knowledge/geo-glossary/`**, als hreflang-Paare mit der deutschen Fassung verknüpft (56 neue Zeilen in `src/lib/i18n-routes.ts`, erzeugt aus dem `de:`-Feld jeder EN-Datei).

**Übersetzung:** fünf parallele Übersetzungsläufe (je 11 Begriffe) gegen ein gemeinsames Briefing, das die Regeln aus `en-relaunch-2026-08-04/KONVENTIONEN.md` trägt — EN-GB, „it" für die KI, Glossar (tier, building block, Google AI Overviews, buyer question, mid-sized B2B companies, base fee, visibility commitment), Verbotsliste, Zahlenformat, Studienname „AI Blind Test 2026" mit „449 companies in Germany". Slug-Karte DE→EN steht im Briefing und in `TERM_ORDER.en` (`src/data/glossar.ts`); übersetzte Slugs u. a. `modellwissen→model-knowledge`, `websuche→web-search`, `kosinus-aehnlichkeit→cosine-similarity`, `entitaet→entity`, `promptset→prompt-set`, `nullmessung→baseline-measurement`, `quellenanalyse→source-analysis`, `logfiles→log-files`, `llm-crawler→llm-crawlers`. Nachkontrolle per Skript: YAML, `lang`/`de`, Related- und Body-Links, FAQ-Eindeutigkeit, keine Umlaute, keine Ausrufezeichen, kein „programme".

**Technik:** Schema um `lang` (Default `de`) und `de` erweitert; EN-Dateien liegen in `src/content/glossar/en/` (Collection-ID `en/<slug>`, `termSlug()` schneidet das Präfix ab). Hub und Begriffsseite sind jetzt **eine Komponente je Typ** (`src/components/glossar/GlossarHub.astro`, `GlossarTerm.astro`) mit `copy`-Objekt je Sprache; die vier Seitendateien unter `src/pages/wissen/geo-glossar/` und `src/pages/en/knowledge/geo-glossary/` sind nur noch Wrapper. `GLOSSAR_CATEGORIES`, `TERM_ORDER`, `STUFE_ANCHOR` (EN-Anker `#readable`/`#sources`/`#become-the-source` laut Konventionen) und Autorin (`Founder & Owner`) je Sprache. EN-Kippsatz: „AI search speaks its own language. / Here you understand every word." Footer-Link „GEO Glossary" (EN), `llms.txt` mit EN-Eintrag und -Abschnitt, `llms-full.txt` gibt beide Sprachen aus, `astro.config.mjs` kennt das EN-lastmod-Mapping.

**Build:** 160 Sitemap-URLs (48 + 56 DE + 56 EN), Wächter grün — 474 hreflang-Verweise, 878 JSON-LD-Knoten, 392 FAQ-Fragen eindeutig. Sprachumschalter springt seitengenau zwischen `/wissen/geo-glossar/<de>/` und `/en/knowledge/geo-glossary/<en>/`.

**Search Console:** Sitemap neu eingereicht und Indexierung für die beiden Hub-Seiten und die wichtigsten Begriffe beantragt (Details im Chat-Protokoll; Tageskontingent für „Indexierung beantragen" liegt bei rund zehn URLs je Property, der Rest läuft über die Sitemap).

## Nachtrag 2: Leistungsumfang `/digital-visibility/` mit dem GEO-Modell abgeglichen

Auf Olis Wunsch vor dem ersten Blogartikel: die 14 Bausteine gegen das Modell aus Vortrag und Glossar geprüft (Abgleich in `umbau-digital-visibility/Leistungsumfang-Abgleich-Glossar-2026-09-03.md`). Ergebnis: alle Ebenen abgedeckt, Lücken in der Tiefe von drei Bausteinen. **Fünf Beschreibungssätze geändert, DE und EN, keine Preise, keine Stufen, keine neuen Bausteine:**

| Baustein | Änderung |
|---|---|
| 1 · Maßnahmenplan | benennt jetzt die Fan-out-Fragen als Themenliste (Query Coverage) |
| 3 · Fachbeiträge | „nach den Extraktionsregeln der KI-Suche: Antwort zuerst, jede Passage für sich zitierfähig, jede Zahl mit Quelle" |
| 4 · Aktualisierung | „und auf Passagenebene umgebaut — Frage-Überschriften, direkte Antworten, aktuelle Zahlen" |
| 6 · Monatliche Messung | vom Zähler („acht Fragen, wer genannt wird") zum Messverfahren: Fragenset markenneutral + markenspezifisch, mehrfach je Monat, ChatGPT/Google AI/Perplexity/Gemini, Nennung + Zitierung + Tenor + Korrektheit. **Ankerzahl getauscht:** das Preisargument „Monitoring-Tools 89–499 €" fällt weg, Beleg ist jetzt die Nicht-Determiniertheit + die eigene Studie |
| 11 · Wissensdatenbanken → **„Wissensdatenbanken und Markenkonsistenz"** | + einheitliche Beschreibung auf allen Profilen, damit die KI das Unternehmen als eine Entität liest (ICON-Schlüssel mitgezogen) |
| 14 · Wettbewerbs-Beobachtung | + Quellenanalyse: welche Quellen zitiert die KI — die Zielliste für die Offpage-Bausteine |

Die „8 Fragen" bleiben überall dort stehen, wo sie die Studien- und Audit-Methodik beschreiben (Startseite, /studie). `i18n/de.json`/`en.json` führen Baustein 11 weiter unter dem alten Namen — die Blöcke werden von keiner Seite gerendert (CLAUDE.md, Backlog). `Service`-Schema übernimmt die neuen Sätze automatisch (`description: b.tut`).

### Korrektur (Beschluss Oli, kurz danach): erweiterte Messung gehört in Stufe 2

Die erweiterte Messung (vier Systeme, markenspezifische Fragen, Zitierung, Tenor, Korrektheit, mehrere Durchläufe) ist Aufwand und muss sich preislich niederschlagen — sie gehört nicht in die Basis-Stufe. Umsetzung: **Baustein 6 · Monatliche Messung** zurück auf die Basis („Ihre acht Einkäuferfragen aus dem Audit, jeden Monat in ChatGPT und der Google-KI gestellt — Sie sehen, wer genannt wird und wie sich Ihr Anteil entwickelt", Beleg: Nicht-Determiniertheit + Studie, kein Preisargument mehr). **Neuer Baustein 11 · Erweiterte KI-Messung** in Stufe 2 (nach YouTube): „Ihr Fragenset wächst um markenspezifische Fragen und wird jeden Monat mehrfach in ChatGPT, Google AI, Perplexity und Gemini gestellt: wer genannt wird, wer zitiert wird, mit welchem Tenor — und ob stimmt, was die KI über Sie sagt." Damit **15 Bausteine (6 / 11 / 15)** statt 14 (6 / 10 / 14). Nachgezogen: Zähler und Abdeckungsbalken auf `/digital-visibility/` (DE+EN), Stufen-Intro Stufe 2 („Fünf Bausteine …"), `Service`-Schema-Beschreibung, `/preise` und `/en/pricing` (11 / 15 Bausteine), FAQ („fünfzehn"/„fifteen"), Glossar-Sidebar, `llms.txt`, `llms-full.txt`. Piktogramm für den neuen Baustein (Linienchart mit zwei Punkten) in beiden ICON-Tabellen. Matrix baut sich aus den Stufen und hat automatisch 15 Zeilen. ⚠️ Historische Einträge in CLAUDE.md und die Referenzdatei `leistungsumfang-14-bausteine.html` bleiben unverändert — sie beschreiben den Stand ihrer Zeit.
