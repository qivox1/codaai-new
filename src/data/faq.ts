/**
 * Eine Quelle für alle Fragen & Antworten der deutschen Seiten.
 *
 * Aufteilung nach Ort der Entscheidung (Beschluss Oli, 03.08.2026): Jede Frage
 * steht dort, wo sie im Kopf des Lesers auftaucht — Preisfragen auf /preise,
 * Fachfragen auf /digital-visibility, Webinarfragen auf /webinar, Fragen zu
 * CodaAI und zur Zusammenarbeit auf der Startseite unter dem Termin-Teaser.
 * `/faq` bleibt die Sammelseite und zeigt alle vier Gruppen.
 *
 * Regel für neue Einträge:
 *   - Eine Frage gehört in GENAU EINE Gruppe. Wer sie in zwei einträgt,
 *     erzeugt doppelte Antworten auf zwei Seiten.
 *   - Die Frage wird so formuliert, wie ein Interessent sie stellt, nicht wie
 *     wir sie gern hätten.
 *   - Jede Zahl braucht eine Quelle im Satz. Keine Erfolgsversprechen — das
 *     widerspricht der Zusage, keine Platzierung zu garantieren.
 *
 * Das FAQPage-Schema liegt jeweils auf der Themenseite, NICHT zusätzlich auf
 * /faq — sonst stünde dieselbe Frage zweimal ausgezeichnet im Index.
 */

export interface FaqItem {
  q: string;
  a: string;
}

/* ── Startseite: CodaAI allgemein und die Zusammenarbeit ─────────────────── */
export const faqAllgemein: FaqItem[] = [
  {
    q: 'Was macht CodaAI eigentlich?',
    a: 'Wir sorgen dafür, dass Ihr Unternehmen in KI-Antworten vorkommt — in ChatGPT, in der Google KI-Übersicht und in der klassischen Suche. Das läuft in drei Stufen: Ihre Website für KI-Systeme lesbar machen, danach dort präsent sein, wo diese Systeme ihre Belege holen, und schließlich selbst zur zitierten Quelle werden. Jeden Monat bekommen Sie schwarz auf weiß, wo Sie stehen.',
  },
  {
    q: 'Wie fange ich an — und was muss ich dafür bereitstellen?',
    a: 'Der Einstieg ist Ihr kostenloses Digital Visibility Audit: Wir dokumentieren, was ChatGPT und die Google KI-Übersicht heute über Ihr Unternehmen antworten, und Sie bekommen das als persönliches Dashboard. Im 30-Minuten-Gespräch gehen wir den Befund gemeinsam durch. Von Ihnen brauchen wir zum Start nichts außer Ihrer Domain — erst wenn Sie sich für eine Zusammenarbeit entscheiden, kommen Fachwissen aus Ihrem Haus und ein Ansprechpartner dazu.',
  },
  {
    q: 'Was unterscheidet CodaAI von einem KI-Schreibtool und von einer klassischen Agentur?',
    a: 'Ein Schreibtool liefert Texte ohne Strategie und ohne Prüfung. Eine klassische Agentur liefert Leistung, aber behauptet die Wirkung. Wir machen sie messbar: Vor Vertragsbeginn steht Ihr Audit, im laufenden Programm ein monatliches Monitoring Ihrer KI-Nennungen. Die Grundlage ist eine eigene Erhebung mit 7.184 dokumentierten KI-Antworten (CodaAI-Studie „KI-Blindtest Mittelstand 2026").',
  },
  {
    q: 'Wir haben schon eine Agentur. Ist CodaAI dann überhaupt sinnvoll?',
    a: 'Ja, und zwar ohne dass jemand seinen Platz räumen muss. Ihre Agentur kennt Markt, Tonalität und Zielgruppe — das ersetzen wir nicht. Wir bringen die Bausteine für KI-Sichtbarkeit ein und liefern sie so, dass Ihre Agentur oder Ihr Marketing-Team direkt damit arbeiten kann. Auch Ihr Audit-Befund geht auf Wunsch an beide Seiten.',
  },
  {
    q: 'Arbeitet CodaAI direkt in unserem CMS?',
    a: 'Nur wenn Sie es wollen. Alles, was ohne Zugriff auf Ihre Systeme geht, übernehmen wir vollständig: Inhalte, Digital-PR, Verzeichnisse und Portale, Monitoring und Reporting. Für Änderungen an Ihrer Website liefern wir Ihrem Web-Team umsetzungsreife Vorlagen — fertige Texte, konkrete Code-Schnipsel, Schritt-für-Schritt-Anleitungen. Auf Wunsch und mit Zugang setzen wir es selbst um.',
  },
  {
    q: 'Ist das für unsere Branche geeignet?',
    a: 'Unser Kern ist der B2B-Mittelstand im deutschsprachigen Raum, typischerweise 50 bis 500 Mitarbeitende, wo Geschäftsführung und Marketing gemeinsam entscheiden. Entscheidend ist nicht die Branche, sondern ob Ihre Kunden vor dem Kauf recherchieren. Fachsprache, Ton und Themen legen wir zu Beginn mit Ihnen fest. Für reine Endkundengeschäfte mit Impulskauf sind wir der falsche Partner — das sagen wir dann auch.',
  },
  {
    q: 'Wem gehören die Inhalte, die für uns entstehen?',
    a: 'Ihnen. Alle Texte, Grafiken und Auswertungen, die während der Zusammenarbeit entstehen, gehören uneingeschränkt Ihrem Unternehmen — ebenso Ihre Audit-Ergebnisse und alle Monatsreports. Das gilt auch nach dem Ende der Zusammenarbeit.',
  },
];

/* ── /digital-visibility: wie KI-Sichtbarkeit funktioniert ───────────────── */
export const faqVisibility: FaqItem[] = [
  {
    q: 'Was ist der Unterschied zwischen SEO, AEO und GEO?',
    a: 'SEO sorgt dafür, dass Ihre Website bei Google und Bing rankt — das Fundament. AEO bringt Ihre Inhalte in die Antwortbox über den Suchergebnissen, die Google KI-Übersicht. GEO sorgt dafür, dass Ihr Unternehmen in ChatGPT, Gemini, Perplexity und Claude namentlich empfohlen wird. Die drei bauen aufeinander auf: Wer für KI-Systeme nicht lesbar ist, wird auch nicht zitiert.',
  },
  {
    q: 'Wir ranken bei Google gut. Reicht das nicht?',
    a: 'Offenbar nicht. In unserer Erhebung sind 35 % der Unternehmen mit mehr als 100 Top-10-Rankings bei Google in ChatGPT vollständig unsichtbar (CodaAI-Studie „KI-Blindtest Mittelstand 2026", 449 Unternehmen). Klassische Suchmaschinen bewerten Seiten, KI-Systeme bewerten Belege — dafür zählt, wer außerhalb Ihrer Website über Sie schreibt.',
  },
  {
    q: 'Wie messen Sie KI-Sichtbarkeit?',
    a: 'Wir stellen KI-Systemen monatlich dieselben Einkäuferfragen und dokumentieren dreierlei: wie oft Ihr Unternehmen genannt wird, welche Quellen dafür zitiert werden und wie Ihr Anteil im Vergleich zum Wettbewerb aussieht. Wichtig für die Einordnung: KI-Antworten sind nicht deterministisch — dieselbe Frage kann heute anders beantwortet werden als morgen. Seriös ist deshalb die Aussage über den Verlauf, nicht über einen einzelnen Tag.',
  },
  {
    q: 'Warum garantieren Sie keine bestimmte Platzierung in ChatGPT?',
    a: 'Weil das niemand seriös kann. Es gibt kein Programm, mit dem sich eine Nennung kaufen oder buchen ließe, und dieselbe Frage kann morgen anders beantwortet werden. Wer „Platz 1 in ChatGPT" verspricht, verspricht etwas technisch Unmögliches. Wir arbeiten an den Hebeln, die nachweislich wirken, und legen die Entwicklung monatlich offen — auch dann, wenn sie flach verläuft.',
  },
  {
    q: 'Woher wissen Sie, welche Maßnahmen wirken?',
    a: 'Aus Messungen, nicht aus Meinung. Markennennungen auf Drittseiten korrelieren mit r = 0,664 mit KI-Sichtbarkeit, Backlinks nur mit r = 0,218 (Ahrefs, 75.000 Marken) — deshalb steht bei uns die Erwähnung im Vordergrund und nicht der Link. Jeder der vierzehn Bausteine ist an eine solche Beobachtung geknüpft — aus veröffentlichten Studien oder aus unserer eigenen Erhebung. Welche das jeweils ist, legen wir im Erstgespräch offen.',
  },
  {
    q: 'Wie lange dauert es, bis sich etwas zeigt?',
    a: 'Erste Nennungen erscheinen im deutschen Markt typischerweise nach 8 bis 12 Wochen, eine belastbare Sichtbarkeit nach 3 bis 6 Monaten. Der Grund ist der Ablauf dahinter: Inhalte müssen gefunden, eingeordnet und von anderen aufgegriffen werden, bevor ein KI-System sie als Beleg verwendet. Sichtbarkeit ist ein Aufbau, kein Schalter.',
  },
  {
    q: 'Was passiert, wenn KI-Systeme ihre Regeln ändern?',
    a: 'Dann ändert sich die Gewichtung, nicht das Prinzip. Kein Anbieter legt offen, warum er ein Unternehmen empfiehlt, und jedes System arbeitet anders. Deshalb setzen wir nicht auf einen Trick, sondern auf die Faktoren, die über alle Systeme hinweg wiederkehren: Lesbarkeit, Belege von Dritten, eigene zitierfähige Substanz. Was sich verschiebt, sehen Sie im monatlichen Monitoring — und wir ziehen den Plan nach.',
  },
];

/* ── /preise: Preis, Laufzeit, Vertrag ───────────────────────────────────── */
export const faqPreise: FaqItem[] = [
  {
    q: 'Wie setzt sich mein Monatspreis zusammen?',
    a: 'Aus drei Posten: der Anzahl Fachbeiträge multipliziert mit dem Stückpreis Ihrer Stufe, den optionalen Erweiterungen (Übersetzungen, Videos) und dem festen Grundpreis Ihrer Stufe. Beispiel: 4 Artikel × 420 € = 1.680 €, plus Grundpreis der Stufe Empfohlen 990 € = 2.670 € pro Monat. Alles netto, alles auf einer Rechnung.',
  },
  {
    q: 'Warum kostet ein Artikel in Stufe 1 mehr als in Stufe 3?',
    a: 'Weil der Mengenrabatt an der Stufe hängt, nicht an der Artikelzahl: 490 € in Stufe 1, 420 € in Stufe 2, 390 € in Stufe 3. Wer mehr Inhalt braucht, ist in einer höheren Stufe günstiger unterwegs — und bekommt die stärkeren Hebel dazu. Ein Preis je Stufe statt einer Rabatttabelle.',
  },
  {
    q: 'Wie ordnet sich das gegenüber einer Agentur ein?',
    a: 'Ein vergleichbarer Agentur-Retainer liegt im deutschsprachigen Raum im Schnitt bei rund 3.800 € pro Monat, das Band für den Mittelstand bei 1.500 bis 5.000 € (Marktbenchmark DACH 2026). Bei uns beginnt der Grundpreis bei 1.470 € pro Monat — und Sie können ihn im Rechner nachrechnen, statt ihn anzufragen. Der Unterschied entsteht durch die Arbeitsteilung: Menschen entscheiden und prüfen, KI erledigt das Wiederkehrende.',
  },
  {
    q: 'Welche Mindestlaufzeit gilt — und was passiert danach?',
    a: 'Sechs Monate bei monatlicher Abrechnung, weil Sichtbarkeit diesen Zeitraum braucht, um überhaupt messbar zu werden. Wer sich auf zwölf Monate festlegt, zahlt 10 % weniger. Es gibt kein automatisches Rollover: Sie entscheiden aktiv über die Verlängerung. Nach dem Ende behalten Sie alle Inhalte, Audit-Ergebnisse und Reports — ohne Abschlussgebühr.',
  },
  {
    q: 'Kann ich die Stufe später wechseln?',
    a: 'Ein Wechsel nach oben ist jederzeit zum nächsten Monat möglich, die laufende Mindestlaufzeit läuft dabei weiter. Ein Wechsel nach unten zum Ende der Mindestlaufzeit. Die Artikelzahl innerhalb Ihrer Stufe passen Sie zu jedem Verlängerungszeitpunkt an.',
  },
  {
    q: 'Was ist das Sichtbarkeits-Versprechen?',
    a: 'Zeigt sich nach 120 Tagen keine messbare Bewegung in Ihren KI-Nennungen, arbeiten wir bis zum Ende der Laufzeit ohne weitere Kosten weiter. Gemessen wird an Ihrem monatlichen Monitoring — denselben Zahlen, die Sie ohnehin von uns bekommen. Es ist ein Versprechen auf unsere Arbeit, keine Zusage auf eine Platzierung: Wir tragen das Risiko, wenn nichts passiert.',
  },
  {
    q: 'Wie bekomme ich ein verbindliches Angebot?',
    a: 'Stellen Sie Ihre Konfiguration im Rechner zusammen und buchen Sie das 30-Minuten-Gespräch. Sie bekommen das Angebot danach schriftlich — zum Weiterleiten an Geschäftsführung oder Einkauf. Abgerechnet wird auf Rechnung, eine Kreditkarte brauchen Sie nicht.',
  },
];

/* ── /webinar: Teilnahme am Live-Webinar am 08.09.2026 ───────────────────── */
export const faqWebinar: FaqItem[] = [
  {
    q: 'Wie erhalte ich den Zugangslink?',
    a: 'Nach der Anmeldung erhalten Sie eine Bestätigung per E-Mail. Den Zoom-Zugangslink senden wir rechtzeitig vor dem Termin an dieselbe Adresse — es gibt keinen Newsletter und keine Werbung.',
  },
  {
    q: 'Wird meine Firma im Webinar öffentlich getestet?',
    a: 'Nur, wenn Sie das bei der Anmeldung ausdrücklich erlauben — und dann ausschließlich anonym, ohne Nennung Ihres Firmennamens. Ihr persönliches Sichtbarkeits-Audit erhalten grundsätzlich nur Sie selbst.',
  },
  {
    q: 'Was kostet die Teilnahme — und wo ist der Haken?',
    a: 'Die Teilnahme ist kostenlos — auf Wunsch inklusive Ihres persönlichen Sichtbarkeits-Audits. Es gibt kein Projekt-Commitment und keinen Verkaufsblock im Webinar. Wer seine Ergebnisse besprechen möchte, kann freiwillig ein 30-Minuten-Gespräch buchen — mehr nicht.',
  },
  {
    q: 'Bei uns ist nur Microsoft Copilot erlaubt — bringt mir das Webinar trotzdem etwas?',
    a: 'Ja. Copilot nutzt dieselben GPT-Modelle wie ChatGPT — alles, was wir im Webinar zum Selbst-Prüfen zeigen, funktioniert dort genauso. Unsere Studien-Messungen beziehen sich auf ChatGPT und die Google KI-Übersicht; die Mechanik, nach der KI-Assistenten Anbieter empfehlen oder weglassen, ist bei Copilot dieselbe.',
  },
  {
    q: 'Wir ranken bei Google gut — lohnt sich das trotzdem?',
    a: 'Gerade dann: 35 % der untersuchten Unternehmen mit über 100 Top-10-Rankings bei Google sind in ChatGPT komplett unsichtbar. Klassische SEO-Stärke und KI-Sichtbarkeit sind zwei verschiedene Disziplinen — genau dieses SEO-Paradox zeigen wir live.',
  },
  {
    q: 'Gibt es eine Aufzeichnung?',
    a: 'Ja. Alle Angemeldeten bekommen die Aufzeichnung im Anschluss per E-Mail — auch, wenn Sie am Termin selbst nicht dabei sein können.',
  },
];

/* Reihenfolge und Beschriftung der Sammelseite /faq. */
export const faqGroups: { id: string; title: string; intro: string; href: string; hrefLabel: string; items: FaqItem[] }[] = [
  {
    id: 'allgemein',
    title: 'CodaAI und die Zusammenarbeit',
    intro: 'Wer wir sind, wie ein Projekt anläuft und wie wir uns zu Agenturen und internen Teams verhalten.',
    href: '/',
    hrefLabel: 'Zur Startseite',
    items: faqAllgemein,
  },
  {
    id: 'digital-visibility',
    title: 'Digital Visibility',
    intro: 'Wie KI-Sichtbarkeit entsteht, wie wir sie messen und warum niemand eine Platzierung garantieren kann.',
    href: '/digital-visibility/',
    hrefLabel: 'Zu den Leistungen',
    items: faqVisibility,
  },
  {
    id: 'preis',
    title: 'Preis, Laufzeit und Vertrag',
    intro: 'Woraus sich der Monatspreis zusammensetzt, wie lange Sie sich binden und was danach passiert.',
    href: '/preise/',
    hrefLabel: 'Zu den Preisen',
    items: faqPreise,
  },
  {
    id: 'webinar',
    title: 'Live-Webinar',
    intro: 'Anmeldung, Ablauf und Aufzeichnung des Webinars „Empfohlen oder unsichtbar?".',
    href: '/webinar/',
    hrefLabel: 'Zum Webinar',
    items: faqWebinar,
  },
];
