# Security-Header: die Grenze liegt im Hosting, nicht im Code

**Stand 14.09.2026** · Befund aus dem squirrelscan-Vollaudit (161 Seiten, Security 47/100)

## Der Befund

squirrelscan meldet drei Security-Warnungen:

| Regel | Meldung |
|---|---|
| `security/csp` | No Content-Security-Policy header |
| `security/x-frame-options` | No clickjacking protection |
| `security/form-captcha` | 5 public form(s) without CAPTCHA |

Die ersten beiden sind **nicht im Repo lösbar**. Das ist keine Vermutung, sondern
gemessen — so antwortet `https://www.codaai.ai/` am 14.09.2026:

```
server: GitHub.com
strict-transport-security: max-age=31556952
```

Das ist der komplette Sicherheitsanteil. GitHub Pages setzt HSTS selbst (ohne
`includeSubDomains` und ohne `preload`) und lässt keine eigenen Response-Header
zu — es gibt keine Serverkonfiguration, kein `.htaccess`, und `_headers`-Dateien
liest nur Netlify bzw. Cloudflare Pages, nicht GitHub Pages.

**Was die Website bereits tut** (`src/layouts/Layout.astro`):

- eine vollständige CSP über `<meta http-equiv="Content-Security-Policy">` —
  Browser werten die aus, Scanner lesen nur den Header
- `X-Content-Type-Options`, `Referrer-Policy` und `Permissions-Policy` ebenfalls
  als Meta
- JS-Frame-Busting im `<body>`, weil `frame-ancestors` im Meta-CSP von jedem
  Browser ignoriert wird

Die Seite ist damit besser geschützt, als der Score sagt. Der Score misst
Header; wir liefern Meta. Beide Aussagen sind wahr.

## Der einzige echte Weg: ein Proxy davor

Cloudflare (kostenloser Plan) vor GitHub Pages, dann **Rules → Transform Rules →
Modify Response Header**, Regel für `hostname eq "www.codaai.ai"`:

```
Content-Security-Policy: <exakt der String aus Layout.astro, plus:> frame-ancestors 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

Der CSP-String darf nicht abgetippt werden — er steht als Array in
`Layout.astro` (Konstante `csp`) und muss zeichengleich übernommen werden,
sonst blockiert die Policy GTM, GA4, Supabase oder das Apps-Script-Backend.

**Was dabei zu bedenken ist, bevor jemand die Nameserver umstellt:**

- Cloudflare wird damit der Ausliefernde für codaai.ai. Die DNS-Zone liegt heute
  bei IONOS (siehe `codaai-dns-versanddomains`) — dort hängen auch die
  Mail-Einträge der drei Versand-Domains. Ein Zonenumzug ist der Punkt, an dem
  in diesem Projekt schon einmal Mailboxen ausgefallen sind.
- GitHub Pages und Cloudflare müssen beide auf HTTPS stehen (Cloudflare SSL-Modus
  **Full (strict)**), sonst entsteht eine Redirect-Schleife.
- Nebeneffekt, der für CodaAI zählt: Cloudflare liefert dann auch die Logfiles,
  aus denen sich KI-Crawler-Zugriffe sauber auswerten lassen — heute geht das nur
  über GA4 und damit gar nicht für Bots.

Ohne diesen Schritt bleiben `security/csp` und `security/x-frame-options`
dauerhaft stehen. Das ist eine Hosting-Entscheidung, keine Aufgabe für den
nächsten Commit.

## Formulare ohne CAPTCHA

Betroffen sind die fünf öffentlichen Formulare auf `/`, `/en/`, `/webinar/`,
`/en/webinar/` und im Glossar-CTA. Sie haben heute:

- ein Honeypot-Feld (`data-hp`, `inert`)
- serverseitige Prüfungen im Apps Script (Erreichbarkeit der Domain,
  Double-Opt-in bei der Webinar-Anmeldung)

Das hält einfache Bots ab, ist aber kein CAPTCHA und wird von squirrelscan auch
nicht als solches erkannt. Der naheliegende Schritt ist **Cloudflare Turnstile**
(kostenlos, unsichtbar, kein Cookie, DSGVO-freundlicher als reCAPTCHA):

1. Site-Key und Secret in Cloudflare anlegen
2. Widget in `react/BookingWidget.tsx`, `premium/AuditCTA.astro` und
   `premium/WebinarSignup.astro` einhängen — das sind dieselben drei Stellen, an
   denen auch die Apps-Script-Deployment-URL steht
3. Token im Apps Script gegen `https://challenges.cloudflare.com/turnstile/v0/siteverify`
   prüfen, bevor geschrieben wird
4. `script-src` und `frame-src` der CSP um `https://challenges.cloudflare.com`
   erweitern

Schritt 1 braucht ein Cloudflare-Konto — dieselbe Voraussetzung wie oben. Beide
Punkte hängen also an **einer** Entscheidung.

## Nebenbefund: Auftragsverarbeiter

`legal/subprocessor-disclosure` (Info) findet keine eigene Seite mit
Unterauftragsverarbeitern und AVV-Angebot. Die AVV-Tabelle steht heute im
Datenschutztext (Stand 03.08.2026: Google Ireland, seven communications, Hetzner
Online, Supabase). Eine eigene Seite `/auftragsverarbeiter/`, aus Datenschutz und
Impressum verlinkt, würde den Befund schließen — das ist Rechtstext und gehört
vor der Veröffentlichung geprüft, nicht in diesen Commit.
