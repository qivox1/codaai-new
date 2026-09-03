---
title: "Citation Rate"
shortDefinition: "Die Citation Rate ist der Anteil der KI-Antworten in einem Promptset, in denen eine eigene Seite als Quelle zitiert wird. Sie misst, ob Inhalte gefunden, extrahiert und für die Antwort verwendet werden."
synonyms: ["Zitierrate", "AI Citation Rate", "Quellenquote"]
category: messung
related: ["citation", "mention-rate", "promptset", "quellenanalyse", "grounding", "ai-overview-citation-rate"]
pubDate: 2026-09-03
faq:
  - q: "Warum ist meine Citation Rate niedrig, obwohl die Mention Rate hoch ist?"
    a: "Weil Mentions und Citations verschiedene Wege gehen. Die Marke wird aus dem Modellwissen oder über Drittseiten genannt, aber die eigene Website wird im Grounding nicht verwendet — sie rankt nicht für die Fan-out-Queries, ihre Passagen bestehen das Re-Ranking nicht oder sie liefert nichts, was andere Quellen nicht auch sagen."
  - q: "Wie prüfe ich die Grounding-Wahrscheinlichkeit vor der Citation Rate?"
    a: "Stellen Sie fest, welche Prompts überhaupt eine Websuche auslösen und Quellen angeben — nur dort ist eine Citation möglich. Prüfen Sie dann technisch, ob Ihre Seiten abrufbar sind (kein JavaScript-Rendering, TTFB, kein Block in der robots.txt) und ob sie für die Fan-out-Queries ranken."
---

Die Citation Rate ist der Anteil der Antworten, in denen eine Seite der eigenen Domain als Quelle angegeben wird, bezogen auf alle Antworten zu einem festen [Promptset](/wissen/geo-glossar/promptset/). Sie ist das Gegenstück zur [Mention Rate](/wissen/geo-glossar/mention-rate/): Die eine misst die Marke im Text, die andere die Website in den Quellen. Beide können unabhängig voneinander hoch oder niedrig sein.

## Wie funktioniert die Messung der Citation Rate?

Vier Schritte. Erstens die Grounding-Wahrscheinlichkeit prüfen: Bei welchen Prompts geben KI-Systeme überhaupt Quellen an? Nur dort kann eine [Citation](/wissen/geo-glossar/citation/) entstehen. Zweitens die Citation Rate erheben — mehrfach je Prompt und System. Drittens eine technische Prüfung für erfolgreiches Retrieval: Kann das System alle relevanten Seiten abrufen? Viertens die [Quellenanalyse](/wissen/geo-glossar/quellenanalyse/): Welche Drittseiten werden bei denselben Prompts zitiert, und muss die Marke dort präsent sein?

Für Google AI Overviews lässt sich die Zitierung zusätzlich über den „Generative KI"-Report der Search Console beobachten ([AI Overview Citation Rate](/wissen/geo-glossar/ai-overview-citation-rate/)).

## Warum ist die Citation Rate für die KI-Sichtbarkeit wichtig?

Weil sie zeigt, ob die eigene Website in KI-Antworten eine Rolle spielt — die dritte Stufe der Sichtbarkeit: die Quelle sein. Eine hohe Mention Rate bei niedriger Citation Rate bedeutet, dass die Marke bekannt ist, ihre Inhalte aber nicht die Antwort prägen; andere Quellen sagen dann, was über die Marke gesagt wird. Zugleich gilt: Zitiert ist nicht sichtbar. Eine Citation an achter Stelle einer ausgeklappten Liste bringt kaum Präsenz und selten Traffic; deshalb gehört die Position der Citation mit in die Auswertung.

## Was bedeutet das für Ihre Website?

Bringt mir die Citation wirklich etwas? Diese Frage gehört an den Anfang. Messen Sie die Citation Rate nur für Prompts, bei denen Quellen angegeben werden, und werten Sie aus, welche Ihrer Seiten zitiert werden und an welcher Position. Arbeiten Sie an den Passagen der Seiten, die für die Fan-out-Queries ranken, aber nicht zitiert werden — dort fehlt meist [Information Gain](/wissen/geo-glossar/information-gain/) oder Struktur, nicht das Ranking.
