/**
 * SCHOOL CONTENT — the one file to edit per client.
 *
 * Everything below is SAMPLE content for a fictional school. Replace it with the
 * client's real data (from the Diagnose step) before showing a prototype.
 * Every user-facing string is bilingual: { id: '…', en: '…' }.
 *
 * TODO(abe): later this file can be swapped for a headless CMS (Professional/Platform tiers).
 */
import type { T } from './i18n';

export type Tone = 'indigo' | 'turq' | 'sand';

export const SCHOOL = {
  shortName: 'SIT Nusantara',
  name: { id: 'Sekolah Islam Terpadu Nusantara Cendekia', en: 'Nusantara Cendekia Integrated Islamic School' } as T,
  foundation: { id: 'Yayasan Pendidikan Nusantara Cendekia', en: 'Nusantara Cendekia Education Foundation' } as T,
  levels: { id: 'TK · SD · SMP', en: 'Kindergarten · Primary · Junior High' } as T,
  tagline: {
    id: 'Tumbuh berilmu, berakhlak, dan berdaya.',
    en: 'Growing in knowledge, character, and confidence.'
  } as T,
  heroLead: {
    id: 'Lingkungan belajar yang hangat dan aman, tempat setiap anak dikenal namanya, didampingi bakatnya, dan disiapkan untuk masa depannya.',
    en: 'A warm, safe place to learn, where every child is known by name, supported in their strengths, and prepared for their future.'
  } as T,
  founded: 2009,
  accreditation: { id: 'Terakreditasi A (BAN-S/M)', en: 'Accredited A (BAN-S/M)' } as T,
  npsn: '20200000', // TODO: real NPSN
  // Demo inquiries go to Webbify. TODO: replace with the school's own WhatsApp number per client.
  whatsapp: '6281264404887',
  phone: '(021) 000-0000',
  email: 'info@sekolah-contoh.sch.id',
  address: {
    id: 'Jl. Pendidikan No. 1, Kel. Contoh, Kec. Contoh, Kota Depok, Jawa Barat 16400',
    en: 'Jl. Pendidikan No. 1, Contoh, Depok, West Java 16400, Indonesia'
  } as T,
  mapQuery: 'Depok, Jawa Barat',
  hours: { id: 'Senin–Jumat, 07.00–15.00 WIB', en: 'Monday–Friday, 07:00–15:00 WIB' } as T,
  social: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'YouTube', url: 'https://youtube.com/' },
    { label: 'Facebook', url: 'https://facebook.com/' }
  ]
};

export const STATS: { value: string; label: T }[] = [
  { value: '15+', label: { id: 'Tahun berdiri', en: 'Years of teaching' } },
  { value: '640', label: { id: 'Siswa aktif', en: 'Students' } },
  { value: '48', label: { id: 'Guru & staf', en: 'Teachers & staff' } },
  { value: '1:16', label: { id: 'Rasio guru:siswa', en: 'Teacher:student ratio' } }
];

export const PRINCIPAL = {
  name: 'Ibu Siti Rahmawati, S.Pd., M.Pd.',
  role: { id: 'Kepala Sekolah', en: 'Principal' } as T,
  message: {
    id: 'Assalamu’alaikum warahmatullahi wabarakatuh. Selamat datang di rumah kedua bagi anak-anak kita. Kami percaya pendidikan terbaik lahir dari kerja sama hangat antara sekolah dan keluarga. Mari tumbuh bersama.',
    en: 'Assalamu’alaikum. Welcome to a second home for our children. We believe the best education grows from a warm partnership between school and family. Let us grow together.'
  } as T
};

export const PROGRAMS: { title: T; body: T; tone: Tone }[] = [
  {
    title: { id: 'Tahfidz & Adab', en: 'Qur’an & Character' },
    body: {
      id: 'Hafalan terukur dengan pendampingan personal, dibarengi pembiasaan adab sehari-hari.',
      en: 'Measured memorisation with personal mentoring, alongside daily character habits.'
    },
    tone: 'indigo'
  },
  {
    title: { id: 'Bilingual Class', en: 'Bilingual Class' },
    body: {
      id: 'Bahasa Inggris dan Arab dipakai dalam kegiatan harian, bukan hanya di kelas bahasa.',
      en: 'English and Arabic used in daily activities, not only in language lessons.'
    },
    tone: 'turq'
  },
  {
    title: { id: 'Sains & Proyek', en: 'Science & Projects' },
    body: {
      id: 'Belajar lewat proyek nyata: kebun sekolah, robotik dasar, dan pameran karya tiap semester.',
      en: 'Learning through real projects: a school garden, basic robotics, and a showcase every term.'
    },
    tone: 'sand'
  }
];

export const PROFILE = {
  history: {
    id: 'Berawal dari kelompok belajar kecil di rumah salah satu pendiri pada 2009, Nusantara Cendekia kini menaungi jenjang TK hingga SMP. Sejak awal, kami memegang satu prinsip: setiap anak berhak dikenal dan didampingi secara utuh.',
    en: 'What began in 2009 as a small study group in a founder’s home now spans kindergarten to junior high. From day one we have held one principle: every child deserves to be known and supported as a whole person.'
  } as T,
  vision: {
    id: 'Menjadi sekolah yang melahirkan generasi berilmu, berakhlak mulia, dan bermanfaat bagi sesama.',
    en: 'To raise a generation that is knowledgeable, of noble character, and of benefit to others.'
  } as T,
  mission: [
    { id: 'Menyelenggarakan pembelajaran aktif yang berpusat pada siswa.', en: 'Deliver active, student-centred learning.' },
    { id: 'Menanamkan akhlak dan ibadah melalui keteladanan.', en: 'Instil character and worship through example.' },
    { id: 'Mengembangkan bakat siswa lewat program ekstrakurikuler yang beragam.', en: 'Develop each student’s talents through diverse extracurriculars.' },
    { id: 'Membangun kemitraan erat dengan orang tua dan masyarakat.', en: 'Build close partnerships with parents and the community.' }
  ] as T[],
  values: [
    { title: { id: 'Amanah', en: 'Trust' }, body: { id: 'Jujur dan bertanggung jawab.', en: 'Honest and responsible.' } },
    { title: { id: 'Peduli', en: 'Care' }, body: { id: 'Hadir untuk sesama.', en: 'Present for one another.' } },
    { title: { id: 'Tekun', en: 'Grit' }, body: { id: 'Belajar tanpa berhenti.', en: 'Never stop learning.' } }
  ] as { title: T; body: T }[],
  leaders: [
    { name: 'H. Ahmad Fauzi, Lc.', role: { id: 'Ketua Yayasan', en: 'Foundation Chair' } },
    { name: 'Ibu Siti Rahmawati, M.Pd.', role: { id: 'Kepala Sekolah', en: 'Principal' } },
    { name: 'Bapak Rizky Pratama, S.Pd.', role: { id: 'Wakasek Kurikulum', en: 'Vice Principal, Curriculum' } },
    { name: 'Ibu Dewi Lestari, S.Psi.', role: { id: 'Koordinator BK', en: 'Counselling Lead' } }
  ] as { name: string; role: T }[],
  facilities: [
    { id: 'Ruang kelas ber-AC', en: 'Air-conditioned classrooms' },
    { id: 'Masjid sekolah', en: 'School mosque' },
    { id: 'Perpustakaan', en: 'Library' },
    { id: 'Laboratorium sains', en: 'Science lab' },
    { id: 'Lapangan olahraga', en: 'Sports field' },
    { id: 'Kebun sekolah', en: 'School garden' },
    { id: 'UKS', en: 'Clinic' },
    { id: 'Kantin sehat', en: 'Healthy canteen' }
  ] as T[]
};

export type NewsCategory = 'kegiatan' | 'prestasi' | 'pengumuman';
export const NEWS_CATEGORIES: Record<NewsCategory, T> = {
  kegiatan: { id: 'Kegiatan', en: 'Activities' },
  prestasi: { id: 'Prestasi', en: 'Achievements' },
  pengumuman: { id: 'Pengumuman', en: 'Announcements' }
};

export type NewsItem = {
  slug: string;
  date: string; // ISO
  category: NewsCategory;
  tone: Tone;
  title: T;
  excerpt: T;
  body: T[];
};

export const NEWS: NewsItem[] = [
  {
    slug: 'ppdb-2027-2028-dibuka',
    date: '2026-11-10',
    category: 'pengumuman',
    tone: 'indigo',
    title: { id: 'PPDB Tahun Ajaran 2027/2028 Resmi Dibuka', en: 'Admissions for 2027/2028 Are Now Open' },
    excerpt: {
      id: 'Gelombang 1 dibuka hingga 31 Desember dengan potongan biaya pangkal 20%.',
      en: 'Wave 1 runs until 31 December with a 20% discount on the enrolment fee.'
    },
    body: [
      {
        id: 'Penerimaan Peserta Didik Baru untuk jenjang TK, SD, dan SMP tahun ajaran 2027/2028 resmi dibuka. Pendaftaran dapat dilakukan secara online maupun datang langsung ke sekolah.',
        en: 'New student admissions for kindergarten, primary, and junior high for 2027/2028 are now open. You can apply online or in person at the school.'
      },
      {
        id: 'Orang tua dipersilakan menjadwalkan kunjungan sekolah untuk melihat langsung suasana belajar sebelum mendaftar.',
        en: 'Parents are welcome to book a school visit to see our classrooms before applying.'
      }
    ]
  },
  {
    slug: 'juara-olimpiade-sains-kota',
    date: '2026-10-28',
    category: 'prestasi',
    tone: 'sand',
    title: { id: 'Siswa Kelas 5 Raih Juara 1 Olimpiade Sains Kota', en: 'Grade 5 Student Wins City Science Olympiad' },
    excerpt: {
      id: 'Persiapan tiga bulan di klub sains berbuah medali emas tingkat kota.',
      en: 'Three months of science-club preparation earned a city-level gold medal.'
    },
    body: [
      {
        id: 'Alhamdulillah, ananda Raka dari kelas 5B meraih juara 1 Olimpiade Sains tingkat kota. Prestasi ini hasil latihan rutin bersama klub sains sekolah.',
        en: 'Raka from class 5B took first place at the city Science Olympiad, the result of regular practice with the school science club.'
      }
    ]
  },
  {
    slug: 'market-day-kewirausahaan',
    date: '2026-10-12',
    category: 'kegiatan',
    tone: 'turq',
    title: { id: 'Market Day: Belajar Wirausaha Sejak Dini', en: 'Market Day: Learning Entrepreneurship Early' },
    excerpt: {
      id: 'Siswa merancang produk, menghitung modal, dan berjualan di bazar sekolah.',
      en: 'Students designed products, costed them, and sold them at the school bazaar.'
    },
    body: [
      {
        id: 'Market Day mengajak siswa merancang produk sendiri, dari menghitung modal hingga melayani pembeli. Seluruh keuntungan disalurkan untuk program berbagi.',
        en: 'Market Day asked students to create their own products, from costing to serving customers. All profits went to our giving programme.'
      }
    ]
  },
  {
    slug: 'kunjungan-perpustakaan-daerah',
    date: '2026-09-20',
    category: 'kegiatan',
    tone: 'indigo',
    title: { id: 'Kunjungan ke Perpustakaan Daerah', en: 'A Visit to the Regional Library' },
    excerpt: {
      id: 'Siswa kelas 3 belajar mencari buku dan membuat kartu anggota sendiri.',
      en: 'Grade 3 students learned to find books and got their own library cards.'
    },
    body: [
      {
        id: 'Kegiatan literasi bulan ini membawa siswa kelas 3 ke perpustakaan daerah. Mereka belajar sistem katalog dan membuat kartu anggota sendiri.',
        en: 'This month’s literacy outing took grade 3 to the regional library, where they learned the catalogue system and signed up for library cards.'
      }
    ]
  }
];

export type GalleryCategory = 'kegiatan' | 'prestasi' | 'fasilitas';
export const GALLERY_CATEGORIES: Record<GalleryCategory, T> = {
  kegiatan: { id: 'Kegiatan', en: 'Activities' },
  prestasi: { id: 'Prestasi', en: 'Achievements' },
  fasilitas: { id: 'Fasilitas', en: 'Facilities' }
};

/** `src` is optional: without it a branded placeholder renders. TODO: client photos (webp, ≤ 300 KB each). */
export const GALLERY: { caption: T; category: GalleryCategory; tone: Tone; src?: string }[] = [
  { caption: { id: 'Upacara hari Senin', en: 'Monday assembly' }, category: 'kegiatan', tone: 'indigo' },
  { caption: { id: 'Kebun sekolah', en: 'School garden' }, category: 'fasilitas', tone: 'turq' },
  { caption: { id: 'Juara olimpiade sains', en: 'Science olympiad winners' }, category: 'prestasi', tone: 'sand' },
  { caption: { id: 'Market Day', en: 'Market Day' }, category: 'kegiatan', tone: 'sand' },
  { caption: { id: 'Perpustakaan', en: 'Library' }, category: 'fasilitas', tone: 'indigo' },
  { caption: { id: 'Wisuda tahfidz', en: 'Qur’an graduation' }, category: 'prestasi', tone: 'turq' },
  { caption: { id: 'Praktik sains', en: 'Science practical' }, category: 'kegiatan', tone: 'turq' },
  { caption: { id: 'Lapangan olahraga', en: 'Sports field' }, category: 'fasilitas', tone: 'sand' },
  { caption: { id: 'Lomba futsal antar-sekolah', en: 'Inter-school futsal' }, category: 'prestasi', tone: 'indigo' }
];

export type WaveStatus = 'open' | 'upcoming' | 'closed';

export const PPDB = {
  open: true,
  year: '2027/2028',
  // TODO: link to Google Form / registration system per client. Leave '' to show WhatsApp only.
  formUrl: '',
  waves: [
    { name: { id: 'Gelombang 1', en: 'Wave 1' }, dates: { id: '1 Nov – 31 Des 2026', en: '1 Nov – 31 Dec 2026' }, quota: 60, status: 'open' },
    { name: { id: 'Gelombang 2', en: 'Wave 2' }, dates: { id: '1 Jan – 28 Feb 2027', en: '1 Jan – 28 Feb 2027' }, quota: 40, status: 'upcoming' },
    { name: { id: 'Gelombang 3', en: 'Wave 3' }, dates: { id: '1 Mar – 30 Apr 2027', en: '1 Mar – 30 Apr 2027' }, quota: 20, status: 'upcoming' }
  ] as { name: T; dates: T; quota: number; status: WaveStatus }[],
  steps: [
    { title: { id: 'Isi formulir', en: 'Fill in the form' }, body: { id: 'Online atau langsung di sekolah.', en: 'Online or at the school office.' } },
    { title: { id: 'Observasi & wawancara', en: 'Observation & interview' }, body: { id: 'Mengenal anak dan keluarga, bukan tes saringan.', en: 'Getting to know your child and family, not a screening test.' } },
    { title: { id: 'Pengumuman', en: 'Result' }, body: { id: 'Hasil dikabarkan maksimal 7 hari kerja.', en: 'You’ll hear back within 7 working days.' } },
    { title: { id: 'Daftar ulang', en: 'Confirm enrolment' }, body: { id: 'Lengkapi berkas dan administrasi.', en: 'Complete documents and payment.' } }
  ] as { title: T; body: T }[],
  requirements: [
    { id: 'Fotokopi akta kelahiran', en: 'Copy of birth certificate' },
    { id: 'Fotokopi Kartu Keluarga', en: 'Copy of family card (KK)' },
    { id: 'Pas foto 3×4 (2 lembar)', en: 'Two 3×4 passport photos' },
    { id: 'Rapor terakhir (untuk pindahan/SMP)', en: 'Latest report card (transfers / junior high)' },
    { id: 'Usia minimal 6 tahun per 1 Juli (SD)', en: 'Minimum age 6 by 1 July (primary)' }
  ] as T[],
  fees: [
    { item: { id: 'Biaya formulir', en: 'Application fee' }, amount: 300000 },
    { item: { id: 'Uang pangkal', en: 'Enrolment fee' }, amount: 12500000 },
    { item: { id: 'SPP per bulan', en: 'Monthly tuition' }, amount: 1250000 },
    { item: { id: 'Seragam & buku', en: 'Uniform & books' }, amount: 2100000 }
  ] as { item: T; amount: number }[],
  faq: [
    {
      q: { id: 'Apakah ada tes masuk?', en: 'Is there an entrance test?' },
      a: { id: 'Tidak ada tes saringan akademik. Kami melakukan observasi untuk mengenal kebutuhan belajar anak.', en: 'There is no academic screening test. We observe your child to understand their learning needs.' }
    },
    {
      q: { id: 'Apakah tersedia antar-jemput?', en: 'Is school transport available?' },
      a: { id: 'Ya, untuk wilayah dalam radius 10 km dengan biaya terpisah.', en: 'Yes, within a 10 km radius, at a separate cost.' }
    },
    {
      q: { id: 'Bisakah biaya dicicil?', en: 'Can fees be paid in instalments?' },
      a: { id: 'Uang pangkal dapat dicicil hingga 3 kali.', en: 'The enrolment fee can be split into up to three payments.' }
    }
  ] as { q: T; a: T }[]
};
