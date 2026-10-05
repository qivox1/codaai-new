---
title: "Grounding Page"
seoTitle: "Grounding Page: Aufbau, Beispiel"
seoDescription: "Grounding Page erklärt: was auf die Faktenseite für KI-Systeme gehört, was der offene Standard vorgibt, was sie bringt – und ein Beispiel zum Nachbauen."
shortDefinition: "Eine Grounding Page ist eine Seite der eigenen Website, die die geprüften Stammdaten eines Unternehmens gebündelt, datiert und zitierfähig bereitstellt — als verlässliche Quelle für KI-Systeme."
synonyms: ["Grounding Pages", "Faktenseite", "Fact Sheet", "Unternehmensfakten", "Brand Facts Page", "Single Source of Truth"]
category: offpage
related: ["konsistente-markenbeschreibung", "entitaet", "grounding", "modellwissen", "entity-echoing", "llms-txt", "entity-home"]
pubDate: 2026-09-22
updatedDate: 2026-10-05
stufe: 2
faq:
  - q: "Was gehört auf eine Grounding Page?"
    a: "Alles, was ein KI-System über ein Unternehmen korrekt wiedergeben soll: Name in einer Schreibweise, Rechtsträger, Sitz, Kontakt, Leistungen, Zielgruppe, Preise oder Preisrahmen, Ansprechpartner und eine Beschreibung in drei Längen (ein Satz, 50 Wörter, 150 Wörter). Dazu ein Stand-Datum und, falls nötig, die Abgrenzung zu Firmen mit ähnlichem Namen."
  - q: "Braucht eine Grounding Page besonderes Markup für KI-Systeme?"
    a: "Nein. Eine Grounding Page ist eine normale, indexierbare HTML-Seite. Strukturierte Daten (Organization, AboutPage) helfen Suchmaschinen beim Einordnen, eine eigene Auszeichnung nur für KI gibt es nicht. Entscheidend ist, dass die Seite rankt, intern verlinkt ist und mit den Angaben auf Drittseiten übereinstimmt."
  - q: "Wie verhält sich eine Grounding Page zur llms.txt?"
    a: "Die llms.txt ist ein Wegweiser für KI-Agenten zu den wichtigsten Seiten einer Website; die Grounding Page ist eine dieser Seiten und enthält die eigentlichen Fakten. Die llms.txt sollte auf die Grounding Page verweisen, ersetzt sie aber nicht."
  - q: "Ersetzt eine Grounding Page die Über-uns-Seite?"
    a: "Nein. Die Über-uns-Seite erzählt, wer hinter einem Unternehmen steht und wofür es steht; die Grounding Page listet die prüfbaren Fakten. Beide verlinken sich gegenseitig und dürfen sich in keiner Angabe widersprechen."
---

Eine Grounding Page ist eine Seite auf der eigenen Website, die die Stammdaten eines Unternehmens an einer Stelle bündelt: wer es ist, was es anbietet, für wen, zu welchem Preis, wer dahintersteht und wo es sitzt. Jede Angabe ist datiert und so formuliert, dass sie ohne den Rest der Seite verständlich ist. Der Begriff stammt aus der GEO-Praxis; auf Websites heißt die Seite meist schlicht „Fakten", „Fact Sheet" oder „Unternehmen in Zahlen".

## Wie ist eine Grounding Page aufgebaut?

Eine Grounding Page besteht aus wenigen, festen Bausteinen. Jeder beantwortet eine Frage, die ein KI-System zu einem Unternehmen stellt:

| Baustein | Inhalt | Beantwortet die Frage |
|---|---|---|
| Kurzbeschreibung | ein Satz, 50 Wörter, 150 Wörter — wörtlich wiederverwendbar | Was macht das Unternehmen? |
| Faktenblock | Name in einer Schreibweise, Rechtsträger, Gründungsjahr, Sitz, Größe, Kontakt | Wer ist das genau? |
| Leistungen | Aufzählung, je Punkt eine Leistung; dazu, was nicht angeboten wird | Passt der Anbieter zu meiner Anfrage? |
| Zielgruppe und Markt | Branchen, Unternehmensgröße, Regionen | Für wen ist das Angebot? |
| Preise | Preise oder Preisrahmen mit Stand | Was kostet es? |
| Personen | Geschäftsführung, Ansprechpartner, Autoren mit Rolle | Wer steht dahinter? |
| Abgrenzung | Unterschied zu Firmen oder Produkten mit ähnlichem Namen | Ist das dieselbe Firma wie …? |
| Stand-Datum | sichtbar, bei jeder Änderung aktualisiert | Ist die Angabe aktuell? |

Die Sprache ist sachlich und steht in der dritten Person: der Firmenname statt „wir" ([Entity Echoing](/wissen/geo-glossar/entity-echoing/)), Fakten statt Versprechen. Jede Zeile des Faktenblocks liefert eine Angabe, die ein System einzeln übernehmen kann.

## Wie funktioniert eine Grounding Page?

Eine Grounding Page wirkt über den normalen Weg des [Groundings](/wissen/geo-glossar/grounding/): Fragt jemand eine KI nach einem Unternehmen, sucht das System im Web nach passenden Quellen und übernimmt die überzeugendsten Passagen in seine Antwort. Steht die Antwort auf „Was macht Firma X?" oder „Was kostet Firma X?" in einem eigenständigen Satz auf einer gut verlinkten, indexierten Seite, ist diese Seite ein naheliegender Kandidat. Voraussetzung ist dasselbe wie bei jeder Quelle: Die Seite muss gefunden werden und ranken.

Die Seite folgt deshalb den Regeln für zitierfähige Passagen: Überschriften als Frage, die Antwort im ersten Satz, ein Gedanke je Absatz. Ein Faktenblock als Tabelle liefert jede Angabe als eigene Zeile.

## Gibt es einen Standard für Grounding Pages?

Es gibt einen offenen Standard, aber keine Vorgabe der KI-Anbieter. Das Grounding Page Project, eine unabhängige Initiative, veröffentlicht unter [groundingpage.com](https://groundingpage.com/) eine Spezifikation (Version 1.6, Stand Juni 2026). Sie verlangt Fakten auf Ebene einer einzelnen Entität, stabile Definitionen, eine zitierfähige Struktur und Regeln zur Abgrenzung von Namensvettern. Ausgeschlossen sind Werbeaussagen, subjektive Bewertungen, sich ständig ändernde Daten, regulierte Beratung und SEO-Manipulation.

Google, OpenAI und andere Anbieter haben keinen eigenen Seitentyp dieser Art definiert. Wer dem Standard folgt, baut eine besonders saubere Faktenseite — einen Ranking-Vorteil allein durch das Format gibt es nicht.

## Was unterscheidet eine Grounding Page von der Über-uns-Seite?

Die Über-uns-Seite erzählt, die Grounding Page belegt. Auf der Über-uns-Seite stehen Geschichte, Haltung und Team; auf der Grounding Page stehen die prüfbaren Angaben, nüchtern und vollständig. Dixon Jones bezeichnet die Startseite oder die Über-uns-Seite als typische „Entity Home" einer Marke — die Seite, die definiert, wer ein Unternehmen ist, und an der sich alle anderen Seiten ausrichten müssen. Die Grounding Page ergänzt sie um die Detailtiefe, die dort keinen Platz hat. Beide Seiten verlinken sich gegenseitig und widersprechen sich in keiner Angabe.

## Warum ist eine Grounding Page für die KI-Sichtbarkeit wichtig?

Eine Grounding Page ist wichtig, weil KI-Systeme ihr Bild eines Unternehmens aus vielen Quellen zusammensetzen und Lücken selbst füllen. Fehlen gebündelte Fakten, übernimmt das Modell veraltete Angaben aus Verzeichnissen, verwechselt Firmen mit ähnlichem Namen oder beschreibt das Unternehmen gar nicht. Die Grounding Page gibt dem System eine Referenz, gegen die sich die übrigen Quellen abgleichen lassen.

Allein reicht sie nicht: Ein KI-System vertraut einer Angabe mehr, wenn Drittquellen dasselbe sagen. Die Grounding Page ist deshalb der Ausgangspunkt für eine [konsistente Markenbeschreibung](/wissen/geo-glossar/konsistente-markenbeschreibung/), nicht ihr Ersatz. Auf das [Modellwissen](/wissen/geo-glossar/modellwissen/) wirkt sie erst mit neuen Trainingsständen, auf Antworten mit Websuche schon nach der Indexierung.

## Ist eine Grounding Page Pflicht oder ein Hype?

Weder noch. Spätestens seit der CAMPIXX 2026, auf der Hanns Kronenberg Grounding Pages als Werkzeug für Marken, Produkte und Personen vorgestellt hat, ist der Begriff in der deutschen SEO-Szene verbreitet. Neu ist dabei vor allem der Name: Eine gepflegte Faktenseite war schon vorher gute Praxis, und Google ordnet GEO-Maßnahmen in seinem Leitfaden zur KI-Suche ausdrücklich als SEO ein. Der Nutzen ist trotzdem real — nicht weil KI-Systeme den Seitentyp erkennen, sondern weil ein Unternehmen damit seine Fakten einmal verbindlich festlegt und alle anderen Quellen daran ausrichten kann.

## Was bedeutet eine Grounding Page für Ihre Website?

Eine Grounding Page braucht vier Dinge: eine eigene, indexierbare URL, Links aus dem Fließtext wichtiger Seiten (nicht nur aus dem Footer), ein sichtbares Stand-Datum und dieselben Formulierungen wie auf LinkedIn, im Google-Unternehmensprofil und in Verzeichnissen. Die Beschreibung in drei Längen lässt sich dort wörtlich übernehmen. Ein Beispiel ist die [Faktenseite von CodaAI](/fakten/): Beschreibung in drei Längen, Faktenblock, Preise, Personen und die Abgrenzung zu einem Werkzeug mit ähnlichem Namen.
