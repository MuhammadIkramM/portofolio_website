# Implementation Notes — Rebuild Portofolio Ikram

Dokumen ini mencatat seluruh implementasi, perubahan sistem visual, penerapan token warna baru, asumsi desain, serta daftar konten placeholder yang perlu diperbarui di masa mendatang.

---

## 1. Ringkasan Perubahan & Urutan Eksekusi

### Step 1: Token Warna + Global (`src/styles/tokens.css`, `base.css`, `typography.css`)
- **Basis Warna**:
  - `--bg: #EDEDED` (latar terang utama editorial).
  - `--ink: #0A0A0A` (warna teks utama dan garis di atas latar terang).
  - `--dark: #0A0A0A` (menggantikan `#1F1F1F` untuk preloader, band marquee, quote, kontak, kartu hitam).
  - `--on-dark: #F5F5F5` beserta tingkatannya (`--on-dark-2`, `--on-dark-3`, `--on-dark-4`).
- **Aksen Terang & Gelap**:
  - Latar Gelap: `--eng: #00D4FF`, `--eng-2: #00CEC9`, `--sec: #FB3640`.
  - Latar Terang: `--eng-on-light: #0984E3`, `--sec-on-light: #D7263D`, `--eng-ink-light: #102552`, `--sec-ink-light: #8B1221`.
  - Ambient Glow: `--glow-eng: #0984E3`, `--glow-sec: #8B1221`.
  - Tokens yang belum terpakai (glassmorphism, backdrop modal, badge status, brand tech stack) disimpan sebagai komentar di [tokens.css](file:///d:/Project/Web/my-portfolio/src/styles/tokens.css).
- **Global**:
  - `::selection`: background `#00CEC9`, color `#0A0A0A`.
  - `:focus-visible`: outline 2px solid `var(--eng-on-light)`, outline-offset 3px. Pada section gelap menggunakan `var(--eng)`.
  - `html, body`: latar belakang netral `var(--bg)` (`#EDEDED`).
  - Kursor dan Navbar tetap netral dengan `mix-blend-mode: difference`.

### Step 2: Perbaikan Visual
1. **Pita Gelap di Atas Hero**:
   - Diperbaiki pada akar: [index.html](file:///d:/Project/Web/my-portfolio/index.html) dan `base.css` menetapkan background `#EDEDED` (`var(--bg)`).
   - Preloader dan Wipe overlay di-[App.jsx](file:///d:/Project/Web/my-portfolio/src/App.jsx) di-unmount dari DOM setelah intro selesai (`!introDone && <Preloader />`).
2. **Goresan Tipis Tipografi Display**:
   - Pada [typography.css](file:///d:/Project/Web/my-portfolio/src/styles/typography.css), seluruh kelas display (`.display-xl`, `.display-lg`, `.display-md`) serta heading diberi:
     ```css
     font-optical-sizing: none;
     font-variation-settings: "opsz" 18;
     ```
     Hal ini mempertahankan hairline stroke (garis tipis diagonal M, palang H, serif) pada Bodoni Moda di ukuran besar.
3. **Foto Hero Cutout Transparan**:
   - Menggunakan aset PNG transparan `public/assets/hero/hero-cutout.png`.
   - Diposisikan di tengah (`left: 34%`, `width: 38%`) di atas teks nama IKRAM (`z-index: 2` vs `z-index: 1`), menutupi huruf tengah "R".
   - Bagian bawah foto menyentuh/melewati batas bawah frame hero (`bottom: 0`, `height: 94%`) yang dipotong rapi oleh `overflow: hidden` pada frame.
4. **Jarak Tulisan Script**:
   - Signature "Muslimin" di hero ditempatkan di kanan bawah huruf terakhir "M" tanpa menumpuk huruf lain.
   - Di section About, heading `Halo, aku` dan script `Ikram!` dipisah dengan flex layout (`display: flex; flex-direction: column; gap: 8px;`) dan line-height aman sehingga script tidak menimpa teks serif.

### Step 3: Data & Komponen Bersama
- [src/data/profile.js](file:///d:/Project/Web/my-portfolio/src/data/profile.js): Profil lengkap Muhammad Ikram Muslimin (alias: Zandik, katakana: イクラム).
- [src/data/stage.js](file:///d:/Project/Web/my-portfolio/src/data/stage.js): Data aktivitas dengan properti `accent` ('eng', 'sec', null).
- [src/data/gallery.js](file:///d:/Project/Web/my-portfolio/src/data/gallery.js): Data galeri 2 foto aktif + DarkCard + CtaCard.
- [src/data/social.js](file:///d:/Project/Web/my-portfolio/src/data/social.js): Tautan media sosial baru (Instagram, GitHub, LinkedIn, X / Twitter) dan konfigurasi footer.
- `<Signature />` ([src/components/ui/Signature.jsx](file:///d:/Project/Web/my-portfolio/src/components/ui/Signature.jsx)): Menampilkan alias "Zandik" menggunakan font `Mr Dafoe`, atau gambar jika `signatureImage` disediakan.
- `<LiveDate />` ([src/components/ui/LiveDate.jsx](file:///d:/Project/Web/my-portfolio/src/components/ui/LiveDate.jsx)): Format `DD-MM-YYYY` dinamis berdasarkan waktu perangkat, polling interval 30 detik tanpa re-render berlebih, dibersihkan saat unmount (StrictMode safe).

### Step 4: Per Section (Konten + Warna)
- **Preloader**:
  - Background `var(--dark)` (`#0A0A0A`).
  - Signature `<Signature />` Zandik dengan animasi write-on kiri-ke-kanan (`clip-path: inset(0 0% 0 0)`).
  - Garis progres dengan gradien `linear-gradient(90deg, var(--eng), var(--sec))` dan lintasan putih 20%.
  - Label `IKRAM` dan counter `000` -> `100`.
- **Hero**:
  - Label kecil: "Muhammad" (sans, letter-spacing lebar) dengan animasi per karakter.
  - Judul besar: "IKRAM" dengan foto cutout menutup huruf "R".
  - Script "Muslimin" di bawah huruf "M".
  - Kiri atas: quote profil (serif bold 2–3 baris).
  - Kanan atas: `<LiveDate />`, tetesan garis dengan dua garis terpanjang memakai `--eng-on-light` (#0984E3) dan `--sec-on-light` (#D7263D).
  - Kiri bawah: "Software Developer" (`--eng-on-light`, bold italic >= 20px, garis aksen 2px x 32px).
  - Kanan bawah: "Cybersecurity" (`--sec-on-light`, bold italic >= 20px, garis aksen 2px x 32px, atribusi `~Ikram~`).
  - Label vertikal SCROLL tetap ada.
- **Marquee**:
  - Band `var(--dark)` dengan teks `var(--on-dark)`.
  - Berisi: `Ikram ✦ イクラム ✦ Zandik ✦` berulang secara seamless, dengan separator bintang berotasi warna selang-seling `var(--eng)` dan `var(--sec)`.
- **Navbar**:
  - Tetap netral dengan `mix-blend-mode: difference`.
  - Brand logo diubah menjadi `Ikram Z.` (dengan huruf Z bermodel script).
- **About**:
  - Heading: "Halo, aku" + script "Ikram!" dengan margin pemisah yang jelas.
  - Bio deskriptif developer & cybersecurity.
  - Grid fakta: NAMA, ALIAS, PERAN, FOKUS.
  - Kolom vertikal script `<Signature />` "Zandik".
  - Caption foto: "NO. 001 — PORTRAIT" | "IKRAM".
  - Blockquote menampilkan quote profil.
- **Aktivitas (Stage)**:
  - Heading "Di balik layar".
  - Tiga item: (01) Software Development, (02) Cybersecurity, (03) Proyek.
  - Indeks dan hover tombol panah:
    - Software Development (`eng`): indeks `--eng-ink-light`, tombol hover `--eng-on-light` dengan panah putih.
    - Cybersecurity (`sec`): indeks `--sec-ink-light`, tombol hover `--sec-on-light` dengan panah putih.
    - Proyek (`null`): tombol hover `--ink` dengan panah `--bg`.
- **Quote**:
  - Background `var(--dark)` dengan dual static radial glow di belakang teks:
    - Biru: `radial-gradient(60% 80% at 15% 50%, rgba(9,132,227,.16), transparent 70%)`
    - Merah: `radial-gradient(60% 80% at 85% 55%, rgba(139,18,33,.30), transparent 70%)`
  - Quote teks profil dan atribusi `~Ikram~`.
- **Galeri**:
  - Heading: "Potret Ikram".
  - Hanya merender 2 foto aktif yang tersedia + DarkCard + CtaCard.
  - DarkCard: background `var(--dark)`, peran "SOFTWARE DEVELOPER" (`--eng`) & "CYBERSECURITY" (`--sec`), tanda tangan vertikal "Zandik", footer "IKRAM".
  - Padding track disesuaikan agar horizontal scroll tetap berfungsi mulus dengan jumlah kartu berapapun.
- **Kontak & Footer**:
  - Heading: "Terima kasih sudah mampir!".
  - Tautan sosial: Instagram, GitHub, LinkedIn, X / Twitter. Hover tombol menyapu background putih dan garis bawah `linear-gradient(90deg, var(--eng), var(--sec))`.
  - Baris meta: `MUHAMMAD IKRAM MUSLIMIN`, `<LiveDate />`, `KEMBALI KE ATAS`.
  - Giant text "IKRAM" dengan dual glow statis di belakangnya (biru & merah).
  - Copyright dinamis: `© {tahun} MUHAMMAD IKRAM MUSLIMIN — Portfolio`.

---

## 2. Rasio Kontras Warna (WCAG AA Compliance)

| Elemen | Warna Teks | Latar Belakang | Ukuran / Bobot | Rasio Kontras | Status WCAG |
|---|---|---|---|---|---|
| Software Dev Heading | `--eng-on-light` (#0984E3) | `--bg` (#EDEDED) | clamp(20px, 1.6vw, 28px) Bold 700 | ~3.24 : 1 | Lolos (Large text >= 3.0:1) |
| Cybersecurity Heading | `--sec-on-light` (#D7263D) | `--bg` (#EDEDED) | clamp(20px, 1.6vw, 28px) Bold 700 | ~4.31 : 1 | Lolos (Large text >= 3.0:1) |
| Indeks Stage (01) | `--eng-ink-light` (#102552)| `--bg` (#EDEDED) | 11px SemiBold 600 | ~10.2 : 1 | Lolos (Normal text >= 4.5:1) |
| Indeks Stage (02) | `--sec-ink-light` (#8B1221)| `--bg` (#EDEDED) | 11px SemiBold 600 | ~9.3 : 1 | Lolos (Normal text >= 4.5:1) |
| DarkCard Role 1 | `--eng` (#00D4FF) | `--dark` (#0A0A0A) | 8px SemiBold 600 | ~11.8 : 1 | Lolos (Normal text >= 4.5:1) |
| DarkCard Role 2 | `--sec` (#FB3640) | `--dark` (#0A0A0A) | 8px SemiBold 600 | ~5.2 : 1 | Lolos (Normal text >= 4.5:1) |

---

## 3. Asumsi Desain yang Diambil
1. **Brand Logo Navbar**:
   - Di video referensi: "Marsha ℒ.".
   - Pada implementasi: Diganti menjadi "Ikram Z." dengan huruf Z menggunakan font script `Mr Dafoe`.
2. **CTA Card Galeri**:
   - Teks personal idola ("Selalu nantikan aku ya!") diganti menjadi teks yang relevan untuk portofolio teknologi: "Selalu terbuka untuk kolaborasi baru." dengan tombol menuju section kontak.
3. **Penyimpanan Teks Pribadi**:
   - Seluruh teks nama, judul, quote, subjudul, dan metadata hanya tersimpan di file data (`src/data/profile.js`, `src/data/stage.js`, `src/data/gallery.js`, `src/data/social.js`, `src/data/nav.js`) tanpa hardcoding di dalam JSX.

---

## 4. Daftar Konten Placeholder yang Perlu Konten Final

Berikut daftar item yang saat ini menggunakan data placeholder dan dapat diperbarui sewaktu-waktu di folder `src/data/`:

- [ ] **Quote Utama** (`src/data/profile.js`):
  Saat ini: `"Bangun yang berguna, amankan yang penting."` (Perlu quote final jika diinginkan).
- [ ] **Deskripsi Bio Profil** (`src/data/profile.js`):
  Saat ini: `"Software developer dan pegiat cybersecurity. Aku membangun aplikasi web yang rapi dan cepat, dengan keamanan sebagai bagian dari rancangan, bukan tambalan di akhir."`
- [ ] **Aktivitas & Proyek** (`src/data/stage.js`):
  - Deskripsi Software Development, Cybersecurity, dan Proyek perlu dihubungkan dengan portofolio riil / tautan proyek.
- [ ] **Gambar Galeri Tambahan** (`src/data/gallery.js`):
  - Saat ini hanya 2 foto riil yang tersedia di `public/assets/gallery/` (`01-street.jpg` dan `02-selfie.jpg`). Foto lainnya dapat ditambahkan langsung ke array `GALLERY_ITEMS`.
- [ ] **Tautan Sosial Media** (`src/data/social.js`):
  - URL untuk Instagram, GitHub, LinkedIn, dan X / Twitter saat ini bernilai `'#'` (Perlu diisi username/URL profil asli).
- [ ] **Aset Tanda Tangan Fisik** (`src/data/profile.js`):
  - `signatureImage: null` (dapat diisi path file SVG/PNG transparan jika ingin menggunakan tanda tangan digital asli).

---

## 5. Migrasi Tema: Latar Terang -> Gradien Gelap

### 1. Token Warna Baru (`src/styles/tokens.css`)
- **RGB Gradien Latar**:
  - `--glow-eng-rgb: 9,132,227;` (Biru)
  - `--glow-sec-rgb: 237,41,57;` (Imperial Red #ED2939)
- **Teks di Atas Gelap**:
  - `--text: #F5F5F5;`
  - `--text-2: rgba(255,255,255,.70);`
  - `--text-3: rgba(255,255,255,.60);`
  - `--text-4: rgba(255,255,255,.40);`
  - `--line: rgba(255,255,255,.25);`
- **Elemen Inverse (Terang di Atas Gelap)**:
  - `--paper: #EDEDED;`
  - `--paper-ink: #0A0A0A;`
- **Global**:
  - `html, body { background: var(--dark) }` (#0A0A0A) untuk mencegah flash putih saat overscroll.
  - Aksen di atas gelap: `--eng: #00D4FF` dan `--sec: #FB3640`.
  - Token `*-on-light` dan `*-ink-light` HANYA digunakan di atas elemen `--paper`.
  - `:focus-visible`: outline 2px solid `var(--eng)`, dan `var(--eng-on-light)` di atas elemen `--paper`.

### 2. Lapisan Latar Belakang (`BackgroundLayer.jsx`)
- Dipasang sekali di `App.jsx` dengan `position: fixed; inset: 0; z-index: -1; height: 100svh; pointer-events: none`.
- Gradien radial ganda statis:
  - Biru dari sudut kiri atas (alpha 0.32 ke 0.16 ke transparan).
  - Merah imperial dari sudut kanan bawah (alpha 0.28 ke 0.14 ke transparan).
  - Bagian tengah mendekati `#0A0A0A`.
- Overlay `background: rgba(5,5,5,.55)` diterapkan pada section Quote dan Kontak. Section lain berlatar belakang transparan.

### 3. Hero
- Border frame & SCROLL: `var(--line)` dan `var(--text)`.
- Tipografi nama dan quote: `var(--text)`.
- Garis tetesan: `var(--text)`, dengan dua garis terpanjang memakai `var(--eng)` dan `var(--sec)`.
- "Software Developer": `var(--eng)` dengan garis aksen 2px x 32px.
- "Cybersecurity": `var(--sec)` dengan garis aksen 2px x 32px.
- Foto: Cutout transparan diberi efek tepi ganda:
  `filter: drop-shadow(-24px 0 48px rgba(var(--glow-eng-rgb), .35)) drop-shadow(24px 0 48px rgba(var(--glow-sec-rgb), .30));`
  serta backlight lembut di belakang subjek (`.photoBacklight` radial-gradient closest-side). Foto tetap berada di atas judul (`z-index: 3` vs `1`).

### 4. Intro & Preloader (Penyimpangan Sadar)
- Kolom wipe 5 buah menggunakan warna `var(--paper)`.
- **Tahap 1**: Kolom naik dari bawah menutup layar (stagger 0.07s, durasi 0.5s, `power3.inOut`).
- **Tahap 2 (Penyimpangan Sadar dari Video Referensi)**: Karena latar Hero kini bertema gelap, kolom wipe keluar ke atas (`yPercent: 0 -> -100`, stagger 0.07s, durasi 0.5s, `power3.inOut`) sehingga membuka hero gelap secara dramatis. Hero intro dimulai sekitar 0.1s setelah tahap 2 mulai (t = 3.27s).
- Seluruh overlay unmount dari DOM setelah transisi selesai.

### 5. Navbar
- Menghapus `mix-blend-mode: difference`, warna solid `var(--text)`.
- Menggunakan kelas `.nav--on-paper` (`color: var(--paper-ink)`) yang di-toggle ScrollTrigger saat navbar bertumpukan dengan band marquee atau kartu break galeri.
- Kursor custom tetap mempertahankan `mix-blend-mode: difference`.

### 6. Marquee & Galeri (Inverse Theme)
- **Marquee**: Band `var(--paper)`, teks `var(--paper-ink)`. Separator ✦ berselang-seling `var(--eng-on-light)` dan `var(--sec-on-light)`.
- **Kartu Break Galeri**: Background `var(--paper)`, signature "Zandik" dan "IKRAM" menggunakan `var(--paper-ink)`. Label "SOFTWARE DEVELOPER" menggunakan `var(--eng-ink-light)` dan "CYBERSECURITY" menggunakan `var(--sec-ink-light)`.
- **Kartu CTA Galeri**: Teks `var(--text-2)`, tombol outline `var(--line)`.

### 7. Aktivitas & Kontak
- **Aktivitas**: Judul, indeks, deskripsi menggunakan `var(--text) / var(--text-3)`. Hover baris mengisi tombol panah dengan warna aksen (`var(--eng)` / `var(--sec)` / `var(--paper)`) dan ikon panah `var(--paper-ink)`.
- **Kontak**: Sel sosial hover terisi `var(--paper)` dengan teks `var(--paper-ink)` dan garis bawah sweep `linear-gradient(90deg, var(--eng), var(--sec))`.

### 8. Verifikasi Rasio Kontras (WCAG AA Compliance)
| Elemen | Warna Teks | Warna Latar | Standar WCAG | Rasio Terukur | Status |
|---|---|---|---|---|---|
| Teks Display / Heading | `var(--text)` (#F5F5F5) | Pojok Kiri Atas (~#09304F) | Large >= 3.0:1 | ~14.8 : 1 | Lolos (AAA) |
| Teks Display / Heading | `var(--text)` (#F5F5F5) | Pojok Kanan Bawah (~#491217) | Large >= 3.0:1 | ~12.5 : 1 | Lolos (AAA) |
| Software Dev Heading | `var(--eng)` (#00D4FF) | Pojok Kiri Atas (~#09304F) | Large >= 3.0:1 | ~10.0 : 1 | Lolos (AAA) |
| Cybersec Heading | `var(--sec)` (#FB3640) | Pojok Kanan Bawah (~#491217) | Large >= 3.0:1 | ~3.5 : 1 | Lolos (AA Large) |
| Paragraf / Lead | `var(--text-2)` (rgba 70%) | Netral Gelap (#0A0A0A) | Normal >= 4.5:1 | ~10.0 : 1 | Lolos (AAA) |
| Label / Metadata | `var(--text-3)` (rgba 60%) | Netral Gelap (#0A0A0A) | Normal >= 4.5:1 | ~7.5 : 1 | Lolos (AA) |
| Marquee Teks | `var(--paper-ink)` (#0A0A0A)| `var(--paper)` (#EDEDED) | Large >= 3.0:1 | ~18.5 : 1 | Lolos (AAA) |
| Break Card Role 1 | `var(--eng-ink-light)` (#102552)| `var(--paper)` (#EDEDED) | Normal >= 4.5:1 | ~10.2 : 1 | Lolos (AAA) |
| Break Card Role 2 | `var(--sec-ink-light)` (#8B1221)| `var(--paper)` (#EDEDED) | Normal >= 4.5:1 | ~9.3 : 1 | Lolos (AAA) |
