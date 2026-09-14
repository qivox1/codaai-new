/* /en/blog/<slug>.md — Markdown-Fassung jedes englischen Blogartikels. Siehe
   src/lib/md-variant.ts fuer die Begruendung. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderMarkdown, MD_HEADERS, MD_SITE } from '../../../lib/md-variant';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'en' && !data.noindex);
  return posts.map((post) => ({ params: { slug: post.id.replace(/^en\//, '') }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: any };
  return new Response(
    renderMarkdown({
      title: post.data.title,
      lead: post.data.summary ?? post.data.description,
      url: `${MD_SITE}/en/blog/${post.id.replace(/^en\//, '')}/`,
      body: post.body ?? '',
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      lang: 'en',
    }),
    { headers: MD_HEADERS },
  );
};
