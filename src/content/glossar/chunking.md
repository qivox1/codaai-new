---
title: "Chunking"
seoTitle: "Was ist Chunking? Methoden"
seoDescription: "Was ist Chunking? Wie KI-Systeme Texte in Abschnitte zerlegen, welche Methoden und Chunk-Größen es gibt – und wie Sie schreiben, damit Ihre Passagen zählen."
shortDefinition: "Chunking ist das Zerlegen eines Textes in kleine, in sich geschlossene Abschnitte (Chunks), die ein KI-System einzeln speichert, vergleicht und in Antworten verwendet."
synonyms: ["Chunks", "Textsegmentierung", "Parsing & Extraction", "Passage Indexing"]
category: grundlagen
related: ["semantisches-chunking", "embedding", "kosinus-aehnlichkeit", "grounding-snippets", "re-ranking", "bottom-line-up-front"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
faq:
  - q: "Wie groß ist ein Chunk?"
    a: "Das legt jedes System selbst fest. Die dokumentierten Standardwerte gängiger RAG-Dienste liegen zwischen 300 und rund 1.000 Token, also grob zwischen zwei und zehn Absätzen. Verlassen Sie sich nicht auf eine Zahl: Schreiben Sie so, dass jeder Absatz für sich eine vollständige Aussage trägt — dann funktioniert Ihr Text bei jeder Chunk-Größe."
  - q: "Was passiert beim Parsing vor dem Chunking?"
    a: "Der Rohtext wird aus dem HTML extrahiert und bereinigt: Navigation, Skripte und Werbeflächen fallen weg, der Hauptinhalt bleibt. Sauberes, semantisches HTML mit klarer Überschriftenhierarchie erleichtert diesen Schritt und verhindert, dass Inhalt als Beiwerk verworfen wird."
  - q: "Muss ich meine Texte für das Chunking in kurze Häppchen zerlegen?"
    a: "Nein. Google hat sich ausdrücklich gegen Inhalte in mundgerechten Häppchen ausgesprochen, und für feste Absatzlängen gibt es keinen belastbaren Beleg. Was hilft, ist ein Thema je Absatz und eine Kernaussage, die ohne den Rest der Seite verständlich ist."
---

Chunking ist das systematische Zerlegen von Texten in kleine Abschnitte, die ein KI-System einzeln weiterverarbeitet. Nach dem Parsing — dem Extrahieren und Bereinigen des Rohtextes aus einer Webseite — wird der Inhalt in Chunks geschnitten, jeder Chunk in einen Vektor übersetzt ([Embedding](/wissen/geo-glossar/embedding/)) und gespeichert. Bei einer Frage sucht das System nicht nach passenden Seiten, sondern nach passenden Chunks.

## Wie funktioniert Chunking?

Die vereinfachte Verarbeitungskette eines KI-Systems hat sechs Schritte: Datenquellen sammeln, Parsing und Extraction, Chunking, Embeddings, Speicherung in einer Vektordatenbank, Retrieval und Antwort. Chunking sitzt in der Mitte und bestimmt, welche Einheit später verglichen wird. Bei einer Anfrage berechnet das System, wie nah jeder Chunk der Frage ist ([Kosinus-Ähnlichkeit](/wissen/geo-glossar/kosinus-aehnlichkeit/)), und gibt die besten an das Sprachmodell weiter. Ein Chunk wird dabei ohne den Rest der Seite bewertet.

Für Websuchen gilt dasselbe Prinzip unter anderem Namen: Mike King (iPullRank) setzt Chunking mit dem Passage Indexing gleich, mit dem Google begonnen hat, nicht mehr nur ganze Seiten, sondern einzelne Abschnitte einer Seite zu bewerten.

## Welche Chunking-Methoden gibt es?

Chunking-Methoden unterscheiden sich darin, wo sie den Text schneiden:

- **Feste Länge:** Der Text wird nach einer festen Zahl von Token geschnitten, meist mit Überlappung, damit eine Aussage an der Schnittkante nicht verloren geht.
- **Satz- und absatzbasiert:** Die Grenzen folgen Sätzen oder Absätzen. Ein Chunk enthält ganze Gedanken statt abgeschnittener.
- **Strukturbasiert:** Die Grenzen folgen dem Aufbau der Seite — Überschriften, Listen, Tabellen. Mike King hält dieses layoutbewusste Vorgehen für wichtiger als rein semantisches.
- **Semantisch:** Das System schneidet dort, wo sich die Bedeutung ändert, gemessen an der Ähnlichkeit aufeinanderfolgender Sätze.
- **Rekursiv:** Der Text wird zuerst an großen Grenzen geteilt (Abschnitte), dann an kleineren (Absätze, Sätze), bis jeder Chunk die Zielgröße hat.

Welche Methode ein KI-System für Webseiten nutzt, veröffentlichen ChatGPT, Gemini und Perplexity nicht. Sicher ist nur: Die Grenzen setzt der Parser, nicht der Autor.

## Wie groß ist ein Chunk beim Chunking?

Die Chunk-Größe wird in Token gemessen. Für Entwickler-Dienste, mit denen Unternehmen eigene KI-Suchen bauen, sind die Standardwerte dokumentiert. Kai Spriestersbach hat sie zusammengestellt (AFAIK, August 2026):

| Dienst | Standard-Chunkgröße | Überlappung |
|---|---|---|
| OpenAI Vector Stores | höchstens 800 Token | 400 Token |
| Google RAG Engine | 1.024 Token | 256 Token |
| AWS Bedrock Knowledge Bases (feste Länge) | 300 Token | 20 % |

Für die Websuche von ChatGPT oder Googles KI-Übersicht sind keine Werte veröffentlicht. Die Überlappung zeigt aber, warum feste Absatzlängen wenig bringen: Weil benachbarte Chunks sich zu 20 bis 50 Prozent überschneiden, entschärfen die Systeme Grenzprobleme selbst.

## Warum ist Chunking für die KI-Sichtbarkeit wichtig?

Weil KI-Systeme Passagen extrahieren, nicht Seiten. Ein Absatz, der nur mit dem Kontext der vorherigen drei Absätze verständlich ist, verliert im Vergleich, sobald er allein steht. Ein Absatz, der eine Frage vollständig beantwortet, gewinnt — auch auf einer sonst mittelmäßigen Seite. Das ist der Grund, warum im GEO die Regel „Optimize for pages to rank and passages to be relevant" gilt: Die Seite muss ranken, die Passage muss überzeugen.

## Muss man Inhalte für das Chunking in kleine Abschnitte zerlegen?

Nein. Danny Sullivan (Google) hat im Januar 2026 im Podcast „Search Off the Record" gesagt, dass Google keine Inhalte möchte, die in mundgerechte Häppchen zerlegt sind, nur weil Sprachmodelle das angeblich mögen. Kai Spriestersbach kommt zum selben Ergebnis: Für Mikro-Absätze von 300 bis 400 Zeichen gibt es keinen belastbaren Beleg.

Was dagegen wirkt, ist ein Thema je Absatz. In einem Test von Mike King stieg die semantische Nähe zweier Themen messbar, nachdem ein Absatz, der beide mischte, in zwei Absätze mit je einem Thema geteilt wurde. Die Regel lautet also nicht „kürzer", sondern „eindeutiger".

## Was bedeutet das für Ihre Website?

Schreiben Sie so, dass jeder Absatz eine in sich geschlossene Antwort zu einem Thema ist und jeder Satz auch ohne Kontext verständlich bleibt. Vermeiden Sie Verweise wie „wie oben beschrieben" und Pronomen, deren Bezug im vorigen Absatz steht. Setzen Sie die Kernaussage an den Anfang ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)) und gliedern Sie mit echten Überschriften, Listen und Tabellen statt mit Text in Bildern. Wie das konkret aussieht, beschreibt der Begriff [Semantisches Chunking](/wissen/geo-glossar/semantisches-chunking/).
