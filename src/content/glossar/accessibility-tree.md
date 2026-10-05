---
title: "Accessibility Tree"
seoTitle: "Accessibility Tree erklärt"
seoDescription: "Accessibility Tree erklärt: wie Browser Rollen, Namen und Zustände für Screenreader und KI-Agenten aufbereiten — und wie Sie Ihre Seite dafür prüfen."
shortDefinition: "Der Accessibility Tree ist eine vom Browser erzeugte, vereinfachte Fassung des DOM mit Rollen, Namen und Zuständen der Seitenelemente. Screenreader nutzen ihn — und zunehmend KI-Agenten."
synonyms: ["Barrierefreiheitsbaum", "Accessibility-Baum", "A11y Tree", "Zugänglichkeitsbaum"]
category: technik
related: ["ki-agenten", "webmcp", "agentic-commerce", "strukturierte-daten", "llm-crawler"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Wie sehe ich mir den Accessibility Tree meiner Seite an?"
    a: "In den Chrome DevTools: Element auswählen, im Bereich „Accessibility“ den Baum öffnen. Dort sehen Sie für jedes Element Rolle, Namen und Zustand. Prüfen Sie zuerst, ob die wichtigen Buttons, Links, Texte und Überschriften überhaupt im Baum auftauchen."
  - q: "Brauche ich ARIA-Attribute, damit KI-Agenten den Accessibility Tree verstehen?"
    a: "Meist nicht. Native HTML-Elemente wie button, a, h2 oder label bringen ihre Rolle bereits mit. ARIA ist für Fälle gedacht, in denen kein passendes HTML-Element existiert. Überflüssige oder falsche ARIA-Labels verschlechtern die Erfahrung von Screenreader-Nutzern."
  - q: "Zeigt der Accessibility Tree in Chrome dasselbe, was jeder KI-Agent sieht?"
    a: "Nicht unbedingt. Der Baum in Chrome entsteht nach dem Rendern und enthält auch Inhalte, die JavaScript nachlädt. Agenten, die nur das ausgelieferte HTML lesen, sehen diese Inhalte nicht, warnte Jessica Frederick im Juni 2026. Wichtige Inhalte gehören deshalb ins HTML."
---

Der Accessibility Tree ist eine vom Browser erzeugte, vereinfachte Fassung des DOM. Er enthält für jedes relevante Element drei Angaben: die Rolle (Button, Link, Überschrift), den Namen (die Beschriftung) und den Zustand (etwa ausgewählt oder aufgeklappt). Google nennt ihn die „semantische Zusammenfassung“ einer Seite, die Hilfstechnologien wie Screenreader nutzen (web.dev, April 2026). Zunehmend lesen auch [KI-Agenten](/wissen/geo-glossar/ki-agenten/) ihn aus.

## Wie funktioniert der Accessibility Tree?

Der Browser leitet den Baum aus HTML und CSS ab und lässt dabei alles weg, was nur der Optik dient. Übrig bleiben laut Tory Gray vor allem Überschriften, Seitentext, Links und Buttons (Sitebulb-Webinar, Juni 2026). Was per CSS ausgeblendet ist, erscheint nicht im Baum — auch keine versteckte Überschrift.

Wie das HTML die Einträge bestimmt, zeigt ein Vergleich:

| HTML | Rolle im Baum | Name |
|---|---|---|
| `<button>In den Warenkorb</button>` | button | In den Warenkorb |
| `<span onclick="…">In den Warenkorb</span>` | Text | — |
| `<label for="menge">Stückzahl</label><input id="menge">` | Eingabefeld | Stückzahl |

Das zweite Beispiel hat Jairo Guerrero getestet: Nachdem ein „In den Warenkorb“-Button vom Tag `button` auf `span` umgestellt war, tauchte er im Accessibility Tree von Chrome nicht mehr als Button auf. Ein Agent erkennt dann nur Text und löst keinen Kauf aus (AirOps, Juli 2026).

## Wie nutzen KI-Agenten den Accessibility Tree?

Laut Google erfassen Browser-Agenten eine Seite über Screenshots, über das DOM und über den Accessibility Tree (Google Search Central, Leitfaden zur KI-Optimierung, Juli 2026). Für den Agenten ist der Baum eine präzise Karte der Bedienelemente, die das visuelle „Rauschen“ von CSS ignoriert. Screenshots sind dagegen langsam und teuer und dienen als Ausweichlösung, wenn die Struktur unklar ist (web.dev, April 2026).

OpenAI beschreibt dasselbe Prinzip für seinen Browser: ChatGPT Atlas nutzt ARIA-Rollen und -Labels — dieselben, die Screenreader nutzen —, um Struktur und Bedienelemente einer Seite zu verstehen (OpenAI, Hilfeartikel für Publisher, Stand September 2026). Jessica Frederick fasst den Grund zusammen: Screenreader-Nutzer und Agenten haben gemeinsam, dass sie die Seite nicht sehen.

## Warum ist der Accessibility Tree für die KI-Sichtbarkeit wichtig?

Für die Frage, ob ein KI-System eine Seite zitiert, ist der Baum kein bekanntes Signal — dort entscheiden [Grounding](/wissen/geo-glossar/grounding/) und Inhalt. Wichtig wird er, sobald ein Agent handeln soll: eine Anfrage stellen, ein Produkt konfigurieren, einen Kauf abschließen ([Agentic Commerce](/wissen/geo-glossar/agentic-commerce/)). Ein Button, der im Baum fehlt, existiert für den Agenten nicht.

Google prüft das inzwischen selbst: Die experimentelle Lighthouse-Kategorie „Agentic Browsing“ bewertet unter anderem die Barrierefreiheit einer Seite (Chrome for Developers, Juli 2026). Wer eine Seite zusätzlich mit [WebMCP](/wissen/geo-glossar/webmcp/)-Tools ausstattet, baut auf diesem Fundament auf.

## Wie viel ARIA braucht eine Website?

Weniger, als viele annehmen. Viele semantische HTML-Elemente tragen ihre ARIA-Rolle implizit; Überschriften brauchen kein zusätzliches Label, erklärt Jessica Frederick (Sitebulb-Webinar, Juni 2026). Google empfiehlt, Bedienelemente mit `<button>` und `<a>` zu bauen und nur dann `role` und `tabindex` zu ergänzen, wenn semantisches HTML nicht möglich ist (web.dev, April 2026).

Tory Gray warnt davor, ARIA-Labels so zu missbrauchen wie früher Alt-Texte — mit Keywords statt Beschreibung. Das verschlechtert die Seite für Menschen mit Screenreader und bringt Agenten keine zusätzliche Information.

## Was bedeutet das für Ihre Website?

- **Prüfen:** Öffnen Sie den Baum in den Chrome DevTools und kontrollieren Sie, ob die wichtigen Buttons, Links, Texte und Überschriften enthalten und klar benannt sind.
- **Semantisch bauen:** echte `<button>`- und `<a>`-Elemente, eine logische Überschriftenhierarchie, Formularfelder mit `<label for>`.
- **Aufräumen:** Nicht benötigte Elemente ausblenden, benötigte klar beschriften (Tory Gray). Doppelte Einträge vermeiden, etwa wenn Alt-Text und Linktext darunter identisch sind.
- **HTML zuerst:** Inhalte, die erst per JavaScript erscheinen, stehen zwar im gerenderten Baum, aber nicht bei jedem Agenten im ausgelieferten HTML.
