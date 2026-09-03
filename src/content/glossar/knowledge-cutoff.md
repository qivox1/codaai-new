---
title: "Knowledge Cut-off"
shortDefinition: "Der Knowledge Cut-off ist der Zeitpunkt, bis zu dem Trainingsdaten in ein Sprachmodell eingeflossen sind. Alles danach kennt das Modell nur über eine Websuche."
synonyms: ["Wissensstichtag", "Training Cut-off", "Knowledge Cutoff Date"]
category: grundlagen
related: ["modellwissen", "websuche", "grounding", "freshness"]
pubDate: 2026-09-03
faq:
  - q: "Wo finde ich den Knowledge Cut-off eines Modells?"
    a: "Die Anbieter nennen ihn in der Modelldokumentation, meist als Monat und Jahr. Übersichten wie die von otterly.ai vergleichen die Stichtage der gängigen Modelle. Stand August 2026 hatten nur drei der verbreiteten Modelle überhaupt Trainingsdaten aus dem Jahr 2026."
  - q: "Was passiert mit Inhalten, die nach dem Knowledge Cut-off entstanden sind?"
    a: "Sie liegen nicht im Modellwissen. Das System kann sie nur nutzen, wenn es bei der Frage eine Websuche auslöst und Ihre Seite dabei als Quelle findet. Für alles Aktuelle ist deshalb das Grounding der einzige Weg in die Antwort."
---

Der Knowledge Cut-off ist der Stichtag, bis zu dem die Trainingsdaten eines Sprachmodells reichen. Was nach diesem Datum veröffentlicht wurde, ist nicht Teil des [Modellwissens](/wissen/geo-glossar/modellwissen/). Ein Modell mit Cut-off im Herbst 2025 kennt aus eigenem Wissen keine Studie, kein Produkt und keinen Preis aus dem Jahr 2026.

## Wie funktioniert der Knowledge Cut-off?

Ein Modell wird auf einem festen Datensatz trainiert. Nach dem Training ändert sich sein Wissen nicht mehr, bis der Anbieter eine neue Version trainiert. Die Stichtage liegen typischerweise mehrere Monate vor der Veröffentlichung eines Modells; Stand August 2026 hatten nur drei der verbreiteten Modelle Trainingsdaten aus 2026. Die Lücke zwischen Stichtag und Gegenwart schließen die Systeme über eine [Websuche](/wissen/geo-glossar/websuche/), deren Ergebnisse per [Grounding](/wissen/geo-glossar/grounding/) in die Antwort einfließen.

## Warum ist der Knowledge Cut-off für die KI-Sichtbarkeit wichtig?

Er erklärt, warum Grounding so viel Gewicht hat. Ein Modell, das sich bei einer Frage nicht sicher ist — weil das Thema neu ist oder sich schnell ändert —, löst eine Websuche aus. Genau in diesem Moment zählt, ob Ihre Seite für die Anfrage rankt und ob ihre Passagen extrahierbar sind. Bei Fragen zu Preisen, Terminen, Produktneuheiten und aktuellen Zahlen ist die Websuche der Regelfall, nicht die Ausnahme.

## Was bedeutet das für Ihre Website?

Alles, was Sie nach dem Cut-off der gängigen Modelle veröffentlicht haben, erreicht die KI nur über die Websuche. Machen Sie deshalb die Aktualität Ihrer Inhalte sichtbar: Veröffentlichungs- und Änderungsdatum im Quelltext und im Schema, aktuelle Jahreszahlen im Text. Der Begriff [Freshness](/wissen/geo-glossar/freshness/) beschreibt, warum KI-Systeme ältere Inhalte deutlich seltener zitieren.
