# Snapshot-Ergebnis kompakt + Vergleichs-Fläche links (01.10.2026, Abnahme Oli)

**Anlass:** Nach dem Ergebnis wurde der Kopfbereich der Startseite sehr lang (2.065 px), das E-Mail-Feld kam erst nach 1,5 Bildschirmhöhen, die Vorteile des Wettbewerbsvergleichs gingen im Text unter. Ziel: höhere Conversion für LinkedIn-Kampagnen.

## Umgesetzt (DE + EN)

**Rechts, Ergebniskarte (`SnapshotModule.astro`):**
- Frage + kleines Vorschaubild nebeneinander (`.snap-qrow`) statt Screenshot in voller Breite.
- Logo-Zeile mit Platz/× (`[data-reslogos]`) statt vier Tabellenzeilen „Platz 2 – hinter …“.
- Eine Zeile „Vor Ihnen: …“ bzw. „Stattdessen empfohlen: …“ (`[data-vorn]`); „Ebenfalls empfohlen“ und Abdeckungszeile ausgeblendet.
- Quellen/Bekanntheit/Technik als eingeklappte Zeile (`<details data-findbox>`, z. B. „2 Technik-Hinweise für Ihre Website“).
- Dunkler Abschluss kompakt: Überschrift je Rolle/Befund, Fortschrittsbalken „1 von rund N Kundenfragen geprüft · im Vergleich: 20“ (`[data-acov]`), E-Mail, **ein** Knopf. Erklärtext + vier Punkte ausgeblendet.
- Neues Ereignis `snapshot:ergebnis` (document) mit Domain, Marke, genannt, Fragenschätzung, Top-3-Wettbewerbern.

**Links, unter den KI-Logos (`Home.astro`, `aside#wvp`):**
- Erscheint 2,5 s nach dem Ergebnis: Kicker „KI-Wettbewerbsvergleich“, „Eine Frage geprüft. Ihre Kunden stellen rund N.“ (mittleres Pink), dunkler Kasten (Navy-600 wie rechts) mit Satz zu den echten Wettbewerbern aus dem Ergebnis + Animation aus einem echten anonymen Vergleich (11 von 20 Fragen, Hansgrohe 79 / Grohe 69 / Hersteller 15), als Beispiel gekennzeichnet.
- **Kein eigener Knopf** (Beschluss Oli: nur ein CTA).
- Desktop: Skript `ausrichten()` setzt Oberkante/Höhe des Kastens bündig mit dem dunklen Abschluss rechts (auch bei Resize/Zustandswechsel via ResizeObserver). Handy: unter der Karte.
- dataLayer: `snapshot_wvp_sichtbar`.

**Ergebnis:** Kopfbereich mit Ergebnis 1.194 px statt 2.065 px (Desktop 1440).

**EN:** `scripts/make-snapshot-en.py` um die neuen Texte ergänzt, `SnapshotModuleEn.astro` neu erzeugt; linke Fläche zweisprachig über `lang`.

**Arbeitsordner:** `umbau-digital-visibility/snapshot-kompakt-2026-10-01/` (Prototyp-Skript `proto_snapshot_kompakt.py` v2, `umsetzen_zweisprachig.py`, Screenshots, Video).

## Nachtrag 01.10.2026 abends (Rückmeldung Oli)

1. **Full HD:** Ergebnis inkl. Abschluss und Knopf passt jetzt komplett in 1920×950 (Karte endet bei 872 px, Knopf bei 710 px; auch 1440×820 zeigt den Knopf). Mittel: Kopfbereich oben 150 → 112 px (nur Desktop), Frage 17 px, Vorschaubild 104 px, Logo-Zeile ohne Systemnamen (nur Platz), Satz „Ihr KI-Wettbewerbsvergleich für … per E-Mail“ ausgeblendet (Domain steht im E-Mail-Feld), engere Abstände. Sobald links der Vergleichs-Kasten erscheint, weicht der Einleitungsabsatz (Desktop).
2. **Keine Beispielfirmen mehr links:** Statt „Hansgrohe/Grohe/Der Hersteller“ zeigt der Kasten die **echten Zahlen aus dem Snapshot des Besuchers**: eigene Firma + bis zu drei Wettbewerber, „genannt (von 5)“ und „davon zuerst“, Datum des Snapshots; Raster 1 geprüft · 19 offen. Daten kommen über `snapshot:ergebnis` (`rang`, `stand`, `lvl`); Namensdubletten (Börger/Borger) werden zusammengefasst.
3. Linker und rechter dunkler Kasten auf Full HD und 1440 px pixelgenau bündig.
Skripte: `umbau-digital-visibility/snapshot-kompakt-2026-10-01/optimieren_fhd_echtdaten.py`, `optimieren_fhd_2.py`.
