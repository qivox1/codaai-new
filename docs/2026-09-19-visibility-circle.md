# 2026-09-19 · Visibility Circle – geschützte Landingpage

**URL:** https://www.codaai.ai/visibility-circle/ · **Passwort:** steht in `CodaAI-Website/visibility-circle/passwort.txt` (nicht im Repo)

## Was
Landingpage für den Visibility Circle (monatliche Begleitung, 1.290 €/Monat), nur für eingeladene Unternehmen.
Konzept und Texte: Claude-Doc „Visibility Circle – Konzept und Inhalte der Landingpage“.

## Wie geschützt
- GitHub Pages kann keinen Server-Passwortschutz. Der Inhalt liegt deshalb nur **verschlüsselt** im Repo
  (`src/data/visibility-circle.enc.json`, AES-256-GCM, Schlüssel per PBKDF2-SHA256 mit 250.000 Runden).
  Der Browser entschlüsselt erst nach richtiger Passworteingabe (`src/pages/visibility-circle.astro`).
- Klartext `inhalt.html`, `passwort.txt` und `verschluesseln.mjs` liegen in `CodaAI-Website/visibility-circle/`,
  also außerhalb des öffentlichen Repos.
- `noindex, nofollow`, kein JSON-LD, aus Sitemap gefiltert (`astro.config.mjs`), `Disallow` in `robots.txt`,
  nicht in Navigation, Footer oder `llms.txt`.
- Link mit Passwort zum Verschicken: `https://www.codaai.ai/visibility-circle/#zugang=<Passwort>`
  (Teil hinter `#` geht nie an einen Server; die Seite entfernt ihn sofort aus der Adresszeile).
- Nach dem ersten Öffnen merkt sich der Browser das Passwort (localStorage `codaai-vc-pw`).
- GTM-Event beim Öffnen: `circle_unlock` (noch nicht im Container angelegt).

## Inhalt ändern
1. `CodaAI-Website/visibility-circle/inhalt.html` bearbeiten
2. `node verschluesseln.mjs` im selben Ordner
3. bauen, committen, pushen

## Passwort wechseln
`passwort.txt` ändern → `node verschluesseln.mjs` → pushen. Alte Links und gespeicherte Passwörter gelten dann nicht mehr.

## Commits
`b3b8722` Seite · `7510982` Maske ausblenden, Bilder · `69ab7a5` Logos sichtbar
