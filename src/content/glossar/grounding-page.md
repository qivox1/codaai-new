---
title: "Grounding Page"
shortDefinition: "Eine Grounding Page ist eine Seite der eigenen Website, die die geprüften Stammdaten eines Unternehmens gebündelt, datiert und zitierfähig bereitstellt — als verlässliche Quelle für KI-Systeme."
synonyms: ["Faktenseite", "Fact Sheet", "Unternehmensfakten", "Brand Facts Page"]
category: offpage
related: ["konsistente-markenbeschreibung", "entitaet", "grounding", "modellwissen", "entity-echoing", "llms-txt"]
pubDate: 2026-09-22
stufe: 2
faq:
  - q: "Was gehört auf eine Grounding Page?"
    a: "Alles, was ein KI-System über ein Unternehmen korrekt wiedergeben soll: Name in einer Schreibweise, Rechtsträger, Sitz, Kontakt, Leistungen, Zielgruppe, Preise oder Preisrahmen, Ansprechpartner und eine Beschreibung in drei Längen (ein Satz, 50 Wörter, 150 Wörter). Dazu ein Stand-Datum und, falls nötig, die Abgrenzung zu Firmen mit ähnlichem Namen."
  - q: "Braucht eine Grounding Page besonderes Markup für KI-Systeme?"
    a: "Nein. Eine Grounding Page ist eine normale, indexierbare HTML-Seite. Strukturierte Daten (Organization, AboutPage) helfen Suchmaschinen beim Einordnen, eine eigene Auszeichnung nur für KI gibt es nicht. Entscheidend ist, dass die Seite rankt, intern verlinkt ist und mit den Angaben auf Drittseiten übereinstimmt."
  - q: "Wie verhält sich eine Grounding Page zur llms.txt?"
    a: "Die llms.txt ist ein Wegweiser für KI-Agenten zu den wichtigsten Seiten einer Website; die Grounding Page ist eine dieser Seiten und enthält die eigentlichen Fakten. Die llms.txt sollte auf die Grounding Page verweisen, ersetzt sie aber nicht."
---

Eine Grounding Page ist eine Seite auf der eigenen Website, die die Stammdaten eines Unternehmens an einer Stelle bündelt: wer es ist, was es anbietet, für wen, zu welchem Preis, wer dahintersteht und wo es sitzt. Jede Angabe ist datiert und so formuliert, dass sie ohne den Rest der Seite verständlich ist. Der Begriff stammt aus der GEO-Praxis; auf Websites heißt die Seite meist schlicht „Fakten", „Fact Sheet" oder „Unternehmen in Zahlen".

## Wie funktioniert eine Grounding Page?

Eine Grounding Page wirkt über den normalen Weg des [Groundings](/wissen/geo-glossar/grounding/): Fragt jemand eine KI nach einem Unternehmen, sucht das System im Web nach passenden Quellen und übernimmt die überzeugendsten Passagen in seine Antwort. Steht die Antwort auf „Was macht Firma X?" oder „Was kostet Firma X?" in einem eigenständigen Satz auf einer gut verlinkten, indexierten Seite, ist diese Seite ein naheliegender Kandidat. Voraussetzung ist dasselbe wie bei jeder Quelle: Die Seite muss gefunden werden und ranken.

Die Seite folgt deshalb den Regeln für zitierfähige Passagen: Überschriften als Frage, die Antwort im ersten Satz, der Firmenname statt „wir" ([Entity Echoing](/wissen/geo-glossar/entity-echoing/)), ein Gedanke je Absatz. Ein Faktenblock als Tabelle liefert jede Angabe als eigene Zeile.

## Warum ist eine Grounding Page für die KI-Sichtbarkeit wichtig?

Eine Grounding Page ist wichtig, weil KI-Systeme ihr Bild eines Unternehmens aus vielen Quellen zusammensetzen und Lücken selbst füllen. Fehlen gebündelte Fakten, übernimmt das Modell veraltete Angaben aus Verzeichnissen, verwechselt Firmen mit ähnlichem Namen oder beschreibt das Unternehmen gar nicht. Die Grounding Page gibt dem System eine Referenz, gegen die sich die übrigen Quellen abgleichen lassen.

Allein reicht sie nicht: Ein KI-System vertraut einer Angabe mehr, wenn Drittquellen dasselbe sagen. Die Grounding Page ist deshalb der Ausgangspunkt für eine [konsistente Markenbeschreibung](/wissen/geo-glossar/konsistente-markenbeschreibung/), nicht ihr Ersatz. Auf das [Modellwissen](/wissen/geo-glossar/modellwissen/) wirkt sie erst mit neuen Trainingsständen, auf Antworten mit Websuche schon nach der Indexierung.

## Was bedeutet eine Grounding Page für Ihre Website?

Eine Grounding Page braucht vier Dinge: eine eigene, indexierbare URL, Links aus dem Fließtext wichtiger Seiten (nicht nur aus dem Footer), ein sichtbares Stand-Datum und dieselben Formulierungen wie auf LinkedIn, im Google-Unternehmensprofil und in Verzeichnissen. Die Beschreibung in drei Längen lässt sich dort wörtlich übernehmen. Ein Beispiel ist die [Faktenseite von CodaAI](/fakten/): Beschreibung in drei Längen, Faktenblock, Preise, Personen und die Abgrenzung zu einem Werkzeug mit ähnlichem Namen.
