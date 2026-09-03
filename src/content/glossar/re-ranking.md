---
title: "Re-Ranking"
shortDefinition: "Re-Ranking ist der zweite Auswahlschritt eines KI-Systems: Einzelne Textpassagen der Kandidatenseiten werden bewertet, und nur die relevantesten kommen über die Relevanzschwelle in die Antwort."
synonyms: ["Passage Re-Ranking", "Relevance Threshold", "Cut-off"]
category: pipeline
related: ["initial-retrieval", "grounding-snippets", "semantisches-chunking", "kosinus-aehnlichkeit", "information-gain"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Was ist die Relevanzschwelle beim Re-Ranking?"
    a: "Der Cut-off, unterhalb dessen Passagen aussortiert werden. Nur was über der Schwelle liegt, wird weiterverarbeitet. Deshalb reicht „ungefähr passend“ nicht: Eine Passage muss die Frage klar genug beantworten, um den Schnitt zu schaffen."
  - q: "Was macht eine Passage im Re-Ranking relevant?"
    a: "Fünf Eigenschaften: Sie beantwortet die Query direkt, hat einen starken thematischen und semantischen Match, ist klar und für Maschinen lesbar, hochspezifisch und fokussiert, und sie ist hochwertig und in sich geschlossen — verständlich ohne den Rest der Seite."
---

Re-Ranking ist der Schritt, in dem ein KI-System nicht mehr Seiten, sondern Passagen bewertet. Nach dem [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) liegt ein Kandidaten-Pool aus Seiten vor. Im Re-Ranking werden die einzelnen Textabschnitte dieser Seiten gegen die Frage geprüft, und nur die relevantesten kommen eine Runde weiter. Was unter der Relevanzschwelle bleibt, fällt heraus — auch wenn die Seite selbst gut rankt.

## Wie funktioniert Re-Ranking?

Das System zerlegt die Kandidatenseiten in Abschnitte ([Chunking](/wissen/geo-glossar/chunking/)), berechnet für jeden Abschnitt die semantische Nähe zur Frage ([Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/)) und ergänzt weitere Signale: Beantwortet der Abschnitt die Frage direkt? Ist er spezifisch oder allgemein? Ist er ohne Kontext verständlich? Dann wird eine Schwelle angelegt, der „Cut-off". Abschnitte darüber werden zu [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/), Abschnitte darunter werden verworfen.

Was eine Passage relevant macht, lässt sich in fünf Eigenschaften fassen: Sie beantwortet die Query direkt. Sie hat einen starken thematischen und semantischen Match. Sie ist klar und gut lesbar, auch für Maschinen. Sie ist hochspezifisch und fokussiert. Und sie ist hochwertig und in sich geschlossen.

## Warum ist Re-Ranking für die KI-Sichtbarkeit wichtig?

Re-Ranking ist der Grund, warum gute Rankings keine Zitierung garantieren. „Being retrieved doesn't guarantee being cited": Eine Seite kann im Pool sein und trotzdem keine einzige Passage über die Schwelle bringen, weil ihre Absätze zu allgemein, zu werblich oder nur im Zusammenhang verständlich sind. Umgekehrt kann eine Seite auf Position sechs mit einem einzigen präzisen Absatz zitiert werden.

## Was bedeutet das für Ihre Website?

Optimieren Sie auf Absatzebene. Jeder Abschnitt, der eine Kundenfrage beantwortet, sollte mit dem gefragten Begriff beginnen, die Antwort in den ersten Sätzen liefern und ohne den Rest der Seite verständlich sein ([Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/)). Streichen Sie Weichmacher und Einleitungen, ergänzen Sie Zahlen, Namen und Belege ([Information Gain](/wissen/geo-glossar/information-gain/)). Die Seite muss ranken, die Passage muss überzeugen.
