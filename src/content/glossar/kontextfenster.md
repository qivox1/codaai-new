---
title: "Kontextfenster"
seoTitle: "Kontextfenster: Was ist das?"
seoDescription: "Kontextfenster erklärt: wie viele Token ein Sprachmodell auf einmal verarbeitet, warum KI-Suchen trotzdem nur Auszüge nutzen und was das für Ihre Website heißt."
shortDefinition: "Das Kontextfenster ist die Textmenge, gemessen in Token, die ein Sprachmodell bei einer Antwort gleichzeitig berücksichtigt. Dazu zählen Anweisungen, Frage, abgerufene Quellen und die Antwort selbst."
synonyms: ["Context Window", "Kontextlänge", "Context Length", "Kontextgröße"]
category: grundlagen
related: ["token", "grounding-budget", "grounding-snippets", "llm", "retrieval-augmented-generation", "bottom-line-up-front"]
pubDate: 2026-10-05
faq:
  - q: "Wie groß ist das Kontextfenster aktueller Sprachmodelle?"
    a: "Laut Anthropic haben aktuelle Claude-Modelle wie Claude Opus 5.5 ein Kontextfenster von 1 Million Token (Claude-Dokumentation, Oktober 2026). Google gibt für viele Gemini-Modelle 1 Million Token oder mehr an (Gemini-API-Dokumentation, Juni 2026). Die Werte ändern sich mit jeder Modellgeneration; maßgeblich ist die Dokumentation des Herstellers."
  - q: "Warum nutzen KI-Suchen trotz großem Kontextfenster nur Auszüge?"
    a: "Weil mehr Kontext nicht automatisch bessere Antworten liefert. Anthropic beschreibt, dass Genauigkeit und Erinnerungsleistung mit wachsender Tokenzahl abnehmen. Jedes Token kostet außerdem Rechenzeit. KI-Suchen wählen deshalb die passendsten Passagen aus, statt ganze Seiten zu laden."
  - q: "Ist ein größeres Kontextfenster für die Sichtbarkeit meiner Website ein Vorteil?"
    a: "Nur bedingt. Ein größeres Kontextfenster erlaubt mehr Quellen, ändert aber nichts an der Auswahl: Ins Fenster gelangt nur, was vorher gefunden und als relevant bewertet wurde. Der Hebel bleibt das Ranking und die Qualität des einzelnen Abschnitts."
---

Das Kontextfenster ist die Menge an Text, die ein [Sprachmodell](/wissen/geo-glossar/llm/) bei einer Antwort gleichzeitig berücksichtigen kann. Gemessen wird es in [Token](/wissen/geo-glossar/token/). Anthropic definiert es als allen Text, auf den ein Modell beim Erzeugen einer Antwort zurückgreifen kann, einschließlich der Antwort selbst — eine Art Arbeitsgedächtnis, getrennt von den Daten, mit denen das Modell trainiert wurde ([Claude-Dokumentation](https://platform.claude.com/docs/en/build-with-claude/context-windows), Stand Oktober 2026).

## Wie funktioniert das Kontextfenster?

In das Kontextfenster gehört alles, was das Modell für eine Antwort verarbeitet: die Systemanweisungen, der bisherige Gesprächsverlauf, die Frage des Nutzers, abgerufene Quellen und die Antwort, die gerade entsteht. Alles zusammen muss in die maximale Tokenzahl passen. Was nicht hineinpasst, wird gekürzt, zusammengefasst oder weggelassen.

Google vergleicht das Kontextfenster mit dem Kurzzeitgedächtnis: Wie ein Mensch kann auch ein generatives Modell nur eine begrenzte Menge an Information gleichzeitig präsent halten (Gemini-API-Dokumentation, Juni 2026). Das [Modellwissen](/wissen/geo-glossar/modellwissen/) aus dem Training ist davon getrennt. Es steckt in den Parametern des Modells und belegt keinen Platz im Fenster.

## Wie groß sind Kontextfenster heute?

Die Größen ändern sich mit jeder Modellgeneration. Die folgenden Angaben stammen aus den offiziellen Herstellerdokumentationen:

| Hersteller | Angabe | Quelle |
|---|---|---|
| Anthropic | 1 Million Token bei aktuellen Modellen wie Claude Opus 5.5 und Claude Sonnet 5.5; 200.000 Token unter anderem bei Claude Sonnet 4.5 | Claude-Dokumentation, Oktober 2026 |
| Google | 1 Million Token oder mehr bei vielen Gemini-Modellen | Gemini-API-Dokumentation, Juni 2026 |

Google übersetzt 1 Million Token in Beispiele: etwa 50.000 Zeilen Code oder acht englische Romane durchschnittlicher Länge.

## Warum nutzen KI-Systeme trotz großer Fenster nur Auszüge?

Mehr Kontext heißt nicht bessere Antworten. Anthropic schreibt, dass Genauigkeit und Erinnerungsleistung mit wachsender Tokenzahl abnehmen, und nennt das „Context Rot“. Was im Kontext steht, sei deshalb genauso wichtig wie die Größe des Fensters (Claude-Dokumentation, Oktober 2026).

Auch die Position zählt. Nelson F. Liu und Kollegen zeigten im Juli 2023 in der Studie „Lost in the Middle“, dass Sprachmodelle Informationen am Anfang oder Ende eines langen Kontexts am besten nutzen und in der Mitte deutlich schlechter — auch Modelle, die für lange Kontexte gebaut sind.

Dazu kommt der Aufwand: Jedes Token kostet Rechenzeit. KI-Suchen legen deshalb keine ganzen Seiten in das Fenster, sondern ausgewählte Passagen ([Grounding Snippets](/wissen/geo-glossar/grounding-snippets/)), und verteilen den begrenzten Platz auf die Quellen ([Grounding Budget](/wissen/geo-glossar/grounding-budget/)). Andrea Volpini argumentierte auf der SEO Week 2026, dass mehr Information im Kontextfenster Retrieval-Probleme nicht löst; KI-Systeme bräuchten bessere Navigation und Struktur (iPullRank, Mai 2026).

## Warum ist das Kontextfenster für die KI-Sichtbarkeit wichtig?

Das Kontextfenster ist die Bühne der Antwort: Nur was dort steht, kann in die Antwort einfließen und zitiert werden. Lily Ray argumentiert, dass Inhalte, die nicht indexiert sind und nicht ranken, gar nicht erst in das Kontextfenster der großen KI-Suchprodukte gelangen (Substack, März 2026).

Im Fenster zu stehen, reicht aber nicht. Dort konkurriert Ihr Abschnitt mit den Auszügen anderer Quellen. Gareth Simpson berichtete auf der brightonSEO aus Tests mit lokalen Modellen, dass eine textlastige WordPress-Seite das Kontextfenster überfüllte; große Anbieter komprimierten den Inhalt dann, und es bleibe dem Zufall überlassen, was das Modell über eine Marke sagt (brightonSEO, Juni 2026).

## Was bedeutet das für Ihre Website?

Stellen Sie die Kernaussage an den Anfang jedes Abschnitts ([Bottom Line Up Front](/wissen/geo-glossar/bottom-line-up-front/)). Ein Auszug, der mit der Antwort beginnt, trägt auch dann, wenn das System ihn kürzt oder weit hinten im Kontext platziert.

Schreiben Sie kompakte, in sich geschlossene Absätze ohne Füllsätze. Jedes Token, das nichts zur Antwort beiträgt, belegt Platz, den Ihre eigentliche Aussage braucht. Der Tool-Anbieter TollBit weist zusätzlich darauf hin, dass Layout-Code, Skripte und Tracking in HTML-Seiten Token verbrauchen, das Kontextfenster füllen und die Antwortqualität verschlechtern können (TollBit, April 2026).
