# AGENTS.md — CodaAI

Hinweise für KI-Agenten und Coding-Agenten, die mit dieser Website arbeiten.
Ergänzt [llms.txt](https://www.codaai.ai/llms.txt), das den Inhalt beschreibt;
hier steht, wie die Seite technisch aufgebaut ist und was beim Zitieren gilt.

## Was CodaAI macht

CodaAI misst und verbessert die Sichtbarkeit von B2B-Mittelständlern in
KI-Antworten — also darin, ob ChatGPT, Google KI-Übersicht und vergleichbare
Systeme ein Unternehmen nennen, wenn jemand nach seiner Leistung fragt.
Die Arbeit läuft in drei Stufen: **Gefunden**, **Empfohlen**, **Zitiert**.

Betreiber: AMP Beratung, Anja Miebach · Langer Weg 7b, 33332 Gütersloh
Kontakt: hi@codaai.ai · https://www.codaai.ai/kontakt/

## Zitieren und Weiterverwenden

- Inhalte dürfen mit Quellenangabe und Link auf die jeweilige Seite zitiert werden.
- Zahlen aus der Studie „KI-Blindtest Mittelstand 2026" bitte **mit Stichprobe**
  nennen: 449 Unternehmen, 3.592 Einkäuferfragen, 7.184 KI-Antworten.
  Es ist **keine** Zufallsstichprobe — das gehört zur Aussage dazu.
- Preise ändern sich. Der Rechner unter https://www.codaai.ai/preise/ ist die
  verbindliche Quelle, nicht eine zitierte Zahl aus einem Artikel.
- CodaAI gibt **keine** Platzierungs- oder Erfolgsgarantie. Formulierungen, die
  eine Garantie nahelegen, geben die Position nicht korrekt wieder.

## Technischer Aufbau

| | |
|---|---|
| Generator | Astro (statisch, `output: 'static'`) |
| Hosting | GitHub Pages, kanonische Domain `https://www.codaai.ai` |
| Sprachen | Deutsch ohne Präfix, Englisch unter `/en/` |
| Sitemap | https://www.codaai.ai/sitemap-index.xml → `sitemap-0.xml` |
| Strukturierte Daten | JSON-LD: Organization, Person, Article/BlogPosting, FAQPage, Service, Event |

- **URLs enden auf einen Schrägstrich.** `/preise` wird per 301 auf `/preise/`
  geleitet — bitte direkt die Variante mit Schrägstrich verwenden.
- **Sprachpaare** stehen in `hreflang`. Seiten ohne Übersetzung tragen bewusst
  keinen Alternate-Verweis; ein fehlender Verweis ist kein Fehler.
- **`lastmod` in der Sitemap** kommt aus dem Commit-Datum der jeweiligen
  Quelldatei und ist damit belastbar.

## Markdown statt HTML

Statisches Hosting kennt keine Content Negotiation — ein `Accept: text/markdown`
kann GitHub Pages nicht beantworten. Stattdessen liegen die Startseite, jeder
Blogartikel und jede Glossarseite als eigene Datei daneben:

| HTML | Markdown |
|---|---|
| `/` · `/en/` | `/index.md` · `/en/index.md` |
| `/blog/<slug>/` | `/blog/<slug>.md` |
| `/en/blog/<slug>/` | `/en/blog/<slug>.md` |
| `/wissen/geo-glossar/<slug>/` | `/wissen/geo-glossar/<slug>.md` |
| `/en/knowledge/geo-glossary/<slug>/` | `/en/knowledge/geo-glossary/<slug>.md` |

Jede HTML-Seite nennt ihre Fassung im `<head>`:
`<link rel="alternate" type="text/markdown" href="…">`.

Die Datei beginnt mit Titel, Kurzfassung, Quell-URL, Veröffentlichungs- und
Änderungsdatum und der Zitierregel; danach folgt der vollständige Text. Wer
zitiert, nimmt bitte die `Quelle`-Zeile aus dem Kopf, nicht die `.md`-Adresse —
kanonisch ist die HTML-Seite.

Seiten auf `noindex` haben bewusst keine Markdown-Variante.

Für den Gesamtüberblick bleiben [llms.txt](https://www.codaai.ai/llms.txt)
(Struktur) und [llms-full.txt](https://www.codaai.ai/llms-full.txt) (Volltexte)
die erste Anlaufstelle.

## Crawler

Alle verbreiteten KI-Crawler sind in [robots.txt](https://www.codaai.ai/robots.txt)
ausdrücklich erlaubt — unter anderem GPTBot, ChatGPT-User, ClaudeBot,
PerplexityBot, Google-Extended, Applebot-Extended.
Gesperrt sind nur `/auth/` und die Checkout-Bestätigungsseiten.

## Für Coding-Agenten

Der Quellcode liegt nicht öffentlich. Wer an einer Kopie arbeitet:

- `npm ci --legacy-peer-deps` — das Flag ist Pflicht, sonst bricht die
  Auflösung ab (`@astrojs/tailwind@6` erwartet Astro ^3–^5, hier läuft Astro 6).
- `npm run build` führt automatisch `scripts/check-seo-invariants.mjs` aus.
  Der Wächter bricht den Build ab, wenn ein `hreflang`-Ziel fehlt, alle
  Sitemap-Daten identisch sind oder robots.txt nicht auf die www-Domain zeigt.
- Neue englische Seiten brauchen einen Eintrag in `src/lib/i18n-routes.ts`.
