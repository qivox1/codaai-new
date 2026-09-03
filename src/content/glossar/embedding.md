---
title: "Embedding"
shortDefinition: "Ein Embedding ist die Übersetzung eines Textes in einen Zahlenvektor, der seine Bedeutung abbildet. Texte mit ähnlicher Bedeutung liegen im Vektorraum nahe beieinander."
synonyms: ["Vektorrepräsentation", "Text-Embedding", "Vektordatenbank"]
category: grundlagen
related: ["kosinus-aehnlichkeit", "chunking", "token", "re-ranking"]
pubDate: 2026-09-03
faq:
  - q: "Was ist eine Vektordatenbank?"
    a: "Ein Speicher für Embeddings, der nicht nach exakten Wörtern sucht, sondern nach Vektoren, die einer Anfrage inhaltlich am nächsten liegen. KI-Systeme legen dort die Chunks von Webseiten ab und finden bei einer Frage in Millisekunden die semantisch passendsten Abschnitte."
  - q: "Kann ich Embeddings für meine Inhalte selbst berechnen?"
    a: "Ja. Embedding-Modelle wie SentenceTransformer oder die Embedding-APIs der großen Anbieter lassen sich mit wenigen Zeilen Code nutzen. Damit lässt sich prüfen, wie nah der Hauptinhalt einer Seite an den Fragen liegt, für die sie gefunden werden soll."
---

Ein Embedding ist die Darstellung eines Textes als langer Zahlenvektor, zum Beispiel „0,0321 · 0,0539 · −0,0217 · …" über mehrere hundert oder tausend Dimensionen. Ein Embedding-Modell wie SentenceTransformer oder die Embeddings der großen KI-Anbieter erzeugt diese Vektoren so, dass Texte mit ähnlicher Bedeutung nahe beieinander liegen — unabhängig davon, ob sie dieselben Wörter benutzen.

## Wie funktionieren Embeddings?

Ein KI-System zerlegt Webseiten in Abschnitte ([Chunking](/wissen/geo-glossar/chunking/)), wandelt jeden Abschnitt in einen Vektor um und speichert ihn in einer Vektordatenbank. Bei einer Nutzerfrage wird auch die Frage in einen Vektor übersetzt. Anschließend sucht das System die Abschnitte, deren Vektoren dem Fragevektor am nächsten liegen. Das Maß dafür ist die [Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/).

Der entscheidende Unterschied zur Stichwortsuche: Eine Seite muss die Frage nicht wörtlich enthalten, um gefunden zu werden. Sie muss sie inhaltlich beantworten. Umgekehrt hilft es nichts, ein Keyword zwanzigmal zu wiederholen — der Vektor bildet Bedeutung ab, nicht Häufigkeit.

## Warum sind Embeddings für die KI-Sichtbarkeit wichtig?

Embeddings sind der Grund, warum in KI-Systemen Passagen gewinnen, die eine Frage direkt und fokussiert beantworten. Ein Abschnitt, der drei Themen mischt, erzeugt einen unscharfen Vektor, der zu keiner Frage richtig passt. Ein Abschnitt, der genau eine Frage beantwortet, erzeugt einen scharfen Vektor, der bei genau dieser Frage weit oben landet.

## Was bedeutet das für Ihre Website?

Schreiben Sie in Abschnitten, die je ein Thema behandeln und mit dem Begriff beginnen, um den es geht. Formulieren Sie die Fragen Ihrer Kunden als Überschriften und beantworten Sie sie direkt darunter. Wer es messen will: Berechnen Sie die Kosinus-Ähnlichkeit zwischen dem Hauptinhalt einer Seite und den Fragen, für die sie gefunden werden soll — das ist die technische Fassung von „passt der Text zur Anfrage?".
