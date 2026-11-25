import Link from 'next/link';
import { SCHOOL } from '../_lib/content';
import { href, tr, UI, type Lang } from '../_lib/i18n';
import { Crest } from './ui';

export function SchoolFooter({ lang }: { lang: Lang }) {
  const links = [
    ['/profil', UI.nav.profil],
    ['/berita', UI.nav.berita],
    ['/ppdb', UI.nav.ppdb],
    ['/galeri', UI.nav.galeri],
    ['/kontak', UI.nav.kontak]
  ] as const;
  return (
    <footer className="sch-footer">
      <div className="sch-wrap sch-footer-grid">
        <div>
          <div className="sch-brand sch-brand-footer">
            <Crest />
            <span>{SCHOOL.shortName}</span>
          </div>
          <p>{tr(SCHOOL.name, lang)}</p>
          <p className="sch-muted-on-dark">{tr(SCHOOL.foundation, lang)}</p>
          <p className="sch-muted-on-dark">NPSN {SCHOOL.npsn} · {tr(SCHOOL.accreditation, lang)}</p>
        </div>
        <div>
          <h2 className="sch-footer-h">{tr(UI.footer.quick, lang)}</h2>
          <ul>
            {links.map(([p, label]) => (
              <li key={p}>
                <Link href={href(lang, p)}>{tr(label, lang)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="sch-footer-h">{tr(UI.footer.contact, lang)}</h2>
          <address>
            {tr(SCHOOL.address, lang)}
            <br />
            <a href={`tel:${SCHOOL.phone.replace(/[^\d+]/g, '')}`}>{SCHOOL.phone}</a>
            <br />
            <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
          </address>
          <ul className="sch-social">
            {SCHOOL.social.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sch-wrap sch-footer-base">
        <span>
          © {new Date().getFullYear()} {tr(SCHOOL.foundation, lang)}
        </span>
        <span>
          {tr(UI.footer.madeBy, lang)}{' '}
          <a href="https://webbify.id" target="_blank" rel="noopener noreferrer">
            Webbify
          </a>
        </span>
      </div>
    </footer>
  );
}
