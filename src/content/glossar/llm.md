---
title: "LLM (Large Language Model)"
seoTitle: "LLM – Large Language Model"
shortDefinition: "Ein LLM ist ein Sprachmodell, das für eine Folge von Tokens die Wahrscheinlichkeit des nächsten Tokens schätzt — es generiert Text, statt in einem Index nachzuschlagen."
synonyms: ["Large Language Model", "Sprachmodell", "KI-Modell"]
category: grundlagen
related: ["token", "modellwissen", "knowledge-cutoff", "embedding", "llm-visibility-tracking"]
pubDate: 2026-09-03
faq:
  - q: "Warum antwortet ein LLM auf dieselbe Frage jedes Mal anders?"
    a: "Weil ein LLM Wahrscheinlichkeiten zieht, keine Datensätze. Bei jedem Durchlauf wird aus den wahrscheinlichsten Fortsetzungen gewählt, mit einem Zufallsanteil. Zwei Antworten direkt nacheinander sind deshalb nie identisch — das ist Teil des Systems, kein Fehler."
  - q: "Kennt ein LLM meine Website?"
    a: "Nur, wenn sie in den Trainingsdaten vorkam oder das System sie bei einer Websuche live abruft. Ob eine Domain im Modellwissen liegt, lässt sich mit Prüfwerkzeugen für Common Crawl ungefähr nachvollziehen; sicher ist nur die Abfrage im Modell selbst."
---

Ein LLM (Large Language Model) ist ein Sprachmodell, dessen Kernfunktion darin besteht, die Wahrscheinlichkeit zu schätzen, mit der ein [Token](/wissen/geo-glossar/token/) auf eine Folge anderer Tokens folgt. Auf den Satzanfang „Wenn ich morgens aufwache, trinke ich als erstes …" schätzt ein Modell zum Beispiel „Kaffee" mit 18 %, „Wasser" mit 9 %, „Tee" mit 4 %. Aus solchen Schätzungen entsteht Wort für Wort eine Antwort.

## Wie funktioniert ein LLM?

Ein LLM liest nicht in einem Index nach, sondern generiert. Sein Wissen liegt als [Modellwissen](/wissen/geo-glossar/modellwissen/) in Milliarden Parametern, die beim Training aus Texten gelernt wurden: Webseiten, Bücher, Wikipedia, Foren, Code. Was nach dem [Knowledge Cut-off](/wissen/geo-glossar/knowledge-cutoff/) passiert ist, kennt das Modell nicht — dafür braucht es eine [Websuche](/wissen/geo-glossar/websuche/), deren Ergebnisse als Kontext mitgegeben werden.

Weil ein LLM Wahrscheinlichkeiten zieht, ist Stochastik Teil des Systems. Dieselbe Frage direkt zweimal gestellt ergibt zwei verschiedene Antworten. Für die Messung von KI-Sichtbarkeit hat das eine Konsequenz: Ein Einzelwert sagt nichts, nur die Tendenz über viele Durchläufe trägt.

## Warum ist das Verständnis von LLMs für die KI-Sichtbarkeit wichtig?

Wer versteht, dass ein LLM generiert statt nachzuschlagen, versteht drei Dinge, die in der Praxis zählen. Erstens gibt es keine „Position 1" in einer KI-Antwort, nur eine Wahrscheinlichkeit, genannt zu werden. Zweitens entscheidet nicht die Website allein, sondern alles, was das Modell über eine Marke gelesen hat — auch auf Drittseiten. Drittens muss ein Inhalt in kleine, für sich verständliche Einheiten zerlegbar sein, weil das Modell Passagen verarbeitet, nicht Seiten.

## Was bedeutet das für Ihre Website?

Schreiben Sie so, dass ein Modell Sätze einzeln verwenden kann: klare Definitionen, kurze Sätze, konkrete Namen statt vager Sammelbegriffe. Und erwarten Sie keine reproduzierbare Position — messen Sie mit einem festen [Promptset](/wissen/geo-glossar/promptset/) über viele Durchläufe, wie oft Ihr Unternehmen genannt wird.
