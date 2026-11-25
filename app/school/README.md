# School / foundation template

A reusable, bilingual (ID/EN) website template for Indonesian schools and foundations, in Webbify brand tokens. It is the starting point for a client prototype in the **Prototype** step: swap the content file, re-skin the tokens, show the client.

Live at `/school` (redirects to `/school/id`).

| Page | Route | Notes |
|---|---|---|
| Beranda / Home | `/school/{lang}` | Hero, stats, principal's welcome, programs, latest news, gallery teaser, PPDB call to action |
| Profil / About | `/school/{lang}/profil` | History, vision & mission, values, leadership, facilities, accreditation |
| Berita / News | `/school/{lang}/berita`, `/berita/[slug]` | Featured post + grid, static article pages |
| PPDB / Admissions | `/school/{lang}/ppdb` | Admission waves with status, steps, requirements, fee table, FAQ, WhatsApp / form CTA |
| Galeri / Gallery | `/school/{lang}/galeri` | Category filter, native `<dialog>` lightbox |
| Kontak / Contact | `/school/{lang}/kontak` | Contact details, map embed, form that opens a prefilled WhatsApp chat |

## Making a client prototype

1. **Content:** edit `_lib/content.ts`. Every string is `{ id, en }`. Set `SCHOOL.whatsapp` to the school's number (it points at Webbify for the demo).
2. **Photos:** put files in `public/schools/<client>/` and set `src` on gallery items. Anything without `src` shows a branded triangle placeholder.
3. **Colours:** override tokens on `.sch` in `school.css` (e.g. `--indigo` → the school's primary). Keep contrast ≥ 4.5:1 for text.
4. **Crest:** replace `Crest` in `_components/ui.tsx` with the school's logo.
5. **PPDB:** set `PPDB.formUrl` to a Google Form / registration system, or leave it empty for WhatsApp only. Flip wave `status` as dates pass.

## Structure

```
app/school/
├── page.tsx              /school → /school/id
├── school.css            all styles, scoped under .sch
├── _lib/
│   ├── content.ts        ← the one file to edit per client
│   ├── i18n.ts           locales, UI strings, href/format helpers
│   └── meta.ts           per-page metadata + hreflang alternates
├── _components/          nav (client), footer, ui (Photo, PageHero, waLink…)
└── [lang]/               id | en, statically generated
    ├── page.tsx  profil/  berita/  berita/[slug]/  ppdb/  galeri/  kontak/
```

All pages are static (SSG); nothing needs a server, so a client build can also be exported for Hostinger with `output: 'export'`.

## Known gaps (TODO)

- The root layout sets `<html lang="en">`; the template sets `lang` on its wrapper. A client deployment should get its own root layout so `<html lang>` follows the locale.
- Route slugs stay Indonesian in both languages (`/en/profil`, not `/en/about`).
- No CMS yet: news and gallery live in `content.ts`. Professional/Platform tiers would move them to a headless CMS.
- News has no category filter or pagination yet.
