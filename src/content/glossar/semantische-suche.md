---
title: "Semantische Suche"
seoTitle: "Semantische Suche: Definition"
seoDescription: "Semantische Suche erklärt: wie die Suche nach Bedeutung funktioniert, was sie von der Keyword-Suche unterscheidet und wie Sie Texte für sie richtig aufbauen."
shortDefinition: "Semantische Suche ist ein Suchverfahren, das Treffer nach ihrer Bedeutung statt nach Wortgleichheit findet. Anfrage und Texte werden als Embeddings verglichen, sodass auch Abschnitte ohne gemeinsame Wörter passen."
synonyms: ["Semantic Search", "Bedeutungsbasierte Suche", "Vektorsuche", "Dense Retrieval"]
category: pipeline
related: ["embedding", "kosinus-aehnlichkeit", "hybrid-retrieval", "vektordatenbank", "entitaet", "semantisches-chunking"]
pubDate: 2026-10-05
faq:
  - q: "Was unterscheidet die semantische Suche von der Keyword-Suche?"
    a: "Die Keyword-Suche zählt übereinstimmende Wörter. Die semantische Suche vergleicht Bedeutungen, die als Embeddings berechnet werden. Sie findet deshalb auch Texte, die die Frage mit ganz anderen Worten beantworten, übersieht aber manchmal exakte Begriffe wie Artikelnummern."
  - q: "Nutzt Google eine semantische Suche?"
    a: "Google beschreibt mehrere Systeme, die Bedeutung statt nur Wörter abgleichen: RankBrain seit 2015, Neural Matching seit 2018 und BERT seit 2019 (Pandu Nayak, Google, Februar 2022). Für seine KI-Funktionen nennt Google außerdem Retrieval-Augmented Generation auf Basis der zentralen Ranking-Systeme."
  - q: "Macht die semantische Suche Keywords überflüssig?"
    a: "Nein. Viele Systeme kombinieren die semantische Suche mit einer Wortsuche wie BM25 (Hybrid Retrieval). Die Wortsuche ist überlegen, wenn exakte Begriffe zählen. Ein guter Abschnitt nennt deshalb den gesuchten Begriff wörtlich und erklärt ihn verständlich."
---

Semantische Suche ist ein Suchverfahren, das Treffer nach ihrer Bedeutung findet statt nach Wortgleichheit. Anfrage und Dokumente werden dazu als [Embeddings](/wissen/geo-glossar/embedding/) dargestellt, also als Zahlenvektoren, die ihre Bedeutung abbilden. Relevant ist, was inhaltlich nahe an der Frage liegt — auch wenn kein einziges Wort übereinstimmt.

## Wie funktioniert die semantische Suche?

Ein Embedding-Modell übersetzt jeden Textabschnitt in einen Vektor. Die Vektoren liegen meist in einer [Vektordatenbank](/wissen/geo-glossar/vektordatenbank/). Bei einer Suche wird auch die Anfrage mit demselben Modell in einen Vektor übersetzt. Dann ermittelt das System die Abschnitte, deren Vektoren dem Anfragevektor am nächsten liegen, gemessen etwa per [Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/).

Mike King (iPullRank) fasst das Prinzip so zusammen: Dokumente liegen als Embeddings in einem mehrdimensionalen Raum, und die Dokumente, deren Embedding dem der Anfrage am nächsten ist, gelten als die relevantesten.

## Wie unterscheiden sich semantische Suche und Keyword-Suche?

Die Keyword-Suche fragt: Welche Wörter haben Anfrage und Text gemeinsam? Die semantische Suche fragt: Was meinen Anfrage und Text? OpenAI zeigt den Unterschied in seiner [Dokumentation zur Retrieval-API](https://developers.openai.com/api/docs/guides/retrieval) an der Frage „When did we go to the moon?“ (Wann waren wir auf dem Mond?):

| Text (englisches Original) | Keyword-Ähnlichkeit | Semantische Ähnlichkeit |
|---|---|---|
| The first lunar landing occurred in July of 1969. | 0 % | 65 % |
| The first man on the moon was Neil Armstrong. | 27 % | 43 % |
| When I ate the moon cake, it was delicious. | 40 % | 28 % |

Die beste Antwort enthält kein einziges Wort der Frage und hat trotzdem die höchste semantische Ähnlichkeit. Der Satz über den Mondkuchen teilt die meisten Wörter mit der Frage und ist als Antwort wertlos. Die Keyword-Ähnlichkeit misst OpenAI dabei als Anteil gemeinsamer Wörter (Intersection over Union), die semantische per Kosinus-Ähnlichkeit (OpenAI-Dokumentation, Stand Oktober 2026).

Die semantische Suche hat auch eine Schwäche: Exakte Zeichenfolgen wie Typenbezeichnungen oder Fehlercodes trifft sie weniger zuverlässig. Deshalb kombinieren viele Systeme beide Verfahren ([Hybrid Retrieval](/wissen/geo-glossar/hybrid-retrieval/)).

## Seit wann sucht Google nach Bedeutung?

Google gleicht schon lange nicht mehr nur Wörter ab. Pandu Nayak (Google) beschrieb im Februar 2022 drei Stufen: RankBrain ab 2015 verstand, wie Wörter mit Konzepten zusammenhängen. Neural Matching ab 2018 verstand, wie Anfragen mit Seiten zusammenhängen. BERT ab 2019 verstand, wie Wortkombinationen Bedeutung und Absicht ausdrücken.

Sein Beispiel für RankBrain: Die Frage nach dem Titel des Konsumenten an der Spitze einer Nahrungskette führt zu „apex predator“ (Spitzenprädator), obwohl der Begriff in der Frage nicht vorkommt.

## Warum ist die semantische Suche für die KI-Sichtbarkeit wichtig?

KI-Systeme suchen nach Themen, nicht nach Adressen. Jairo Guerrero beschreibt im Gespräch mit dem Tool-Anbieter AirOps, dass die Vektorsuche keine bestimmten URLs aufgreift, sondern Themen und [Entitäten](/wissen/geo-glossar/entitaet/), die zur ursprünglichen Anfrage passen (AirOps, Juli 2026). Ein Abschnitt wird gefunden, wenn seine Bedeutung zur Frage passt.

iPullRank argumentiert in seinem AI Search Manual, dass bei GEO die Keyword-Dichte weniger zählt als Klarheit, Relevanz und die Frage, wie gut sich ein Inhalt im Vektorraum abbildet. Wer dasselbe Wort zehnmal wiederholt, rückt nicht näher an die Frage. Wer sie präzise beantwortet, schon.

## Was bedeutet das für Ihre Website?

Schreiben Sie für die Bedeutung, ohne die Begriffe zu verlieren. Drei Regeln helfen:

- **Synonyme und Varianten** — Nennen Sie den Fachbegriff wörtlich und erklären Sie ihn mit den Worten Ihrer Kunden. So passt der Abschnitt zur Wortsuche und zur Bedeutungssuche.
- **Entitäten klar benennen** — Produkte, Personen, Orte und Normen mit vollem Namen nennen, nicht nur mit „es“ oder „unser System“.
- **Ein Thema je Absatz** — Ein Absatz mit einem Thema liegt im Vektorraum näher an der passenden Frage als ein Absatz mit zweien ([Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/)).

Prüfen Sie zusätzlich, ob Ihre Seiten die verwandten Fragen eines Themas abdecken ([Query Coverage](/wissen/geo-glossar/query-coverage/)). Die semantische Suche belohnt Inhalte, die die gestellte Frage beantworten — nicht Inhalte, die nur ihre Wörter enthalten.
