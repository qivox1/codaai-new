import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASE_URL = 'https://www.codaai.ai';

const STATIC_PAGES = `## Statische Seiten

### Startseite – Digital Visibility für den B2B-Mittelstand
URL: ${BASE_URL}/
Wer heute eine Leistung sucht, fragt zuerst eine KI. Die nennt in der Regel drei Anbieter. CodaAI misst, ob ein Unternehmen dazugehört, und arbeitet daran, dass es dazugehört — in drei Stufen: Gefunden, Empfohlen, Zitiert. Einstieg ist ein Digital Visibility Audit, das die tatsächlichen KI-Antworten zu echten Einkäuferfragen auswertet.

### Digital Visibility – die 14 Leistungsbausteine
URL: ${BASE_URL}/digital-visibility/
Drei Fragen entscheiden über eine Nennung: Kann die KI das Unternehmen lesen? Ist es dort, wo die KI ihre Belege holt? Zitiert sie es, weil andere es zitieren? Darauf verteilen sich 14 Bausteine über die Stufen Gefunden (Stufe 1), Empfohlen (Stufe 2) und Zitiert (Stufe 3). Die Seite nennt auch, was CodaAI bewusst nicht anbietet.

### Preise
URL: ${BASE_URL}/preise/
Drei Sichtbarkeits-Stufen mit einem monatlichen Grundpreis ab 1.470 €, dazu ein Preisrechner, dessen Summe sich nachrechnen lässt. Abgerechnet wird per Rechnung. Es gibt keine Platzierungs- oder Erfolgsgarantie.

### Studie „KI-Blindtest Mittelstand 2026"
URL: ${BASE_URL}/studie/
Auswertung von 7.184 KI-Antworten zu 449 mittelständischen Unternehmen aus 258 Branchen, erhoben zu 3.592 Einkäuferfragen in ChatGPT und der Google KI-Übersicht. In 55 % der Fragen fällt der Firmenname nicht, bei 47 % empfiehlt die KI stattdessen Wettbewerber. Keine Zufallsstichprobe.

### Webinar „Empfohlen oder unsichtbar?"
URL: ${BASE_URL}/webinar/
Kostenloses Webinar am 08.09.2026 mit Norbert Schuster (strike2) und Oliver Parrizas: wie Buying Center heute recherchieren, und ein Live-Audit.

### Fragen & Antworten
URL: ${BASE_URL}/faq/
Unterschied zwischen SEO, AEO und GEO, wie KI-Sichtbarkeit gemessen wird, Laufzeiten und die Zusammenarbeit mit bestehenden Agenturen.

### Co-Create – das Arbeitsprinzip
URL: ${BASE_URL}/co-create/
AI + HI: künstliche Intelligenz, die leistet, und menschliche Erfahrung, die lenkt.

### Blog-Übersicht
URL: ${BASE_URL}/blog/
Fachbeiträge zu KI-Sichtbarkeit, GEO, SEO und B2B-Content für den deutschen Mittelstand.

### GEO-Glossar
URL: ${BASE_URL}/wissen/geo-glossar/
Begriffe der KI-Suche — von Grounding über Query Fan-out und Re-Ranking bis Share of AI Search — je Begriff eine eigene Seite mit Definition, Funktionsweise und Bedeutung für die eigene Website. Vollständige Texte weiter unten in dieser Datei.

---`;

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog');

  // Neueste zuerst
  allPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  const today = new Date().toISOString().split('T')[0];

  let output = `# CodaAI – Vollständige Inhalte (llms-full.txt)

> Digital Visibility für den B2B-Mittelstand: messen und verbessern, ob KI-Systeme
> wie ChatGPT und die Google KI-Übersicht ein Unternehmen empfehlen.
> Betreiber: AMP Beratung, Anja Miebach, Gütersloh. Keine Platzierungs- oder Erfolgsgarantie.
> Generiert: ${today}

Diese Datei enthält den vollständigen Inhalt aller CodaAI-Seiten und Blog-Artikel für LLM-Ingestion.
Strukturierte Übersicht: ${BASE_URL}/llms.txt

---

${STATIC_PAGES}

## Blog-Artikel

`;

  for (const post of allPosts) {
    // Content Layer API: id enthält Dateinamen wie "ki-content-marketing-strategie.md"
    const slug = post.id.replace(/\.mdx?$/, '');
    const url = `${BASE_URL}/blog/${slug}/`;

    const pubDate = new Date(post.data.pubDate).toISOString().split('T')[0];
    const updatedDate = post.data.updatedDate
      ? new Date(post.data.updatedDate).toISOString().split('T')[0]
      : null;

    output += `---

## ${post.data.title}

URL: ${url}
Veröffentlicht: ${pubDate}${updatedDate ? `\nAktualisiert: ${updatedDate}` : ''}
Sprache: ${post.data.lang}
Kategorie: ${post.data.category}
Tags: ${post.data.tags.join(', ')}
Autor: ${post.data.author}${post.data.authorTitle ? ` (${post.data.authorTitle})` : ''}
${post.data.summary ? `\n**Zusammenfassung:** ${post.data.summary}\n` : ''}
${post.body}

`;
  }

  // GEO-Glossar (seit 03.09.2026): eine Seite je Begriff unter /wissen/geo-glossar/.
  const terms = (await getCollection('glossar', ({ data }) => !data.noindex)).sort((a, b) =>
    a.data.title.localeCompare(b.data.title, 'de'),
  );
  output += `---

## GEO-Glossar: Begriffe der KI-Suche

Übersicht: ${BASE_URL}/wissen/geo-glossar/
${terms.length} Begriffe rund um Generative Engine Optimization — Definition, Funktionsweise, Bedeutung für die Sichtbarkeit in KI-Antworten. Autorin: Anja Miebach.

`;

  for (const term of terms) {
    const url = `${BASE_URL}/wissen/geo-glossar/${term.id}/`;
    const modified = new Date(term.data.updatedDate ?? term.data.pubDate).toISOString().split('T')[0];
    output += `---

### ${term.data.title}

URL: ${url}
Stand: ${modified}${term.data.synonyms.length ? `\nAuch: ${term.data.synonyms.join(', ')}` : ''}

**Definition:** ${term.data.shortDefinition}

${term.body}
${term.data.faq.length ? `\n**Häufige Fragen**\n\n${term.data.faq.map((f) => `- ${f.q}\n  ${f.a}`).join('\n')}\n` : ''}
`;
  }

  return new Response(output, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
