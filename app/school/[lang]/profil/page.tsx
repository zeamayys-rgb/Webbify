import { PageHero, Photo, SectionHead } from '../../_components/ui';
import { PRINCIPAL, PROFILE, SCHOOL } from '../../_lib/content';
import { tr, UI } from '../../_lib/i18n';
import { langOf, pageMeta } from '../../_lib/meta';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '/profil', tr(UI.nav.profil, lang), tr(PROFILE.vision, lang));
}

export default async function Profil({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return (
    <>
      <PageHero eyebrow={tr(UI.nav.profil, lang)} title={tr(SCHOOL.name, lang)} lead={tr(SCHOOL.foundation, lang)} />

      <section className="sch-section">
        <div className="sch-wrap sch-split">
          <div>
            <SectionHead eyebrow={`${lang === 'id' ? 'Sejak' : 'Since'} ${SCHOOL.founded}`} title={tr(UI.profil.history, lang)} />
            <p className="sch-prose">{tr(PROFILE.history, lang)}</p>
          </div>
          <Photo tone="turq" alt={tr(UI.profil.history, lang)} />
        </div>
      </section>

      <section className="sch-section sch-tint">
        <div className="sch-wrap sch-vm">
          <div className="sch-card sch-card-indigo">
            <h2 className="sch-h3">{tr(UI.profil.vision, lang)}</h2>
            <p className="sch-vision">{tr(PROFILE.vision, lang)}</p>
          </div>
          <div className="sch-card">
            <h2 className="sch-h3">{tr(UI.profil.mission, lang)}</h2>
            <ol className="sch-list-num">
              {PROFILE.mission.map((m) => (
                <li key={m.en}>{tr(m, lang)}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sch-section">
        <div className="sch-wrap">
          <SectionHead title={tr(UI.profil.values, lang)} />
          <div className="sch-grid-3">
            {PROFILE.values.map((v, i) => (
              <div key={v.title.en} className={`sch-card sch-card-${(['indigo', 'turq', 'sand'] as const)[i % 3]}`}>
                <span className="sch-tri" aria-hidden="true" />
                <h3>{tr(v.title, lang)}</h3>
                <p>{tr(v.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sch-section sch-tint">
        <div className="sch-wrap">
          <SectionHead title={tr(UI.profil.leaders, lang)} />
          <ul className="sch-people">
            {PROFILE.leaders.map((p, i) => (
              <li key={p.name}>
                <Photo tone={(['indigo', 'turq', 'sand'] as const)[i % 3]} alt={p.name} ratio="1 / 1" />
                <strong>{p.name}</strong>
                <span>{tr(p.role, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sch-section">
        <div className="sch-wrap sch-split sch-split-top">
          <div>
            <SectionHead title={tr(UI.profil.facilities, lang)} />
            <ul className="sch-checks">
              {PROFILE.facilities.map((f) => (
                <li key={f.en}>{tr(f, lang)}</li>
              ))}
            </ul>
          </div>
          <div className="sch-card">
            <h2 className="sch-h3">{tr(UI.profil.accreditation, lang)}</h2>
            <dl className="sch-dl">
              <dt>{lang === 'id' ? 'Akreditasi' : 'Accreditation'}</dt>
              <dd>{tr(SCHOOL.accreditation, lang)}</dd>
              <dt>NPSN</dt>
              <dd>{SCHOOL.npsn}</dd>
              <dt>{lang === 'id' ? 'Penyelenggara' : 'Operated by'}</dt>
              <dd>{tr(SCHOOL.foundation, lang)}</dd>
              <dt>{lang === 'id' ? 'Kepala Sekolah' : 'Principal'}</dt>
              <dd>{PRINCIPAL.name}</dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
