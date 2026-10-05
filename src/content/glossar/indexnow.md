---
title: "IndexNow"
seoTitle: "IndexNow: Protokoll erklärt"
seoDescription: "IndexNow erklärt: wie das offene Protokoll Suchmaschinen sofort über neue, geänderte und gelöschte URLs informiert, wer teilnimmt und wie Sie es einrichten."
shortDefinition: "IndexNow ist ein offenes Protokoll, mit dem eine Website Suchmaschinen sofort über neue, geänderte oder gelöschte URLs informiert. Eine Meldung erreicht alle teilnehmenden Suchmaschinen, darunter Bing — Google gehört nicht dazu."
synonyms: ["Index Now", "IndexNow-Protokoll", "IndexNow API", "IndexNow-Ping"]
category: technik
related: ["url-discovery", "crawl-budget", "index-management", "freshness", "llm-crawler", "logfiles"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Unterstützt Google IndexNow?"
    a: "Nein. Google steht nicht auf der Liste der teilnehmenden Suchmaschinen auf indexnow.org (Stand Oktober 2026). Für Google bleiben XML-Sitemap, interne Verlinkung und die Search Console die Wege, neue URLs bekannt zu machen."
  - q: "Garantiert IndexNow, dass eine Seite indexiert wird?"
    a: "Nein. Die FAQ auf indexnow.org sagt ausdrücklich, dass eine Meldung keine sofortige Indexierung garantiert. Die Suchmaschine entscheidet nach Crawl-Kontingent, Qualitätssignalen und eigener Planung, ob und wann sie die URL abruft."
  - q: "Wie viele URLs kann ich mit IndexNow auf einmal melden?"
    a: "Bis zu 10.000 URLs pro POST-Anfrage, laut Dokumentation auf indexnow.org. Einzelne URLs lassen sich auch per einfachem GET-Aufruf melden. Dieselbe URL sollten Sie nur nach echten Änderungen erneut senden."
---

IndexNow ist ein offenes Protokoll, mit dem Website-Betreiber Suchmaschinen aktiv mitteilen, dass sich eine URL geändert hat. Statt zu warten, bis ein Crawler die Änderung selbst entdeckt, schickt die Website eine kurze Meldung an einen IndexNow-Endpunkt. Gemeldet werden neue, geänderte und gelöschte Inhalte. Microsoft Bing hat das Protokoll im Oktober 2021 vorgestellt (Bing Webmaster Blog).

## Wie funktioniert IndexNow?

Das Verfahren hat zwei Bausteine: einen Schlüssel, der beweist, dass Sie die Domain kontrollieren, und die eigentliche Meldung.

1. **Schlüssel erzeugen.** Der Schlüssel ist 8 bis 128 Zeichen lang und besteht aus Buchstaben, Ziffern und Bindestrichen (indexnow.org).
2. **Schlüsseldatei ablegen.** Eine Textdatei mit dem Schlüssel als Namen und Inhalt liegt im Wurzelverzeichnis, also unter `https://ihre-domain.de/{schlüssel}.txt`. Sie muss ohne Login erreichbar sein.
3. **URLs melden.** Eine einzelne URL geht per GET-Aufruf an einen Endpunkt, mehrere URLs per POST als JSON.

Eine Sammelmeldung sieht laut Dokumentation so aus:

```json
{
  "host": "www.example.com",
  "key": "fa8c0a469da44e9b8f6a769f291829f5",
  "urlList": [
    "https://www.example.com/neue-seite/",
    "https://www.example.com/geaenderte-seite/"
  ]
}
```

Pro POST-Anfrage sind bis zu 10.000 URLs erlaubt. Die Antwort zeigt das Ergebnis: 200 heißt angenommen, 202 heißt angenommen mit noch ausstehender Schlüsselprüfung, 403 heißt Schlüssel ungültig, 429 heißt zu viele Anfragen (indexnow.org).

## Welche Suchmaschinen nehmen an IndexNow teil?

Laut indexnow.org nehmen Amazon, Bing, Naver, Seznam.cz, Yandex und Yep teil (Stand Oktober 2026). Eine Meldung an einen Endpunkt wird an alle teilnehmenden Suchmaschinen weitergegeben. Sie müssen also nicht jede einzeln ansprechen.

Google nimmt nicht teil. Für Google bleiben die XML-Sitemap und eine saubere interne Verlinkung die wichtigsten Wege zur [URL Discovery](/wissen/geo-glossar/url-discovery/). IndexNow ersetzt die Sitemap auch bei Bing nicht: Die FAQ auf indexnow.org empfiehlt ausdrücklich, beides zu nutzen.

## Warum ist IndexNow für die KI-Sichtbarkeit wichtig?

Microsoft Copilot und die KI-Antworten in Bing stützen sich auf den Bing-Index. Was Bing nicht kennt, kann dort nicht zitiert werden. Krishna Mohan (Microsoft) nannte IndexNow im März 2026 neben Q&A-Abschnitten und Schema als Teil der SEO-Grundlagen für KI-Systeme, weil diese wie die Suche auf frische, gut rankende und vertrauenswürdige Inhalte setzen (zitiert von Glenn Gabe, GSQi).

Der Nutzen liegt bei der Aktualität. Wenn Sie Preise, Produktdaten oder Fachinhalte ändern, soll die KI-Antwort die neue Fassung zeigen, nicht die alte. Kai Spriestersbach (AFAIK) empfiehlt IndexNow zusammen mit echter inhaltlicher Aktualisierung und korrekten Datumsangaben (August 2026). Ein umgeschriebenes Datum ohne neue Inhalte nennt er einen Trick. Mehr dazu unter [Freshness](/wissen/geo-glossar/freshness/).

IndexNow meldet auch, was weg ist. Laut indexnow.org sollen Sie weitergeleitete URLs und Seiten mit Status 404 oder 410 melden, damit veraltete Links aus dem Index verschwinden.

## Was bedeutet das für Ihre Website?

Automatisieren Sie die Meldung. Ein manueller Ping wird vergessen. Plattformen wie Shopify und Wix unterstützen IndexNow bereits (Microsoft Bing). Bei eigenen Systemen gehört die Meldung in den Deployment-Prozess. So hält es auch codaai.ai: Nach jedem Deployment meldet die Website alle geänderten URLs automatisch per IndexNow.

Melden Sie nur echte Änderungen. Die FAQ auf indexnow.org rät davon ab, dieselbe URL mehrmals am Tag zu senden, und empfiehlt mindestens fünf Minuten Abstand zwischen zwei Meldungen derselben URL. Zu viele Anfragen beantwortet der Endpunkt mit Status 429.

Kontrollieren Sie das Ergebnis. Der Antwortcode zeigt, ob die Meldung angenommen wurde. Ob Bing die Seiten danach abruft, zeigen Ihre [Logfiles](/wissen/geo-glossar/logfiles/). IndexNow beschleunigt die Entdeckung, ersetzt aber kein sauberes [Index-Management](/wissen/geo-glossar/index-management/).
