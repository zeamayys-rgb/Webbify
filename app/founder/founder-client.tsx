'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import './founder.css';

/* TODO: replace 62XXXXXXXXXXX with the real Webbify WhatsApp number */
const WA = 'https://wa.me/62XXXXXXXXXXX';

const LOGOS = [
  { src: '/asset/logos/google.png', alt: 'Google' },
  { src: '/asset/logos/bcg.png', alt: 'Boston Consulting Group' },
  { src: '/asset/logos/wri.png', alt: 'World Resources Institute' },
  { src: '/asset/logos/pertamina.png', alt: 'Pertamina' },
  { src: '/asset/logos/telkom.png', alt: 'Telkom Indonesia' },
  { src: '/asset/logos/sinarmas.png', alt: 'Sinar Mas' }
];

const SKILLS = [
  {
    n: '01', tag: 'Research', h: 'Research that de-risks decisions.',
    p: "Usability tests, diary studies, interviews, surveys — I've run them all, leading design research for eight top-tier NGOs across Southeast Asia. Every design call is grounded in evidence, not taste."
  },
  {
    n: '02', tag: 'Strategy', h: 'Strategy before pixels.',
    p: "Information architecture, user journeys, and product roadmaps tied to real objectives. It's the same diagnostic thinking behind the free gap analysis every Webbify client gets first."
  },
  {
    n: '03', tag: 'Systems', h: 'Design systems at enterprise scale.',
    p: 'For Pertamina, I redesigned and standardized 16 production-monitoring web apps — 230+ modules and 1,000+ pages — into one coherent system users could finally navigate.'
  },
  {
    n: '04', tag: 'Shipping', h: 'Design that ships itself.',
    p: "I take designs from Figma to working web with no-code and AI-accelerated tooling. This is the engine behind Webbify's promise: a real prototype in your hands before any payment."
  }
];

const TIMELINE = [
  {
    year: '2025 — Now', org: 'Webbify', role: 'Co-founder · Product, Strategy & Design',
    desc: <>Building the prototype-first web agency. I own the <b>gap analysis</b>, the design, and every client conversation — you talk to the person actually making your site.</>
  },
  {
    year: '2023 — 2026', org: 'World Resources Institute Indonesia', role: 'Product Design & User Research Lead',
    desc: <>Led design and research for the <b>Nature-based Solutions platform</b> serving eight top-tier NGOs across Southeast Asia — plus climate tools spanning methane tracking, agricarbon, and forest dashboards.</>
  },
  {
    year: '2024 — 2025', org: 'Pertamina Hulu Sanga-Sanga', role: 'UI/UX Designer',
    desc: <>Redesigned and standardized <b>16 enterprise web applications</b> — 230+ modules, 1,000+ pages — resolving user pain points across an entire production-monitoring suite.</>
  },
  {
    year: '2023 — 2024', org: 'Sinar Mas Group · Borneo Indobara', role: 'UX Designer',
    desc: <>Designed a <b>hauling management system</b> end-to-end for two roles across mobile, desktop, and on-board units — then branded and shipped an Alert Center from logo to interface.</>
  },
  {
    year: '2021 — 2022', org: 'Darul Quran Mulia', role: 'Product & Visual Designer',
    desc: <>Built the <b>information architecture</b> and prototypes for the foundation&apos;s internal school platforms, structuring content the way staff actually think.</>
  },
  {
    year: '2020 — 2021', org: 'Telkom Indonesia', role: 'UI/UX Designer',
    desc: <>Led the full UI process for an <b>AI smart-speaker controller app</b> — from concept with the research team to developer hand-off documentation.</>
  }
];

/* ---------- word splitter (same as index) ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return; // guard against re-runs (fast refresh / strict mode)
  el.dataset.splitDone = '1';
  const words = el.innerHTML.trim().split(/(<br\s*\/?>)/i);
  el.innerHTML = '';
  words.forEach((chunk) => {
    if (/^<br/i.test(chunk)) { el.insertAdjacentHTML('beforeend', '<br>'); return; }
    const tmp = document.createElement('div'); tmp.innerHTML = chunk;
    Array.prototype.slice.call(tmp.childNodes).forEach((node: ChildNode) => {
      let text: string, open = '', close = '';
      if (node.nodeType === 3) { text = node.textContent || ''; }
      else {
        const elNode = node as HTMLElement;
        text = elNode.textContent || '';
        const cls = elNode.className ? ' class="' + elNode.className + '"' : '';
        open = '<' + elNode.tagName.toLowerCase() + cls + '>';
        close = '</' + elNode.tagName.toLowerCase() + '>';
      }
      const html = text.split(' ').filter(Boolean).map((w) => '<span class="w"><span class="wi">' + w + '</span></span>').join(' ');
      el.insertAdjacentHTML('beforeend', open + html + close + ' ');
    });
  });
}

export default function FounderClient() {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const MOBILE = window.matchMedia('(max-width: 767px)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ac = new AbortController();
    const { signal } = ac;
    let lenis: Lenis | null = null;
    let lenisRaf: ((t: number) => void) | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {

      /* ---------- Lenis smooth scroll ---------- */
      if (!REDUCED) {
        lenis = new Lenis({ lerp: 0.1 });
        lenis.on('scroll', ScrollTrigger.update);
        lenisRaf = (t) => { lenis!.raf(t * 1000); };
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);
      }

      /* ---------- nav glass ---------- */
      const nav = document.getElementById('nav')!;
      window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true, signal });

      if (!REDUCED) document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);

      /* ============================================================
         THREE.JS — floating brand prisms behind the hero.
         Decorative only: skipped on mobile / reduced motion / no WebGL,
         paused when the hero is off screen.
         ============================================================ */
      (function initThree() {
        if (REDUCED || MOBILE) return;
        const wrap = document.getElementById('threeWrap')!;
        try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
        catch { return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
        wrap.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
        camera.position.z = 14;

        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const key = new THREE.DirectionalLight(0xffffff, 0.7); key.position.set(4, 6, 8); scene.add(key);

        const palette = [0x5863e7, 0x8ce7e5, 0xf2d8a5, 0xbbbef3];
        const group = new THREE.Group();
        for (let i = 0; i < 16; i++) {
          const geo = i % 3 === 0 ? new THREE.OctahedronGeometry(0.55) : new THREE.TetrahedronGeometry(0.62);
          const solid = i % 2 === 0;
          const mat = solid
            ? new THREE.MeshStandardMaterial({ color: palette[i % 4], roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.85 })
            : new THREE.MeshBasicMaterial({ color: palette[i % 4], wireframe: true, transparent: true, opacity: 0.5 });
          const m = new THREE.Mesh(geo, mat);
          m.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 6 - 1);
          m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          m.userData = {
            rs: 0.2 + Math.random() * 0.5, fs: 0.4 + Math.random() * 0.8,
            fa: 0.15 + Math.random() * 0.35, y0: m.position.y, ph: Math.random() * Math.PI * 2
          };
          group.add(m);
        }
        scene.add(group);

        // mouse parallax
        let mx = 0, my = 0;
        window.addEventListener('pointermove', (e) => {
          mx = (e.clientX / window.innerWidth - 0.5);
          my = (e.clientY / window.innerHeight - 0.5);
        }, { passive: true, signal });

        // pause when hero is out of view
        let running = true;
        observer = new IntersectionObserver((en) => { running = en[0].isIntersecting; }, { threshold: 0 });
        observer.observe(document.getElementById('hero')!);

        const clock = new THREE.Clock();
        renderer.setAnimationLoop(() => {
          if (!running) return;
          const t = clock.getElapsedTime();
          group.children.forEach((m) => {
            m.rotation.x += 0.002 * m.userData.rs;
            m.rotation.y += 0.003 * m.userData.rs;
            m.position.y = m.userData.y0 + Math.sin(t * m.userData.fs + m.userData.ph) * m.userData.fa;
          });
          group.rotation.y += (mx * 0.25 - group.rotation.y) * 0.04;
          group.rotation.x += (my * 0.15 - group.rotation.x) * 0.04;
          renderer!.render(scene, camera);
        });

        window.addEventListener('resize', () => {
          camera.aspect = wrap.clientWidth / wrap.clientHeight;
          camera.updateProjectionMatrix();
          renderer!.setSize(wrap.clientWidth, wrap.clientHeight);
        }, { signal });
      })();

      /* ---------- PHOTO CARD — 3D tilt toward the cursor ---------- */
      (function initTilt() {
        const card = document.getElementById('tiltCard');
        if (!card || REDUCED || MOBILE) return;
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const scene = card.parentElement!;
        scene.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(((e.clientY - r.top) / r.height - 0.5) * -14);
        }, { signal });
        scene.addEventListener('pointerleave', () => { rx(0); ry(0); }, { signal });
      })();

      /* ---------- ENTRANCES + SCROLL EFFECTS ---------- */
      function countUp(scope: HTMLElement | null) {
        (scope || document).querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const end = +(el.dataset.count || 0), o = { v: 0 };
          gsap.to(o, {
            v: end, duration: 1.4, ease: 'power2.out', delay: 0.4,
            onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-US'); }
          });
        });
      }

      if (!REDUCED) {
        gsap.defaults({ ease: 'power4.out' });

        // hero intro
        gsap.timeline()
          .to('#hero h1 .wi', { y: 0, duration: 0.9, stagger: 0.03 }, 0.1)
          .to('#hero .rv', { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.2)
          .from('.photo-card', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' }, 0.15);
        countUp(document.getElementById('panel-abdan'));

        // section entrances
        document.querySelectorAll<HTMLElement>('[data-split]').forEach((h) => {
          if (h.closest('#hero')) return;
          gsap.to(h.querySelectorAll('.wi'), {
            y: 0, duration: 0.85, stagger: 0.028,
            scrollTrigger: { trigger: h, start: 'top 84%', once: true }
          });
        });
        ScrollTrigger.batch(
          Array.prototype.filter.call(document.querySelectorAll('.rv'), (el: HTMLElement) => !el.closest('#hero')),
          {
            start: 'top 88%', once: true,
            onEnter: (els) => { gsap.to(els, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }); }
          });

        // timeline: line draws + items light up
        gsap.to('#tlFill', {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.tl', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 }
        });
        document.querySelectorAll<HTMLElement>('.tl-item').forEach((item) => {
          ScrollTrigger.create({
            trigger: item, start: 'top 70%', once: true,
            onEnter: () => { item.classList.add('lit'); }
          });
          gsap.from(item, {
            x: 34, opacity: 0, duration: 0.7,
            scrollTrigger: { trigger: item, start: 'top 85%', once: true }
          });
        });

        let rT: ReturnType<typeof setTimeout>;
        window.addEventListener('resize', () => {
          clearTimeout(rT); rT = setTimeout(() => { ScrollTrigger.refresh(); }, 200);
        }, { signal });
      } else {
        document.querySelectorAll<HTMLElement>('.rv').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
        document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => { el.textContent = (+(el.dataset.count || 0)).toLocaleString('en-US'); });
        const tf = document.getElementById('tlFill'); if (tf) tf.style.transform = 'scaleY(1)';
        document.querySelectorAll('.tl-item').forEach((i) => { i.classList.add('lit'); });
      }

      /* ---------- TABS — Abdan ⇄ Bedur (GSAP crossfade, hash deep-link) ---------- */
      const tabs = document.querySelectorAll<HTMLElement>('.tab');
      const abdanSections = document.getElementById('abdanSections')!;
      function setFounder(name: string, animate: boolean) {
        tabs.forEach((t) => {
          const on = t.dataset.founder === name;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', String(on));
        });
        const showPanel = document.getElementById('panel-' + name)!;
        const hidePanel = document.querySelector<HTMLElement>('.panel.active');
        if (hidePanel === showPanel) return;
        abdanSections.style.display = name === 'abdan' ? '' : 'none';

        function swap() {
          if (hidePanel) hidePanel.classList.remove('active');
          showPanel.classList.add('active');
          ScrollTrigger.refresh();
        }
        if (animate && !REDUCED) {
          ctx.add(() => {
            gsap.to(hidePanel, {
              opacity: 0, y: 16, duration: 0.28, ease: 'power2.in', onComplete: () => {
                gsap.set(hidePanel, { clearProps: 'all' });
                swap();
                gsap.fromTo(showPanel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power4.out' });
              }
            });
          });
        } else swap();
        if (history.replaceState) history.replaceState(null, '', '#' + name);
      }
      tabs.forEach((t) => {
        t.addEventListener('click', () => { setFounder(t.dataset.founder!, true); }, { signal });
      });
      if (location.hash === '#bedur') setFounder('bedur', false);
    });

    return () => {
      ac.abort();
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      lenis?.destroy();
      observer?.disconnect();
      if (renderer) {
        renderer.setAnimationLoop(null);
        renderer.domElement.remove();
        renderer.dispose();
      }
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ══════════════ NAV ══════════════ */}
      <nav id="nav">
        <div className="nav-inner">
          <a href="/" className="brand">
            <svg className="brand-icon" viewBox="0 0 100 64" aria-hidden="true">
              <polygon points="2,2 58,2 30,60" fill="#8CE7E5" />
              <polygon points="42,2 98,2 70,60" fill="#F2D8A5" opacity="0.92" />
              <polygon points="40,2 60,2 50,23" fill="#5863E7" />
            </svg>
            <span className="brand-name">Webbi<i>fy</i></span>
          </a>
          <div className="nav-right">
            <a className="back-link" href="/#founders">← Back to home</a>
            <a className="btn btn-primary nav-cta" href={`${WA}?text=Hi%20Webbify%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20a%20website.`} target="_blank" rel="noopener">Chat on WhatsApp</a>
          </div>
        </div>
      </nav>

      <main>

        {/* ══════════════ HERO + TABS ══════════════ */}
        <section id="hero">
          <div className="hero-blob blob-a"></div>
          <div className="hero-blob blob-b"></div>
          <div id="threeWrap" aria-hidden="true"></div>

          <div className="wrap">
            {/* founder switcher */}
            <div className="tabs rv" role="tablist" aria-label="Choose a founder">
              <button className="tab active" data-founder="abdan" role="tab" aria-selected="true">
                <img src="/asset/abdan.jpg" alt="" />
                <span><span className="t-name">Abdan</span><br /><span className="t-role">Product · Strategy · Design</span></span>
              </button>
              <button className="tab" data-founder="bedur" role="tab" aria-selected="false">
                <img src="/asset/bedur.jpg" alt="" />
                <span><span className="t-name">Bedur</span><br /><span className="t-role">Development · Tech Ops</span></span>
              </button>
            </div>

            {/* ════════ ABDAN ════════ */}
            <div className="panel active" id="panel-abdan">
              <div className="hero-grid">
                <div className="photo-scene">
                  <div className="photo-card" id="tiltCard">
                    <img src="/asset/abdan.jpg" alt="Abdan Syakuro — Co-founder of Webbify" />
                  </div>
                  <div className="photo-chip chip-1"><i>🎓</i>Google UX Design certified</div>
                  <div className="photo-chip chip-2"><i>🧠</i>Computer Science, IPB University</div>
                </div>
                <div className="hero-copy">
                  <div className="role-line rv">Co-founder · Product, Strategy &amp; Design</div>
                  <h1 data-split>I turn business problems into <span className="accent">products people love.</span></h1>
                  <p className="bio rv">I&apos;m Abdan — a product designer with 5+ years across climate, energy, telco, mining, and education. I work the whole arc: research to strategy to interface to a working website. At Webbify, I own the gap analysis, the design, and every conversation with you.</p>
                  <div className="hero-ctas rv">
                    <a className="btn btn-wa" href={`${WA}?text=Hi%20Abdan%2C%20let%27s%20talk%20about%20my%20website.`} target="_blank" rel="noopener">Talk to me directly <span className="arr">→</span></a>
                    <a className="btn btn-ghost" href="/#how">How we work</a>
                  </div>
                  <div className="hero-stats rv">
                    <div className="stat"><div className="n"><b data-count="5">0</b>+ yrs</div><div className="l">designing digital products</div></div>
                    <div className="stat"><div className="n"><b data-count="16">0</b> apps</div><div className="l">standardized for Pertamina</div></div>
                    <div className="stat"><div className="n"><b data-count="1000">0</b>+</div><div className="l">pages redesigned into one system</div></div>
                    <div className="stat"><div className="n"><b data-count="8">0</b> NGOs</div><div className="l">researched across Southeast Asia</div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════ BEDUR (placeholder — full profile coming soon) ════════ */}
            <div className="panel" id="panel-bedur">
              <div className="soon-card">
                <img src="/asset/bedur.jpg" alt="Bedur — Co-founder of Webbify" />
                <div>
                  <div className="f-name">Bedur</div>
                  <div className="f-role">Co-founder · Development &amp; Tech Operations</div>
                  <p>Leads development, system integration, and technical operations. Makes sure every site Webbify ships is fast, secure, and keeps running well long after launch — <b style={{ color: 'var(--ink)' }}>100+ websites built in the last 4 years</b>.</p>
                  <div className="soon-badge">▲&nbsp; Full profile — coming soon</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* everything below belongs to the Abdan story; hidden when Bedur tab is active */}
        <div id="abdanSections">

          {/* ══════════════ BRAND LOGO WALL ══════════════ */}
          <section id="brands">
            <div className="wrap">
              <div className="eyebrow rv">Track record</div>
              <h2 className="h-lg" data-split>Work trusted by <span className="accent">top-tier brands.</span></h2>
              <p className="sub rv">Digital products designed for and alongside these organizations — from global consultancies to Indonesia&apos;s biggest enterprises.</p>
              <div className="logo-grid">
                {LOGOS.map((l) => (
                  <div className="logo-cell rv" key={l.alt}><img src={l.src} alt={l.alt} loading="lazy" /></div>
                ))}
              </div>
              <p className="brand-note rv">Logos represent organizations Abdan has designed for, with, or alongside across employment, consultancy, and project engagements. All trademarks belong to their respective owners.</p>
            </div>
          </section>

          {/* ══════════════ SELLING POINTS ══════════════ */}
          <section id="skills">
            <div className="wrap">
              <div className="eyebrow rv">What I bring</div>
              <h2 className="h-lg" data-split>Four things I do <span className="accent">unreasonably well.</span></h2>
              <div className="skill-grid">
                {SKILLS.map((s) => (
                  <div className="skill rv" key={s.n}>
                    <div className="s-n">{s.n}</div>
                    <div className="skill-tag">{s.tag}</div>
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════ JOURNEY TIMELINE ══════════════ */}
          <section id="journey">
            <div className="wrap">
              <div className="eyebrow rv">The journey</div>
              <h2 className="h-lg" data-split>Five industries. <span className="accent">One craft.</span></h2>
              <div className="tl">
                <div className="tl-line"><i id="tlFill"></i></div>
                {TIMELINE.map((t) => (
                  <div className="tl-item" key={t.org}>
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-org">{t.org}</div>
                    <div className="tl-role">{t.role}</div>
                    <p className="tl-desc">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>{/* /abdanSections */}

        {/* ══════════════ CTA ══════════════ */}
        <section id="cta">
          <div className="wrap">
            <h2 className="h-lg" data-split>Your website deserves <span className="accent">a founder&apos;s attention.</span></h2>
            <p className="sub rv">No account managers, no hand-offs. You work directly with the people who design and build.</p>
            <div className="rv">
              <a className="btn btn-primary" href={`${WA}?text=Hi%20Webbify%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20a%20website.`} target="_blank" rel="noopener">Start with a free prototype <span className="arr">→</span></a>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div className="wrap foot-row">
          <div>© 2026 Webbify. All rights reserved.</div>
          <div><a href="/">webbify.id</a> · Jakarta, Indonesia</div>
        </div>
      </footer>
    </>
  );
}
