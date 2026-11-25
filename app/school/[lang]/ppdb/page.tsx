import { PageHero, SectionHead, waLink } from '../../_components/ui';
import { PPDB, SCHOOL } from '../../_lib/content';
import { formatRupiah, tr, UI } from '../../_lib/i18n';
import { langOf, pageMeta } from '../../_lib/meta';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '/ppdb', `PPDB ${PPDB.year}`, `${tr(UI.ppdb.lead, lang)} ${PPDB.year} · ${tr(SCHOOL.name, lang)}`);
}

const STATUS = { open: UI.ppdb.open, upcoming: UI.ppdb.upcoming, closed: UI.ppdb.closed };

export default async function Ppdb({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  const wa = waLink(
    lang === 'id'
      ? `Halo, saya ingin mendaftarkan anak saya untuk PPDB ${PPDB.year}. Nama anak: … Jenjang: …`
      : `Hello, I'd like to apply for ${PPDB.year}. Child's name: … Level: …`
  );

  return (
    <>
      <PageHero eyebrow={`PPDB ${PPDB.year}`} title={tr(UI.ppdb.lead, lang)} lead={tr(SCHOOL.levels, lang)} />

      <section className="sch-section sch-section-tight">
        <div className="sch-wrap">
          <SectionHead title={tr(UI.ppdb.waves, lang)} />
          <div className="sch-grid-3">
            {PPDB.waves.map((w) => (
              <div key={w.name.en} className={`sch-wave is-${w.status}`}>
                <span className="sch-chip">{tr(STATUS[w.status], lang)}</span>
                <h3>{tr(w.name, lang)}</h3>
                <p>{tr(w.dates, lang)}</p>
                <p className="sch-wave-quota">
                  {tr(UI.ppdb.quota, lang)}: <strong>{w.quota}</strong> {tr(UI.ppdb.seats, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sch-section sch-tint">
        <div className="sch-wrap">
          <SectionHead title={tr(UI.ppdb.steps, lang)} />
          <ol className="sch-steps">
            {PPDB.steps.map((s, i) => (
              <li key={s.title.en}>
                <span className="sch-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{tr(s.title, lang)}</h3>
                <p>{tr(s.body, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sch-section">
        <div className="sch-wrap sch-split sch-split-top">
          <div>
            <SectionHead title={tr(UI.ppdb.reqs, lang)} />
            <ul className="sch-checks">
              {PPDB.requirements.map((r) => (
                <li key={r.en}>{tr(r, lang)}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead title={tr(UI.ppdb.fees, lang)} />
            <table className="sch-table">
              <thead>
                <tr>
                  <th scope="col">{tr(UI.ppdb.item, lang)}</th>
                  <th scope="col">{tr(UI.ppdb.amount, lang)}</th>
                </tr>
              </thead>
              <tbody>
                {PPDB.fees.map((f) => (
                  <tr key={f.item.en}>
                    <td>{tr(f.item, lang)}</td>
                    <td>{formatRupiah(f.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sch-note">{tr(UI.ppdb.feeNote, lang)}</p>
          </div>
        </div>
      </section>

      <section className="sch-section sch-tint">
        <div className="sch-wrap sch-narrow">
          <SectionHead title={tr(UI.ppdb.faq, lang)} />
          <div className="sch-faq">
            {PPDB.faq.map((f) => (
              <details key={f.q.en}>
                <summary>{tr(f.q, lang)}</summary>
                <p>{tr(f.a, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sch-section">
        <div className="sch-wrap">
          <div className="sch-cta">
            <h2 className="sch-h2">{tr(PPDB.open ? UI.home.ppdbTitle : UI.home.ppdbClosed, lang)}</h2>
            <div className="sch-actions">
              {PPDB.formUrl && (
                <a href={PPDB.formUrl} className="sch-btn sch-btn-light" target="_blank" rel="noopener noreferrer">
                  {tr(UI.ppdb.applyOnline, lang)}
                </a>
              )}
              <a href={wa} className={`sch-btn ${PPDB.formUrl ? 'sch-btn-outline-light' : 'sch-btn-light'}`} target="_blank" rel="noopener noreferrer">
                {tr(UI.ppdb.askFirst, lang)}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
