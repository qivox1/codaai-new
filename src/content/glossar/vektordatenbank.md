---
title: "Vektordatenbank"
seoTitle: "Vektordatenbank: einfach erklärt"
seoDescription: "Vektordatenbank erklärt: was sie speichert, wie die Nächste-Nachbarn-Suche (ANN) funktioniert, welche Systeme es gibt und was das für Ihre Website bedeutet."
shortDefinition: "Eine Vektordatenbank ist ein Speicher für Embeddings, also Zahlenvektoren, die die Bedeutung von Texten abbilden. Zu einer Anfrage findet sie die gespeicherten Vektoren, die ihr am nächsten liegen."
synonyms: ["Vector Database", "Vektorspeicher", "Vector Store", "Vektorindex"]
category: grundlagen
related: ["embedding", "kosinus-aehnlichkeit", "chunking", "retrieval-augmented-generation", "semantische-suche", "hybrid-retrieval"]
pubDate: 2026-10-05
faq:
  - q: "Braucht ein RAG-System immer eine Vektordatenbank?"
    a: "Nein. Retrieval funktioniert auch per Wortsuche, etwa mit BM25. Anthropic schreibt sogar, dass eine Wissensbasis unter 200.000 Token komplett in den Prompt passt und dann gar kein RAG nötig ist (Anthropic, September 2024). Die Vektordatenbank lohnt sich, sobald die Textmenge groß ist und nach Bedeutung gesucht werden soll."
  - q: "Was unterscheidet eine Vektordatenbank von einer klassischen Datenbank?"
    a: "Eine klassische Datenbank sucht nach exakten Werten oder Wörtern. Eine Vektordatenbank sucht nach Nähe: Sie liefert die Einträge, deren Vektor dem Anfragevektor am ähnlichsten ist, auch wenn kein einziges Wort übereinstimmt."
  - q: "Welche Vektordatenbanken gibt es?"
    a: "Es gibt drei Gruppen: Erweiterungen bestehender Datenbanken wie pgvector für PostgreSQL, eigenständige Vektordatenbanken wie Pinecone und Vektorspeicher, die in KI-Plattformen eingebaut sind, etwa die Vector Stores von OpenAI. Welche passt, hängt von Datenmenge, Infrastruktur und Betriebsmodell ab."
---

Eine Vektordatenbank ist ein Datenspeicher, der Texte, Bilder oder andere Inhalte als [Embeddings](/wissen/geo-glossar/embedding/) ablegt — als lange Zahlenvektoren, die ihre Bedeutung abbilden. Sie beantwortet nicht die Frage „Welches Dokument enthält dieses Wort?“, sondern „Welche Einträge liegen dieser Anfrage am nächsten?“. Damit ist sie der Speicher hinter der [semantischen Suche](/wissen/geo-glossar/semantische-suche/) und hinter vielen Systemen für [Retrieval-Augmented Generation](/wissen/geo-glossar/retrieval-augmented-generation/).

## Was speichert eine Vektordatenbank?

Ein Eintrag besteht aus drei Teilen: dem Vektor, dem Originaltext oder einem Verweis darauf und Metadaten wie Dateiname, Datum oder Sprache. Bevor Texte in die Datenbank kommen, werden sie in Abschnitte zerlegt ([Chunking](/wissen/geo-glossar/chunking/)) und von einem Embedding-Modell in Vektoren übersetzt.

Wie das in der Praxis aussieht, dokumentiert OpenAI für seine Vector Stores: Jede hinzugefügte Datei wird automatisch zerlegt, eingebettet und indexiert. Standardmäßig entstehen Abschnitte von 800 Token mit 400 Token Überlappung (OpenAI-Dokumentation, Stand Oktober 2026). Die Metadaten dienen später als Filter, etwa für eine bestimmte Abteilung oder einen Zeitraum.

## Wie funktioniert die Suche in einer Vektordatenbank?

Die Anfrage wird mit demselben Embedding-Modell in einen Vektor übersetzt. Dann sucht die Datenbank die nächsten Nachbarn: die gespeicherten Vektoren mit dem kleinsten Abstand oder der größten Ähnlichkeit, gemessen etwa per [Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/). Das Ergebnis ist eine Liste der ähnlichsten Abschnitte mit ihrem Ähnlichkeitswert.

Eine exakte Suche vergleicht die Anfrage mit jedem einzelnen Vektor. Bei Millionen Einträgen dauert das zu lange. Vektordatenbanken nutzen deshalb meist eine approximative Nächste-Nachbarn-Suche (Approximate Nearest Neighbor, ANN): Ein Index prüft nur einen Teil der Vektoren und nimmt dafür in Kauf, gelegentlich einen nahen Nachbarn zu übersehen.

Ein verbreitetes ANN-Verfahren ist HNSW (Hierarchical Navigable Small World), ein mehrstufiger Graph, den Yu. A. Malkov und D. A. Yashunin im März 2016 vorgestellt haben. Die Suche springt darin von groben zu feinen Ebenen und nähert sich so schrittweise den ähnlichsten Vektoren.

## Welche Arten von Vektordatenbanken gibt es?

Die Systeme lassen sich in drei Gruppen ordnen. Die Aufzählung ist keine Bewertung.

| Gruppe | Beispiel | Merkmal |
|---|---|---|
| Erweiterung einer bestehenden Datenbank | pgvector für PostgreSQL | Vektoren liegen neben den übrigen Daten |
| Eigenständige Vektordatenbank | Pinecone | eigens für Vektorsuche gebaut |
| In KI-Plattformen eingebaut | Vector Stores von OpenAI | Chunking und Embedding laufen automatisch |

[pgvector](https://github.com/pgvector/pgvector) beschreibt sich als Open-Source-Vektorsuche für Postgres. Laut Projektseite unterstützt es exakte und approximative Nächste-Nachbarn-Suche, die Indextypen HNSW und IVFFlat sowie unter anderem euklidische Distanz, Skalarprodukt und Kosinus-Distanz.

## Warum ist die Vektordatenbank für die KI-Sichtbarkeit wichtig?

In einer Vektordatenbank konkurriert nicht die Seite, sondern der Abschnitt. Scott Stouffer erklärte auf der SEO Week 2026, dass KI-Systeme Seiten in Chunks zerlegen, im Vektorraum abbilden und nach semantischer Ähnlichkeit abrufen statt nach einer Bewertung der ganzen Seite. Eine kleine Passage kann so eine ganze Seite übertreffen (iPullRank, Mai 2026).

Bei der Übertragung auf die Websuche ist Vorsicht nötig. Kai Spriestersbach weist darauf hin, dass die dokumentierten Chunking-Vorgaben aus Enterprise-RAG-Produkten stammen und nicht aus der Google-Websuche (AFAIK, August 2026). Google beschreibt für seine KI-Funktionen den Abruf über die zentralen Ranking-Systeme der Suche; eine Vektordatenbank nennt der Leitfaden nicht (Google Search Central, Juli 2026).

## Was bedeutet das für Ihre Website?

Ein Embedding fasst die Bedeutung eines ganzen Abschnitts in einem Vektor zusammen. Behandelt ein Abschnitt zwei Themen, liegt sein Vektor zwischen beiden — und damit weiter weg von jeder einzelnen Frage. Schreiben Sie deshalb ein Thema je Absatz ([Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/)) und beginnen Sie mit der Kernaussage.

Benennen Sie Dinge einheitlich. Produkte, Leistungen und Fachbegriffe sollten auf allen Seiten gleich heißen, damit die Abschnitte im Vektorraum dort landen, wo Fragen dazu gestellt werden. Ersetzen kann die Vektordatenbank die Indexierung nicht: Bei der Websuche kommt nur in den Vergleich, was vorher gefunden wurde ([Initial Retrieval](/wissen/geo-glossar/initial-retrieval/)).
