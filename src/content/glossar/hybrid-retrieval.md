---
title: "Hybrid Retrieval (BM25 und Embeddings)"
seoTitle: "Hybrid Retrieval einfach erklärt"
seoDescription: "Hybrid Retrieval erklärt: wie KI-Systeme BM25 und Embeddings kombinieren, was Reciprocal Rank Fusion leistet und was das für die Texte Ihrer Website bedeutet."
shortDefinition: "Hybrid Retrieval ist die Kombination aus lexikalischer Suche wie BM25 und semantischer Suche mit Embeddings. Beide Ergebnislisten werden zu einer Rangfolge vereint, die exakte Begriffe und Bedeutung zugleich berücksichtigt."
synonyms: ["Hybride Suche", "Hybrid Search", "BM25 plus Embeddings", "Lexikalisch-semantische Suche"]
category: pipeline
related: ["initial-retrieval", "re-ranking", "embedding", "semantische-suche", "vektordatenbank", "retrieval-augmented-generation"]
pubDate: 2026-10-05
faq:
  - q: "Welche Rolle spielt BM25 im Hybrid Retrieval?"
    a: "BM25 ist der lexikalische Teil. Die Funktion bewertet Dokumente nach exakter Wortübereinstimmung und findet deshalb zuverlässig Produktnamen, Normen und Kennungen, die ein Embedding-Modell übersehen kann. Die semantische Suche ergänzt die Treffer, die mit anderen Worten dasselbe meinen."
  - q: "Wie stark verbessert Hybrid Retrieval die Trefferquote?"
    a: "In einem Test von Anthropic sank die Fehlerrate beim Abruf der Top-20-Abschnitte von 5,7 Prozent auf 2,9 Prozent, als kontextualisierte Embeddings mit kontextualisiertem BM25 kombiniert wurden. Mit zusätzlichem Reranking waren es 1,9 Prozent (Anthropic, September 2024). Die Werte gelten für diesen Testaufbau, nicht für die Websuche."
  - q: "Nutzt ChatGPT Hybrid Retrieval?"
    a: "Für die ChatGPT-Suche hat OpenAI das nicht offiziell beschrieben. Der Tool-Anbieter Peec AI berichtet von einer BM25-Komponente neben einer Vektorsuche im Shopping-Bereich von ChatGPT (September 2026). In der eigenen Retrieval-API bietet OpenAI eine hybride Suche an, die beide Ergebnislisten per Reciprocal Rank Fusion vereint."
---

Hybrid Retrieval ist die Kombination aus lexikalischer Suche und semantischer Suche in einem Abrufschritt. Die lexikalische Suche, meist BM25, findet Dokumente über exakte Wortübereinstimmung. Die [semantische Suche](/wissen/geo-glossar/semantische-suche/) findet Dokumente über Bedeutungsnähe, gemessen an [Embeddings](/wissen/geo-glossar/embedding/). Beide Ergebnislisten werden zu einer gemeinsamen Rangfolge zusammengeführt.

## Was ist BM25?

BM25 (Best Matching 25, oft Okapi BM25 genannt) ist eine Ranking-Funktion für die lexikalische Suche. Sie bewertet, wie gut die Wörter eines Dokuments zu den Suchbegriffen passen. Stephen Robertson und Hugo Zaragoza haben das Verfahren 2009 in „The Probabilistic Relevance Framework: BM25 and Beyond“ umfassend beschrieben. Drei Faktoren bestimmen den Wert:

- **Termfrequenz** — Je öfter ein Suchbegriff im Dokument steht, desto höher der Wert. Die Wirkung sättigt aber: Jedes weitere Vorkommen bringt weniger zusätzliches Gewicht.
- **Inverse Dokumentfrequenz (IDF)** — Seltene Begriffe wiegen schwerer als Wörter, die in fast jedem Dokument stehen.
- **Dokumentlänge** — Lange Dokumente werden normalisiert, damit sie nicht allein wegen ihrer Länge mehr Treffer sammeln.

BM25 versteht keine Bedeutung. Dafür erkennt es exakte Zeichenfolgen zuverlässig. Anthropic nennt als Beispiel die Suche nach „Error code TS-999“ in einer technischen Datenbank: BM25 findet den exakten Treffer, den semantische Embeddings übersehen können (Anthropic, September 2024).

## Wie funktioniert Hybrid Retrieval?

Beide Suchen laufen parallel über dieselben Abschnitte. Anthropic beschreibt den Ablauf in seinem Beitrag zu [Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) (September 2024) so: Dokumente in Abschnitte zerlegen, die besten Abschnitte per BM25 und per Embedding-Ähnlichkeit ermitteln, beide Listen per Rank Fusion zusammenführen und Dubletten entfernen, die besten Abschnitte in den Prompt geben.

Ein verbreitetes Fusionsverfahren ist Reciprocal Rank Fusion (RRF), vorgestellt von Gordon Cormack, Charles Clarke und Stefan Büttcher auf der Konferenz SIGIR 2009. Jedes Dokument erhält je Ergebnisliste den Wert 1 / (k + Rang); die Werte werden addiert. Die Autoren setzen k = 60.

| Dokument | Rang BM25 | Rang Vektorsuche | RRF-Wert |
|---|---|---|---|
| A | 1 | 3 | 1/61 + 1/63 ≈ **0,0323** |
| B | — | 2 | 1/62 ≈ **0,0161** |

Dokument A steht in beiden Listen weit oben und gewinnt deutlich. OpenAI nutzt dieses Prinzip in seiner Retrieval-API: Über zwei Gewichte lässt sich steuern, wie stark die Reciprocal Rank Fusion semantische Treffer gegenüber Keyword-Treffern gewichtet (OpenAI-Dokumentation, Stand Oktober 2026). Nach der Fusion folgt in vielen Systemen ein [Re-Ranking](/wissen/geo-glossar/re-ranking/).

## Warum kombiniert man BM25 und Embeddings?

Beide Verfahren haben blinde Flecken. Mike King (iPullRank) erklärt: Die lexikalische Suche schneidet besser ab, wenn es auf genaue Wörter und ihre Häufigkeit ankommt; die semantische Suche findet über Synonyme zusätzliche Dokumente. Die Kombination fängt beide Fälle ab.

Anthropic hat den Effekt gemessen. Die Fehlerrate beim Abruf der Top-20-Abschnitte lag ohne Optimierung bei 5,7 Prozent, mit kontextualisierten Embeddings bei 3,7 Prozent und mit zusätzlichem kontextualisiertem BM25 bei 2,9 Prozent. Mit Reranking sank sie auf 1,9 Prozent, ein Rückgang um 67 Prozent (Anthropic, September 2024). Die Zahlen stammen aus Anthropics eigenem Testaufbau, nicht aus einer Websuche.

## Warum ist Hybrid Retrieval für die KI-Sichtbarkeit wichtig?

KI-Systeme suchen nicht nur nach Bedeutung. Mike King sagte auf der SEO Week 2026, die Suche habe sich zu semantischen Systemen, hybridem Retrieval und agentengetriebenen Erlebnissen verschoben (iPullRank, Mai 2026). Für die ChatGPT-Suche berichtet der Tool-Anbieter Peec AI von einer BM25-Komponente im Shopping-Bereich, die auf zehn Quellen eingrenzt, neben einer Vektorsuche und einem Rerank von 400 Kandidaten (Peec AI, September 2026). OpenAI hat diese Architektur nicht offiziell bestätigt.

Für Ihre Inhalte heißt das: Ein Abschnitt muss im [Initial Retrieval](/wissen/geo-glossar/initial-retrieval/) über mindestens einen der beiden Wege gefunden werden. Am stärksten ist er, wenn er über beide Wege weit oben landet.

## Was bedeutet das für Ihre Website?

Bieten Sie beides: die richtigen Wörter und den richtigen Sinn. Nennen Sie Produktnamen, Normen, Typenbezeichnungen und die Begriffe Ihrer Kunden wörtlich — mindestens einmal in genau der Form, in der danach gesucht wird. Synonyme helfen der semantischen Suche, ersetzen den exakten Begriff aber nicht.

Keyword-Wiederholung bringt nichts. BM25 sättigt die Termfrequenz, und jeder überflüssige Satz verwässert den Embedding-Vektor des Abschnitts. Ein klarer Absatz mit einem Thema, dem gesuchten Begriff und einer direkten Antwort schneidet in beiden Verfahren gut ab ([Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/)).
