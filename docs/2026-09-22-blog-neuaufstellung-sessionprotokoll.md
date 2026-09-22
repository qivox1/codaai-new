# Blog-Neuaufstellung 22.09.2026 — Sessionprotokoll und Übergabe

**Einstieg für die nächste Sitzung.** Alles, was am 22.09.2026 entschieden und gebaut wurde, und was am **Di 29.09.2026** weitergeht.

## 1. Entscheidungen (Befragung Oli)

Verbindlicher Plan: [`2026-09-22-blog-redaktionsplan-2026-27.md`](2026-09-22-blog-redaktionsplan-2026-27.md) — Gerüst (4 Themenreihen nach der Pillar-Formel), 26 Wochen ab 05.10.2026 (DE+EN, montags), Vorlage, Verlinkungsregel, CTA `/check/` + Zweitlink, LinkedIn-Verzahnung (Oktober verdeckt; ab 02.11. Verweis-Post, Test Fr/Mi), Kennzahlen, Monatsblick.
Bildwelt: [`2026-09-22-design-guide-v2-2-bildwelt.md`](2026-09-22-design-guide-v2-2-bildwelt.md) — echte Fotos (Pexels/Kaboompics/Unsplash), keine KI-Bilder, Farbbehandlung + Befund-Karte, 2 Grafiken je Artikel.

## 2. Was live ist (Commits `66cbf81`, `b45bf83` und der Commit dieses Protokolls)

| Bereich | Umsetzung |
|---|---|
| Neuer Artikel | `/blog/in-chatgpt-als-anbieter-empfohlen-werden/` + EN `/en/blog/get-recommended-by-chatgpt-as-a-supplier/` |
| Bestand | 6 Artikel auf neue Vorlage (Reihe, 2 Grafiken, Titelbild, Verlinkung); 4 EN-Fassungen neu, Bing-Artikel EN erneuert |
| Altartikel | 5 Umbau-Kandidaten mit `inUebersicht: false` (erreichbar, nicht gelistet); 2 aufgelöst + EN-only-Leitfaden → Weiterleitung auf die Pillar-Seite; 3 Kosten-Artikel bleiben noindex |
| Technik | `src/data/reihen.ts`, `BlogReihe.astro`, `BlogAbschlussCta.astro`, `BlogReihenFilter.astro`, `src/lib/remark-grafik.mjs` (```grafik-Blöcke, 6 Typen), Glossar „Im Blog vertieft", `scripts/check-blog-links.mjs`, `src/data/bildnachweise.ts` + Impressum |
| Tracking | `blog_cta_click` (Parameter `blog_cta`, `blog_reihe`, `blog_article`, `lang`) auf Abschluss-Box und Seitenleiste — **GTM-Regex noch ergänzen** (siehe 4) |
| Design | Magenta-Verlauf unter den Titelbildern entfernt (v2.2, 11b) |
| Titelbild-Generator | `bildwelt-blog-2026-08-05/hero-foto/build_hero_foto.py` (Playwright, Cloud-Session) |
| Atlas | GEO-Quellenatlas, Tab Themenideen: Spalte „Termin / Status" |

## 3. Nullmessung (22.09.2026)

[`../../nullmessung-2026-09/nullmessung-2026-09-22.md`](../../nullmessung-2026-09/nullmessung-2026-09-22.md) + CSV. Markenneutrale Prompts 1–13: **Mention Rate 0 %** in ChatGPT, Perplexity, Gemini und Google AI Mode — der Referenzwert für die Bilanz Ende Dezember/März. **Unvollständig** (Nutzungslimit): ChatGPT 15–20, Perplexity 18–20, Gemini 13–20, Google 14–20 fehlen.

## 4. Offen für Di 29.09.2026 (geplante Aufgabe angelegt)

1. **Nullmessung vervollständigen** — fehlende Prompts/Läufe per DataForSEO (`/ai_optimization/{chat_gpt,perplexity,gemini}/llm_responses/live`, `/serp/google/ai_mode/live/advanced`), CSV + Auswertung ergänzen.
2. **SISTRIX Prompt-Tracking einrichten** (Wunsch Oli, 22.09.): Projekt „CodaAI" (codaai.ai), alle 20 Prompts aus `nullmessung-2026-09/prompts.json` wörtlich, wöchentliche Messung — in Olis eingeloggtem Chrome (Claude in Chrome).
3. **GTM:** `blog_cta_click` in die Regex von `CE - Funnel Events` aufnehmen, Variablen `DLV - blog_cta` / `DLV - blog_reihe` als Parameter am Tag `GA4 - Funnel Events`, GA4-Dimensionen „Blog CTA", „Blog Reihe"; Container veröffentlichen (Konto hi@codaai.ai), per `gtm.js` prüfen.
4. **LinkedIn Zyklus 3** (05.–30.10.): Redaktionsplan-Datei + erste 3 YAMLs zur Freigabe, Themen je Woche passend zu Blog W1–W4.
5. **Skill „Blogartikel CodaAI"** nach der Wochen-Checkliste (Redaktionsplan Abschnitt 8) — per `propose_skills`.
6. **Geplante Aufgaben:** sonntags Vorbereitung des Wochenartikels (3 Fotovorschläge, Quellenprüfung), letzter Arbeitstag im Monat Monatsblick; `check-blog-links.mjs` in den wöchentlichen SEO-Task.
7. Kleinkram: EN-Fassungen stichprobenartig gegenlesen lassen (Oli); Design-Guide-Artefakt auf v2.2 nachziehen (Oli); Search-Console-Indexierung für den neuen Artikel nur auf Wunsch.
