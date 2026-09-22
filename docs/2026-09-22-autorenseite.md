# Autorenseite Oliver Parrizas (22.09.2026)

Maßnahme 2 der GEO-Maßnahmenliste; Grundlage Beschluss 18.09.2026 (Oli als Autor
des Wissens-Clusters, Anja Miebach bleibt Gründerin, Inhaberin, Herausgeberin).

## Was geändert wurde

- **Neue Seiten** `/autor/oliver-parrizas/`, `/en/author/oliver-parrizas/` (+ `.md`):
  Komponente `src/components/wissen/AutorSeite.astro`, Inhalt `src/data/autor.ts`.
  Schema: ProfilePage (mainEntity = Person) + Person (`sameAs` LinkedIn,
  `worksFor` Organization, `knowsAbout`) + BreadcrumbList.
- **Eine Entität:** Person-`@id` `https://www.codaai.ai/autor/oliver-parrizas/#person`
  in Glossar (112 Seiten + Hub), Leitfaden DE/EN, allen Blogartikeln, Faktenseite
  (vorher `/#oliver-parrizas`) und Webinar-Schema (performer).
- **Glossar/Leitfaden:** `GLOSSAR_AUTHOR` liest aus `autor.ts`; Autorenzeile verlinkt
  mit `rel="author"` auf die Autorenseite (vorher Anja → /co-create/).
- **Blog:** alle 29 Artikel (DE 16, EN 13) `author: "Oliver Parrizas"` mit Titel,
  Bio, Foto (96-px-Variante `public/images/team/oliver-parrizas-96.webp`);
  vorher „CodaAI Redaktion“ / „CodaAI Editorial Team“. Name verlinkt auf Autorenseite.
- **Faktenseite:** Personen-Zeile und Abschnitt „Wer steht hinter CodaAI?“ nennen Oli
  als Autor und verlinken die Autorenseite.
- Footer-Spalte Wissen, llms.txt (DE/EN), llms-full.txt, `i18n-routes.ts`,
  `EXTRA_SOURCES` in `astro.config.mjs`.

## Pflege

Weitere Profile (Xing, YouTube, Podcast-Auftritte, Fachartikel) nur in
`AUTOR.sameAs` eintragen — Schema überall zieht automatisch nach.
Auf LinkedIn im Profil (Abschnitt „Website“/„Kontaktinfo“) die Autorenseite
eintragen, damit der Verweis in beide Richtungen besteht.
