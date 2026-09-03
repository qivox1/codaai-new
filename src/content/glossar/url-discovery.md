---
title: "URL Discovery"
shortDefinition: "URL Discovery ist die Frage, ob Crawler den relevanten Content einer Website überhaupt finden: über HTML-Links, eine aktuelle Sitemap und ohne Click- oder Login-Walls vor wichtigen Inhalten."
synonyms: ["Auffindbarkeit von URLs", "Crawlbarkeit", "Interne Verlinkung"]
category: technik
related: ["crawl-budget", "index-management", "llm-crawler", "ki-freundliche-formate"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Warum sind HTML-Links für URL Discovery entscheidend?"
    a: "Weil Crawler Links im HTML folgen — nicht Klick-Handlern in JavaScript, nicht Menüs, die erst nach einer Interaktion entstehen, nicht Buttons ohne href. Eine Seite, die nur über ein JavaScript-Menü erreichbar ist, existiert für einen LLM-Crawler nicht, weil er kein JavaScript ausführt."
  - q: "Zählen Login-Walls und Cookie-Banner als Hindernis für URL Discovery?"
    a: "Login-Walls ja: Was dahinter liegt, sieht kein Crawler. Cookie-Banner nicht, solange der eigentliche Inhalt im HTML steht und nicht erst nach der Einwilligung nachgeladen wird. Kritisch sind Click-Walls — „Mehr anzeigen“-Schaltflächen, hinter denen der Hauptinhalt liegt."
---

URL Discovery bezeichnet den ersten Schritt jeder Indexierung: Ein Crawler muss eine URL kennen, bevor er sie abrufen kann. Er lernt URLs über Links auf bereits bekannten Seiten und über die XML-Sitemap. Können Crawler den relevanten Content überhaupt finden? Das ist die Frage, die vor Crawl-Budget, Indexierung und Ranking steht.

## Wie funktioniert URL Discovery?

Ein Crawler beginnt bei bekannten URLs — der Startseite, der Sitemap — und folgt den HTML-Links, die er dort findet. Jede verlinkte Seite wird zur nächsten bekannten URL. Seiten ohne eingehenden HTML-Link sind Waisen: Sie werden nur gefunden, wenn sie in der Sitemap stehen, und selbst dann bewertet der Crawler sie als unwichtig, weil nichts auf sie zeigt. [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) führen kein JavaScript aus; Links, die erst per Skript entstehen, existieren für sie nicht.

Click-Walls und Login-Walls unterbrechen die Kette an anderer Stelle: Die URL ist bekannt, aber der Inhalt dahinter ist ohne Interaktion nicht erreichbar.

## Warum ist URL Discovery für die KI-Sichtbarkeit wichtig?

Weil sie das unterste Glied der Kette ist: URL Discovery, [Crawl Management](/wissen/geo-glossar/crawl-budget/), [Index-Management](/wissen/geo-glossar/index-management/), Verlinkung, Content-Qualität. Eine Leistungsseite, die nur über ein JavaScript-Menü erreichbar ist, wird von KI-Crawlern nicht entdeckt, nicht ins Training aufgenommen und bei einer Live-Antwort nicht abgerufen — unabhängig von ihrer Qualität.

## Was bedeutet das für Ihre Website?

Alle wichtigen Seiten müssen über HTML-Links erreichbar sein — aus der Navigation, aus verwandten Seiten, aus dem Footer. Halten Sie die Sitemap aktuell. Setzen Sie keine Click- oder Login-Walls vor Inhalte, die gefunden werden sollen. Und prüfen Sie den Linkgraph: Seiten mit nur einem eingehenden Link sind auch für Menschen kaum zu finden.
