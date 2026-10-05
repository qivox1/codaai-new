---
title: "WebMCP"
seoTitle: "Was ist WebMCP? Einfach erklärt"
seoDescription: "WebMCP erklärt: wie Websites KI-Agenten per Formular-Attribut oder JavaScript Werkzeuge anbieten, wer den Standard entwickelt und wie weit er heute ist."
shortDefinition: "WebMCP ist ein vorgeschlagener Webstandard, mit dem Websites KI-Agenten strukturierte Werkzeuge bereitstellen — deklarativ über annotierte HTML-Formulare oder imperativ per JavaScript."
synonyms: ["Web MCP", "WebMCP API", "document.modelContext", "Agenten-Tools für Websites"]
category: technik
related: ["ki-agenten", "accessibility-tree", "agentic-commerce", "llms-txt", "strukturierte-daten"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Ist WebMCP dasselbe wie das Model Context Protocol (MCP)?"
    a: "Nein. MCP hat Anthropic im November 2024 als offenen Standard vorgestellt; ein MCP-Server läuft im Backend eines Dienstes. WebMCP übernimmt Begriffe wie Tool und Schema, lässt die Werkzeuge aber im Browser als Teil der geöffneten Seite laufen — mit den Sicherheitsgrenzen und dem Zustand dieses Tabs."
  - q: "Kann ich WebMCP heute schon auf einer Live-Website einsetzen?"
    a: "Ja, über den Origin Trial, den Chrome seit Version 149 anbietet (Chrome for Developers, Juni 2026). Ein Origin Trial ist zeitlich begrenzt, und Google bezeichnet WebMCP als experimentell. Planen Sie deshalb so, dass die Seite auch ohne die Tools vollständig funktioniert."
  - q: "Verbessert WebMCP die Sichtbarkeit in ChatGPT oder AI Overviews?"
    a: "Nicht direkt. WebMCP hilft einem Agenten beim Handeln auf einer Seite, die er bereits ausgewählt hat. Ob eine Seite gefunden und zitiert wird, entscheiden Ranking und Inhalt. Google sagte im Juni 2026, dass sich noch keiner der Ansätze für Agenten als Standard durchgesetzt hat."
---

WebMCP ist ein vorgeschlagener Webstandard, mit dem eine Website [KI-Agenten](/wissen/geo-glossar/ki-agenten/) strukturierte Werkzeuge anbietet. Ein solches Werkzeug („Tool“) beschreibt eine Aktion — etwa „Angebot anfordern“ oder „Tisch reservieren“ — mit Namen, einer Beschreibung in natürlicher Sprache und einem Eingabeschema. Der Agent ruft das Tool direkt auf, statt Buttons auf Screenshots zu suchen und Klicks zu simulieren.

## Wer entwickelt WebMCP und wie ist der Stand?

Die Spezifikation entsteht in der Web Machine Learning Community Group des W3C. Herausgeber sind Brandon Walderman (Microsoft) sowie Khushal Sagar und Dominic Farolino (Google). Das Dokument hat den Status eines Entwurfs („Draft Community Group Report“) und steht laut eigener Angabe nicht auf dem W3C-Standards-Track ([WebMCP-Spezifikation](https://webmachinelearning.github.io/webmcp/), Stand Oktober 2026).

Chrome bietet seit Version 149 einen Origin Trial an (Chrome for Developers, Juni 2026). Das ist ein zeitlich begrenztes Programm, in dem Websites eine experimentelle Funktion mit echten Nutzern testen. Laut Implementierungsübersicht im WebMCP-Repository läuft auch in Microsoft Edge ab Version 150 ein Origin Trial. Mozilla und Apple (WebKit) prüfen den Vorschlag in ihren Verfahren zur Standard-Position.

## Wie funktioniert WebMCP?

WebMCP kennt zwei Wege, ein Tool zu definieren:

| Variante | Umsetzung | Typischer Einsatz |
|---|---|---|
| Deklarativ | Zusätzliche Attribute an einem HTML-Formular; die Formularfelder werden zu Parametern | Anfrage, Suche, Buchung |
| Imperativ | JavaScript: `document.modelContext.registerTool()` mit Name, Beschreibung, JSON-Schema und Ausführungsfunktion | Konfigurator, Warenkorb, mehrstufige Abläufe |

Die deklarative Variante ist der einfachste Einstieg, weil sie auf einem vorhandenen Formular aufsetzt:

```html
<form toolname="angebot-anfordern"
      tooldescription="Fordert ein Angebot für einen Katalogartikel an">
  <input name="artikelnummer" toolparamdescription="Artikelnummer laut Katalog">
  <input name="menge" type="number" toolparamdescription="Gewünschte Stückzahl">
  <button type="submit">Angebot anfordern</button>
</form>
```

Fehlt das Attribut `toolautosubmit`, füllt der Agent das Formular nur aus. Der Browser setzt dann den Fokus auf den Absende-Button, und der Mensch prüft und schickt selbst ab. Bei der imperativen Variante geht der Rückgabewert der Funktion an den Agenten zurück. So meldet die Seite Erfolg, Fehler oder den nächsten Schritt, erklärte Kasper Kulikowski (Google) im Juli 2026.

## Was unterscheidet WebMCP vom Model Context Protocol?

Das Model Context Protocol (MCP) hat Anthropic im November 2024 als offenen Standard veröffentlicht, um KI-Assistenten mit den Systemen zu verbinden, in denen Daten liegen. Ein MCP-Server läuft im Backend. Die WebMCP-Spezifikation beschreibt Seiten mit WebMCP als MCP-Server, deren Tools im Browser statt auf dem Server laufen.

Der Unterschied ist praktisch: Ein WebMCP-Tool nutzt die Anmeldung, den Warenkorb und die Oberfläche der geöffneten Seite. Was der Agent auslöst, sieht der Nutzer sofort im selben Tab. Ein separates Backend für Agenten ist nicht nötig.

## Warum ist WebMCP für die KI-Sichtbarkeit wichtig?

WebMCP ist kein Rankingfaktor. Ob eine Seite in einer KI-Antwort auftaucht, entscheiden [Grounding](/wissen/geo-glossar/grounding/) und Inhalt. Google ordnete im Juni 2026 ein: Für Agenten auf einer bereits gewählten Website kommen [llms.txt](/wissen/geo-glossar/llms-txt/), Well-known-Dateien oder WebMCP als spätere Lösungen infrage — durchgesetzt habe sich davon bisher keine (Search Off the Record).

Wichtig wird WebMCP dort, wo Agenten Aufgaben erledigen statt nur Antworten zu schreiben. Ein Agent, der für einen Einkäufer drei Lieferanten vergleicht und eine Anfrage stellen soll, kommt auf einer Seite mit klar beschriebenem Tool zuverlässiger ans Ziel. Laut Chrome-Team prüft die experimentelle Lighthouse-Kategorie „Agentic Browsing“ ab Chrome 150 auch, ob WebMCP-Tools und ihre Schemas gültig sind (Chrome for Developers, Juli 2026).

## Was bedeutet das für Ihre Website?

Die Grundlage bleibt eine Seite, die Agenten auch ohne WebMCP bedienen können: semantisches HTML, beschriftete Formularfelder und ein sauberer [Accessibility Tree](/wissen/geo-glossar/accessibility-tree/). WebMCP setzt darauf auf, es ersetzt diese Arbeit nicht.

Wählen Sie danach ein bis drei Aktionen, die für Ihr Geschäft zählen — Angebotsanfrage, Produktkonfigurator, Händlersuche. Testen Sie diese im Origin Trial zuerst deklarativ. Formulieren Sie Namen und Beschreibungen der Tools präzise: Kulikowski nennt das eine spezialisierte Form von Prompt Engineering, weil der Agent anhand dieser Texte entscheidet, wann er ein Tool nutzt. Für Bestellungen und andere folgenreiche Aktionen empfiehlt Google eine Bestätigung durch den Nutzer — das gilt besonders im [Agentic Commerce](/wissen/geo-glossar/agentic-commerce/).
