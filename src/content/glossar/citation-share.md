---
title: "Citation Share"
seoTitle: "Citation Share: Bing-Kennzahl"
seoDescription: "Citation Share erklärt: was die Kennzahl im AI-Performance-Bericht der Bing Webmaster Tools misst, wie sie berechnet wird und wie Sie sie richtig lesen."
shortDefinition: "Citation Share ist eine Kennzahl im AI-Performance-Bericht der Bing Webmaster Tools. Sie zeigt, welchen Anteil aller Zitierungen zu einer Grounding Query Ihre Website in Copilot und den KI-Antworten von Bing erhält."
synonyms: ["Zitieranteil", "Zitationsanteil", "Bing Citation Share", "Citation-Share"]
category: messung
related: ["citation-rate", "share-of-ai-search", "citation", "promptset", "llm-visibility-tracking", "quellenanalyse"]
pubDate: 2026-10-05
faq:
  - q: "Wo finde ich den Citation Share in den Bing Webmaster Tools?"
    a: "Im Bericht „AI Performance“. Microsoft hat den Bericht im Februar 2026 als Public Preview gestartet und im Juni 2026 um Citation Share, Intents, Topics und eine Vergleichsfunktion erweitert. Sie brauchen dafür eine verifizierte Website in den Bing Webmaster Tools."
  - q: "Ist ein hoher Citation Share ein Ranking-Signal?"
    a: "Nein. Microsoft beschreibt Citation Share ausdrücklich als beobachtende Kennzahl, nicht als Ranking-System oder Wettbewerbstabelle. Sie zeigt weder Wettbewerber-Domains noch Traffic-Anteile und vergibt keine Qualitätsnoten."
  - q: "Was unterscheidet Citation Share von der Citation Rate?"
    a: "Citation Share misst Ihren Anteil an allen Zitierungen zu einer Grounding Query in Microsofts KI-Diensten. Die Citation Rate misst, in wie vielen Antworten eines eigenen Promptsets Ihre Seite überhaupt zitiert wird, über mehrere KI-Systeme hinweg."
---

Citation Share ist eine Kennzahl im Bericht „AI Performance“ der Bing Webmaster Tools. Sie gibt an, welchen Prozentsatz aller Zitierungen zu einer bestimmten Grounding Query Ihre Website erhält. Grundlage sind die KI-Antworten von Microsoft Copilot, von Bing und von ausgewählten Partnerdiensten (Microsoft Bing, Juni 2026).

## Wie wird Citation Share berechnet?

Microsoft definiert die Kennzahl so: Citation Share ist der Prozentsatz der Zitierungen, die Ihrer Website zugeordnet werden, an allen Zitierungen aller Websites für dieselbe Grounding Query (Microsoft Bing, Juni 2026). Eine Grounding Query ist die Suchphrase, die das KI-System intern verwendet, um Inhalte für eine Antwort abzurufen.

```text
Citation Share = Zitierungen Ihrer Website / alle Zitierungen zur selben Grounding Query × 100
```

Ein Rechenbeispiel mit angenommenen Werten: Zu einer Grounding Query zeigen die KI-Antworten im Zeitraum 40 Zitierungen. Sechs davon verweisen auf Ihre Website. Ihr Citation Share beträgt 15 %.

Die Gesamtzahl der Zitierungen zeigt, wie oft Ihre Inhalte vorkommen. Citation Share zeigt, wie viel vom verfügbaren Zitierraum zu einer Anfrage Sie belegen.

## Was zeigt der AI-Performance-Bericht der Bing Webmaster Tools?

Microsoft hat den Bericht im Februar 2026 als Public Preview gestartet. Er zeigt die Gesamtzahl der Zitierungen, die durchschnittliche Zahl zitierter Seiten pro Tag, die Grounding Queries und die Zitierungen je URL (Microsoft Bing, Februar 2026).

Im Juni 2026 kamen vier Funktionen hinzu (Microsoft Bing, Juni 2026):

- **Intents** ordnen Grounding Queries Kategorien zu, etwa informational, kommerziell, navigational oder lokal.
- **Topics** bündeln verwandte Anfragen zu Themenclustern.
- **Citation Share** zeigt Ihren Anteil am Zitierraum je Grounding Query.
- **Compare** legt einen früheren Zeitraum über den aktuellen.

Wichtig ist, was die Kennzahl nicht ist. Microsoft beschreibt Citation Share als beobachtende Kennzahl, „not a ranking system or a competitive scoreboard“. Sie zeigt keine Wettbewerber-Domains, keinen Traffic-Anteil und keine Qualitätsbewertung.

## Wie unterscheidet sich Citation Share von Citation Rate und Share of AI Search?

Die drei Kennzahlen klingen ähnlich, messen aber Verschiedenes:

| Kennzahl | Bezugsgröße | Datenquelle | Systeme |
|---|---|---|---|
| Citation Share | alle Zitierungen zu einer Grounding Query | Microsoft (First-Party) | Copilot, Bing, Partner |
| [Citation Rate](/wissen/geo-glossar/citation-rate/) | alle Antworten eines eigenen Promptsets | eigene Messung | beliebig viele |
| [Share of AI Search](/wissen/geo-glossar/share-of-ai-search/) | alle Nennungen und Zitierungen der Wettbewerber | eigene Messung | beliebig viele |

Citation Share beantwortet die Frage „Wie viel Raum bekomme ich bei dieser Anfrage?“. Die Citation Rate beantwortet „Werde ich bei meinen Kundenfragen überhaupt zitiert?“. Share of AI Search vergleicht Ihre Marke mit den Wettbewerbern.

## Warum ist Citation Share für die KI-Sichtbarkeit wichtig?

Die Daten kommen direkt vom Betreiber des KI-Systems. Aleyda Solís nannte den AI-Performance-Bericht im April 2026 die einzigen First-Party-Zitationsdaten eines KI-Ökosystems. Google zeigt in der Search Console inzwischen Impressionen aus [AI Overviews](/wissen/geo-glossar/ai-overviews/) und [AI Mode](/wissen/geo-glossar/ai-mode/), aber keine Zitieranteile je Anfrage.

Die Kennzahl zeigt außerdem, welche Seiten tragen. Claire Carlisle (Whitespark) stellte fest, dass bei den geprüften Websites nicht die Startseite, sondern tiefe Informationsseiten den höchsten Citation Share erzielten (Juli 2026). In den Grounding Queries fand sie sehr lange, gesprächsartige Anfragen.

## Was bedeutet das für Ihre Website?

Richten Sie die Bing Webmaster Tools ein, falls noch nicht geschehen. Der Bericht ist kostenlos und zeigt Zitierungen in Copilot ohne eigenes Tracking.

Werten Sie zuerst die Grounding Queries aus. Sie zeigen, mit welchen Formulierungen das System nach Inhalten sucht. Vergleichen Sie diese Formulierungen mit Ihrem [Promptset](/wissen/geo-glossar/promptset/) und ergänzen Sie fehlende Fragen.

Lesen Sie Citation Share danach je Thema. Ein niedriger Anteil bei einer wichtigen Grounding Query heißt: Andere Quellen belegen den Zitierraum. Welche das sind, zeigt der Bericht nicht — dafür brauchen Sie eine eigene [Quellenanalyse](/wissen/geo-glossar/quellenanalyse/).

Beachten Sie die Grenzen: Der Bericht deckt nur Microsofts KI-Dienste ab. Für ChatGPT, Gemini oder Perplexity brauchen Sie eigene Messungen.
