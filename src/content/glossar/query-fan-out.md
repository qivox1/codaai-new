---
title: "Query Fan-out"
shortDefinition: "Query Fan-out ist das Zerlegen einer Nutzerfrage in mehrere verwandte Suchanfragen, die ein KI-System parallel an den Suchindex schickt, um Quellen für die Antwort zu sammeln."
synonyms: ["Fan-out-Queries", "Query Expansion", "Fan-out"]
category: grounding
related: ["query-coverage", "initial-retrieval", "grounding", "promptset", "topical-authority"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Wie finde ich die Fan-out-Queries zu meinen Themen?"
    a: "Aus vier Quellen: den Folgefragen, die KI-Systeme selbst anzeigen oder in Antworten aufgreifen, den „Ähnliche Fragen“-Boxen bei Google, Support-Tickets und Sales-Gesprächen. Was Kunden wirklich fragen, ist die beste Näherung an das, was die KI intern nachfragt."
  - q: "Muss ich für jede Fan-out-Query eine eigene Seite bauen?"
    a: "Nein. Ein Topic-Cluster aus einer Hauptseite und gut strukturierten Abschnitten oder Unterseiten reicht, solange jede verwandte Frage irgendwo direkt beantwortet wird. Entscheidend ist, dass Ihre Domain für die Haupt-Query und die Fan-out-Queries auftaucht — nicht, dass es eine URL je Frage gibt."
---

Query Fan-out bezeichnet den Vorgang, bei dem ein KI-System einen Prompt nicht mit einer einzigen Suche beantwortet, sondern ihn in mehrere Teil-Suchanfragen zerlegt. Aus „Welche Zahnzusatzversicherung lohnt sich für Kinder?" werden zum Beispiel „Zahnzusatzversicherung Kinder Kosten", „Zahnzusatzversicherung Kinder Leistungen Vergleich" und „Zahnzusatzversicherung Kinder Wartezeit". Für jede dieser Fan-out-Queries sammelt das System eigene Kandidatenseiten.

## Wie funktioniert Query Fan-out?

Das Sprachmodell analysiert die Nutzerfrage, erkennt die enthaltenen Teilaspekte und formuliert dafür Suchanfragen — oft drei bis zehn, je nach Komplexität. Diese werden parallel an den Suchindex geschickt. Die Ergebnisse aller Fan-out-Queries bilden gemeinsam den Kandidaten-Pool für das [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/). Eine Seite, die für die Haupt-Query nicht rankt, kann also trotzdem in den Pool kommen, wenn sie für eine der Teilfragen weit oben steht — und umgekehrt.

## Warum ist Query Fan-out für die KI-Sichtbarkeit wichtig?

Query Fan-out verschiebt das Ziel von „für ein Keyword ranken" zu „für ein Themenfeld ranken". Wer nur die Haupt-Query bedient, deckt einen Bruchteil der Suchen ab, die ein KI-System tatsächlich ausführt. Wer das Themenfeld abdeckt ([Query Coverage](/wissen/geo-glossar/query-coverage/)), taucht in mehreren Teilergebnissen auf und erhöht damit seine Chance, im Re-Ranking und im Grounding berücksichtigt zu werden. Das ist die technische Begründung für Topic-Cluster statt einzelner keyword-optimierter Seiten ([Topical Authority](/wissen/geo-glossar/topical-authority/)).

## Was bedeutet das für Ihre Website?

Denken Sie in Fragen, nicht in Keywords. Sammeln Sie zu jedem Kernthema die Fragen, die Kunden vor, während und nach einer Entscheidung stellen, und beantworten Sie sie direkt — als Überschriften im Frageformat mit einer klaren Antwort darunter. Prüfen Sie dann, für welche dieser Fragen Ihre Domain in Google und Bing sichtbar ist. Die Lücken sind Ihre Themenliste.
