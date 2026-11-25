/**
 * Bilingual (ID/EN) helpers for the school template.
 * Indonesian is the default locale: most parents read the site in Bahasa Indonesia.
 */

export const LOCALES = ['id', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'id';

/** A string that exists in both languages. */
export type T = Record<Lang, string>;

export function isLang(x: string): x is Lang {
  return (LOCALES as readonly string[]).includes(x);
}

export function tr(x: T, lang: Lang): string {
  return x[lang];
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', { dateStyle: 'long' }).format(new Date(iso));
}

export function formatRupiah(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}

/** Base path of the template. Change it if the template is mounted at the site root for a client. */
export const BASE = '/school';

export function href(lang: Lang, path = ''): string {
  return `${BASE}/${lang}${path}`;
}

/** UI strings. Content (news, programs, etc.) lives in content.ts. */
export const UI = {
  nav: {
    home: { id: 'Beranda', en: 'Home' },
    profil: { id: 'Profil', en: 'About' },
    berita: { id: 'Berita', en: 'News' },
    ppdb: { id: 'PPDB', en: 'Admissions' },
    galeri: { id: 'Galeri', en: 'Gallery' },
    kontak: { id: 'Kontak', en: 'Contact' }
  },
  skip: { id: 'Lompat ke konten', en: 'Skip to content' },
  menu: { id: 'Menu', en: 'Menu' },
  close: { id: 'Tutup', en: 'Close' },
  switchLang: { id: 'English', en: 'Bahasa Indonesia' },
  registerNow: { id: 'Daftar Sekarang', en: 'Apply Now' },
  learnMore: { id: 'Kenali Kami', en: 'About Us' },
  readMore: { id: 'Baca selengkapnya', en: 'Read more' },
  allNews: { id: 'Semua berita', en: 'All news' },
  viewGallery: { id: 'Lihat galeri', en: 'View gallery' },
  backToNews: { id: '← Kembali ke berita', en: '← Back to news' },
  chatWa: { id: 'Chat via WhatsApp', en: 'Chat on WhatsApp' },
  home: {
    welcome: { id: 'Sambutan Kepala Sekolah', en: "Principal's Welcome" },
    programs: { id: 'Program Unggulan', en: 'Signature Programs' },
    news: { id: 'Kabar Terbaru', en: 'Latest News' },
    gallery: { id: 'Sekilas Kegiatan', en: 'Life at School' },
    ppdbTitle: { id: 'PPDB sudah dibuka', en: 'Admissions are open' },
    ppdbClosed: { id: 'Informasi PPDB', en: 'Admissions information' }
  },
  profil: {
    history: { id: 'Sejarah Singkat', en: 'Our Story' },
    vision: { id: 'Visi', en: 'Vision' },
    mission: { id: 'Misi', en: 'Mission' },
    values: { id: 'Nilai-Nilai Kami', en: 'Our Values' },
    leaders: { id: 'Pimpinan', en: 'Leadership' },
    facilities: { id: 'Fasilitas', en: 'Facilities' },
    accreditation: { id: 'Akreditasi & Legalitas', en: 'Accreditation & Legal' }
  },
  berita: {
    lead: { id: 'Kabar kegiatan, prestasi, dan pengumuman sekolah.', en: 'Activities, achievements, and school announcements.' },
    all: { id: 'Semua', en: 'All' }
  },
  ppdb: {
    lead: { id: 'Penerimaan Peserta Didik Baru', en: 'New Student Admissions' },
    waves: { id: 'Jadwal Gelombang', en: 'Admission Waves' },
    quota: { id: 'Kuota', en: 'Seats' },
    seats: { id: 'kursi', en: 'seats' },
    steps: { id: 'Alur Pendaftaran', en: 'How to Apply' },
    reqs: { id: 'Persyaratan', en: 'Requirements' },
    fees: { id: 'Rincian Biaya', en: 'Fees' },
    item: { id: 'Komponen', en: 'Item' },
    amount: { id: 'Biaya', en: 'Amount' },
    feeNote: {
      id: 'Biaya dapat berubah. Tersedia keringanan dan beasiswa untuk keluarga yang membutuhkan.',
      en: 'Fees may change. Fee relief and scholarships are available for families in need.'
    },
    faq: { id: 'Pertanyaan Umum', en: 'FAQ' },
    applyOnline: { id: 'Isi Formulir Online', en: 'Fill in the Online Form' },
    askFirst: { id: 'Tanya Dulu via WhatsApp', en: 'Ask Us on WhatsApp' },
    open: { id: 'Dibuka', en: 'Open' },
    upcoming: { id: 'Segera', en: 'Upcoming' },
    closed: { id: 'Ditutup', en: 'Closed' }
  },
  galeri: {
    lead: { id: 'Momen belajar, berkarya, dan bertumbuh bersama.', en: 'Moments of learning, making, and growing together.' },
    all: { id: 'Semua', en: 'All' }
  },
  kontak: {
    lead: { id: 'Kami senang mendengar dari Anda.', en: "We'd love to hear from you." },
    address: { id: 'Alamat', en: 'Address' },
    phone: { id: 'Telepon', en: 'Phone' },
    email: { id: 'Email', en: 'Email' },
    hours: { id: 'Jam Layanan', en: 'Office Hours' },
    formTitle: { id: 'Kirim Pesan', en: 'Send a Message' },
    formNote: {
      id: 'Pesan akan dibuka di WhatsApp agar langsung dibalas oleh tim kami.',
      en: 'Your message opens in WhatsApp so our team can reply right away.'
    },
    name: { id: 'Nama', en: 'Name' },
    topic: { id: 'Keperluan', en: 'Topic' },
    message: { id: 'Pesan', en: 'Message' },
    send: { id: 'Kirim via WhatsApp', en: 'Send via WhatsApp' },
    topics: {
      ppdb: { id: 'Informasi PPDB', en: 'Admissions' },
      visit: { id: 'Jadwal kunjungan sekolah', en: 'Book a school visit' },
      general: { id: 'Pertanyaan umum', en: 'General question' }
    },
    map: { id: 'Peta lokasi sekolah', en: 'School location map' }
  },
  footer: {
    quick: { id: 'Tautan', en: 'Links' },
    contact: { id: 'Kontak', en: 'Contact' },
    madeBy: { id: 'Dibuat oleh', en: 'Built by' }
  }
} satisfies Record<string, unknown>;
