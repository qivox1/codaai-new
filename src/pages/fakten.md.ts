/* Markdown-Fassung der Faktenseite (siehe src/lib/md-variant.ts). Inhalt aus derselben Quelle wie die HTML-Seite. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../lib/md-variant';
import { FAKTEN, FAKTEN_PUBLISHED, FAKTEN_UPDATED, faktenMarkdown } from '../data/fakten';

export const GET: APIRoute = () => {
  const p = FAKTEN.de;
  return new Response(
    renderMarkdown({
      title: p.metaTitle,
      lead: p.lead,
      url: `${MD_SITE}${p.path}`,
      body: faktenMarkdown('de'),
      pubDate: FAKTEN_PUBLISHED,
      updatedDate: FAKTEN_UPDATED,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
};
