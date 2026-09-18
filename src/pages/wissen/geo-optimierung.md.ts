/* /wissen/geo-optimierung.md — Markdown-Fassung der Pillar-Seite (siehe
   src/lib/md-variant.ts). Inhalt aus derselben Quelle wie die HTML-Seite. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../lib/md-variant';
import { GEO_PAGE, GEO_PUBLISHED, GEO_UPDATED, geoPageMarkdown } from '../../data/geo-optimierung';

export const GET: APIRoute = () => {
  const p = GEO_PAGE.de;
  return new Response(
    renderMarkdown({
      title: p.headline,
      lead: p.lead,
      url: `${MD_SITE}${p.path}`,
      body: geoPageMarkdown('de'),
      pubDate: GEO_PUBLISHED,
      updatedDate: GEO_UPDATED,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
};
