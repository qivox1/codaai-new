---
title: "Document Relevance"
shortDefinition: "Document Relevance ist der „klassische SEO-Anteil“ im Grounding: Eine Seite muss für die Query oder ihre Fan-out-Queries unter den Top-Ergebnissen stehen, um überhaupt als zitierfähige Quelle zu gelten."
synonyms: ["Dokumentrelevanz", "Seitenrelevanz"]
category: grounding
related: ["initial-retrieval", "grounding", "query-fan-out", "re-ranking", "index-management"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Reicht ein gutes Google-Ranking für Document Relevance in ChatGPT?"
    a: "Nein, weil ChatGPT überwiegend auf den Bing-Index zugreift. Document Relevance muss in dem Index bestehen, den das jeweilige KI-System nutzt. Wer nur bei Google gut steht, ist für ChatGPT unter Umständen unsichtbar."
  - q: "Ist Document Relevance dasselbe wie Zitierung?"
    a: "Nein. Document Relevance entscheidet, ob eine Seite in den Kandidaten-Pool kommt. Ob sie zitiert wird, entscheidet danach das Re-Ranking auf Passagenebene. Gefunden zu werden ist die Voraussetzung, nicht das Ergebnis."
---

Document Relevance bezeichnet die Relevanz einer ganzen Seite für eine Suchanfrage — so, wie eine Suchmaschine sie im Ranking bewertet. Im Grounding-Prozess eines KI-Systems ist sie der erste Filter: Nur Seiten, die für die Query oder eine ihrer [Fan-out-Queries](/wissen/geo-glossar/query-fan-out/) unter den Top-Suchergebnissen stehen, werden als mögliche Quellen erkannt. Das ist der „klassische SEO-Part" innerhalb von GEO.

## Wie funktioniert Document Relevance?

Ein KI-System ranked Seiten nicht selbst neu. Es übernimmt die Trefferlisten eines Suchindex — Bing für ChatGPT und Copilot, Google für AI Overviews, AI Mode und Gemini, ein eigener Index bei Perplexity — und behandelt die vorderen Positionen als Kandidaten für das [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/). Je höher die Position, desto größer die Wahrscheinlichkeit, in den Kandidaten-Pool zu kommen, und bei Gemini desto größer das [Grounding Budget](/wissen/geo-glossar/grounding-budget/).

## Warum ist Document Relevance für die KI-Sichtbarkeit wichtig?

Sie ist die Eintrittskarte. Ohne Ranking gibt es kein Retrieval, ohne Retrieval kein Grounding, ohne Grounding keine Zitierung. Zugleich ist sie nur die Eintrittskarte: In der Studie „KI-Blindtest Mittelstand 2026" von CodaAI hängen klassische Rankings und Erwähnungen in KI-Antworten nur schwach zusammen — gute SEO-Sichtbarkeit garantiert keine Nennung. Der Grund liegt im nächsten Schritt: Nach dem Retrieval bewertet das System Passagen, nicht Seiten ([Re-Ranking](/wissen/geo-glossar/re-ranking/)).

## Was bedeutet das für Ihre Website?

Halten Sie die SEO-Grundlagen intakt: indexierbare URLs, Crawlbarkeit, interne und externe Verlinkung, Rankings für Haupt- und Fan-out-Queries — in Google und in Bing. Prüfen Sie Bing gesondert, weil ChatGPT dort seine Kandidaten holt. Und betrachten Sie das Ranking als Voraussetzung, nicht als Ziel: Was auf der Seite steht, muss anschließend auf Absatzebene bestehen.
