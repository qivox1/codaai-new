---
title: "AI Overview Citation Rate"
shortDefinition: "Die AI Overview Citation Rate misst, wie oft eine Seite in Googles KI-Übersichten (AI Overviews) als Quelle erscheint — beobachtbar über den „Generative KI“-Report der Search Console."
synonyms: ["AIO Citation Rate", "KI-Übersicht-Zitierrate", "AI Overviews Sichtbarkeit"]
category: messung
related: ["citation-rate", "grounding", "logfiles", "document-relevance", "grounding-budget"]
pubDate: 2026-09-03
faq:
  - q: "Wo sehe ich meine AI Overview Citation Rate?"
    a: "In der Google Search Console im Report „Generative KI“ (Beta), der Impressionen und Klicks für AI Overviews und AI Mode ausweist. Dedizierte LLM-Visibility-Tools messen zusätzlich über eigene Prompts, ob und an welcher Stelle eine Domain in KI-Übersichten zitiert wird."
  - q: "Warum tauchen AI Overviews nicht in meinen Server-Logs auf?"
    a: "Weil Google für AI Overviews und AI Mode in der Regel keinen Live-Abruf der Seite durchführt, sondern auf seinen bestehenden Index zugreift. Ein Logfile zeigt deshalb keine Zugriffe — die Zitierung ist trotzdem da. Für diese Systeme sind Search Console und Prompt-Tracking die einzigen Datenquellen."
---

Die AI Overview Citation Rate ist die Häufigkeit, mit der eine Seite in den KI-Übersichten von Google — den AI Overviews oberhalb der klassischen Suchergebnisse und im AI Mode — als Quelle angezeigt wird. Sie ist der Spezialfall der [Citation Rate](/wissen/geo-glossar/citation-rate/) für das System mit der größten Reichweite im deutschen Markt, und sie ist die einzige KI-Zitierung, die sich direkt in einem Google-eigenen Werkzeug beobachten lässt.

## Wie wird die AI Overview Citation Rate gemessen?

Über zwei Wege. Die Google Search Console weist im Report „Generative KI" (Beta) Impressionen und Klicks aus AI Overviews und AI Mode aus — Google ordnet diese Kennzahl deshalb noch dem klassischen Search-Reporting zu. Dedizierte Tracking-Tools ergänzen den Blick über eigene Prompts: Sie stellen die Fragen des [Promptsets](/wissen/geo-glossar/promptset/) bei Google, prüfen, ob eine KI-Übersicht erscheint, und werten aus, welche Quellen sie zitiert und an welcher Position.

Was nicht funktioniert: [Logfiles](/wissen/geo-glossar/logfiles/). Bei AI Overviews und AI Mode findet in der Regel kein Live-Zugriff auf die Seite statt; Google greift auf seinen Index zu.

## Warum ist die AI Overview Citation Rate für die KI-Sichtbarkeit wichtig?

Weil Googles KI-Übersichten den Übergang zwischen klassischer Suche und KI-Antwort markieren: Sie erscheinen bei einem wachsenden Teil der Suchanfragen, verdrängen die Trefferliste nach unten und nennen wenige Quellen. Eine Seite, die für eine Anfrage auf Position drei rankt, aber in der KI-Übersicht darüber nicht zitiert wird, verliert einen Teil der Klicks, die sie früher bekam. Für Gemini und die KI-Übersicht gilt zudem das [Grounding Budget](/wissen/geo-glossar/grounding-budget/): Je besser das Google-Ranking, desto mehr Raum in der Übersicht.

## Was bedeutet das für Ihre Website?

Aktivieren Sie den „Generative KI"-Report in der Search Console und beobachten Sie, welche Seiten in KI-Übersichten Impressionen erhalten. Vergleichen Sie mit den Prompts Ihres Sets: Erscheint bei Ihren Kernfragen eine KI-Übersicht, und werden Sie darin zitiert? Wo eine Übersicht erscheint und Sie fehlen, obwohl Sie ranken, liegt das Problem auf Passagenebene ([Re-Ranking](/wissen/geo-glossar/re-ranking/)) — nicht beim Ranking.
