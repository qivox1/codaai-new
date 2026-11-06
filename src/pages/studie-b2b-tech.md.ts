/* Markdown-Fassung des KI-Blindtest B2B-Tech 2026. Inhalt aus src/data/studie-b2b-tech.ts. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../lib/md-variant';
import { TECH_TITLE, TECH_SUBTITLE, TECH_PATH, TECH_PUBLISHED, TECH_UPDATED, techMarkdown } from '../data/studie-b2b-tech';

export const GET: APIRoute = () =>
  new Response(
    renderMarkdown({
      title: `${TECH_TITLE.de}: ${TECH_SUBTITLE.de}`,
      lead: TECH_SUBTITLE.de,
      url: `${MD_SITE}${TECH_PATH.de}`,
      body: techMarkdown('de'),
      pubDate: TECH_PUBLISHED,
      updatedDate: TECH_UPDATED,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
