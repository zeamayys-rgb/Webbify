'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './home.css';

const WA = 'https://wa.me/6281264404887';

const MQ_ITEMS = ['PROTOTYPE FIRST', 'AI-POWERED', 'HUMAN-PILOTED', 'CUSTOM, NEVER TEMPLATED', 'FAST. SECURE. SHIPPED.'];

const STEPS = [
  {
    n: '01', tag: 'Diagnose', h: 'We map what will actually move the needle.',
    p: 'We analyze your current site — or the gaps where one should be — across UX, design, technical health, and marketing. No guesswork, no generic pitch.'
  },
  {
    n: '02', tag: 'Prototype', h: 'You see your real site — before any payment.',
    p: 'A working prototype of your actual website: your brand, your content structure, your pages. Not a template demo. Not a mood board.',
    flag: '▼  This step costs you Rp 0'
  },
  {
    n: '03', tag: 'Refine', h: "We iterate together until it's right.",
    p: 'Your voice, your details, your priorities. Revisions move fast because the foundation is already built and approved by you.'
  },
  {
    n: '04', tag: 'Launch', h: 'We ship it fast, secure, and ready.',
    p: 'Modern stack, quick loading, safe to run — and looked after long after launch. Your site keeps working while you keep working.'
  }
];

const WORK = [
  {
    title: 'SDIT Al Haraki', tier: 'Essentials',
    cap: 'Full multi-page prototype — gap analysis to working site, before first contact.',
    hero: 'linear-gradient(135deg,#5863E7,#7982EC)', cards: ['#D5F7F6', '#F7E8C9', '#BBBEF3']
  },
  {
    title: 'SDIT Insan Mandiri', tier: 'Professional',
    cap: 'Interactive PPDB flow, achievement board, and full brand-faithful redesign.',
    hero: 'linear-gradient(135deg,#8CE7E5,#5863E7)', cards: ['#F7E8C9', '#D5F7F6', '#E9F9F8']
  },
  {
    title: 'PP Hidayatullah Depok', tier: 'Essentials',
    cap: 'Modern pesantren presence — programs, admissions, and story, prototyped in days.',
    hero: 'linear-gradient(135deg,#F2D8A5,#8CE7E5)', cards: ['#BBBEF3', '#FAF1E2', '#D5F7F6']
  }
];

const PLANS = [
  {
    name: 'Essentials', price: 'Rp 5 jt', line: 'For a clean, credible presence — done fast.',
    items: ['Up to 5 pages, fully custom design', 'Mobile-first & fast-loading', 'WhatsApp integration & contact flows', 'Essential SEO setup', 'Launch support'],
    btn: 'btn-ghost', wa: 'Essentials'
  },
  {
    name: 'Professional', price: 'Rp 12 jt', line: 'For businesses that need more depth and polish.', rec: true,
    items: ['Everything in Essentials', 'CMS — edit your own content', 'News / blog & richer page sections', 'Analytics (GA4 + Meta Pixel)', 'Priority revisions'],
    btn: 'btn-primary', wa: 'Professional'
  },
  {
    name: 'Platform', price: 'Rp 25 jt', line: 'For a full custom platform, built to scale.',
    items: ['Everything in Professional', 'Full custom platform features', 'Headless CMS & integrations', 'Advanced performance & security', 'Ongoing care plan included (year 1)'],
    btn: 'btn-ghost', wa: 'Platform'
  }
];

const FOUNDERS = [
  {
    id: 'abdan', img: '/asset/abdan.jpg', name: 'Abdan', role: 'Co-founder · Product, Strategy & Design',
    bio: 'Leads product strategy, website design, and every conversation with prospective clients. Owns the gap analysis and the prototype you saw before working with us.',
    cred: '5+ yrs building digital products with top-tier brands'
  },
  {
    id: 'bedur', img: '/asset/bedur.jpg', name: 'Bedur', role: 'Co-founder · Development & Tech Operations',
    bio: 'Leads development, system integration, and technical operations. Makes sure every site we ship is fast, secure, and keeps running well long after launch.',
    cred: '100+ websites built in the last 4 years'
  }
];

const MENU_LINKS = [
  { href: '#how', num: '01', label: 'How it works', hover: 'how' },
  { href: '#work', num: '02', label: 'Work', hover: 'work' },
  { href: '#pricing', num: '03', label: 'Pricing', hover: 'pricing' },
  { href: '#founders', num: '04', label: 'Founders', hover: 'founders' }
];

function BrandMark() {
  return (
    <svg className="brand-icon" viewBox="0 0 100 64" aria-hidden="true">
      <polygon points="2,2 58,2 30,60" fill="#8CE7E5" />
      <polygon points="42,2 98,2 70,60" fill="#F2D8A5" opacity="0.92" />
      <polygon points="40,2 60,2 50,23" fill="#5863E7" />
    </svg>
  );
}

function MockFrame({ hero, cards }: { hero: string; cards: string[] }) {
  return (
    <div className="mock-frame">
      <div className="mock-bar"><b></b><b></b><b></b></div>
      <div className="mock-body">
        <div className="mk-hero" style={{ background: hero }}></div>
        <div className="mk-row">{cards.map((c) => <div key={c} className="mk-card" style={{ background: c }}></div>)}</div>
      </div>
    </div>
  );
}

/* ---------- tiny word splitter (SplitText-style, no plugin) ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return; // guard against re-runs (fast refresh / strict mode)
  el.dataset.splitDone = '1';
  const words = el.innerHTML.trim().split(/(<br\s*\/?>)/i);
  el.innerHTML = '';
  words.forEach((chunk) => {
    if (/^<br/i.test(chunk)) { el.insertAdjacentHTML('beforeend', '<br>'); return; }
    const tmp = document.createElement('div'); tmp.innerHTML = chunk;
    Array.prototype.slice.call(tmp.childNodes).forEach((node: ChildNode) => {
      let text: string, wrapTagOpen = '', wrapTagClose = '';
      if (node.nodeType === 3) { text = node.textContent || ''; }
      else {
        const elNode = node as HTMLElement;
        text = elNode.textContent || '';
        const cls = elNode.className ? ' class="' + elNode.className + '"' : '';
        const stl = elNode.getAttribute && elNode.getAttribute('style') ? ' style="' + elNode.getAttribute('style') + '"' : '';
        wrapTagOpen = '<' + elNode.tagName.toLowerCase() + cls + stl + '>';
        wrapTagClose = '</' + elNode.tagName.toLowerCase() + '>';
      }
      const html = text.split(' ').filter(Boolean).map((w) => '<span class="w"><span class="wi">' + w + '</span></span>').join(' ');
      el.insertAdjacentHTML('beforeend', wrapTagOpen + html + wrapTagClose + ' ');
    });
  });
}

export default function HomeClient() {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ac = new AbortController();
    const { signal } = ac;
    let mm: gsap.MatchMedia | null = null;
    let lenis: Lenis | null = null;
    let lenisRaf: ((t: number) => void) | null = null;
    let mqTick: (() => void) | null = null;
    let safetyT: ReturnType<typeof setTimeout> | null = null;

    document.body.classList.add('is-locked');

    const ctx = gsap.context(() => {

      /* ---------- Lenis smooth scroll, synced to ScrollTrigger ---------- */
      if (!REDUCED) {
        lenis = new Lenis({ lerp: 0.1 });
        lenis.on('scroll', ScrollTrigger.update);
        lenisRaf = (t) => { lenis!.raf(t * 1000); };
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);
      }

      /* ---------- anchor scrolling that respects Lenis ---------- */
      document.querySelectorAll<HTMLAnchorElement>('[data-scroll]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (!id || id.charAt(0) !== '#') return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          closeMenu();
          if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.1 });
          else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
        }, { signal });
      });

      if (!REDUCED) document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);

      /* ---------- PRELOADER — fast on purpose: speed IS the brand ---------- */
      const pre = document.getElementById('preloader');
      const curtain = document.getElementById('curtain');
      function heroIntro() {
        if (REDUCED) return;
        ctx.add(() => {
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
          tl.to('#hero h1 .wi', { y: 0, duration: 0.9, stagger: 0.03 }, 0)
            .to('#hero .rv', { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.15)
            .from('#heroMark', { scale: 0.85, opacity: 0, duration: 1, ease: 'power3.out' }, 0.1)
            .add(() => { document.getElementById('hero')?.classList.add('is-in'); }, 0.55);
        });
      }
      function releasePage() {
        document.body.classList.remove('is-locked');
        ScrollTrigger.refresh();
      }
      function startPreloader() {
        ctx.add(() => {
          const num = { v: 0 };
          const numEl = document.getElementById('preNum')!;
          const tl = gsap.timeline();
          tl.to(num, {
            v: 100, duration: 0.85, ease: 'power2.inOut',
            onUpdate: () => { numEl.textContent = String(Math.round(num.v)); }
          })
            .to('.pre-word span', { y: '-115%', duration: 0.5, ease: 'power4.inOut', stagger: 0.035 }, '+=0.05')
            .to(['.pre-mark', '.pre-tag', '.pre-count'], { opacity: 0, duration: 0.3 }, '<')
            .set(pre, { display: 'none' })
            .to(curtain, {
              yPercent: -100, duration: 0.7, ease: 'power4.inOut',
              onStart: () => { releasePage(); heroIntro(); }
            })
            .set(curtain, { display: 'none' });
        });
      }
      if (REDUCED) {
        if (pre) pre.style.display = 'none';
        if (curtain) curtain.style.display = 'none';
        document.querySelectorAll<HTMLElement>('.rv').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
        releasePage();
      } else {
        // rAF defers past the gsap.context() call so `ctx` is assigned when startPreloader runs
        if (document.readyState === 'complete') requestAnimationFrame(() => startPreloader());
        else window.addEventListener('load', startPreloader, { signal, once: true });
        // safety: never trap the user if load hangs
        safetyT = setTimeout(() => {
          if (document.body.classList.contains('is-locked')) {
            if (pre) pre.style.display = 'none';
            if (curtain) curtain.style.display = 'none';
            releasePage(); heroIntro();
          }
        }, 5000);
      }

      /* ---------- nav glass on scroll ---------- */
      const nav = document.getElementById('nav')!;
      window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true, signal });

      /* ---------- FULLSCREEN MENU ---------- */
      const burger = document.getElementById('burger')!;
      const menu = document.getElementById('menu')!;
      let menuOpen = false;
      function openMenu() {
        menuOpen = true;
        burger.classList.add('open'); burger.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-locked');
        if (lenis) lenis.stop();
        if (!REDUCED) {
          ctx.add(() => {
            gsap.set(menu, { visibility: 'visible' });
            gsap.timeline()
              .to(menu, { clipPath: 'inset(0% 0 0% 0)', duration: 0.6, ease: 'power4.inOut' })
              .fromTo('.menu-links .mi', { y: '110%' }, { y: '0%', duration: 0.7, ease: 'power4.out', stagger: 0.06 }, '-=0.2')
              .fromTo('.menu-foot', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.3');
          });
        } else { menu.style.visibility = 'visible'; menu.style.clipPath = 'inset(0 0 0 0)'; }
      }
      function closeMenu() {
        if (!menuOpen) return;
        menuOpen = false;
        burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-locked');
        if (lenis) lenis.start();
        if (!REDUCED) {
          ctx.add(() => {
            gsap.timeline()
              .to('.menu-links .mi', { y: '-110%', duration: 0.4, ease: 'power4.in', stagger: 0.04 })
              .to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power4.inOut' }, '-=0.15')
              .set(menu, { visibility: 'hidden' });
          });
        } else { menu.style.visibility = 'hidden'; menu.style.clipPath = 'inset(0 0 100% 0)'; }
      }
      burger.addEventListener('click', () => { menuOpen ? closeMenu() : openMenu(); }, { signal });
      // hover crossfades the tint layer behind the links
      document.querySelectorAll<HTMLAnchorElement>('.menu-links a').forEach((a) => {
        a.addEventListener('mouseenter', () => {
          document.querySelectorAll<HTMLElement>('.menu-tint').forEach((t) => {
            t.classList.toggle('on', t.dataset.tint === a.dataset.hover);
          });
        }, { signal });
        a.addEventListener('mouseleave', () => {
          document.querySelectorAll('.menu-tint').forEach((t) => { t.classList.remove('on'); });
        }, { signal });
      });

      if (!REDUCED) {
        gsap.defaults({ ease: 'power4.out' });

        /* ---------- section entrances ---------- */
        document.querySelectorAll<HTMLElement>('[data-split]').forEach((h) => {
          if (h.closest('#hero')) return; // hero handled by intro timeline
          gsap.to(h.querySelectorAll('.wi'), {
            y: 0, duration: 0.85, stagger: 0.028,
            scrollTrigger: {
              trigger: h, start: 'top 84%', once: true,
              onEnter: () => { const s = h.closest('section, #cta'); if (s) s.classList.add('is-in'); }
            }
          });
        });
        ScrollTrigger.batch(
          Array.prototype.filter.call(document.querySelectorAll('.rv'), (el: HTMLElement) => !el.closest('#hero')),
          {
            start: 'top 88%', once: true,
            onEnter: (els) => { gsap.to(els, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }); }
          });

        /* ---------- hero mark: scroll drives rotation + drift ---------- */
        gsap.to('#heroMark', {
          yPercent: 14, rotation: 7, transformOrigin: '50% 60%', ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
        });
        gsap.to('.hero-blob-1', {
          yPercent: 22, ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
        });

        /* ---------- marquee velocity react ---------- */
        const mq = document.getElementById('mqTrack')!;
        const mqSkew = gsap.quickTo(mq, 'skewX', { duration: 0.5, ease: 'power2.out' });
        let mqAnim: Animation | null = null, mqRate = 1, mqTarget = 1;
        ScrollTrigger.create({
          trigger: document.body, start: 0, end: 'max',
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-1400, 1400, self.getVelocity());
            mqSkew(v / 220);
            mqTarget = 1 + Math.min(Math.abs(v) / 500, 1.8);
          }
        });
        mqTick = () => {
          if (!mqAnim && mq.getAnimations) mqAnim = mq.getAnimations()[0] || null;
          mqRate += (mqTarget - mqRate) * 0.08;      // chase the target
          mqTarget += (1 - mqTarget) * 0.03;         // target decays back to rest
          if (mqAnim) mqAnim.playbackRate = mqRate;
        };
        gsap.ticker.add(mqTick);

        /* ---------- HOW IT WORKS: pinned horizontal scroll ≥1024px ---------- */
        mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const track = document.getElementById('howTrack')!;
          const pin = document.getElementById('howPin')!;
          const getX = () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.05);
          const tween = gsap.to(track, {
            x: getX, ease: 'none',
            scrollTrigger: {
              trigger: pin, pin: true, scrub: 0.7,
              start: 'top 12%',
              end: () => '+=' + (track.scrollWidth - window.innerWidth + 400),
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                document.getElementById('howBar')!.style.width = (self.progress * 100) + '%';
              }
            }
          });
          // gentle per-card parallax drift
          gsap.utils.toArray<HTMLElement>('.step').forEach((card, i) => {
            gsap.fromTo(card, { y: i % 2 ? 18 : -6 }, {
              y: i % 2 ? -14 : 10, ease: 'none',
              scrollTrigger: { containerAnimation: tween, trigger: card, start: 'left right', end: 'right left', scrub: true }
            });
          });
        });
        mm.add('(max-width: 1023px)', () => {
          // simple vertical entrances instead of pinning
          gsap.utils.toArray<HTMLElement>('.step').forEach((card) => {
            gsap.from(card, {
              y: 34, opacity: 0, duration: 0.7,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true }
            });
          });
          document.getElementById('howBar')!.style.display = 'none';
        });

        /* ---------- floating triangles in the final CTA ---------- */
        gsap.utils.toArray<HTMLElement>('.cta-tri').forEach((t, i) => {
          gsap.to(t, {
            y: i % 2 ? 26 : -26, rotation: i % 2 ? 14 : -12, ease: 'none',
            scrollTrigger: { trigger: '#cta', start: 'top bottom', end: 'bottom top', scrub: 1 }
          });
        });

        /* ---------- keep triggers honest on resize ---------- */
        let rT: ReturnType<typeof setTimeout>;
        window.addEventListener('resize', () => {
          clearTimeout(rT); rT = setTimeout(() => { ScrollTrigger.refresh(); }, 200);
        }, { signal });
      }

      /* esc closes menu */
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); }, { signal });
    });

    return () => {
      ac.abort();
      if (safetyT) clearTimeout(safetyT);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      if (mqTick) gsap.ticker.remove(mqTick);
      lenis?.destroy();
      mm?.revert();
      ctx.revert();
      document.body.classList.remove('is-locked');
    };
  }, []);

  return (
    <>
      {/* ══════════════ PRELOADER (kept FAST: speed is the brand) ══════════════ */}
      <div id="preloader">
        <div className="pre-inner">
          <svg className="pre-mark" viewBox="0 0 100 64" aria-hidden="true">
            <polygon points="2,2 58,2 30,60" fill="#8CE7E5" />
            <polygon points="42,2 98,2 70,60" fill="#F2D8A5" opacity="0.92" />
            <polygon points="40,2 60,2 50,23" fill="#5863E7" />
          </svg>
          <div className="pre-word" aria-label="Webbify">
            <span>W</span><span>E</span><span>B</span><span>B</span><span>I</span><span>F</span><span>Y</span>
          </div>
          <div className="pre-tag">AI-Powered Web Agency</div>
        </div>
        <div className="pre-count"><span id="preNum">0</span>%</div>
      </div>
      <div id="curtain"></div>

      {/* ══════════════ NAV ══════════════ */}
      <nav id="nav">
        <div className="nav-inner">
          <a href="#hero" className="brand" data-scroll>
            <BrandMark />
            <span className="brand-name">Webbi<i>fy</i></span>
          </a>
          <div className="nav-links">
            <a href="#how" data-scroll>How it works</a>
            <a href="#work" data-scroll>Work</a>
            <a href="#pricing" data-scroll>Pricing</a>
            <a href="#founders" data-scroll>Founders</a>
            <a className="btn btn-primary nav-cta" href={`${WA}?text=Hi%20Webbify%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20a%20website.`} target="_blank" rel="noopener">Chat on WhatsApp</a>
          </div>
          <button className="burger" id="burger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ══════════════ FULLSCREEN MENU (link hover crossfades a tint layer) ══════════════ */}
      <div id="menu" aria-hidden="true">
        <div className="menu-tint tint-indigo" data-tint="how"></div>
        <div className="menu-tint tint-turq" data-tint="work"></div>
        <div className="menu-tint tint-sand" data-tint="pricing"></div>
        <div className="menu-tint tint-wa" data-tint="founders"></div>
        <div className="menu-links">
          {MENU_LINKS.map((l) => (
            <a key={l.hover} href={l.href} data-scroll data-hover={l.hover}>
              <span className="num">{l.num}</span><span className="mi">{l.label}</span>
            </a>
          ))}
        </div>
        <div className="menu-foot">
          <span>halo@webbify.id</span>
          <a href="https://webbify.vercel.app" target="_blank" rel="noopener">webbify.vercel.app</a>
        </div>
      </div>

      <main>

        {/* ══════════════ HERO ══════════════ */}
        <section id="hero">
          <div className="hero-bg">
            <div className="hero-blob-1"></div>
            <div className="hero-blob-2"></div>
            <svg className="tri-field" width="100%" height="100%" aria-hidden="true">
              <defs><pattern id="triP" width="120" height="120" patternUnits="userSpaceOnUse">
                <polygon points="14,10 30,10 22,24" fill="none" stroke="#5863E7" strokeWidth="1" opacity="0.10" />
                <polygon points="80,70 96,70 88,84" fill="none" stroke="#8CE7E5" strokeWidth="1" opacity="0.16" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#triP)" />
            </svg>
          </div>
          <div className="wrap hero-grid">
            <div className="hero-content">
              <div className="hero-badge rv">AI-Powered · Human-Piloted</div>
              <h1 data-split>We build your website <em className="accent" style={{ fontStyle: 'normal' }}>first</em>. You pay when you <span className="hl">love it</span>.</h1>
              <p className="hero-sub rv">Webbify designs and ships fast, custom websites — accelerated by AI, perfected by professionals. We prototype before you pay, so you never buy on a promise.</p>
              <div className="hero-ctas rv">
                <a href="#work" className="btn btn-primary" data-scroll>See our work <span className="arr">→</span></a>
                <a href="#how" className="btn btn-ghost" data-scroll>How it works</a>
              </div>
              <div className="hero-stats rv">
                <div className="stat"><div className="n">100<b>+</b></div><div className="l">websites shipped by our team</div></div>
                <div className="stat"><div className="n">5<b>+</b> yrs</div><div className="l">building with top-tier brands</div></div>
                <div className="stat"><div className="n">Rp <b>0</b></div><div className="l">until you approve the prototype</div></div>
              </div>
            </div>
            <div className="hero-visual">
              {/* The real 3D prism mark (vector, extracted from brand artwork). Scroll drives a subtle rotation/drift. */}
              <div className="hero-mark" id="heroMark">
                <img src="/hero-mark.svg" alt="" />
              </div>
              <div className="hero-orbit orb-1"><i>⚡</i>Prototype first</div>
              <div className="hero-orbit orb-2"><i>🎯</i>Diagnostic-driven</div>
              <div className="hero-orbit orb-3"><i>✦</i>Founder-piloted</div>
            </div>
          </div>
        </section>

        {/* ══════════════ MARQUEE ══════════════ */}
        <div id="marquee" aria-hidden="true">
          <div className="mq-track" id="mqTrack">
            {[0, 1].map((set) => (
              <div className="mq-set" key={set}>
                {MQ_ITEMS.map((item) => (
                  <div className="mq-item" key={item}>{item}<span className="tri"></span></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ HOW IT WORKS (pinned horizontal scroll on desktop) ══════════════ */}
        <section id="how">
          <div className="wrap how-head">
            <div className="eyebrow rv">How it works</div>
            <h2 className="h-lg" data-split>From idea to launch — <span className="accent">without the wait.</span></h2>
            <p className="sub rv">A clear, fast path. You see real work early, not weeks later.</p>
          </div>
          <div className="how-pin" id="howPin">
            <div className="how-track" id="howTrack">
              {STEPS.map((s) => (
                <div className="step" key={s.n}>
                  <div className="big-n">{s.n}</div>
                  <div className="step-tag">{s.tag}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  {s.flag && <div className="free-flag">{s.flag}</div>}
                </div>
              ))}
            </div>
            <div className="how-progress"><i id="howBar"></i></div>
          </div>
        </section>

        {/* ══════════════ FEATURED WORK (hover-reveal grid) ══════════════ */}
        <section id="work">
          <div className="wrap">
            <div className="eyebrow rv">Featured work</div>
            <h2 className="h-lg" data-split>Work that speaks <span className="accent">before we do.</span></h2>
            <p className="sub rv">A look at recent builds. Hover to bring them to life.</p>

            {/* NOTE: mock frames are stylized placeholders built in CSS. Replace with real prototype screenshots. */}
            <div className="work-grid">
              {WORK.map((w) => (
                <a className="work-card rv" href="/portfolio" key={w.title}>
                  <div className="work-media">
                    <div className="mock mock-base"><MockFrame hero={w.hero} cards={w.cards} /></div>
                    <div className="mock mock-color"><MockFrame hero={w.hero} cards={w.cards} /></div>
                    <div className="mock-fade"></div>
                  </div>
                  <div className="work-meta">
                    <span className="work-title">{w.title}</span>
                    <p className="work-cap"><b>{w.tier}</b> · {w.cap}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="work-more rv">
              <a href="/portfolio" className="btn btn-ghost">View full portfolio <span className="arr">→</span></a>
            </div>
          </div>
        </section>

        {/* ══════════════ WHY WEBBIFY ══════════════ */}
        <section id="why">
          <div className="wrap">
            <div className="eyebrow rv">Why Webbify</div>
            <h2 className="h-lg" data-split>Why teams <span className="accent">choose us.</span></h2>
            <div className="why-grid">
              <div className="pillar rv">
                <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 18H3z" transform="rotate(180 12 12)" /></svg></div>
                <h3>Prototype before you pay</h3>
                <p>See your real site first. Commit only when you&apos;re convinced.</p>
              </div>
              <div className="pillar rv">
                <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
                <h3>AI-accelerated, human-perfected</h3>
                <p>AI gives us speed. Professional designers and developers give you quality.</p>
              </div>
              <div className="pillar rv">
                <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
                <h3>Custom, never templated</h3>
                <p>Every site is built around your brand — not stamped from a template.</p>
              </div>
              <div className="pillar rv">
                <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
                <h3>Fast, secure, maintained</h3>
                <p>Quick to load, safe to run, and looked after long after launch.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ FOUNDERS ══════════════ */}
        <section id="founders">
          <div className="wrap">
            <div className="eyebrow rv">Founders</div>
            <h2 className="h-lg" data-split>Built and piloted by the <span className="accent">founders themselves.</span></h2>
            <p className="sub rv">Every project runs through us directly — no handoffs, no juniors.</p>
            <div className="founder-grid">
              {FOUNDERS.map((f) => (
                <a className="founder rv" href={`/founder#${f.id}`} key={f.id}>
                  <div className="f-ava"><img src={f.img} alt={f.name} loading="lazy" /></div>
                  <div>
                    <div className="f-name">{f.name}</div>
                    <div className="f-role">{f.role}</div>
                    <p className="f-bio">{f.bio}</p>
                    <div className="f-cred">{f.cred}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ PRICING (dark contrast moment) ══════════════ */}
        <section id="pricing">
          <svg className="tri-field" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
            <defs><pattern id="triD" width="140" height="140" patternUnits="userSpaceOnUse">
              <polygon points="20,14 40,14 30,31" fill="none" stroke="#BBBEF3" strokeWidth="1" />
              <polygon points="96,88 116,88 106,105" fill="none" stroke="#F2D8A5" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#triD)" />
          </svg>
          <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
            <div className="eyebrow rv">Pricing</div>
            <h2 className="h-lg" data-split>Simple, transparent pricing.</h2>
            <p className="sub rv">One-time build. Optional annual care plan. No surprises.</p>

            <div className="price-grid">
              {PLANS.map((p) => (
                <div className={p.rec ? 'plan rec rv' : 'plan rv'} key={p.name}>
                  {p.rec && <div className="rec-badge">Recommended</div>}
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-price">{p.price} <small>one-time</small></div>
                  <p className="plan-line">{p.line}</p>
                  <ul>
                    {p.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <a className={`btn ${p.btn}`} href={`${WA}?text=Hi%20Webbify%20%E2%80%94%20I%27d%20like%20to%20discuss%20the%20${p.wa}%20plan.`} target="_blank" rel="noopener">Discuss this tier</a>
                </div>
              ))}
            </div>
            <p className="price-note">Every tier starts the same way: with a prototype you&apos;ve already seen and approved.</p>
          </div>
        </section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section id="cta">
          <svg className="cta-tri" style={{ top: '14%', left: '8%' }} width="42" height="38" viewBox="0 0 42 38"><polygon points="2,2 40,2 21,36" fill="#D5F7F6" /></svg>
          <svg className="cta-tri" style={{ top: '22%', right: '10%' }} width="30" height="27" viewBox="0 0 30 27"><polygon points="2,2 28,2 15,25" fill="#F7E8C9" /></svg>
          <svg className="cta-tri" style={{ bottom: '16%', left: '16%' }} width="24" height="22" viewBox="0 0 24 22"><polygon points="2,2 22,2 12,20" fill="#BBBEF3" /></svg>
          <div className="wrap">
            <div className="eyebrow rv" style={{ justifyContent: 'center', display: 'inline-flex' }}>One message away</div>
            <h2 className="h-lg" data-split>You&apos;ve seen what we can do.<br />Let&apos;s build <span className="hl">yours</span>.</h2>
            <p className="sub rv">One message is all it takes. We&apos;ll pick up from your prototype.</p>
            <div className="cta-row rv">
              <a className="btn btn-wa" href={`${WA}?text=Hi%20Webbify%20%E2%80%94%20let%27s%20build%20my%20website.`} target="_blank" rel="noopener">💬 Chat on WhatsApp</a>
              <a className="cta-mail" href="mailto:halo@webbify.id">halo@webbify.id</a>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand">
                <BrandMark />
                <span className="brand-name">Webbi<i>fy</i></span>
              </div>
              <div className="foot-tag">AI-Powered Web Agency</div>
              <p className="foot-desc">Fast, custom websites — accelerated by AI, perfected by professionals. Prototype first, pay when you love it.</p>
            </div>
            <div className="foot-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#how" data-scroll>How it works</a></li>
                <li><a href="#work" data-scroll>Work</a></li>
                <li><a href="#pricing" data-scroll>Pricing</a></li>
                <li><a href="#founders" data-scroll>Founders</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:halo@webbify.id">halo@webbify.id</a></li>
                <li><a href={WA} target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="https://webbify.vercel.app" target="_blank" rel="noopener">webbify.vercel.app</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <div>© 2026 Webbify. All rights reserved.</div>
            <div>Jakarta, Indonesia</div>
          </div>
        </div>
      </footer>
    </>
  );
}
