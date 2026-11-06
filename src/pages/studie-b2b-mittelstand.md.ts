/* Markdown-Fassung der Studie (seit 22.09.2026, Maßnahme 5). Inhalt aus src/data/studie.ts. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../lib/md-variant';
import { STUDIE_TITLE, STUDIE_SUBTITLE, STUDIE_PATH, STUDIE_PUBLISHED, STUDIE_UPDATED, METHODIK, LIMITATIONEN, studieMarkdown } from '../data/studie';

export const GET: APIRoute = () =>
  new Response(
    renderMarkdown({
      title: `${STUDIE_TITLE.de}: ${STUDIE_SUBTITLE.de}`,
      lead: STUDIE_SUBTITLE.de,
      url: `${MD_SITE}${STUDIE_PATH.de}`,
      body: studieMarkdown('de', METHODIK.de, LIMITATIONEN.de),
      pubDate: STUDIE_PUBLISHED,
      updatedDate: STUDIE_UPDATED,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
