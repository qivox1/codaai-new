# CodaAI Design Guide v2.2 — Abschnitt 11 „Bildwelt" (neu gefasst)

**Stand:** 22.09.2026 · **Beschluss Oli** (Befragung Bildwelt, 22.09.2026) · ersetzt Abschnitt 11 und 11b aus v2.1 (04.08.2026).
Alle übrigen Abschnitte von v2.1 gelten unverändert. Der Guide selbst ist ein Claude-Design-Artefakt (Link in `CLAUDE.md`, Abschnitt 2); bis er dort nachgezogen ist, **gilt diese Datei**.

## Warum die Änderung

v2.1 erlaubte vier Motivtypen (Beleg, Diagramm, echter Mensch mit Zustimmung, typografischer Header) und schloss Stockfotos aus. In der Praxis entstanden daraus drei Stile nebeneinander: Belege aus Code, generierte Fotoszenen (17.09.2026, ohne Kennzeichen — ein Widerspruch zu v2.1) und Agenturbilder aus der Zeit vor dem Umbau. Ein Shooting ist derzeit nicht gewollt, KI-generierte Bilder sollen es nicht sein. v2.2 macht deshalb **echte Fotos aus freien Bilddatenbanken** zulässig — unter Regeln, die Authentizität prüfbar machen — und legt die Gestaltung so fest, dass der Stil über Farbbehandlung und Befund-Karte entsteht, nicht über das Motiv.

## 11 · Bildwelt

> **„Ein Bild auf dieser Seite belegt etwas oder zeigt echte Menschen bei echter Arbeit. Alles andere verdient keinen Platz."**

### 11.1 Erlaubte Motive

| # | Motiv | Wo | Gebaut als |
|---|---|---|---|
| 1 | **Titelbild Blog** = echtes Foto + Farbbehandlung + Befund-Karte | Blogartikel, Share-Bild des Artikels | Generator `bildwelt-blog-2026-08-05/hero-foto/build_hero_foto.py` |
| 2 | **Grafik im Text** (6 Typen) | Blog, Wissensseiten | Code: ```` ```grafik ````-Block → `src/lib/remark-grafik.mjs` |
| 3 | **Diagramm** | Pillar, Studie, Leistungsseiten | Code (inline SVG/HTML), nie eine Datei |
| 4 | **Beleg** (Oberfläche mit Alpha Systems / Beta Technik / Gamma Group) | wo ein Mechanismus gezeigt wird, z. B. Share-Bilder | HTML → Bildschirmfoto |
| 5 | **Echter Mensch aus dem Team** | Autorenseite, Team | Fotografie mit Zustimmung |

### 11.2 Fotos aus Bilddatenbanken

- **Quellen:** Kaboompics (bevorzugt: Fotoserien mit denselben Personen), Unsplash (ohne Unsplash+), Pexels; ergänzend Burst, StockSnap, Wikimedia Commons. Pixabay nur mit Einzelprüfung, weil dort KI-Bilder zugelassen sind.
- **Nicht zulässig:** KI-generierte oder KI-veränderte Fotos, Montagen, die als echt gelesen werden sollen.
- **Echtheits-Regeln (alle müssen erfüllt sein):** niemand schaut in die Kamera · keine gestellten Posen, kein Handschlag, kein Jubel · Tageslicht in echten Räumen · Mittelstands-Umgebung statt Start-up-Loft (Werkhalle, Besprechungsraum, Messestand, Büro, Labor) · Menschen bei einer erkennbaren Tätigkeit · keine sichtbaren Logos oder Markenprodukte.
- **Weiter ausgeschlossen:** Konzeptillustration, Roboter, Datenströme, Glasoptik, Bokeh-Funkeln, irisierendes Pastell, Grün und Petrol als Stimmung.
- **Nachweis:** jedes Foto in `src/data/bildnachweise.ts` (URL, Fotograf, Plattform, Lizenz, Abrufdatum, Seiten). Das Impressum zeigt die Nachweise je URL.

### 11.3 Titelbild — feste Gestaltung

| | Wert |
|---|---|
| Format | 1600 × 900, WebP, Metadaten nicht strippen |
| Farbbehandlung | 18 % entsättigt, leicht wärmer (Sepia 8 %), Kontrast +3 %, Navy-Schatten (navy-900, Multiply, 38 % → 0) zur Kartenseite; **in die Datei gerechnet**, nie per CSS |
| Befund-Karte | Weiß, Radius 22, Rahmen navy-200, Schatten; Überzeile „Befund"/„Finding" (Mono, Versalien), Kennzahl 120 px navy, **ein Satz** 40 px, Quelle 20 px |
| Position | vertikal mittig, links (x 120) oder rechts gespiegelt — nie über Gesichtern |
| Sichere Zone | Detailseite beschneidet oben/unten ~165 px, Blogkarte ~46 px; Karte bleibt in beiden Zuschnitten vollständig |
| Magenta | **genau ein** Element: der 8-px-Balken links an der Karte |
| Sprache | DE und EN je eigener Export (die Karte ist Text) |
| `alt` | nennt den Befund, nicht das Motiv |

### 11.4 Grafiken im Text

Je Blogartikel **zwei**: eine zeigt die Kennzahl des Artikels, eine erklärt den Mechanismus. Sechs Typen: `kennzahl_vergleich`, `anteil`, `kette`, `ki_antwort`, `vorher_nachher`, `entscheidung` (Felder: `docs/2026-09-22-blog-redaktionsplan-2026-27.md`, Abschnitt 5.3). Aufbau nach dem Muster der LinkedIn-Karussells: Überzeile (Mono, Versalien) · Titel · Grafik · Quellenzeile. Farben nur aus Tokens (navy-50 … navy-800), Kennzahlen in `--data`.

### 11b · Magenta im Bild

Unverändert im Grundsatz: höchstens **ein** magenta Element je Bild oder Grafik, und es markiert die Fehlstelle oder die Pointe. Kein magenta Schein, Verlauf oder Glanz. Kennzahlen selbst sind Messungen und bleiben Navy.

## Was aus v2.1 entfällt

- Der Ausschluss „Stockfotos von Menschen" (ersetzt durch 11.2).
- Der typografische Header als Blog-Titelbild (bleibt für Zitate auf anderen Seiten möglich).
- Die Regel „Kein Blog-Header entsteht in einem Bildgenerator" bleibt — verschärft: auch keine generierten Szenen mit montiertem Beleg mehr (Stand 17.09.2026, wird mit der Umstellung ersetzt).
