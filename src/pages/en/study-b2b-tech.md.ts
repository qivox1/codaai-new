/* Markdown-Fassung des KI-Blindtest B2B-Tech 2026. Inhalt aus src/data/studie-b2b-tech.ts. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../lib/md-variant';
import { TECH_TITLE, TECH_SUBTITLE, TECH_PATH, TECH_PUBLISHED, TECH_UPDATED, techMarkdown } from '../../data/studie-b2b-tech';

export const GET: APIRoute = () =>
  new Response(
    renderMarkdown({
      title: `${TECH_TITLE.en}: ${TECH_SUBTITLE.en}`,
      lead: TECH_SUBTITLE.en,
      url: `${MD_SITE}${TECH_PATH.en}`,
      body: techMarkdown('en'),
      pubDate: TECH_PUBLISHED,
      updatedDate: TECH_UPDATED,
      lang: 'en',
    }),
    { headers: MD_HEADERS },
  );
