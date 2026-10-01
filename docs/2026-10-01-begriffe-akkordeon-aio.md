# 01.10.2026 — Startseite: Begriffe-Akkordeon mit AIO und Mini-Szenen

**Anlass:** Oli fand die Erklärungen im YouTube-Video „SEO, AIO, GEO, AEO“ (EBCgIucDVWs)
eingängig — ein Beispiel je Begriff, schlecht/gut-Gegenüberstellung, Merksatz, „alles baut auf
SEO auf“. Prototyp: `umbau-digital-visibility/prototyp-begriffe-akkordeon-aio.html`, Freigabe
durch Oli mit einer Änderung: AIO gehört in die H2.

## Was sich geändert hat (Abschnitt `#stellen`, DE + EN)

- **H2** endet jetzt auf „… (GEO). Vorausgesetzt, die KI versteht Sie (AIO).“ /
  „… (GEO). Provided the AI understands you (AIO).“
- **Akkordeon-Knopf:** „Was die vier Begriffe bedeuten – an einem Beispiel“.
- **Vier Begriffe als Weg** statt drei Tab-Knöpfe: SEO *gefunden* → AIO *verstanden* →
  AEO *als Antwort genutzt* → GEO *beim Namen genannt*; Linie füllt sich Navy → Magenta.
  Bewusst nicht die Stufenwörter Gefunden/Empfohlen/Zitiert (dort ist „Zitiert“ die Spitze).
- **Je Begriff:** Erklärung, ✕/✓-Gegenüberstellung (AIO: „Drei Hebel“), Merksatz im
  Marken-Verlauf; darunter die Merkzeile aller vier plus „Vier Kürzel, ein Fundament“.
- **Mini-Szene je Begriff** (aria-hidden), durchgehendes, frei erfundenes Beispiel
  „Muster Pumpen GmbH“ / „Example Pumps Ltd“: SERP mit Aufstieg 4 → 1 (FLIP), KI liest die
  Website (Floskeln durchgestrichen, Fakten als Chips), KI-Übersicht mit eigener Domain als
  Quelle, Chat-Empfehlung mit „Ihr Name“. Läuft nur auf Klick; reduced-motion = Endbild.
  Das Markup trägt den Endzustand (ohne JS vollständig).
- `src/data/home-md.ts`: Markdown-Fassung um den AIO-Absatz und die Merkzeile ergänzt.
- `public/vendor/home-init.js`: alter Tab-Block ersetzt; Einbindung mit `?v=20261001`,
  damit HTML und Skript nach dem Deploy nicht auseinanderlaufen.

## Fallstrick

`--card` ist in `#cai-premium` als `hsl(var(--card))` auf sich selbst definiert und damit
ungültig (transparent). Neue Flächen nehmen `var(--bg)`. Die übrigen `var(--card)`-Stellen
der Startseite sind davon ebenfalls betroffen — nicht in dieser Änderung angefasst.
