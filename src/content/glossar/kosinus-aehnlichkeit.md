---
title: "Kosinus-Ähnlichkeit"
seoTitle: "Kosinus-Ähnlichkeit: Formel"
seoDescription: "Kosinus-Ähnlichkeit (Cosine Similarity) erklärt: Formel, Rechenbeispiel, Python-Code – und warum sie mitentscheidet, welche Passagen KI-Systeme zitieren."
shortDefinition: "Die Kosinus-Ähnlichkeit misst, wie ähnlich zwei Vektoren sind: ihr Skalarprodukt geteilt durch das Produkt ihrer Längen. KI-Systeme bewerten damit, wie gut ein Textabschnitt zu einer Suchanfrage passt."
synonyms: ["Cosine Similarity", "Kosinusähnlichkeit", "Semantische Ähnlichkeit", "Vektorähnlichkeit"]
category: grundlagen
related: ["embedding", "chunking", "initial-retrieval", "re-ranking", "query-coverage", "semantisches-chunking", "hybrid-retrieval"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
faq:
  - q: "Welcher Wert der Kosinus-Ähnlichkeit ist gut?"
    a: "Es gibt keine feste Schwelle; die Werte hängen vom Embedding-Modell ab. Sinnvoll ist der Vergleich: Liegt der Hauptinhalt Ihrer Seite näher an der Zielfrage als der Inhalt der Seiten, die die KI heute zitiert? Das ist die Frage, die zählt."
  - q: "Wie erhöhe ich die Kosinus-Ähnlichkeit zu einer Suchanfrage?"
    a: "Indem der Abschnitt die Frage direkt beantwortet, mit dem gefragten Begriff beginnt und nichts Fremdes enthält. Werbliche Sätze, Einleitungen und Themenwechsel ziehen den Vektor von der Frage weg."
  - q: "Ist die Kosinus-Ähnlichkeit dasselbe wie das Skalarprodukt?"
    a: "Nur bei normierten Vektoren. Das Skalarprodukt hängt von der Länge der Vektoren ab, die Kosinus-Ähnlichkeit rechnet die Länge heraus. Haben beide Vektoren die Länge 1 — wie die Embeddings von OpenAI —, sind beide Werte identisch."
  - q: "Was ist der Unterschied zwischen Kosinus-Ähnlichkeit und Kosinus-Distanz?"
    a: "Die Kosinus-Distanz ist 1 minus die Kosinus-Ähnlichkeit. Bei der Ähnlichkeit ist ein höherer Wert besser, bei der Distanz ein niedrigerer. Viele Vektordatenbanken geben die Distanz aus — beim Vergleich von Ergebnissen deshalb immer prüfen, welches Maß angezeigt wird."
---

Die Kosinus-Ähnlichkeit (englisch: Cosine Similarity) ist ein mathematisches Maß dafür, wie ähnlich zwei Vektoren sind. In KI-Systemen wird sie benutzt, um zu berechnen, wie nah der [Embedding](/wissen/geo-glossar/embedding/)-Vektor eines Textabschnitts am Vektor einer Suchanfrage liegt. Der Wert reicht von −1 bis 1; je näher an 1, desto ähnlicher die Bedeutung.

## Wie lautet die Formel der Kosinus-Ähnlichkeit?

Die Kosinus-Ähnlichkeit zweier Vektoren A und B ist ihr Skalarprodukt geteilt durch das Produkt ihrer Längen:

```text
cos(θ) = (A · B) / (‖A‖ × ‖B‖)
```

Das Skalarprodukt A · B ist die Summe der Produkte der einzelnen Komponenten. Die Länge ‖A‖ ist die Wurzel aus der Summe der quadrierten Komponenten. Das Ergebnis ist der Kosinus des Winkels θ zwischen den beiden Vektoren: Zeigen sie in dieselbe Richtung, ist der Wert 1. Stehen sie senkrecht zueinander, ist er 0. Zeigen sie in entgegengesetzte Richtungen, ist er −1.

## Wie sieht ein Rechenbeispiel zur Kosinus-Ähnlichkeit aus?

Ein Beispiel mit zwei Dimensionen zeigt das Prinzip. Die Suchanfrage hat den Vektor q = (3, 4), zwei Textabschnitte haben die Vektoren a = (6, 8) und b = (4, −3).

| Vergleich | Skalarprodukt | Produkt der Längen | Kosinus-Ähnlichkeit |
|---|---|---|---|
| q und a | 3·6 + 4·8 = 50 | 5 × 10 = 50 | 50 / 50 = **1,0** |
| q und b | 3·4 + 4·(−3) = 0 | 5 × 5 = 25 | 0 / 25 = **0,0** |

Vektor a ist doppelt so lang wie q, zeigt aber in dieselbe Richtung — die Kosinus-Ähnlichkeit ist trotzdem 1. Weil nur die Richtung zählt und nicht die Länge, kann ein kurzer, präziser Abschnitt einer Frage näher sein als ein langer Artikel. Vektor b steht senkrecht zu q und hat mit der Anfrage nichts zu tun. Echte Embeddings haben statt zwei einige Hundert bis einige Tausend Dimensionen; die Rechnung bleibt dieselbe.

## Wie berechnet man die Kosinus-Ähnlichkeit in Python?

Mit NumPy genügt eine Zeile:

```python
import numpy as np

def kosinus_aehnlichkeit(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(kosinus_aehnlichkeit(np.array([3, 4]), np.array([6, 8])))   # 1.0
print(kosinus_aehnlichkeit(np.array([3, 4]), np.array([4, -3])))  # 0.0
```

Für Texte liefert ein Embedding-Modell die Vektoren. Anfrage und Abschnitt müssen mit demselben Modell übersetzt werden; Werte aus verschiedenen Modellen sind nicht vergleichbar. Für viele Vektoren auf einmal gibt es die Funktion `cosine_similarity` in der Bibliothek scikit-learn.

## Was unterscheidet Kosinus-Ähnlichkeit, Skalarprodukt und euklidische Distanz?

Alle drei Maße beschreiben, wie nah sich zwei Vektoren sind — auf unterschiedliche Weise:

- **Kosinus-Ähnlichkeit** misst nur den Winkel. Die Länge der Vektoren spielt keine Rolle.
- **Skalarprodukt** misst Winkel und Länge zusammen. Längere Vektoren erzielen höhere Werte.
- **Euklidische Distanz** misst den geraden Abstand zwischen den Endpunkten. Ein kleinerer Wert heißt ähnlicher.

Bei normierten Vektoren mit der Länge 1 fallen die Unterschiede weg: Das Skalarprodukt ist dann gleich der Kosinus-Ähnlichkeit, und alle drei Maße ergeben dieselbe Rangfolge. Die Embeddings von OpenAI sind laut der [Embeddings-FAQ von OpenAI](https://help.openai.com/en/articles/6824809-embeddings-faq) standardmäßig so normiert.

## Wie nutzen KI-Systeme die Kosinus-Ähnlichkeit?

Suchsysteme und Sprachmodelle legen Anfragen und Dokumente als Vektoren in einen gemeinsamen Raum. Abschnitte, deren Vektor nahe am Vektor der Anfrage liegt, gelten als relevanter — gemessen etwa per Kosinus-Ähnlichkeit. So beschreibt es Mike King (iPullRank). In der [Retrieval-Pipeline](/wissen/geo-glossar/initial-retrieval/) eines KI-Systems ist diese Nähe ein zentrales Kriterium dafür, welche Passagen im [Re-Ranking](/wissen/geo-glossar/re-ranking/) über die Relevanzschwelle kommen.

Die Bedeutungsnähe ist dabei selten das einzige Signal. Viele Systeme kombinieren die semantische Suche mit einer klassischen Wortsuche wie BM25 (Hybrid Retrieval). Die Wortsuche schneidet besser ab, wenn es auf exakte Begriffe ankommt — Produktnamen, Normen, Artikelnummern. Ein Abschnitt sollte deshalb beides bieten: den richtigen Sinn und die richtigen Wörter.

## Warum ist die Kosinus-Ähnlichkeit für die KI-Sichtbarkeit wichtig?

Sie ist die technische Fassung der Frage „Passt dieser Inhalt zur Anfrage?". Klassisches SEO beantwortet diese Frage über Keywords und Links; KI-Systeme beantworten sie über Bedeutungsnähe. Eine Seite kann für ein Keyword ranken und trotzdem einen niedrigen Wert zur konkreten Nutzerfrage haben, wenn ihr Hauptinhalt die Frage nur streift. Dann wird sie zwar gefunden, aber nicht zitiert.

Wie stark die Gliederung wirkt, zeigt ein Test von Mike King: Er teilte einen Absatz, der zwei Themen behandelte, in zwei Absätze mit je einem Thema. Die Kosinus-Ähnlichkeit zum Thema „machine learning" stieg dadurch von 0,6481 auf 0,7477, die zum Thema „data privacy" von 0,6948 auf 0,7634 (SparkToro Office Hours, Januar 2026). Ein Abschnitt mit einem Thema liegt näher an der Frage als ein Abschnitt mit zweien.

## Was bedeutet das für Ihre Website?

Vergleichen Sie den Hauptinhalt Ihrer wichtigen Seiten mit den Fragen aus Ihrem [Promptset](/wissen/geo-glossar/promptset/). Abschnitte, die eine Frage direkt beantworten und mit dem gefragten Begriff beginnen, liegen näher an der Anfrage als Abschnitte mit Einleitung, Werbung und Themenwechsel. Behandeln Sie ein Thema je Absatz ([Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/)) und decken Sie auch die verwandten Fragen ab ([Query Coverage](/wissen/geo-glossar/query-coverage/)), denn ein KI-System stellt selten nur eine.

Der Effekt lässt sich messen: Übersetzen Sie Zielfrage und Abschnitt mit demselben Embedding-Modell und vergleichen Sie die Kosinus-Ähnlichkeit vor und nach der Überarbeitung. Steigt der Wert, ist der Abschnitt näher an der Frage — ob er zitiert wird, entscheidet danach der Vergleich mit den übrigen Quellen.
