export const projectFilters = [
  'All',
  'AI & Web',
  'Web Development',
  'UI/UX Design',
  'Security & Systems'
];

export const projectsData = [
  {
    id: 1,
    title: "SpinSight – Critical Reasoning & Argumentation Platform",
    category: 'AI & Web',
    filterCategory: 'AI & Web',
    date: 'Oct 2025',
    tech: 'Web Dev · AI Integration',
    desc: 'Platform web pembelajaran untuk melatih kemampuan penalaran kritis dan argumentasi lisan berbantuan AI dengan arena debat terstruktur.',
    // 💡 Tips: Simpan file screenshot di folder public/projects/ lalu ganti path di bawah ini
    gallery: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000'],
    techList: ['AI Integration', 'Web Development', 'NLP', 'Debate Arena', 'EdTech', 'Interactive UI'],
    bullets: [
      'Developed a web platform for practicing critical reasoning and oral argumentation through AI-assisted learning.',
      'Implemented AI-powered argument analysis, scoring, and personalized feedback for student responses.',
      'Designed interactive debate arenas with structured argumentation and classroom discussion features.',
      'Integrated teacher dashboards, topic management, and student progress tracking to support educational assessment.'
    ],
    background: 'Meningkatkan kemampuan berpikir kritis dan argumentasi terstruktur di era informasi seringkali terkendala oleh terbatasnya evaluasi personal yang mendalam di ruang kelas konvensional.',
    solution: 'Membangun platform berbasis web yang memanfaatkan AI untuk menganalisis struktur argumen siswa, memberikan skor dan feedback secara real-time, serta menyediakan arena debat interaktif dan dasbor pemantauan kemajuan untuk pengajar.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 2,
    title: "KeraHub – Circular Economy Platform",
    category: 'Web Dev',
    filterCategory: 'Web Development',
    date: 'Sep 2025',
    tech: 'Web Dev · Marketplace · Traceability',
    desc: 'Platform ekonomi sirkular digital yang menghubungkan pemilik salon, mitra logistik, fasilitas pengolahan, dan petani untuk daur ulang limbah rambut.',
    gallery: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000'],
    techList: ['Web Development', 'Traceability', 'Marketplace', 'Circular Economy', 'Logistics Coordination', 'GreenTech'],
    bullets: [
      'Developed a digital platform connecting salon owners, logistics providers, processing facilities, and farmers.',
      'Designed a digital scheduling system for waste collection and logistics coordination.',
      'Integrated traceability and marketplace features to support the distribution of processed hair waste products.',
      'Incorporated digital incentive mechanisms to encourage participation in a circular economy ecosystem.'
    ],
    background: 'Limbah rambut dari industri salon kecantikan kerap mencemari lingkungan tanpa pengelolaan yang tepat, padahal memiliki kandungan organik bernilai ekonomi tinggi untuk sektor pertanian.',
    solution: 'Mengembangkan platform web terintegrasi dengan modul penjadwalan penjemputan limbah, pelacakan rantai pasok transparan (traceability), marketplace produk pupuk/turunan rambut, dan sistem insentif digital.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 3,
    title: "SIGNARY – Inclusive Communication Platform",
    category: 'AI & Web',
    filterCategory: 'AI & Web',
    date: 'Sep 2025',
    tech: 'AI · Computer Vision · Web Dev',
    desc: 'Platform komunikasi dan pembelajaran inklusif dengan kamus digital BISINDO, speech-to-text, dan penerjemah bahasa isyarat berbasis Computer Vision.',
    gallery: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000'],
    techList: ['AI & Machine Learning', 'Computer Vision', 'Speech-to-Text', 'Sign-to-Text', 'BISINDO', 'Web Accessibility'],
    bullets: [
      'Developed an inclusive web platform featuring a BISINDO dictionary, community, and discussion forum.',
      'Implemented speech-to-text and sign-to-text functionalities to support accessible communication.',
      'Integrated AI and computer vision technologies for sign language recognition and translation.',
      'Designed digital learning and communication features to promote accessibility and social inclusion.'
    ],
    background: 'Keterbatasan akses media komunikasi inklusif sering menghambat interaksi sehari-hari antara penyandang disabilitas rungu (tuli) dan masyarakat umum.',
    solution: 'Membangun aplikasi web inklusif yang memanfaatkan Computer Vision dan model AI untuk penerjemahan bahasa isyarat secara real-time, dilengkapi konversi suara-ke-teks, kamus interaktif BISINDO, dan forum komunitas suportif.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 4,
    title: "PanganDali – Food Distribution Intelligence Platform",
    category: 'AI & Web',
    filterCategory: 'AI & Web',
    date: 'Jul 2025',
    tech: 'FastAPI · React.js · PostgreSQL · AI',
    desc: 'Platform intelijen distribusi pangan B2B2G dengan integrasi WhatsApp Business API, peramalan pasokan AI, dan dasbor Early Warning System.',
    gallery: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000'],
    techList: ['FastAPI', 'React.js', 'PostgreSQL', 'AI Forecasting', 'WhatsApp Business API', 'Early Warning System'],
    bullets: [
      'Developed a B2B2G platform connecting farmers, distributors, logistics partners, and local government for food distribution coordination.',
      'Integrated WhatsApp Business API for harvest reporting and automated data acquisition.',
      'Implemented AI-assisted supply forecasting, harvest data extraction, and smart backhaul matching.',
      'Designed an Early Warning System dashboard to support regional food supply monitoring and inflation control.'
    ],
    background: 'Asimetri informasi rantai pasok pangan dan lambatnya pelaporan panen di tingkat petani kerap memicu kelangkaan serta gejolak inflasi harga pangan di daerah.',
    solution: 'Mengembangkan ekosistem digital B2B2G: pelaporan hasil panen petani otomatis via WhatsApp bot, analisis dan prediksi suplai berbantuan AI, pencocokan rute logistik cerdas, serta Early Warning System untuk pemangku kebijakan.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 5,
    title: "Agrisave – Personal Finance Data Encryption",
    category: 'Security',
    filterCategory: 'Security & Systems',
    date: 'Jun 2025',
    tech: 'Python · AES-CBC · Cryptography',
    desc: 'Sistem pengamanan data finansial pribadi berbasis algoritma Advanced Encryption Standard (AES) mode Cipher Block Chaining (CBC) dengan Python.',
    gallery: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000'],
    techList: ['Python', 'AES-256', 'Cipher Block Chaining (CBC)', 'Cryptography', 'Data Confidentiality', 'Data Security'],
    bullets: [
      'Implemented the Advanced Encryption Standard (AES) algorithm using Cipher Block Chaining (CBC) mode.',
      'Developed a Python-based encryption system to protect personal financial records.',
      'Applied cryptographic techniques to enhance data confidentiality and secure financial information.'
    ],
    background: 'Kerahasiaan catatan transaksi dan data keuangan pribadi sangat rentan terhadap pencurian jika disimpan tanpa enkripsi kriptografi yang kokoh.',
    solution: 'Mengimplementasikan sistem enkripsi/dekripsi Python menggunakan AES-CBC dengan padding PKCS#7 dan initial vector (IV) dinamis guna menjamin kerahasiaan (*confidentiality*) dan integritas data finansial.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 6,
    title: "KibokGO – UNIB Shortest Path",
    category: 'Web Dev',
    filterCategory: 'Web Development',
    date: 'May 2025',
    tech: 'JavaScript · Leaflet.js · OpenStreetMap',
    desc: 'Sistem navigasi kampus berbasis web untuk mencari rute jalan kaki terpendek dan jalur alternatif di lingkungan Universitas Bengkulu menggunakan algoritma Dijkstra.',
    gallery: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000'],
    techList: ['JavaScript', 'Dijkstra Algorithm', 'Leaflet.js', 'OpenStreetMap', 'Graph Theory', 'Spatial Navigation'],
    bullets: [
      'Developed a web-based navigation system to find the shortest walking routes between locations within Universitas Bengkulu.',
      'Implemented Dijkstra\'s algorithm to calculate optimal paths and alternative routes (detours).',
      'Integrated Leaflet.js and OpenStreetMap for interactive map visualization and spatial data.',
      'Designed a modular client-side architecture for responsive rendering and maintainable code.'
    ],
    background: 'Luasnya area kampus Universitas Bengkulu dengan puluhan gedung perkuliahan dan percabangan jalan seringkali menyulitkan civitas akademika dalam menemukan rute pejalan kaki paling efisien.',
    solution: 'Membangun peta interaktif berbasis Leaflet.js dan OpenStreetMap yang memetakan jalur kampus ke dalam representasi graf berbobot, menerapkan algoritma Dijkstra untuk kalkulasi rute terpendek dan rute alternatif (detour).',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 7,
    title: "UI Design & Web Prototype — BibokSalad",
    category: 'UI/UX Design',
    filterCategory: 'UI/UX Design',
    tech: 'Figma · Prototyping',
    desc: 'Desain antarmuka aplikasi pemesanan salad kustom lengkap dengan alur pengguna dari pilihan menu, topping, minuman, hingga konfirmasi pesanan.',
    gallery: ['/Portofolio-M-Iqbal-Zafarullah/projects/biboksalad-uiux.jpg'],
    techList: ['Figma', 'UI Design', 'Prototyping', 'UX Research', 'User Flow'],
    bullets: [
      'Designed 12+ intuitive mobile UI screens for local salad business.',
      'Conducted user flow optimization for custom salad dressings, toppings, and checkout.',
      'Created high-fidelity interactive prototype ready for developer handover.'
    ],
    background: 'BibokSalad adalah UMKM salad lokal yang membutuhkan sistem pemesanan digital yang intuitif dan menarik untuk meningkatkan pengalaman pelanggan saat memesan secara online.',
    solution: 'Merancang 12+ layar UI bertema hijau segar yang mencerminkan brand, dengan alur pemesanan yang mulus — dari pilihan jenis salad, harga, rasa cream salad, topping, minuman, hingga form konfirmasi pesanan. Prototype interaktif selesai di Figma.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 8,
    title: "BiblioSys — Digital Library Platform",
    category: 'Web Dev',
    filterCategory: 'Web Development',
    tech: 'Laravel · PHP · MySQL',
    desc: 'Sistem manajemen perpustakaan digital berbasis web untuk mengelola data buku, anggota, peminjaman, dan laporan secara terpusat dengan antarmuka admin yang elegan.',
    gallery: ['/Portofolio-M-Iqbal-Zafarullah/projects/bibliosys-library.jpg'],
    techList: ['Laravel', 'PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    bullets: [
      'Built full-featured digital library management system using Laravel MVC architecture.',
      'Developed automated borrowing, return date tracking, and overdue fine calculations.',
      'Designed real-time admin dashboard with analytics on active members and popular books.'
    ],
    background: 'Perpustakaan konvensional masih mengandalkan pencatatan manual yang rawan kesalahan dan sulit dimonitor. Digitalisasi dibutuhkan untuk efisiensi pengelolaan koleksi buku, data anggota, dan sistem peminjaman.',
    solution: 'Membangun platform manajemen perpustakaan digital lengkap dengan dashboard statistik real-time (total buku, anggota aktif, sedang dipinjam, keterlambatan), manajemen data buku & anggota, sistem peminjaman terintegrasi, dan laporan buku terpopuler.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 9,
    title: "Budgetku — Personal Finance Management",
    category: 'Web Dev',
    filterCategory: 'Web Development',
    tech: 'PHP · MySQL · CSS',
    desc: 'Aplikasi web manajemen keuangan pribadi dengan dashboard finansial, pelacak transaksi, riwayat pengeluaran, dan fitur target tabungan.',
    gallery: ['/Portofolio-M-Iqbal-Zafarullah/projects/budgetku-webapp.jpg'],
    techList: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    bullets: [
      'Developed full-stack personal finance web application with responsive dashboard.',
      'Implemented customizable expense categories and monthly savings goals.',
      'Designed visual analytical charts for income and expenditure tracking.'
    ],
    background: 'Mahasiswa seringkali kesulitan mengelola keuangan bulanan karena tidak ada catatan terstruktur. Kebutuhan akan tools sederhana namun powerful untuk tracking pengeluaran dan target menabung menjadi latar belakang proyek ini.',
    solution: 'Membangun web app full-stack dengan dashboard analitik visual, sistem kategori pengeluaran kustom, fitur penetapan & monitoring target keuangan, serta laporan riwayat transaksi yang bisa difilter per kategori.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 10,
    title: "D'Jadore — Luxury Fashion E-Commerce",
    category: 'Web Dev',
    filterCategory: 'Web Development',
    tech: 'HTML · CSS · JavaScript',
    desc: "Website e-commerce fashion premium dengan identitas brand D'Jadore yang elegan — menampilkan koleksi busana dengan pengalaman belanja yang mewah dan minimalis.",
    gallery: ['/Portofolio-M-Iqbal-Zafarullah/projects/djadore-ecommerce.png'],
    techList: ['HTML5', 'CSS3', 'JavaScript', 'UI Design', 'E-Commerce'],
    bullets: [
      'Crafted a minimalist luxury e-commerce user interface with smooth animations.',
      'Built slide-out shopping cart drawer and order summary calculator.',
      'Implemented client-side order tracking and dynamic PDF invoice generation.'
    ],
    background: "Brand fashion lokal D'Jadore membutuhkan kehadiran digital yang mencerminkan identitas mewah dan eksklusif mereka. Tantangannya adalah membangun pengalaman belanja online yang terasa premium, berkelas, dan elegan.",
    solution: "Membangun website e-commerce dengan desain monokrom hitam-putih elegan, navigasi koleksi yang intuitif, halaman produk dengan visual detail tinggi, sistem keranjang belanja slide-out, fitur tracking pesanan, dan invoice PDF profesional.",
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
  {
    id: 11,
    title: "Spider-Man: GF of Chaos — 2D Game",
    category: 'Game Dev',
    filterCategory: 'Security & Systems',
    tech: 'Java · Greenfoot',
    desc: 'Video game arcade 2D bertema Spider-Man dengan 3 level, sistem skor, dan logika musuh yang dirancang sepenuhnya dari nol menggunakan OOP.',
    gallery: ['/Portofolio-M-Iqbal-Zafarullah/projects/spiderman-game.jpg'],
    techList: ['Java', 'Greenfoot', 'OOP', 'Game Design'],
    bullets: [
      'Engineered complete 2D arcade game utilizing OOP inheritance and encapsulation in Java.',
      'Created 3 difficulty levels with custom sprite animations and sound effects.',
      'Programmed enemy AI behaviors, collision detection, and score tallying system.'
    ],
    background: 'Dibuat sebagai tugas akhir mata kuliah Pemrograman Berorientasi Objek (OOP). Tantangannya adalah merancang game yang menerapkan konsep inheritance, polymorphism, dan encapsulation secara nyata dan menyenangkan.',
    solution: 'Berhasil membangun game 2D lengkap dengan 3 level berbeda, sistem scoring, animasi karakter custom, layar game-over, dan mekanisme musuh yang menggunakan prinsip OOP penuh via Greenfoot framework.',
    githubUrl: 'https://github.com/MIqbalZafarullah'
  },
];

