---
title: "llms.txt"
shortDefinition: "llms.txt ist eine vorgeschlagene Textdatei im Stammverzeichnis einer Website, die Sprachmodellen eine kuratierte Übersicht der wichtigsten Inhalte bietet. Ein messbarer Effekt auf KI-Zitierungen ist bisher nicht nachgewiesen."
synonyms: ["llms-full.txt", "LLMs.txt-Standard"]
category: content
related: ["llm-crawler", "index-management", "url-discovery", "ki-freundliche-formate"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Soll ich eine llms.txt anlegen?"
    a: "Sie schadet nicht und kostet wenig — als knappe, gepflegte Übersicht mit Kernaussagen und Links. Erwarten Sie aber keinen Sichtbarkeitseffekt: Auswertungen über hunderttausende Domains zeigen keinen Zusammenhang zwischen llms.txt und KI-Zitierungen. Die Grundlagen — Crawlbarkeit, Rankings, extrahierbare Passagen — wirken, die Datei allein nicht."
  - q: "Was ist der Unterschied zwischen llms.txt und llms-full.txt?"
    a: "llms.txt ist die kuratierte Kurzfassung: Was ist die Website, welche Seiten sind wichtig, was sind die Kernaussagen. llms-full.txt enthält die vollständigen Texte der Seiten in einer Datei, damit ein System sie ohne Crawling einlesen könnte. Beide setzen voraus, dass ein System sie überhaupt abruft."
---

llms.txt ist eine vorgeschlagene Konvention: eine Markdown-Datei unter `/llms.txt`, die Sprachmodellen eine kuratierte Zusammenfassung der Website liefert — Beschreibung, wichtigste Seiten mit Kurzerklärung, Kernaussagen. Eine Ergänzung, `llms-full.txt`, enthält die vollständigen Texte. Die Idee lehnt sich an robots.txt an, ist aber kein Standard, den KI-Anbieter verbindlich lesen.

## Wie funktioniert llms.txt?

Die Datei liegt im Stammverzeichnis und ist für jeden abrufbar. Sie beschreibt in einfachem Markdown, was die Website ist, welche Seiten wofür stehen und welche Aussagen belastbar sind. Ein System, das die Datei liest, bekommt damit einen Überblick, ohne die Website crawlen zu müssen. Ob und wie die großen KI-Anbieter die Datei tatsächlich verwenden, ist nicht dokumentiert. Analysen über große Domain-Mengen — etwa die Auswertung von 300.000 Domains, über die das Search Engine Journal berichtet hat, und Experimente von otterly.ai und promptwatch — finden keinen messbaren Effekt auf KI-Zitierungen. SISTRIX ordnet die Datei in seinen KI-Grundlagen entsprechend ein.

## Warum ist llms.txt für die KI-Sichtbarkeit relevant?

Vor allem als Beispiel dafür, was nicht wirkt, solange die Grundlagen fehlen. Eine llms.txt ersetzt keine Rankings, keine crawlbaren Seiten und keine extrahierbaren Passagen. Sie kann nützlich sein, wenn ein Agent eine Website gezielt erkundet, und sie kostet fast nichts. Aber wer sie als GEO-Maßnahme mit Wirkung einplant, überschätzt sie.

## Was bedeutet das für Ihre Website?

Legen Sie eine llms.txt an, wenn Sie ohnehin eine gepflegte Übersicht Ihrer Kernaussagen haben — knapp, aktuell, ohne Werbesprache, mit denselben Zahlen wie auf der Website. Halten Sie sie synchron mit Ihrer Positionierung; eine veraltete Datei, die noch das Angebot von vor zwei Jahren beschreibt, ist schlechter als keine. Investieren Sie die eigentliche Zeit in Crawlbarkeit ([LLM-Crawler](/wissen/geo-glossar/llm-crawler/)), Indexierung und Content auf Absatzebene.
