/* /en/index.md — Markdown-Fassung der englischen Startseite. Inhalt und
   Begruendung in src/data/home-md.ts. */
import type { APIRoute } from 'astro';
import { renderMarkdown, MD_HEADERS } from '../../lib/md-variant';
import { HOME_MD } from '../../data/home-md';

export const GET: APIRoute = () => {
  const h = HOME_MD.en;
  return new Response(
    renderMarkdown({ title: h.title, lead: h.lead, url: h.url, body: h.body, lang: 'en' }),
    { headers: MD_HEADERS },
  );
};
