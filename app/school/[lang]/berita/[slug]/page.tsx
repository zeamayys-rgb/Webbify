import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '../../../_components/ui';
import { NEWS, NEWS_CATEGORIES } from '../../../_lib/content';
import { formatDate, href, tr, UI, type Lang } from '../../../_lib/i18n';
import { pageMeta } from '../../../_lib/meta';

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) return {};
  return pageMeta(lang as Lang, `/berita/${slug}`, tr(n.title, lang as Lang), tr(n.excerpt, lang as Lang));
}

export default async function Artikel({ params }: { params: Params }) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) notFound();

  return (
    <article className="sch-article">
      <div className="sch-wrap sch-narrow">
        <Link href={href(lang, '/berita')} className="sch-link">
          {tr(UI.backToNews, lang)}
        </Link>
        <div className="sch-news-meta">
          <span className="sch-chip">{tr(NEWS_CATEGORIES[n.category], lang)}</span>
          <time dateTime={n.date}>{formatDate(n.date, lang)}</time>
        </div>
        <h1 className="sch-h1">{tr(n.title, lang)}</h1>
        <p className="sch-lead">{tr(n.excerpt, lang)}</p>
        <Photo tone={n.tone} alt="" ratio="16 / 9" />
        <div className="sch-prose">
          {n.body.map((p, i) => (
            <p key={i}>{tr(p, lang)}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
