/* /en/knowledge/geo-optimization.md — Markdown variant of the pillar page
   (see src/lib/md-variant.ts). Same source as the HTML page. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../../lib/md-variant';
import { GEO_PAGE, GEO_PUBLISHED, GEO_UPDATED, geoPageMarkdown } from '../../../data/geo-optimierung';

export const GET: APIRoute = () => {
  const p = GEO_PAGE.en;
  return new Response(
    renderMarkdown({
      title: p.headline,
      lead: p.lead,
      url: `${MD_SITE}${p.path}`,
      body: geoPageMarkdown('en'),
      pubDate: GEO_PUBLISHED,
      updatedDate: GEO_UPDATED,
      lang: 'en',
    }),
    { headers: MD_HEADERS },
  );
};
