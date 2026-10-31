'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const WA = 'https://wa.me/6281264404887';

export function BrandMark({ className = 'brand-icon' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 64" aria-hidden="true">
      <polygon points="2,2 58,2 30,60" fill="#8CE7E5" />
      <polygon points="42,2 98,2 70,60" fill="#F2D8A5" opacity="0.92" />
      <polygon points="40,2 60,2 50,23" fill="#5863E7" />
    </svg>
  );
}

/** Triangle pattern wash — `id` must be unique per instance, patterns are global. */
export function TriField({ id, dark = false }: { id: string; dark?: boolean }) {
  return (
    <svg className="tri-field" width="100%" height="100%" aria-hidden="true" style={dark ? { position: 'absolute', inset: 0 } : undefined}>
      <defs>
        <pattern id={id} width={dark ? 140 : 120} height={dark ? 140 : 120} patternUnits="userSpaceOnUse">
          {dark ? (
            <>
              <polygon points="20,14 40,14 30,31" fill="none" stroke="#BBBEF3" strokeWidth="1" />
              <polygon points="96,88 116,88 106,105" fill="none" stroke="#F2D8A5" strokeWidth="1" />
            </>
          ) : (
            <>
              <polygon points="14,10 30,10 22,24" fill="none" stroke="#5863E7" strokeWidth="1" opacity="0.1" />
              <polygon points="80,70 96,70 88,84" fill="none" stroke="#8CE7E5" strokeWidth="1" opacity="0.16" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/#founders', label: 'Founders' }
];

export function InsightsNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : undefined}>
        <div className="nav-inner">
          <Link href="/insights" className="brand">
            <BrandMark />
            <span className="brand-name">
              Webbi<i>fy</i>
            </span>
            <span className="brand-sep">Insights</span>
          </Link>
          <div className="nav-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={l.href === '/insights' ? 'active' : undefined}>
                {l.label}
              </Link>
            ))}
            <a className="btn btn-primary nav-cta" href={WA} target="_blank" rel="noopener">
              Chat on WhatsApp
            </a>
          </div>
          <button
            className={`burger${open ? ' open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="menu" className={open ? 'open' : undefined} aria-hidden={!open}>
        <div className="menu-links">
          {LINKS.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mi">{l.label}</span>
            </Link>
          ))}
        </div>
        <div className="menu-foot">
          <span>halo@webbify.id</span>
          <a href="https://webbify.id" target="_blank" rel="noopener">
            webbify.id
          </a>
        </div>
      </div>
    </>
  );
}

export function InsightsFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <BrandMark />
              <span className="brand-name">
                Webbi<i>fy</i>
              </span>
            </div>
            <div className="foot-tag">AI-Powered Web Agency</div>
            <p className="foot-desc">
              Fast, custom websites — accelerated by AI, perfected by professionals. Prototype first, pay when you love it.
            </p>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <Link href="/#work">Work</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
              <li>
                <Link href="/#founders">Founders</Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:halo@webbify.id">halo@webbify.id</a>
              </li>
              <li>
                <a href="https://webbify.id" target="_blank" rel="noopener">
                  webbify.id
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 Webbify. All rights reserved.</div>
          <div>Jakarta, Indonesia</div>
        </div>
      </div>
    </footer>
  );
}
