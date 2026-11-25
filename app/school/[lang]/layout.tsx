import { notFound } from 'next/navigation';
import { SchoolFooter } from '../_components/footer';
import { SchoolNav } from '../_components/nav';
import { SCHOOL } from '../_lib/content';
import { isLang, LOCALES, tr, UI } from '../_lib/i18n';
import '../school.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function SchoolLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  // TODO: the root layout hard-codes <html lang="en">. When this template becomes a
  // client's whole site, move it to its own root layout so <html lang> follows the locale.
  return (
    <div className="sch" lang={lang}>
      <a href="#main" className="sch-skip">
        {tr(UI.skip, lang)}
      </a>
      <SchoolNav lang={lang} shortName={SCHOOL.shortName} />
      <main id="main">{children}</main>
      <SchoolFooter lang={lang} />
    </div>
  );
}
