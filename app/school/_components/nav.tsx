'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BASE, href, tr, UI, type Lang } from '../_lib/i18n';
import { Crest } from './ui';

const ITEMS = [
  { path: '', key: 'home' },
  { path: '/profil', key: 'profil' },
  { path: '/berita', key: 'berita' },
  { path: '/ppdb', key: 'ppdb' },
  { path: '/galeri', key: 'galeri' },
  { path: '/kontak', key: 'kontak' }
] as const;

export function SchoolNav({ lang, shortName }: { lang: Lang; shortName: string }) {
  const pathname = usePathname() ?? href(lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Path after /school/{lang}, kept when switching language.
  const rest = pathname.slice(`${BASE}/${lang}`.length);
  const other: Lang = lang === 'id' ? 'en' : 'id';

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (p: string) => (p === '' ? rest === '' || rest === '/' : rest.startsWith(p));

  return (
    <nav className={`sch-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main">
      <div className="sch-wrap sch-nav-inner">
        <Link href={href(lang)} className="sch-brand">
          <Crest />
          <span>{shortName}</span>
        </Link>
        <button
          className="sch-burger"
          aria-expanded={open}
          aria-controls="sch-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? tr(UI.close, lang) : tr(UI.menu, lang)}
        </button>
        <div id="sch-menu" className={`sch-menu${open ? ' is-open' : ''}`}>
          <ul>
            {ITEMS.map((it) => (
              <li key={it.key}>
                <Link
                  href={href(lang, it.path)}
                  aria-current={isActive(it.path) ? 'page' : undefined}
                  className={it.key === 'ppdb' ? 'sch-nav-ppdb' : undefined}
                >
                  {tr(UI.nav[it.key], lang)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`${BASE}/${other}${rest}`} hrefLang={other} lang={other} className="sch-lang">
            <span aria-hidden="true">{other.toUpperCase()}</span> {tr(UI.switchLang, lang)}
          </Link>
        </div>
      </div>
    </nav>
  );
}
