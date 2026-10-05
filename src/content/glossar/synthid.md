---
title: "SynthID (KI-Wasserzeichen)"
seoTitle: "SynthID: KI-Wasserzeichen"
seoDescription: "SynthID erklärt: wie Googles unsichtbares Wasserzeichen KI-Texte, Bilder, Audio und Video markiert, was der EU AI Act verlangt und was das für GEO bedeutet."
shortDefinition: "SynthID ist das Wasserzeichen-Verfahren von Google DeepMind für KI-generierte Inhalte. Es bettet in Texte, Bilder, Audio und Video ein für Menschen unsichtbares Signal ein, das Googles Prüfwerkzeuge erkennen."
synonyms: ["KI-Wasserzeichen", "AI Watermark", "Google SynthID", "SynthID Text", "SynthID Detector"]
category: grundlagen
related: ["e-e-a-t", "information-gain", "halluzination", "token", "llm"]
pubDate: 2026-10-05
faq:
  - q: "Stuft Google Inhalte mit SynthID-Wasserzeichen in der Suche ab?"
    a: "Dafür gibt es keinen Beleg. Google hat nicht erklärt, SynthID als negativen Rankingfaktor zu nutzen (SISTRIX, September 2026). Googles Richtlinien bewerten KI-Inhalte nach Mehrwert; massenhaft erzeugte Seiten ohne Mehrwert können gegen die Spam-Richtlinie zu skaliertem Content verstoßen."
  - q: "Wie zuverlässig erkennt SynthID KI-generierte Texte?"
    a: "Bei längeren, sprachlich freien Texten gut, bei kurzen oder faktenlastigen Antworten schlechter. Laut Google sinkt die Erkennungssicherheit stark, wenn ein Text gründlich umgeschrieben oder übersetzt wird. Ein fehlendes Wasserzeichen beweist deshalb nicht, dass ein Mensch den Text geschrieben hat."
  - q: "Müssen Unternehmen ihre Texte wegen des EU AI Act mit SynthID markieren?"
    a: "Nein. Die Pflicht zur maschinenlesbaren Markierung nach Artikel 50 Absatz 2 trifft die Anbieter der KI-Systeme. Wer KI-Texte veröffentlicht, muss sie nur offenlegen, wenn sie die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse informieren und keine menschliche Prüfung mit redaktioneller Verantwortung stattfand."
---

SynthID ist ein Verfahren von Google DeepMind, das KI-generierte Inhalte mit einem digitalen Wasserzeichen versieht. Das Wasserzeichen ist für Menschen nicht wahrnehmbar, lässt sich aber mit Googles Prüfwerkzeugen nachweisen. SynthID arbeitet mit Texten, Bildern, Audio und Video, die mit Googles KI-Modellen erzeugt wurden.

## Wie funktioniert SynthID?

Bei Bildern, Video und Audio bettet SynthID das Signal direkt in die Datei ein, unsichtbar bzw. unhörbar (Google DeepMind). Bei Text setzt das Verfahren an der Wortwahl an. Ein [LLM](/wissen/geo-glossar/llm/) wählt jeden [Token](/wissen/geo-glossar/token/) nach Wahrscheinlichkeiten aus. SynthID verschiebt diese Wahrscheinlichkeiten geringfügig, sodass über viele Tokens ein statistisches Muster entsteht (Google AI for Developers). Die Textqualität soll dabei laut Google nicht spürbar leiden.

Google hat SynthID 2023 eingeführt. Bis November 2025 wurden laut Google mehr als 20 Milliarden Inhalte damit markiert. Die Textvariante ist quelloffen und steht in der Bibliothek Hugging Face Transformers ab Version 4.46.0 zur Verfügung (Google AI for Developers).

Prüfen lässt sich ein Inhalt an mehreren Stellen. Im Mai 2025 stellte Google das Prüfportal SynthID Detector vor. In der Gemini-App können Nutzer Bilder, Videos und Audiodateien hochladen und fragen, ob sie mit Google-KI erstellt wurden. Seit Mai 2026 baut Google die Prüfung in die Suche aus, etwa in Lens, [AI Mode](/wissen/geo-glossar/ai-mode/) und Circle to Search, und danach in Chrome (Google I/O, Mai 2026).

## Wo liegen die Grenzen von SynthID?

Der SynthID Detector prüft laut Google Inhalte, die mit Google-KI erstellt wurden. Inhalte anderer Anbieter ohne SynthID-Wasserzeichen erkennt er nicht.

Bei Text ist die Erkennung zudem unsicher. Laut Google wirkt das Wasserzeichen bei Faktenantworten schwächer, weil es dort weniger Spielraum bei der Wortwahl gibt. Gründliches Umschreiben oder Übersetzen kann die Erkennungssicherheit stark senken (Google AI for Developers). Leichte Änderungen oder gekürzte Passagen übersteht es dagegen.

Daraus folgt: Ein fehlendes Wasserzeichen ist weder ein Qualitätsmerkmal noch ein Beweis, dass keine KI beteiligt war (SISTRIX, September 2026).

## Was verlangt der EU AI Act?

Artikel 50 Absatz 2 des EU AI Act verpflichtet Anbieter von KI-Systemen, die synthetische Texte, Bilder, Audio oder Video erzeugen, ihre Ausgaben maschinenlesbar zu markieren und als künstlich erzeugt erkennbar zu machen. Die Pflicht gilt seit dem 2. August 2026. Für Systeme, die vor diesem Datum auf den Markt kamen, gilt sie erst ab dem 2. Dezember 2026 (Europäische Kommission, FAQ zu Artikel 50). Unsichtbare Wasserzeichen wie SynthID sind eine Form solcher maschinenlesbaren Markierung.

Für Unternehmen, die KI-Texte veröffentlichen, gilt Artikel 50 Absatz 4. Sie müssen KI-Texte kennzeichnen, die die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse informieren. Das entfällt, wenn eine menschliche Prüfung stattfand und jemand die redaktionelle Verantwortung trägt. Eine reine Rechtschreibkorrektur zählt laut Kommission nicht als Prüfung.

## Warum ist SynthID für die KI-Sichtbarkeit wichtig?

Ein Wasserzeichen sagt etwas über die Herkunft eines Inhalts, nichts über seine Qualität. Ob ein KI-System eine Seite zitiert, hängt davon ab, ob sie die Frage beantwortet, neue Informationen liefert ([Information Gain](/wissen/geo-glossar/information-gain/)) und glaubwürdig ist ([E-E-A-T](/wissen/geo-glossar/e-e-a-t/)).

Für Google gilt dasselbe. Google erlaubt KI-generierte Inhalte, solange sie Mehrwert bieten. Seiten in großer Zahl ohne Mehrwert zu erzeugen, kann gegen die Spam-Richtlinie zu skaliertem Content verstoßen (Google Search Central, Oktober 2026). Google verlangt außerdem, KI-Texte vor der Veröffentlichung auf Fehler zu prüfen, weil sie [Halluzinationen](/wissen/geo-glossar/halluzination/) enthalten können.

## Was bedeutet das für Ihre Website?

Bei Bildern: Entfernen Sie Herkunftsdaten nicht. Für Shops im Google Merchant Center verlangt Google, dass KI-generierte Produktbilder die IPTC-Metadaten `DigitalSourceType` mit dem Wert `TrainedAlgorithmicMedia` tragen (Google Search Central, Oktober 2026). Prüfen Sie, ob Ihr Bildoptimierer diese Metadaten beim Komprimieren entfernt.

Bei Texten: Machen Sie die redaktionelle Verantwortung sichtbar. SISTRIX empfiehlt Autorenangaben, Datum, Methodik und überprüfbare Quellen für Zahlen und Rechtsaussagen (September 2026). Das hilft Lesern, macht die menschliche Prüfung nachvollziehbar, auf die es im AI Act ankommt, und stärkt die Zitierfähigkeit.

Nutzen Sie Wasserzeichen-Prüfer nicht als Qualitätskontrolle. Ob ein Text zitiert wird, entscheidet sein Inhalt, nicht der Nachweis seiner Herkunft.
