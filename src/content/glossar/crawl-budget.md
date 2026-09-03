---
title: "Crawl-Budget"
shortDefinition: "Das Crawl-Budget ist die Menge an Abrufen, die ein Crawler einer Website in einem Zeitraum widmet. Crawl Management sorgt dafür, dass dieses Budget auf die Seiten fällt, die wirklich zählen."
synonyms: ["Crawl Management", "Crawl Budget", "Crawl-Steuerung"]
category: technik
related: ["llm-crawler", "url-discovery", "index-management", "ttfb"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Wie lenke ich das Crawl-Budget auf die wichtigen Seiten?"
    a: "Unwichtiges aus dem Weg räumen: Filter- und Parameter-URLs, interne Suchergebnisse und Duplikate per robots.txt oder Noindex ausschließen, unnötige Links maskieren, die XML-Sitemap auf indexierbare URLs beschränken und aktuell halten. Was der Crawler nicht sieht, kostet kein Budget."
  - q: "Gilt das Crawl-Budget auch für KI-Crawler?"
    a: "Ja, mit einem Unterschied: Viele LLM-Crawler sind ungeduldiger als Googlebot und kommen seltener wieder. Eine Website, die den Bot mit tausenden unwichtigen URLs beschäftigt, riskiert, dass die wichtigen gar nicht erst erreicht werden."
---

Das Crawl-Budget ist die Anzahl an Seitenabrufen, die ein Crawler einer Website in einem bestimmten Zeitraum zugesteht. Es hängt von der Größe der Website, ihrer Antwortgeschwindigkeit und ihrer Bedeutung ab. Crawl Management ist die Arbeit daran, dass dieses Budget auf den Content fällt, der wirklich zählt — und nicht auf Filterseiten, Parameter-URLs und Duplikate.

## Wie funktioniert das Crawl-Budget?

Ein Crawler entdeckt URLs über Links und Sitemaps ([URL Discovery](/wissen/geo-glossar/url-discovery/)) und arbeitet sie in einer Reihenfolge ab, die er selbst bestimmt. Jede URL kostet einen Abruf. Antwortet der Server langsam ([TTFB](/wissen/geo-glossar/ttfb/)), sinkt die Zahl der Abrufe je Zeiteinheit. Enthält die Website viele URLs ohne eigenen Wert — Sortierungen, Session-Parameter, interne Suchergebnisse —, verteilt sich das Budget darauf, und die wichtigen Seiten werden seltener oder später besucht.

Für [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) gilt das verschärft: Sie kommen seltener wieder als Googlebot und wiederholen abgebrochene Abrufe nicht.

## Warum ist das Crawl-Budget für die KI-Sichtbarkeit wichtig?

Weil Inhalte, die ein Crawler nicht erreicht, weder ins Training noch in eine Live-Antwort gelangen. Das Crawl-Budget ist Teil der Kette, die vor jedem Ranking steht: URL Discovery, Crawl Management, [Index-Management](/wissen/geo-glossar/index-management/), Verlinkung, Content-Qualität. Fällt ein Glied aus, findet der Rest ohne die Seite statt.

## Was bedeutet das für Ihre Website?

Halten Sie die XML-Sitemap aktuell und beschränken Sie sie auf indexierbare URLs. Schließen Sie Parameter-, Filter- und Duplikat-URLs vom Crawling aus. Maskieren Sie Links, die Crawler nicht verfolgen sollen. Prüfen Sie in den Logfiles, welche URLs KI-Bots tatsächlich abrufen — wenn dort Filterseiten statt Leistungsseiten stehen, ist das Budget falsch verteilt.
