import type { Tone } from '../_lib/content';
import { SCHOOL } from '../_lib/content';

export function waLink(text: string, number = SCHOOL.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Brand mark, same geometry as the Webbify logo. Swap for the school crest per client. */
export function Crest({ className = 'sch-crest' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 64" aria-hidden="true">
      <polygon points="2,2 58,2 30,60" fill="var(--turq)" />
      <polygon points="42,2 98,2 70,60" fill="var(--sand)" opacity="0.92" />
      <polygon points="40,2 60,2 50,23" fill="var(--indigo)" />
    </svg>
  );
}

/**
 * Image slot. Renders the photo when `src` is set, otherwise a branded
 * placeholder built from the triangle motif (brand guideline §5).
 */
export function Photo({ tone = 'indigo', src, alt, ratio = '4 / 3' }: { tone?: Tone; src?: string; alt: string; ratio?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="sch-photo" src={src} alt={alt} style={{ aspectRatio: ratio }} loading="lazy" />;
  }
  return (
    <div className={`sch-photo sch-ph sch-ph-${tone}`} style={{ aspectRatio: ratio }} role="img" aria-label={alt}>
      <svg viewBox="0 0 120 80" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <polygon points="10,8 46,8 28,40" fill="#fff" opacity="0.28" />
        <polygon points="70,30 112,30 91,70" fill="#fff" opacity="0.18" />
        <polygon points="52,52 64,52 58,63" fill="#fff" opacity="0.4" />
      </svg>
    </div>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="sch-pagehero">
      <div className="sch-wrap">
        <p className="sch-eyebrow">{eyebrow}</p>
        <h1 className="sch-h1">{title}</h1>
        {lead && <p className="sch-lead">{lead}</p>}
      </div>
    </header>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="sch-sechead">
      <div>
        {eyebrow && <p className="sch-eyebrow">{eyebrow}</p>}
        <h2 className="sch-h2">{title}</h2>
      </div>
      {action}
    </div>
  );
}
