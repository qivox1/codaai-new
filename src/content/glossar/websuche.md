---
title: "Websuche (Live-Zugriff)"
seoTitle: "Websuche in KI-Systemen"
shortDefinition: "Die Websuche ist der Live-Zugriff eines KI-Systems auf das Web, ausgelöst, wenn das Modell sich seiner Antwort aus dem Modellwissen nicht sicher ist. Erst hier können aktuelle Inhalte wirken."
synonyms: ["Web Search", "Live-Zugriff", "Search Grounding", "Retrieval-Augmented Generation (RAG)"]
category: grounding
related: ["grounding", "modellwissen", "knowledge-cutoff", "initial-retrieval", "logfiles"]
pubDate: 2026-09-03
faq:
  - q: "Wann löst ein KI-System eine Websuche aus?"
    a: "Wenn seine Sicherheit, die Frage aus dem Modellwissen zu beantworten, niedrig ist — typischerweise bei aktuellen Themen, konkreten Anbietern, Preisen oder Terminen. Ist die Sicherheit hoch, antwortet es aus dem Gedächtnis, ohne eine einzige Seite abzurufen."
  - q: "Nutzen alle KI-Systeme dieselbe Websuche?"
    a: "Nein. ChatGPT greift überwiegend auf den Bing-Index zu, Google AI Overviews und AI Mode auf den Google-Index, Perplexity auf einen eigenen Index. Wer in KI-Antworten vorkommen will, braucht deshalb Rankings in mehr als einer Suchmaschine."
---

Die Websuche ist der Moment, in dem ein KI-System sein [Modellwissen](/wissen/geo-glossar/modellwissen/) verlässt und live im Web nachsieht. Sie wird nicht bei jeder Frage ausgelöst, sondern nur dann, wenn das Modell seine eigene Sicherheit als niedrig einschätzt. Die Leitfrage im System lautet sinngemäß: „Wie sicher bin ich, dass ich diese Frage allein aus dem Gedächtnis beantworten kann?"

## Wie funktioniert die Websuche in KI-Systemen?

Fällt die Sicherheit niedrig aus, formuliert das System eine oder mehrere Suchanfragen ([Query Fan-out](/wissen/geo-glossar/query-fan-out/)), schickt sie an einen Suchindex und sammelt die Treffer als Kandidaten ([Initial Retrieval](/wissen/geo-glossar/initial-retrieval/)). Aus den Kandidaten werden die relevantesten Passagen ausgewählt ([Re-Ranking](/wissen/geo-glossar/re-ranking/)) und als [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/) in den Kontext des Modells gelegt. Erst dann entsteht die Antwort. Der Fachbegriff für dieses Verfahren ist Retrieval-Augmented Generation (RAG).

Ist die Sicherheit hoch, entfällt all das. Das Modell antwortet aus dem Gedächtnis, und keine Website wird abgerufen — auch Ihre nicht.

## Warum ist die Websuche für die KI-Sichtbarkeit wichtig?

Sie ist der einzige Weg, auf dem Inhalte nach dem [Knowledge Cut-off](/wissen/geo-glossar/knowledge-cutoff/) in eine Antwort gelangen. Und sie ist der Punkt, an dem klassisches SEO in die KI-Antwort hineinwirkt: Nur was bei der zugrunde liegenden Suche weit oben steht, kommt in den Kandidaten-Pool. Für Fragen nach Anbietern, Produkten und Preisen — also nach genau dem, was Ihr Unternehmen verkauft — ist die Websuche der Regelfall.

## Was bedeutet das für Ihre Website?

Prüfen Sie, welche Ihrer Kernfragen eine Websuche auslösen und welche das Modell aus dem Gedächtnis beantwortet. Für die erste Gruppe zählen Rankings, Crawlbarkeit und extrahierbare Passagen. Für die zweite Gruppe zählt, was bis zum letzten Training über Ihre Marke im Netz stand. Bedenken Sie dabei, dass ein Abruf im [Logfile](/wissen/geo-glossar/logfiles/) noch keine Zitierung bedeutet: Das System validiert bei Unsicherheit, es antwortet nicht wegen des Abrufs.
