import { redirect } from 'next/navigation';
import { DEFAULT_LANG, href } from './_lib/i18n';

/** /school → /school/id (Indonesian is the default). */
export default function SchoolIndex() {
  redirect(href(DEFAULT_LANG));
}
