'use client';

import Link from 'next/link';
import { memo, useEffect, useRef, useState } from 'react';
import {
  AUTHOR,
  COLLECTIONS,
  COVER_BG,
  TOPICS,
  coverSvg,
  fmtDate,
  mins,
  toc as tocOf,
  type Post
} from '../content';
import { InsightsFooter, InsightsNav, TriField } from '../chrome';
import { WIDGETS } from '../widgets';
import '../insights.css';

/**
 * ponytail: memo is load-bearing, not an optimisation. The widgets draw SVG
 * into this subtree; any re-render of the parent (the TOC scroll-spy fires one)
 * makes React re-apply dangerouslySetInnerHTML and wipe that drawing.
 */
const ArticleBody = memo(function ArticleBody({
  html,
  bodyRef
}: {
  html: string;
  bodyRef: React.RefObject<HTMLDivElement | null>;
}) {
  return <div className="art-body" ref={bodyRef} dangerouslySetInnerHTML={{ __html: html }} />;
});

type Props = { post: Post; prev?: Post; next?: Post; related: Post[] };

export default function ArticleClient({ post, prev, next, related }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const toc = tocOf(post);

  // reading progress
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const bar = document.getElementById('progress');
      if (bar) bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // interactive figures inside the injected body
  useEffect(() => {
    if (!post.init || !bodyRef.current) return;
    return WIDGETS[post.init](bodyRef.current);
  }, [post.slug, post.init]);

  // table-of-contents scroll-spy
  useEffect(() => {
    const hs = bodyRef.current?.querySelectorAll('h2[id]');
    if (!hs?.length) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [post.slug]);

  const jumpTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="progress" id="progress" />
      <InsightsNav />

      <header id="head">
        <div className="hero-bg">
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <TriField id="triP" />
        </div>
        <div className="wrap head-grid">
          <div>
            <Link href="/insights" className="art-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>{' '}
              All notes
            </Link>
            <div className="meta">
              <span className={`topic-tag ${TOPICS[post.topic].cls}`}>{TOPICS[post.topic].label}</span>
              {post.collection && (
                <>
                  <span className="sep" />
                  <Link href={`/insights?collection=${post.collection}`} style={{ color: 'var(--indigo)', fontWeight: 600 }}>
                    Collection · {COLLECTIONS[post.collection].title}
                  </Link>
                </>
              )}
              <span className="sep" />
              <span>{fmtDate(post.date)}</span>
              <span className="sep" />
              <span>{mins(post)} min read</span>
            </div>
            <h1 className="rv is-in">{post.title}</h1>
            <p className="lede rv">{post.excerpt}</p>
            <div className="art-byline rv">
              <div className="ava">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AUTHOR.ava} alt="" />
              </div>
              <div>
                <div className="who">{AUTHOR.name}</div>
                <div className="when">{post.byline ?? `${fmtDate(post.date)} · ${mins(post)} min read`}</div>
              </div>
            </div>
          </div>
          {post.srcCard && (
            <aside className="src-card rv">
              <div className="k">{post.srcCard.k}</div>
              <div className="t">{post.srcCard.t}</div>
              <div className="a">{post.srcCard.a}</div>
              <a className="go" href={post.srcCard.u} target="_blank" rel="noopener">
                Read the original ↗
              </a>
            </aside>
          )}
        </div>
      </header>

      <section id="article">
        <div className="wrap art-layout">
          <div>
            <ArticleBody html={post.body} bodyRef={bodyRef} />
            <div className="art-nav">
              {prev ? (
                <Link href={`/insights/${prev.slug}`} className="prev">
                  <div className="k">← Older</div>
                  <div className="t">{prev.title}</div>
                </Link>
              ) : (
                <span className="disabled prev">
                  <div className="k">← Older</div>
                  <div className="t">—</div>
                </span>
              )}
              {next ? (
                <Link href={`/insights/${next.slug}`} className="next">
                  <div className="k">Newer →</div>
                  <div className="t">{next.title}</div>
                </Link>
              ) : (
                <span className="disabled next">
                  <div className="k">Newer →</div>
                  <div className="t">—</div>
                </span>
              )}
            </div>
          </div>

          <aside className="art-side">
            {toc.length > 0 && (
              <div className="side-box toc-box">
                <h4>On this page</h4>
                <ul className="toc">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className={active === h.id ? 'on' : undefined} onClick={(e) => jumpTo(e, h.id)}>
                        {h.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="side-box">
              <h4>Tags</h4>
              <div className="side-tags">
                {post.tags.map((t) => (
                  <Link className="tag" href={`/insights?tag=${t}`} key={t}>
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
            {post.sources?.length ? (
              <div className="side-box side-src">
                <h4>{post.sources.length === 1 ? 'Source' : 'Sources'}</h4>
                {post.sources.map((s) => (
                  <a href={s.u} target="_blank" rel="noopener" key={s.u}>
                    {s.t} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
        </div>

        {related.length > 0 && (
          <div className="wrap related">
            <div className="eyebrow">Related notes</div>
            <h2 className="h-lg" style={{ fontSize: 28 }}>
              Keep reading.
            </h2>
            <div className="post-grid">
              {related.map((p) => (
                <Link href={`/insights/${p.slug}`} className="post" key={p.slug}>
                  <div className="post-cover">
                    <div
                      className="cover"
                      style={{ background: COVER_BG[p.topic] }}
                      dangerouslySetInnerHTML={{ __html: coverSvg(p) }}
                    />
                  </div>
                  <div className="post-body">
                    <div className="meta">
                      <span className={`topic-tag ${TOPICS[p.topic].cls}`}>{TOPICS[p.topic].label}</span>
                      <span className="sep" />
                      <span>{mins(p)} min read</span>
                    </div>
                    <h3>
                      <span>{p.title}</span>
                    </h3>
                    <p className="ex">{p.excerpt}</p>
                    <div className="post-foot">
                      <div className="tags">
                        {p.tags.slice(0, 3).map((t) => (
                          <span className="tag" key={t}>
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="read">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="cta">
        <TriField id="triD" dark />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="eyebrow">More notes</div>
          <h2>Learning in public, one note at a time.</h2>
          <p>If you disagree with any of this, I&apos;d rather hear it than not.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/insights">
              All notes <span className="arr">→</span>
            </Link>
            <a className="btn btn-ghost" href="mailto:halo@webbify.id">
              Email Abdan
            </a>
          </div>
        </div>
      </section>

      <InsightsFooter />
    </>
  );
}
