---
title: "Grounding Budget"
shortDefinition: "Das Grounding Budget ist das Kontingent an Seiten und Passagen, das ein KI-System — vor allem Gemini — für das Grounding einer Antwort heranzieht. Gut rankende Seiten bekommen mehr davon."
synonyms: ["Grounding-Kontingent", "Grounding Chunks"]
category: grounding
related: ["grounding", "initial-retrieval", "document-relevance", "grounding-snippets"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Warum ist das Grounding Budget bei Gemini besonders relevant?"
    a: "Weil Gemini die Menge an Grounding-Material an das Ranking koppelt: Seiten, die für die Anfrage weit oben stehen, dürfen mehr Passagen beitragen. Ein gutes Google-Ranking ist für Gemini und die Google KI-Übersicht deshalb noch wichtiger als für andere Systeme."
  - q: "Kann ich das Grounding Budget beeinflussen?"
    a: "Nur indirekt — über das Ranking und über die Extrahierbarkeit der Passagen. Je höher die Position und je klarer die Abschnitte, desto größer der Anteil Ihrer Seite am Kontext, den das Modell für die Antwort bekommt."
---

Das Grounding Budget bezeichnet die begrenzte Menge an Seiten und Textpassagen, die ein KI-System für das [Grounding](/wissen/geo-glossar/grounding/) einer einzelnen Antwort heranzieht. Der Kontext eines Sprachmodells ist endlich, jede Passage kostet [Tokens](/wissen/geo-glossar/token/), und deshalb muss das System entscheiden, welche Quellen wie viel Raum bekommen.

## Wie funktioniert das Grounding Budget?

Nach dem [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) liegt eine Liste von Kandidatenseiten vor. Das System verteilt sein Budget entlang dieser Liste: Weit oben platzierte Seiten dürfen mehr Passagen beitragen, weiter unten platzierte weniger oder gar keine. Bei Gemini ist dieser Zusammenhang besonders deutlich — das Ranking bestimmt, wie viel Grounding-Material eine Domain liefern darf. Analysen von dejan.ai zur Größe von Googles Grounding Chunks und Beiträge von growth.pro zum Google AI Grounding Budget beschreiben diesen Mechanismus im Detail.

## Warum ist das Grounding Budget für die KI-Sichtbarkeit wichtig?

Es erklärt, warum die Position innerhalb der Top-Ergebnisse weiterhin zählt, obwohl KI-Antworten keine Trefferliste zeigen. Platz eins und Platz acht kommen beide in den Kandidaten-Pool — aber Platz eins bekommt mehr Budget und damit eine höhere Wahrscheinlichkeit, mit einer passenden Passage zitiert zu werden. Für Gemini und die Google KI-Übersicht ist ein gutes Google-Ranking deshalb wichtiger, nicht weniger wichtig.

## Was bedeutet das für Ihre Website?

Arbeiten Sie weiter an der Position, nicht nur an der Präsenz auf Seite eins. Und sorgen Sie dafür, dass das Budget, das Ihre Seite bekommt, nicht an Einleitungen und Werbetext verschwendet wird: Die Passagen, die extrahiert werden, sollen die Frage beantworten. Wie eine solche Passage aussieht, beschreibt der Begriff [Grounding Snippets](/wissen/geo-glossar/grounding-snippets/).
