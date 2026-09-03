---
title: "Chunking"
shortDefinition: "Chunking ist das Zerlegen eines Textes in kleine, in sich geschlossene Abschnitte (Chunks), die ein KI-System einzeln speichert, vergleicht und in Antworten verwendet."
synonyms: ["Chunks", "Textsegmentierung", "Parsing & Extraction"]
category: grundlagen
related: ["semantisches-chunking", "embedding", "grounding-snippets", "bottom-line-up-front"]
pubDate: 2026-09-03
faq:
  - q: "Wie groß ist ein Chunk?"
    a: "Das legt jedes System selbst fest, häufig zwischen einigen Sätzen und wenigen Absätzen. Verlassen Sie sich nicht auf eine Zahl: Schreiben Sie so, dass jeder Absatz für sich eine vollständige Aussage trägt — dann funktioniert Ihr Text bei jeder Chunk-Größe."
  - q: "Was passiert beim Parsing vor dem Chunking?"
    a: "Der Rohtext wird aus dem HTML extrahiert und bereinigt: Navigation, Skripte und Werbeflächen fallen weg, der Hauptinhalt bleibt. Sauberes, semantisches HTML mit klarer Überschriftenhierarchie erleichtert diesen Schritt und verhindert, dass Inhalt als Beiwerk verworfen wird."
---

Chunking ist das systematische Zerlegen von Texten in kleine Abschnitte, die ein KI-System einzeln weiterverarbeitet. Nach dem Parsing — dem Extrahieren und Bereinigen des Rohtextes aus einer Webseite — wird der Inhalt in Chunks geschnitten, jeder Chunk in einen Vektor übersetzt ([Embedding](/wissen/geo-glossar/embedding/)) und gespeichert. Bei einer Frage sucht das System nicht nach passenden Seiten, sondern nach passenden Chunks.

## Wie funktioniert Chunking?

Die vereinfachte Verarbeitungskette eines KI-Systems hat sechs Schritte: Datenquellen sammeln, Parsing und Extraction, Chunking, Embeddings, Speicherung in einer Vektordatenbank, Retrieval und Antwort. Chunking sitzt in der Mitte und bestimmt, welche Einheit später verglichen wird. Manche Systeme schneiden nach fester Länge, andere entlang von Überschriften und Absätzen. In beiden Fällen gilt: Ein Chunk wird ohne den Rest der Seite bewertet.

## Warum ist Chunking für die KI-Sichtbarkeit wichtig?

Weil KI-Systeme Passagen extrahieren, nicht Seiten. Ein Absatz, der nur mit dem Kontext der vorherigen drei Absätze verständlich ist, verliert im Vergleich, sobald er allein steht. Ein Absatz, der eine Frage vollständig beantwortet, gewinnt — auch auf einer sonst mittelmäßigen Seite. Das ist der Grund, warum im GEO die Regel „Optimize for pages to rank and passages to be relevant" gilt: Die Seite muss ranken, die Passage muss überzeugen.

## Was bedeutet das für Ihre Website?

Schreiben Sie so, dass jeder Absatz eine in sich geschlossene Antwort zu einem Thema ist und jeder Satz auch ohne Kontext verständlich bleibt. Vermeiden Sie Verweise wie „wie oben beschrieben". Setzen Sie die Kernaussage an den Anfang ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)). Wie das konkret aussieht, beschreibt der Begriff [Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/).
