---
title: "Index-Management"
shortDefinition: "Index-Management ist die Steuerung, welche URLs einer Website indexierbar sind: Noindex nur für Inhalte, die nicht in KI-Antworten erscheinen sollen, Canonical-Tags nur für notwendigen Duplicate Content."
synonyms: ["Indexierung", "Indexierbarkeit", "Noindex und Canonical"]
category: technik
related: ["crawl-budget", "url-discovery", "document-relevance", "initial-retrieval"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Welche Seiten sollten beim Index-Management auf Noindex stehen?"
    a: "Nur solche, die weder in Suchergebnissen noch in KI-Antworten erscheinen sollen: Danke-Seiten, interne Suchergebnisse, Login-Bereiche, Weiterleitungsseiten. Eine Leistungsseite auf Noindex zu setzen, weil sie „nicht fertig“ ist, nimmt sie aus jedem Retrieval — auch aus dem der KI-Systeme."
  - q: "Wie prüfe ich, ob mein Index-Management korrekt ist?"
    a: "Meta Robots und X-Robots-Header je URL kontrollieren, Canonicals gegen die tatsächlichen URLs prüfen, die Sitemap mit dem Index in der Search Console und in Bing Webmaster Tools abgleichen. Seiten, die in der Sitemap stehen, aber nicht indexiert sind, brauchen eine Erklärung."
---

Index-Management bezeichnet die Kontrolle darüber, welche URLs einer Website in den Index einer Suchmaschine aufgenommen werden. Die Werkzeuge sind Meta-Robots-Angaben und X-Robots-Header (index/noindex), Canonical-Tags, die bei Duplikaten die Hauptversion benennen, und die XML-Sitemap als Liste der erwünschten URLs. Die Leitfrage lautet: Sind die wichtigen URLs indexierbar — und nur die?

## Wie funktioniert Index-Management?

Ein Crawler ruft eine Seite ab und prüft die Robots-Anweisungen. Steht die Seite auf Noindex, wird sie nicht in den Index aufgenommen und kann in keiner Suche erscheinen. Trägt sie ein Canonical auf eine andere URL, wird die andere als Hauptversion behandelt. Fehler in diesen Angaben sind still: Eine Seite mit versehentlichem Noindex oder falschem Canonical fällt einfach aus dem Index, ohne dass jemand eine Fehlermeldung sieht.

Für die KI-Suche heißt das: Was nicht im Index von Google oder Bing ist, kann im [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) nicht gefunden werden — die Systeme greifen auf genau diese Indizes zu.

## Warum ist Index-Management für die KI-Sichtbarkeit wichtig?

Weil die Kette vor jeder KI-Antwort mit der Indexierung beginnt: Kein Index, kein Ranking, kein Retrieval, kein Grounding. Zwei Regeln fassen es zusammen: Noindex nur für Inhalte, die nicht in KI-Antworten erscheinen sollen. Canonical-Tags nur für notwendigen Duplicate Content — nicht als Ersatz für saubere URL-Strukturen.

## Was bedeutet das für Ihre Website?

Gehen Sie Ihre wichtigen URLs durch und prüfen Sie Robots-Angaben, Canonicals und den Indexstatus in Google und Bing. Achten Sie besonders auf Bing: ChatGPT holt seine Kandidaten dort, und viele Websites haben Bing nie geprüft. Halten Sie die Sitemap aktuell und auf indexierbare URLs beschränkt, damit sie als verlässliche Liste funktioniert ([Crawl-Budget](/wissen/geo-glossar/crawl-budget/)).
