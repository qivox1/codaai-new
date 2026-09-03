---
title: "Grounded Response Generation"
seoTitle: "Grounded Response Generation"
shortDefinition: "Grounded Response Generation ist der letzte Schritt einer KI-Antwort: Das Modell synthetisiert Modellwissen und Model Context — Nutzerfrage, Personalisierung, Medien und alle Grounding Snippets — zu einem Text mit Zitaten."
synonyms: ["Model Context", "Finale Antwort", "Antwortsynthese"]
category: grounding
related: ["grounding", "grounding-snippets", "citation", "mention", "modellwissen"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Was ist der Model Context?"
    a: "Alles, was dem Sprachmodell bei der Antwortgenerierung zusätzlich zum Modellwissen vorliegt: der Prompt des Nutzers, Personalisierung aus früheren Gesprächen, angehängte Dateien oder Bilder und sämtliche Grounding Snippets aus der Websuche. Brand Citations werden aus diesem Kontext heraus in die Antwort eingebaut."
  - q: "Warum wird eine Quelle im Grounding verwendet, aber nicht zitiert?"
    a: "Weil das Modell im Kontext mehr Material hat, als es in der Antwort ausweist. Es synthetisiert aus allen Snippets und zitiert nur die, die eine konkrete Aussage tragen. Eine Passage, die nur bestätigt, was andere ebenfalls sagen, geht in die Antwort ein, ohne genannt zu werden."
---

Grounded Response Generation ist der Schritt, in dem ein KI-System aus allem, was ihm vorliegt, die eigentliche Antwort erzeugt. Das Sprachmodell kombiniert sein [Modellwissen](/wissen/geo-glossar/modellwissen/) mit dem Model Context: der Nutzerfrage, der Personalisierung, angehängten Medien und allen [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/), die die Websuche geliefert hat. Das Ergebnis ist ein Text, in den Markennennungen und Quellenverweise eingebaut sind.

## Wie funktioniert Grounded Response Generation?

Die vier Schritte davor — [Websuche](/wissen/geo-glossar/websuche/), [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/), [Re-Ranking](/wissen/geo-glossar/re-ranking/), Extraktion der Snippets — füllen den Kontext. Dann generiert das Modell Token für Token eine Antwort, die zu diesem Kontext passt. Snippets, die eine konkrete, belegbare Aussage liefern, werden zitiert; Snippets, die nur bestätigen, fließen ohne Nennung ein. Weil das Modell stochastisch arbeitet, fällt diese Auswahl bei jeder Anfrage etwas anders aus.

## Warum ist Grounded Response Generation für die KI-Sichtbarkeit wichtig?

Hier entscheidet sich, ob Ihre Marke in der Antwort vorkommt ([Mention](/wissen/geo-glossar/mention/)) und ob Ihre Seite als Quelle erscheint ([Citation](/wissen/geo-glossar/citation/)). Beides sind unterschiedliche Ergebnisse: Eine Marke kann aus dem Modellwissen genannt werden, ohne dass eine Seite zitiert wird, und eine Seite kann zitiert werden, ohne dass die Marke im Antworttext eine Rolle spielt. Zitiert wird, was eine Aussage trägt, die andere Quellen nicht liefern.

## Was bedeutet das für Ihre Website?

Liefern Sie Passagen, die etwas Eigenes sagen: eine konkrete Zahl, eine eigene Erhebung, eine Erfahrung, die sonst nirgends steht ([Information Gain](/wissen/geo-glossar/information-gain/)). Und benennen Sie Ihre Marke und Ihre Produkte in diesen Passagen ausdrücklich, damit die Nennung mit dem Beleg zusammen in den Kontext kommt. Eine Passage, die eine Frage gut beantwortet, aber „wir" statt des Firmennamens sagt, wird zitiert, ohne dass die Marke fällt.
