# Aktualität sichtbar machen + Studie zitierfähig (22.09.2026)

Maßnahmen 4 und 5 der GEO-Maßnahmenliste.

## Maßnahme 4 — Aktualität

- **Eine Datumsquelle:** `src/lib/lastmod.mjs` speist Sitemap-`lastmod` (astro.config),
  `dateModified` im neuen WebPage-Knoten jeder Seite (Layout) und die sichtbare Zeile
  „Seite zuletzt aktualisiert" im Footer. Alle drei sagen jetzt dasselbe.
- **Blog und Glossar:** Datum = Frontmatter `updatedDate`, sonst `pubDate`. Vorher Git-Datum —
  dadurch meldete die Sitemap nach der Autorenumstellung für Artikel vom Januar „22.09.",
  während die Seite „29. Januar" zeigte. Solche Widersprüche bringen Google dazu, lastmod
  der Domain zu ignorieren. **Wer einen Artikel inhaltlich überarbeitet, setzt `updatedDate`.**
- Übersichten (Blog, Glossar) = jüngster Eintrag. Seiten mit Datenkonstante (`*_UPDATED`):
  diese. Alle übrigen: Git-Datum der Quelldateien (`EXTRA_SOURCES` jetzt in lastmod.mjs).
- Blogartikel: `dateModified` im Schema immer gesetzt (Fallback `pubDate`).
- **IndexNow automatisch:** Job `indexnow` im Deploy-Workflow, `scripts/indexnow-changed.mjs`
  meldet nach jedem Deploy alle URLs, deren lastmod auf den Commit-Tag fällt.
- Glossar: `updatedDate: 2026-09-22` bei grounding, konsistente-markenbeschreibung (Querverweise)
  und mention, mention-rate, geo (Zahlenkorrektur, s. u.) — jeweils DE/EN.

## Maßnahme 5 — Studie zitierfähig

- **Eine Quelle:** `src/data/studie.ts` (Kennzahlen, 8 Kernaussagen, Zitierformate, Methodik,
  Limitationen, Schema, CSV, Markdown). Vorher Zahlen doppelt in DE- und EN-Seite.
- `#zitieren` ausgebaut: 8 Kernaussagen mit eigenen Ankern (`#befund-1` … `#befund-8`) und
  Kurzbeleg, Zitierformate APA / deutsche Zitierweise (EN: Harvard) / Kurzbeleg / BibTeX mit
  Kopierknopf, Downloads.
- Neu: `/studie.md`, `/en/study.md`, `/studie/kennzahlen.csv`, `/en/study/key-figures.csv`.
- Schema: Report + Dataset mit `@id`, Autor Oliver Parrizas (Person-@id), `dateModified`,
  `isBasedOn`, `distribution` (CSV), `variableMeasured`, `measurementTechnique`, `usageInfo`.
- Hero: Autor, Veröffentlicht 14.07.2026, Aktualisiert 22.09.2026.
- **Zahlenkorrektur:** an 6 Stellen stand „bei 47 % der FRAGEN empfiehlt die KI Wettbewerber" —
  richtig ist 46,8 % der UNTERNEHMEN (Glossar mention, mention-rate, geo DE/EN, /check/,
  llms-full.txt, llms.txt). llms.txt-Studienblock neu mit exakten Werten und Links.

## Offen (Vorschlag)

- DOI über Zenodo vergeben (braucht Olis Konto) → dauerhafte, wissenschaftlich zitierbare Kennung.
- Lizenz für die Kennzahlen festlegen (z. B. CC BY 4.0) — rechtliche Entscheidung Oli.
- Alte Blogartikel (Jan–März 2026) inhaltlich überarbeiten und `updatedDate` setzen.

## Fixiert als Arbeitsregel (22.09.2026, abends)

- Regel-Abschnitt „🔒 PFLICHT bei jeder Inhaltsänderung“ oben in `CodaAI-Website/CLAUDE.md`.
- Git-Hook `.githooks/pre-commit` → `scripts/hooks/pre-commit.mjs`: setzt `updatedDate` bei
  Textänderungen in Blog/Glossar automatisch, erinnert an `*_UPDATED`-Konstanten, bricht bei
  fehlendem `pubDate` ab. Aktiviert über `core.hooksPath` (npm `prepare`).
- `npm run indexnow -- --dry` zeigt, was nach dem Deploy gemeldet wird.
