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

## Härtung 02.10.2026 (10 Domains aus der Dashboard-Liste, DE + 4 × EN)
Getestet wie ein Besucher (Domain eintippen, Vorschlag abwarten, absenden; Full HD, 1440, Handy): simona.de, abus.com, icotek.com, https://www.rheinzink.de, linsinger.com, mcairlaids.net, https://www.heggemann.com, hoenle.com, phoenixgroup.eu, http://www.vetter-forks.com; EN: windmoeller.de, stark-roemheld.com, kelvion.com, karlbruckner.de.
Behoben (`haertung_konsistenz.py`):
1. **Falscher Wettbewerber in H1/Abschluss:** „Wer liegt vor Ihnen“ zählte nur Systeme, in denen die eigene Marke vorkommt. simona.de: H1 „aquatherm“, obwohl Rehau 4× genannt wurde (SIMONA 1×); hoenle.com: „Polytec PT“ statt Henkel/Dymax. Jetzt zählen auch die Empfehlungen der Systeme, in denen die Marke fehlt; Gleichstand nach Rangliste. Gilt für H1, Fazit, „Vor Ihnen“-Zeile, Abschluss.
2. **Neuer Zustand `meist`** (eigene Marke in der Mehrheit der Systeme zuerst): H1 „Die KI empfiehlt {Marke}. / Aber nicht überall.“, Abschluss „Wo überholt Sie {W}?“. Vorher falsch: „Die KI empfiehlt VMZINC. Vor RHEINZINK.“ (RHEINZINK 4× zuerst) und „Die KI nennt PHOENIX group. Aber nicht als Erste.“ (PHOENIX 4× zuerst).
3. **Regex-Fehler bei Domains mit Bindestrich** (stark-roemheld, vetter-forks): Live-Prüfung „eigener Name in der Frage“ warf `Invalid escape` — jetzt korrekt, Bindestrich passt auch auf Leerzeichen.
Offen (Bericht an Oli): englische Fassung noch alter Stand; Namensdubletten aus dem Server (Klüh Cleaning/Klüh Service Management, Henkel/Loctite, Panacol/Panacol-Elosol); 404-Rauschen beim Nachladen des Vorschaubilds; Technik-Punkte „nicht prüfbar“ (null) werden nicht erwähnt; Website nicht erreichbar (vetter-forks.com, HTTP 503) → Hinweis ok, aber kein Weg zum Vergleich.

## Abschluss 02.10.2026 abends: Englisch angeglichen + alle offenen Punkte (Freigabe Oli „alles Premium“)
**Website (`stufe8_en_und_fixes.py`, `stufe8b_namen_quellen.py`, `make-snapshot-en.py` erweitert, `SnapshotModuleEn.astro` neu erzeugt):**
- `/en/` zeigt jetzt dasselbe Ergebnis wie DE: H1 („The AI recommends Alfa Laval. / Ahead of Kelvion.“, „… / Not ROEMHELD.“, „… / But not everywhere.“), Gründe links („Two reasons already found on …“), offene Zeile, heller Kasten, Abschluss „What does Alfa Laval do better? / The competitor comparison shows you.“, Hinweiszeile über volle Breite. Neue Abschlusstexte gelten für `source` `home` und `home-en`; DE-Sperren `html[lang^=de]` entfernt. Home-Skript zweisprachig über `T(de, en)`.
- **Website sperrt die Prüfung, Name ist aber auflösbar** (Server `dns: true`): statt Sackgasse die bestehende Limit-Strecke „Wettbewerbsvergleich anfordern“ mit Text „Ihre Website lässt unsere automatische Prüfung gerade nicht zu. Ihren KI-Wettbewerbsvergleich erstellen wir trotzdem …“ (Event `snapshot_unerreichbar`). Tippfehler-Domains (DNS unbekannt) bekommen weiter den Hinweis „Bitte prüfen Sie die Adresse“.
- **Technik „nicht prüfbar“ sichtbar:** keine Gründe → „Technisch keine Auffälligkeiten auf …“ mit ✓/?-Zeilen; mit Gründen → „Technik geprüft: 1 von 6 Punkten in Ordnung, 5 nicht prüfbar“ bzw. „Technik konnte nicht geprüft werden“.
- Vorschlag wartet 8 s statt 4,5 s (Server-Fallback). H1 bei „nicht genannt“ nimmt Wettbewerber strikt in Reihenfolge. Quellen-Befund fasst Domains derselben Firma zusammen (alfalaval.com/.co.uk/.us).
**Server (Pipeline, `ai_frage.py` Marker `HAERTUNG-20261002`, `codaai-api.py`):** SSL-Fehler → Startseite trotzdem lesen (kelvion.com: Vorschlag kam leer, jetzt „Plattenwärmetauscher …“); leerer Vorschlag → zweiter Versuch über die Angebotskategorie des Technik-Checks; Firmennamen je Check zusammengeführt (Securitas, Panacol, Klüh …; Loctite → Henkel nur, wenn Henkel im selben Check); Kurzname auf den Domain-Stamm gekürzt („Präzisionswerkzeuge Karl Bruckner“ → „Karl Bruckner“); `dns`-Feld bei nicht erreichbarer Website; `/ai/frage/bild` antwortet ohne Bild mit 204 statt 404 (kein Konsolen-Rauschen).
**Getestet (Vorschau gegen Live-Server):** DE kelvion.com, vetter-forks.com, abus.com, hoenle.com, linsinger.com; EN stark-roemheld.com, karlbruckner.de, kelvion.com, windmoeller.de — alle bündig, keine Konsolenfehler.
