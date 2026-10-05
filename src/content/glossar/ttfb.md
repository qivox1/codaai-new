---
title: "TTFB (Time to First Byte)"
seoTitle: "TTFB – Time to First Byte"
seoDescription: "TTFB (Time to First Byte) erklärt: welcher Wert gut ist, wie Sie ihn messen und senken – und warum KI-Crawler langsame Server schneller aufgeben als Google."
shortDefinition: "TTFB ist die Zeit vom Request bis zum ersten Byte der Server-Antwort. Für LLM-Crawler gilt ein Richtwert unter 500 bis 800 Millisekunden — sonst wird der Abruf abgebrochen, ohne Wiederholung."
synonyms: ["Time to First Byte", "Server-Antwortzeit", "Server Response Time"]
category: technik
related: ["llm-crawler", "crawl-budget", "logfiles", "url-discovery"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
stufe: 1
faq:
  - q: "Warum ist die TTFB für KI-Crawler kritischer als für Google?"
    a: "Googlebot ist geduldig und kommt wieder. LLM-Crawler, insbesondere die Live-Agenten während einer Antwort, haben ein enges Zeitfenster: Die Antwort an den Nutzer soll in Sekunden stehen. Antwortet der Server zu langsam, wird der Request abgebrochen und nicht wiederholt — die Seite fällt für diese Antwort aus."
  - q: "Wie messe ich die TTFB meiner Website?"
    a: "Mit PageSpeed Insights oder WebPageTest, im Browser über die Netzwerkanalyse, oder per Kommandozeile mit curl und der Angabe time_starttransfer. Messen Sie mehrere Seiten und Tageszeiten — eine TTFB, die unter Last steigt, ist genau das Problem, das Crawler treffen."
  - q: "Ist die TTFB ein Core Web Vital?"
    a: "Nein. Die Core Web Vitals sind LCP, INP und CLS. Die TTFB geht ihnen voraus: Jede Millisekunde bis zum ersten Byte verzögert auch den Largest Contentful Paint. Google führt die TTFB deshalb als ergänzende Kennzahl, nicht als eigenes Bewertungskriterium."
---

TTFB (Time to First Byte) ist die Zeitspanne zwischen dem Absenden eines Requests und dem Eintreffen des ersten Bytes der Antwort. Sie misst, wie schnell der Server reagiert, bevor überhaupt Inhalt übertragen wird. Für [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) ist die TTFB kritischer als für klassische Suchmaschinen, weil sie langsame Abrufe abbrechen und nicht wiederholen.

## Welcher TTFB-Wert ist gut?

Google nennt in seiner Entwicklerdokumentation [web.dev](https://web.dev/articles/ttfb) eine TTFB von 0,8 Sekunden oder weniger als gut. Für KI-Crawler gilt ein strengerer Richtwert:

| Bewertung | Google (web.dev) | Richtwert für KI-Crawler |
|---|---|---|
| gut | bis 0,8 s | unter 0,5 bis 0,8 s |
| verbesserungswürdig | 0,8 bis 1,8 s | darüber droht der Abbruch |
| schlecht | über 1,8 s | Abruf scheitert häufig |

Den Richtwert für KI-Crawler nannte Chrissy Kunisch (ONE Beyond Search) beim SISTRIX Meetup im September 2026. Er gilt für jede Seite, die eine KI zitieren soll — nicht nur für die Startseite, und auch dann, wenn der Server unter Last steht.

## Woraus setzt sich die TTFB zusammen?

Die TTFB umfasst alles, was vor dem ersten Byte passiert. Google zählt dazu:

- **Weiterleitungen:** Jede Umleitung startet die Anfrage neu.
- **DNS-Abfrage:** Die Domain wird in eine IP-Adresse übersetzt.
- **Verbindungsaufbau und TLS:** Browser oder Crawler und Server handeln die verschlüsselte Verbindung aus.
- **Serververarbeitung:** Der Server baut die Seite — Datenbankabfragen, Templates, Plugins — und schickt das erste Byte.

Bei dynamischen Websites ist die Serververarbeitung meist der größte Posten. Statisch ausgelieferte oder zwischengespeicherte Seiten überspringen ihn fast vollständig.

## Wie wirkt die TTFB auf KI-Crawler?

Ein Live-Agent, der während einer KI-Antwort Seiten abruft, arbeitet unter Zeitdruck: Der Nutzer wartet auf die Antwort. Antwortet ein Server zu langsam, bricht der Agent den Request ab — und führt keinen Retry durch. Für Trainings-Crawler gilt Ähnliches in abgeschwächter Form: Langsame Hosts bekommen weniger Abrufe je Zeiteinheit ([Crawl-Budget](/wissen/geo-glossar/crawl-budget/)). Auch für KI-Agenten, die im Auftrag eines Nutzers Websites bedienen, empfiehlt Jessica Frederick (Sitebulb), die TTFB und die Größe der ausgelieferten Daten zu optimieren — Agenten haben wenig Geduld.

## Warum ist die TTFB für die KI-Sichtbarkeit wichtig?

Weil eine Seite, deren Abruf abgebrochen wird, für diese Antwort nicht existiert — unabhängig davon, wie gut ihr Inhalt ist. Bei klassischem SEO kostet eine langsame TTFB Rankingpunkte; bei der KI-Suche kostet sie den Auftritt in der konkreten Antwort. Deshalb steht die TTFB zusammen mit dem JavaScript-Rendering ganz oben auf der Liste der technischen Faktoren, die bei GEO noch kritischer sind als bei SEO.

## Wie misst man die TTFB?

Am schnellsten per Kommandozeile:

```bash
curl -o /dev/null -s -w "TTFB: %{time_starttransfer} s\n" https://www.ihre-domain.de/
```

Messen Sie mehrere Seiten und mehrmals am Tag. PageSpeed Insights zeigt zusätzlich die TTFB echter Besucher, sofern die Website genug Traffic hat. Prüfen Sie außerdem die Antwortzeiten, die KI-Crawler tatsächlich erleben: Sie stehen in den Server-[Logfiles](/wissen/geo-glossar/logfiles/), getrennt nach User-Agent. Ein Bot-Schutz, der Crawler erst auf eine Prüfseite umleitet, verlängert die TTFB für genau diese Besucher — oder sperrt sie ganz aus.

## Wie senkt man die TTFB?

Die wirksamsten Hebel, nach Aufwand geordnet:

1. **Seiten-Cache:** Fertig gebaute Seiten aus dem Zwischenspeicher ausliefern statt bei jedem Abruf neu zu erzeugen.
2. **Weiterleitungsketten auflösen:** Interne Links direkt auf die Ziel-URL setzen.
3. **CDN:** Inhalte von Servern in der Nähe des Abrufenden ausliefern.
4. **Backend entlasten:** Langsame Datenbankabfragen und überflüssige Plugins entfernen, aktuelle Server-Software einsetzen.
5. **Statische Auslieferung:** Seiten beim Veröffentlichen als fertiges HTML erzeugen. Die Serververarbeitung entfällt dann fast vollständig.

## Was bedeutet das für Ihre Website?

Messen Sie die TTFB Ihrer wichtigsten Seiten, auch unter Last, und vergleichen Sie sie mit dem Richtwert für KI-Crawler. Ein Blogartikel bei CodaAI beschreibt, wie Serverleistung und AI-Crawler zusammenhängen: [AI-Crawler und Server-Performance](/blog/ai-crawler-server-performance-geo/). Prüfen Sie zusätzlich, ob Ihre Inhalte ohne JavaScript im HTML stehen — die beiden Faktoren treten meist gemeinsam auf.
