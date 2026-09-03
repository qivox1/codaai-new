---
title: "Common Crawl"
shortDefinition: "Common Crawl ist ein gemeinnütziges, frei verfügbares Archiv des Internets mit über 300 Milliarden Webseiten aus 19 Jahren — und eine der Hauptquellen für das Training von KI-Modellen."
synonyms: ["CCBot", "Common-Crawl-Datensatz"]
category: grundlagen
related: ["modellwissen", "llm-crawler", "knowledge-cutoff"]
pubDate: 2026-09-03
faq:
  - q: "Wie prüfe ich, ob meine Seite im Common Crawl ist?"
    a: "Über den Common-Crawl-Index (index.commoncrawl.org) lässt sich eine Domain direkt abfragen. Einfacher sind Prüfwerkzeuge wie der Common Crawl Index Checker von dhemant.consulting oder der AI Training Data Checker von centium.ai, die dieselben Daten aufbereiten."
  - q: "Sollte ich den Common-Crawl-Bot blocken?"
    a: "Nur, wenn Sie bewusst nicht in Trainingsdaten vorkommen wollen. Der Bot heißt CCBot. Wer ihn in der robots.txt sperrt, hält seine Inhalte aus einer der wichtigsten Trainingsquellen heraus — und damit aus dem Modellwissen künftiger Modelle."
---

Common Crawl ist eine gemeinnützige Organisation, die monatlich Milliarden von Webseiten crawlt und die Rohdaten als offenes Archiv bereitstellt. Das Archiv umfasst über 300 Milliarden Webseiten aus 19 Jahren. Es ist eine der wichtigsten Quellen, aus denen KI-Anbieter das [Modellwissen](/wissen/geo-glossar/modellwissen/) ihrer Sprachmodelle trainieren.

## Wie funktioniert Common Crawl?

Der Crawler von Common Crawl, der CCBot, besucht Webseiten wie ein Suchmaschinen-Crawler und speichert HTML, Metadaten und extrahierten Text in standardisierten Dateiformaten. Die Daten werden monatlich als neuer Snapshot veröffentlicht und sind für jeden kostenlos abrufbar. KI-Anbieter filtern und bereinigen diese Rohdaten, bevor sie in ein Training einfließen; Seiten mit wenig Text, Duplikaten oder schlechter Qualität fallen dabei häufig heraus.

## Warum ist Common Crawl für die KI-Sichtbarkeit wichtig?

Was nicht im Common Crawl steht, hat einen schweren Stand im Modellwissen. Eine Website, die den CCBot blockt, hinter Login-Walls liegt oder ihre Inhalte nur per JavaScript nachlädt, kommt in den Trainingsdaten nicht oder nur als leere Hülle vor. Umgekehrt gilt: Eine Seite im Common Crawl ist noch keine Garantie dafür, dass ein Modell ihre Inhalte gelernt hat — aber die Voraussetzung dafür.

## Was bedeutet das für Ihre Website?

Prüfen Sie, ob Ihre wichtigen URLs im Common-Crawl-Index vorkommen und ob der CCBot in Ihrer robots.txt erlaubt ist. Liefern Sie den Text Ihrer Seiten im HTML aus, nicht erst nach dem Rendern durch JavaScript, und halten Sie den Quelltext schlank — die Bereinigung der KI-Anbieter sortiert Seiten aus, bei denen Markup den Inhalt überwiegt. Wie Sie [LLM-Crawler](/wissen/geo-glossar/llm-crawler/) insgesamt richtig behandeln, steht im eigenen Begriff.
