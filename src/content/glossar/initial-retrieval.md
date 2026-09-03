---
title: "Initial Retrieval"
shortDefinition: "Initial Retrieval ist der erste Auswahlschritt eines KI-Systems: Es sammelt die Seiten, die für die Anfrage und ihre Fan-out-Queries am besten ranken, in einen Kandidaten-Pool."
synonyms: ["Kandidaten-Pool", "Retrieval", "Erstauswahl"]
category: pipeline
related: ["document-relevance", "query-fan-out", "re-ranking", "grounding-budget", "grounding"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Was ist der Kandidaten-Pool beim Initial Retrieval?"
    a: "Die Menge aller Seiten, die nach dem Initial Retrieval als mögliche Quellen infrage kommen — gesammelt über alle Fan-out-Queries. Im Pool zu sein ist die Eintrittskarte, mehr nicht: „Being retrieved doesn't guarantee being cited“."
  - q: "Wie viele Seiten kommen beim Initial Retrieval in den Pool?"
    a: "Das variiert je System und Frage, typischerweise die vorderen Ergebnisse jeder Fan-out-Query. Je höher eine Seite rankt, desto sicherer ist sie im Pool; ab einer bestimmten Position wird sie nicht mehr berücksichtigt."
---

Initial Retrieval ist der erste von vier Schritten, in denen ein KI-System die Quellen für eine Antwort auswählt. Das System nimmt die Suchanfragen aus dem [Query Fan-out](/wissen/geo-glossar/query-fan-out/), holt sich zu jeder die bestplatzierten Seiten aus dem Suchindex und legt sie in einen gemeinsamen Kandidaten-Pool. Die Auswahl beruht auf thematischer Relevanz — genau wie beim klassischen Ranking.

## Wie funktioniert Initial Retrieval?

Für jede Fan-out-Query entsteht eine Trefferliste. Position 1 kommt sicher in den Pool, Position 4 wahrscheinlich, Position 15 kaum. Weil mehrere Fan-out-Queries parallel laufen, kann eine Seite, die für die Hauptfrage nicht rankt, über eine Teilfrage in den Pool gelangen. Das Ergebnis ist eine Kandidatenliste, die noch nichts über die Zitierung sagt: Sie enthält ganze Seiten, keine Passagen. Erst das [Re-Ranking](/wissen/geo-glossar/re-ranking/) bewertet, was auf diesen Seiten steht.

Für Gemini kommt hinzu, dass die Position innerhalb des Pools das [Grounding Budget](/wissen/geo-glossar/grounding-budget/) bestimmt — wer besser rankt, darf mehr Material beitragen.

## Warum ist Initial Retrieval für die KI-Sichtbarkeit wichtig?

Es ist die Stelle, an der klassisches SEO entscheidet. Kein Ranking, kein Retrieval — und alles, was danach kommt, findet ohne Ihre Seite statt. Zugleich ist es nur die Eintrittskarte: „Being retrieved doesn't guarantee being cited." Ein Seitenabruf im Server-Log zeigt, dass eine Seite im Pool war, nicht, dass sie in der Antwort gelandet ist.

## Was bedeutet das für Ihre Website?

Sorgen Sie dafür, dass Ihre wichtigen Seiten für die Haupt-Query und die verwandten Fragen in den Top-Ergebnissen stehen — in Google und in Bing, weil die KI-Systeme verschiedene Indizes nutzen. Prüfen Sie [Index-Management](/wissen/geo-glossar/index-management/) und Crawlbarkeit, denn eine Seite, die nicht im Index ist, kann nicht abgerufen werden. Und bereiten Sie die Seite auf den nächsten Schritt vor: Im Pool zählt die Seite, im Re-Ranking zählt die Passage.
