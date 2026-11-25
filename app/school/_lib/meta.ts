import type { Metadata } from 'next';
import { SCHOOL } from './content';
import { href, LOCALES, tr, type Lang } from './i18n';

/** Per-page metadata with hreflang alternates for both languages. */
export function pageMeta(lang: Lang, path: string, title: string, description: string): Metadata {
  return {
    title: `${title} · ${tr(SCHOOL.name, lang)}`,
    description,
    alternates: {
      canonical: href(lang, path),
      languages: Object.fromEntries(LOCALES.map((l) => [l === 'id' ? 'id-ID' : 'en', href(l, path)]))
    },
    openGraph: { title, description, locale: lang === 'id' ? 'id_ID' : 'en_US', type: 'website' }
  };
}

/** Next 16 passes params as a Promise; every page resolves lang the same way. */
export async function langOf(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return lang as Lang; // validated in [lang]/layout.tsx (dynamicParams = false)
}
