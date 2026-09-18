# Pillar-Seite „GEO-Optimierung" — Sessionprotokoll 18.09.2026

**Stand:** live seit 18.09.2026 — Commit `4cb1b18`, Push über den Deploy-Key, GitHub-Pages-Deploy grün, DE/EN/.md je HTTP 200. Nebenbefund: der Blog-Commit `62835ca` (drei Nachfrage-Artikel) lag noch unpusht im Repo und ging mit demselben Push erstmals live.
**Seiten:** `/wissen/geo-optimierung/` · `/en/knowledge/geo-optimization/` · je eine `.md`-Fassung.

## Anlass

Abgleich mit der Landingpage tripuls.de/geo-optimierung und dem zugehörigen IHK-Artikel
(Wirtschaft Nordhessen 7/8 2026). Befund: tripuls hat eine *Wissensseite mit Agentur-CTA*, die für
die Anfrage „Was ist GEO und was wirkt?" vollständig zitierbar ist. Bei uns lag dasselbe Wissen auf
55 Glossarseiten, der Studie und Blogartikeln verteilt — keine einzelne Seite, die ein KI-System dafür
zitieren könnte. Übernommen wurden fünf Muster, nicht die Seite: Pillar mit Sprungmarken,
SEO-vs-GEO-Tabelle, „was wirkt / was nicht" mit Effektgrößen, benannte Expertenzitate, sichtbares
Datum. **Nicht** übernommen: der Akronym-Zoo, Fremdzahlen ohne eigene Daten, die schwache
Conversion-Führung (ein CTA am Ende, kein Angebot).

Zweite Quelle: Chrissy Kunischs SISTRIX-Meetup-Deck (September 2026, `SEO-GEO Wissen/`) mit rund
35 Quellen im Anhang — Retrieval-Kette, Formel, Messlogik.

## Entscheidungen (Oli, 18.09.2026)

| Frage | Entscheidung |
|---|---|
| URL / Keyword | `/wissen/geo-optimierung/` — Fachbegriff, unter dem tripuls rankt; Artikel 1 behält „Sichtbarkeit in ChatGPT" |
| Abgrenzung | Drei getrennte Seiten: Pillar (Hub) · Artikel 1 (ChatGPT-Empfehlung konkret) · `/wissen/geo-basics/` (Checkliste + PDF, noch offen) |
| Quellen | Erst im Volltext prüfen, dann schreiben |
| Format | Astro-Seite im Repo, DE + EN im selben Zug |

## Was gebaut wurde

| Datei | Inhalt |
|---|---|
| `src/data/geo-optimierung.ts` | **Der gesamte Inhalt beider Sprachen** als strukturierte Blöcke (p, h3, ul, ol, table, quote, stats, callout, diagram) + Belegtabelle + FAQ + `geoPageMarkdown()` für die `.md`-Fassung. Handgepflegt — wer eine Zahl ändert, ändert die Belegtabelle mit. |
| `src/components/wissen/GeoPillar.astro` | Rendering beider Sprachen. Kippsatz-H1, Lead (`data-speakable`), Autorin/Stand/Lesezeit, „Das Wichtigste in Kürze" (BLUF), Sprungmarken, Abschnitte, **zwei Diagramme als inline SVG aus Code** (Retrieval-Kette mit magenta Relevanzschwelle; Formel mit magenta „×"), Belegtabelle, FAQ, Audit-CTA, Sidebar wie im Glossar. Schema: `Article` (mit `citation`-Liste der Primärquellen) + `BreadcrumbList` + `FAQPage`. |
| `src/pages/wissen/geo-optimierung.astro` + `.md.ts` | DE-Wrapper + Markdown-Route |
| `src/pages/en/knowledge/geo-optimization.astro` + `.md.ts` | EN-Wrapper + Markdown-Route |
| `src/lib/i18n-routes.ts` | Sprachpaar ergänzt |
| `astro.config.mjs` | `EXTRA_SOURCES` für beide Pfade → lastmod folgt der Datendatei |
| `src/components/Footer.astro` | Link „GEO-Optimierung" / „GEO Optimization" vor dem Glossar |
| `src/components/glossar/GlossarHub.astro` | Rückverlinkung aus dem Glossar-Intro auf den Leitfaden (DE + EN) |
| `public/llms.txt` | Beide Seiten und beide `.md`-Adressen eingetragen |
| `umbau-digital-visibility/preview-geo-optimierung/` | Gebaute HTML/MD-Fassungen + CSS zum Anschauen ohne Build |

## Aufbau der Seite

1. Was ist GEO-Optimierung? (Definition, Akronyme in einem Satz, Zitat Kunisch)
2. Warum reicht SEO allein nicht mehr? (Studie 55 % / 47 %, Stat-Karten, **SEO-vs-GEO-Tabelle**)
3. Wie kommt ein Inhalt in eine KI-Antwort? (Modellwissen vs. Websuche, **Retrieval-Diagramm**, Grounding-Budget dejan.ai, „Die Regel")
4. Welche Maßnahmen wirken nachweislich? (**Formel-Diagramm**; Technik / Content mit **Princeton-Tabelle** / Offpage mit Ahrefs 0,664 vs 0,218)
5. Was funktioniert nicht? (Tabelle: Keyword-Stuffing, llms.txt, Schema als Garantie, Server-Logs, Platzierungszusagen; Zitat Kunisch)
6. Wie misst man Erfolg? (SparkToro-Inkonsistenz, Mention/Citation Rate, Share of AI Search, Promptset, Nullmessung)
7. Womit fängt man an? (fünf Schritte → Stufen 1–3 der Leistungsseite)
8. Belege (16 Quellen mit Grundlage und Stand)
9. FAQ (6 Fragen, sitewide eindeutig)

DE rund 3.400 Wörter, EN rund 3.800 — bewusst länger als ein Blogartikel: die Seite soll die Frage
*vollständig* beantworten. 36 Glossar-Links je Sprache.

## Belegstand (alle Fundstellen im Volltext geprüft, 18.09.2026)

| Zahl auf der Seite | Quelle | Anmerkung |
|---|---|---|
| Quotation +41 % · Statistics +34 % · Cite Sources +28 % · Fluency +28 % · Rang 5 +115,1 % · Keyword-Stuffing kein Gewinn, Perplexity −10 % | Aggarwal et al., KDD 2024, arXiv 2311.09735, Tabelle 1 / Abschnitt 4–5.3 | ⚠️ tripuls schreibt „30–40 %" — das Paper sagt 28–41 % (Position-Adjusted Word Count). Wir nehmen die Paper-Werte. |
| Grounding-Budget ~2.000 Wörter · Rang 1 = 531 (28 %) · Rang 5 = 266 (13 %) · Median 377 Wörter je Quelle · ~15,5 Wörter je Chunk | Dan Petrovic, dejan.ai, 20.12.2025 — 7.060 Anfragen, 2.275 Seiten | |
| kein JS-Rendering bei OpenAI/Anthropic/Perplexity/Meta/ByteDance · ClaudeBot 23,84 % · GPTBot 11,50 % | Vercel + MERJ, 17.12.2024 | bereits in STAND.md geprüft |
| Listen 21,9 % · Artikel 16,7 % · Produktseiten 13,7 % · kommerziell: Listen 40,9 % | Wix Studio AI Search Lab via SEL, 24.03.2026 — 75.000 Antworten, > 1 Mio. Zitate | |
| Markennennungen 0,664 · Backlinks 0,218 · 26 % ohne Nennung | Ahrefs, 26.05.2025 / akt. 27.04.2026 — 75.000 Marken | nur AI Overviews, DR > 40; bereits im Faktencheck 17.09. |
| Startseiten 23,8 % der Top-1.000-Zitate in ChatGPT | Ahrefs, 28.10.2025 | Faktencheck 17.09. |
| 25,7 % frischer · AIO 16 Tage älter | Ahrefs, 28.07.2025 — 16,975 Mio. URLs | STAND.md |
| 70,8 % Zitate mit Superlativ im Title | Overthink Group, 14.07.2026 — rund 1.260 Prompts | US-B2B-SaaS, Agentur mit Interessenlage; Faktencheck 17.09. |
| llms.txt: kein signifikanter Zusammenhang, ~300.000 Domains, 10,13 % Adoption | SE Ranking via SEJ | |
| 97 % der llms.txt nie abgerufen, 137.210 Domains | Ahrefs | STAND.md |
| „kein großer LLM-Anbieter nutzt llms.txt" (Google) | SISTRIX Frag SISTRIX, 21.08.2026 | |
| < 1 : 100 gleiche Liste · < 1 : 1.000 gleiche Reihenfolge · 2.961 Durchläufe, 12 Prompts | Rand Fishkin, SparkToro, 28.01.2026 | ✅ löst den offenen Punkt 1 aus `SEO-GEO Wissen/CLAUDE.md` — der Volltext hält |
| AIO/AI Mode kein Live-Userbot; Zugriff ≠ Verwendung | Johannes Beus, SISTRIX, 30.03./21.08.2026 | |
| Schema: keine Korrelation Abdeckung ↔ Zitierrate (Search Atlas 12/2024); Google/Bing: hilft beim Verstehen | Aimee Jurenka, SEL, 25.03.2026 | |
| 449 Unternehmen · 258 Branchen · 3.592 Fragen · 7.184 Antworten · 55 % · 47 % | eigene Studie, Wortlaut von `/studie/` | |
| Formel · Kette · „Optimize for pages to rank and passages to be relevant" · Zitate | Chrissy Kunisch, SISTRIX Meetup 09/2026 | mit Zuschreibung, ohne Link auf die Slides |

**Bewusst nicht verwendet:** Gartner „25 % Rückgang" und die Nutzerzahlen von tripuls (nicht
geprüft, kein Mehrwert), Growth Memo (Paywall — Fundstelle nicht prüfbar), Digital-Bloom-Report
(Sekundärquelle, aggregiert fremde Zahlen), Otterly-Cutoff-Tabelle (Modellliste veraltet), die
Multiplikatoren aus dem Deck („4× Reddit", „3× Review-Plattformen" — ohne Quelle auf der Folie),
Knowledge-Cutoff-Aussage „nur drei Modelle mit 2026-Daten" (nur als Deck-Aussage, nicht nachprüfbar).

## Prüfung

- Build in `$HOME/buildcheck` (Symlink-`node_modules`, siehe CLAUDE.md 1a): **175 Seiten, 0 Fehler**;
  Wächter grün (462 hreflang, 871 JSON-LD, **396 FAQ eindeutig**); `lastmod`-Fehler ist der
  dokumentierte Effekt der Kopie ohne `.git`.
- Screenshots über Playwright (1440 px und 390 px): kein horizontaler Überlauf, Diagramme ohne
  Überlappung (erste Fassung hatte „Grounding Snippets" und „KI-Sichtbarkeit" abgeschnitten — behoben),
  Tabellen mobil mit Wischhinweis + klebender erster Spalte.
- Sitemap enthält beide URLs; hreflang-Paar + `x-default` korrekt; `<link rel="alternate" type="text/markdown">` gesetzt.

## Offen

- **Indexierung in GSC** für beide URLs beantragen (Hard Rule: nur auf ausdrückliche Aufforderung).
- ~~`og:image` ist das Standard-Share-Bild~~ — **erledigt 18.09.:** eigenes Share-Bild je Sprache
  (`public/images/og-geo-optimierung.png` / `og-geo-optimization.png`, 1200×630), die Retrieval-Kette
  aus Code gezeichnet, ein magenta Element (Relevanzschwelle). Generator:
  `umbau-digital-visibility/preview-geo-optimierung/build_og_geo.py` (braucht Inter-TTFs aus rsms/inter).
- Sobald `/wissen/geo-basics/` existiert: Verlinkung aus Abschnitt 7 („Womit fängt man an?").
- Artikel 1 (Redaktionsplan Woche 1) verlinkt auf die Pillar-Seite statt Begriffe zu erklären.
- Anja bei LinkedIn (`sameAs` im Person-Schema leer) — der Expertenzitat-Block der Seite trägt
  ihren Namen, ein Profil dahinter wäre der billigste E-E-A-T-Hebel.
- Eigene Zitate von Anja/Oli als Named-Expert-Blöcke, sobald die Diskretionsregel (30.10.) es erlaubt.
