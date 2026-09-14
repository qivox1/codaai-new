# squirrelscan-Audit 14.09.2026 — Agent Experience, Performance, Security

**Ausgangslage (live, 161 Seiten, squirrel 0.0.95):** 72/100, Grade C.
Performance 48 · Security 47 · Agent Experience 51 · Content 58 · Accessibility 76.
0 Fehler, 1.906 Warnungen.

Oli hat die drei schwächsten Bereiche in dieser Reihenfolge angesetzt:
**Agent Experience → Performance → Security.**

## Gemessen, nicht geschätzt

Ein Vergleich gegen die Live-Seite hätte den Deploy vorausgesetzt. Stattdessen
wurden **zwei lokale Builds** gegeneinander gemessen: `git archive HEAD` (Stand
vor der Session) und der Arbeitsstand, beide über `python3 -m http.server`
ausgeliefert, beide mit `squirrel audit --coverage full`.

Die absoluten Zahlen liegen niedriger als live (58 statt 72), weil auf
`127.0.0.1` jede kanonische URL und jeder hreflang-Verweis ins Leere zeigt —
daher 323 Fehler in beiden Läufen. **Die Differenz ist trotzdem belastbar**,
weil beide Läufe denselben Nachteil tragen.

| | vorher | nachher |
|---|---|---|
| Gesamt | 58 (F) | **62 (D)** |
| Performance | 42 | **45** |
| Warnungen | 2.367 | **1.947** |
| `images/svg-inline` | 158 Seiten | **weg** |
| `perf/dom-size` | 158 Seiten | **11** |
| `perf/lcp-hints` | 116 Seiten | **6** |
| `ax/markdown-response` | offen | **erfüllt** |
| `ax/token-weight` | 135 Seiten | 131 |

Sichtbarer Text als Anteil am HTML — die Kennzahl hinter `ax/token-weight`:

| Seite | vorher | nachher |
|---|---|---|
| Startseite | 11,7 % (117 KB) | **16,1 %** (85 KB) |
| Glossarseite | 10,4 % (46 KB) | **12,3 %** (39 KB) |
| Blogartikel | 24,4 % (73 KB) | **27,2 %** (65 KB) |
| Blog-Übersicht | 7,9 % (53 KB) | 9,2 % (46 KB) |

## Was geändert wurde

### 1. Punktkarte aus dem Footer ausgelagert

`src/components/Footer.astro` trug die Deutschlandkarte des Studien-Teasers als
**inline SVG mit 215 `<use>`-Knoten und 6,8 KB** — auf jeder der 159 Seiten neu
übertragen. Sie war allein für den Befund „Element mit 215 Kindern" (`perf/dom-size`,
158 Seiten) verantwortlich und machte auf einer Glossarseite ein Sechstel des
Quelltextes aus.

Jetzt `public/images/studien-karte-de.svg` als `<img>` — einmal geladen, danach
aus dem Cache. Die Farbe (`navy-200` / `--muted-foreground-on-dark`) steht fest
in der Datei statt über `currentColor` zu erben; der Block liegt immer auf
dunklem Grund, also unkritisch. `perf/dom-size` fällt von 158 auf 11 Seiten.

### 2. Startseiten-Skript als Datei

Der Block `codaHomeInit` lag mit **24,7 KB als `<script is:inline>`** im HTML von
`/` **und** `/en/`. Jetzt `public/vendor/home-init.js`, eingebunden mit `defer`
**nach** gsap, ScrollTrigger und lenis — `defer` hält die Reihenfolge ein, der
Init hängt weiterhin an `DOMContentLoaded`.

Der Code ist **byte-identisch** übernommen (geprüft gegen `git show HEAD:`),
nur der Ort hat sich geändert. Dadurch fällt die Startseite von 117 KB auf 85 KB.

Bewusst **nicht minifiziert**: die Kommentare im Skript erklären Entscheidungen,
die sonst nirgends stehen. `perf/unminified-js` (~7,5 KB Ersparnis) bleibt
deshalb stehen — bezahlter Preis.

### 3. Markdown-Fassung jeder Inhaltsseite

Neu: **131 `.md`-Dateien**, erzeugt von `src/lib/md-variant.ts` über vier
Endpunkte (`[slug].md.ts` je Sprache und Sammlung) plus `src/pages/index.md.ts`
und `src/pages/en/index.md.ts`.

| HTML | Markdown |
|---|---|
| `/` · `/en/` | `/index.md` · `/en/index.md` |
| `/blog/<slug>/` | `/blog/<slug>.md` |
| `/en/blog/<slug>/` | `/en/blog/<slug>.md` |
| `/wissen/geo-glossar/<slug>/` | `/wissen/geo-glossar/<slug>.md` |
| `/en/knowledge/geo-glossary/<slug>/` | `/en/knowledge/geo-glossary/<slug>.md` |

Jede HTML-Seite nennt ihre Fassung im `<head>`:
`<link rel="alternate" type="text/markdown">` (neue Layout-Prop `mdVariant`).

Größenordnung: `/wissen/geo-glossar/chunking/` sind **38.773 Bytes HTML**,
`chunking.md` sind **2.236 Bytes** — 94 % weniger für ein Modell, das den
Begriff nachschlägt. Die Datei beginnt mit Titel, Kurzdefinition, Quell-URL,
Datum und Zitierregel; wurzel-relative Links werden absolut gemacht, damit der
Text auch außerhalb der Domain funktioniert.

`noindex`-Inhalte bekommen **keine** Markdown-Variante — was aus dem Index raus
soll, soll nicht über einen zweiten Weg wieder hinein.

**`/index.md` ist handgepflegt** (`src/data/home-md.ts`), nicht generiert: die
Startseite ist eine Scroll-Choreografie, ihre Aussage steht verteilt auf Szenen.
Wer H1, Positionierung, die drei Stufen oder den Grundpreis ändert, ändert dort
mit — dieselbe Pflegeregel wie bei `public/llms.txt`.

`llms.txt` und `AGENTS.md` führen die Markdown-Adressen jetzt auf.

### 4. Glossar-Avatar in den Hintergrund

Der 40-px-Avatar im Autorenkasten war das **einzige `<img>`** einer Glossarseite
und galt jedem Prüfer als LCP-Kandidat (`perf/lcp-hints` auf 112 Seiten).
`loading="lazy"` verschob den Befund nur nach `perf/lazy-above-fold` — der Kasten
steht direkt unter der Überschrift und ist tatsächlich im ersten Bild (im
Zwischenlauf gemessen: 24 → 134 Seiten).

Richtig ist: das Bild trägt `alt=""`, ist also Schmuck neben einem Namen, der
danebensteht — und gehört damit ins Stylesheet. Jetzt ein dekorativer
`background-image` (mit `image-set` für 2×) auf einem `aria-hidden`-`<span>`.
`perf/lcp-hints` fällt von 116 auf 6 Seiten, `perf/lazy-above-fold` bleibt bei 24.

### 5. Security — Befund statt Fix

`security/csp` und `security/x-frame-options` sind **im Repo nicht lösbar**.
Gemessen am 14.09.2026 liefert `www.codaai.ai` genau einen Sicherheitsheader
(`strict-transport-security`, von GitHub Pages selbst gesetzt). Eigene
Response-Header lässt GitHub Pages nicht zu.

Die Seite liefert bereits eine vollständige CSP als `<meta http-equiv>` plus
JS-Frame-Busting — Browser werten das aus, Scanner lesen nur Header.

Der einzige echte Weg ist ein Proxy davor. Die fertige Cloudflare-Konfiguration,
die Voraussetzungen und die Risiken (DNS-Zone liegt bei IONOS, dort hängen die
Mail-Einträge der Versand-Domains) stehen in
[`2026-09-14-security-header-grenze.md`](2026-09-14-security-header-grenze.md).
Dort steht auch der Weg für `security/form-captcha` (Cloudflare Turnstile) — er
hängt an derselben Entscheidung.

## Was bewusst offen bleibt

- **`ax/token-weight` auf 131 Seiten.** Auf inhaltsarmen Seiten (Glossar,
  Übersichten) sind Navigation (3,1 KB), Footer (6,1 KB) und JSON-LD (4,2 KB) ein
  fester Sockel von rund 16 KB. Um 15 % zu erreichen, müssten Footer oder
  Navigation schrumpfen — das ist eine Gestaltungsfrage, kein Audit-Fix. Für
  Agenten ist die `.md`-Fassung die Antwort, nicht ein amputierter Footer.
- **`perf/lazy-above-fold` auf 24 Seiten.** Die Regel prüft die ersten drei
  `<img>` in Dokumentreihenfolge, nicht die tatsächliche Position. Die
  bemängelten Bilder stehen bei 55–75 % der Seitenlänge, also weit unter der
  Falz. `loading="lazy"` ist dort richtig; es zu entfernen würde die Seite für
  echte Besucher langsamer machen.
- **`perf/unminified-js` für gsap und ScrollTrigger.** Das sind die offiziellen
  `.min.js`-Builds; squirrelscan schließt aus langen Funktionsnamen auf
  unminifiziert. Falsch positiv.
