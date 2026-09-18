# Arbeitsplan codaai.ai — mehr Traffic, der Leads erzeugt

**Stand:** 18.09.2026 · **Ergebnis des Interviews vom 18.09.** · Fortschreibung in dieser Datei.

## 1. Ziel und Messgröße

Zielreihenfolge (Oli, 18.09.): **1. Audit-Anfrage** (`audit_request_submitted`) · 2. Webinar-Anmeldung · 3. Terminbuchung.
Kanäle: Organisch/KI-Antworten (Wissens-Cluster), **LinkedIn** (Personenprofil, verdeckt), **Outbound** (mit `/check/` als Einstieg).

Ausgangslage KW 38: 10 Klicks · 2.530 Impressionen · Ø Position 45,6 · **0 Audit-Anfragen in 28 Tagen bei 5 `form_start`** · Organic 3 → 19 Sessions/Woche · LinkedIn-Welle 27 Sessions · 121 indexiert / 47 nicht · noindex-Artikel noch 646 Impressionen.
Befund: Das Formular funktioniert technisch; der Abbruch liegt am Kontaktschritt (Angebot/Vertrauen), nicht an der Technik.

## 2. Entscheidungen (Oli, 18.09.2026)

| Frage | Entscheidung |
|---|---|
| Lead-Definition | Audit-Anfrage zuerst; Webinar, Termin nachrangig |
| Kanäle | LinkedIn + Outbound; Website als Zielsystem beider |
| Audit-Einstieg | Umbau auf **„Ergebnis zuerst"**: Live-Check → Ergebnis → Vorteile des Komplett-Audits → Kontakt |
| Fulfilment | **Variante B**: Anfrage → `ausstehend` in der Steuerdatei → Nachtlauf → Morgenmail ❗ bis versendet (Zwang eingebaut) |
| Autor | **Oli** ab sofort als Autor des Wissens-Clusters, Anja Herausgeberin/Inhaberin; Diskretionsregel bis 30.10. für die Website aufgehoben |
| LinkedIn | **Zwei Phasen**: Zyklus 3 (05.10.–30.10.) vollständig verdeckt, kein Link · ab 02.11. Featured-Links auf Pillar + `/check/`, Posts verweisen „Leitfaden liegt in meinem Profil" |
| Zyklus 3 | **12/12 GEO-Reihe** „KI-Sichtbarkeit für den B2B-Mittelstand in 12 Kapiteln" entlang der Pillar-Seite; Opus-Strang pausiert bis November |

Bewusst in Kauf genommen: codaai.ai zeigt per `sameAs` auf Olis LinkedIn-Profil, das Profil zeigt nicht zurück (einseitiges Leck, trifft nur, wer Oli aktiv googelt).

## 3. Prioritäten nach Impact

Reihenfolge = Impact ÷ Aufwand unter der Bedingung, dass Traffic ohne Conversion-Pfad nichts bringt. Erst der Trichter, dann der Zufluss.

### P1 · Conversion-Pfad (KW 39–40) — ohne das verpufft jeder Traffic

| # | Maßnahme | Impact | Aufwand | Fertig wenn |
|---|---|---|---|---|
| 1 | **Audit-Modul „Ergebnis zuerst"** sitewide (Start, Leistungsseite, Pillar, Blog-CTA): URL → Live-Check via `/ai/mentions` → Ergebnis sichtbar → Block „Was das Komplett-Audit zusätzlich liefert" → erst dann Name/E-Mail | hoch | 2–3 Tage | `form_start` → `audit_request_submitted` messbar > 0 |
| 2 | **`/check/` + `/en/check/`** als eigenständige Landingpage (Ziel für Outbound, LinkedIn-Featured ab 02.11., Ads-fähig); Events `check_view`, `check_result`, `audit_request_submitted{source:check}` in GTM | hoch | 1 Tag | beide URLs live, Events im DebugView |
| 3 | **Fulfilment Variante B**: Anfrage → Zeile `ausstehend` in der Steuerdatei → Nachtlauf erzeugt Dashboard → **Morgenmail ❗** listet jede offene Anfrage, bis Status `versendet` (Muster `webinar_stage.py`) | hoch (Reaktionszeit) | 1 Tag | Testanfrage taucht am nächsten Morgen in der Mail auf |
| 4 | E2E-Test des Formulars (legt echte Sheet-Zeile an) | Absicherung | 0,5 h | nur nach Freigabe |

### P2 · Autorität und interne Verlinkung (KW 40–41) — Ranking + Zitierbarkeit

| # | Maßnahme | Impact | Aufwand | Fertig wenn |
|---|---|---|---|---|
| 5 | **Autor-Wechsel auf Oli**: Glossar, Blog, Pillar (`author` → Oli, `publisher` → CodaAI/Anja); Autorenseite `/autor/oliver-parrizas/` + EN mit `Person`-Schema, `sameAs` LinkedIn, Kurzvita, Liste der Beiträge | mittel–hoch (E-E-A-T; benannter Experte wird zitiert) | 1 Tag | Schema-Test grün, Autorenseite indexiert |
| 6 | **Interne Links auf die Pillar-Seite**: Sidebar-Karte in allen 55 Glossarbegriffen, Verweise aus `/digital-visibility/`, `/studie/`, Artikel `ki-sichtbarkeit-praxis`; auf der Pillar ein H2 „GEO und SEO: Was ist der Unterschied?" | hoch für „geo optimierung" (1.000/Monat) — Seite hat derzeit nur Footer + Hub | 0,5 Tag | ≥ 60 interne Links auf die Pillar |
| 7 | **Artikel 1 „Sichtbarkeit in ChatGPT"** (168 Impressionen ohne passende Seite) — verlinkt auf Pillar statt Begriffe zu erklären | mittel | 1 Tag | live, in GSC beantragt |
| 8 | **`/wissen/geo-basics/`** Leadmagnet: Checkliste + PDF, Ziel 2 (Webinar-Anmeldung) als Abschluss | mittel | 2 Tage | live, aus Pillar Abschnitt 7 verlinkt |

### P3 · Indexierung und Monitoring (KW 39, parallel, klein)

| # | Maßnahme | Impact | Aufwand |
|---|---|---|---|
| 9 | IndexNow-Key + Bing Webmaster Tools; Entscheidung zu den noindex-Artikeln (646 Impr.): reaktivieren oder 301 | mittel | 2 h |
| 10 | Wöchentlichen SEO-Task erweitern: URL-Watchlist (Pillar, `/check/`, Artikel 1, Autorenseite), Bing, Backlinks, interne Linkzahl je Zielseite, **eigene KI-Sichtbarkeit** als Nullmessung (12 Prompts × 3 Systeme × 3 Läufe, Methodik der Pillar-Seite) | mittel (macht Fortschritt sichtbar) | 3 h |

### P4 · LinkedIn Zyklus 3 (Produktion KW 39–40 · Posts 05.10.–30.10.)

| # | Maßnahme | Impact | Aufwand |
|---|---|---|---|
| 11 | **Redaktionsplan Zyklus 3** (Datei im Ordner „LinkedIn Profil Oli"): 12 Kapitel, Mo 7:30 / Mi 12:00 / Fr 9:00, Format-Mix 4 Karussell (davon 1 Leitfaden A4) / 4 Bild+Text / 4 Text-Only, 2–3 Hashtags, Hausstimme „leise & scharf", Tabu-Listen aus Zyklus 2 gelten (kein Zahlentrio 449/3.592/7.184, kein „Gefunden/Empfohlen/Zitiert", kein Link). Oli gibt die ersten 3 YAMLs frei, Rest autark: render → Buffer (Weg A / `createPost`) → `buffer_guard.py` | hoch (87 % der Profilbesuche kommen über Beiträge) | 3 Tage |
| 12 | **Phase 2 ab 02.11.** (Rollout-Tag 01.11. laut Konzept Berater-Auftritt): Featured-Sektion → Pillar-Seite + `/check/`; Posts 63 ff. mit „Leitfaden liegt in meinem Profil"; Zyklus 4 (November) = Anwendung der 12 Kapitel + Rückkehr des Opus-Strangs | hoch | 1 Tag Planung |
| 13 | **Dialog-Disziplin**: „Beziehungen aufbauen" steht seit Juni bei 18,20; Kommentar-Radar 309 Vorschläge / 3 umgesetzt. Die Morgenmail aus #3 bekommt einen zweiten Pflichtblock: 3 Radar-Vorschläge + offene Kommentare unter eigenen Posts | mittel–hoch | 2 h |

### P5 · Outbound (ab KW 42)

| # | Maßnahme | Impact | Aufwand |
|---|---|---|---|
| 14 | Outbound-Sequenz mit `/check/`-Ergebnis als Aufhänger (CRM Attio; Sperrliste aus der Abmahnung beachten) | hoch, aber erst sinnvoll, wenn #1–#3 stehen | nach P1 |

## 4. Zyklus 3 — die 12 Kapitel (Vorschlag, Reihenfolge = Pillar-Seite)

| # | Datum | Säule | Format | Kapitel |
|---|---|---|---|---|
| 63 | Mo 05.10. | Markt-Lese | Karussell · 8 | Rankt bei Google, fehlt in der KI: warum Seiten ranken, aber Passagen zitiert werden (Retrieval-Kette) |
| 64 | Mi 07.10. | Praxis-Notiz | Bild+Text | Query Fan-out: aus einer Käuferfrage werden sechs Teilfragen — welche eure Seite beantwortet |
| 65 | Fr 09.10. | Souveränität | Text-Only | Das Grounding-Budget: ~2.000 Wörter tragen eine Antwort, Rang 1 bekommt 28 % davon |
| 66 | Mo 12.10. | Markt-Lese | Bild+Text | Was nachweislich wirkt: Zitate, Statistik, Quellen (+28–41 %, Princeton) |
| 67 | Mi 14.10. | Praxis-Notiz | **Leitfaden A4** | Die Formel: (Technik + Content + Offpage) × Prozesse — Checkliste je Faktor |
| 68 | Fr 16.10. | Souveränität | Text-Only | Was nicht wirkt: Keyword-Stuffing, llms.txt, Schema als Garantie, Platzierungszusagen |
| 69 | Mo 19.10. | Markt-Lese | Bild+Text | Markennennung schlägt Backlink (0,664 vs. 0,218) — Offpage neu gedacht |
| 70 | Mi 21.10. | Praxis-Notiz | Karussell · 7 | Startseiten werden zitiert (23,8 %): die Mittelstands-Chance, die niemand nutzt |
| 71 | Fr 23.10. | Souveränität | Text-Only | Messen als Wahrscheinlichkeit: < 1:100 gleiche Liste — warum ein Screenshot nichts beweist |
| 72 | Mo 26.10. | Markt-Lese | Bild+Text | Prompt-Kategorien nach Kaufnähe: welche Fragen Umsatz entscheiden |
| 73 | Mi 28.10. | Praxis-Notiz | Karussell · 6 | Womit anfangen: fünf Schritte in der richtigen Reihenfolge |
| 74 | Fr 30.10. | Souveränität | Text-Only | Abbinder: Das SEO-Paradox aus eigener Stichprobe — rankt, wird nicht zitiert (ohne Kennzahlen-Trio) |

Quellen je Kapitel aus der Belegtabelle der Pillar-Seite (16 geprüfte Quellen); eigene Studie nur als „eigene Stichprobe/Protokoll" ohne die identifizierenden Zahlen.

## 5. Automatismus (der „Zwang")

Eine Morgenmail (bestehender Nachtlauf), drei Pflichtblöcke, jeder Block bleibt mit ❗ stehen, bis der Status gesetzt ist:
1. Offene Audit-Anfragen (Steuerdatei `ausstehend` → `versendet`)
2. LinkedIn: 3 Radar-Vorschläge + unbeantwortete Kommentare unter eigenen Posts
3. Wochenweise: Fortschritt dieses Arbeitsplans (offene # aus P1–P4)

## 6. Reihenfolge der nächsten Sessions

1. KW 39: #1 Audit-Modul → #2 `/check/` → #3 Fulfilment → #9 IndexNow (Commit/Push je nach Freigabe)
2. KW 39–40: #11 Redaktionsplan Zyklus 3 + erste 3 YAMLs zur Freigabe
3. KW 40: #5 Autor-Wechsel → #6 interne Links → #10 Task erweitern
4. KW 41: #7 Artikel 1 → #8 geo-basics
5. 26.10.: Rollout-Checkliste (Erinnerungs-Task besteht) → 01.11. Rollout → 02.11. Featured-Links (#12)
