# SEO-Report KW 41 — Umsetzung der Punkte 4 und 5

**Stand:** 05.10.2026 · **Grundlage:** `seo-reports/2026-10-05-codaai-seo-report.md` · **Status:** im Arbeitsstand, **nicht committet, nicht gepusht**

## 1 · Meta-Descriptions der Blogartikel (Report-Punkt 4)

Alle 30 Blogartikel (15 DE, 15 EN) geprüft. 12 lagen unter 140 Zeichen und wurden neu getextet; jetzt liegen **alle 30 zwischen 140 und 160 Zeichen**. Nur Frontmatter geändert, Text unverändert — deshalb kein neues `updatedDate`.

| Artikel | vorher | nachher |
|---|---|---|
| blogartikel-schreiben-lassen-kosten | 129 | 153 |
| chatgpt-seo-perplexity-sichtbarkeit | 139 | 159 |
| content-marketing-mittelstand-ki | 122 | 146 |
| ki-sichtbarkeit-praxis-chatgpt-empfehlung | 131 | 157 |
| redaktionsplan-ki-erstellen | 122 | 156 |
| en/ai-content-marketing-for-smb | 137 | 150 |
| en/ai-visibility-chatgpt-recommendation-practice | 117 | 157 |
| en/brand-mentions-third-party-sites-ai | 133 | 157 |
| en/chatgpt-seo-perplexity-visibility | 126 | 155 |
| en/comparison-articles-vendor-lists-ai | 122 | 154 |
| en/marketing-agency-alternative-ai | 123 | 157 |
| en/reduce-marketing-costs-ai-content | 135 | 156 |

## 2 · Glossar ausbauen und verlinken (Report-Punkt 5)

### 2.1 Ausgebaute Begriffsseiten (DE + EN, `updatedDate: 2026-10-05`)

| Seite | Ranking laut Report | Suchvolumen (DE) | Neu auf der Seite |
|---|---|---|---|
| Kosinus-Ähnlichkeit / cosine-similarity | 62 („cosine similarity") | 1.900 (DE) · 6.600 (US) | Formel, Rechenbeispiel als Tabelle, Python-Code, Abgrenzung Skalarprodukt/euklidische Distanz/Kosinus-Distanz, Hybrid Retrieval (BM25), Test von Mike King (0,6481 → 0,7477), zwei neue FAQ |
| Grounding Page | 92 („grounding pages") | 1.000 | Bausteine als Tabelle, offener Standard (groundingpage.com, v1.6), Abgrenzung zur Über-uns-Seite/Entity Home (Dixon Jones), Abschnitt „Pflicht oder Hype?" (CAMPIXX 2026), neue FAQ |
| Chunking | 79 („was ist chunking"), Sistrix 79 („chunking") | 1.000 | Chunking-Methoden, dokumentierte Chunk-Größen (OpenAI 800/400, Google RAG Engine 1.024/256, AWS Bedrock 300/20 % — Quelle Spriestersbach/AFAIK), Google-Position gegen Mikro-Chunks (Danny Sullivan, Jan. 2026), Passage Indexing |
| TTFB | 100 („ttfb") | 210 | Grenzwerte nach web.dev (≤ 0,8 s gut, > 1,8 s schlecht) neben dem KI-Richtwert, Bestandteile der TTFB, curl-Messung, Logfiles, fünf Hebel zum Senken, FAQ „Ist die TTFB ein Core Web Vital?" |

Alle acht Seiten haben ein eigenes `seoTitle` (≤ 32 Zeichen) und eine eigene Meta-Description.

### 2.2 Neues Feld `seoDescription` im Glossar

`src/content.config.ts` + `src/components/glossar/GlossarTerm.astro`: optionales Feld `seoDescription` (140–160 Zeichen). Ohne Angabe gilt weiter die automatische Ableitung aus `shortDefinition`. Grund: Bei Chunking und Grounding Page wurde die Description bisher mit „…" abgeschnitten.

**Offen:** 20 weitere Glossarseiten haben eine abgeleitete Description unter 140 Zeichen (u. a. citation-rate, token, mention, crawl-budget, embedding, quellenanalyse). Mit dem neuen Feld in einem Durchgang lösbar.

### 2.3 Interne Verlinkung

Vorher hatten die vier Seiten **keinen einzigen Link aus einem Blogartikel**, die Grounding Page auch keinen aus einem anderen Glossartext.

| Ziel (DE/EN) | Links aus Glossartexten | Links aus Blogartikeln |
|---|---|---|
| Kosinus-Ähnlichkeit | 3 → 4 (neu: Re-Ranking) | 0 |
| Grounding Page | 0 → 4 (Entität, konsistente Markenbeschreibung, llms.txt, Modellwissen) | 0 → 1 (Startseiten-Artikel, neuer Absatz) |
| Chunking | 4 → 6 (Listicles, Topical Authority) | 0 → 2 (Vergleichsartikel, Empfohlen-werden-Artikel) |
| TTFB | → 3 (neu: LLM-Crawler) | 0 → 1 (AI-Crawler-Artikel) |

Durch die Blog-Links zeigen die Glossarseiten jetzt automatisch den Kasten „Vertieft in" mit dem jeweiligen Artikel.

### 2.4 Prüfung

Build in einer Kopie grün (188 Seiten), `check-seo-invariants` ohne Befund (hreflang, Sitemap, JSON-LD, 440 FAQ-Fragen je genau einmal), `check-blog-links` 0 verwaiste Artikel.

## 3 · Hinweis zum Commit (Datumsregel)

Der Pre-Commit-Hook setzt `updatedDate` bei **jeder** Textänderung. Bei diesen Dateien besteht die Änderung nur aus einem gesetzten Link (keine inhaltliche Aktualisierung):

- Glossar: listicles, topical-authority, llm-crawler, re-ranking (DE + EN)
- Blog: ai-crawler-server-performance-geo, vergleichsartikel-anbieterlisten-ki, in-chatgpt-als-anbieter-empfohlen-werden (DE + EN-Pendants)

Vorschlag: zwei Commits — Inhalte normal, reine Link-Dateien mit `--no-verify`, damit deren Datum ehrlich bleibt. Echte Ergänzungen (ganzer Satz/Absatz) bekommen das neue Datum zu Recht: entitaet, konsistente-markenbeschreibung, llms-txt, modellwissen (DE + EN), chatgpt-quellen-startseite-markenkonsistenz (DE + EN).

## 4 · Nebenbefund

`blog/ai-crawler-server-performance-geo` (DE + EN) nennt als Google-Empfehlung „unter 600 ms akzeptabel, unter 200 ms gut". Google (web.dev) nennt 0,8 s als Grenze für „gut". Dazu stützt sich der Artikel auf Am I Cited („40–60 % höhere Zitierrate unter 200 ms") — eine schwache Quelle. Der Artikel steht ohnehin auf der Umbauliste; beim Umbau korrigieren.

## 5 · Vorschläge für neue Glossarbegriffe

Grundlage: GEO-Quellenatlas (Sicherung 27.09.2026, 122 Quellen) und die geprüften Aussagen der Wissensdatenbank (3.802 Aussagen aus 254 Dokumenten, Runde 1) — gezählt wurde, in wie vielen Aussagen und Dokumenten ein Begriff vorkommt. Suchvolumen: Google Ads, Monatsdurchschnitt, Deutschland (US zum Vergleich). Der Sonntagslauf vom 04.10. ist in der lokalen Sicherung noch nicht enthalten.

**Einordnung vorweg:** Die Begriffe mit fünfstelligem Volumen (AI Mode, AI Overviews, RAG, Vector Database) werden in den Top 10 von IBM, AWS, Google & Co. besetzt. Bei 21 verweisenden Domains ist dort kurzfristig kein Top-10-Platz realistisch. Der Wert liegt im eigenen Blickwinkel („Was bedeutet das für die KI-Sichtbarkeit?"), in Long-Tail-Anfragen und darin, dass KI-Systeme eine klar definierende Seite zitieren.

### Priorität A — nächste Runde (Volumen + Atlas-Beleg + Lücke im Glossar)

| Begriff (DE / EN-Slug) | Suchvolumen DE | US | Atlas: Aussagen / Dokumente | Kategorie | Bemerkung |
|---|---|---|---|---|---|
| Google AI Mode / KI-Modus (`ai-mode`) | 18.100 („ki modus google") + 6.600 | 301.000 | 163 / 74 | grounding | Größte Lücke: Systemname, den Einkäufer selbst nutzen |
| AI Overviews / KI-Übersicht (`ai-overviews`) | 1.900 | 110.000 | 340 / 106 | grounding | Glossar hat nur „AI Overview Citation Rate", nicht den Grundbegriff |
| Retrieval-Augmented Generation, RAG (`rag`) | 3.600 + 1.000 („rag ki") + 480 („was ist rag") | 8.100 | 27 / 20 | grundlagen | Technischer Begriff hinter „Grounding"; beide Seiten verlinken |
| Knowledge Graph (`knowledge-graph`) | 3.600 | 9.900 | 28 / 15 | grundlagen | Bindeglied zu Entität, Wikidata, Grounding Page |
| KI-Halluzination (`halluzination` / `ai-hallucination`) | 1.300 + 720 | 14.800 | 17 / 12 | grundlagen | Starker Verkaufsbezug: „KI erfindet Fakten über Ihre Firma" → Grounding Page |
| Strukturierte Daten / Schema.org (`strukturierte-daten` / `structured-data`) | 480 + 480 („schema markup") | 2.900 + 1.600 | 72 / 40 | technik | Im Atlas sehr gut belegt, inkl. Gegenpositionen (WordLift: Chunker zerschneidet JSON-LD) |
| Vektordatenbank (`vektordatenbank` / `vector-database`) | 1.000 + 1.600 (EN-Begriff) | 12.100 | 11 / 10 | grundlagen | Bisher nur als FAQ im Embedding-Eintrag; ergänzt den Cluster Embedding → Kosinus → Chunking |
| WebMCP (`webmcp`) | 880 | 3.600 | 27 / 7 | technik | Neuer Standard, wenig Konkurrenz — schneller Gewinn; Quellen: Google (Kulikowski), Marie Haynes |

### Priorität B — gute Passung, mittleres Volumen

| Begriff | Suchvolumen DE | US | Atlas | Bemerkung |
|---|---|---|---|---|
| BM25 / Hybrid Retrieval | 1.000 („bm25") + 90 | 5.400 + 320 | 4 / 4 | Direkte Ergänzung zur Kosinus-Ähnlichkeit (dort schon angerissen) |
| Agentic Commerce (ACO) | 1.300 (CPC 22 €) | 5.400 | 3 / 1 (+15 Treffer im Atlas) | Für B2B-Mittelstand eher Randthema; Olaf Kopp als Quelle |
| KI-Agent / Agentic Search | 2.900 + 8.100 („ai agent") | 49.500 | 71 / 39 | Breite, gemischte Suchintention (viele wollen Agenten bauen) — als „KI-Agenten in der Suche" eingrenzen |
| Semantische Suche | 480 + 480 | 5.400 | 1 / 1 | Cluster-Ergänzung, Atlas dünn |
| IndexNow | 320 | 1.000 | 5 / 4 | CodaAI nutzt es selbst (Praxisbeispiel aus dem eigenen Workflow) |
| Kontextfenster / Context Window | 90 + 320 | 1.900 | 7 / 6 | Passt neben „Token" |
| SynthID / KI-Wasserzeichen | 1.600 | 5.400 | 8 / 2 | Bezug zu EU AI Act und der eigenen Bildregel; Passung zu GEO mittel |
| AEO (Answer Engine Optimization) | 3.600 („aeo") / 170 | 2.400 | 50 / 29 | **Vorsicht:** „AEO" ist im Deutschen auch der Zoll-Status „Authorised Economic Operator" — Volumen stark verzerrt. Besser AEO, LLMO, GAIO als Synonyme in den GEO-Eintrag und dort abgrenzen |

### Ausbau bestehender Einträge statt neuer Seiten

| Bestehender Eintrag | Ergänzen um | Atlas |
|---|---|---|
| Share of AI Search | „Share of Voice" als Synonym (320 DE, 880 US), Definitionen von Searchable und Dan Petrovic | 36 / 24 |
| Zero-Click | „Google Zero" (210 DE) | 2 / 2 |
| LLM-Crawler | Google-Extended als Steuer-Token, Bot-Klassen Training / Suche / Agent (Cloudflare, Seokratie) | 8 / 7 + robots.txt 42 / 25 |
| Common Crawl | Harmonic Centrality / CC Rank | 16 / 3 |
| Citation | „Retrieved vs. Cited" (Lily Ray) | 11 / 7 |
| Promptset | Unbranded Prompt | 21 Atlas-Treffer |

### Priorität C — Fachbegriffe ohne Suchvolumen, aber stark im Atlas (Profil, Coaching-Material)

Entity Home (Dixon Jones) · Citation Share im Bing-KI-Bericht (40 / 26) · LLM Readability (15 / 4, umstritten — Kopp vs. Spriestersbach, gut für einen ausgewogenen Eintrag) · Accessibility Tree (18 / 7) · Korroboration (15 / 7) · Primary Bias (Petrovic, Ranger) · Dark Search / Dark Chat (Peec AI) · Cost of Retrieval (Koray Tuğberk Gübür) · Zitationsabsorption (Zhang, He, Yao).

### Empfehlung

1. Nächste Runde: **AI Mode, AI Overviews, RAG, Knowledge Graph** (DE + EN) — höchste Nachfrage, gute Belege, schließt die größten Lücken.
2. Danach: Halluzination, Strukturierte Daten, Vektordatenbank, WebMCP.
3. Die sechs Ausbau-Ergänzungen nebenbei mitnehmen — sie stärken bestehende Seiten ohne neue URL.

## 6 · Umsetzung, zweiter Schritt (05.10.2026, Freigabe Oli)

- **20 neue Begriffe, DE + EN (40 Seiten):** Google AI Mode, AI Overviews, Citation Share, IndexNow, SynthID, Retrieval-Augmented Generation, Vektordatenbank, Hybrid Retrieval, Semantische Suche, Kontextfenster, Knowledge Graph, Entity Home, Korroboration, KI-Halluzination, Strukturierte Daten, WebMCP, KI-Agenten, Agentic Commerce, Accessibility Tree, LLM Readability. Grundlage: Aussagen des Quellenatlas; Produktfakten (Starttermine, Spezifikationen, Rechtsstand) an Primärquellen geprüft. Sprachpaare in `src/lib/i18n-routes.ts`, Begriffszahl 56 → 76 in `llms.txt`, GEO-Leitfaden und Pillar-Seitenleiste.
- **Bewusst nicht angelegt** (zu dünne Belege, 1–2 Quellen): Primary Bias, Dark Search, Cost of Retrieval, Zitationsabsorption.
- **Ausbau bestehender Einträge (DE + EN):** Zero-Click (+ Google Zero), LLM-Crawler (+ Bot-Klassen, Google-Extended als Steuer-Token; FAQ korrigiert), Common Crawl (+ Harmonic Centrality), Citation (+ Retrieved vs. Cited), Promptset (+ Fragen ohne Markennamen), GEO (+ AEO, LLMO, GAIO). Share of Voice stand bereits als Synonym bei Share of AI Search.
- **Verlinkung:** 48 neue `related`-Verweise von bestehenden Begriffen auf die neuen.
- **Meta-Descriptions:** 18 weitere Glossarseiten mit eigener `seoDescription` — damit liegt keine Glossarseite mehr unter 140 Zeichen.
- Build: 228 Seiten, SEO-Invarianten grün (618 hreflang-Verweise, 558 FAQ-Fragen je einmal), 3.977 interne Links ohne Fehlziel.
