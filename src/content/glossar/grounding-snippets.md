---
title: "Grounding Snippets"
shortDefinition: "Grounding Snippets sind die Textpassagen, die ein KI-System aus Quellseiten extrahiert und als Auszüge in den Kontext des Modells legt, um daraus die Antwort zu erzeugen."
synonyms: ["Grounding Chunks", "Snippets", "Quellauszüge"]
category: pipeline
related: ["re-ranking", "grounded-response-generation", "citation", "semantisches-chunking", "bottom-line-up-front"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Wie lang ist ein Grounding Snippet?"
    a: "Meist ein bis wenige Absätze — der Abschnitt, der die konkrete Frage beantwortet, nicht die ganze Seite. Analysen von dejan.ai zur Extraktionsmethode und Größe von Googles Grounding Chunks zeigen, dass die Auszüge eng um die relevante Aussage geschnitten werden."
  - q: "Kann ich sehen, welches Grounding Snippet aus meiner Seite verwendet wurde?"
    a: "Teilweise. Manche Systeme zeigen beim Klick auf eine Quelle den zitierten Abschnitt. Werkzeuge wie das Grounding-Snippet-Extraction-Tool von dejan.ai simulieren die Extraktion für eine URL und zeigen, welche Passagen als Kandidaten gelten."
---

Grounding Snippets sind die Textauszüge, die ein KI-System nach dem [Re-Ranking](/wissen/geo-glossar/re-ranking/) aus den Quellseiten herausschneidet. Sie sind query-spezifisch: Nicht die Seite wird übernommen, sondern der Abschnitt, der die konkrete Frage beantwortet. Diese Auszüge bilden zusammen mit der Nutzerfrage den Model Context, aus dem die Antwort entsteht ([Grounded Response Generation](/wissen/geo-glossar/grounded-response-generation/)).

## Wie funktionieren Grounding Snippets?

Nach dem Re-Ranking stehen die Passagen fest, die über der Relevanzschwelle liegen. Das System extrahiert sie eng um die relevante Aussage herum, oft ein bis wenige Absätze, und übergibt sie mit einem Verweis auf die Quelle an das Sprachmodell. Aus mehreren Snippets verschiedener Quellen synthetisiert das Modell dann eine Antwort. Snippets, die eine konkrete Aussage tragen, werden dabei als [Citation](/wissen/geo-glossar/citation/) ausgewiesen; Snippets, die nur bestätigen, fließen ohne Nennung ein.

## Warum sind Grounding Snippets für die KI-Sichtbarkeit wichtig?

Sie sind die Einheit, mit der Ihre Inhalte tatsächlich in einer Antwort ankommen. Das führt zur Kernregel für Inhalte in der KI-Suche: „Optimize for pages to rank and passages to be relevant." Die Seite muss gefunden werden, aber zitiert wird die Passage. Ein Artikel mit 2.000 Wörtern, der die Antwort auf eine Frage im vorletzten Absatz versteckt, liefert ein schlechteres Snippet als ein Abschnitt von 80 Wörtern, der mit der Antwort beginnt.

## Was bedeutet das für Ihre Website?

Bauen Sie Ihre Seiten aus Abschnitten, die als Snippet funktionieren: Überschrift im Frageformat, erste Sätze mit der Antwort ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)), konkrete Zahlen und Namen, keine Verweise auf andere Stellen der Seite. Nennen Sie in solchen Abschnitten Ihre Marke ausdrücklich — sonst wird die Passage zitiert, ohne dass Ihr Name fällt.
