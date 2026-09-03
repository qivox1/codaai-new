---
title: "Citation (Zitierung)"
seoTitle: "Citation (Zitierung)"
shortDefinition: "Eine Citation ist der Verweis einer KI-Antwort auf eine konkrete Quelle (URL). Sie setzt voraus, dass die Seite gefunden, eine Passage extrahiert und für die Antwort verwendet wurde."
synonyms: ["Zitierung", "Quellenangabe", "AI Citation", "Source Link"]
category: pipeline
related: ["mention", "citation-rate", "grounding-snippets", "re-ranking", "zero-click"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Bringt eine Citation Traffic?"
    a: "Selten viel. Die meisten Nutzer lesen die Antwort und klicken keine Quelle an. Der Wert einer Citation liegt in der Rolle als Beleg: Wer zitiert wird, prägt die Antwort und wird als Autorität wahrgenommen — auch ohne Klick."
  - q: "Ist eine Citation weiter oben in der Quellenliste mehr wert?"
    a: "In der Regel ja, weil sie eher gesehen wird und meist die tragende Aussage der Antwort belegt. Zitiert ist aber noch nicht sichtbar: Eine Quelle an achter Stelle einer ausgeklappten Liste bringt kaum Präsenz. Deshalb zählt bei der Messung auch die Position."
---

Eine Citation ist die Angabe einer Quelle in einer KI-Antwort — als Link, Fußnote oder Quellenkarte auf eine konkrete URL. Sie ist das Ergebnis der gesamten Auswahlkette: Die Seite wurde im [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) gefunden, eine Passage hat das [Re-Ranking](/wissen/geo-glossar/re-ranking/) bestanden, das [Grounding Snippet](/wissen/geo-glossar/grounding-snippets/) wurde für die Antwort verwendet, und das Modell hat es als Beleg ausgewiesen.

## Wie entsteht eine Citation?

Das Modell synthetisiert die Antwort aus mehreren Snippets. Eine Quelle wird zitiert, wenn ihr Snippet eine Aussage trägt, die in der Antwort vorkommt — eine Zahl, eine Definition, eine Empfehlung. Snippets, die nur wiederholen, was andere Quellen ebenfalls sagen, gehen in die Antwort ein, ohne zitiert zu werden. Zitierfähig ist deshalb, was etwas Eigenes beiträgt ([Information Gain](/wissen/geo-glossar/information-gain/)).

## Warum sind Citations für die KI-Sichtbarkeit wichtig?

Citations sind der Nachweis, dass Ihre Inhalte die Antwort prägen. Sie entstehen fast nur über Grounding, also über die eigene Website — anders als [Mentions](/wissen/geo-glossar/mention/), die überwiegend über Drittseiten und Modellwissen entstehen. Aber: Zitiert ist nicht sichtbar. Eine Citation bringt selten nennenswerten Traffic ([Zero-Click](/wissen/geo-glossar/zero-click/)), und eine Quelle weit unten in einer ausgeklappten Liste hat kaum Präsenz. Der Wert liegt in der Rolle als Beleg und in der Autorität, die daraus über die Zeit entsteht.

## Was bedeutet das für Ihre Website?

Liefern Sie Passagen, die eine Aussage tragen, die sonst niemand liefert: eigene Daten, konkrete Erfahrungswerte, klare Definitionen mit Zahlen. Strukturieren Sie sie so, dass sie als Snippet funktionieren. Messen Sie die [Citation Rate](/wissen/geo-glossar/citation-rate/) über Ihr Promptset und werten Sie aus, welche Drittseiten in Ihrem Themenfeld häufig zitiert werden — dort müssen Sie ebenfalls präsent sein ([Quellenanalyse](/wissen/geo-glossar/quellenanalyse/)).
