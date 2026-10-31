import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleClient from './article-client';
import { POSTS, byDate, bySlug } from '../content';

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = bySlug((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — Webbify Insights`,
    description: post.excerpt
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = bySlug(slug);
  if (!post) notFound();

  const sorted = byDate();
  const i = sorted.indexOf(post);
  const related = POSTS.filter(
    (o) => o !== post && (o.collection === post.collection || o.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  return <ArticleClient post={post} prev={sorted[i + 1]} next={sorted[i - 1]} related={related} />;
}
