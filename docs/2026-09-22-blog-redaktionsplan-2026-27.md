# Blog-Redaktionsplan Oktober 2026 – März 2027

**Stand:** 22.09.2026 · **Verbindlicher Plan** · Ergebnis der Befragung vom 22.09.2026 (Oli, `/grill-me`).
Löst ab: `bildwelt-blog-2026-08-05/Redaktionsplan-2026-09.md` (Sept./Okt.) und die Zuordnung „ein Artikel je Baustein" aus `Blog-Umbaukonzept.md`.
Fortschreibung: in dieser Datei. Der Monatsblick (Abschnitt 9) wird unten angehängt.

---

## 1. Entscheidungen (Oli, 22.09.2026)

| # | Frage | Entscheidung |
|---|---|---|
| 1 | Gerüst | **Pillar-Formel** `(Technik + Content + Offpage) × Prozesse` → vier Themenreihen. Jeder Artikel gehört zu genau einer. Bausteine, Werkstätten und LinkedIn-Kapitel ordnen sich darunter ein. |
| 2 | Altbestand | 4 umbauen · 2 auflösen und weiterleiten · 3 noindex-Artikel bleiben draußen (Weiterleitung). Details Abschnitt 6. |
| 3 | Umfang | **Okt. 2026 – März 2027, jede Woche ein neuer Artikel (26)**, dazu die 4 Umbauten in den ersten 8 Wochen (alle zwei Wochen). **DE und EN immer gleichzeitig.** |
| 4 | Reihenfolge | Feste Rotation Technik → Content → Offpage → Messung. Innerhalb der Reihe zuerst Nachfrage (Search Console, Suchvolumen), dann „im DACH-Raum noch niemand sauber belegt". Doppelte Themen werden zusammengelegt. |
| 5 | Vorlage | Abschnitt 3, inkl. Reihen-Kasten, eigener Studienbefund, sichtbares Prüfdatum. |
| 6 | Verlinkung | Bei **jeder** Veröffentlichung die interne Verlinkung der ganzen Website nachziehen (Abschnitt 4). |
| 7 | CTA | Hauptlink **`/check/`** („Ergebnis zuerst"), Zweitlink je Reihe: Messung/Offpage → Komplett-Audit, Content/Technik → Webinar. |
| 8 | LinkedIn | Oktober: Blog greift das Thema der LinkedIn-Woche auf, ohne Verweis (verdeckt). Ab 02.11.: Blog Montag, Verweis-Post — **Test** 4 Wochen Freitag, 4 Wochen Mittwoch, dann entscheiden die Klicks aus LinkedIn (GA4). |
| 9 | Messung | Vier Kennzahlen, Monatsblick, Bilanz Ende Dezember und Ende März (Abschnitt 9). |
| 10 | Ablage | Diese Datei. Themenideen-Tab im GEO-Quellenatlas trägt Termin/Status. |
| 11 | Bildwelt | Echte Fotos aus freien Bilddatenbanken, keine KI-Bilder, kein Shooting; einheitliche Farbbehandlung + Befund-Karte; 2 Grafiken je Artikel (Abschnitt 5). |
| 12 | Kategorien | Lesbar für KI · Zitierfähige Inhalte · Erwähnt werden · Messen & steuern (Fachbegriff als Unterzeile). |

## 2. Die vier Themenreihen

Quelle der Wahrheit: `src/data/reihen.ts`. Frontmatter: `reihe: technik | content | offpage | messung`, `category` = Reihenname.

| `reihe` | Name DE | Name EN | Unterzeile | Pillar-Abschnitt | Zweitlink CTA |
|---|---|---|---|---|---|
| `technik` | Lesbar für KI | Readable for AI | Technik | `/wissen/geo-optimierung/#technik` | Webinar |
| `content` | Zitierfähige Inhalte | Citable Content | Content | `…/#content` | Webinar |
| `offpage` | Erwähnt werden | Getting Mentioned | Offpage | `…/#offpage` | Komplett-Audit (`/digital-visibility/`) |
| `messung` | Messen & steuern | Measure & Steer | Messung | `…/#messen` | Komplett-Audit |

Zuordnung der übrigen Gliederungen: die 14 Bausteine und die 9 Coaching-Werkstätten hängen je an einer Reihe (Stufe 1 ≈ Technik, Fachbeiträge/Aktualität ≈ Content, Stufe 2 ≈ Offpage, Messung/Audit/Wettbewerb ≈ Messung). Die Blogartikel sind damit zugleich Begleitmaterial der Werkstätten, ohne deren Reihenfolge zu übernehmen.

## 3. Vorlage für jeden Artikel

| Bestandteil | Regel |
|---|---|
| Frontmatter | Pflicht: `title`, `description` (≤ 160), `pubDate`, `lang`, `author: "Oliver Parrizas"` (+ Titel/Bio/Foto wie Bestand), `category` (= Reihenname), **`reihe`**, `tags`, `summary`, `faq` (≥ 4). `seoTitle` ≤ 45. |
| Titel | Leitfrage oder Nutzenaussage aus Lesersicht, Hauptbegriff vorn |
| Einstieg | Antwort in den ersten 2–3 Sätzen (fett), wichtigste Zahl mit Quelle im Satz |
| H2 | als Frage; erster Satz darunter beginnt mit dem gefragten Begriff (Entity Echoing), ein Gedanke je Absatz |
| Länge | 1.500–2.200 Wörter, nicht auffüllen |
| Belege | 4 Kennzahl-Karten (`blog-stat-grid`), jede Zahl **im Volltext der Quelle** geprüft |
| Eigene Daten | wo möglich ein Befund aus `src/data/studie.ts` — Wortlaut und Bezugsgröße von dort (54,7 % der **Fragen**, 46,8 % der **Unternehmen**) |
| Grafiken | genau 2 ```` ```grafik ```` -Blöcke: eine Kennzahl, eine Mechanik (Abschnitt 5.3) |
| Glossar | 3–5 Links auf Begriffe, die der Artikel voraussetzt |
| FAQ | ≥ 4, jede Frage sitewide eindeutig (Wächter `check-seo-invariants.mjs`) |
| Reihen-Kasten | automatisch aus `reihe` (Komponente `BlogReihe.astro`): Reihe, Pillar-Link, „Zahlen geprüft am …" = `updatedDate ?? pubDate` |
| CTA | automatisch (`BlogAbschlussCta.astro`): `/check/` + Zweitlink der Reihe. Kein eigener CTA-Absatz im Text nötig |
| Titelbild | Abschnitt 5.1–5.2, DE und EN je eigener Export (Karte ist Text) |
| Prüfdatum | jedes Halbjahr erneuern (Zahlen erneut im Volltext prüfen → `updatedDate`) |
| EN | im selben Zug, `en-relaunch-2026-08-04/KONVENTIONEN.md`, Sprachpaar in `src/lib/i18n-routes.ts` |

## 4. Interne Verlinkung — bei jeder Veröffentlichung

1. **Mindestens 3 bestehende Blogartikel** bekommen einen passenden Satz mit Link auf den neuen Artikel (in „Wie hängt das zusammen"-Abschnitten, nicht als Linkliste). `updatedDate` dort setzen.
2. **Pillar-Seite:** der Abschnitt der Reihe (`src/data/geo-optimierung.ts`) verlinkt den Artikel; `GEO_UPDATED` setzen.
3. **Glossar:** geschieht automatisch — jeder Begriff, auf den der Artikel verlinkt, zeigt ihn unter „Im Blog vertieft" (`GlossarTerm.astro`, seit 22.09.2026). Deshalb die 3–5 Glossar-Links nie weglassen.
4. **Wo es passt:** `/digital-visibility/`, `/studie/`, `/fakten/`, andere Wissensseiten.
5. **Kontrolle vor dem Push:** `node scripts/check-blog-links.mjs dist` — kein Artikel verwaist, jeder neue Artikel **≥ 5** verlinkende Seiten (ohne Blog-Übersicht und „Verwandte Artikel").

## 5. Bildwelt

Design Guide v2.2, Abschnitt 11 (`docs/2026-09-22-design-guide-v2-2-bildwelt.md`).

### 5.1 Fotos

- Quellen: **Kaboompics** (Fotoserien = wiederkehrendes „Team"), **Unsplash** (ohne Unsplash+), **Pexels**; ergänzend Burst, StockSnap, Wikimedia Commons (Lizenz je Bild). **Pixabay nur mit Einzelprüfung** (nimmt KI-Bilder an). Keine KI-generierten Bilder, kein Shooting (Stand 22.09.2026).
- Echtheits-Regeln: niemand schaut in die Kamera · keine gestellten Posen/Handschläge · Tageslicht, echte Räume · Mittelstand statt Start-up-Loft (Werkhalle, Besprechungsraum, Messestand, Büro) · echte Tätigkeit · keine sichtbaren Logos/Markenprodukte.
- Auswahl: je Artikel **3 geprüfte Vorschläge** mit eingesetzter Befund-Karte, Oli wählt eins. Später automatisiert über die kostenlosen APIs von Unsplash und Pexels (Schlüssel legt Oli an).
- **Bildnachweis** je Bild in `src/data/bildnachweise.ts` (URL, Fotograf, Plattform, Lizenz, Abrufdatum, verwendet auf). Das Impressum listet die Nachweise **pro URL**.

### 5.2 Titelbild = Foto + Farbbehandlung + Befund-Karte

Generator: `bildwelt-blog-2026-08-05/hero-foto/build_hero_foto.py` (läuft mit Playwright). Feste Werte, nicht pro Bild ändern:
1600 × 900 WebP · 18 % entsättigt, leicht wärmer, Navy-Schatten zur Kartenseite · weiße Karte mit Überzeile „Befund"/„Finding", Kennzahl 120 px, ein Satz 40 px, Quelle · Karte in der sicheren Zone (x 120…760 bzw. rechts gespiegelt, vertikal mittig) · **ein** magenta Element: der Balken links an der Karte · `heroImageAlt` nennt den Befund.

### 5.3 Grafiken im Artikel

Im Markdown ein Datenblock, gerendert von `src/lib/remark-grafik.mjs` (HTML, kein Bild — lesbar für Suchmaschinen/KI, zweisprachig ohne Aufwand). Prinzip aus den LinkedIn-Karussells: Inhalt getrennt von Gestaltung, feste Typen, Überzeile · Titel · Grafik · Quellenzeile.

| Typ | Zeigt | Felder |
|---|---|---|
| `kennzahl_vergleich` | 2–5 Balken | `werte: [{label, wert, anzeige, markiert?, stark?}]`, `max?` |
| `anteil` | Anteil als 10×10-Raster | `wert`, `anzeige`, `label`, `label_kurz`, `rest_label`, `fehlstelle?` |
| `kette` | Ablauf mit Schwelle | `schritte: [{t, s}]`, `schwelle: {nach, text}` |
| `ki_antwort` | Antwortkarte mit Fehlstelle | `frage`, `intro?`, `namen[]`, `fehlt`, `quellen[]?` |
| `vorher_nachher` | zwei Fassungen | `vorher: {label, text, hinweis?}`, `nachher: {…}` |
| `entscheidung` | Prüfliste Ja/Nein | `punkte: [{frage, antwort, text?, markiert?}]` |

Immer: `titel`, `quelle`, `alt` (ein Satz Befund). Höchstens **ein** markiertes (magenta) Element je Grafik. Beispiel: `src/content/blog/in-chatgpt-als-anbieter-empfohlen-werden.md`.

## 6. Altbestand

| Artikel | Maßnahme | Reihe | Termin |
|---|---|---|---|
| `ai-crawler-server-performance-geo` | Umbau → „Wenn die KI Ihre Seite nicht lesen kann" (Faktencheck in `STAND.md`) | Technik | W1 · 05.10. |
| `ki-blog-erstellen` + `content-marketing-mittelstand-ki` | Zusammenlegen → „Woran die KI einen zitierfähigen Fachbeitrag erkennt"; `content-marketing-mittelstand-ki` wird Weiterleitung | Content | W3 · 19.10. |
| `b2b-blog-als-vertriebskanal` | Auflösen, Brauchbares in den Fachbeitrags-Artikel, Weiterleitung dorthin | – | W3 · 19.10. |
| `ki-content-marketing-strategie` (+ EN-Zwilling, + `en/ai-content-marketing-strategy-guide`) | Auflösen, Weiterleitung auf Pillar-Seite | – | W3 · 19.10. |
| `redaktionsplan-ki-erstellen` | Umbau → „Aktualität schlägt Frequenz" | Content | W5 · 02.11. |
| `content-marketing-vs-google-ads-b2b` | Umbau → „Die Entscheidung fällt vor dem ersten Klick" | Messung | W7 · 16.11. |
| 3 noindex-Artikel (Kosten/Agentur) | bleiben draußen; Weiterleitungsseite (noindex, Canonical, Meta-Refresh — GitHub Pages kann kein echtes 301) | – | W1 |

Weiterleitungen nach dem Muster von `/kontakt/` bzw. `src/pages/blog/b2b-videomarketing-erklaervideos-mittelstand.astro`, aus der Sitemap filtern (`astro.config.mjs`).
Die 6 Artikel auf Linie (YouTube, ChatGPT/Bing, Praxis-Studie, Markennennungen, Vergleichslisten, Startseiten-Zitate) wurden am 22.09. auf die neue Vorlage umgestellt; fehlende EN-Fassungen der drei Artikel vom 17.09. und des Startseiten-Artikels werden nachgezogen.

## 7. Die 26 Wochen

Rhythmus: neuer Artikel **montags**, DE + EN. Rotation T → C → O → M. Suchvolumen DE (DataForSEO, Monatsmittel, 22.09.2026) als Nachfrage-Hinweis.

| W | Datum | Reihe | Arbeitstitel | Nachfrage / Anlass | Quellen (Atlas) | LinkedIn |
|---|---|---|---|---|---|---|
| — | 22.09. | Offpage | **In ChatGPT als Anbieter empfohlen werden: Was nachweislich wirkt** ✅ geschrieben | GSC „sichtbarkeit in chatgpt" + 2 Einkäufer-Prompts | Studie, Ahrefs, Overthink, Princeton, SparkToro | – |
| 1 | 05.10. | Technik | Was KI-Systeme wirklich von Ihrer Seite lesen — Grounding-Budget und Abruffenster | LinkedIn-Woche 1 (Retrieval, Fan-out, Grounding) | Peec AI Deep-Research-Logs, dejan.ai, SEJ Retrieval-Check, Kunisch | #63–65 |
| 2 | 12.10. | Content | Fließtext oder Abschnitte? Wie eine zitierfähige Passage aussieht | LinkedIn-Woche 2 (was wirkt / was nicht) | Search Camp „Chunked?", Princeton, Aufgesang LLM-Readability, AFAIK-Gegenposition | #66–68 |
| 3 | 19.10. | Offpage | Fachmedien statt Pressemitteilung: Wie Mittelständler Erwähnungen verdienen | digital pr 260 · LinkedIn-Woche 3 | Ahrefs Mentions, Werkstatt 6, Website Boosting #98 | #69–71 |
| 4 | 26.10. | Messung | Warum KI-Sichtbarkeit keine Rangposition hat — und wie man sie ehrlich misst | ki sichtbarkeit messen 90 · LinkedIn-Woche 4 | SparkToro, iPullRank, Profound, Aleyda-Framework, Promptset v1 | #72–74 |
| 5 | 02.11. | Technik | Google sagt: GEO ist SEO. Was llms.txt, Chunking und Spezial-Schema wirklich bringen | **llms.txt 1.900** | Google AI Optimization Guide, SE Ranking, Ahrefs, Aufgesang Schema | ab hier Verweis-Post (Test Fr) |
| 6 | 09.11. | Content | Eigenlob-Listicles: Wann Vergleichslisten der eigenen Marke schaden | listicle 1.000 | Lily Ray, Search with Candour, Growth Memo | Fr |
| 7 | 16.11. | Offpage | Bewertungsplattformen im B2B: Wo die KI nachschlägt, bevor sie empfiehlt | Trust-Prompts (Kunisch) | Quoleady (prüfen!), Kunisch, Pillar | Fr |
| 8 | 23.11. | Messung | AI Overviews und AI Mode in Deutschland: Was der Klickverlust für B2B-Anbieter bedeutet | **ai mode 33.100**, ai overviews 1.900 | SISTRIX-Analyse, BR-Medienforschung, Seer, SEO Südwest | Fr |
| 9 | 30.11. | Technik | ChatGPT baut einen eigenen Suchindex — was das für Mittelständler ändert | aktuell (09/2026) | Peec AI, SEO im Ohr 424, GSQi | Mi |
| 10 | 07.12. | Content | Query Fan-out: Warum eine Seite heute zwanzig Fragen beantworten muss | query fan out 260 | Page 2/Landwehr, Lily Ray, Nectiv 28K, DEJAN Fanout V2 | Mi |
| 11 | 14.12. | Offpage | Modellgedächtnis oder Live-Suche: Zwei Wege in die KI-Antwort | erklärt Mention vs. Citation | DEJAN, Forrester, iPullRank | Mi |
| 12 | 21.12. | Messung | KI-Sichtbarkeit messen: Werkzeuge im DACH-Markt ehrlich verglichen | geo tools 210 · CFO-Prompt (GSC) | SISTRIX, Peec, Otterly, Profound, JOE; CodaAI als eine Option | Mi |
| 13 | 28.12. | Technik | Ist Ihre Website bereit für KI-Agenten? Agent-Readiness und WebMCP in fünf Prüfungen | webmcp 880 (steigend) | Chrome WebMCP, Marie Haynes, TollBit, Kopp ACO, Website Boosting #98 | → Entscheidung Tag |
| 14 | 04.01. | Content | Die Fragen Ihrer Einkäufer finden: Eine Themenlandkarte für KI-Sichtbarkeit | Werkstatt 1 | Prompt Research (SISTRIX), Kunisch Prompt-Kategorien | |
| 15 | 11.01. | Offpage | LinkedIn der Geschäftsführung: Die Quelle, die KI-Antworten im B2B zitieren | Werkstatt 8 | SISTRIX (~15 % AI Mode), Studie | |
| 16 | 18.01. | Messung | Der neue Search-Console-Bericht zu KI-Antworten: Was er zeigt und was nicht | stützt Nullmessung | Marie Haynes, GSQi, Search Off the Record | |
| 17 | 25.01. | Technik | Common Crawl und Trainingsdaten: Warum Ihre Domain im Webgraph zählt | common crawl 720 | Metehan CC Rank, OM Cafe 46, iPullRank | |
| 18 | 01.02. | Content | Nischen gewinnen: Warum in 85 % der Themen noch keine Marke führt | Mittelstands-Argument | Semrush Topic Authority, Exposure Ninja | |
| 19 | 08.02. | Offpage | Reddit, Foren, Communities: Gilt der Reddit-Effekt auch im deutschsprachigen B2B? | eigener DACH-Blick (+ Nicht-Angebot Reddit-Seeding) | Growth Memo, Diggity, Overthink 1,4 % | |
| 20 | 15.02. | Messung | Zitiert, aber nicht genannt: Warum Quellenlink und Markennennung zwei Messgrößen sind | vertieft Markennennungen | Semrush Ghost Citations, Forrester Entity Mapping | |
| 21 | 22.02. | Technik | Barrierefreie Inhalte sind KI-taugliche Inhalte | barrierefreiheit website 1.900 (BFSG) | WTS „Accessible Content", Sitebulb/Alderson, Wingmen | |
| 22 | 01.03. | Content | Eigene Daten erzeugen: Wie wir 7.184 KI-Antworten ausgewertet haben — Methodik zum Nachbauen | Baustein 13 | Studie (Methodik), AFAIK-Studienkritik | |
| 23 | 08.03. | Offpage | Wikidata statt Wikipedia: Wie Ihr Unternehmen zur Entität wird | Lieferentscheidung erklären | Semrush/Profound, Startseiten-Artikel | |
| 24 | 15.03. | Messung | Wirkt GEO wirklich? Wie man Maßnahmen mit Split-Tests sauber nachweist | Ehrlichkeitsposition | seoClarity, Critchlow, brightonSEO | |
| 25 | 22.03. | Technik | KI-Crawler steuern: robots.txt, Content Signals und was Blockieren kostet | ki crawler 140 | Search Camp, Cloudflare Radar, TollBit | |
| 26 | 29.03. | Content | Vom Interview zum Fachbeitrag: Wie Wissen aus dem Team zitierfähig wird | Werkstatt 3 | Kunisch (Named Experts), Princeton | |

**Umbauten zusätzlich:** W1 KI-Crawler · W3 Fachbeitrag (Zusammenlegung) · W5 Aktualität · W7 Vor dem ersten Klick.

**Reserve (2. Halbjahr 2027 oder als Tausch):** Wie viele Deutsche fragen die KI statt Google? (BR-Medienforschung) · Was die GEO-Forschung wirklich beweist (arXiv-Survey, Princeton, AFAIK) · Wettbewerbs-Beobachtung mit eingefrorenem Fragensatz (Baustein 14) · YouTube-Thema ist bereits abgedeckt.

Tauschregel: Ein Thema darf nur gegen eines **derselben Reihe** getauscht werden, sonst kippt die Rotation.

## 8. Wöchentlicher Ablauf (Checkliste)

1. Quellen im Volltext prüfen (Atlas-Tab „Quellen", Belegtabelle der Pillar-Seite zuerst).
2. DE schreiben nach Abschnitt 3, 2 Grafik-Blöcke, 4 Kennzahl-Karten.
3. 3 Fotovorschläge mit Befund-Karte → Oli wählt → Titelbild DE + EN exportieren, Bildnachweis eintragen.
4. EN im selben Zug, Sprachpaar in `i18n-routes.ts`.
5. Verlinkung nach Abschnitt 4 (≥ 3 Artikel, Pillar, prüfen).
6. Build + `check-seo-invariants.mjs` + `check-blog-links.mjs` grün.
7. Freigabe Oli → Commit/Push (Hard Rule) → IndexNow läuft automatisch.
8. Atlas: Termin/Status auf „veröffentlicht" · ab 02.11. LinkedIn-Verweis-Post.

## 9. Messung und Nachsteuern

| Kennzahl | Quelle | Ziel |
|---|---|---|
| Indexiert | GSC Seitenindexierung, URL-Prüfung | jeder Artikel ≤ 14 Tage nach Veröffentlichung |
| Nachfrage je Reihe | GSC Impressionen/Klicks, gefiltert nach URL-Liste je Reihe | steigend je Monat |
| Lead-Beitrag | GA4: `check_view`, `audit_request_submitted` mit Blog als Einstieg/Referrer; `data-cta="blog-end-check"` / `blog-end-second` | > 0 ab November |
| KI-Nennung | eigenes Promptset (`nullmessung-2026-09/Promptset-v1.md`), 3 Systeme × 3 Läufe | Anstieg ggü. Nullmessung |

- **Monatsblick** am letzten Arbeitstag des Monats: eine Seite mit den vier Zahlen, darunter die Umsortierung der Themen des Folgemonats (nur innerhalb der Reihe).
- **Bilanz** 31.12.2026 und 31.03.2027: zusätzlich Gewichtung der Reihen und Ergebnis des LinkedIn-Tag-Tests.

---

## Monatsblick

*(wird monatlich angehängt)*
