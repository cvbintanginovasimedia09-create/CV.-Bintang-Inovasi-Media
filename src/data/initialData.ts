import { AppData } from '../types';

export const DEFAULT_ADMIN_PASSWORD = '#HAVIN9719*';

export const initialAppData: AppData = {
  profile: {
    companyName: 'BINTANG INOVASI MEDIA',
    tagline: 'Professional Event Production & Multimedia Specialist',
    heroHeadline: 'Mewujudkan Event Spektakuler dengan Presisi & Inovasi Tanpa Batas',
    heroSubtitle: 'Solusi satu atap produksi panggung rigging aluminium, sistem tata suara Line Array standar konser internasional, tata cahaya artistik, LED videotron high-definition, dan genset silent mandiri.',
    aboutDescription: 'CV Bintang Inovasi Media adalah perusahaan kontraktor & vendor produksi event berskala nasional yang berdedikasi melayani konser musik akbar, corporate gathering, konferensi kenegaraan, pameran industri, hingga festival kebudayaan di seluruh Indonesia. Didukung oleh teknisi bersertifikasi audio-lighting profesional dan armada peralatan bertaraf internasional.',
    vision: 'Menjadi korporasi produksi event dan multimedia terdepan serta paling terpercaya di Indonesia dengan mengedepankan inovasi teknologi, keselamatan kerja (K3), dan estetika pertunjukan tiada tanding.',
    mission: 'Menghadirkan solusi teknis pertunjukan mutakhir, memastikan keandalan sistem audio visual tanpa cela, serta memberikan ketenangan pikiran mutlak bagi para penyelenggara acara.',
    phone: '+62 812-3456-7890',
    email: 'cvbintanginovasimedia09@gmail.com',
    address: 'Jl. Inovasi Raya No. 88, TB Simatupang',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12560',
    operatingHours: 'Senin - Minggu: 08.00 - 22.00 WIB (Layanan Teknis 24 Jam)',
    socialMedia: {
      instagram: 'https://instagram.com/bintanginovasimedia',
      youtube: 'https://youtube.com/@bintanginovasimedia',
      tiktok: 'https://tiktok.com/@bintanginovasimedia',
      facebook: 'https://facebook.com/bintanginovasimedia'
    },
    stats: {
      yearsExperience: 12,
      completedEvents: 850,
      clientSatisfactionRate: 99.8,
      totalGensetPowerKva: 250
    }
  },

  services: [
    {
      id: 'srv-1',
      title: 'Stage & Rigging Production',
      icon: 'Layers',
      category: 'Stage & Rigging',
      shortDesc: 'Konstruksi panggung rigging aluminium F34/F44 bersertifikasi uji beban dengan atap curved/semi-curved dan barricade mojo aman.',
      fullDesc: 'Penyediaan struktur panggung pameran dan konser bertaraf festival internasional. Menggunakan rigging aluminium truss berkualitas tinggi yang telah tersertifikasi uji beban K3, dilengkapi atap tarpulin anti-bocor, level panggung multiplex lapis karpet, serta barikade pengaman penonton model Mojo.',
      features: [
        'Rigging Truss Aluminium F34 / F44 Standar TÜV',
        'Ukuran fleksibel: 6x8m, 8x10m, 10x12m hingga 18x14m Mega Stage',
        'Ketinggian tower rigging hingga 12 meter',
        'Barikade Mojo & Row Pengaman FOH'
      ],
      specs: 'Material: Aluminium Alloy 6082-T6 | Daya beban gantung per bay: s/d 1.500 kg | Chain Hoist: Electric Motor 1 Ton',
      estimatedPrice: 'Mulai Rp 12.500.000 / paket',
      featured: true,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80'
    },
    {
      id: 'srv-2',
      title: 'Sound System Line Array (Konser & Gathering)',
      icon: 'Volume2',
      category: 'Sound System',
      shortDesc: 'Sistem tata suara Line Array berdaya jangkau tinggi (10.000W - 100.000W) dengan kejernihan vokal dan bass menggelegar.',
      fullDesc: 'Sistem tata suara profesional berskala venue indoor hingga stadion terbuka. Dikelola oleh FOH Sound Engineer berpengalaman dengan dukungan digital mixing console terkemuka dunia dan manajemen sistem akustik terkalibrasi presisi.',
      features: [
        'Speaker Active / Passive Line Array 3-Way System',
        'Subwoofer Ground Stack Dual 18-inch High-SPL',
        'Digital Audio Mixer Yamaha CL5 / Allen & Heath / Midas M32',
        'Microphone Wireless Shure ULXD / Sennheiser EW-D Series'
      ],
      specs: 'Total Output: 10.000 Watt s/d 100.000 Watt RMS | Frekuensi respon: 30Hz - 20kHz | DSP Digital Speaker Management',
      estimatedPrice: 'Mulai Rp 8.000.000 / paket',
      featured: true,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
    },
    {
      id: 'srv-3',
      title: 'Lighting System & Special FX Show',
      icon: 'Sparkles',
      category: 'Lighting & FX',
      shortDesc: 'Tata cahaya artistik Moving Head Beam, Par LED, Laser Show, serta Special Effect Co2 Jet, Confetti, dan Cold Spark.',
      fullDesc: 'Ciptakan atmosfer magis dan dramatis pada setiap babak acara Anda. Tim lighting designer kami memprogram pertunjukan sinkronisasi cahaya (Timecode) yang selaras dengan irama musik serta sorotan visual spektakuler.',
      features: [
        'Moving Head Beam 380W / 440W BWS Hybrid',
        'Par LED 54x3W RGBW High-Power Wash',
        'City Light Outdoor Architectural Floodlight',
        'Special FX: Co2 Gun & Jet Machine, Cold Pyro Sparkular, Heavy Fog, Stadium Confetti Gun'
      ],
      specs: 'DMX 512 Console: GrandMA2 onPC Command Wing / Avolites Titan | Smoke & Haze Machine DMX Continuous Output',
      estimatedPrice: 'Mulai Rp 7.500.000 / paket',
      featured: true,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80'
    },
    {
      id: 'srv-4',
      title: 'LED Videotron & Visual Multimedia',
      icon: 'MonitorPlay',
      category: 'LED & Multimedia',
      shortDesc: 'Layar LED Videotron indoor & outdoor resolusi ultra-tajam P2.6 / P3.9 dengan video switcher seamless multi-kamera.',
      fullDesc: 'Visualisasi konten presentasi, video profil perusahaan, backdrop digital dinamis, dan live feed siaran langsung dengan panel LED kabinet die-cast aluminium ringan dan refresh rate tinggi 3840Hz (anti-flicker di kamera).',
      features: [
        'Indoor LED Screen Pitch P2.6 & P2.9 High Definition',
        'Outdoor LED Screen Pitch P3.9 Waterproof IP65 (High Nits)',
        'Video Processor 4K & Seamless Matrix Switcher Novastar / RGBlink',
        'Multi-Camera Live Broadcast Full HD (Blackmagic Setup)'
      ],
      specs: 'Refresh Rate: 3840Hz | Brightness: 4.500 nits (Outdoor), 1.200 nits (Indoor) | Viewing Angle: 160° Horizontal & Vertical',
      estimatedPrice: 'Mulai Rp 750.000 / meter persegi',
      featured: true,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
    },
    {
      id: 'srv-5',
      title: 'Genset Silent & Power Distribution',
      icon: 'Zap',
      category: 'Genset & Power',
      shortDesc: 'Generator diesel silent kedap suara kapasitas 40 kVA hingga 250 kVA lengkap dengan kabel distribusi dan operator standby.',
      fullDesc: 'Jaminan pasokan listrik stabil tanpa henti selama jalannya acara. Genset model silent berperedam suara ganda sehingga tidak mengganggu kenyamanan penonton, dilengkapi Automatic Transfer Switch (ATS) cadangan dan kabel power heavy-duty.',
      features: [
        'Kapasitas Genset 40 kVA, 60 kVA, 100 kVA, 150 kVA, 250 kVA Silent',
        'Panel Distribusi Listrik 3-Phase + MCB Pengaman Arus',
        'Kabel Induk Tembaga 4x25mm / 4x50mm bersertifikasi SNI',
        'Termasuk Bahan Bakar Solar Industri & Teknisi Operator 24 Jam'
      ],
      specs: 'Tingkat Kebisingan: <65 dB @ 7 meter | Voltase Stabil: 220V/380V 50Hz | Proteksi Overload & Short Circuit',
      estimatedPrice: 'Mulai Rp 3.500.000 / hari',
      featured: false,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'
    },
    {
      id: 'srv-6',
      title: 'Show Management & Event Technical Direction',
      icon: 'Radio',
      category: 'Manajemen Konser',
      shortDesc: 'Direksi teknis pertunjukan, stage manager, rundown rundown choreography, dan komunikasi interkom kru nirkabel.',
      fullDesc: 'Kelancaran alur teknis pertunjukan dari detik ke detik. Kami menyediakan Show Director, Stage Manager, serta sistem interkom wireless Hollyland untuk komunikasi sinkron seluruh operator FOH, panggung, dan panitia penyelenggara.',
      features: [
        'Technical Show Director & Floor Manager Handal',
        'Sistem Wireless Intercom Tally Light Full Duplex',
        'Penyusunan Technical Rider & Floorplan 3D Sketchup',
        'Kesiapsiagaan Tim Medis & Evakuasi Teknis Acara'
      ],
      specs: 'Wireless Intercom: 8-Beltpack Full-Duplex 1.9GHz | Range komunikasi: 400 meter Line-of-Sight',
      estimatedPrice: 'Konsultasi Sesuai Skala Acara',
      featured: false,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
    }
  ],

  portfolio: [
    {
      id: 'port-1',
      title: 'Festival Musik Harmoni Nusantara 2025',
      category: 'Konser Musik',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85',
      date: '18 - 20 Agustus 2025',
      client: 'Kementerian Kebudayaan RI & Promotor Nada Indah',
      location: 'Stadion Madya GBK, Jakarta Pusat',
      audienceSize: '15.000+ Penonton',
      desc: 'Produksi panggung rigging utama 18x12 meter bertingkat dengan sound system Line Array 60.000 Watt, tata cahaya moving head 48 unit, serta videotron curved 12x5 meter.',
      highlights: ['Sound 60.000W Line Array', 'Rigging Mega Stage 18x12m', 'Moving Head Beam 48 Unit', 'Live Streaming 5 Kamera 4K'],
      featured: true
    },
    {
      id: 'port-2',
      title: 'National Technology & AI Summit',
      category: 'Corporate Gathering',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&q=85',
      date: '12 November 2025',
      client: 'Konsorsium Inovasi Digital Nasional',
      location: 'Grand Ballroom Hotel Mulia, Senayan',
      audienceSize: '1.200 Peserta Delegasi',
      desc: 'Konstruksi panggung futuristik indoor berbalut videotron seamless P2.6 resolusi tinggi, sistem audio konferensi multi-zona anti-feedback, dan pencahayaan aksen elegan.',
      highlights: ['LED Screen P2.6 Ultra HD 65m²', 'Conference Audio Multi-Zone', 'Lighting Ambiance Corporate Gold', 'Seamless Hybrid Zoom Broadcast'],
      featured: true
    },
    {
      id: 'port-3',
      title: 'Gala Dinner BUMN & Awarding Night',
      category: 'Corporate Gathering',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85',
      date: '05 Desember 2025',
      client: 'Holding BUMN Energi Mandiri',
      location: 'Jakarta Convention Center (JCC) Hall B',
      audienceSize: '2.500 Tamu Undangan',
      desc: 'Penyelenggaraan malam penganugerahan prestisius dengan panggung hidrolik mini, lighting show spektakuler sinkron musik orkestra, dan special effect Cold Pyro.',
      highlights: ['Special Effects Cold Spark & Co2 Jet', 'Rigging Drop Banners Otomatis', 'Tata Suara Kejernihan Orkes', 'Backdrop LED Interaktif'],
      featured: true
    },
    {
      id: 'port-4',
      title: 'Pameran Otomotif Internasional AutoExpo',
      category: 'Pameran & Expo',
      image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=1000&q=85',
      date: '10 - 15 Oktober 2025',
      client: 'Asosiasi Industri Otomotif',
      location: 'ICE BSD City, Tangerang',
      audienceSize: '45.000 Pengunjung / Pekan',
      desc: 'Penyediaan rigging truss gantung struktur 40x25 meter untuk pencahayaan sorot booth kendaraan premium, genset silent 150 kVA standby 24 jam nonstop.',
      highlights: ['Rigging Hanging Truss 200m Panjang', 'Lighting High-CRI Khusus Mobil Mewah', 'Genset Silent Standby Nonstop', 'Distribusi Daya 3-Phase Stabil'],
      featured: false
    },
    {
      id: 'port-5',
      title: 'The Royal Wedding of Raden & Sarah',
      category: 'Pernikahan Akbar',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85',
      date: '28 Januari 2026',
      client: 'Keluarga Besar Bpk. H. Soedirman',
      location: 'Dharmawangsa Hotel Courtyard, Jakarta',
      audienceSize: '1.800 Tamu VIP',
      desc: 'Panggung pelaminan megah dengan sound system akustik lembut tersebar merata, fairy light ribuan titik, lighting warm amber mewah, dan LED backdrop dinamis.',
      highlights: ['Fairy Lights Tunnel 50m', 'Sound System Acoustic Dispersion', 'Lighting Romantic Amber Tone', 'Silent Genset Ramah Residensial'],
      featured: false
    },
    {
      id: 'port-6',
      title: 'Pesta Rakyat & Konser Kemerdekaan RI',
      category: 'Festival Budaya',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85',
      date: '17 Agustus 2025',
      client: 'Pemerintah Provinsi & Karang Taruna',
      location: 'Lapangan Monumen Nasional (Monas), Jakarta',
      audienceSize: '30.000+ Warga Masyarakat',
      desc: 'Eksekusi panggung kolosal outdoor dengan sistem sound 80.000 Watt tahan terpaan angin kencang, pesta kembang api confetti masif, dan panggung multi-level.',
      highlights: ['Sound 80.000W Long-Throw', 'Panggung Tahan Angin & Hujan', 'Stadium Confetti Blast', 'Safety Barricade 400m'],
      featured: true
    }
  ],

  inquiries: [
    {
      id: 'inq-101',
      createdAt: '2026-10-10 14:22',
      name: 'Bambang Sutrisno (PT Surya Perkasa)',
      phone: '081298765432',
      email: 'bambang.sutrisno@suryaperkasa.co.id',
      eventType: 'Corporate Gathering & Gala Dinner',
      eventDate: '2026-11-20',
      location: 'Pullman Hotel Ciawi, Bogor',
      budgetRange: 'Rp 45.000.000 - Rp 65.000.000',
      message: 'Mohon penawaran untuk sewa panggung 8x6 meter, sound system 15.000 Watt, LED Screen P3.9 ukuran 6x3 meter, dan lighting show untuk 600 karyawan.',
      status: 'dihubungi',
      adminNotes: 'Sudah dihubungi via WhatsApp tgl 10 Okt. Sedang menunggu persetujuan BoD untuk layout LED Screen.',
      syncedToGoogleSheets: true,
      syncedToFirebase: true
    },
    {
      id: 'inq-102',
      createdAt: '2026-10-11 09:15',
      name: 'Rina Anggraini (Event Organizer Sinergi)',
      phone: '081377889900',
      email: 'rina@sinergieo.com',
      eventType: 'Konser Musik Kampus Outdoor',
      eventDate: '2026-12-05',
      location: 'Stadion Sepakbola UI Depok',
      budgetRange: 'Rp 75.000.000 - Rp 110.000.000',
      message: 'Kebutuhan: Rigging stage 12x10 meter full roofing, sound Line Array 30.000 Watt, Genset silent 100kVA, barikade mojo 80 meter, dan lighting moving head 24 pcs.',
      status: 'baru',
      adminNotes: 'Permintaan baru masuk. Prioritas tinggi karena tanggal event di awal Desember.',
      syncedToGoogleSheets: true,
      syncedToFirebase: false
    },
    {
      id: 'inq-103',
      createdAt: '2026-10-12 11:40',
      name: 'Dr. Hendra Gunawan',
      phone: '085712348899',
      email: 'hendra.gunawan@medikaconsult.id',
      eventType: 'Konferensi Simposium Kedokteran',
      eventDate: '2026-11-08',
      location: 'Ritz-Carlton Pacific Place, Jakarta',
      budgetRange: 'Rp 25.000.000 - Rp 35.000.000',
      message: 'Perlu LED Screen Videotron indoor P2.6 ukuran 8x3.5m, audio conference 10 wireless mic gooseneck, dan video recording multi kamera.',
      status: 'deal',
      adminNotes: 'Deal tgl 12 Okt, DP 30% sudah masuk rekening perusahaan. Tim teknis bersiap survei lokasi.',
      syncedToGoogleSheets: true,
      syncedToFirebase: true
    }
  ],

  mediaLibrary: [
    {
      id: 'med-1',
      name: 'konser-line-array-gbk.jpg',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=80',
      sizeKb: 420,
      uploadedAt: '2026-10-01 10:00',
      type: 'image',
      source: 'url'
    },
    {
      id: 'med-2',
      name: 'rigging-mega-stage-alumunium.jpg',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=80',
      sizeKb: 512,
      uploadedAt: '2026-10-02 11:30',
      type: 'image',
      source: 'url'
    },
    {
      id: 'med-3',
      name: 'lighting-moving-head-beam.jpg',
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000&q=80',
      sizeKb: 380,
      uploadedAt: '2026-10-05 14:15',
      type: 'image',
      source: 'url'
    },
    {
      id: 'med-4',
      name: 'led-videotron-stage-curved.jpg',
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&q=80',
      sizeKb: 610,
      uploadedAt: '2026-10-08 16:40',
      type: 'image',
      source: 'url'
    }
  ],

  analytics: {
    totalPageViews: 14280,
    uniqueVisitors: 4890,
    inquiriesConversionRate: 4.8,
    avgSessionSeconds: 195,
    bounceRate: 31.4,
    currentActiveVisitors: 14,
    trafficHistory: [
      { date: '06 Okt', pageViews: 1840, visitors: 620, inquiries: 4 },
      { date: '07 Okt', pageViews: 2100, visitors: 710, inquiries: 6 },
      { date: '08 Okt', pageViews: 1950, visitors: 660, inquiries: 5 },
      { date: '09 Okt', pageViews: 2340, visitors: 790, inquiries: 8 },
      { date: '10 Okt', pageViews: 2180, visitors: 740, inquiries: 7 },
      { date: '11 Okt', pageViews: 1890, visitors: 650, inquiries: 5 },
      { date: '12 Okt', pageViews: 1980, visitors: 720, inquiries: 9 }
    ],
    deviceBreakdown: {
      mobile: 66,
      desktop: 28,
      tablet: 6
    },
    referrerSources: [
      { source: 'Google Pencarian Organik', count: 6850, percentage: 48 },
      { source: 'WhatsApp Rekomendasi Direct', count: 3280, percentage: 23 },
      { source: 'Instagram @bintanginovasimedia', count: 2420, percentage: 17 },
      { source: 'TikTok & YouTube Shorts', count: 1140, percentage: 8 },
      { source: 'Website Referensi Lain', count: 590, percentage: 4 }
    ],
    sectionVisits: [
      { sectionName: 'Hero & Overview', count: 14280 },
      { sectionName: 'Layanan Produksi', count: 9840 },
      { sectionName: 'Portofolio Konser & Acara', count: 8720 },
      { sectionName: 'Kalkulator Estimasi Penawaran', count: 4610 },
      { sectionName: 'Formulir Kontak & Tanya WhatsApp', count: 3290 }
    ],
    activityLogs: [
      { id: 'act-1', timestamp: '22:04:12', action: 'Pengunjung melihat Portofolio "Festival Musik Harmoni"', device: 'Mobile Android (Chrome)', location: 'Jakarta, ID' },
      { id: 'act-2', timestamp: '22:02:45', action: 'Membuka formulir konsultasi penawaran event', device: 'Desktop Windows (Edge)', location: 'Bandung, ID' },
      { id: 'act-3', timestamp: '21:58:19', action: 'Menggunakan Kalkulator Estimasi Kebutuhan Rigging', device: 'Mobile iPhone (Safari)', location: 'Surabaya, ID' },
      { id: 'act-4', timestamp: '21:55:04', action: 'Klik tombol WhatsApp Direct Marketing', device: 'Mobile Android (Chrome)', location: 'Tangerang, ID' },
      { id: 'act-5', timestamp: '21:51:30', action: 'Melihat rincian spesifikasi Sound System Line Array', device: 'Desktop Mac (Chrome)', location: 'Jakarta Selatan, ID' }
    ]
  },

  googleSheetsConfig: {
    webhookUrl: 'https://script.google.com/macros/s/AKfycbz_BIM_SampleWebAppId/exec',
    sheetName: 'Data_Penawaran_Event',
    autoSyncOnInquiry: true,
    lastSyncTime: '2026-10-12 21:30',
    status: 'connected'
  },

  firebaseConfig: {
    projectId: 'bim-event-production-app',
    apiKey: 'AIzaSyA8BIM_ProductionKeySecure_2026',
    authDomain: 'bim-event-production-app.firebaseapp.com',
    firestoreCollection: 'bim_inquiries_production',
    autoSync: true,
    lastSyncTime: '2026-10-12 21:45',
    status: 'connected',
    lastBackupRecordCount: 3
  },

  syncHistory: [
    {
      id: 'sync-1',
      platform: 'Google Sheets',
      timestamp: '2026-10-12 21:30:15',
      status: 'success',
      recordCount: 3,
      message: 'Berhasil sinkronisasi 3 data penawaran ke Google Spreadsheet: "Data_Penawaran_Event"'
    },
    {
      id: 'sync-2',
      platform: 'Firebase Firestore',
      timestamp: '2026-10-12 21:45:00',
      status: 'success',
      recordCount: 3,
      message: 'Berhasil melakukan cloud backup koleksi "bim_inquiries_production" di Firestore'
    },
    {
      id: 'sync-3',
      platform: 'Google Sheets',
      timestamp: '2026-10-11 18:10:44',
      status: 'success',
      recordCount: 2,
      message: 'Auto-sync pesan baru (Rina Anggraini) ke Google Sheets berhasil'
    }
  ],

  seoConfig: {
    metaTitle: 'Bintang Inovasi Media – Spesialis Event Production & Sound System Jakarta',
    metaDescription: 'Vendor produksi event profesional nomor satu: Sound System Line Array, Panggung Rigging Aluminium, Tata Cahaya Artistik, dan LED Videotron Konser.',
    targetKeywords: [
      'sewa sound system jakarta',
      'vendor event production indonesia',
      'panggung rigging konser',
      'sewa videotron led screen p2.6 p3.9',
      'sewa genset silent 100kva',
      'lighting moving head beam vendor',
      'event organizer gathering bumn',
      'bintang inovasi media'
    ],
    canonicalUrl: 'https://bintanginovasimedia.com',
    ogImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85',
    gscVerificationCode: 'google-site-verification=BIM_GSC_VERIFIED_TOKEN_2026',
    ga4MeasurementId: 'G-BIMEVENT2026',
    robotsTxtContent: `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/private

Sitemap: https://bintanginovasimedia.com/sitemap.xml`,
    sitemapXmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bintanginovasimedia.com/</loc>
    <lastmod>2026-10-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bintanginovasimedia.com/#services</loc>
    <lastmod>2026-10-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bintanginovasimedia.com/#portfolio</loc>
    <lastmod>2026-10-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bintanginovasimedia.com/#about</loc>
    <lastmod>2026-10-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bintanginovasimedia.com/#contact</loc>
    <lastmod>2026-10-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
    seoScore: 98,
    schemaType: 'LocalBusiness'
  },

  adminPasswordHash: DEFAULT_ADMIN_PASSWORD,
  adminLastLogin: '2026-10-12 21:00'
};
