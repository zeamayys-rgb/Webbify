'use client';

import { useEffect, useRef, useState } from 'react';
import { Photo } from '../../_components/ui';
import type { Tone } from '../../_lib/content';

type Item = { caption: string; category: string; tone: Tone; src?: string };

export function GalleryGrid({
  items,
  cats,
  allLabel,
  closeLabel
}: {
  items: Item[];
  cats: { key: string; label: string }[];
  allLabel: string;
  closeLabel: string;
}) {
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<Item | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = cat ? items.filter((i) => i.category === cat) : items;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <div className="sch-filter" role="group" aria-label="Filter">
        <button aria-pressed={cat === null} onClick={() => setCat(null)}>
          {allLabel}
        </button>
        {cats.map((c) => (
          <button key={c.key} aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <ul className="sch-gallery">
        {shown.map((g, i) => (
          <li key={g.caption + i}>
            <button className="sch-gallery-btn" onClick={() => setOpen(g)}>
              <Photo tone={g.tone} src={g.src} alt={g.caption} />
              <span>{g.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="sch-lightbox" onClose={() => setOpen(null)} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {open && (
          <figure>
            <Photo tone={open.tone} src={open.src} alt={open.caption} ratio="3 / 2" />
            <figcaption>{open.caption}</figcaption>
            <button className="sch-btn sch-btn-ghost" onClick={() => setOpen(null)} autoFocus>
              {closeLabel}
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
