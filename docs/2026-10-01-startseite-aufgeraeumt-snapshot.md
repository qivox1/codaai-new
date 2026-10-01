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

## Nachtrag 01.10.2026 (abends): Teaser nur Link, FAQ, Englisch

- **Teaser ohne Formular** (Rückmeldung Oli: Eingaben im Glossar, dann „passiert nichts“ — der
  Autostart greift erst ab 25 Zeichen Frage). `SnapshotTeaser` hat nur noch Text + Knopf auf
  `/#snapshot` bzw. `/en/#snapshot`; die Startseite setzt bei `#snapshot` den Fokus ins Website-Feld.
- **FAQ:** Die sechs Fragen der früheren Snapshot-Seite stehen als Gruppe „Visibility Snapshot“ auf
  `/faq` (`faqSnapshot`) und `/en/faq` (`faqSnapshotEn`) — FAQPage-Schema dort NUR für diese Gruppe.
- **Englisch komplett:** `/en/` hat denselben Aufbau wie `/` mit `SnapshotModuleEn` (generiert aus
  `SnapshotModule.astro` durch `scripts/make-snapshot-en.py` — **bei jeder Änderung am deutschen
  Modul neu erzeugen**). Alle EN-Audit-Formulare ersetzt, `/en/check/` = Weiterleitung auf
  `/en/#snapshot`, Datenschutz EN um Abschnitt „Visibility Snapshot“ + Resend/Cloudflare ergänzt.
- **Backend** (audit.codaai.ai, Pipeline-CLAUDE.md 4.38): `ai_frage.py` versteht `lang: "en"`
  (Marker `SPRACHE-EN-20261001`; Hinweise, Vorschlag, Technik, DOI-Mail, Namensseite englisch,
  Google AI Mode mit `language_code` en); `wv.py` erzeugt für EN-Leads englische Fragen und rendert
  `wv_render_en.py` (generiert von `make_wv_render_en.py`). EN-Termin-Anker ist `#appointment`.
- `home-init.js?v=20261001b` (Cache-Wechsel wegen Fokus-Logik).
