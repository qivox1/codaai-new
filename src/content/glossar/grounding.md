---
title: "Grounding"
shortDefinition: "Grounding ist das Verankern einer KI-Antwort in externen, aktuellen Quellen: Das System sucht passende Webseiten, extrahiert relevante Passagen und baut die Antwort darauf auf."
synonyms: ["Search Grounding", "Grounded Response", "Quellenverankerung"]
category: grounding
related: ["websuche", "grounding-snippets", "grounded-response-generation", "grounding-budget", "citation", "document-relevance"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Warum ist Grounding der Hebel für klassisches SEO in KI-Antworten?"
    a: "Weil Grounding mit einer Suche beginnt. Nur Seiten, die für die Anfrage oder ihre Fan-out-Queries weit oben ranken, kommen als Quelle infrage. Ohne Ranking kein Grounding, ohne Grounding keine Zitierung — die Reihenfolge lässt sich nicht überspringen."
  - q: "Findet bei Google AI Overviews ein Grounding mit Live-Zugriff statt?"
    a: "In der Regel nicht in Form eines Seitenabrufs, der im Server-Log auftaucht. Google greift auf seinen bestehenden Index zu. Deshalb sagen Logfiles bei AI Overviews und AI Mode nichts über die Sichtbarkeit aus."
---

Grounding ist der Vorgang, mit dem ein KI-System seine Antwort auf externen Quellen aufbaut, statt allein aus dem [Modellwissen](/wissen/geo-glossar/modellwissen/) zu antworten. Das System sucht Webseiten, die zur Frage passen, extrahiert daraus die relevanten Passagen und legt sie dem Sprachmodell als Kontext vor. Die Antwort ist dann „geerdet": Sie stützt sich auf konkrete Texte, die das System nachweisen kann.

## Wie funktioniert Grounding?

Grounding beginnt mit der [Websuche](/wissen/geo-glossar/websuche/), die das System auslöst, wenn seine Sicherheit für eine Antwort aus dem Gedächtnis niedrig ist. Aus einer Frage entstehen mehrere Suchanfragen ([Query Fan-out](/wissen/geo-glossar/query-fan-out/)). Für jede werden die bestplatzierten Seiten gesammelt ([Initial Retrieval](/wissen/geo-glossar/initial-retrieval/)), dann werden einzelne Passagen bewertet ([Re-Ranking](/wissen/geo-glossar/re-ranking/)). Die besten Passagen werden als [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/) extrahiert und zusammen mit der Nutzerfrage, Personalisierung und gegebenenfalls angehängten Medien in den Kontext des Modells gelegt. Daraus entsteht die Antwort — mit Zitaten auf die Quellen, aus denen die Snippets stammen.

Bei Google AI Overviews und AI Mode findet dieser Zugriff in der Regel nicht als Live-Abruf Ihrer Seite statt, sondern gegen den bestehenden Google-Index. Ein Server-Log zeigt dort nichts. Bei Gemini gilt zusätzlich ein [Grounding Budget](/wissen/geo-glossar/grounding-budget/): Wer besser rankt, bekommt mehr Raum.

## Warum ist Grounding für die KI-Sichtbarkeit wichtig?

Grounding ist der Weg, über den klassisches SEO in die KI-Antwort hineinwirkt — und der einzige Weg für alles, was das Modell nicht aus dem Training kennt. Die Regel lautet: Kein Ranking, kein Grounding, keine AI-Sichtbarkeit. Wer bei der zugrunde liegenden Suche nicht unter den Top-Ergebnissen für die Query oder ihre Fan-out-Queries steht, wird gar nicht erst als zitierfähige Quelle erkannt ([Document Relevance](/wissen/geo-glossar/document-relevance/)).

## Was bedeutet Grounding für Ihre Website?

Zwei Dinge müssen zusammenkommen: Die Seite muss ranken, und die Passage muss überzeugen. Das erste ist klassische SEO-Arbeit — Indexierbarkeit, interne Verlinkung, Rankings für Haupt- und Fan-out-Queries. Das zweite ist Content-Arbeit auf Absatzebene: direkte Antworten, klare Struktur, Faktendichte. Ob es funktioniert, zeigt die [Citation Rate](/wissen/geo-glossar/citation-rate/) über Ihr [Promptset](/wissen/geo-glossar/promptset/), nicht der Traffic.
