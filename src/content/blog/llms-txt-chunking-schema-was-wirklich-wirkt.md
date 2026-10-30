---
title: "Google sagt: GEO ist SEO. Was llms.txt, Chunking und Spezial-Schema wirklich bringen"
seoTitle: "llms.txt, Chunking, Schema: Was wirkt?"
description: "Google nennt GEO „weiterhin SEO“. Was llms.txt, Chunking und Schema-Markup für KI-Antworten bringen – geprüft an Google-Doku und drei großen Studien."
pubDate: 2026-10-30
lang: de
heroImage: "/images/blog/llms-txt-schema-de.webp"
heroImageAlt: "Aufgeklappter Laptop mit Quellcode auf einem Schreibtisch; eingeblendeter Befund: 97 % der llms.txt-Dateien wurden im Mai 2026 kein einziges Mal abgerufen (Ahrefs)"
author: "Oliver Parrizas"
authorTitle: "Digital- & Sichtbarkeits-Analyst, CodaAI"
authorBio: "Seit 2001 im Online-Marketing, von den ersten Suchmaschinen-Rankings über SEO und AEO bis zur Sichtbarkeit in KI-Antworten. Führt bei CodaAI die Sichtbarkeits-Audits durch und hat die Studie KI-Blindtest Mittelstand 2026 ausgewertet."
authorImage: /images/speaker-oliver-parrizas.webp
category: "Lesbar für KI"
reihe: technik
tags: ["llms.txt", "Chunking", "Strukturierte Daten", "GEO", "Google AI Mode"]
featured: false
summary: "Google schreibt in seinem Leitfaden zu KI-Funktionen, dass Optimierung für generative KI-Suche weiterhin SEO ist: Eine llms.txt, Texte in kleinen Häppchen oder spezielles Schema-Markup braucht es dafür nicht. Unabhängige Studien bestätigen das: 97 % der llms.txt-Dateien wurden im Mai 2026 kein einziges Mal abgerufen (Ahrefs), und nachträglich ergänztes JSON-LD brachte keinen nennenswerten Zuwachs an KI-Zitaten. Für ChatGPT gilt der Satz nur eingeschränkt, denn dort schützt ein gutes Google-Ranking nicht vor Unsichtbarkeit."
faq:
  - q: "Was sagt Google über llms.txt, Chunking und Schema für KI-Antworten?"
    a: "Google schreibt in seinem Leitfaden zu generativen KI-Funktionen in der Suche (Stand 10.07.2026), dass Optimierung für AI Overviews und AI Mode weiterhin SEO ist. Neue maschinenlesbare Dateien wie eine llms.txt braucht es nicht, die Google-Suche ignoriert sie. Texte müssen nicht in kleine Stücke zerlegt werden, und es gibt kein spezielles Schema-Markup für KI-Funktionen. Strukturierte Daten empfiehlt Google weiter, aber für Rich Results in der klassischen Suche."
  - q: "Wird eine llms.txt von KI-Crawlern überhaupt abgerufen?"
    a: "Kaum. Ahrefs hat die Serverdaten von rund 137.000 Domains ausgewertet: Von rund 38.000 Domains mit gültiger llms.txt verzeichneten 97 % im Mai 2026 keinen einzigen Abruf der Datei. Die wenigen Abrufe stammten überwiegend von Bots, an der Spitze GPTBot und Claude-Code – also eher von Entwicklerwerkzeugen als von KI-Suchsystemen."
  - q: "Erhöht Schema-Markup die Zahl der KI-Zitate?"
    a: "Nach den vorliegenden Daten nicht. Ahrefs hat 1.885 Seiten beobachtet, die zwischen August 2025 und März 2026 JSON-LD ergänzt haben, und sie mit Vergleichsseiten ohne Änderung verglichen: In Google AI Mode und ChatGPT war der Zuwachs statistisch nicht von null zu unterscheiden, in den AI Overviews gab es sogar einen leichten Rückgang. Strukturierte Daten bleiben trotzdem sinnvoll, weil sie Unternehmen und Produkte eindeutig beschreiben."
  - q: "Gilt Googles Aussage „GEO ist SEO“ auch für ChatGPT?"
    a: "Nur eingeschränkt. Google spricht ausschließlich über die eigene Suche. ChatGPT antwortet oft aus dem Modellwissen und stützt sich bei einer Websuche stark auf den Bing-Index. In der Studie KI-Blindtest Mittelstand 2026 waren 34,9 % der 361 Unternehmen mit mehr als 100 Top-10-Rankings bei Google in ChatGPT komplett unsichtbar."
  - q: "Sollte man eine vorhandene llms.txt wieder löschen?"
    a: "Nein, solange sie gepflegt ist. Laut Google schadet die Datei der Sichtbarkeit in der Google-Suche nicht und nützt ihr nicht. Sie kostet wenig und kann Agenten und Entwicklerwerkzeugen den Weg zu den wichtigsten Seiten zeigen. Löschen oder aktualisieren sollte man eine Datei, die ein veraltetes Angebot beschreibt."
---

Wer seine Website für KI-Antworten aufstellen will, bekommt zurzeit drei Ratschläge besonders oft: eine llms.txt anlegen, Texte in kleine Abschnitte zerlegen und spezielles Schema-Markup ergänzen. **Google sagt dazu in seinem Leitfaden zu KI-Funktionen in der Suche, dass die Optimierung für generative KI-Suche „weiterhin SEO“ ist und keine der drei Maßnahmen dafür nötig ist. Die Daten geben Google recht: 97 % der llms.txt-Dateien wurden im Mai 2026 kein einziges Mal abgerufen ([Ahrefs, rund 137.000 Domains](https://ahrefs.com/blog/llmstxt-study/)).**

Das heißt nicht, dass Technik egal wäre. Es heißt, dass die Hebel dieselben sind wie bei Google seit Jahren: lesbare Seiten, ein Platz im Index, gute Rankings und Inhalte, die etwas sagen, was nicht überall steht. Für ChatGPT kommt eine Einschränkung dazu, die Google nicht erwähnt.

<div class="blog-stat-grid not-prose">
  <div class="blog-stat-card">
    <span class="stat-value">97 %</span>
    <span class="stat-label">der rund 38.000 Domains mit gültiger llms.txt: im Mai 2026 kein einziger Abruf der Datei</span>
    <span class="stat-source">Ahrefs, rund 137.000 Domains, Juni 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">10,13 %</span>
    <span class="stat-label">der rund 300.000 Domains haben eine llms.txt – ohne erkennbaren Zusammenhang mit KI-Zitaten</span>
    <span class="stat-source">SE Ranking via Search Engine Journal, November 2025</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">1.885</span>
    <span class="stat-label">Seiten mit nachträglich ergänztem JSON-LD – kein nennenswerter Zuwachs an KI-Zitaten</span>
    <span class="stat-source">Ahrefs, Mai 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">34,9 %</span>
    <span class="stat-label">der 361 Unternehmen mit mehr als 100 Top-10-Rankings bei Google sind in ChatGPT komplett unsichtbar</span>
    <span class="stat-source">CodaAI, KI-Blindtest Mittelstand 2026</span>
  </div>
</div>

```grafik
typ: anteil
titel: Fast keine llms.txt wird überhaupt abgerufen
wert: 97
anzeige: "97 %"
label: "der rund 38.000 Domains mit gültiger llms.txt verzeichneten im Mai 2026 keinen einzigen Abruf der Datei – weder von Menschen noch von Bots."
label_kurz: "Domains ohne Abruf"
rest_label: "Domains mit mindestens einem Abruf"
fehlstelle: true
quelle: "Ahrefs, „We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read“, Louise Linehan, 15.06.2026 – Serverdaten aus Ahrefs Web Analytics, Mai 2026"
alt: "97 Prozent der rund 38.000 Domains mit gültiger llms.txt verzeichneten im Mai 2026 keinen einzigen Abruf der Datei."
```

## Was sagt Google genau über GEO, llms.txt, Chunking und Schema?

Google beantwortet die drei Fragen in seinem [Leitfaden zu generativen KI-Funktionen in der Google-Suche](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) ungewöhnlich deutlich. Die Seite erschien im Mai 2026 ([Search Engine Journal, 15.05.2026](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/)) und wurde zuletzt am 10. Juli 2026 aktualisiert. Die Kernsätze, von uns übersetzt:

- **GEO und AEO:** Optimierung für generative KI-Suche sei Optimierung für das Sucherlebnis „und damit weiterhin SEO“.
- **llms.txt und Markdown:** Man müsse keine neuen maschinenlesbaren Dateien, KI-Textdateien, kein Markup und kein Markdown anlegen, um in der Google-Suche zu erscheinen. Die Google-Suche ignoriere solche Dateien – sie schadeten der Sichtbarkeit nicht und nützten ihr nicht.
- **Chunking:** Es gebe keine Anforderung, Inhalte in kleine Stücke zu zerlegen, damit die KI sie besser versteht. Eine ideale Seitenlänge gebe es nicht.
- **Schema:** Strukturierte Daten seien für die KI-Suche nicht erforderlich, und es gebe kein spezielles schema.org-Markup, das man ergänzen müsse.

Begründet wird das mit der Technik dahinter. AI Overviews und AI Mode holen sich ihre Inhalte über die zentralen Ranking-Systeme aus dem Google-Suchindex. Dafür zerlegt das Modell eine Frage in mehrere verwandte Suchanfragen, den [Query Fan-out](/wissen/geo-glossar/query-fan-out/). Damit eine Seite überhaupt infrage kommt, muss sie indexiert sein und mit einem Snippet angezeigt werden dürfen. Wer bei Google nicht rankt, wird von diesen Systemen also auch nicht gefunden – mit oder ohne Spezialdatei.

Bemerkenswert ist ein Satz, der gegen eine ganze Branche geht: Kein Drittanbieter-Tool habe Zugriff auf Googles interne Ranking- oder KI-Systeme. Wer verspricht, die Auswahl in AI Overviews mit einem Werkzeug „freizuschalten“, verkauft etwas, das es nicht gibt.

## Was bringt eine llms.txt für die KI-Sichtbarkeit?

Eine [llms.txt](/wissen/geo-glossar/llms-txt/) bringt für die Sichtbarkeit in KI-Antworten nach allen verfügbaren Daten nichts Messbares. Die Datei ist ein Vorschlag: eine Markdown-Übersicht im Stammverzeichnis, die Sprachmodellen die wichtigsten Seiten einer Website zeigt. Ein Standard, den KI-Anbieter verbindlich lesen, ist sie nicht.

Drei unabhängige Auswertungen kommen zum selben Ergebnis:

- **Abrufe:** Ahrefs hat die Serverdaten von rund 137.000 Domains ausgewertet. Von rund 38.000 Domains mit gültiger Datei verzeichneten 97 % im Mai 2026 keinen einzigen Abruf. 96 % der wenigen Abrufe kamen von Bots, an der Spitze GPTBot und das Entwicklerwerkzeug Claude-Code. Slackbot rief die Dateien häufiger ab als PerplexityBot ([Ahrefs, 15.06.2026](https://ahrefs.com/blog/llmstxt-study/)).
- **Zitate:** SE Ranking hat rund 300.000 Domains untersucht. 10,13 % hatten eine llms.txt. Weder einfache statistische Tests noch ein XGBoost-Modell zeigten einen Zusammenhang mit KI-Zitaten; ohne die Variable llms.txt wurde das Modell sogar genauer ([Search Engine Journal, 20.11.2025](https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/)).
- **Inhalt:** Common Crawl hat 584.107 llms.txt-Dateien aus dem Crawl vom Juli 2026 ausgewertet. 68,27 % waren schablonenhaft erzeugt, Wix allein stellte 41,34 % aller Dateien. Nur 49,90 % hatten die vollständige Form, die die Spezifikation verlangt ([Common Crawl, 31.08.2026](https://commoncrawl.org/blog/a-content-analysis-of-llms-txt-files-from-the-july-2026-crawl-archive)).

Die Zahlen erklären sich gegenseitig. Die meisten Dateien entstehen, weil ein Baukasten oder Plugin sie automatisch anlegt, nicht weil jemand sie pflegt. Ein Signal, auf das sich ein KI-System verlassen könnte, ist das nicht.

Im deutschsprachigen Raum ordnet SISTRIX die Datei genauso ein: „Aktuell nutzen die großen Anbieter die Datei nicht aktiv“, für klassische Unternehmenswebsites bestehe „kein akuter Handlungsbedarf“ ([Udo Raaf, Frag SISTRIX, aktualisiert 27.10.2026](https://www.sistrix.de/frag-sistrix/ai-grundlagen/llms-txt/)).

Wir haben selbst eine [llms.txt](/llms.txt). Sie war schnell angelegt, und wir erwarten davon keine einzige zusätzliche Nennung. Ihr Nutzen liegt woanders: Agenten und Entwicklerwerkzeuge, die eine Website gezielt erkunden, finden schneller zu den richtigen Seiten. Wer eine Datei hat, muss sie nicht löschen. Wer keine hat, verliert nichts.

## Muss man Texte für die KI in kleine Abschnitte zerlegen?

[Chunking](/wissen/geo-glossar/chunking/) – das Zerlegen von Seiten in Passagen – findet statt, aber im KI-System und nicht beim Schreiben. Google sagt ausdrücklich, dass niemand seine Inhalte für die KI in kleine Stücke schneiden muss, weil die Systeme mehrere Themen auf einer Seite auseinanderhalten und die passende Stelle selbst finden.

Wie viel Text dabei in eine Antwort gelangt, hat Dan Petrovic (dejan.ai) für Googles KI-Antworten gemessen. Er hat 7.060 Anfragen mit mindestens drei Quellen ausgewertet und die verwendeten Textausschnitte mit 2.275 vollständigen Seiten abgeglichen ([dejan.ai, 20.12.2025](https://dejan.ai/blog/how-big-are-googles-grounding-chunks/)). Das Ergebnis: Je Anfrage gibt es ein festes [Grounding-Budget](/wissen/geo-glossar/grounding-budget/) von rund 2.000 Wörtern, verteilt nach Relevanz. Die Quelle auf Rang 1 bekam im Median 531 Wörter (28 %), die auf Rang 5 nur 266 (13 %). Eine typische Seite steuert rund 377 Wörter bei.

```grafik
typ: kette
titel: Wie eine Seite in Googles KI-Antwort gelangt
schritte:
  - { t: "Crawling und Index", s: "Die Seite ist für den normalen Googlebot lesbar und indexiert – ohne Spezialdatei" }
  - { t: "Query Fan-out", s: "Das Modell zerlegt die Frage in mehrere verwandte Suchanfragen" }
  - { t: "Ranking", s: "Die zentralen Ranking-Systeme wählen die passenden Seiten aus dem Index" }
  - { t: "Grounding", s: "Aus den Seiten werden Passagen entnommen, rund 2.000 Wörter je Anfrage" }
  - { t: "Antwort", s: "Rang 1 liefert im Median etwa doppelt so viel Text wie Rang 5" }
schwelle:
  nach: 3
  text: "Hier entscheidet das Ranking – nicht llms.txt, Chunk-Länge oder Spezial-Schema"
quelle: "Eigene Darstellung nach Google Search Central, Leitfaden zu generativen KI-Funktionen (Stand 10.07.2026), und Dan Petrovic, dejan.ai (20.12.2025)"
alt: "Ablauf in fünf Schritten: Crawling und Index, Query Fan-out, Ranking, Grounding mit rund 2.000 Wörtern je Anfrage, Antwort. Nach dem Ranking-Schritt steht die Schwelle: Hier entscheidet das Ranking, nicht eine Spezialdatei."
```

Daraus folgt zweierlei. Erstens: Das Ranking entscheidet, wie viel von einer Seite in der Antwort landet. Wer auf Rang 1 steht, bekommt etwa doppelt so viel Raum wie Rang 5. Das ist klassische Suchmaschinenoptimierung.

Zweitens: Eine Passage muss für sich verständlich sein, weil sie ohne den Rest der Seite in der Antwort steht. Das spricht nicht für Häppchen, sondern für sauberes Schreiben – ein Gedanke je Absatz, die Aussage am Anfang, Fachbegriffe ausgeschrieben statt mit „dies“ und „hier“ auf frühere Absätze zu verweisen. Wer so schreibt, schreibt auch für Menschen besser. Wer einen Fachartikel in zwanzig Mini-Abschnitte ohne Zusammenhang zerhackt, verliert dagegen genau das, was Google ausdrücklich belohnen will: einen eigenen Standpunkt, der über das Allgemeinwissen hinausgeht.

## Hilft Schema-Markup, in KI-Antworten zitiert zu werden?

[Strukturierte Daten](/wissen/geo-glossar/strukturierte-daten/) helfen Suchmaschinen, Unternehmen, Produkte und Personen eindeutig zu erkennen – mehr KI-Zitate bringen sie nach den vorliegenden Daten nicht. Google empfiehlt sie weiterhin, aber für Rich Results in der klassischen Suche, nicht als Eintrittskarte für AI Overviews.

Die belastbarste Untersuchung stammt von Ahrefs. Beobachtet wurden 1.885 Seiten, die zwischen August 2025 und März 2026 JSON-LD ergänzt haben, verglichen mit 4.000 Kontrollseiten, jeweils 30 Tage vor und nach der Änderung. Das Ergebnis im Wortlaut: „Adding schema produced no major uplift in citations on any platform.“ In Google AI Mode (+2,4 %) und ChatGPT (+2,2 %) war der Zuwachs statistisch nicht von null zu unterscheiden, in den AI Overviews sank die Zahl der Zitate sogar leicht um 4,6 % ([Ahrefs, 11.05.2026](https://ahrefs.com/blog/schema-ai-citations/)).

Dieselbe Untersuchung zeigt, woher der Mythos kommt: Von KI-Systemen zitierte Seiten hatten fast dreimal so häufig JSON-LD wie nicht zitierte. Das ist eine Korrelation. Gut gepflegte Websites haben eben häufiger Schema und häufiger gute Inhalte. Das Markup selbst ist nicht die Ursache.

Search Atlas kommt mit einer anderen Methode zum selben Bild. Die Untersuchung teilt Domains nach ihrer Schema-Abdeckung in fünf Gruppen, von „kein Schema“ bis „vollständig“, und vergleicht deren Sichtbarkeit in OpenAI, Gemini und Perplexity. Domains mit vollständiger Abdeckung schnitten nicht besser ab als solche mit wenig oder keinem Schema ([Search Atlas, Manick Bhan, 14.12.2025, aktualisiert 19.06.2026](https://searchatlas.com/blog/limits-of-schema-markup-for-ai-search/)). Einen Korrelationswert weist die Studie nicht aus, sie vergleicht Verteilungen. Gemessen wurde nur, ob Schema vorhanden ist, nicht welcher Typ oder in welcher Qualität.

Olaf Kopp (Aufgesang) ordnet das so ein: Schema.org sei ein „Hygienefaktor“ für Suchmaschinen und ein nützlicher, indirekter Hebel – aber kein eigenständiger „LLM-Hebel“. Der Einfluss laufe über Indexierung, Knowledge Graph und Abrufebenen, „nicht durch ein direktes ‚Lesen‘ des Markups“ ([Aufgesang, 04.05.2026](https://www.aufgesang.de/blog/wie-wichtig-sind-schema-markups-fuer-die-generative-engine-optimization-geo/)).

Für die Praxis heißt das: Organization auf der Startseite, Person für Autoren, Product für Produkte, Article mit Datum für Fachbeiträge. Jede Angabe im Markup muss auch als sichtbarer Text auf der Seite stehen. Wer über diese Grundausstattung hinaus „KI-Schema“ kauft, kauft keine Zitate.

## Gilt „GEO ist SEO“ auch für ChatGPT?

Der Satz „GEO ist SEO“ gilt für Google und nur eingeschränkt für ChatGPT. Google spricht in seinem Leitfaden ausschließlich über die eigene Suche. Wie ChatGPT oder Perplexity ihre Quellen gewichten, klärt die Seite nicht – darauf weist auch das Search Engine Journal hin.

Unsere eigene Erhebung zeigt, wie groß der Unterschied ist. In der Studie [KI-Blindtest Mittelstand 2026](/studie/) mit 449 Unternehmen sind **34,9 % der 361 Unternehmen mit mehr als 100 Top-10-Rankings bei Google in ChatGPT komplett unsichtbar.** Die durchschnittliche Sichtbarkeit liegt in ChatGPT bei 24,9 % und in der Google KI-Übersicht bei 39,4 %. ChatGPT haben wir dabei ohne Websuche befragt – der Wert misst, was das Modell von sich aus weiß.

Der Grund liegt in der Mechanik. ChatGPT antwortet häufig aus dem Modellwissen, ohne zu suchen. Wenn es sucht, stützt es sich stark auf den Bing-Index ([mehr dazu im Artikel über ChatGPT und Bing](/blog/chatgpt-seo-perplexity-sichtbarkeit/)). Ein Spitzenplatz bei Google ist deshalb eine gute Voraussetzung, aber keine Garantie. Was in ChatGPT zusätzlich zählt, sind Nennungen auf Drittseiten und eine einheitliche Beschreibung des Unternehmens im ganzen Web – die Belege dafür stehen im Artikel [In ChatGPT als Anbieter empfohlen werden](/blog/in-chatgpt-als-anbieter-empfohlen-werden/).

Auch dafür braucht es keine Spezialdatei. Die Crawler von OpenAI, Anthropic und Perplexity führen kein JavaScript aus ([Vercel und MERJ, Dezember 2024](https://vercel.com/blog/the-rise-of-the-ai-crawler)). Was nur im Browser entsteht, sehen sie nicht. Lesbares HTML hilft allen Systemen, eine llms.txt nach heutigem Stand keinem.

## Was sollten Sie stattdessen tun?

Statt in Spezialdateien und Sonder-Markup sollten Sie die Zeit in die Grundlagen stecken, die bei Google und ChatGPT gleichermaßen wirken. Nach Wirkung sortiert:

1. **Lesbar sein.** Die wichtigsten Leistungsseiten müssen ohne JavaScript im HTML stehen, und die KI-Crawler dürfen in der robots.txt nicht ausgesperrt sein.
2. **Ranken.** AI Overviews und AI Mode greifen auf den Google-Index zu, ChatGPT bei einer Websuche stark auf Bing. Wer dort nicht weit oben steht, bekommt wenig oder gar keinen Platz in der Antwort.
3. **Etwas Eigenes sagen.** Google verlangt ausdrücklich Inhalte, die über das Allgemeinwissen hinausgehen. Eigene Zahlen, Erfahrungen aus Projekten und klare Einschätzungen sind das, was ein Modell nicht selbst erzeugen kann.
4. **Klar schreiben.** Ein Gedanke je Absatz, die Antwort zuerst, Begriffe ausgeschrieben – dann ist jede Passage auch allein verständlich.
5. **Grundausstattung an Schema.** Organization, Person, Product, Article, passend zum sichtbaren Text. Danach ist Schluss.
6. **llms.txt optional.** Anlegen, wenn sie gepflegt wird, sonst weglassen. Keine Agentur-Stunden dafür einplanen.

Die Reihenfolge entspricht dem, was der [Leitfaden GEO-Optimierung](/wissen/geo-optimierung/#nicht-wirksam) im Abschnitt über wirkungslose Maßnahmen zusammenfasst. Eine Platzierung in KI-Antworten kann dabei niemand zusagen – auch nicht mit der vollständigsten llms.txt der Welt.
