# 01.10.2026 — Startseite aufgeräumt: Snapshot im Kopfbereich, Audit-Formulare raus (DE)

**Beschlüsse Oli (01.10.2026):** eine Geschichte, ein Werkzeug. Der Visibility Snapshot
ersetzt das Audit-Formular (AuditCTA) als einzigen Lead-Einstieg; die Unterseite
/visibility-snapshot/ wird nicht mehr gebraucht. Der vollständige Befund heißt
„KI-Wettbewerbsvergleich“. Englischer Snapshot folgt („den sauren Apfel beißen“).
Prototyp und Skripte: `umbau-digital-visibility/startseite-aufgeraeumt-2026-10-01/`.

## Startseite (nur DE; EN unverändert, bis es den Snapshot auf Englisch gibt)
- Kopfbereich: `SnapshotModule source="home"` rechts (Anker `#snapshot`) statt der
  getippten KI-Karte; links die fünf KI-Systeme statt des Audit-Felds. Flip-Wort
  „Aufträge vergeben.“ in `--magenta-strong` (= Farbe des Knopfs „Snapshot starten“).
- Entfallen: Snapshot-Teaser, Auftrags-Szene „Nicht genannt. Nicht angefragt. Kein
  Auftrag.“ (`#outcome`, ~2.160 px), drei AuditCTA-Instanzen. Dot-Nav vier Punkte.
- Beispielbereich heißt „Beispiel · KI-Wettbewerbsvergleich“, Einleitung gekürzt,
  Abschluss = Knopf „Snapshot starten ↑“ (`[data-snapgo]`, scrollt + fokussiert).
  Ob der Bereich bleibt, entscheidet Oli später.
- Angebot: „Snapshot starten“ + „Erstgespräch vereinbaren“ statt Audit-Feld.
- Seitenhöhe Desktop 11.576 → ~8.490 px.
- ⚠️ Das Modul nutzt `hsl(var(--card))`; in `#cai-premium` ist `--card` ungültig
  (selbstreferenziell) → `.hero-snap{--card:var(--surface-paper)}`.

## Sitewide (DE)
- `/check/` und `/visibility-snapshot/` sind noindex-Weiterleitungen auf `/#snapshot`
  (Meta-Refresh + `location.replace`, `?d=`/`?q=` werden mitgenommen → Autostart),
  aus Sitemap, `i18n-routes` (Paar /check/ ↔ /en/check/ aufgelöst), `EXTRA_SOURCES`
  und `llms.txt` genommen. `/en/check/` bleibt vorerst.
- Glossar (Hub + Begriffe) und GEO-Leitfaden: `SnapshotTeaser` statt AuditCTA (DE).
- `SnapshotTeaser` neu gestaltet (flach, Mist-Fläche, ein Magenta-Knopf) und springt
  auf `/?d=…&q=…#snapshot` (auch auf /webinar/).
- Blog-Abschlusskasten, Blog-Seitenleiste, Co-Create, Footer → `/#snapshot`.
  Links in Artikeltexten auf /check/ bleiben (Weiterleitung; kein falsches updatedDate).
- `home-md.ts`: Einstieg jetzt Snapshot → KI-Wettbewerbsvergleich.

## Offen
- Englischer Snapshot (Modul-Texte, Backend: Fragen-Vorschlag, Mails, Ergebnis-Texte).
- AuditCTA-Komponente und CheckPage bleiben im Code (EN nutzt sie noch).
- FAQ der früheren Snapshot-Seite (mit Schema) ist mit der Seite entfallen.
