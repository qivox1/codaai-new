# Markdown-Fassung für jede indexierbare Seite (27.09.2026)

## Anlass

Frage von Oli: Sollte die Website neben HTML auch Markdown anbieten? Live-Prüfung ergab:
`llms.txt`, `llms-full.txt` und 146 von 169 Sitemap-URLs hatten bereits eine `.md`-Fassung
(gepflegt über `.md.ts`-Endpunkte, siehe `src/lib/md-variant.ts`). Es fehlten 23 Seiten, darunter
die kommerziell wichtigsten: `/digital-visibility/`, `/preise/`, `/faq/`, `/webinar/`,
`/co-create/`, `/check/`, `/visibility-snapshot/`, Blog- und Glossar-Übersicht, Rechtsseiten —
jeweils mit englischem Gegenstück.

Einordnung (für Gespräche): Ein belegter Effekt auf die Crawling-Frequenz oder auf Nennungen in
KI-Antworten existiert nicht; Google nutzt llms.txt nach eigener Aussage nicht. Nutzen: Agenten
und Recherche-Werkzeuge bekommen die Substanz ohne Markup (−80 bis −95 % Token), und die Seite
führt vor, was CodaAI verkauft.

## Lösung

**Neues Skript `scripts/build-md-variants.mjs`**, läuft als `postbuild` vor dem SEO-Wächter:

- nimmt jede `dist/**/index.html` **ohne** eigenen `<link rel="alternate" type="text/markdown">`
- lässt `noindex`, Weiterleitungen (meta refresh) und 404 aus
- wandelt `<main>` in Markdown (unified · rehype-parse · rehype-remark · remark-gfm) und entfernt
  dabei Navigation, Formulare, React-Inseln (Preisrechner, Buchungs-Widget), Grafiken, Kommentare,
  `aria-hidden`, `hidden`, `display:none`, `sr-only` sowie die Zustandsflächen der interaktiven
  Module (Liste `DROP_CLASSES`: Lade-, Ergebnis- und Dankeszustände)
- Knöpfe in Überschriften (FAQ, Akkordeon) behalten ihren Text, alle anderen Knöpfe fallen raus
- Kopf wie bei den gepflegten Fassungen: H1, Beschreibung, `Quelle`, `Aktualisiert` (aus der
  Footer-Zeile, also aus `lastmod.mjs`), Zitierregel; Links absolut
- schreibt `dist/<pfad>.md` und setzt den Alternate-Link nachträglich hinter das Canonical

Gepflegte `.md.ts`-Fassungen haben immer Vorrang. **Jede künftige Seite bekommt ihre Fassung
automatisch** — für neue Wissensseiten bleibt die gepflegte `.md.ts` trotzdem der bessere Weg
(Regel 3 im Pflicht-Abschnitt der CLAUDE.md). Einzelne Elemente lassen sich mit
`data-md="skip"` ausblenden. Neue interaktive Module mit Zustandsschablonen: Klasse in
`DROP_CLASSES` eintragen (nicht in der Komponente, sonst springt über `EXTRA_SOURCES` das
Seitendatum).

Neue Abhängigkeiten (explizit in `package.json`): `rehype-remark`, dazu `unified`, `rehype-parse`,
`remark-gfm`, `remark-stringify` (lagen vorher nur transitiv über Astro vor).
Script `npm run md:variants` für den Einzellauf nach `astro build`.

Mitgezogen: `public/llms.txt` (Abschnitt „Markdown-Fassungen“) und `public/AGENTS.md`.
Kein Seitendatum hochgesetzt — keine Inhaltsänderung.

## Prüfung

Build lokal (Kopie in `$HOME/buildcheck` mit Git-Historie): 188 Seiten, 23 Fassungen erzeugt,
SEO-Wächter grün, **169 von 169 Sitemap-URLs haben eine `.md`-Datei**. Stichproben gelesen:
Preise, Digital Visibility, FAQ, Webinar, Check, Snapshot, Co-Create, Blog, Glossar, Impressum.
