import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASE_URL = 'https://www.codaai.ai';

const STATIC_PAGES = `## Statische Seiten

### Startseite – KI Content für B2B
URL: ${BASE_URL}/
CodaAI ist eine KI-gestützte Content-Plattform für den deutschen B2B-Mittelstand. Kunden bestellen fertig produzierten, SEO- und GEO-optimierten Content (Blog, SEO-Texte, Videos, Designs) ohne eigenes Marketing-Team. Alle Inhalte werden menschlich geprüft und innerhalb von 24–48 Stunden geliefert.

### Co-Create – Content bestellen
URL: ${BASE_URL}/co-create/
Service-Seite: Kunden können ihren Wunsch-Content direkt anfragen. CodaAI produziert SEO-optimierte Artikel, Erklärvideos und Designs auf Basis einer kurzen Briefing-Eingabe.

### Preise
URL: ${BASE_URL}/preise/
CodaAI-Pakete: Starter (1 Artikel/Monat), Professional (4 Artikel + weitere Assets), Enterprise (individuelle Pakete). Einstieg ab 149 €/Monat.

### Blog-Übersicht
URL: ${BASE_URL}/blog/
Alle Blog-Artikel zu KI, Content Marketing, SEO und GEO für B2B-Unternehmen im deutschen Mittelstand.

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

> KI Content-Plattform für SEO, Design & Video – ausgerichtet auf B2B-Mittelstand (DE/AT/CH).
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

  return new Response(output, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
