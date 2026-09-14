/* /wissen/geo-glossar/<slug>.md — Markdown-Fassung jeder deutschen
   Glossarseite. Siehe src/lib/md-variant.ts fuer die Begruendung. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../../lib/md-variant';

export async function getStaticPaths() {
  const terms = await getCollection('glossar', ({ data }) => data.lang === 'de' && !data.noindex);
  return terms.map((term) => ({ params: { slug: term.id }, props: { term } }));
}

export const GET: APIRoute = ({ props }) => {
  const { term } = props as { term: any };
  return new Response(
    renderMarkdown({
      title: term.data.title,
      lead: term.data.shortDefinition,
      url: `${MD_SITE}/wissen/geo-glossar/${term.id}/`,
      body: term.body ?? '',
      pubDate: term.data.pubDate,
      updatedDate: term.data.updatedDate,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
};
