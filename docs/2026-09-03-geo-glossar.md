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
