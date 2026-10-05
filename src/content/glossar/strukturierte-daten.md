---
title: "Strukturierte Daten (Schema.org)"
seoTitle: "Strukturierte Daten & KI-Suche"
seoDescription: "Strukturierte Daten (Schema.org, JSON-LD) erklärt: welche Typen im B2B zählen, was Google zu KI-Funktionen sagt und warum Markup keinen sichtbaren Text ersetzt."
shortDefinition: "Strukturierte Daten sind maschinenlesbare Angaben im Quelltext einer Webseite, die mit dem Vokabular von Schema.org beschreiben, was auf der Seite steht — etwa ein Unternehmen, ein Produkt oder einen Artikel."
synonyms: ["Structured Data", "Schema.org", "Schema-Markup", "JSON-LD", "Auszeichnung"]
category: technik
related: ["entitaet", "knowledge-graph", "entity-home", "chunking", "ai-overviews", "grounding-page"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Braucht man strukturierte Daten, um in AI Overviews oder im AI Mode zu erscheinen?"
    a: "Nein. Google schreibt in seinem Leitfaden zu generativen KI-Funktionen, dass strukturierte Daten dafür nicht erforderlich sind und es kein spezielles schema.org-Markup gibt. Google empfiehlt sie weiterhin für Rich Results in der klassischen Suche."
  - q: "Lesen ChatGPT und andere KI-Systeme strukturierte Daten?"
    a: "Nur eingeschränkt. In einem Test von Ahrefs stützten sich fünf große KI-Systeme auf den sichtbaren Text und ignorierten JSON-LD. Wirkung entfalten strukturierte Daten vor allem indirekt: über den Suchindex und den Knowledge Graph, auf die KI-Systeme zurückgreifen."
  - q: "Welche Typen sollte ein B2B-Unternehmen für strukturierte Daten mindestens nutzen?"
    a: "Organization auf der Seite, die das Unternehmen beschreibt, mit sameAs-Verweisen auf offizielle Profile. Dazu Person für Autoren und Ansprechpartner, Product mit Offer für Produkte und Article mit Datum für Fachbeiträge. Alles, was im Markup steht, muss auch sichtbar auf der Seite stehen."
---

Strukturierte Daten sind maschinenlesbare Angaben im Quelltext einer Webseite, die beschreiben, was auf der Seite steht: ein Unternehmen, ein Produkt, einen Artikel, eine Person. Sie folgen einem gemeinsamen Vokabular, Schema.org, und werden meist im Format JSON-LD eingebunden. Suchmaschinen erkennen damit Entitäten und ihre Eigenschaften, ohne den Fließtext deuten zu müssen.

## Wie funktionieren strukturierte Daten?

Schema.org ist ein Katalog von Typen (etwa Organization, Product, Article) und Eigenschaften (etwa name, address, author). Google, Bing und Yahoo starteten die Initiative im Juni 2011, damit Website-Betreiber ihre Seiten nicht für jede Suchmaschine anders auszeichnen müssen (Google Search Central Blog, Juni 2011).

Es gibt drei Formate: JSON-LD, Microdata und RDFa. Google empfiehlt in den meisten Fällen JSON-LD, weil es am einfachsten umzusetzen und zu pflegen ist. Der Code steht in einem eigenen Skript-Block und vermischt sich nicht mit dem sichtbaren Text:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Muster GmbH",
  "url": "https://www.muster.de/",
  "foundingDate": "1998",
  "sameAs": ["https://www.linkedin.com/company/muster-gmbh"]
}
```

Laut Google nutzt die Suche strukturierte Daten, um den Inhalt einer Seite zu verstehen und um Informationen über die Welt zu sammeln — etwa über Personen oder Unternehmen. Diese Angaben fließen in den [Knowledge Graph](/wissen/geo-glossar/knowledge-graph/) ein.

## Welche Typen sind für B2B-Unternehmen relevant?

| Typ | Wofür | Hinweis |
|---|---|---|
| Organization | Unternehmen, Logo, Adresse, Profile | Auf dem [Entity Home](/wissen/geo-glossar/entity-home/), mit sameAs |
| Person | Autoren, Geschäftsführung, Ansprechpartner | Verknüpft Expertise mit Personen |
| Product und Offer | Produkte, Preise, Verfügbarkeit | Grundlage für Produkt-Rich-Results |
| Article | Fachbeiträge, Ratgeber | Mit Autor, datePublished und dateModified |
| FAQPage | Fragen und Antworten | Google zeigt seit dem 7. Mai 2026 keine FAQ-Rich-Results mehr |

iPullRank zählt Organization und Person zu den wirksamsten Typen, weil sie Entitäten eindeutig machen.

## Was sagt Google zu strukturierten Daten in KI-Funktionen?

Google ist eindeutig. Im [Leitfaden zu generativen KI-Funktionen](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) heißt es, strukturierte Daten seien für die Suche mit generativer KI nicht erforderlich, und es gebe kein spezielles schema.org-Markup (Stand Juli 2026). Google empfiehlt sie trotzdem weiter, weil sie Seiten für Rich Results qualifizieren. Wichtig ist, dass die strukturierten Daten zum sichtbaren Text der Seite passen.

Mark Williams-Cook (September 2026) ordnet das ein: Google nutzt seinen Knowledge Graph mit seinen KI-Systemen, und strukturierte Daten verringern Mehrdeutigkeit. Man solle sie weiter einsetzen, aber nicht als neue GEO-Formel verkaufen.

## Was spricht gegen eine Überschätzung von Schema.org?

Mehrere Tests zeigen, dass KI-Systeme vor allem den sichtbaren Text lesen:

- **Chunking:** Laut WordLift (Tool-Anbieter, März 2026) nehmen RAG-Systeme eine Seite meist als flachen Text auf. Beim [Chunking](/wissen/geo-glossar/chunking/) zerschneidet der Chunker die Beziehungen im JSON-LD in unverbundene Fragmente. Ein zusätzlicher Standard-JSON-LD-Block verbesserte in WordLifts Experiment die Faktenextraktion nur um 0,17 Punkte auf einer Fünf-Punkte-Skala.
- **Sichtbarer Text gewinnt:** Im Test von Ahrefs ignorierten fünf große KI-Systeme JSON-LD sowie verstecktes Microdata und RDFa (September 2026). Malte Landwehr berichtet: Widersprechen sich Text und Markup, gewinnt der Text (August 2026).
- **Korrelation ist keine Wirkung:** Laut einem Ahrefs-Bericht vom Mai 2026 enthielten von KI zitierte Seiten etwa dreimal so häufig JSON-LD — das Hinzufügen von Schema steigerte die Zitierungen aber nicht klar (Search Engine Journal, September 2026).

Jason Barnard fasst es so zusammen: Markup soll wiederholen, was bereits klar auf der Seite steht. Fehlt die Information auf der Seite, rettet auch Schema nichts (Juli 2026). Schema ersetzt keinen Satz.

## Warum sind strukturierte Daten für die KI-Sichtbarkeit wichtig?

Ihre Wirkung ist indirekt. Olaf Kopp (Aufgesang) nennt Schema.org einen „Hygienefaktor“: Der Einfluss laufe über Indexierung, Knowledge Graph und Abrufebenen, nicht über das direkte Lesen des Markups (Mai 2026). Für Google ist das relevant, weil [AI Overviews](/wissen/geo-glossar/ai-overviews/) und [AI Mode](/wissen/geo-glossar/ai-mode/) auf dem Suchindex aufbauen und der AI Mode laut Google auch auf den Knowledge Graph zugreift. In einem Experiment von OtterlyAI verbesserten zusätzliche Schema-Attribute die Sichtbarkeit in Google und in AI Overviews, nicht aber in ChatGPT (Thomas Peham, September 2026).

## Was bedeutet das für Ihre Website?

- Zeichnen Sie Ihr Unternehmen mit Organization aus und verweisen Sie per sameAs auf Ihre offiziellen Profile.
- Ergänzen Sie Person für Autoren, Product und Offer für Produkte, Article mit Datumsangaben für Fachbeiträge.
- Schreiben Sie jede Angabe aus dem Markup auch als sichtbaren Text auf die Seite — Preise, Leistungsmerkmale, Gründungsjahr.
- Liefern Sie JSON-LD im HTML aus, statt es per JavaScript nachzuladen. Seokratie begründet das damit, dass KI-Crawler JavaScript nicht auswerten (August 2026).
- Halten Sie Markup und Text konsistent. Widersprüche schwächen beide.

Erwarten Sie von strukturierten Daten Eindeutigkeit, nicht Zitierungen. Ob eine Seite zitiert wird, entscheidet ihr Text.
