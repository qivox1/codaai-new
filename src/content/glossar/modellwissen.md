---
title: "Modellwissen"
shortDefinition: "Modellwissen ist alles, was ein Sprachmodell beim Training gesehen hat — nicht mehr, nicht weniger. Antworten aus dem Modellwissen entstehen ohne Websuche."
synonyms: ["Parametric Knowledge", "Trainingswissen", "Parametrisches Wissen"]
category: grundlagen
related: ["common-crawl", "knowledge-cutoff", "websuche", "grounding", "brand-mentions"]
pubDate: 2026-09-03
faq:
  - q: "Wie kommt meine Marke ins Modellwissen?"
    a: "Über die Trainingsdaten: Webseiten aus Common Crawl, Wikipedia, Foren wie Reddit, Fachmedien und lizenzierte Quellen. Was dort oft, konsistent und in Verbindung mit klaren Begriffen über eine Marke steht, wird Teil dessen, was das Modell über sie „weiß“."
  - q: "Kann ich prüfen, ob meine Domain im Modellwissen ist?"
    a: "Annähernd. Werkzeuge wie der AI Training Data Checker von centium.ai oder der Common-Crawl-Index-Checker zeigen, ob eine Domain im Common Crawl vorkommt. Ob und wie das Modell die Inhalte tatsächlich gelernt hat, zeigt erst die Abfrage im Modell selbst — ohne Websuche."
---

Modellwissen ist das Wissen, das ein [Sprachmodell](/wissen/geo-glossar/llm/) während des Trainings aus Texten gelernt hat und das in seinen Parametern gespeichert ist. Ein Modell weiß nur, was in seinen Trainingsdaten vorkam. Alles, was danach passiert ist, kennt es nicht — es sei denn, es holt sich das Wissen über eine [Websuche](/wissen/geo-glossar/websuche/) dazu.

## Wie entsteht Modellwissen?

Die Trainingsdaten stammen aus wenigen großen Quellen: [Common Crawl](/wissen/geo-glossar/common-crawl/) als größter Web-Snapshot, Wikipedia für strukturiertes Wissen, Bücher und Literatur für langen, kohärenten Text, wissenschaftliche Paper für Fachtiefe, Reddit und Foren für Gesprächston, GitHub für Code, News-Archive für Ereignisse bis zum [Knowledge Cut-off](/wissen/geo-glossar/knowledge-cutoff/) sowie lizenzierte Daten je nach Anbieter.

Aus diesen Texten lernt das Modell keine Fakten im Sinne einer Datenbank, sondern Wahrscheinlichkeiten: Welche Begriffe tauchen gemeinsam auf, welche Marke wird mit welcher Leistung verbunden, welche Antwort folgt typischerweise auf welche Frage. Was oft und konsistent beschrieben wird, wird stabil abrufbar. Was selten oder widersprüchlich vorkommt, bleibt vage.

## Warum ist Modellwissen für die KI-Sichtbarkeit wichtig?

Antworten aus dem Modellwissen entstehen ohne Websuche — und damit ohne Chance, im Moment der Frage noch etwas zu beeinflussen. Wenn das Modell sich sicher ist, antwortet es aus dem Gedächtnis, und dann zählt nur, was bis zum Training über eine Marke im Netz stand. Deshalb wirken Maßnahmen auf Drittseiten ([Brand Mentions](/wissen/geo-glossar/brand-mentions/), Fachmedien, Wikipedia) langfristig auf das Modellwissen, während die eigene Website vor allem über das Grounding wirkt.

## Was bedeutet das für Ihre Website?

Das Modellwissen ändert sich nur mit dem nächsten Training. Kurzfristig erreichen Sie die KI über die Websuche, langfristig über ein konsistentes Markenbild im ganzen Netz. Prüfen Sie beides getrennt: Fragen Sie das Modell mit abgeschalteter Websuche, was es über Ihr Unternehmen weiß, und vergleichen Sie das Ergebnis mit der Antwort inklusive Websuche. Die Differenz zeigt, welchen Weg Sie zuerst bearbeiten müssen.
