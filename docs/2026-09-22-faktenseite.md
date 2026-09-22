# 22.09.2026 — Faktenseite (Grounding Page) `/fakten/` + `/en/facts/`

**Auftrag Oli:** Maßnahme 1 aus der GEO-Wissensauswertung vom 22.09.2026 komplett umsetzen:
eine Grounding Page mit den geprüften Stammdaten von CodaAI.

## Warum
KI-Systeme setzen ihr Bild eines Unternehmens aus vielen Quellen zusammen. codaai.ai hatte bis
heute keine Seite, die die Fakten gebündelt und maschinenlesbar anbietet (`/fakten/`,
`/ueber-uns/` lieferten 404). Dazu kommt ein echtes Verwechslungsrisiko mit „Coda AI“, der
KI-Funktion von coda.io. Die Faktenseite ist außerdem das Vorbild für Werkstatt 5 des
Coachings („Unternehmensbeschreibung in drei Längen“).

## Was gebaut wurde
| Datei | Inhalt |
|---|---|
| `src/data/fakten.ts` | Inhalt DE + EN: Lead, Beschreibung in 1 Satz / 50 / 150 Wörtern, Faktenblock (15 Zeilen), 7 Abschnitte mit H2 als Frage, Markdown-Generator |
| `src/components/wissen/FaktenSeite.astro` | Layout für beide Sprachen; Schema AboutPage + Organization (sitewide `@id`) + Person Oliver Parrizas (`https://www.codaai.ai/#oliver-parrizas`, sameAs LinkedIn) + BreadcrumbList. Bewusst kein FAQPage |
| `src/pages/fakten.astro`, `src/pages/en/facts.astro` | Wrapper |
| `src/pages/fakten.md.ts`, `src/pages/en/facts.md.ts` | Markdown-Fassungen `/fakten.md`, `/en/facts.md` |
| `src/lib/i18n-routes.ts` | Sprachpaar `/fakten/` ↔ `/en/facts/` |
| `src/components/Footer.astro` | Spalte „Wissen": „Fakten zu CodaAI" / „Facts about CodaAI" (sitewide verlinkt) |
| `src/layouts/Layout.astro` | Organization sitewide: `legalName` AMP Beratung + `disambiguatingDescription` (Abgrenzung Coda AI), sprachabhängig |
| `public/llms.txt`, `src/pages/llms-full.txt.ts` | Hinweis + Link auf die Faktenseite als maßgebliche Quelle |
| `astro.config.mjs` | `EXTRA_SOURCES` für den Sitemap-lastmod |

## Inhaltsregeln
- Nur Fakten, die an anderer Stelle der Website belegt sind (Impressum, /preise/, /digital-visibility/, /studie/, /webinar/). Kein Gründungsjahr, keine Mitarbeiterzahl, keine Kundennamen.
- Studienzahlen im Wortlaut von /studie/ (55 % / 47 % / 35 %).
- Oliver Parrizas mit der Rolle aus /webinar/ („Digital- & Sichtbarkeits-Analyst"), führt Audits durch, verantwortet die Studienauswertung. **Keine Autorenschaft behauptet**, solange Glossar/Leitfaden/Blog noch Anja als Autorin führen (Maßnahme 2, Beschluss 18.09.2026, offen).
- Visibility Circle und Coaching-Angebot sind bewusst nicht erwähnt (nicht öffentlich).

## Prüfung
Build 177 Seiten, SEO-Wächter grün (hreflang, JSON-LD, FAQ-Eindeutigkeit). Die beiden neuen URLs
hatten vor dem Commit kein lastmod — erwartet, kommt aus der Git-Historie.

## Offen / Folgeschritte
- Maßnahme 2: Autorenseite Oliver Parrizas, Autorenumstellung Wissens-Cluster (Person-`@id` steht schon).
- Maßnahme 3: `sameAs` der Organization füllen (LinkedIn-Unternehmensseite), echtes Logo statt `favicon.svg`.
- Faktenseite pflegen: Bei Preis-, Stufen- oder Adressänderung `src/data/fakten.ts` + `FAKTEN_UPDATED` nachziehen.
- Beschreibung in drei Längen in LinkedIn, Google-Unternehmensprofil und Verzeichnissen einheitlich übernehmen.
