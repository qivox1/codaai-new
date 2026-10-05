---
title: "KI-Halluzination"
seoTitle: "KI-Halluzination: Ursachen"
seoDescription: "KI-Halluzination erklärt: warum Sprachmodelle falsche Angaben erfinden, welche Formen Firmen betreffen und wie Sie Fehler über Ihre Marke korrigieren."
shortDefinition: "Eine KI-Halluzination ist eine Aussage eines KI-Systems, die plausibel klingt, aber falsch ist oder sich auf keine Quelle stützt. Sie entsteht, weil Sprachmodelle wahrscheinliche statt geprüfte Antworten erzeugen."
synonyms: ["Halluzination", "AI Hallucination", "Konfabulation", "KI-Fehlinformation"]
category: grundlagen
related: ["modellwissen", "grounding", "knowledge-cutoff", "promptset", "nullmessung", "korroboration"]
pubDate: 2026-10-05
faq:
  - q: "Verhindert Grounding jede KI-Halluzination?"
    a: "Nein. Grounding verringert Halluzinationen, weil das Modell seine Antwort auf gefundene Quellen stützt. Sind diese Quellen falsch oder veraltet, übernimmt die Antwort den Fehler. Fehlen Quellen zu einem Unternehmen, greift das Modell weiter auf sein Gedächtnis zurück."
  - q: "Wie finde ich eine KI-Halluzination über mein eigenes Unternehmen?"
    a: "Mit einem festen Satz von Fragen, den Sie regelmäßig an mehrere KI-Systeme stellen. Vergleichen Sie die Antworten mit Ihren gesicherten Fakten zu Leistungen, Preisen und Standorten. Besonders aufschlussreich sind Fragen, in denen Ihr Firmenname nicht vorkommt — etwa nach Anbietern einer Kategorie."
  - q: "Lässt sich eine KI-Halluzination über eine Marke dauerhaft korrigieren?"
    a: "Nicht im Modell selbst, aber über die Quellen. Ergänzen Sie fehlende Fakten als Text auf Ihrer Website, aktualisieren Sie veraltete Angaben und sorgen Sie dafür, dass unabhängige Quellen dasselbe sagen. Dann haben Grounding und künftige Trainingsdaten etwas Richtiges, auf das sie zurückgreifen können."
---

Eine KI-Halluzination ist eine Aussage eines KI-Systems, die plausibel klingt, aber falsch ist oder sich auf keine Quelle stützt. Das System erfindet etwa eine Produkteigenschaft, einen Preis, eine Studie oder eine URL und trägt sie mit derselben Sicherheit vor wie eine belegte Tatsache. Ein Hinweis, dass hier geraten wurde, fehlt in der Regel.

## Wie entsteht eine KI-Halluzination?

Die erste Ursache liegt im Prinzip eines Sprachmodells. Ein [LLM](/wissen/geo-glossar/llm/) erzeugt Text, indem es die wahrscheinlichste Fortsetzung berechnet — nicht die geprüfte. Ein Forschungsteam um Adam Tauman Kalai (OpenAI) argumentiert im September 2025, dass Modelle bei Unsicherheit raten, weil Training und Bewertung Raten belohnen und das Eingeständnis von Unsicherheit bestrafen ([Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664)).

Die zweite Ursache sind Lücken im [Modellwissen](/wissen/geo-glossar/modellwissen/). Modelle kennen häufig beschriebene Fakten gut und seltene schlecht. Duane Forrester verweist auf Forschung, nach der größere Modelle vor allem populäre Fakten besser abrufen und bei seltenen kaum zulegen (August 2026). Ein mittelständischer Hersteller liegt meist genau in diesem dünnen Bereich.

Die dritte Ursache sind veraltete Quellen. Was ein Modell im Training gelernt hat, endet mit seinem [Knowledge Cut-off](/wissen/geo-glossar/knowledge-cutoff/). Lily Grozeva beobachtet, dass Sprachmodelle Führungspersonen nennen, die ein Unternehmen vor 15 Jahren verlassen haben (August 2026).

## Welche Formen der KI-Halluzination betreffen Unternehmen?

Duane Forrester unterscheidet zufällige Halluzinationen — eine erfundene Quelle, eine falsche Zahl — von einer systematischen „Substitution“: Hat ein Modell zu einem Unternehmen wenig Material, beschreibt es stattdessen etwas gut Dokumentiertes in der Nähe (August 2026). Er nennt vier Formen:

| Form | Was passiert |
|---|---|
| Stille Analogie | Das Modell beschreibt den nächsten gut dokumentierten Nachbarn — oft einen Wettbewerber — als Ihr Unternehmen. |
| Veraltetes als Gegenwart | Ein früher richtiger Stand erscheint im Präsens: eingestellte Produkte, ausgeschiedene Führungskräfte. |
| Dünne Belege, volle Sicherheit | Eine Angabe aus einer einzigen Quelle klingt wie ein breiter Konsens. |
| Kategorie statt Unternehmen | Das Modell beantwortet die Frage für die Branche und setzt Ihren Namen ein. |

Forresters Fazit: Die Modelle werden besser darin, nichts zu erfinden — aber nicht besser darin, Unternehmen zu kennen, über die kaum jemand geschrieben hat.

## Wie häufig sind KI-Halluzinationen?

Belastbare Zahlen gibt es nur für eng umrissene Aufgaben. In einer im Oktober 2025 veröffentlichten Studie der Europäischen Rundfunkunion (EBU) und der BBC prüften Journalistinnen und Journalisten mehr als 3.000 Antworten von ChatGPT, Copilot, Gemini und Perplexity zu Nachrichteninhalten. 20 % enthielten gravierende Genauigkeitsprobleme, darunter halluzinierte Details und veraltete Informationen. Auf Fragen zu Unternehmen lässt sich diese Quote nicht direkt übertragen.

## Warum verringert Grounding Halluzinationen, ohne sie zu verhindern?

[Grounding](/wissen/geo-glossar/grounding/) gibt dem Modell Quellen, auf die es seine Antwort stützt. Das senkt das Risiko, dass es Fakten erfindet. Drei Lücken bleiben:

- **Falsche Quellen:** Ist die gefundene Seite falsch oder veraltet, übernimmt die Antwort den Fehler.
- **Fehlende Quellen:** Laut Forrester bevorzugt auch das Retrieval bekannte Entitäten. Wenig beschriebene Unternehmen werden seltener gefunden.
- **Unsichtbare Angaben:** Im Experiment von OtterlyAI halluzinierten ChatGPT und andere Systeme sogar bei Informationen, die nur im Schema-Markup standen und nicht im Text (Thomas Peham, September 2026).

## Warum ist die KI-Halluzination für die KI-Sichtbarkeit wichtig?

Sichtbarkeit hilft nur, wenn die Angaben stimmen. Eine Empfehlung mit falschem Preis oder falscher Leistung schadet mehr als keine Nennung. Liam Dunne weist zudem darauf hin, dass ein Modell eine Firma unter Umständen nicht empfiehlt, wenn Quellen ihren Angaben widersprechen (Mai 2026). Halluzinierte URLs führen Besucher außerdem auf Fehlerseiten.

## Was bedeutet das für Ihre Website?

Behandeln Sie falsche KI-Angaben über Ihre Marke als Messaufgabe:

1. **Nullmessung:** Stellen Sie ein [Promptset](/wissen/geo-glossar/promptset/) zusammen und halten Sie in einer [Nullmessung](/wissen/geo-glossar/nullmessung/) fest, was KI-Systeme heute über Sie sagen. Forrester rät zu Fragen, in denen Ihr Name nicht vorkommt: Kategorie-, Vergleichs- und Fähigkeitsfragen.
2. **Abgleich:** Prüfen Sie jede Aussage gegen Ihre gesicherten Fakten zu Leistungen, Preisen, Standorten und Personen.
3. **Quellen korrigieren:** Ergänzen Sie fehlende Fakten als sichtbaren Text, etwa auf einer [Grounding Page](/wissen/geo-glossar/grounding-page/), und aktualisieren Sie veraltete Seiten. Sorgen Sie dafür, dass unabhängige Quellen dasselbe sagen ([Korroboration](/wissen/geo-glossar/korroboration/)).
4. **URLs prüfen:** John Clark rät, Zugriffe aus KI-Systemen auf nicht existierende Seiten auszuwerten und sie auf passende Seiten weiterzuleiten (Lumar-Webinar, März 2026).

Wiederholen Sie die Messung regelmäßig. Substitutionen wechseln, und jede Korrektur braucht Zeit, bis sie in den Antworten ankommt.
