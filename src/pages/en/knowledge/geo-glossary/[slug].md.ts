/* /en/knowledge/geo-glossary/<slug>.md — Markdown-Fassung jeder englischen
   Glossarseite. Siehe src/lib/md-variant.ts fuer die Begruendung. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../../../lib/md-variant';
import { termSlug } from '../../../../data/glossar';

export async function getStaticPaths() {
  const terms = await getCollection('glossar', ({ data }) => data.lang === 'en' && !data.noindex);
  return terms.map((term) => ({ params: { slug: termSlug(term.id) }, props: { term } }));
}

export const GET: APIRoute = ({ props }) => {
  const { term } = props as { term: any };
  return new Response(
    renderMarkdown({
      title: term.data.title,
      lead: term.data.shortDefinition,
      url: `${MD_SITE}/en/knowledge/geo-glossary/${termSlug(term.id)}/`,
      body: term.body ?? '',
      pubDate: term.data.pubDate,
      updatedDate: term.data.updatedDate,
      lang: 'en',
    }),
    { headers: MD_HEADERS },
  );
};
