// Semua copy halaman ada di sini. Ganti teks tanpa menyentuh komponen.

export const LINKS = {
  wanychat: 'https://wanychat.remot.in',
  play: 'https://play.remot.in',
  email: 'contact@remot.in',
  mailto: 'mailto:contact@remot.in',
}

export const announcement = {
  text: 'Wanychat sudah live, auto DM & balas komentar Instagram',
  cta: 'Coba sekarang',
  href: LINKS.wanychat,
}

export const nav = {
  products: [
    { title: 'Wanychat', sub: 'Auto DM & balas komentar Instagram', href: LINKS.wanychat, icon: 'chat' as const },
    { title: 'Remotin Play', sub: 'Setir mobil RC sungguhan dari browser', href: LINKS.play, icon: 'car' as const },
  ],
  links: [
    { label: 'Ekosistem', href: '#produk' },
    { label: 'Cara kerja', href: '#cara-kerja' },
    { label: 'Kabar', href: '#kabar' },
  ],
  contact: 'Hubungi kami',
}

export const hero = {
  titleA: 'Kendalikan apa pun,',
  titleB: 'dari mana saja.',
  sub: 'Remotin membangun infrastruktur cloud yang menghubungkan orang, percakapan, dan mesin tanpa jeda, mulai dari auto-reply Instagram sampai mobil RC yang kamu setir lewat browser.',
  primary: 'Jelajahi produk',
  secondary: 'Hubungi kami',
  morphLabels: ['remot.in', 'wanychat', 'play'],
}

export const partners = {
  label: 'Partner & pendukung',
}

export const statements = [
  'Sebentar lagi, hampir semua hal di sekitar kita bisa dikendalikan dari jauh.',
  'Yang dibutuhkan adalah infrastruktur yang cepat, terjangkau, dan dekat dengan penggunanya. Itu yang kami bangun.',
]

export const ecosystem = {
  eyebrow: 'Memperkenalkan',
  title: 'Ekosistem remot.in.',
  sub: 'Dua produk, satu fondasi cloud. Masing-masing berdiri di subdomainnya sendiri.',
  cards: [
    {
      key: 'wanychat' as const,
      name: 'Wanychat',
      domain: 'wanychat.remot.in',
      href: LINKS.wanychat,
      title: 'Komentar masuk, DM terkirim.',
      body: 'Auto DM & balas komentar Instagram dengan kata kunci, tombol, follow-up, dan balasan AI.',
      cta: 'Buka Wanychat',
    },
    {
      key: 'play' as const,
      name: 'Remotin Play',
      domain: 'play.remot.in',
      href: LINKS.play,
      title: 'Mobil RC sungguhan, disetir dari browser.',
      body: 'Sewa, lihat dari kamera first-person, dan kendalikan mobil RC secara real-time dari mana saja.',
      cta: 'Main sekarang',
    },
  ],
}

export const features = [
  {
    icon: 'bolt' as const,
    title: 'Real-time',
    body: 'Respons dalam hitungan detik, baik membalas komentar maupun menggerakkan roda mobil.',
  },
  {
    icon: 'cloud' as const,
    title: 'Cloud-native',
    body: 'Berjalan di cloud tanpa perlu instalasi. Cukup buka browser dan mulai.',
  },
  {
    icon: 'wallet' as const,
    title: 'Harga Rupiah',
    body: 'Dirancang untuk pengguna Indonesia, dengan harga yang masuk akal dan pembayaran lokal.',
  },
]

export const ctaBand = {
  title: 'Punya ide yang perlu dikendalikan dari jauh?',
  cta: 'Hubungi kami',
}

export const centerHeading = {
  title: 'Satu fondasi untuk setiap hal yang bergerak dari jauh.',
  sub: 'Satu fondasi cloud melayani percakapan di Instagram dan mesin di dunia nyata, dari server yang sama dan dengan disiplin latensi yang sama.',
}

export const wanychat = {
  pill: 'Wanychat',
  version: 'wanychat.remot.in',
  title: 'Auto-reply Instagram',
  body: 'Setiap komentar dengan kata kunci langsung dibalas dan dikirimi DM berisi tombol, katalog, atau jawaban AI. Login cukup dengan akun Instagram profesionalmu.',
  primary: 'Buka Wanychat',
  secondary: 'Tanya kami',
  chat: [
    { from: 'user', text: 'harganya berapa kak? 😍', label: 'Komentar · @rina.belanja' },
    { from: 'bot', text: 'Halo Rina! Cek DM ya, katalog lengkapnya sudah kami kirim 💌' },
    { from: 'bot', text: 'Ini katalog + harga lengkapnya kak 👇', button: 'Lihat katalog' },
  ],
}

export const play = {
  pill: 'Remotin Play',
  version: 'play.remot.in',
  title: 'RC car, kendali dari browser',
  body: 'Suzuki Kei Truck skala 1:10 dengan kamera first-person. Pilih mobil, bayar, lalu setir langsung dari browser. Mulai Rp 1.000 per 10 menit.',
  primary: 'Main sekarang',
  secondary: 'Kerja sama',
  hud: { car: 'Suzuki Kei Truck · 1:10', price: 'Rp 1.000 / 10 menit' },
  commands: ['maju ↑', 'belok kiri ←', 'maju ↑', 'belok kanan →', 'rem ■'],
}

export const tabs = {
  title: 'Cara kerjanya',
  items: [
    {
      id: 'jualan',
      label: 'Jualan online',
      product: 'wanychat' as const,
      heading: 'Calon pembeli komentar “harga”, katalog langsung masuk DM.',
      steps: ['Masuk dengan Instagram', 'Atur kata kunci & isi DM', 'Biarkan Wanychat bekerja 24 jam'],
      cta: 'Buka Wanychat',
      href: LINKS.wanychat,
    },
    {
      id: 'kreator',
      label: 'Kreator konten',
      product: 'wanychat' as const,
      heading: 'Bagikan link, freebie, atau kode promo ke setiap komentator.',
      steps: ['Pilih postingan atau reel', 'Tulis balasan + tombol link', 'Follow-up otomatis yang belum klik'],
      cta: 'Buka Wanychat',
      href: LINKS.wanychat,
    },
    {
      id: 'main',
      label: 'Main dari rumah',
      product: 'play' as const,
      heading: 'Setir mobil RC sungguhan di lintasan nyata dari layar ponsel.',
      steps: ['Pilih mobil yang tersedia', 'Bayar mulai Rp 1.000', 'Kendalikan lewat kamera live'],
      cta: 'Main di Play',
      href: LINKS.play,
    },
    {
      id: 'event',
      label: 'Event & edukasi',
      product: 'play' as const,
      heading: 'Bawa pengalaman remote-control ke pameran, sekolah, atau kampus.',
      steps: ['Hubungi tim Remotin', 'Kami siapkan armada & lintasan', 'Peserta main dari perangkat mereka'],
      cta: 'Main di Play',
      href: LINKS.play,
    },
  ],
}

export const notes = {
  title: 'Dari lab Remotin',
  sub: 'Rilis, pembaruan, dan eksperimen terbaru.',
  all: 'Kirim kabar',
  items: [
    {
      tag: 'Pengumuman',
      thumb: 'brand' as const,
      title: 'remot.in kini jadi rumah untuk semua produk Remotin',
      body: 'Landing utama di remot.in, Wanychat di wanychat.remot.in, dan Remotin Play di play.remot.in.',
      href: '#produk',
    },
    {
      tag: 'Rilis produk',
      thumb: 'wanychat' as const,
      title: 'Wanychat: auto DM & balas komentar Instagram',
      body: 'Masuk dengan Instagram, atur kata kunci, dan setiap komentar langsung dibalas lewat DM berisi tombol.',
      href: LINKS.wanychat,
    },
    {
      tag: 'Pembaruan',
      thumb: 'grid' as const,
      title: 'Balasan AI Wanychat kini ditenagai DeepSeek',
      body: 'Pertanyaan di luar kata kunci bisa dijawab AI sesuai konteks tokomu, tetap dengan gaya bahasamu.',
      href: LINKS.wanychat,
    },
    {
      tag: 'Armada',
      thumb: 'car' as const,
      title: 'Suzuki Kei Truck 1:10 siap disewa di Remotin Play',
      body: 'Mobil pickup skala 1:10 dengan kamera first-person. Rp 1.000 untuk 10 menit berkendara.',
      href: LINKS.play,
    },
    {
      tag: 'Kolaborasi',
      thumb: 'tags' as const,
      title: 'Terbuka untuk kolaborasi event & edukasi',
      body: 'Ingin menghadirkan Remotin Play atau otomasi Wanychat di acaramu? Kirim email ke tim kami.',
      href: LINKS.mailto,
    },
  ],
}

export const footer = {
  columns: [
    {
      title: 'Produk',
      links: [
        { label: 'Wanychat', href: LINKS.wanychat },
        { label: 'Remotin Play', href: LINKS.play },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { label: 'Ekosistem', href: '#produk' },
        { label: 'Partner', href: '#partner' },
        { label: 'Kabar', href: '#kabar' },
      ],
    },
    {
      title: 'Kontak',
      links: [{ label: LINKS.email, href: LINKS.mailto }],
    },
  ],
  legal: 'PT Remotin Cloud Infrastructure',
}
