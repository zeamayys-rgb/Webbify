import Link from 'next/link';
import { Photo, SectionHead, waLink } from '../_components/ui';
import { GALLERY, NEWS, NEWS_CATEGORIES, PPDB, PRINCIPAL, PROGRAMS, SCHOOL, STATS } from '../_lib/content';
import { formatDate, href, tr, UI } from '../_lib/i18n';
import { langOf, pageMeta } from '../_lib/meta';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '', tr(UI.nav.home, lang), tr(SCHOOL.heroLead, lang));
}

export default async function SchoolHome({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  const latest = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const openWave = PPDB.waves.find((w) => w.status === 'open');

  return (
    <>
      {/* HERO */}
      <section className="sch-hero">
        <div className="sch-wrap sch-hero-grid">
          <div>
            <p className="sch-eyebrow">{tr(SCHOOL.levels, lang)}</p>
            <h1 className="sch-display">{tr(SCHOOL.tagline, lang)}</h1>
            <p className="sch-lead">{tr(SCHOOL.heroLead, lang)}</p>
            <div className="sch-actions">
              <Link href={href(lang, '/ppdb')} className="sch-btn sch-btn-primary">
                {tr(UI.registerNow, lang)}
              </Link>
              <Link href={href(lang, '/profil')} className="sch-btn sch-btn-ghost">
                {tr(UI.learnMore, lang)}
              </Link>
            </div>
          </div>
          <div className="sch-hero-art">
            <Photo tone="indigo" alt={tr(SCHOOL.name, lang)} ratio="5 / 4" />
            {PPDB.open && openWave && (
              <div className="sch-hero-badge">
                <strong>PPDB {PPDB.year}</strong>
                <span>
                  {tr(openWave.name, lang)} · {tr(openWave.dates, lang)}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sch-stats" aria-label="Stats">
        <div className="sch-wrap sch-stats-grid">
          {STATS.map((s) => (
            <div key={s.value + s.label.en} className="sch-stat">
              <strong>{s.value}</strong>
              <span>{tr(s.label, lang)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="sch-section">
        <div className="sch-wrap sch-split">
          <Photo tone="sand" alt={PRINCIPAL.name} ratio="1 / 1" />
          <div>
            <p className="sch-eyebrow">{tr(UI.home.welcome, lang)}</p>
            <blockquote className="sch-quote">“{tr(PRINCIPAL.message, lang)}”</blockquote>
            <p className="sch-sign">
              <strong>{PRINCIPAL.name}</strong>
              <span>{tr(PRINCIPAL.role, lang)}</span>
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="sch-section sch-tint">
        <div className="sch-wrap">
          <SectionHead title={tr(UI.home.programs, lang)} />
          <div className="sch-grid-3">
            {PROGRAMS.map((p) => (
              <article key={p.title.en} className={`sch-card sch-card-${p.tone}`}>
                <span className="sch-tri" aria-hidden="true" />
                <h3>{tr(p.title, lang)}</h3>
                <p>{tr(p.body, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="sch-section">
        <div className="sch-wrap">
          <SectionHead
            title={tr(UI.home.news, lang)}
            action={
              <Link href={href(lang, '/berita')} className="sch-link">
                {tr(UI.allNews, lang)} →
              </Link>
            }
          />
          <div className="sch-grid-3">
            {latest.map((n) => (
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
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="sch-section sch-tint">
        <div className="sch-wrap">
          <SectionHead
            title={tr(UI.home.gallery, lang)}
            action={
              <Link href={href(lang, '/galeri')} className="sch-link">
                {tr(UI.viewGallery, lang)} →
              </Link>
            }
          />
          <div className="sch-mosaic">
            {GALLERY.slice(0, 5).map((g, i) => (
              <Photo key={i} tone={g.tone} src={g.src} alt={tr(g.caption, lang)} ratio={i === 0 ? '1 / 1' : '4 / 3'} />
            ))}
          </div>
        </div>
      </section>

      {/* PPDB CTA */}
      <section className="sch-section">
        <div className="sch-wrap">
          <div className="sch-cta">
            <div>
              <p className="sch-eyebrow sch-eyebrow-light">PPDB {PPDB.year}</p>
              <h2 className="sch-h2">{tr(PPDB.open ? UI.home.ppdbTitle : UI.home.ppdbClosed, lang)}</h2>
              {openWave && (
                <p>
                  {tr(openWave.name, lang)}: {tr(openWave.dates, lang)}
                </p>
              )}
            </div>
            <div className="sch-actions">
              <Link href={href(lang, '/ppdb')} className="sch-btn sch-btn-light">
                {tr(UI.registerNow, lang)}
              </Link>
              <a
                href={waLink(lang === 'id' ? `Halo, saya ingin bertanya tentang PPDB ${PPDB.year}.` : `Hello, I'd like to ask about admissions for ${PPDB.year}.`)}
                className="sch-btn sch-btn-outline-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tr(UI.chatWa, lang)}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
