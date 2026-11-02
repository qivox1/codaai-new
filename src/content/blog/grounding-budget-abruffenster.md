---
title: "Was KI-Systeme wirklich von Ihrer Seite lesen: Grounding-Budget und Abruffenster"
seoTitle: "Grounding-Budget: Was KI wirklich liest"
description: "ChatGPT öffnet je Seite rund 5.700 Zeichen, Googles KI-Antwort verteilt rund 1.900 Wörter auf alle Quellen. Was das für Ihre wichtigsten Seiten bedeutet."
pubDate: 2026-11-02
lang: de
author: "Oliver Parrizas"
authorTitle: "Digital- & Sichtbarkeits-Analyst, CodaAI"
authorBio: "Seit 2001 im Online-Marketing, von den ersten Suchmaschinen-Rankings über SEO und AEO bis zur Sichtbarkeit in KI-Antworten. Führt bei CodaAI die Sichtbarkeits-Audits durch und hat die Studie KI-Blindtest Mittelstand 2026 ausgewertet."
authorImage: /images/speaker-oliver-parrizas.webp
heroImage: /images/blog/grounding-budget-abruffenster-de.webp
heroImageAlt: "Notebook mit HTML-Quelltext, eine Passage ist gelb hervorgehoben, daneben die gerenderte Seite"
category: "Lesbar für KI"
reihe: technik
tags: ["Grounding-Budget", "Abruffenster", "Retrieval", "GEO", "Deep Research"]
featured: false
summary: "Ein KI-System liest nie eine ganze Seite. ChatGPT öffnet im Deep-Research-Modus je Seite ein Fenster von rund 5.700 Zeichen, und bei Seiten mit 60 oder mehr Links sind davon nur rund 33 Prozent echter Inhalt. Googles KI-Antwort verteilt je Anfrage rund 1.900 Wörter auf alle Quellen zusammen, die erste Quelle erhält davon rund 531 Wörter, die fünfte rund 266. Entscheidend ist deshalb, ob die Antwort auf die Frage im abgerufenen Fenster steht und nicht irgendwo weiter unten auf der Seite."
faq:
  - q: "Wie viel Text einer Seite ruft ein KI-System bei einem Abruf tatsächlich ab?"
    a: "Nur ein begrenztes Fenster. Peec AI hat die Protokolle von ChatGPTs Deep-Research-Modus über mehr als zehn Konten und rund 200 Durchläufe ausgewertet (Juni 2026). Der erste Abruf einer Seite öffnet dort im Median rund 5.700 Zeichen, maximal rund 8.000. Ein erneuter Abruf derselben Seite liegt bei rund 6.200 Zeichen. Gelesen wird linearisiertes HTML in Quellreihenfolge, ohne Inhalte, die erst JavaScript erzeugt."
  - q: "Was ist ein Abruffenster und wie groß ist es?"
    a: "Das Abruffenster ist der Textausschnitt, den ein KI-System bei einem einzelnen Seitenabruf überhaupt zu Gesicht bekommt. In der Logauswertung von Peec AI liegt es bei rund 5.000 bis 6.000 Zeichen je Abruf. Davor entscheidet ein noch kleineres Fenster: Ein Bing-Snippet je Treffer umfasst im Median rund 250 Zeichen und höchstens rund 285. Diese 285 Zeichen sind alles, womit eine Seite den Abruf verdienen kann."
  - q: "Verbrauchen Navigation und Menüs einen Teil des Abruffensters?"
    a: "Ja, und zwar einen erheblichen. Peec AI hat den Anteil echten Inhalts am ersten Abruf an der Zahl der Linkmarkierungen im gelesenen Fenster gemessen. Bei Seiten mit weniger als 20 Links sind rund 78 Prozent des Abrufs Inhalt, zwischen 20 und 59 Links rund 55 Prozent, ab 60 Links rund 33 Prozent. Ein typischer erster Abruf enthielt rund 50 Linkmarkierungen."
  - q: "Bekommen längere Seiten mehr Platz in einer KI-Antwort?"
    a: "Anteilig weniger. Dan Petrovic (dejan.ai) hat 7.060 Anfragen, 2.275 Seiten und 883.262 Textausschnitte ausgewertet: Eine Seite unter 1.000 Wörtern erreicht eine Abdeckung von rund 61 Prozent, ab 3.000 Wörtern sind es rund 13 Prozent. Die Auswahl erreicht ein Plateau bei rund 540 Wörtern, also etwa 3.500 Zeichen. Länge schadet nicht, sie wird nur nicht mit mehr Grounding-Budget belohnt."
  - q: "Was entscheidet, welche Passage meiner Seite in der KI-Antwort landet?"
    a: "Ob die Passage die Frage für sich beantwortet. In einer Auswertung von 193.507 KI-Antworten durch TJ Robertson (TJ Digital) begannen 23 Prozent der zitierten Seiten in den ersten Zeilen mit einer Antwort auf die Frage, bei abgerufenen, aber nicht zitierten Seiten waren es 14 Prozent. In einer Blindbewertung fehlte bei rund der Hälfte der übergangenen Seiten eine Antwort in dem gelesenen Teil, bei den zitierten Seiten in 23 Prozent der Fälle."
---

Wer wissen will, warum eine gute Seite in KI-Antworten nicht vorkommt, muss zuerst wissen, wie wenig von ihr überhaupt gelesen wird. **Ein KI-System liest nie eine ganze Seite. ChatGPT öffnet im Deep-Research-Modus je Seite ein Fenster von rund 5.700 Zeichen im Median ([Peec AI, Logauswertung über mehr als zehn Konten, Juni 2026](https://peec.ai/blog/how-chatgpt-deep-research-reads-your-site-what-the-logs-reveal)), und Googles KI-Antwort verteilt je Anfrage insgesamt rund 1.900 Wörter auf alle Quellen zusammen ([dejan.ai, 7.060 Anfragen](https://dejan.ai/posts/grounding-snippets)).** Was in diesem Fenster steht, kann zitiert werden. Alles andere auf der Seite existiert für diese eine Antwort nicht.

Damit verschiebt sich die Frage. Es geht nicht länger darum, ob Ihre Seite die Antwort enthält. Es geht darum, ob sie an der Stelle steht, die gelesen wird.

<div class="blog-stat-grid not-prose">
  <div class="blog-stat-card">
    <span class="stat-value">5.700</span>
    <span class="stat-label">Zeichen im Median öffnet ChatGPT beim ersten Abruf einer Seite, maximal rund 8.000</span>
    <span class="stat-source">Peec AI, Deep-Research-Logs, Juni 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">33 %</span>
    <span class="stat-label">des ersten Abrufs sind echter Inhalt, wenn die Seite 60 oder mehr Links enthält</span>
    <span class="stat-source">Peec AI, Deep-Research-Logs, Juni 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">1.929</span>
    <span class="stat-label">Wörter Grounding-Budget im Median je Anfrage, auf alle Quellen zusammen verteilt</span>
    <span class="stat-source">dejan.ai, 7.060 Anfragen, Juni 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">23 %</span>
    <span class="stat-label">der zitierten Seiten beginnen in den ersten Zeilen mit einer Antwort – bei nicht zitierten 14 %</span>
    <span class="stat-source">TJ Digital via Search Engine Journal, 193.507 KI-Antworten, Oktober 2026</span>
  </div>
</div>

## Wie viel Text einer Seite ruft ein KI-System tatsächlich ab?

Ein KI-System ruft bei einem Seitenaufruf ein begrenztes Fenster ab und arbeitet nicht mit dem vollständigen Seitentext. Peec AI hat dafür die Protokolle von ChatGPTs Deep-Research-Modus ausgewertet, über mehr als zehn Konten und rund 200 Durchläufe im Juni 2026. Der Agent kennt dort drei Befehle: suchen, eine Seite öffnen, in der geöffneten Seite nach einem Stichwort suchen. Ein vierter Befehl zum Anklicken von Links wurde in keiner einzigen protokollierten Sitzung verwendet.

Die Größen dieser Schritte sind messbar:

- Ein Bing-Snippet je Treffer umfasst im Median rund 250 Zeichen, höchstens rund 285.
- Die Trefferliste einer Suche bringt im Median rund 740 Zeichen.
- Der erste Abruf einer Seite öffnet rund 5.700 Zeichen im Median, maximal rund 8.000.
- Ein erneuter Abruf derselben Seite liegt bei rund 6.200 Zeichen.
- Eine Stichwortsuche innerhalb der Seite liefert bei einem Treffer rund 435 Zeichen, bei einem Fehlschlag rund 49.

Daraus folgt dreierlei. Erstens ist das Snippet das ganze Fenster, in dem Ihre Seite den Abruf verdienen muss. Die Entscheidung über den Abruf fällt an 285 Zeichen, nicht am Seiteninhalt. Zweitens liest der Agent linearisiertes HTML in Quellreihenfolge, ohne den Kopfbereich des Dokuments und ohne alles, was erst im Browser durch JavaScript entsteht. Drittens folgt er keinen Links. Eine Unterseite, die nur über einen Klick im Menü erreichbar ist, kommt in dieser Sitzung nicht vor. Dass [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) keine Skripte ausführen, ist bekannt. Neu ist, dass sie auch innerhalb einer abgerufenen Seite nicht weiterklicken.

Findet der Agent sein Stichwort, öffnet er die Seite erneut an der passenden Zeile. In der Auswertung enthielt dieses zweite Fenster die gesuchte Zeile in 95 Prozent der Fälle. Findet er es nicht, versucht er in rund 60 Prozent der Fälle ein anderes Stichwort. In etwa einem Viertel der Fälle verlässt er die Seite.

## Wofür geht das Abruffenster verloren, bevor der Inhalt beginnt?

Das Abruffenster füllt sich zuerst mit allem, was im Quelltext vor dem Inhalt steht: Navigation, Sprachumschalter, Hinweisbanner, aufgeklapptes Hauptmenü, Brotkrumenpfad. Peec AI hat gezählt, wie viel vom ersten Abruf tatsächlich Inhalt ist, gemessen an der Zahl der Linkmarkierungen im gelesenen Fenster. Je mehr Links, desto weniger Text bleibt übrig.

```grafik
typ: kennzahl_vergleich
titel: Wie viel vom ersten Abruf echter Inhalt ist
werte:
  - { label: "Seite mit weniger als 20 Links", wert: 78, anzeige: "78 %" }
  - { label: "Seite mit 20 bis 59 Links", wert: 55, anzeige: "55 %" }
  - { label: "Seite mit 60 und mehr Links", wert: 33, anzeige: "33 %", markiert: true }
max: 100
quelle: "Peec AI, „How ChatGPT Deep Research reads your site: What the logs reveal“, David Konitzny, 22.06.2026 – Protokolle aus mehr als zehn Konten und rund 200 Durchläufen, Juni 2026"
alt: "Bei Seiten mit weniger als 20 Links sind rund 78 Prozent des ersten Abrufs echter Inhalt, bei 20 bis 59 Links rund 55 Prozent und ab 60 Links nur noch rund 33 Prozent."
```

Ein typischer erster Abruf enthielt rund 50 Linkmarkierungen und lag damit in der mittleren Gruppe. Für eine gewachsene Unternehmenswebsite mit vollem Hauptmenü, Footer-Sitemap und Kontaktspalte heißt das: Etwa die Hälfte des Fensters geht für Struktur drauf, bevor der erste Satz Ihres Fachtexts gelesen wird.

Das ist kein Argument gegen Navigation. Menschen brauchen sie, und Google rendert die Seite ohnehin vollständig. Es ist ein Argument dafür, die Antwort auf die Frage weit oben in den Quelltext zu stellen. Wo im Quelltext der Hauptinhalt beginnt, ist eine Entscheidung des Templates und keine Frage des Textes.

## Was ist das Grounding-Budget einer KI-Antwort?

Das [Grounding-Budget](/wissen/geo-glossar/grounding-budget/) ist die Textmenge, die ein KI-System je Anfrage insgesamt aus allen Quellen übernimmt. Dan Petrovic (dejan.ai) hat es für Googles KI-Antworten gemessen, über 7.060 Anfragen, 2.275 vollständige Seiten und 883.262 einzelne Textausschnitte. Je Anfrage liegt das Budget bei rund 2.000 Wörtern, im Median bei 1.929, im 95. Perzentil bei 2.798. Die einzelnen [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/) sind kurz, im Mittel rund 15,5 Wörter.

Verteilt wird dieses Budget nach Relevanz. Die Quelle auf dem ersten Platz erhält rund 531 Wörter und damit 28 Prozent des Budgets. Die fünfte Quelle erhält rund 266 Wörter und damit 13 Prozent. Je Teilfrage ruft das System typischerweise fünf bis zwanzig Quellen ab, Gemini arbeitet mit rund zehn Ergebnissen je Anfrage.

Das Abruffenster und das Grounding-Budget sind zwei verschiedene Grenzen. Das Fenster begrenzt, was ein System von Ihrer Seite überhaupt sieht. Das Budget begrenzt, wie viel davon in der fertigen Antwort landet. Eine Seite kann das Fenster passieren und am Budget scheitern, weil vier andere Quellen vor ihr stehen.

```grafik
typ: kette
titel: Die Abrufstrecke von der Suchanfrage bis zur zitierten Passage
schritte:
  - { t: "Suche", s: "Das System stellt eine Teilfrage an den Suchindex und erhält eine Trefferliste, im Median rund 740 Zeichen" }
  - { t: "Snippet", s: "Je Treffer entscheiden rund 250 Zeichen darüber, ob die Seite überhaupt geöffnet wird" }
  - { t: "Erster Abruf", s: "Geöffnet wird ein Fenster von rund 5.700 Zeichen, linearisiertes HTML ohne JavaScript, ohne Klick auf Links" }
  - { t: "Stichwortsuche", s: "Bei einem Treffer öffnet der Agent die Seite erneut an der passenden Zeile, in 95 % der Fälle mit der gesuchten Zeile im Fenster" }
  - { t: "Antwort", s: "Rund 1.929 Wörter Budget je Anfrage, verteilt auf alle Quellen: Platz 1 erhält rund 531 Wörter, Platz 5 rund 266" }
schwelle:
  nach: 2
  text: "Hier fällt die Entscheidung: 250 Zeichen Snippet sind das ganze Fenster, um den Abruf zu verdienen"
quelle: "Eigene Darstellung nach Peec AI, Deep-Research-Logs (22.06.2026), und Dan Petrovic, dejan.ai, „Grounding Snippets“ (21.06.2026)"
alt: "Ablauf in fünf Schritten: Suche mit Trefferliste, Snippet von rund 250 Zeichen, erster Abruf mit rund 5.700 Zeichen, Stichwortsuche mit erneutem Abruf, Antwort mit rund 1.929 Wörtern Budget. Nach dem Snippet steht die Schwelle, an der über den Abruf entschieden wird."
```

## Warum bekommen lange Seiten weniger von ihrem Inhalt in die Antwort?

Lange Seiten bekommen anteilig weniger, weil das Budget je Quelle gedeckelt ist und nicht mit der Seitenlänge mitwächst. In der Auswertung von dejan.ai erreicht eine Seite unter 1.000 Wörtern eine Abdeckung von rund 61 Prozent ihres Textes. Ab 3.000 Wörtern sind es rund 13 Prozent. Die Auswahl erreicht ein Plateau bei rund 540 Wörtern, also etwa 3.500 Zeichen. Über alle untersuchten Quellen hinweg liegt die Abdeckung einer einzelnen Seite zwischen 21 und 65 Prozent.

Daraus folgt keine Empfehlung, Texte zu kürzen. Ein Leitfaden mit 4.000 Wörtern kann in absoluten Zahlen mehr Text in KI-Antworten liefern als eine Seite mit 600 Wörtern, weil er zu mehr verschiedenen Teilfragen passt. Es folgt eine andere Frage: Welche 540 Wörter einer langen Seite wählt das System aus?

Wer auf einer Ratgeberseite sieben Themen mischt, überlässt diese Auswahl dem [Re-Ranking](/wissen/geo-glossar/re-ranking/). Wer je Thema eine eigene Seite führt, trifft die Auswahl selbst. Das ist derselbe Grund, aus dem wir unser Glossar als eine Seite je Begriff angelegt haben statt als eine Seite mit allen Begriffen.

## Was entscheidet, welche Passage in der Antwort landet?

Entschieden wird über eine Passage danach, ob sie die Frage für sich beantwortet. Eine Untersuchung von TJ Robertson (TJ Digital), über die das Search Engine Journal berichtet, hat 193.507 KI-Antworten aus ChatGPT, Google AI Mode und den AI Overviews zu 4.167 Fragen ausgewertet, erhoben in acht Wochenschnitten zwischen dem 27. August und dem 21. Oktober 2026. Verglichen wurden die Inhalte von 21.874 zitierten Seiten mit 4.507 Vergleichsseiten zu 434 Fragen ([Search Engine Journal, 28.10.2026](https://www.searchenginejournal.com/ai-cited-pages-more-often-got-straight-to-the-answer/594781/)).

Der Befund betrifft die ersten Zeilen. **23 Prozent der zitierten Seiten begannen in den ersten Zeilen mit einer Antwort auf die gestellte Frage. Bei Seiten, die dieselben Systeme abgerufen, aber nicht zitiert haben, waren es 14 Prozent.** In einer zweiten Gegenüberstellung lagen zitierte Seiten bei 20 Prozent und Google-Top-10-Seiten, die das System gar nicht erst geöffnet hat, bei 5 Prozent.

Eine Blindbewertung von 195 Seitenpaaren ergänzt das Bild. Bei rund der Hälfte der übergangenen Seiten fehlte in dem Teil, den die Bewerter gelesen haben, eine Antwort auf die Frage. Bei den zitierten Seiten fehlte sie in 23 Prozent der Fälle. Die Vollständigkeit der Antwort wurde bei zitierten Seiten mit 2,3 von 5 bewertet, bei übergangenen mit 1,7.

Das sind Zusammenhänge und keine Nachweise einer Ursache. Dieselbe Auswertung nennt weitere Merkmale, die mit höheren Chancen einhergehen: Tabellen mit 69 Prozent, Erfahrungen aus erster Hand mit 45 Prozent, ein Datum innerhalb der letzten zwölf Monate mit mehr als der doppelten Chance. Bemerkenswert ist, dass eine Autorenzeile mit 28 Prozent niedrigeren und ein Handlungsaufruf mit 12 Prozent niedrigeren Chancen einhergingen. Beides spricht dafür, dass die Systeme auf den Text vor der Antwort reagieren und nicht auf Vertrauenssignale.

In der Praxis heißt das: [Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/) ist keine Stilfrage. Ein Absatz, der mit Einordnung, Branchenlage und Firmengeschichte beginnt, verbraucht das Fenster, bevor die Antwort kommt.

## Wie prüfen Sie das Abruffenster Ihrer eigenen Seiten?

Das Abruffenster einer eigenen Seite lässt sich in wenigen Minuten nachstellen. Vier Schritte reichen:

1. **Quelltext ansehen, nicht die gerenderte Seite.** Rufen Sie den Seitenquelltext auf, wie er vom Server kommt. Was dort nicht steht, sieht ein KI-System nicht, auch wenn es im Browser erscheint.
2. **Die ersten rund 5.700 Zeichen abgrenzen.** Zählen Sie ab dem Beginn des Dokuments. Was danach kommt, gehört beim ersten Abruf nicht dazu.
3. **Prüfen, ob die Antwort darin steht.** Nehmen Sie eine echte Einkäuferfrage und suchen Sie die Antwort in diesem Ausschnitt. Steht sie nicht darin, ist die Seite für diese Frage nicht abrufbereit.
4. **Die Links vor dem Inhalt zählen.** Liegen vor dem ersten inhaltlichen Absatz mehr als 60 Links, kostet die Navigation zwei Drittel des Fensters.

Wiederholen Sie das für die fünf Seiten, die Ihr Geschäft tragen. Erfahrungsgemäß fällt das Ergebnis bei Leistungsseiten schlechter aus als bei Blogartikeln, weil Leistungsseiten mit Bildstrecken, Referenzlogos und Teaserkacheln beginnen und der erklärende Text weit unten im Quelltext steht.

Welche Größenordnung an Unsichtbarkeit dabei zusammenkommt, zeigt unsere eigene Erhebung. In der Studie [KI-Blindtest Mittelstand 2026](/studie/) mit 449 Unternehmen blieben **54,7 % der 3.592 Einkäuferfragen ohne Nennung** des untersuchten Unternehmens, und bei 46,8 % der Unternehmen empfahlen die Systeme stattdessen namentlich Wettbewerber. Das hat mehrere Ursachen, und eine davon ist technisch: Die Antwort stand nicht an der Stelle, die gelesen wird.

## Was folgt daraus für Ihre wichtigsten Seiten?

Aus Abruffenster und Grounding-Budget folgen fünf Entscheidungen, die alle im Template oder in der Seitenstruktur liegen:

1. **Den Hauptinhalt früh in den Quelltext stellen.** Die Reihenfolge im HTML entscheidet, was im Fenster landet. Optisch darf die Navigation bleiben, wo sie ist.
2. **Die Antwort in die ersten Zeilen setzen.** Ein deklarativer Satz, der die Frage beantwortet und den Begriff wiederholt, steht vor jeder Einordnung.
3. **Je Thema eine Seite führen.** Damit entscheiden Sie, welche 540 Wörter ausgewählt werden, statt es dem Re-Ranking zu überlassen.
4. **Linkzahl vor dem Inhalt begrenzen.** Mega-Menüs mit 80 Einträgen kosten im Abruf mehr, als sie Nutzern bringen.
5. **Ohne JavaScript ausliefern, was gelesen werden soll.** Was erst im Browser entsteht, ist im Fenster nicht vorhanden.

Keiner dieser Punkte verlangt neue Inhalte. Alle fünf verlangen eine Entscheidung darüber, in welcher Reihenfolge vorhandene Inhalte ausgeliefert werden. Das ist der Teil der KI-Sichtbarkeit, der sich ohne Redaktionsbudget verbessern lässt.
