'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AUTHOR,
  COLLECTIONS,
  COVER_BG,
  POSTS,
  TOPICS,
  coverSvg,
  fmtDate,
  mins,
  type Collection,
  type Post,
  type Topic
} from './content';
import { InsightsFooter, InsightsNav, TriField } from './chrome';
import './insights.css';

function Cover({ post }: { post: Post }) {
  return (
    <div className="cover" style={{ background: COVER_BG[post.topic] }} dangerouslySetInnerHTML={{ __html: coverSvg(post) }} />
  );
}

function MetaLine({ post }: { post: Post }) {
  return (
    <div className="meta">
      <span className={`topic-tag ${TOPICS[post.topic].cls}`}>{TOPICS[post.topic].label}</span>
      <span className="sep" />
      <span>{fmtDate(post.date)}</span>
      <span className="sep" />
      <span>{mins(post)} min read</span>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/insights/${post.slug}`} className="post">
      <div className="post-cover">
        <Cover post={post} />
      </div>
      <div className="post-body">
        <MetaLine post={post} />
        <h3>
          <span>{post.title}</span>
        </h3>
        <p className="ex">{post.excerpt}</p>
        <div className="post-foot">
          <div className="tags">
            {post.tags.slice(0, 3).map((t) => (
              <span className="tag" key={t}>
                #{t}
              </span>
            ))}
          </div>
          <span className="read">Read →</span>
        </div>
      </div>
    </Link>
  );
}

type Props = { topic?: Topic | null; collection?: Collection | null; tag?: string | null };

export default function InsightsClient({ topic: topic0 = null, collection: collection0 = null, tag: tag0 = null }: Props) {
  const [topic, setTopic] = useState<Topic | null>(topic0);
  const [collection, setCollection] = useState<Collection | null>(collection0);
  const [tag, setTag] = useState<string | null>(tag0);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new' | 'old' | 'long'>('new');
  const postsRef = useRef<HTMLElement>(null);

  const topicCounts = useMemo(() => {
    const c: Partial<Record<Topic, number>> = {};
    POSTS.forEach((p) => (c[p.topic] = (c[p.topic] || 0) + 1));
    return c;
  }, []);

  const tagCounts = useMemo(() => {
    const c: Record<string, number> = {};
    POSTS.forEach((p) => p.tags.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = POSTS.filter(
      (p) =>
        (!topic || p.topic === topic) &&
        (!collection || p.collection === collection) &&
        (!tag || p.tags.includes(tag)) &&
        (!needle ||
          (p.title + ' ' + p.excerpt + ' ' + p.tags.join(' ') + ' ' + p.body.replace(/<[^>]+>/g, ' '))
            .toLowerCase()
            .includes(needle))
    );
    if (sort === 'new') out.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === 'old') out.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === 'long') out.sort((a, b) => mins(b) - mins(a));
    return out;
  }, [topic, collection, tag, q, sort]);

  const anyFilter = !!(topic || collection || tag || q);
  const featured = !anyFilter && sort === 'new' ? list.find((p) => p.featured) : undefined;
  const rest = featured ? list.filter((p) => p !== featured) : list;

  const scrollToPosts = () => postsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

  useEffect(() => {
    if (topic0 || collection0 || tag0) scrollToPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    setTopic(null);
    setCollection(null);
    setTag(null);
    setQ('');
  };

  return (
    <>
      <InsightsNav />

      <main>
        <section id="hero">
          <div className="hero-bg">
            <div className="hero-blob-1" />
            <div className="hero-blob-2" />
            <TriField id="triP" />
          </div>
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow rv">Insights · Learning in public</div>
              <h1 className="rv is-in">
                Notes on building <span className="hl">calm</span>, useful software.
              </h1>
              <p className="hero-sub rv">
                A working notebook on product design, research, and the craft of shipping — written while doing the work, not
                after. Grouped so it stays useful as it grows.
              </p>
              <div className="hero-meta rv">
                <div className="stat">
                  <div className="n">
                    <b>{POSTS.length}</b>
                  </div>
                  <div className="l">Notes</div>
                </div>
                <div className="stat">
                  <div className="n">
                    <b>{Object.keys(COLLECTIONS).length}</b>
                  </div>
                  <div className="l">Collections</div>
                </div>
                <div className="stat">
                  <div className="n">
                    <b>{Object.keys(tagCounts).length}</b>
                  </div>
                  <div className="l">Tags</div>
                </div>
              </div>
            </div>
            <div className="author-card rv">
              <div className="author-ava">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AUTHOR.ava} alt="Abdan" />
              </div>
              <div>
                <div className="author-name">{AUTHOR.name}</div>
                <div className="author-role">Product · Strategy · Design</div>
                <p className="author-bio">
                  Product designer, co-founder of Webbify. These are my own learning notes — opinions mine, mistakes mine too.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar: topic filter · search · sort */}
        <div id="toolbar">
          <div className="wrap tb-row">
            <div className="topics">
              <button className={`pill${!topic ? ' active' : ''}`} onClick={() => setTopic(null)}>
                <span className="dot" />
                All <span className="cnt">{POSTS.length}</span>
              </button>
              {(Object.entries(TOPICS) as [Topic, { label: string }][]).map(([k, t]) => (
                <button key={k} className={`pill${topic === k ? ' active' : ''}`} onClick={() => setTopic(k)}>
                  <span className="dot" />
                  {t.label} <span className="cnt">{topicCounts[k] || 0}</span>
                </button>
              ))}
            </div>
            <div className="tb-tools">
              <label className="search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  placeholder="Search notes…"
                  aria-label="Search notes"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
              <select className="sort" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
                <option value="long">Longest read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collections (learning tracks) */}
        <section id="collections">
          <div className="wrap">
            <div className="col-head">
              <div>
                <div className="eyebrow rv">Collections</div>
                <h2 className="h-lg rv" style={{ marginBottom: 8 }}>
                  Learning tracks.
                </h2>
                <p className="sub rv">Notes grouped by what I&apos;m trying to get good at. Pick one to filter.</p>
              </div>
            </div>
            <div className="col-grid">
              {(Object.entries(COLLECTIONS) as [Collection, (typeof COLLECTIONS)[Collection]][]).map(([k, c]) => {
                const n = POSTS.filter((p) => p.collection === k).length;
                return (
                  <button
                    key={k}
                    className={`collection${collection === k ? ' active' : ''}`}
                    onClick={() => {
                      setCollection(collection === k ? null : k);
                      scrollToPosts();
                    }}
                  >
                    <div className="big-tri" />
                    <div className="col-kicker">{c.kicker}</div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <div className="col-foot">
                      <span>
                        {n} note{n === 1 ? '' : 's'}
                      </span>
                      <span className="prog">
                        <i style={{ width: `${Math.min(100, n * 20)}%` }} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section id="posts" ref={postsRef}>
          <div className="wrap">
            <div className="posts-head">
              <div className="status">
                <b>{list.length}</b> note{list.length === 1 ? '' : 's'}
                {topic && (
                  <>
                    {' · '}topic <b>{TOPICS[topic].label}</b>
                  </>
                )}
                {collection && (
                  <>
                    {' · '}collection <b>{COLLECTIONS[collection].title}</b>
                  </>
                )}
                {tag && (
                  <>
                    {' · '}tag <b>#{tag}</b>
                  </>
                )}
                {q && (
                  <>
                    {' · '}search <b>&quot;{q}&quot;</b>
                  </>
                )}
              </div>
              {anyFilter && (
                <button className="clear" onClick={clearAll}>
                  Clear filters ×
                </button>
              )}
            </div>

            {featured && (
              <Link href={`/insights/${featured.slug}`} className="featured">
                <div className="feat-body">
                  <MetaLine post={featured} />
                  <h2>{featured.title}</h2>
                  <p className="ex">{featured.excerpt}</p>
                  <div style={{ marginTop: 26 }}>
                    <span className="btn btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>
                      Read the note <span className="arr">→</span>
                    </span>
                  </div>
                </div>
                <div className="feat-visual">
                  <span className="feat-badge">Featured</span>
                  <Cover post={featured} />
                </div>
              </Link>
            )}

            <div className="post-grid">
              {rest.length ? (
                rest.map((p) => <PostCard post={p} key={p.slug} />)
              ) : (
                <div className="empty">
                  <h3>Nothing here yet.</h3>
                  <p>Try another topic or clear the filters — or come back once I&apos;ve learned something.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="tagcloud">
          <div className="wrap">
            <div className="eyebrow">Browse by tag</div>
            <div className="cloud">
              {Object.keys(tagCounts)
                .sort()
                .map((t) => (
                  <button
                    key={t}
                    className={`tag${tag === t ? ' active' : ''}`}
                    onClick={() => {
                      setTag(tag === t ? null : t);
                      scrollToPosts();
                    }}
                  >
                    #{t} <span style={{ opacity: 0.5 }}>{tagCounts[t]}</span>
                  </button>
                ))}
            </div>
          </div>
        </section>
      </main>

      <section id="cta">
        <TriField id="triD" dark />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="eyebrow" style={{ display: 'inline-flex' }}>
            Stay in the loop
          </div>
          <h2>New notes, when there&apos;s something worth saying.</h2>
          <p>No schedule, no newsletter theatre. If you want to talk about any of this, the door&apos;s open.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:halo@webbify.id">
              Email Abdan <span className="arr">→</span>
            </a>
            <Link className="btn btn-ghost" href="/">
              Back to Webbify
            </Link>
          </div>
        </div>
      </section>

      <InsightsFooter />
    </>
  );
}
