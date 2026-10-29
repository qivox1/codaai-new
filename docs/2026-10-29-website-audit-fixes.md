# Website-Audit 29.10.2026 – Befunde und Korrekturen

**Stand:** lokal umgesetzt, gebaut und geprüft (228 Seiten, SEO-Wächter grün). **Noch nicht committet/gepusht.**

## Ausgangslage (Live-Audit, 227 Seiten)
Gesamt 82 (B), 6 Fehler. SEO 86 · Performance 62 · Security 91 · Agents 52.
Structured Data 77 · Core SEO 92 · Images 77 · Crawlability 87 · Accessibility 97.

## Lokales Nach-Audit (gleicher Umfang, gegen den Build)
SEO-Fehler 6 → **0**. SEO 86 → **91**, Structured Data 77 → **94**, Core SEO 92 → **100**,
Images 77 → **100**, Crawlability 87 → **97**, Accessibility 97 → **98**.
Performance lokal nicht vergleichbar (Python-Testserver ohne Kompression, TTFB ~1 s) –
nach dem Deploy mit `--refresh` gegen die Live-Site nachmessen.

## Änderungen
**A · Kleinkorrekturen**
- `/studie`, `/en/study`: „#“-Anker ohne `aria-label`, Zusatz als `sr-only` (WCAG 2.5.3).
- JSON-LD: `publisher`/`worksFor`/`organizer` verweisen auf `https://www.codaai.ai/#organization`
  (Blog-Übersicht + Artikel DE/EN, GeoPillar, GlossarTerm, Webinar). Blog-Übersicht: Autor über
  `autorSchemaRef()` mit Person-`@id`. Organization-`image` in beiden Sprachen `og-image.png`.
- Skip-Link-Ziel `id="main-content"` auf 11 Seiten ergänzt (AGB, Datenschutz, Impressum, Preise,
  Pricing, Digital Visibility DE/EN, Co-Create, 404 DE/EN, Circle).
- Digital Visibility DE/EN: `BreadcrumbList` zum sichtbaren Breadcrumb.
- Co-Create DE/EN: `dateModified` aus `lastmod.mjs` statt fest eingetragen (Regel „eine Datumsquelle“).
- KI-Logos unterhalb des Kopfbereichs mit `loading="lazy"` (Snapshot-Ergebnis, Teaser, Startseite).
- `public/.well-known/security.txt` (RFC 9116). **Expires 28.10.2027 – jährlich erneuern.**

**B · Meta-Descriptions** auf 150–160 Zeichen: /fakten, /en/facts, /faq, Autorenseite DE/EN,
/en/blog, /wissen/geo-optimierung, /en/knowledge/geo-optimization.

**C · Filter-Parameter → Sprungmarken**
- Preisrechner: `/preise/#stufe-<key>`, `/en/pricing/#tier-<key>` (Sprungziele im Rechner,
  `hashchange` wird gelesen). Alte `?stufe=`/`?tier=`-Links funktionieren weiter.
- Blogfilter: `/blog/#reihe-<id>`; „Alle Artikel“ hebt den Filter ohne Neuladen auf. `?reihe=` greift weiter.
- **Nebenbefund behoben:** Der Filter hat live nie gefiltert – das Inline-Skript stand über der
  Kartenliste und lief, bevor es Karten gab. Jetzt auf `DOMContentLoaded`.

**D · Bild-Ladestrategie:** im Browser gemessen (1440 und 390 px) – alle gemeldeten Lazy-Bilder
liegen bei ≥ 1.500 px (Blog-Autorbild unten) bzw. ≥ 3.800 px (Studie, Webinar). **Fehlalarm, keine Änderung.**

## Bewusst nicht geändert (Fehlalarme / Entscheidungen)
„null“ und „your company name“ sind echter Text · Keyword-Dichte (Pexels, Sie, Stufe) ·
Kosten-Artikel noindex ohne Rich-Schema · /check/ ist Weiterleitung · BlogPosting statt Article ·
Inline-SVG-Diagramme · >100 Links im Glossar-Hub · CSP/X-Frame (GitHub Pages) · Captcha (DOI) ·
GSAP-Builds · Token-Gewicht (.md-Fassungen) · Person-`url`/Beschreibung je Sprache ·
`/fakten`-Titel mit Marke vorn · fehlende Kontaktseite (offene Entscheidung).

## Zu beachten beim Commit
Seiten mit Git-Datum (Preise, Pricing, Digital Visibility, Rechtsseiten, Co-Create, FAQ, Webinar,
Startseite) bekommen durch den Commit ein neues `lastmod`, obwohl sich nur Template/Meta ändern.
