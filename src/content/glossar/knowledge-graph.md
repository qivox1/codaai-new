---
title: "Knowledge Graph"
seoTitle: "Knowledge Graph einfach erklärt"
seoDescription: "Knowledge Graph erklärt: wie Wissensgraphen Entitäten verknüpfen, was Google Knowledge Graph und Knowledge Panel sind und wie KI-Systeme sie nutzen."
shortDefinition: "Ein Knowledge Graph ist eine Wissensdatenbank, die Dinge der realen Welt als Entitäten mit eindeutiger Kennung speichert und ihre Beziehungen zueinander abbildet. Suchmaschinen und KI-Systeme prüfen damit Fakten."
synonyms: ["Wissensgraph", "Google Knowledge Graph", "Wissensnetz", "Knowledge Graph (englisch)"]
category: grundlagen
related: ["entitaet", "entity-home", "korroboration", "strukturierte-daten", "ai-mode", "halluzination"]
pubDate: 2026-10-05
faq:
  - q: "Kann man sein Unternehmen selbst in den Google Knowledge Graph eintragen?"
    a: "Nein. Es gibt kein Formular für einen Eintrag. Google übernimmt Entitäten aus Quellen im Web. Sie beeinflussen das nur indirekt — über strukturierte Daten, übereinstimmende Angaben unabhängiger Quellen und gegebenenfalls einen sauber belegten Wikidata-Eintrag. Erst wenn ein Knowledge Panel existiert, können Sie es beanspruchen und Änderungen vorschlagen."
  - q: "Was ist der Unterschied zwischen Knowledge Graph und Knowledge Panel?"
    a: "Der Knowledge Graph ist die Datenbank im Hintergrund. Das Knowledge Panel ist die Infobox, die Google in den Suchergebnissen zeigt, wenn jemand nach einer Entität sucht, die im Knowledge Graph steht. Ein Knowledge Panel ist damit ein sichtbares Zeichen dafür, dass Google Ihre Marke als Entität kennt."
  - q: "Wirkt Arbeit am Knowledge Graph auch auf ChatGPT?"
    a: "Nur eingeschränkt. Laut Duane Forrester wirkt Entity-Arbeit vor allem bei Google, weil dort ein Knowledge Graph existiert, den man füttern kann. Ein Sprachmodell lernt im Training dagegen aus großen Textmengen. Dort zählt, wie viele unabhängige Texte Ihre Marke übereinstimmend beschreiben."
---

Ein Knowledge Graph (deutsch: Wissensgraph) ist eine Wissensdatenbank, die Dinge der realen Welt als Entitäten speichert und die Beziehungen zwischen ihnen als Verbindungen. Jede [Entität](/wissen/geo-glossar/entitaet/) — eine Person, ein Unternehmen, ein Produkt, ein Ort — hat eine eindeutige Kennung, Eigenschaften und Verbindungen zu anderen Entitäten. Suchmaschinen und KI-Systeme nutzen Knowledge Graphs, um zu erkennen, wer oder was gemeint ist, und um Fakten zu prüfen.

## Wie funktioniert ein Knowledge Graph?

Ein Knowledge Graph speichert Wissen als Aussagen aus drei Teilen: Subjekt, Beziehung, Objekt. Aus dem Satz „Die Muster GmbH hat ihren Sitz in Bielefeld“ wird eine Verbindung zwischen der Entität „Muster GmbH“ und der Entität „Bielefeld“. Solche Dreiergruppen heißen semantische Tripel. Viele Tripel zusammen ergeben ein Netz, in dem sich ein System von Entität zu Entität bewegen kann.

Entscheidend ist die eindeutige Kennung. Wikidata, die offene Wissensdatenbank der Wikimedia-Projekte, vergibt jedem Objekt eine Nummer aus Q und einer Zahl — Douglas Adams ist dort Q42 — und jeder Eigenschaft eine Nummer aus P und einer Zahl. Über diese Kennungen unterscheidet ein System gleichnamige Dinge: die Stadt vom gleichnamigen Unternehmen, die Marke vom Familiennamen.

## Was ist der Google Knowledge Graph?

Google stellte seinen Knowledge Graph im Mai 2012 vor. Amit Singhal, damals Senior Vice President bei Google, beschrieb ihn im [Google-Blog](https://blog.google/products/search/introducing-knowledge-graph-things-not/) als Modell, das Entitäten der realen Welt und ihre Beziehungen versteht — „things, not strings“, also Dinge statt Zeichenketten. Zum Start enthielt er laut Google mehr als 500 Millionen Objekte und mehr als 3,5 Milliarden Fakten über deren Beziehungen.

Sichtbar wird der Google Knowledge Graph im Knowledge Panel. Das ist laut Google-Hilfe die Infobox, die erscheint, wenn jemand nach einer Entität sucht, die im Knowledge Graph steht. Knowledge Panels entstehen automatisch aus Quellen im Web. Wer eine Entität offiziell vertritt, kann das Panel beanspruchen und Änderungen vorschlagen.

Einen direkten Eintrag gibt es nicht. Den Knowledge Graph beeinflussen Sie laut Duane Forrester (Juli 2026) nur indirekt: über strukturierte Daten, übereinstimmende Bestätigung durch Dritte und gegebenenfalls einen sauberen Wikidata-Eintrag, den unabhängige Quellen stützen.

## Welche Rolle spielt der Knowledge Graph in KI-Systemen?

Jason Barnard (Kalicube) beschreibt drei Technologien hinter KI-Assistenten als „Algorithmic Trinity“: das [LLM](/wissen/geo-glossar/llm/) für das Gespräch, die Suchmaschine für aktuelle und spezielle Informationen und den Knowledge Graph für die Prüfung von Fakten. Google besitzt nach Barnards Einschätzung als einziger großer Anbieter alle drei selbst (Kalicube-Livestream, Juli 2026).

Google bestätigt die Verbindung für den [AI Mode](/wissen/geo-glossar/ai-mode/): Laut der Ankündigung vom März 2025 greift der AI Mode neben Webinhalten auf Echtzeitquellen wie den Knowledge Graph zu. Duane Forrester ergänzt, dass Googles KI-Antworten Entitäten gegen denselben Graphen auflösen, bevor sie eine Antwort erzeugen.

Bei anderen Anbietern ist das anders. Ein Sprachmodell enthält keinen Knowledge Graph, den man füttern kann. Es lernt aus großen Textmengen, und was dort übrig bleibt, ist der Konsens vieler Quellen (Forrester, Juli 2026). Für ChatGPT und Co. zählt deshalb vor allem, wie viele unabhängige Texte eine Marke gleich beschreiben.

## Warum ist der Knowledge Graph für die KI-Sichtbarkeit wichtig?

Ein KI-System kann nur über eine Marke sprechen, die es eindeutig erkennt. Ist eine Marke als Entität mit klaren Eigenschaften erfasst, ordnet das System ihr Fakten richtig zu. Fehlt diese Klarheit, droht Verwechslung. Hanns Kronenberg nennt Entitätsverwechslung neben [KI-Halluzinationen](/wissen/geo-glossar/halluzination/) als eines von vier strukturellen Risiken in KI-Antworten (CAMPIXX, Juni 2026).

Für Google wirkt der Knowledge Graph doppelt: in der klassischen Suche über das Knowledge Panel und in den KI-Funktionen über die Auflösung von Entitäten. Wer dort nicht als Entität existiert, muss sich auf Textsignale verlassen.

## Was bedeutet das für Ihre Website?

Machen Sie Ihr Unternehmen eindeutig. Das gelingt nicht mit einer einzelnen Maßnahme, sondern durch Übereinstimmung an vielen Stellen:

- **Eine zentrale Seite:** Legen Sie eine Seite fest, die Ihr Unternehmen verbindlich beschreibt — Ihr [Entity Home](/wissen/geo-glossar/entity-home/).
- **Eine Beschreibung:** Verwenden Sie Namen, Gründungsjahr, Sitz und Leistungsbeschreibung überall gleich ([Konsistente Markenbeschreibung](/wissen/geo-glossar/konsistente-markenbeschreibung/)).
- **Maschinenlesbare Angaben:** Zeichnen Sie Ihr Unternehmen mit [strukturierten Daten](/wissen/geo-glossar/strukturierte-daten/) vom Typ Organization aus und verweisen Sie per sameAs auf Ihre Profile.
- **Klare Sätze:** Formulieren Sie Fakten als einfache Aussagen aus Subjekt, Beziehung und Objekt. iPullRank empfiehlt das ausdrücklich, weil solche Tripel die Bausteine von Knowledge Graphs sind.
- **Bestätigung durch Dritte:** Sorgen Sie dafür, dass unabhängige Quellen dieselben Fakten nennen ([Korroboration](/wissen/geo-glossar/korroboration/)).

Ein Wikidata-Eintrag ist nur sinnvoll, wenn Ihr Unternehmen die Relevanzkriterien von Wikidata erfüllt. Dafür muss es sich mit seriösen, öffentlich zugänglichen Quellen belegen lassen. Ein Eintrag ohne solche Belege wird nicht akzeptiert und hilft nicht.
