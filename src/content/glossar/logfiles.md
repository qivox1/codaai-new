---
title: "Logfiles (LLM-Crawler-Requests)"
seoTitle: "Logfiles & LLM-Crawler-Requests"
shortDefinition: "Logfiles zeigen die tatsächlichen Zugriffe von LLM-User-Agents auf den Server. Sie belegen, dass eine Seite abgerufen wurde — nicht, dass sie in einer KI-Antwort gelandet ist. Ein Server-Log bedeutet noch keine Sichtbarkeit."
synonyms: ["Server-Logs", "LLM-Crawler-Requests", "Logfile-Analyse"]
category: messung
related: ["llm-crawler", "initial-retrieval", "re-ranking", "ai-overview-citation-rate", "llm-visibility-tracking"]
pubDate: 2026-09-03
faq:
  - q: "Was sagt ein Zugriff von ChatGPT-User im Logfile aus?"
    a: "Dass ein Nutzer eine Frage gestellt hat, bei der ChatGPT eine Websuche ausgelöst und Ihre Seite als Kandidaten abgerufen hat. Nicht mehr: Ob die Seite das Re-Ranking bestanden hat und in der Antwort zitiert wurde, steht nicht im Log. Der Aufruf ist eine Validierung bei Unsicherheit, nicht der Grund für die Antwort."
  - q: "Warum kann eine Seite mit wenigen Logfile-Zugriffen trotzdem oft zitiert werden?"
    a: "Wegen Caching. Um Latenz und Kosten zu sparen, speichern die Systeme abgerufene Seiten zwischen. Eine Seite mit wenigen Zugriffen kann aus dem Cache sehr oft verwendet werden; eine Seite mit vielen Zugriffen kann trotzdem nur im Cache landen und nie zitiert werden."
---

Logfiles sind die Protokolle des Webservers, in denen jeder Abruf mit Zeitpunkt, URL, Statuscode und User Agent steht. Für die KI-Suche sind die Einträge der [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) interessant — etwa ein Zugriff von `ChatGPT-User/1.0` auf `/leistungen/technical-seo`. Solche Einträge sind die einzige direkte Beobachtung dafür, dass ein KI-System eine Seite tatsächlich abruft. Sie sind aber kein Beleg für Sichtbarkeit.

## Was zeigen Logfiles — und was nicht?

Vier Einschränkungen, die SISTRIX in einer Analyse zu Zugriffen von AI-Userbots ausführlich beschreibt. Erstens: Bei Google AI Overviews und AI Mode findet in der Regel kein Live-Zugriff statt; diese Systeme greifen auf den Google-Index zu und hinterlassen keine Logs. Zweitens: Ein Abruf heißt, dass die Seite im [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) als Kandidat galt — nicht, dass sie das [Re-Ranking](/wissen/geo-glossar/re-ranking/) bestanden hat und in der Antwort steht. Drittens: Der Aufruf ist eine Validierung bei Unsicherheit; das System antwortet nicht wegen des Aufrufs. Viertens: Um Latenz und Kosten zu sparen, wird viel gecacht — Seiten mit wenig Zugriffen werden unter Umständen oft genutzt, Seiten mit vielen Zugriffen landen vielleicht nur im Cache.

## Warum sind Logfiles für die KI-Sichtbarkeit trotzdem wichtig?

Weil sie technische Probleme sichtbar machen, die keine andere Datenquelle zeigt: Welche User Agents kommen überhaupt? Welche URLs rufen sie ab — Leistungsseiten oder Filterseiten? Welche Statuscodes bekommen sie? Brechen Abrufe wegen langsamer Antwortzeiten ab ([TTFB](/wissen/geo-glossar/ttfb/))? Werden Seiten abgerufen, die auf Noindex stehen? Für die Stufe „Gefunden" sind Logfiles das wichtigste Diagnosewerkzeug.

## Was bedeutet das für Ihre Website?

Werten Sie Logfiles nach AI User Agents aus und beantworten Sie damit technische Fragen — nicht die Frage nach der Sichtbarkeit. Für die Sichtbarkeit brauchen Sie [LLM Visibility Tracking](/wissen/geo-glossar/llm-visibility-tracking/) über ein Promptset, den „Generative KI"-Report der Search Console für Googles KI-Übersichten und den „AI Performance"-Report in Bing Webmaster Tools für Copilot. Erst die Kombination ergibt ein vollständiges Bild.
