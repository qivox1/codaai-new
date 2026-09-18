# Audit-Modul „Ergebnis zuerst" + Landingpage `/check/` — Sessionprotokoll 18.09.2026

**Arbeitsplan:** P1 #1 und #2 aus `docs/2026-09-18-arbeitsplan-traffic-leads.md`.
**Seiten:** `/check/` · `/en/check/` (neu) · Startseite (3 Instanzen) · Pillar · Glossar-Hub · 55 Glossarbegriffe (je 1 Instanz).

## Anlass

KW 38: 5 `form_start`, 0 `audit_request_submitted` in 28 Tagen. Das Formular war technisch intakt
(Backend `check_site` antwortete, POST kam an). Der Abbruch lag am Kontaktschritt: Der Besucher
sollte Vorname, Name und E-Mail hergeben, bevor er irgendetwas bekommen hatte. Entscheidung Oli
(Interview 18.09.): Umbau auf **Ergebnis zuerst** — erst der Befund, dann die Vorteile des
vollständigen Audits, dann der Kontakt.

## Was gebaut wurde

| Datei | Inhalt |
|---|---|
| `src/components/premium/AuditCTA.astro` | **Neu geschrieben.** Ablauf: URL-Feld steht sofort offen (kein Pill-Button mehr) → Klick/Enter → parallel `check_site` (Apps Script) und `audit.codaai.ai/ai/mentions` → Befund vollflächig auf `--cta-strong` (Domain, Seitentitel, Zahl bzw. „Nicht gefunden.", Einordnung) → „Das vollständige Audit zeigt zusätzlich:" (4 Punkte) → Vorname/Name/E-Mail → weißer Button „Vollständiges Audit anfordern" → Bestätigung (Verdigris, unverändert). Props wie bisher plus `source` (Herkunft) und `presetFromQuery` (`?d=…`). |
| `src/components/check/CheckPage.astro` | Landingpage-Rahmen DE/EN: Hero mit Kippsatz-H1 + Modul, „Was der Check prüft" (3 Karten), Tabelle Live-Check vs. vollständiges Audit, Ablauf in 3 Schritten, Ink-Band mit Studienbefund (55 % / 47 %), Links auf Studie und GEO-Leitfaden, zweites Modul (dunkel). Ohne FAQ-Schema (Wächter: sitewide eindeutig), ohne Quellennennung. |
| `src/pages/check.astro` · `src/pages/en/check.astro` | Wrapper mit `WebPage` (inkl. `potentialAction` auf `?d={domain}`) + `BreadcrumbList`. |
| `src/lib/i18n-routes.ts` | Paar `/check/` ↔ `/en/check/`. |
| `astro.config.mjs` | `EXTRA_SOURCES` für beide Pfade → CheckPage + AuditCTA. |
| `src/components/Footer.astro` | Link „KI-Sichtbarkeits-Check" / „AI Visibility Check" vor GEO-Optimierung. |
| `public/llms.txt` | Beide Seiten eingetragen. |
| `Home.astro`, `GlossarTerm.astro`, `GlossarHub.astro`, `GeoPillar.astro` | `source`-Prop gesetzt (`home-hero`, `home-audit`, `home-offer`, `glossar`, `glossar-hub`, `pillar`). Startseite: Button-Labels zu Zeilen über dem Feld umformuliert; Offer-Band: Zeile/Kleingedrucktes weiß, Befund dort auf Ink statt Magenta (`--pink` war bereits umgebogen). |

## Verhalten im Detail

- **Fail-open bleibt:** Nur ein ausdrückliches `reachable === false` stoppt (Fehlertext, Feld behält Fokus). Fällt `check_site` aus (Timeout 15 s) oder der KI-Zweig (12 s, `capped`, `error`), zeigt der Befund „Erreichbar." mit dem Hinweis, dass die KI-Prüfung gerade ausgelastet ist — der Kontakt bleibt möglich. `ratelimited` wird klar gesagt (eine Stunde warten), nicht verschleiert.
- **Schutz vor Zufallstreffern (Client):** `found` über einen *abgeleiteten* Kandidaten (`via !== 'stem'`) mit ≤ 4 Zeichen Entität wird als `unknown` behandelt. Anlass: `this-domain-does-not-exist-987654.com` liefert serverseitig `found · 1173 · entity "this"` (Wortfragment vor dem Bindestrich; `MIN_COUNT_DERIVED = 5` greift bei häufigen Wörtern nicht). Serverseitige Härtung (Stoppwortliste/Mindestlänge in `ai_mentions.py`) ist offen, siehe unten.
- **Mindestdauer 1,1 s** vor dem Befund — eine Antwort nach 200 ms wirkt wie ein Trick (Muster aus dem Webinar-Prüfstand).
- **Zahlformat** nach Seitensprache (`de-DE` / `en-US`), Count-up mit `prefers-reduced-motion`-Fallback.
- **Domain-Übergabe:** `?d=ihrefirma.de` auf `/check/` füllt das Feld und prüft sofort (für Nurture-Mails und Outbound: „Ihr Ergebnis liegt schon bereit"). Nur die erste Instanz der Seite liest den Parameter.
- **dataLayer:** `check_view` (nur `/check/`), `check_result {lang, source, result: found|none|unknown, count, domain}`, `audit_request_submitted {lang, source, result}`. GTM: Trigger für `check_result` und `source`-Variable noch anlegen (GA4-Ereignisse `check_result`, Parameter `source`, `result`).
- **POST-Body** enthält zusätzlich `source`, `ai_status`, `ai_count`, `site_title`. Das Apps Script (v12) ignoriert unbekannte Felder; für die Steuerdatei (Variante B) sollen sie in eigene Spalten — offen.
- **Scoped-CSS-Falle:** Per Script erzeugte Elemente (`.acta-title`, `.acta-dot`) tragen keine Astro-Scope-ID → Selektoren mit `:global(...)`. Beim ersten Mobil-Screenshot stand der Seitentitel deshalb in der Domain-Zeile.

## Prüfung

- Build 177 Seiten, Wächter grün (468 hreflang, 879 JSON-LD, 400 FAQ eindeutig); `lastmod`-Fehler ist der bekannte Effekt der Kopie ohne Git-Historie.
- Browser-Tests (Playwright, 1440 px und 390 px) gegen die **echten Backends** (Origin `localhost:4321` ist im CORS des KI-Zweigs erlaubt, `8765` nicht):
  `hubtex.com` → found 48 mit Seitentitel · `regionalflat.de` / `codaai.ai` → none · `this-domain-does-not-exist-987654.com` → Fehlertext „nicht erreichbar" nach ~2 s · Validierung „Bitte geben Sie Ihren Namen an." im Befund · dataLayer-Ereignisse wie oben · keine Konsolenfehler · kein horizontaler Überlauf.
- Sichtprüfung: Startseiten-Hero (Befund magenta), Offer-Band (Befund auf Ink), Glossar-Band, `/check/` Desktop + Mobil, Vergleichstabelle mobil dreispaltig ohne Wischen.
- **Nicht getestet:** das tatsächliche Absenden (legt eine Zeile im Sheet an) — nur mit Freigabe.

## Offen / nächste Schritte

1. **Commit + Push** (Deploy-Key in `CodaAI-Pipeline/keys/`) → beide `/check/`-URLs in GSC zur Indexierung anmelden.
2. GTM: Ereignis `check_result` + Parameter `source`/`result` als GA4-Ereignisse registrieren; `audit_request_submitted` bekommt `source` als Parameter.
3. Apps Script: Spalten `source`, `ai_status`, `ai_count`, `site_title` im Sheet anlegen (Grundlage für Variante B, Arbeitsplan #3).
4. `ai_mentions.py`: Kandidaten mit ≤ 4 Zeichen oder aus Stoppwortliste (this, die, der, best, …) verwerfen — dann kann die Client-Schranke entfallen.
5. Webinar-Prüfstand (`/webinar`) auf das Modul umstellen, sobald der Termin 29.09. vorbei ist — heute zwei Implementierungen derselben Idee.
