/* Markdown-Fassung der Autorenseite (siehe src/lib/md-variant.ts). */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../lib/md-variant';
import { AUTOR_PAGE, AUTOR_PUBLISHED, AUTOR_UPDATED, autorMarkdown } from '../../data/autor';

export const GET: APIRoute = () => {
  const p = AUTOR_PAGE.de;
  return new Response(
    renderMarkdown({
      title: p.metaTitle,
      lead: p.lead,
      url: `${MD_SITE}${p.path}`,
      body: autorMarkdown('de'),
      pubDate: AUTOR_PUBLISHED,
      updatedDate: AUTOR_UPDATED,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
};
