---
title: "Token"
shortDefinition: "Ein Token ist die kleinste Einheit, mit der ein Sprachmodell arbeitet: ein Wort, ein Wortteil oder ein einzelnes Zeichen. Alle Wahrscheinlichkeiten eines LLM beziehen sich auf Tokens."
synonyms: ["Tokens", "Tokenisierung"]
category: grundlagen
related: ["llm", "embedding", "chunking"]
pubDate: 2026-09-03
faq:
  - q: "Wie viele Tokens hat ein deutscher Text?"
    a: "Als Faustregel entsprechen 100 deutsche Wörter etwa 150 bis 200 Tokens, weil zusammengesetzte Wörter und Umlaute in mehrere Teile zerlegt werden. Die genaue Zahl hängt vom Tokenizer des jeweiligen Modells ab."
  - q: "Warum sind Tokens für die KI-Sichtbarkeit relevant?"
    a: "Weil KI-Systeme Kontext in Tokens bemessen und begrenzen. Ein aufgeblähter Quelltext verbraucht Tokens für Markup statt für Inhalt — wer schlank ausliefert, bekommt mehr seines eigentlichen Textes in den Kontext des Modells."
---

Ein Token ist die kleinste Einheit, mit der ein [Sprachmodell](/wissen/geo-glossar/llm/) rechnet. Je nach Modell ist ein Token ein ganzes Wort, ein Wortteil oder ein einzelnes Zeichen. Das Wort „Sichtbarkeit" wird zum Beispiel in zwei oder drei Tokens zerlegt, ein Punkt ist ein eigenes Token. Alles, was ein Modell tut — lesen, gewichten, generieren — geschieht auf dieser Ebene.

## Wie funktionieren Tokens?

Bevor ein Modell einen Text verarbeitet, zerlegt ein Tokenizer ihn in Tokens und ordnet jedem eine Nummer zu. Das Modell schätzt anschließend für jede Position, welches Token mit welcher Wahrscheinlichkeit folgt. Für die Weiterverarbeitung als Bedeutung werden Tokens beziehungsweise ganze Abschnitte in Vektoren übersetzt (siehe [Embedding](/wissen/geo-glossar/embedding/)).

Tokens sind auch die Währung des Kontextfensters. Jedes Modell kann nur eine bestimmte Menge an Tokens gleichzeitig „im Blick" haben. In dieses Fenster müssen die Nutzerfrage, die Anweisungen des Systems und alle Auszüge aus Webseiten passen, die das System bei einer Websuche gefunden hat.

## Warum sind Tokens für die KI-Sichtbarkeit wichtig?

Weil Kontext knapp und teuer ist, geben KI-Systeme einer Seite nicht beliebig viel Raum. Sie extrahieren Passagen ([Grounding Snippets](/wissen/geo-glossar/grounding-snippets/)) statt ganze Seiten zu übernehmen. Ein Text, der seine Kernaussage früh und in kurzen, eigenständigen Sätzen liefert, hat in diesem Budget bessere Chancen als ein Text, der auf Seite drei zur Sache kommt.

## Was bedeutet das für Ihre Website?

Halten Sie das Verhältnis von sichtbarem Text zu Quelltext im Blick. Seiten, bei denen der lesbare Text nur wenige Prozent des HTML ausmacht, lassen Agenten und Crawler vor allem Markup verarbeiten. Schlankes, semantisches HTML und Inhalte, die ohne JavaScript vorliegen, sorgen dafür, dass die Tokens, die ein System für Ihre Seite aufwendet, tatsächlich Ihren Inhalt tragen.
