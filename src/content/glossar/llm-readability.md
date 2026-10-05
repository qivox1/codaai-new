---
title: "LLM Readability"
seoTitle: "LLM Readability: Idee und Kritik"
seoDescription: "LLM Readability erklärt: Olaf Kopps Konzept mit seinen Zielwerten, die Kritik von Kai Spriestersbach und Google — und was davon für Ihre Texte belastbar ist."
shortDefinition: "LLM Readability ist ein 2024 von Olaf Kopp (Aufgesang) geprägtes Konzept: Inhalte sollen so formuliert und gegliedert sein, dass Sprachmodelle sie leicht verarbeiten und als Quelle zitieren."
synonyms: ["LLM-Lesbarkeit", "LLM Readability Optimization", "KI-Lesbarkeit", "LLM-Readability-Optimierung"]
category: content
related: ["chunking", "semantisches-chunking", "bottom-line-up-front", "information-gain", "citation-rate", "kosinus-aehnlichkeit"]
pubDate: 2026-10-05
faq:
  - q: "Sind Absätze unter 400 Zeichen für die LLM Readability notwendig?"
    a: "Belegt ist das nicht. Die 400 Zeichen sind eine Vorgabe aus Olaf Kopps Konzept. Kai Spriestersbach findet in den zitierten Quellen keine Grundlage für diesen Wert, und Google schreibt, dass Inhalte nicht in kleine Stücke zerlegt werden müssen. Entscheidend ist, dass ein Absatz für sich verständlich ist."
  - q: "Gibt es einen verlässlichen Score für LLM Readability?"
    a: "Nein. Aufgesang hat einen eigenen LLM-Lesbarkeitsindex entwickelt, es gibt aber keine standardisierte Definition und keinen validierten Score, so Kai Spriestersbach (August 2026). Messen Sie die Wirkung deshalb an der Zitierung in KI-Antworten, nicht an einem Score."
---

LLM Readability (deutsch: LLM-Lesbarkeit) ist ein Konzept, das Olaf Kopp (Aufgesang) 2024 als Teildisziplin der [GEO](/wissen/geo-glossar/geo/) entwickelt hat. Es beschreibt, wie gut große Sprachmodelle Inhalte verarbeiten und verstehen können, und zielt darauf, dass Passagen häufiger als Quelle zitiert werden. Der Begriff ist umstritten: Kritiker wie Kai Spriestersbach halten die Grundidee für brauchbar, die konkreten Zielwerte für unbelegt.

## Was versteht Olaf Kopp unter LLM Readability?

Aufgesang nennt sieben Schlüsselfaktoren: Qualität der Sprache, Strukturierung, Relevanz der einzelnen Textabschnitte, Übereinstimmung mit der Nutzerabsicht, Informationshierarchie nach der Minto-Pyramide (Kernaussage zuerst), Kontextmanagement mit hoher Informationsdichte sowie Konsistenz und Spezifität (Aufgesang, Februar 2026). Daraus leitet das Konzept konkrete Zielwerte ab — als Vorgabe von Kopp, nicht als Forschungsergebnis:

- in sich geschlossene Absätze mit weniger als 400 Zeichen,
- eine Gesamtlänge von 1.200 bis 1.500 Wörtern,
- eine einheitliche Terminologie für alle Kernbegriffe und Entitäten.

Für die Messung hat Aufgesang einen eigenen LLM-Lesbarkeitsindex entwickelt. Kopp ordnet LLM Readability neben Brand Context Optimization und [Agentic Commerce](/wissen/geo-glossar/agentic-commerce/) Optimization ein und sieht sie vor allem für Publisher als relevant (Kopp, Juli 2026).

## Wie funktioniert LLM Readability laut dem Konzept?

Die Begründung stützt sich auf [Retrieval-Augmented Generation](/wissen/geo-glossar/retrieval-augmented-generation/): KI-Suchsysteme rufen Dokumente ab, extrahieren relevante Teile und geben sie dem Modell als Kontext. Gut strukturierte, informationsreiche Blöcke mit direkten Antworten werden nach Aufgesangs Darstellung eher ausgewählt und zitiert. Kurze, eigenständige Absätze sollen dabei den Zuschnitt der Abschnitte vorwegnehmen, die das System verarbeitet ([Chunking](/wissen/geo-glossar/chunking/)).

## Was kritisiert Kai Spriestersbach an LLM Readability?

Kai Spriestersbach hält den Begriff „als Denkrahmen brauchbar, als Rankingversprechen überzogen“ (AFAIK, August 2026). Er rechnet Aufgesang an, das Konzept offen als Eigenentwicklung zu kennzeichnen. Seine Einwände betreffen die Begründung:

| Punkt | Kopps Konzept | Gegenposition |
|---|---|---|
| Absatzlänge | unter 400 Zeichen | Keine Grundlage in den zitierten Quellen; dokumentierte Chunk-Größen von RAG-Produkten liegen bei 300 bis 1.024 Token (Spriestersbach) |
| Textlänge | 1.200–1.500 Wörter | „There's no ideal page length“ (Google, Juli 2026) |
| Wirkung von Format | Struktur erhöht Zitierchance | Im Experiment „What Gets Cited“ (SIGIR 2026, 252.000 Durchläufe, sechs Modelle) zeigten Formatfaktoren keinen konsistenten Effekt |
| Zerlegen in kleine Einheiten | eigenständige Kurzabschnitte | Danny Sullivan (Google) im Januar 2026: „We don't want you to do that“ |

Google formuliert es in seinem Leitfaden zur KI-Optimierung so: Es gibt keine Notwendigkeit, Inhalte in kleine Stücke zu zerlegen, weil Googles Systeme mehrere Themen auf einer Seite unterscheiden (Google Search Central, Juli 2026). Gute Gliederung lehnt Google dabei nicht ab — abgelehnt wird das Fragmentieren für Maschinen.

## Warum ist LLM Readability für die KI-Sichtbarkeit wichtig?

Beide Seiten teilen eine Annahme: Eine Passage wird nur zitiert, wenn sie herausgelöst verständlich ist. Der Streit dreht sich um Schwellenwerte und um die Frage, ob Format allein wirkt. Die stärksten belegten Hebel liegen beim Inhalt: Im GEO-Paper (KDD 2024) brachten Statistiken, Zitate und Quellenangaben die größten Effekte, reine Lesbarkeitsbearbeitungen deutlich weniger (eingeordnet von Spriestersbach, August 2026). Das spricht für [Information Gain](/wissen/geo-glossar/information-gain/) vor Formatkosmetik.

## Was bedeutet das für Ihre Website?

Übernehmen Sie, was belastbar ist, und lassen Sie die Zahlenvorgaben weg:

- **Ein Thema je Absatz:** Ein Test von Mike King (SparkToro Office Hours, Januar 2026) zeigt, dass ein Absatz mit einem Thema näher an der Suchanfrage liegt als einer mit zweien ([Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/)).
- **Selbsttragende Aussagen:** Jede zentrale Aussage nennt Entität, Wert und Kontext — ohne „wie oben beschrieben“.
- **Antwort zuerst:** die Kernaussage an den Anfang ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)).
- **Einheitliche Begriffe:** ein Name je Produkt, Leistung und Konzept.

Lesbarkeitsformeln wie Flesch oder die Wiener Sachtextformel taugen nach Spriestersbach nur als Leitplanke. Lassen Sie Texte von einem Modell vereinfachen, gleichen Sie die Aussagen jeder Fassung mit dem Original ab — Vereinfachungen kürzen Einschränkungen zuerst weg. Ob die Überarbeitung wirkt, zeigt die [Citation Rate](/wissen/geo-glossar/citation-rate/), kein Score.
