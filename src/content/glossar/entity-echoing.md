---
title: "Entity Echoing"
shortDefinition: "Entity Echoing ist die Technik, den Begriff einer Überschrift im ersten Satz der Antwort zu wiederholen: Fragt die H2 nach Baustrom, beginnt die Antwort mit dem Wort „Baustrom“."
synonyms: ["Begriffsecho", "Entity Reinforcement"]
category: content
related: ["entitaet", "semantisches-chunking", "bottom-line-up-front", "kosinus-aehnlichkeit"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Ist Entity Echoing nicht einfach Keyword-Wiederholung?"
    a: "Nein. Es geht um eine einzige Wiederholung an einer bestimmten Stelle — der Begriff aus der Überschrift steht am Anfang der Antwort. Das verankert Frage und Antwort semantisch. Den Begriff zehnmal im Absatz zu streuen, bringt nichts und schadet der Lesbarkeit."
  - q: "Funktioniert Entity Echoing auch mit Markennamen?"
    a: "Ja, und dort ist es besonders wirksam. Fragt eine Überschrift „Was kostet ein Audit bei CodaAI?“, beginnt die Antwort mit „Ein Audit bei CodaAI kostet …“. So steht die Marke in genau der Passage, die extrahiert wird — und wird mit ihr zusammen zitiert."
---

Entity Echoing bezeichnet die Technik, den zentralen Begriff einer Überschrift im ersten Satz des darauffolgenden Absatzes zu wiederholen. Fragt die H2 „Was ist Baustrom?", beginnt die Antwort mit „Baustrom ist …". Der Begriff — die [Entität](/wissen/geo-glossar/entitaet/) — wird geechot, und Frage und Antwort sind dadurch für Mensch und Maschine eindeutig verknüpft.

## Wie funktioniert Entity Echoing?

Ein KI-System bewertet Passagen einzeln ([Re-Ranking](/wissen/geo-glossar/re-ranking/)). Der Absatz unter einer Überschrift wird als Chunk betrachtet, oft mit der Überschrift zusammen. Steht der gefragte Begriff sowohl in der Überschrift als auch am Anfang der Antwort, ist die semantische Nähe zur Nutzerfrage maximal ([Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/)), und der Absatz bleibt auch dann eindeutig, wenn die Überschrift beim Chunking verloren geht. Beginnt die Antwort dagegen mit „Das ist …" oder „Hierbei handelt es sich um …", trägt der Chunk allein keinen Begriff mehr.

## Warum ist Entity Echoing für die KI-Sichtbarkeit wichtig?

Weil Passagen in Antworten mit denen anderer Quellen gemischt werden und ohne ihre Umgebung bestehen müssen. Ein Absatz, der mit dem Begriff beginnt, ist als Antwort auf die Frage nach diesem Begriff erkennbar — als Snippet, als Zitat, als Definition. Bei Markennamen kommt hinzu: Wenn die Marke am Anfang der Passage steht, wird sie mit dem Beleg zusammen extrahiert und fällt in der Antwort, statt dass die Passage anonym zitiert wird.

## Was bedeutet das für Ihre Website?

Formulieren Sie Überschriften als Fragen oder Begriffe und beginnen Sie den ersten Satz darunter mit genau diesem Begriff. Verbinden Sie das mit deklarativen Definitionen („X ist Y") und der Antwort zuerst ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)). Und schreiben Sie Ihre Marke und Ihre Produkte aus, wo sie gemeint sind: „CodaAI misst …" statt „Wir messen …".
