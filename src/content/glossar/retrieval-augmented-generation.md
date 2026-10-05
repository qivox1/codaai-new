---
title: "Retrieval-Augmented Generation (RAG)"
seoTitle: "Was ist RAG? Einfach erklärt"
seoDescription: "Retrieval-Augmented Generation (RAG) erklärt: Herkunft, Ablauf in vier Schritten, Verhältnis zu Grounding und was RAG für die Sichtbarkeit Ihrer Website heißt."
shortDefinition: "Retrieval-Augmented Generation (RAG) ist ein Verfahren, bei dem ein Sprachmodell vor dem Antworten passende Texte aus einer externen Quelle abruft und seine Antwort auf diese Texte stützt."
synonyms: ["RAG", "Retrieval Augmented Generation", "Abrufgestützte Generierung", "Retrieval-gestützte Textgenerierung"]
category: grundlagen
related: ["grounding", "modellwissen", "vektordatenbank", "hybrid-retrieval", "kontextfenster", "grounding-snippets"]
pubDate: 2026-10-05
faq:
  - q: "Ist RAG dasselbe wie Grounding?"
    a: "Im Kern ja. Google beschreibt Retrieval-Augmented Generation in seinem Leitfaden zu generativen KI-Funktionen als Technik, die auch Grounding genannt wird (Google Search Central, Juli 2026). RAG ist der Begriff aus der KI-Forschung und gilt für jede externe Quelle. Grounding ist der Begriff, der sich in der GEO-Praxis für den Abruf aus der Websuche eingebürgert hat."
  - q: "Nutzen Google AI Overviews und AI Mode RAG?"
    a: "Ja. Google nennt Retrieval-Augmented Generation ausdrücklich als Technik seiner generativen KI-Funktionen wie AI Overviews und AI Mode. Die zentralen Ranking-Systeme rufen dabei relevante, aktuelle Seiten aus dem Suchindex ab, und die Antwort verlinkt auf diese Seiten (Google Search Central, Juli 2026)."
  - q: "Woher stammt der Begriff RAG?"
    a: "Aus dem Paper „Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks“ von Patrick Lewis und Kollegen, eingereicht im Mai 2020 und auf der Konferenz NeurIPS 2020 veröffentlicht. Die Autoren arbeiteten für Facebook AI Research, das University College London und die New York University."
---

Retrieval-Augmented Generation (RAG) ist ein Verfahren, bei dem ein [Sprachmodell](/wissen/geo-glossar/llm/) vor dem Antworten passende Texte aus einer externen Quelle abruft und seine Antwort auf diese Texte stützt. Das Modell antwortet dann nicht allein aus seinem [Modellwissen](/wissen/geo-glossar/modellwissen/), sondern aus dem, was es für diese Frage nachgeschlagen hat. Sinngemäß übersetzt heißt RAG „durch Abruf erweiterte Generierung“.

## Woher kommt der Begriff RAG?

Der Begriff stammt aus dem Paper „Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks“ von Patrick Lewis und elf Mitautoren von Facebook AI Research, dem University College London und der New York University. Es wurde im Mai 2020 eingereicht und auf der Konferenz NeurIPS 2020 veröffentlicht ([arXiv:2005.11401](https://arxiv.org/abs/2005.11401)).

Die Autoren verbanden ein vortrainiertes Sprachmodell mit einem dichten Vektorindex der Wikipedia, den ein neuronaler Retriever durchsucht. Ihr Argument: Wissen, das in den Parametern eines Modells steckt, lässt sich schwer aktualisieren und schwer belegen. Ein externer Speicher lässt sich austauschen, und die abgerufenen Passagen zeigen, woher eine Aussage stammt. Laut dem Paper erzeugten die RAG-Modelle spezifischere, vielfältigere und faktentreuere Texte als ein Modell ohne Abruf.

## Wie funktioniert RAG?

Ein RAG-System arbeitet in vier Schritten:

1. **Anfrage** — Das System bereitet die Frage des Nutzers auf und zerlegt sie oft in mehrere Suchanfragen ([Query Fan-out](/wissen/geo-glossar/query-fan-out/)).
2. **Retrieval** — Es sucht passende Dokumente oder Abschnitte: per Wortsuche, per Vektorsuche in einer [Vektordatenbank](/wissen/geo-glossar/vektordatenbank/) oder mit beidem ([Hybrid Retrieval](/wissen/geo-glossar/hybrid-retrieval/)).
3. **Kontext** — Die besten Abschnitte landen zusammen mit der Frage im [Kontextfenster](/wissen/geo-glossar/kontextfenster/) des Modells.
4. **Generierung** — Das Modell formuliert die Antwort auf Basis dieser Abschnitte und verweist auf die Quellen.

Mike King (iPullRank) beschreibt den Ablauf bei KI-Suchsystemen so: Die Anfrage wird in einen Vektor übersetzt, eine Vektorsuche liefert Kandidaten, diese werden neu gerankt, und auf den besten Passagen baut die Antwort auf. Zwischen Retrieval und Kontext liegt also fast immer ein [Re-Ranking](/wissen/geo-glossar/re-ranking/).

## Was unterscheidet RAG von Grounding?

Inhaltlich wenig. Google beschreibt Retrieval-Augmented Generation in seinem Leitfaden für generative KI-Funktionen als Technik, die „auch als Grounding bekannt“ ist (Google Search Central, Stand Juli 2026). Beide Begriffe meinen dasselbe Prinzip: erst abrufen, dann antworten.

Der Unterschied liegt in der Perspektive. RAG ist der Begriff aus der KI-Forschung und gilt für jede externe Quelle — eine Wikipedia-Kopie, eine Produktdatenbank, ein Firmen-Wiki. [Grounding](/wissen/geo-glossar/grounding/) ist die GEO-Sicht auf dasselbe Prinzip, wenn die Quelle die Websuche ist. Ein interner Chatbot mit RAG greift auf Ihre eigenen Dokumente zu. Eine KI-Suche mit Grounding greift auf den Webindex zu, und dort konkurriert Ihre Seite mit allen anderen.

## Warum ist RAG für die KI-Sichtbarkeit wichtig?

RAG ist der Mechanismus, über den aktuelle Webinhalte in KI-Antworten gelangen. Google nennt RAG ausdrücklich als Technik seiner generativen KI-Funktionen wie AI Overviews und AI Mode: Die zentralen Ranking-Systeme rufen relevante, aktuelle Seiten aus dem Suchindex ab, und die Antwort zeigt anklickbare Links zu diesen Seiten (Google Search Central, Juli 2026).

Daraus folgt eine harte Bedingung. Lily Ray argumentiert, dass die großen KI-Suchprodukte auf RAG beruhen und Inhalte, die nicht indexiert sind und nicht ranken, gar nicht erst in das Kontextfenster des Modells gelangen (Substack, März 2026). Was nicht abgerufen wird, kann nicht zitiert werden.

Nicht jede KI-Antwort entsteht per RAG. Beantwortet ein System eine Frage ohne Suche, zählt allein das Wissen aus dem Training. Für die Sichtbarkeit brauchen Sie deshalb beide Wege: Präsenz in den Trainingsdaten und Präsenz in den Ergebnissen, die ein RAG-System abruft.

## Was bedeutet das für Ihre Website?

Die Seite muss im Index stehen und für die Anfrage oder ihre Fan-out-Queries ranken. Ohne diesen Schritt kommt sie im Retrieval nicht vor. Klassische SEO-Arbeit — Indexierbarkeit, interne Verlinkung, Rankings — bleibt die Voraussetzung für jede Zitierung.

Danach entscheidet der einzelne Abschnitt. RAG-Systeme legen in der Regel nicht ganze Seiten in den Kontext, sondern ausgewählte Passagen ([Grounding Snippets](/wissen/geo-glossar/grounding-snippets/)). Schreiben Sie deshalb Abschnitte, die für sich verständlich sind, mit der Antwort beginnen und genau ein Thema behandeln ([Chunking](/wissen/geo-glossar/chunking/)). Ob das wirkt, zeigt die [Citation Rate](/wissen/geo-glossar/citation-rate/) über Ihr Promptset.
