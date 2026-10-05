---
title: "Agentic Commerce"
seoTitle: "Agentic Commerce einfach erklärt"
seoDescription: "Agentic Commerce erklärt: wie KI-Agenten recherchieren, vergleichen und kaufen, welche Protokolle es gibt (ACP, AP2, UCP) und was B2B-Anbieter tun sollten."
shortDefinition: "Agentic Commerce ist Handel, bei dem KI-Agenten im Auftrag eines Menschen Produkte recherchieren, Angebote vergleichen und den Kauf abschließen — auf Basis maschinenlesbarer Produktdaten."
synonyms: ["Agentischer Handel", "Agentic Shopping", "Agentenbasierter Handel", "Agentic Commerce Optimization", "ACO"]
category: technik
related: ["ki-agenten", "webmcp", "strukturierte-daten", "ai-mode", "accessibility-tree", "llm-readability"]
pubDate: 2026-10-05
faq:
  - q: "Was ist der Unterschied zwischen Agentic Commerce und Agentic Commerce Optimization?"
    a: "Agentic Commerce beschreibt den Vorgang: Ein KI-Agent kauft oder bereitet einen Kauf vor. Agentic Commerce Optimization (ACO) ist nach Olaf Kopp die Disziplin, Produktdaten so aufzubereiten, dass ein Agent sie versteht, ihnen vertraut und darauf eine Transaktion aufbauen kann."
  - q: "Muss ein B2B-Anbieter für Agentic Commerce einen Onlineshop haben?"
    a: "Nein. Auch ohne Kassenfunktion recherchiert und vergleicht der Agent vorab. Entscheidend ist, dass Spezifikationen, Preise oder Preisspannen, Lieferzeiten und Ansprechpartner maschinenlesbar auf der Website stehen. Eine Anfrage lässt sich zudem als WebMCP-Tool anbieten."
  - q: "Welches Protokoll für Agentic Commerce sollte ich zuerst umsetzen?"
    a: "Für die meisten Anbieter keines. Google sagte im April 2026, dass das Universal Commerce Protocol noch neu und nicht für jede E-Commerce-Website sofort nötig ist. Vollständige, korrekte Produktdaten auf der Website und im Feed sind die Voraussetzung für jedes Protokoll."
---

Agentic Commerce ist Handel, bei dem ein [KI-Agent](/wissen/geo-glossar/ki-agenten/) im Auftrag eines Menschen Produkte recherchiert, Angebote vergleicht und den Kauf vorbereitet oder abschließt. Der Mensch gibt Ziel und Bedingungen vor — etwa Budget, Liefertermin oder Marke. Die Produktdetailseite sieht er dabei oft gar nicht mehr.

## Wie funktioniert Agentic Commerce?

Olaf Kopp beschreibt den Ablauf so: Agenten in ChatGPT, Google AI Mode, Perplexity, Amazon Rufus oder Microsoft Copilot übernehmen die Rolle, die früher Menschen hatten. Sie suchen Angebote, vergleichen Preise, prüfen Verfügbarkeit und Rückgabebedingungen — und treffen teilweise direkt die Kaufentscheidung (Kopp, Juli 2026).

Für den Agenten werden damit zwei Flächen zur Schnittstelle: die Produktdetailseite und der Produktfeed. Was dort fehlt oder widersprüchlich ist, kann er nicht vergleichen. Ein Angebot ohne Preis oder Lieferzeit fällt bei einer Anfrage wie „lieferbar bis Freitag, unter 500 Euro“ schlicht heraus.

## Welche Protokolle gibt es für Agentic Commerce?

Für den eigentlichen Kauf entstehen offene Protokolle. Die drei wichtigsten:

| Protokoll | Entwickler | Zweck |
|---|---|---|
| Agentic Commerce Protocol (ACP) | OpenAI und Stripe, September 2025 | Checkout zwischen Käufer, Agent und Händler; zuerst umgesetzt in ChatGPT |
| Agent Payments Protocol (AP2) | Google mit über 60 Partnern, September 2025 | Sichere Zahlungen durch Agenten über kryptografisch signierte „Mandate“, die den Auftrag des Nutzers belegen |
| Universal Commerce Protocol (UCP) | Google mit Shopify, Etsy, Wayfair, Target und Walmart, Januar 2026 | Gemeinsame Sprache von der Produktsuche bis zur Bestellverwaltung, etwa für den [AI Mode](/wissen/geo-glossar/ai-mode/) |

ACP und UCP haben eine Gemeinsamkeit: Der Händler bleibt Vertragspartner („Merchant of Record“) und behält Kundenbeziehung, Zahlungsabwicklung und Versand. Laut [UCP-Ankündigung](https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/) ist UCP mit AP2 kompatibel.

## Was ist Agentic Commerce Optimization?

Olaf Kopp definiert Agentic Commerce Optimization (ACO) als Teildisziplin von GEO: Sie optimiert Produktdaten so, dass ein autonomer Agent sie versteht, ihnen vertraut und im Idealfall eine Transaktion darauf aufbaut (Kopp, Juli 2026). Die zentralen Hebel sind Vertrauenssignale für Agenten und Kontext auf Ebene des einzelnen Produkts. Kopp stellt ACO neben Brand Context Optimization und [LLM Readability](/wissen/geo-glossar/llm-readability/) und sieht sie als klare Priorität für Händler, die vor allem Fremdmarken verkaufen.

## Warum ist Agentic Commerce für die KI-Sichtbarkeit wichtig?

Ein Agent wählt nicht nach Gestaltung, sondern nach Daten. In einem Experiment mit 252.000 Durchläufen über sechs Sprachmodelle verbesserten explizite Preisangaben die Zitierung konsistent, reine Formatierungsänderungen dagegen kaum („What Gets Cited“, SIGIR 2026, eingeordnet von Kai Spriestersbach, August 2026). Spriestersbach empfiehlt, [strukturierte Daten](/wissen/geo-glossar/strukturierte-daten/) zu Produkten vollständig und korrekt zu pflegen: Preise, Verfügbarkeit, Varianten, Bewertungen, Versand (AFAIK, Juli 2026).

## Was bedeutet Agentic Commerce im B2B?

Im B2B endet der Einkauf häufig nicht im Warenkorb, sondern in einer Anfrage oder Ausschreibung. Die Recherche davor kann ein Agent übernehmen: Welche Anbieter erfüllen Norm X, liefern Losgröße Y, sitzen in Region Z? Wer „Preis auf Anfrage“ schreibt und Datenblätter nur als PDF anbietet, liefert dem Agenten keine vergleichbaren Fakten. Brian Casey (IMPACT) rät, bei variablen Preisen Beispiele mit Begründung zu nennen; Beispiele seien besser als eine Spanne, eine Spanne besser als „kommt darauf an“ (August 2026).

## Was bedeutet das für Ihre Website?

- **Spezifikationen als Text:** Maße, Werkstoffe, Normen und Artikelnummern stehen als HTML-Text oder Tabelle auf der Seite, nicht nur im PDF.
- **Preise und Verfügbarkeit:** konkrete Preise, Preisbeispiele oder Spannen; Lieferzeiten und Mindestmengen.
- **Konsistente Daten:** Website, Produktfeed und strukturierte Daten nennen dieselben Werte.
- **Bedienbare Abläufe:** Warenkorb- und Anfrage-Buttons als echte Buttons im [Accessibility Tree](/wissen/geo-glossar/accessibility-tree/); die wichtigste Anfrage zusätzlich als [WebMCP](/wissen/geo-glossar/webmcp/)-Tool.
