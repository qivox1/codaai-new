---
title: "LLM Visibility Tracking"
shortDefinition: "LLM Visibility Tracking ist die Messung von KI-Sichtbarkeit: Prompts werden an KI-Systeme geschickt, die Antworten auf Erwähnung und Zitierung der Marke ausgewertet — als Wahrscheinlichkeit über viele Durchläufe, nicht als Position."
synonyms: ["AI Visibility Tracking", "KI-Sichtbarkeitsmessung", "Prompt Tracking"]
category: messung
related: ["promptset", "mention-rate", "citation-rate", "share-of-ai-search", "nullmessung", "logfiles"]
pubDate: 2026-09-03
faq:
  - q: "Warum liefert LLM Visibility Tracking keine Position wie ein Rank Tracker?"
    a: "Weil ein Sprachmodell generiert statt nachzuschlagen. Ein Rank Tracker schickt ein Keyword und bekommt eine reproduzierbare Liste mit Position 1 bis 100. Ein LLM-Tracker schickt einen Prompt und bekommt eine Antwort, die bei der nächsten Abfrage anders ausfällt. Messbar ist nur die Tendenz: In wie viel Prozent der Durchläufe wird die Marke genannt?"
  - q: "Welche Datenquellen gibt es für LLM Visibility Tracking?"
    a: "Sechs: Logfiles mit den Zugriffen der LLM-User-Agents, der „Generative KI“-Report der Google Search Console für AI Overviews und AI Mode, der „AI Performance“-Report in Bing Webmaster Tools für Copilot, Referrer von KI-Chats in Analytics, dedizierte LLM-Visibility-Tools mit promptbasierten Analysen — und der eigene Zugriff auf die APIs der Modelle."
---

LLM Visibility Tracking ist die Messung, ob und wie oft eine Marke in den Antworten von KI-Systemen vorkommt. Ein festes Set an Prompts ([Promptset](/wissen/geo-glossar/promptset/)) wird regelmäßig an ChatGPT, Gemini, Perplexity und andere Systeme geschickt; jede Antwort wird darauf analysiert, ob die Marke erwähnt ([Mention](/wissen/geo-glossar/mention/)) oder als Quelle zitiert ([Citation](/wissen/geo-glossar/citation/)) wird. Das Ergebnis ist keine Position, sondern eine Wahrscheinlichkeit.

## Wie unterscheidet sich LLM Visibility Tracking vom SEO Rank Tracking?

| | SEO Rank Tracking | LLM Visibility Tracking |
|---|---|---|
| Wie wird gemessen? | Keyword an Suchmaschine; Ergebnis ist eine Liste mit Positionen 1–100 | Prompt an LLM; die synthetisierte Antwort wird auf Erwähnung/Zitierung analysiert |
| Wie stabil ist das Ergebnis? | Reproduzierbar: gleiches Keyword, gleicher Ort, gleiche Zeit ergibt weitgehend dieselbe Liste | Jede Anfrage ist einmalig; Stochastik und Personalisierung ändern die Antwort bei jedem Durchlauf |
| Was wird gemessen? | Objektive Position in einem Index, absoluter Wert | Tendenz über viele Durchläufe, statistische Annäherung |
| Beispielhafte Erkenntnis | „Für Keyword X stehe ich auf Position Y in Google DE mobil." | „Im Themenbereich X werde ich in 40 % der Antworten zu meinen Stellvertreter-Prompts erwähnt." |

## Warum ist LLM Visibility Tracking wichtig?

Weil Traffic und Rankings die KI-Sichtbarkeit nicht abbilden: Die Entscheidung fällt in der Antwort, vor dem Klick. Ohne eigene Messung bleibt unsichtbar, ob eine Marke bei den Fragen ihrer Kunden vorkommt — und ob Maßnahmen wirken. Ein Einzelwert ist dabei wertlos; erst der Verlauf über Wochen und der Vergleich mit Wettbewerbern ([Share of AI Search](/wissen/geo-glossar/share-of-ai-search/)) ergeben ein Bild.

## Was bedeutet das für Ihre Website?

Legen Sie ein Promptset entlang der Customer Journey fest, führen Sie eine [Nullmessung](/wissen/geo-glossar/nullmessung/) durch und messen Sie danach regelmäßig — jede Frage mehrfach, in allen relevanten Systemen. Erheben Sie [Mention Rate](/wissen/geo-glossar/mention-rate/), [Citation Rate](/wissen/geo-glossar/citation-rate/) und [Sentiment](/wissen/geo-glossar/sentiment/), ergänzt um die Search-Console- und Bing-Reports und die [Logfiles](/wissen/geo-glossar/logfiles/). Das Digital Visibility Audit von CodaAI arbeitet nach genau diesem Muster mit firmenspezifischen Einkäuferfragen.
