/* /blog/<slug>.md — Markdown-Fassung jedes deutschen Blogartikels. Siehe
   src/lib/md-variant.ts fuer die Begruendung. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../lib/md-variant';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'de' && !data.noindex);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: any };
  return new Response(
    renderMarkdown({
      title: post.data.title,
      lead: post.data.summary ?? post.data.description,
      url: `${MD_SITE}/blog/${post.id}/`,
      body: post.body ?? '',
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      lang: 'de',
    }),
    { headers: MD_HEADERS },
  );
};
