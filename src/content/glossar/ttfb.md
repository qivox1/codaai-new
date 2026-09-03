---
title: "TTFB (Time to First Byte)"
seoTitle: "TTFB – Time to First Byte"
shortDefinition: "TTFB ist die Zeit vom Request bis zum ersten Byte der Server-Antwort. Für LLM-Crawler gilt ein Richtwert unter 500 bis 800 Millisekunden — sonst wird der Abruf abgebrochen, ohne Wiederholung."
synonyms: ["Time to First Byte", "Server-Antwortzeit", "Server Response Time"]
category: technik
related: ["llm-crawler", "crawl-budget", "url-discovery"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Warum ist die TTFB für KI-Crawler kritischer als für Google?"
    a: "Googlebot ist geduldig und kommt wieder. LLM-Crawler, insbesondere die Live-Agenten während einer Antwort, haben ein enges Zeitfenster: Die Antwort an den Nutzer soll in Sekunden stehen. Antwortet der Server zu langsam, wird der Request abgebrochen und nicht wiederholt — die Seite fällt für diese Antwort aus."
  - q: "Wie messe ich die TTFB meiner Website?"
    a: "Mit PageSpeed Insights oder WebPageTest, im Browser über die Netzwerkanalyse, oder per Kommandozeile mit curl und der Angabe time_starttransfer. Messen Sie mehrere Seiten und Tageszeiten — eine TTFB, die unter Last steigt, ist genau das Problem, das Crawler treffen."
---

TTFB (Time to First Byte) ist die Zeitspanne zwischen dem Absenden eines Requests und dem Eintreffen des ersten Bytes der Antwort. Sie misst, wie schnell der Server reagiert, bevor überhaupt Inhalt übertragen wird: DNS-Auflösung, Verbindungsaufbau, Verarbeitung auf dem Server, erstes Byte. Für [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) ist die TTFB kritischer als für klassische Suchmaschinen.

## Wie wirkt die TTFB auf KI-Crawler?

Ein Live-Agent, der während einer KI-Antwort Seiten abruft, arbeitet unter Zeitdruck: Der Nutzer wartet auf die Antwort. Antwortet ein Server zu langsam, bricht der Agent den Request ab — und führt keinen Retry durch. Als Richtwert nennt Chrissy Kunisch (ONE Beyond Search) beim SISTRIX Meetup im September 2026 eine TTFB unter 500 bis 800 Millisekunden. Für Trainings-Crawler gilt Ähnliches in abgeschwächter Form: Langsame Hosts bekommen weniger Abrufe je Zeiteinheit ([Crawl-Budget](/wissen/geo-glossar/crawl-budget/)).

## Warum ist die TTFB für die KI-Sichtbarkeit wichtig?

Weil eine Seite, deren Abruf abgebrochen wird, für diese Antwort nicht existiert — unabhängig davon, wie gut ihr Inhalt ist. Bei klassischem SEO kostet eine langsame TTFB Rankingpunkte; bei der KI-Suche kostet sie den Auftritt in der konkreten Antwort. Deshalb steht die TTFB zusammen mit dem JavaScript-Rendering ganz oben auf der Liste der technischen Faktoren, die bei GEO noch kritischer sind als bei SEO.

## Was bedeutet das für Ihre Website?

Messen Sie die TTFB Ihrer wichtigsten Seiten, auch unter Last. Typische Hebel sind serverseitiges Caching, ein CDN, ein schlankeres Backend und statisch ausgelieferte Seiten. Ein Blogartikel bei CodaAI beschreibt, wie Serverleistung und AI-Crawler zusammenhängen: [AI-Crawler und Server-Performance](/blog/ai-crawler-server-performance-geo/). Prüfen Sie zusätzlich, ob Ihre Inhalte ohne JavaScript im HTML stehen — die beiden Faktoren treten meist gemeinsam auf.
