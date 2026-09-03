---
title: "LLM-Crawler"
shortDefinition: "LLM-Crawler sind die Bots der KI-Anbieter — GPTBot, ClaudeBot, ChatGPT-User, PerplexityBot, CCBot und andere —, die Webseiten für das Training oder für den Live-Abruf einer Antwort besuchen. Sie rendern kein JavaScript."
synonyms: ["AI User Agents", "KI-Bots", "GPTBot", "ClaudeBot"]
category: technik
related: ["common-crawl", "ttfb", "crawl-budget", "logfiles", "url-discovery"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Welche LLM-Crawler sollte ich in der robots.txt erlauben?"
    a: "Mindestens GPTBot und ChatGPT-User (OpenAI), ClaudeBot und anthropic-ai (Anthropic), PerplexityBot, Google-Extended und CCBot (Common Crawl). Aktuelle Listen der AI User Agents führt unter anderem das Search Engine Journal. Wer einen dieser Bots sperrt, hält seine Inhalte aus dem jeweiligen System heraus."
  - q: "Warum rendern LLM-Crawler kein JavaScript?"
    a: "Weil das Rendern teuer ist und die Anbieter Milliarden Seiten verarbeiten. Die Crawler lesen das ausgelieferte HTML. Inhalte, die erst im Browser per JavaScript entstehen, sehen sie nicht — für sie ist die Seite leer. Wichtige Inhalte müssen deshalb serverseitig im HTML stehen."
---

LLM-Crawler sind die User Agents, mit denen KI-Anbieter Webseiten abrufen. Es gibt zwei Arten: Trainings-Crawler wie GPTBot, ClaudeBot oder CCBot sammeln Inhalte für das [Modellwissen](/wissen/geo-glossar/modellwissen/) künftiger Modelle. Abruf-Agenten wie ChatGPT-User oder PerplexityBot holen eine Seite live, wenn ein System bei einer Antwort eine [Websuche](/wissen/geo-glossar/websuche/) durchführt. Beide lesen das ausgelieferte HTML — und keiner von ihnen führt JavaScript aus.

## Wie funktionieren LLM-Crawler?

Ein LLM-Crawler ruft eine URL ab, liest das HTML, extrahiert den Text und folgt Links, wenn er dafür konfiguriert ist. Er beachtet die robots.txt und lässt sich darüber gezielt sperren oder erlauben. Er wartet nicht auf nachgeladene Inhalte, rendert keine Skripte und wiederholt einen Abruf nicht, wenn der Server zu langsam antwortet — Chrissy Kunisch (ONE Beyond Search) nennt beim SISTRIX Meetup im September 2026 eine [TTFB](/wissen/geo-glossar/ttfb/) unter 500 bis 800 Millisekunden als Richtwert, oberhalb dessen Requests abgebrochen werden.

Ein Abruf im Logfile bedeutet dabei noch keine Sichtbarkeit: Der Agent validiert eine Seite als Kandidaten, er zitiert sie nicht deshalb ([Logfiles](/wissen/geo-glossar/logfiles/)).

## Warum sind LLM-Crawler für die KI-Sichtbarkeit wichtig?

Sie sind der einzige Weg, auf dem Ihre Inhalte in ein KI-System gelangen — ins Training oder in eine Live-Antwort. Was ein Crawler nicht abrufen, nicht lesen oder nicht rechtzeitig laden kann, existiert für das System nicht. Deshalb ist die Technik das Eintrittsticket: Sie bringt eine Seite ins Rennen, entscheidet aber nicht, ob sie gewinnt.

## Was bedeutet das für Ihre Website?

Prüfen Sie Ihre robots.txt auf gesperrte KI-Bots. Liefern Sie wichtige Inhalte serverseitig im HTML aus, nicht per JavaScript. Halten Sie die Antwortzeit des Servers niedrig und den DOM schlank. Vermeiden Sie Click- und Login-Walls vor Inhalten, die gefunden werden sollen. Und werten Sie Ihre Logfiles nach AI User Agents aus, um zu sehen, welche Seiten die Systeme tatsächlich abrufen — mit der Einschränkung, dass Google AI Overviews und AI Mode in der Regel keinen Live-Abruf erzeugen.
