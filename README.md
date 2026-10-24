# UD Pratama Mulya — Next.js

Website profil dan katalog UD Pratama Mulya yang telah dipindahkan ke **Next.js App Router + TypeScript**, dengan Tailwind CSS tersedia untuk pengembangan UI lanjutan. Desain visual utama dipertahankan dari versi sebelumnya.

## Teknologi
- Next.js App Router
- React + TypeScript
- Tailwind CSS 3 (Preflight dinonaktifkan agar tidak merusak styling lama)
- CSS responsif untuk desain, animasi, dan sidebar
- Tanpa database/backend; konten masih statis

## Menjalankan di komputer lokal

Pastikan Node.js 20.9 atau lebih baru sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Untuk mengecek build produksi:

```bash
npm run build
npm start
```

## Struktur folder

```text
app/
├── globals.css             # Tailwind + stylesheet desain
├── layout.tsx              # Root layout dan metadata SEO
├── page.tsx                # Halaman utama Next.js
├── site-content.html       # Konten halaman statis
└── site-interactions.tsx   # Interaksi menu, filter, WhatsApp, dan animasi
```

## Fitur
- Sidebar kiri desktop dan drawer navigasi di mobile
- Katalog ikan mentah dan inspirasi olahan dengan filter terpisah
- Tombol produk membuka WhatsApp dengan pesan yang sesuai
- Efek klik/ripple dan navigasi aktif sesuai section
- Informasi kontak dan catatan pre-order H-3
- Metadata SEO dasar dan tampilan responsif

## Catatan sebelum publikasi
- Foto katalog masih memakai URL gambar Unsplash sebagai ilustrasi. Ganti dengan foto produk asli sebelum website dipublikasikan.
- Konten katalog dan harga/ketersediaan perlu dikonfirmasi langsung ke pemilik usaha.
- Situs belum memiliki CMS, database, autentikasi, atau sistem checkout.
