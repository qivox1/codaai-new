# Snapshot-Ergebnis: H1 mit Befund, Gründe links, heller Vergleichs-Kasten (02.10.2026, Freigabe Oli)

**Anlass:** Mehr Schmerz und mehr Fokus auf den einen Knopf „Wettbewerbsvergleich anfordern“. Prototyp mit jenz.de (Frage „Welcher Hersteller für Biomasse-Zerkleinerungsmaschinen …“), Freigabe Oli: „Bitte so konkret umsetzen und live veröffentlichen.“

## Umgesetzt (Startseite, Deutsch)

- **H1 beantwortet ihre Frage** direkt mit dem Ergebnis (`snapshot:ergebnis`), Kipp-Animation neu:
  - Wettbewerber vorn: „Die KI empfiehlt {W}. / Vor {Marke}.“ ({W} = am häufigsten vor dem Besucher, nicht „zuerst“!)
  - Nicht genannt: „Die KI empfiehlt {bis 3 Namen, ≤ 30 Zeichen}. / Nicht {Marke}.“
  - Überall vorn: „Die KI empfiehlt {Marke}. / Bei dieser Frage.“ · sonst „Die KI nennt {Marke}. / Aber nicht als Erste.“
  - Lange Zeile 1 (> 36 Zeichen) → `.h1-lang` kleiner. Verlässt der Snapshot den Zustand `res` („Andere Frage prüfen“), springt die H1 zurück. SEO unberührt (statisches HTML unverändert).
- **Links oben „Zwei Gründe haben wir auf {domain} schon gefunden“** aus dem Snapshot: Quellen (eigene Website seltener zitiert als andere), Bekanntheit (Steckbrief ungenau/falsch/unbekannt), Technik (fehlgeschlagene Prüfungen, je Titel + Erklärzeile). Max. 3. KI-Logozeile links weicht; bei Platzmangel zweistufig erst Zeilenabstand, dann Unterzeile „Dort, wo …“ (`wvp-eng1`/`wvp-eng`).
- **„Die übrigen Gründe zeigt der Wettbewerbsvergleich“** (`[data-wvp-offen]`) direkt über dem Kasten.
- **Vergleichs-Kasten hell** (weiß, Grautöne, Pink nur für die eigene Firma), Satz „Der Vergleich prüft 20 Kundenfragen: Wer liegt vorn – und warum?“, offene Kästchen mit „?“ + „Wer gewinnt sie?“. Linke Überschrift entfällt (nur DE).
- **Unterkante des linken Kastens bündig mit der Unterkante der Snapshot-Karte** (`ausrichten(st)`, ResizeObserver auf `#snapshot .snap`).
- **Rechts im dunklen Abschluss nur Frage + Knopf:** „Was macht {W} besser? / Der Wettbewerbsvergleich zeigt es Ihnen.“ (VL/ML eigene Zeile 2; nicht genannt: „Warum empfiehlt die KI andere?“). Fortschrittsbalken nur DE ausgeblendet. Gilt nur für `source === 'home'`.
- **Rechts entfällt die eingeklappte Hinweis-Zeile** auf der Startseite, wenn links Gründe stehen.
- **„Stichprobe vom …“** steht als unauffällige Zeile über die volle Breite unter Karte und Kasten (`#hero-disc`, Text wird kopiert; Original in der Karte ausgeblendet) — DE + EN.

## Englisch
`SnapshotModuleEn.astro` **nicht** neu erzeugt (bewusst, englische Fassung folgt). Auf `/en/` wirken nur: heller Kasten, Ausrichtung an der Kartenunterkante, Hinweiszeile über volle Breite. H1, Gründe, neue Abschluss-Texte nur DE (`html[lang^="de"]`, `en`-Weichen).

## Arbeitsordner
`umbau-digital-visibility/snapshot-befunde-2026-10-02/`: Skripte `proto_befunde.py` → `proto_h1_hell.py` → `proto_feinschliff.py` → `proto_buendig_unten.py` → `proto_hinweis_breit.py` (in dieser Reihenfolge auf das Repo angewendet), Backups in `backup/`, Vorher/Nachher-Bilder jenz.de.

## Nachtrag 02.10.2026 nachmittags (Test Oli mit piepenbrock.de)

1. **Abgeschnittene Frage behoben:** Wer auf „Prüfen“ klickte, während sich der Fragenvorschlag eintippte, schickte den halben Satz ab (z. B. „… große Industrieunt“). Jetzt vervollständigt ein Submit-Listener (Capture) im Vorschlagsblock die Frage vor dem Absenden. Mit Playwright geprüft: Klick bei „Welcher Dienstleister“ → gesendet wird die ganze Frage.
2. **Technik ohne Befund sichtbar:** Sind alle 6 Technik-Punkte in Ordnung und gibt es keine anderen Gründe, steht links „Technisch ist {domain} gut aufgestellt“ mit 6 grünen Haken (zweispaltig) und „Warum {W} trotzdem vorn liegt, zeigt der Wettbewerbsvergleich“. Gibt es Gründe, aber keinen Technik-Befund, kommt unter die Gründe „✓ Technik geprüft: alle 6 Punkte in Ordnung“. Ereignis `snapshot:ergebnis` trägt dafür `technik`.
3. **Vergleichs-Kasten ruhiger:** drei Größen (15 px Titel halbfett, 13 px Zeilen, 12 px Beschriftungen), Zahlen nicht mehr fett (nur eigene Firma halbfett), Namensspalte 150 px.
H1 mit langen Namen (z. B. „Die KI empfiehlt ISS Facility Services.“) wird ab 37 Zeichen automatisch kleiner gesetzt — so belassen.
Skripte: `fix_technik_typo_frage.py`, `fix_technik_ok_zeile.py`.
