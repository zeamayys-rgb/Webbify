import { PageHero } from '../../_components/ui';
import { GALLERY, GALLERY_CATEGORIES } from '../../_lib/content';
import { tr, UI } from '../../_lib/i18n';
import { langOf, pageMeta } from '../../_lib/meta';
import { GalleryGrid } from './gallery-grid';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '/galeri', tr(UI.nav.galeri, lang), tr(UI.galeri.lead, lang));
}

export default async function Galeri({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  // Resolve strings on the server so the client component only gets plain data.
  const items = GALLERY.map((g) => ({ caption: tr(g.caption, lang), category: g.category, tone: g.tone, src: g.src }));
  const cats = Object.entries(GALLERY_CATEGORIES).map(([key, label]) => ({ key, label: tr(label, lang) }));
  return (
    <>
      <PageHero eyebrow={tr(UI.nav.galeri, lang)} title={tr(UI.home.gallery, lang)} lead={tr(UI.galeri.lead, lang)} />
      <section className="sch-section sch-section-tight">
        <div className="sch-wrap">
          <GalleryGrid items={items} cats={cats} allLabel={tr(UI.galeri.all, lang)} closeLabel={tr(UI.close, lang)} />
        </div>
      </section>
    </>
  );
}
