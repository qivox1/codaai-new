---
title: "Kosinus-Ähnlichkeit"
shortDefinition: "Die Kosinus-Ähnlichkeit misst, wie ähnlich zwei Textvektoren sind — etwa der Hauptinhalt einer Seite und eine Suchanfrage. Je höher der Wert, desto eher gilt der Inhalt als relevant."
synonyms: ["Cosine Similarity", "Semantische Ähnlichkeit", "Vektorähnlichkeit"]
category: grundlagen
related: ["embedding", "query-coverage", "re-ranking", "semantisches-chunking"]
pubDate: 2026-09-03
faq:
  - q: "Welcher Wert der Kosinus-Ähnlichkeit ist gut?"
    a: "Es gibt keine feste Schwelle; die Werte hängen vom Embedding-Modell ab. Sinnvoll ist der Vergleich: Liegt der Hauptinhalt Ihrer Seite näher an der Zielfrage als der Inhalt der Seiten, die die KI heute zitiert? Das ist die Frage, die zählt."
  - q: "Wie erhöhe ich die Kosinus-Ähnlichkeit zu einer Suchanfrage?"
    a: "Indem der Abschnitt die Frage direkt beantwortet, mit dem gefragten Begriff beginnt und nichts Fremdes enthält. Werbliche Sätze, Einleitungen und Themenwechsel ziehen den Vektor von der Frage weg."
---

Die Kosinus-Ähnlichkeit ist ein mathematisches Maß dafür, wie ähnlich zwei Vektoren sind. In KI-Systemen wird sie benutzt, um zu berechnen, wie nah der [Embedding](/wissen/geo-glossar/embedding/)-Vektor eines Textabschnitts am Vektor einer Suchanfrage liegt. Der Wert reicht von −1 bis 1; je näher an 1, desto ähnlicher die Bedeutung.

## Wie funktioniert die Kosinus-Ähnlichkeit?

Zwei Texte werden in Vektoren übersetzt. Die Kosinus-Ähnlichkeit ist der Kosinus des Winkels zwischen diesen Vektoren: zeigen sie in dieselbe Richtung, ist der Wert nahe 1; stehen sie senkrecht zueinander, ist er 0. Weil nur die Richtung zählt und nicht die Länge, ist das Maß unabhängig davon, wie lang ein Text ist — ein kurzer, präziser Abschnitt kann einer Frage näher sein als ein langer Artikel.

In der [Retrieval-Pipeline](/wissen/geo-glossar/initial-retrieval/) eines KI-Systems ist die Kosinus-Ähnlichkeit ein zentrales Kriterium dafür, welche Passagen im [Re-Ranking](/wissen/geo-glossar/re-ranking/) über die Relevanzschwelle kommen.

## Warum ist die Kosinus-Ähnlichkeit für die KI-Sichtbarkeit wichtig?

Sie ist die technische Fassung der Frage „Passt dieser Inhalt zur Anfrage?". Klassisches SEO beantwortet diese Frage über Keywords und Links; KI-Systeme beantworten sie über Bedeutungsnähe. Eine Seite kann für ein Keyword ranken und trotzdem einen niedrigen Wert zur konkreten Nutzerfrage haben, wenn ihr Hauptinhalt die Frage nur streift. Dann wird sie zwar gefunden, aber nicht zitiert.

## Was bedeutet das für Ihre Website?

Vergleichen Sie den Hauptinhalt Ihrer wichtigen Seiten mit den Fragen aus Ihrem [Promptset](/wissen/geo-glossar/promptset/). Abschnitte, die eine Frage direkt beantworten und mit dem gefragten Begriff beginnen, liegen näher an der Anfrage als Abschnitte mit Einleitung, Werbung und Themenwechsel. Decken Sie auch die verwandten Fragen ab ([Query Coverage](/wissen/geo-glossar/query-coverage/)), denn ein KI-System stellt selten nur eine.
