import Link from 'next/link';
import { PageHero, Photo } from '../../_components/ui';
import { NEWS, NEWS_CATEGORIES } from '../../_lib/content';
import { formatDate, href, tr, UI } from '../../_lib/i18n';
import { langOf, pageMeta } from '../../_lib/meta';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '/berita', tr(UI.nav.berita, lang), tr(UI.berita.lead, lang));
}

export default async function Berita({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  const [first, ...rest] = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero eyebrow={tr(UI.nav.berita, lang)} title={tr(UI.home.news, lang)} lead={tr(UI.berita.lead, lang)} />
      <section className="sch-section sch-section-tight">
        <div className="sch-wrap">
          {first && (
            <Link href={href(lang, `/berita/${first.slug}`)} className="sch-news-feature">
              <Photo tone={first.tone} alt="" ratio="16 / 10" />
              <div>
                <div className="sch-news-meta">
                  <span className="sch-chip">{tr(NEWS_CATEGORIES[first.category], lang)}</span>
                  <time dateTime={first.date}>{formatDate(first.date, lang)}</time>
                </div>
                <h2 className="sch-h2">{tr(first.title, lang)}</h2>
                <p>{tr(first.excerpt, lang)}</p>
                <span className="sch-link">{tr(UI.readMore, lang)} →</span>
              </div>
            </Link>
          )}
          <div className="sch-grid-3">
            {rest.map((n) => (
              <Link key={n.slug} href={href(lang, `/berita/${n.slug}`)} className="sch-news-card">
                <Photo tone={n.tone} alt="" ratio="16 / 10" />
                <div className="sch-news-meta">
                  <span className="sch-chip">{tr(NEWS_CATEGORIES[n.category], lang)}</span>
                  <time dateTime={n.date}>{formatDate(n.date, lang)}</time>
                </div>
                <h3>{tr(n.title, lang)}</h3>
                <p>{tr(n.excerpt, lang)}</p>
              </Link>
            ))}
          </div>
          {/* TODO: category filter + pagination once a client has more than ~12 posts (or move to CMS). */}
        </div>
      </section>
    </>
  );
}
