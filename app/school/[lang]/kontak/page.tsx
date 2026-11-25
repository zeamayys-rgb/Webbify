import { PageHero } from '../../_components/ui';
import { SCHOOL } from '../../_lib/content';
import { tr, UI } from '../../_lib/i18n';
import { langOf, pageMeta } from '../../_lib/meta';
import { ContactForm } from './contact-form';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  return pageMeta(lang, '/kontak', tr(UI.nav.kontak, lang), tr(SCHOOL.address, lang));
}

export default async function Kontak({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langOf(params);
  const k = UI.kontak;
  const topics = Object.values(k.topics).map((t) => tr(t, lang));

  return (
    <>
      <PageHero eyebrow={tr(UI.nav.kontak, lang)} title={tr(k.lead, lang)} />
      <section className="sch-section sch-section-tight">
        <div className="sch-wrap sch-split sch-split-top">
          <div>
            <dl className="sch-contact">
              <dt>{tr(k.address, lang)}</dt>
              <dd>{tr(SCHOOL.address, lang)}</dd>
              <dt>{tr(k.phone, lang)}</dt>
              <dd>
                <a href={`tel:${SCHOOL.phone.replace(/[^\d+]/g, '')}`}>{SCHOOL.phone}</a>
              </dd>
              <dt>WhatsApp</dt>
              <dd>
                <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  +{SCHOOL.whatsapp}
                </a>
              </dd>
              <dt>{tr(k.email, lang)}</dt>
              <dd>
                <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
              </dd>
              <dt>{tr(k.hours, lang)}</dt>
              <dd>{tr(SCHOOL.hours, lang)}</dd>
            </dl>
            <iframe
              className="sch-map"
              title={tr(k.map, lang)}
              src={`https://www.google.com/maps?q=${encodeURIComponent(SCHOOL.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="sch-card">
            <h2 className="sch-h3">{tr(k.formTitle, lang)}</h2>
            <p className="sch-note">{tr(k.formNote, lang)}</p>
            <ContactForm
              lang={lang}
              number={SCHOOL.whatsapp}
              topics={topics}
              labels={{ name: tr(k.name, lang), topic: tr(k.topic, lang), message: tr(k.message, lang), send: tr(k.send, lang) }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
