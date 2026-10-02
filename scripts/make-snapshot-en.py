#!/usr/bin/env python3
"""Erzeugt src/components/snapshot/SnapshotModuleEn.astro aus SnapshotModule.astro.

Englische Fassung des Visibility Snapshot (Startseite /en/, seit 01.10.2026).
Abgeleitet statt von Hand gepflegt: Layout, Ablauf und Messlogik bleiben identisch,
nur die Texte wechseln, und jede Anfrage an audit.codaai.ai trägt `lang: 'en'`
(Backend: ai_frage.py, Marker SPRACHE-EN-20261001).

Bei JEDER Änderung an SnapshotModule.astro dieses Skript erneut laufen lassen:
    python3 scripts/make-snapshot-en.py
Es bricht ab, wenn ein Anker fehlt (dann den Text unten nachziehen).
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src/components/snapshot/SnapshotModule.astro"
DST = ROOT / "src/components/snapshot/SnapshotModuleEn.astro"
s = SRC.read_text()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit(f"Anker {c}x statt {n}x: {old[:100]!r}")
    s = s.replace(old, new)


rep("---\n/**\n * SnapshotModule — „Visibility Snapshot\"",
    "---\n/**\n * GENERIERT von scripts/make-snapshot-en.py aus SnapshotModule.astro — nicht von Hand ändern.\n"
    " * Englische Fassung für /en/ (01.10.2026, Startseiten-Ergebnis seit 02.10.2026).\n *\n * SnapshotModule — „Visibility Snapshot\"")

# ------------------------------------------------------------------ Frontmatter
rep("  'Welche Anbieter für [Ihr Produkt] sind in Deutschland führend?',\n"
    "  'Welcher Hersteller eignet sich am besten für [Ihre Anwendung]?',\n"
    "  'Welche Alternativen gibt es zu [Ihr größter Wettbewerber]?',",
    "  'Which suppliers of [your product] are leading in Germany?',\n"
    "  'Which manufacturer is best suited for [your application]?',\n"
    "  'What alternatives are there to [your biggest competitor]?',")

# ------------------------------------------------------------------ Markup
M = [
    ('<label class="snap-lbl" for="snap-domain">Ihre Website</label>', '<label class="snap-lbl" for="snap-domain">Your website</label>'),
    ('placeholder="z. B. ihrefirma.de" />', 'placeholder="e.g. yourcompany.com" />'),
    ('<label class="snap-lbl" for="snap-frage">Eine Frage, die Ihre Kunden der KI stellen würden</label>',
     '<label class="snap-lbl" for="snap-frage">A question your customers would ask AI</label>'),
    ('Produkt + Anwendung – so fragt ein Kunde, der Sie nicht kennt.', 'Product + application – the way a customer who does not know you would ask.'),
    ('placeholder="z. B. Welche Anbieter für Präzisionsklimaanlagen sind in Deutschland führend?"',
     'placeholder="e.g. Which suppliers of precision air conditioning are leading in Germany?"'),
    ('Vorschlag für Ihre Website – gern anpassen.', 'Suggested for your website – feel free to adjust it.'),
    ('<span class="snap-fhint-k">Vorschlag übernehmen</span>', '<span class="snap-fhint-k">Use suggestion</span>'),
    ('>Trotzdem mit meiner Frage prüfen</button>', '>Check my question anyway</button>'),
    ('      <span>Snapshot starten</span>', '      <span>Start snapshot</span>'),
    ('<button type="button" class="snap-send" data-limbtn>Wettbewerbsvergleich anfordern <span aria-hidden="true">→</span></button>',
     '<button type="button" class="snap-send" data-limbtn>Request competitor comparison <span aria-hidden="true">→</span></button>'),
    ('placeholder="vorname.nachname" aria-label="Geschäftliche E-Mail-Adresse" /><span data-limat></span>',
     'placeholder="firstname.lastname" aria-label="Business email address" /><span data-limat></span>'),
    ('<button type="button" class="snap-send" data-limsend>Wettbewerbsvergleich anfordern <span aria-hidden="true">→</span></button>',
     '<button type="button" class="snap-send" data-limsend>Request competitor comparison <span aria-hidden="true">→</span></button>'),
    ('<p class="snap-micro">Kostenlos · rund 20 Sekunden · Ergebnis ohne Anmeldung</p>',
     '<p class="snap-micro">Free · about 20 seconds · result without sign-up</p>'),
    ('<p class="snap-load-h" data-loadh aria-live="polite">Wir fragen die KI-Systeme …</p>',
     '<p class="snap-load-h" data-loadh aria-live="polite">Asking the AI systems …</p>'),
    ('<p class="snap-tech-h">Parallel lesen wir Ihre Website so, wie ein KI-System sie sieht:</p>',
     '<p class="snap-tech-h">At the same time, we read your website the way an AI system sees it:</p>'),
    ('<span class="snap-lshot-ph">Startseite wird geladen …</span>', '<span class="snap-lshot-ph">Loading homepage …</span>'),
    ('<span>Dürfen KI-Systeme Ihre Website lesen?</span>', '<span>May AI systems read your website?</span>'),
    ('<span>Lässt Ihr Website-Schutz sie durch?</span>', '<span>Does your website protection let them through?</span>'),
    ('<span>Sehen sie Ihre Inhalte ohne JavaScript?</span>', '<span>Can they see your content without JavaScript?</span>'),
    ('<span>Ist klar erkennbar, was Sie anbieten?</span>', '<span>Is it clear what you offer?</span>'),
    ('<span>Wie aktuell sind Ihre Inhalte?</span>', '<span>How up to date is your content?</span>'),
    ('<span>Sind Ihre Firmendaten maschinenlesbar?</span>', '<span>Is your company data machine-readable?</span>'),
    ('alt="Startseite Ihrer Website"', 'alt="Homepage of your website"'),
    ('<summary class="snap-find-s" data-findh>Hinweise</summary>', '<summary class="snap-find-s" data-findh>Notes</summary>'),
    ('<span>So beschreibt <span data-sbsys>ChatGPT</span> Ihr Unternehmen <small>(ohne Websuche)</small></span>',
     '<span>How <span data-sbsys>ChatGPT</span> describes your company <small>(without web search)</small></span>'),
    ('<p class="snap-ber-h" data-berh>Weitere erkannte Geschäftsbereiche</p>', '<p class="snap-ber-h" data-berh>Other business areas we found</p>'),
    ('<span class="snap-audit-h1">Das war nur <b>eine</b> Frage.</span><br /><span class="snap-audit-pk">Sehen Sie jetzt das ganze Bild.</span>',
     '<span class="snap-audit-h1">That was just <b>one</b> question.</span><br /><span class="snap-audit-pk">Now see the whole picture.</span>'),
    ('<span class="snap-audit-ct" data-auditc>Ihre Kunden fragen zuerst die KI, und die schreibt die Shortlist. Wer dort fehlt, bekommt die Anfrage nicht. Und meist merkt man das gar nicht.</span>',
     '<span class="snap-audit-ct" data-auditc>Your customers ask AI first, and AI writes the shortlist. Anyone missing from it does not get the enquiry. And most of the time nobody notices.</span>'),
    ('<p class="snap-audit-p">Ihr KI-Wettbewerbsvergleich für <b data-auditd></b> per E-Mail:</p>',
     '<p class="snap-audit-p">Your AI competitor comparison for <b data-auditd></b> by email:</p>'),
    ('        <li>Welche Wettbewerber die KI bei Ihren wichtigsten Kundenfragen empfiehlt, und warum</li>\n'
     '        <li>Bei welchen Fragen die Anfragen heute an andere gehen</li>\n'
     '        <li>Ihre Position in Google und KI, direkt neben Ihren Wettbewerbern</li>\n'
     '        <li>Was konkret zu tun ist, damit Sie auf die Shortlist kommen</li>',
     '        <li>Which competitors AI recommends for your most important customer questions, and why</li>\n'
     '        <li>For which questions the enquiries currently go to others</li>\n'
     '        <li>Your position in Google and AI, right next to your competitors</li>\n'
     '        <li>What exactly to do to get onto the shortlist</li>'),
    ('placeholder="vorname.nachname" aria-label="Geschäftliche E-Mail-Adresse" /><span data-at></span>',
     'placeholder="firstname.lastname" aria-label="Business email address" /><span data-at></span>'),
    ('<span data-sendt>Wettbewerbsvergleich anfordern</span>', '<span data-sendt>Request competitor comparison</span>'),
    ('<p class="snap-adone" data-done hidden><b>Fast geschafft.</b> <span data-donet></span></p>',
     '<p class="snap-adone" data-done hidden><b>Almost done.</b> <span data-donet></span></p>'),
    ('<button type="button" class="snap-again" data-again>Andere Frage prüfen</button>',
     '<button type="button" class="snap-again" data-again>Check another question</button>'),
    ('<p class="snap-disc">Stichprobe vom <span data-stand2></span>. KI-Antworten schwanken von Tag zu Tag. Wiedergegeben sind Antworten der KI-Systeme, keine Aussage von CodaAI über die genannten Unternehmen.</p>',
     '<p class="snap-disc">Sample taken on <span data-stand2></span>. AI answers vary from day to day. The answers shown are those of the AI systems, not a statement by CodaAI about the companies named.</p>'),
    ('<p class="snap-q">„<span data-q></span>“</p>', '<p class="snap-q">“<span data-q></span>”</p>'),
    ('<p class="snap-sb-t">„<span data-sbt></span>“</p>', '<p class="snap-sb-t">“<span data-sbt></span>”</p>'),
]
for a, b in M:
    rep(a, b)
rep('href={`${base}/datenschutz/#visibility-snapshot`} target="_blank" rel="noopener">Datenschutzhinweise</a>',
    'href={`${base}/en/privacy-policy/#visibility-snapshot`} target="_blank" rel="noopener">Privacy notice</a>', 2)

# ------------------------------------------------------------------ Skript
rep("test_key: testKey || undefined", "lang: 'en', test_key: testKey || undefined", 5)
J = [
    ("`„${m[2]}“ ist Ihr eigener Name – die KI soll Sie ja von selbst empfehlen. Fragen Sie so, wie ein Kunde fragt, der Sie noch nicht kennt, z. B. „Welche Anbieter für … sind in Deutschland führend?“`",
     "`“${m[2]}” is your own name – the point is whether AI recommends you by itself. Ask the way a customer who does not know you yet would ask, e.g. “Which suppliers of … are leading in Germany?”`"),
    ("fhV.textContent = vorschlag ? `„${vorschlag}“` : '';", "fhV.textContent = vorschlag ? `“${vorschlag}”` : '';"),
    ("          'li-gf': ['Welcher Hersteller für Industriefilter ist für die Lebensmittelindustrie zu empfehlen?',\n"
     "                    'Welcher Anbieter für Druckluftrockner eignet sich für die Pharmaindustrie?',\n"
     "                    'Wer ist ein guter Hersteller für Sondermaschinen in der Verpackungstechnik?'],\n"
     "          'li-vl': ['Welcher Zulieferer für Präzisionsdrehteile ist für kleine Serien zu empfehlen?',\n"
     "                    'Wer liefert zuverlässig Kunststoff-Spritzgussteile für die Medizintechnik?',\n"
     "                    'Welcher Hersteller für Förderanlagen eignet sich für die Intralogistik?'],\n"
     "          'li-ml': ['Was ist die beste Lösung für Ölnebelabscheidung an CNC-Maschinen?',\n"
     "                    'Welcher Anbieter für Koordinatenmessgeräte eignet sich für Kunststoffteile?',\n"
     "                    'Welche Blitzschutzanlage ist für die Nachrüstung von Industriegebäuden zu empfehlen?'],",
     "          'li-gf': ['Which manufacturer of industrial filters is recommended for the food industry?',\n"
     "                    'Which supplier of compressed air dryers is suitable for the pharmaceutical industry?',\n"
     "                    'Who is a good manufacturer of special-purpose machines for packaging?'],\n"
     "          'li-vl': ['Which supplier of precision turned parts is recommended for small batches?',\n"
     "                    'Who reliably supplies plastic injection-moulded parts for medical technology?',\n"
     "                    'Which manufacturer of conveyor systems is suitable for intralogistics?'],\n"
     "          'li-ml': ['What is the best solution for oil mist separation on CNC machines?',\n"
     "                    'Which supplier of coordinate measuring machines is suitable for plastic parts?',\n"
     "                    'Which lightning protection system is recommended for retrofitting industrial buildings?'],"),
    ("if (ruhig) { setPh('z. B. ' + liste[0]); return; }", "if (ruhig) { setPh('e.g. ' + liste[0]); return; }"),
    ("const t = 'z. B. ' + liste[i];", "const t = 'e.g. ' + liste[i];"),
    ("setPh('z. B. ' + liste[liste.length - 1]);", "setPh('e.g. ' + liste[liste.length - 1]);"),
    ("setPh('z. B. ' + liste[0]); } };", "setPh('e.g. ' + liste[0]); } };"),
    ("sitekey, language: 'de',", "sitekey, language: 'en',"),
    ("loadHd.append(b, ` von ${von} KI-Systemen nennen Sie`); };", "loadHd.append(b, ` of ${von} AI systems name you`); };"),
    ("return show(err, 'Bitte geben Sie Ihre Website an.');", "return show(err, 'Please enter your website.');"),
    ("return hinweis('Bitte formulieren Sie eine ganze Frage (mindestens 25 Zeichen).');", "return hinweis('Please write a complete question (at least 25 characters).');"),
    ("return hinweis('Bitte ersetzen Sie den Platzhalter in eckigen Klammern durch Ihr Thema.');", "return hinweis('Please replace the placeholder in square brackets with your topic.');"),
    ("return show(err, 'Einen Moment bitte — die Sicherheitsprüfung läuft noch.');", "return show(err, 'One moment please — the security check is still running.');"),
    ("loadH.textContent = 'Wir fragen die KI-Systeme …';", "loadH.textContent = 'Asking the AI systems …';"),
    ("loadH.textContent = 'Einige KI-Systeme antworten gerade langsamer. Einen Moment noch …';", "loadH.textContent = 'Some AI systems are responding more slowly right now. Just a moment …';"),
    ("loadH.textContent = 'Gleich geschafft. Wir warten noch auf die letzten Antworten …';", "loadH.textContent = 'Nearly there. Waiting for the last answers …';"),
    ("loadH.textContent = 'Das dauert heute ungewöhnlich lange. Wir bleiben dran …';", "loadH.textContent = 'This is taking unusually long today. We are staying on it …';"),
    ("hinweis: 'Die KI-Systeme antworten gerade sehr langsam. Bitte versuchen Sie es in ein paar Minuten noch einmal.'", "hinweis: 'The AI systems are responding very slowly right now. Please try again in a few minutes.'"),
    ("hinweis(res.hinweis || 'Bitte formulieren Sie die Frage anders.',", "hinweis(res.hinweis || 'Please phrase the question differently.',"),
    # 02.10.2026: Limit ODER Website sperrt die Prüfung
    ("? `${res.hinweis || 'Ihre Website lässt unsere automatische Prüfung gerade nicht zu.'} Ihren KI-Wettbewerbsvergleich erstellen wir trotzdem: wer statt Ihnen empfohlen wird, bei welchen Fragen, und was zu tun ist.`",
     "? `${res.hinweis || 'Your website does not allow our automated check at the moment.'} We can still prepare your AI competitor comparison: who is recommended instead of you, for which questions, and what to do.`"),
    (": (res.hinweis || 'Für den vollständigen Überblick fordern Sie Ihren KI-Wettbewerbsvergleich an: wer statt Ihnen empfohlen wird, bei welchen Fragen, und was zu tun ist.');",
     ": (res.hinweis || 'For the full picture, request your AI competitor comparison: who is recommended instead of you, for which questions, and what to do.');"),
    # 02.10.2026: Befunde für die linke Spalte
    ("t: res.eigene_quelle_n === 0 ? 'Die KI zitiert Ihre Website nicht' : 'Die KI zitiert lieber andere Websites',",
     "t: res.eigene_quelle_n === 0 ? 'AI does not cite your website' : 'AI prefers to cite other websites',"),
    ("d: `${res.eigene_quelle_n === 0 ? 'Stattdessen' : `Ihre nur ${res.eigene_quelle_n}×, stattdessen`} ${liste(qd)}.` });",
     "d: `${res.eigene_quelle_n === 0 ? 'Instead:' : `Yours only ${res.eigene_quelle_n}×, instead:`} ${liste(qd)}.` });"),
    ("({ ungenau: 'beschreibt Ihr Angebot ungenau', falsch: 'beschreibt Ihr Unternehmen falsch', unbekannt: 'kennt Ihr Unternehmen nicht' } as any)[sb.urteil] || 'kennt Sie kaum'",
     "({ ungenau: 'describes your offering inaccurately', falsch: 'describes your company wrongly', unbekannt: 'does not know your company' } as any)[sb.urteil] || 'hardly knows you'"),
    ("d: 'Gefragt ohne Websuche, also aus dem, was das Modell über Sie gelernt hat.' });",
     "d: 'Asked without web search, i.e. from what the model has learned about you.' });"),
    ("crawler: ['KI-Systeme dürfen Ihre Website nicht lesen', 'Ihre robots.txt sperrt die Crawler der KI-Anbieter aus.'],",
     "crawler: ['AI systems may not read your website', 'Your robots.txt blocks the AI providers’ crawlers.'],"),
    ("schutz: ['Ihr Website-Schutz sperrt KI-Systeme aus', 'Die Firewall weist die Crawler der KI-Anbieter ab.'],",
     "schutz: ['Your website protection locks AI systems out', 'The firewall turns away the AI providers’ crawlers.'],"),
    ("text: ['Ohne JavaScript sieht die KI kaum Inhalt', 'KI-Crawler führen meist kein JavaScript aus.'],",
     "text: ['Without JavaScript, AI sees hardly any content', 'AI crawlers usually do not run JavaScript.'],"),
    ("klar: ['Für die KI ist unklar, was Sie anbieten', 'Die Startseite benennt Ihr Angebot nicht eindeutig.'],",
     "klar: ['AI cannot tell what you offer', 'Your homepage does not name your offering clearly.'],"),
    ("aktuell: ['Ihre Inhalte wirken veraltet', 'KI-Systeme bevorzugen aktuelle Quellen.'],",
     "aktuell: ['Your content looks out of date', 'AI systems prefer current sources.'],"),
    ("schema: ['Ihre Firmendaten sind nicht maschinenlesbar', 'Kein Schema.org auf der Startseite, KI-Systeme ordnen Sie dadurch schlechter ein.'] };",
     "schema: ['Your company data is not machine-readable', 'No Schema.org on your homepage, so AI systems place you less reliably.'] };"),
    # 02.10.2026: Abschluss auf der Startseite (Frage + Nutzen)
    ("hinten: [['Was macht ', { b: W }, ' besser?'], rz({ gf: 'Der Wettbewerbsvergleich zeigt es Ihnen.',\n"
     "              vl: `Der Wettbewerbsvergleich zeigt, wo ${W} Ihnen Anfragen abnimmt.`, ml: `Der Wettbewerbsvergleich zeigt, welche Quellen ${W} nach vorn bringen.` })],",
     "hinten: [['What does ', { b: W }, ' do better?'], rz({ gf: 'The competitor comparison shows you.',\n"
     "              vl: `The competitor comparison shows where ${W} takes enquiries from you.`, ml: `The competitor comparison shows which sources put ${W} ahead.` })],"),
    ("fehlt: [['Warum empfiehlt die KI andere?'], rz({ gf: 'Der Wettbewerbsvergleich zeigt es Ihnen.',\n"
     "              vl: 'Der Wettbewerbsvergleich zeigt, warum diese Anfragen an Ihnen vorbeigehen.', ml: 'Der Wettbewerbsvergleich zeigt, welche Quellen der KI über Sie fehlen.' })],",
     "fehlt: [['Why does AI recommend others?'], rz({ gf: 'The competitor comparison shows you.',\n"
     "              vl: 'The competitor comparison shows why these enquiries pass you by.', ml: 'The competitor comparison shows which sources about you AI is missing.' })],"),
    ("vorn: [['Und bei Ihren anderen Kundenfragen?'], 'Der Wettbewerbsvergleich zeigt, wo andere vorn liegen.'],",
     "vorn: [['And for your other customer questions?'], 'The competitor comparison shows where others are ahead.'],"),
    ("meist: [W ? ['Wo überholt Sie ', { b: W }, '?'] : ['Wo fehlen Sie noch?'], 'Der Wettbewerbsvergleich zeigt es Ihnen.'],",
     "meist: [W ? ['Where does ', { b: W }, ' overtake you?'] : ['Where are you still missing?'], 'The competitor comparison shows you.'],"),
    ("offen: [['Wer steht vor Ihnen?'], 'Der Wettbewerbsvergleich zeigt es Ihnen.'],",
     "offen: [['Who is ahead of you?'], 'The competitor comparison shows you.'],"),
    ("'Der Snapshot ist gerade nicht verfügbar. Bitte später erneut versuchen.'", "'The snapshot is not available right now. Please try again later.'"),
    ("`${a.slice(0, -1).join(', ')} und ${a[a.length - 1]}`", "`${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`"),
    ("let lvl = 'mittel', lbl = 'Ausbaufähig', satz = '';", "let lvl = 'mittel', lbl = 'Room to grow', satz = '';"),
    ("lvl = 'schlecht'; lbl = 'Kritisch'; satz = `${M} kommt bei dieser Frage in keinem KI-System vor${rivTop.length ? ` – empfohlen werden stattdessen ${fettL(rivTop)}` : ''}.`;",
     "lvl = 'schlecht'; lbl = 'Critical'; satz = `${M} does not appear in any AI system for this question${rivTop.length ? ` – recommended instead: ${fettL(rivTop)}` : ''}.`;"),
    ("lvl = 'gut'; lbl = 'Stark'; satz = `${M} ist bei dieser Frage überall die erste Empfehlung – eine starke Position, die es zu halten gilt.`;",
     "lvl = 'gut'; lbl = 'Strong'; satz = `${M} is the first recommendation everywhere for this question – a strong position worth holding on to.`;"),
    ("satz = `${M} steht vorn, wo es genannt wird – fehlt aber in ${fehltN} von ${von} KI-Systemen.`;",
     "satz = `${M} comes first wherever it is named – but is missing in ${fehltN} of ${von} AI systems.`;"),
    ("satz = `${M} ist präsent, aber ${e1 * 2 >= g ? 'nicht überall' : 'selten'} die erste Empfehlung${(vornTop.length ? vornTop : rivTop).length ? ` – vorn stehen oft ${fettL(vornTop.length ? vornTop : rivTop)}` : ''}.`;",
     "satz = `${M} is present, but ${e1 * 2 >= g ? 'not everywhere' : 'rarely'} the first recommendation${(vornTop.length ? vornTop : rivTop).length ? ` – often ahead: ${fettL(vornTop.length ? vornTop : rivTop)}` : ''}.`;"),
    ("lvl = 'schlecht'; lbl = 'Schwach'; satz = `${M} wird nur vereinzelt genannt${rivTop.length ? ` – die meisten KI-Systeme empfehlen ${fettL(rivTop)}` : ''}.`;",
     "lvl = 'schlecht'; lbl = 'Weak'; satz = `${M} is named only occasionally${rivTop.length ? ` – most AI systems recommend ${fettL(rivTop)}` : ''}.`;"),
    ("pl.textContent = !s.antwort ? 'keine Antwort' : !s.genannt ? 'nicht genannt' : s.platz ? `Platz ${s.platz}` : 'genannt';",
     "pl.textContent = !s.antwort ? 'no answer' : !s.genannt ? 'not named' : s.platz ? `rank ${s.platz}` : 'named';"),
    ("const emp = (s.empfiehlt || []).length ? ` – empfiehlt ${liste(s.empfiehlt)}` : '';", "const emp = (s.empfiehlt || []).length ? ` – recommends ${liste(s.empfiehlt)}` : '';"),
    ("zeilen.push([s.label, `Nicht genannt${emp}.`, s]);", "zeilen.push([s.label, `Not named${emp}.`, s]);"),
    ("zeilen.push([s.label, `Platz ${s.platz}${(s.vor || []).length ? ` – hinter ${liste(s.vor)}` : ''}.`, s]);",
     "zeilen.push([s.label, `Rank ${s.platz}${(s.vor || []).length ? ` – behind ${liste(s.vor)}` : ''}.`, s]);"),
    ("zeilen.push(['Quellen', `Ihre Website ${res.eigene_quelle_n === 0 ? 'wird nicht' : `nur ${res.eigene_quelle_n}×`} zitiert – stattdessen ${liste(qd)}.`]);",
     "zeilen.push(['Sources', `Your website is ${res.eigene_quelle_n === 0 ? 'not cited' : `cited only ${res.eigene_quelle_n}×`} – instead: ${liste(qd)}.`]);"),
    ("richtig: ['Zutreffend', ''], ungenau: ['Ungenau', 'beschreibt Ihr Angebot ungenau (ohne Websuche).'],",
     "richtig: ['Accurate', ''], ungenau: ['Inaccurate', 'describes your offering inaccurately (without web search).'],"),
    ("falsch: ['Falsch', 'beschreibt Ihr Unternehmen falsch (ohne Websuche).'], unbekannt: ['Kennt Sie nicht', 'kennt Ihr Unternehmen nicht (ohne Websuche).'] };",
     "falsch: ['Wrong', 'describes your company wrongly (without web search).'], unbekannt: ['Does not know you', 'does not know your company (without web search).'] };"),
    ("zeilen.push(['Bekanntheit', `${sb.system || 'ChatGPT'} ${sbTxt[sb.urteil][1]}`]);", "zeilen.push(['Awareness', `${sb.system || 'ChatGPT'} ${sbTxt[sb.urteil][1]}`]);"),
    ("techFehlt.forEach((t: any) => zeilen.push(['Technik', t.detail || t.label]));", "techFehlt.forEach((t: any) => zeilen.push(['Technical', t.detail || t.label]));"),
    ("b.textContent = g === 0 ? 'Stattdessen empfohlen: ' : 'Ebenfalls empfohlen: ';", "b.textContent = g === 0 ? 'Recommended instead: ' : 'Also recommended: ';"),
    ("x.textContent = 'Jetzt prüfen →';", "x.textContent = 'Check now →';"),
    ("b2.textContent = g === 0 ? 'Sie gar nicht' : `Sie ${g}×`;", "b2.textContent = g === 0 ? 'you not at all' : `you ${g}×`;"),
    ("vs.append(b1, document.createTextNode(` wird ${top.anzahl}× von ${von} KI-Systemen genannt – `), b2, document.createTextNode('.'));",
     "vs.append(b1, document.createTextNode(` is named ${top.anzahl}× by ${von} AI systems – `), b2, document.createTextNode('.'));"),
    ("bb.textContent = `1 von rund ${nF}`;", "bb.textContent = `1 of around ${nF}`;"),
    ("{ className: 'snap-cov-typ', textContent: 'typischen ' }), 'Kundenfragen geprüft');", "{ className: 'snap-cov-typ', textContent: 'typical ' }), 'customer questions checked');"),
    ("const nFr = nF >= 20 ? `rund ${nF}` : '';", "const nFr = nF >= 20 ? `around ${nF}` : '';"),
    ("if (i) z.push(i === Wl.length - 1 ? ' und ' : ', ');", "if (i) z.push(i === Wl.length - 1 ? ' and ' : ', ');"),
    # Überschriften je Rolle
    ("                fehlt: [['Die KI empfiehlt ', ...namen(), '.'], 'Nicht Sie.'],\n"
     "                hinten: [[{ b: W }, ' steht vor Ihnen.'], 'Bei wie vielen Fragen noch?'],\n"
     "                vorn: [['Hier sind Sie vorn.'], nFr ? `Bei den anderen ${nFr} Fragen auch?` : 'Bei Ihren anderen Kundenfragen auch?'],\n"
     "                offen: [['Das war nur ', { b: 'eine' }, ' Frage.'], nFr ? `Ihre Kunden stellen ${nFr}.` : 'Wer gewinnt die anderen?'],\n"
     "              },\n"
     "              c: 'Ihre Kunden fragen zuerst die KI, und die schreibt die Shortlist. Wer dort fehlt, bekommt die Anfrage nicht. Und meist merkt man das gar nicht.',\n"
     "              l: ['Welche Wettbewerber die KI bei Ihren wichtigsten Kundenfragen empfiehlt, und warum',\n"
     "                  'Bei welchen Fragen die Anfragen heute an andere gehen',\n"
     "                  'Ihre Position in Google und KI, direkt neben Ihren Wettbewerbern',\n"
     "                  'Was konkret zu tun ist, damit Sie auf die Shortlist kommen'],",
     "                fehlt: [['AI recommends ', ...namen(), '.'], 'Not you.'],\n"
     "                hinten: [[{ b: W }, ' is ahead of you.'], 'For how many more questions?'],\n"
     "                vorn: [['Here you are ahead.'], nFr ? `For the other ${nFr} questions too?` : 'For your other customer questions too?'],\n"
     "                offen: [['That was just ', { b: 'one' }, ' question.'], nFr ? `Your customers ask ${nFr}.` : 'Who wins the others?'],\n"
     "              },\n"
     "              c: 'Your customers ask AI first, and AI writes the shortlist. Anyone missing from it does not get the enquiry. And most of the time nobody notices.',\n"
     "              l: ['Which competitors AI recommends for your most important customer questions, and why',\n"
     "                  'For which questions the enquiries currently go to others',\n"
     "                  'Your position in Google and AI, right next to your competitors',\n"
     "                  'What exactly to do to get onto the shortlist'],"),
    ("                fehlt: [['Diese Anfrage geht an ', ...namen(), '.'], 'Nicht an Sie.'],\n"
     "                hinten: [[{ b: W }, ' steht vor Ihnen auf der Shortlist.'], 'Bei wie vielen Anfragen noch?'],\n"
     "                vorn: [['Diese Anfrage landet bei Ihnen.'], nFr ? `Und die anderen ${nFr}?` : 'Und die anderen?'],\n"
     "                offen: [['Das war nur ', { b: 'eine' }, ' Anfrage.'], nFr ? `Einkäufer stellen ${nFr}.` : 'Wer bekommt die anderen?'],\n"
     "              },\n"
     "              c: 'Einkäufer fragen die KI, bevor sie Ihren Vertrieb anrufen. Wen sie nicht nennt, der bekommt keine Anfrage. Und im CRM taucht das nie als verlorene Chance auf.',\n"
     "              l: ['Bei welchen Kundenfragen die KI heute Ihre Wettbewerber empfiehlt',\n"
     "                  'Wer auf den Shortlists steht, und warum die KI ihn nennt',\n"
     "                  'Wo Anfragen an Ihnen vorbeilaufen, nach Produkt und Anwendung',\n"
     "                  'Was passieren muss, damit Ihr Vertrieb wieder mit am Tisch sitzt'],",
     "                fehlt: [['This enquiry goes to ', ...namen(), '.'], 'Not to you.'],\n"
     "                hinten: [[{ b: W }, ' is ahead of you on the shortlist.'], 'For how many more enquiries?'],\n"
     "                vorn: [['This enquiry lands with you.'], nFr ? `And the other ${nFr}?` : 'And the others?'],\n"
     "                offen: [['That was just ', { b: 'one' }, ' enquiry.'], nFr ? `Buyers ask ${nFr}.` : 'Who gets the others?'],\n"
     "              },\n"
     "              c: 'Buyers ask AI before they call your sales team. Whoever it does not name gets no enquiry. And your CRM never shows it as a lost opportunity.',\n"
     "              l: ['For which customer questions AI currently recommends your competitors',\n"
     "                  'Who is on the shortlists, and why AI names them',\n"
     "                  'Where enquiries pass you by, by product and application',\n"
     "                  'What has to happen so your sales team gets back to the table'],"),
    ("                fehlt: [['Die KI empfiehlt ', ...namen(), '.'], 'Ihre Marke fehlt.'],\n"
     "                hinten: [[{ b: W }, ' steht vor Ihnen.'], 'Wissen Sie, warum?'],\n"
     "                vorn: [['Hier sind Sie vorn.'], nFr ? `Bei den anderen ${nFr} Fragen auch?` : 'Bei Ihren anderen Themen auch?'],\n"
     "                offen: [['Das war nur ', { b: 'eine' }, ' Frage.'], nFr ? `Ihre Zielgruppe stellt ${nFr}.` : 'Wie sieht der Rest aus?'],\n"
     "              },\n"
     "              c: 'Gute Google-Rankings reichen nicht mehr. Die KI entscheidet nach eigenen Quellen, wen sie empfiehlt. Und kein Analytics-Report zeigt Ihnen das.',\n"
     "              l: ['Ihre Sichtbarkeit in Google und in fünf KI-Systemen, neben Ihren Wettbewerbern',\n"
     "                  'Welche Quellen die KI für Ihre Wettbewerber zitiert, und welche Ihnen fehlen',\n"
     "                  'Die typischen Fragen Ihrer Zielgruppe, systematisch gemessen',\n"
     "                  'Ein priorisierter Maßnahmenplan, mit dem Sie intern Budget begründen können'],",
     "                fehlt: [['AI recommends ', ...namen(), '.'], 'Your brand is missing.'],\n"
     "                hinten: [[{ b: W }, ' is ahead of you.'], 'Do you know why?'],\n"
     "                vorn: [['Here you are ahead.'], nFr ? `For the other ${nFr} questions too?` : 'For your other topics too?'],\n"
     "                offen: [['That was just ', { b: 'one' }, ' question.'], nFr ? `Your audience asks ${nFr}.` : 'What does the rest look like?'],\n"
     "              },\n"
     "              c: 'Good Google rankings are no longer enough. AI decides on its own sources whom to recommend. And no analytics report shows you that.',\n"
     "              l: ['Your visibility in Google and five AI systems, next to your competitors',\n"
     "                  'Which sources AI cites for your competitors, and which ones you are missing',\n"
     "                  'The typical questions of your audience, measured systematically',\n"
     "                  'A prioritised action plan you can use to justify budget internally'],"),
    ("bw.append(vor); namen.forEach((n, k) => { if (k) bw.append(k === namen.length - 1 ? ' und ' : ', ');",
     "bw.append(vor); namen.forEach((n, k) => { if (k) bw.append(k === namen.length - 1 ? ' and ' : ', ');"),
    ("mitNamen('Bei dieser Frage gehen die Anfragen heute an ', rivTop, '.');", "mitNamen('For this question, the enquiries currently go to ', rivTop, '.');"),
    ("bw.textContent = 'Bei dieser Frage nennt Sie kein einziges KI-System.';", "bw.textContent = 'For this question, not a single AI system names you.';"),
    ("bw.textContent = 'Bei dieser Frage sind Sie vorn – in Ihren anderen Geschäftsbereichen auch?';", "bw.textContent = 'For this question you are ahead – in your other business areas too?';"),
    ("bw.textContent = `Bei dieser Frage fehlen Sie in ${von - g} von ${von} KI-Systemen.`;", "bw.textContent = `For this question you are missing in ${von - g} of ${von} AI systems.`;"),
    ("mitNamen('Bei dieser Frage stehen oft ', vorOft, ' vor Ihnen.');", "mitNamen('For this question, ', vorOft, ' are often ahead of you.');"),
    ("return show(limErr, 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse an.');", "return show(limErr, 'Please enter your business email address.');"),
    ("return show(err2, 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse an.');", "return show(err2, 'Please enter your business email address.');"),
    ("dn.textContent = `Fast geschafft. Bitte bestätigen Sie kurz den Link in der E-Mail an ${mail}. Danach ergänzen Sie noch Ihren Namen, und wir erstellen Ihren Wettbewerbsvergleich.`;",
     "dn.textContent = `Almost done. Please confirm the link in the email to ${mail}. Then add your name, and we will prepare your competitor comparison.`;"),
    ("($('[data-donet]') as HTMLElement).textContent = `Bitte bestätigen Sie kurz den Link in der E-Mail an ${mail}. Danach ergänzen Sie noch Ihren Namen, und wir erstellen Ihren Wettbewerbsvergleich.`;",
     "($('[data-donet]') as HTMLElement).textContent = `Please confirm the link in the email to ${mail}. Then add your name, and we will prepare your competitor comparison.`;"),
    ("mailIn.placeholder = 'vorname.nachname';", "mailIn.placeholder = 'firstname.lastname';"),
    # Ergebnis kompakt (01.10.2026)
    ("const nTech = zeilenK.filter((z) => z[0] === 'Technik').length", "const nTech = zeilenK.filter((z) => z[0] === 'Technical').length"),
    ("? `${nTech} Technik-Hinweis${nTech === 1 ? '' : 'e'} für Ihre Website`", "? `${nTech} technical note${nTech === 1 ? '' : 's'} for your website`"),
    (": `${zeilenK.length} Hinweise zu ${zeilenK.map((z) => z[0]).filter((x, k, a) => a.indexOf(x) === k).join(', ')}`;",
     ": `${zeilenK.length} notes on ${zeilenK.map((z) => z[0].toLowerCase()).filter((x, k, a) => a.indexOf(x) === k).join(', ')}`;"),
    ("vz.append('Stattdessen empfohlen: ');", "vz.append('Recommended instead: ');"),
    ("vz.append('Vor Ihnen: ');", "vz.append('Ahead of you: ');"),
    ("if (c > 1) vz.append(` (${c} Systeme)`);", "if (c > 1) vz.append(` (${c} systems)`);"),
    ("const b = document.createElement('b'); b.textContent = `1 von rund ${nF}`;", "const b = document.createElement('b'); b.textContent = `1 of around ${nF}`;"),
    ("at.append(b, ' Kundenfragen geprüft · im Vergleich: ',", "at.append(b, ' customer questions checked · in the comparison: ',"),
]
for a, b in J:
    rep(a, b)
rep("hinweis: 'Die Verbindung ist fehlgeschlagen. Bitte erneut versuchen.'", "hinweis: 'The connection failed. Please try again.'", 2)
rep("'Das hat nicht geklappt. Bitte erneut versuchen.'", "'That did not work. Please try again.'", 2)

DST.write_text(s)
print(f"ok → {DST.relative_to(ROOT)}")
