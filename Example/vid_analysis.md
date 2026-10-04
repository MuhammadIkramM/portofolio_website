# VIDEO_ANALYSIS.md — Marsha Lenathea Portfolio

**Sumber:** `Example/porto_example.mp4` — screen recording browser, 1024×576, 30 fps, 35,7 detik.
**Viewport situs di dalam video:** ±1010×560 px (title bar browser ±16 px di atas, scrollbar native ±14 px di kanan).
**Metode:** ekstraksi frame 1–10 fps, pengukuran per frame (30 fps) untuk timing, warna diambil langsung dari piksel.
**Akurasi timestamp:** ±0,1 dtk untuk pengamatan visual, ±0,03 dtk untuk yang bertanda "terukur".

**Legenda keyakinan**

- ✅ terlihat jelas di frame
- 🔶 terukur atau inferensi kuat dari beberapa frame
- ❓ asumsi, jangan dianggap pasti, verifikasi dulu

---

## 1. Abaikan (bukan bagian website)

| Elemen | Keterangan |
|---|---|
| Logo TikTok + `@gustiawan.dev` | Watermark TikTok, pindah-pindah pojok. Jangan dibuat sebagai komponen. |
| End card hitam + search bar TikTok | Mulai 31,73 dtk sampai akhir. Bukan bagian situs. |
| Title bar browser ("Marsha Lenathea — Portfolio") | Crop area ±16 px teratas kalau mengambil gambar dari frame. |
| Taskbar Windows | Sempat muncul di dasar frame sekitar 14 dan 31 dtk. |
| Kursor panah Windows | Terlihat di rekaman. Bukan elemen situs (kursor custom situs dibahas di bagian 6). |
| Kredit asli `Priadiprakasa` | Ganti dengan placeholder `[NAMA SAYA]` di semua tempat (hero, footer, copyright). |

---

## 2. Koreksi terhadap catatan sebelumnya (ChatGPT)

| Klaim catatan lama | Yang sebenarnya terlihat di video |
|---|---|
| Ada widget TikTok floating dan outro search bar | Watermark dan end card bawaan TikTok. Bukan fitur situs. ✅ |
| Navbar tampil sepanjang halaman, menu `About / Stage / Gallery / Social` | Navbar **tidak tampil di hero**. Muncul setelah hero (±7,3 dtk). Menu: `01 PROFIL · 02 AKTIVITAS · 03 QUOTE · 04 GALERI · 05 KONTAK`, logo kiri `Marsha ℒ.` ✅ |
| "Dark intermission" navy `#0D0D14` | Itu **preloader** setelah halaman di-reload. Background `#1F1F1F`, ada counter 000→100 ✅ |
| Transisi awal = block geometris acak / clip-path | **5 kolom vertikal sama lebar** naik dari bawah, stagger kiri→kanan ✅🔶 |
| Marquee: background off-white, border atas-bawah, font kecil | Band **hitam miring**, teks putih besar, separator `✦`, rotasi berubah mengikuti scroll ✅🔶 |
| "Di atas panggung" = accordion (ikon +, tinggi mengembang) | **Bukan accordion.** Daftar baris dengan hover: thumbnail mengikuti kursor, judul jadi italic, tombol panah terisi ✅ |
| Gallery = grid/masonry 3×3 dengan row-span | **Horizontal scroll** (scroll vertikal menggeser track ke kiri), judul tetap di tempat ✅ |
| `--bg: #F4F3EF` (warm off-white), `--dark: #0D0D14` | Terukur `#EDEDED` (netral) dan `#1F1F1F` (abu gelap netral) 🔶 |
| Social: "highlight putih = selection/active" | Hover: garis bawah putih menyapu masuk, lalu sel terisi putih; kursor membesar ✅ |
| Cursor effects "opsional" | Ada **kursor custom** yang jelas terlihat (bagian 6) ✅ |
| About revisit dan hero revisit = section ganda | Benar bukan section ganda: user klik nav lalu scroll balik ✅ |
| Footer = elemen sederhana | Footer punya baris kredit, tanggal script, tombol "kembali ke atas", `MARSHA` raksasa, copyright ✅ |

---

## 3. Timeline (waktu absolut video)

| Waktu (dtk) | Kejadian | Keyakinan |
|---|---|---|
| 0,00–0,37 | Hero sudah tampil. Video dimulai di tengah sesi sebelum halaman di-refresh. | ✅ |
| 0,40 | **Hard cut** ke preloader (reload halaman). Bukan transisi. | 🔶 terukur |
| 0,4–0,5 | Sekilas teks Jepang tampil statis sebelum animasi mulai (flash sebelum JS jalan). Kemungkinan bug, **jangan ditiru**. | ❓ |
| 0,5–0,9 | Karakter `マーシャ` naik satu per satu dari bawah (mask), stagger ≈0,1 dtk. | ✅ |
| 0,5–1,9 | Counter `000→100` + garis progres mengisi dari kiri. Nilai: 000@0,5 · 007@0,8 · 020@1,0 · 067@1,3 · 094@1,6 · 100@1,9 | 🔶 |
| 1,0–1,3 | Stroke teks Jepang tampak menebal. Kemungkinan font fallback → web font (FOUT), bukan animasi. | ❓ |
| 1,9–2,2 | Tahan di 100. | ✅ |
| 2,2–2,5 | Konten preloader fade out (opacity). | ✅ |
| 2,5–2,77 | Layar kosong `#1F1F1F`. | 🔶 |
| **2,77–3,4** | **Block wipe 5 kolom `#EDEDED`** naik dari bawah. Kolom 1 mulai ±2,77, berikutnya tiap ≈+0,07 dtk. Tiap kolom ≈0,45–0,5 dtk, easing in-out. | 🔶 terukur |
| 3,3–3,7 | Foto hero fade-in. | ✅ |
| 3,4–3,9 | Huruf `M A R S H A` muncul satu per satu kiri→kanan (naik dari mask), stagger ≈0,08–0,1 dtk. | ✅ |
| 3,7–4,0 | `マ ー シ ャ` di atas judul muncul kiri→kanan. | ✅ |
| 3,9–4,4 | Blok teks kecil (JIKOSOUKAI, tanggal, Current News, The Question Is) fade dari abu ke hitam. | ✅ |
| 4,2–4,8 | Garis-garis vertikal "menetes" di kanan atas tumbuh ke bawah (stagger). Border frame ikut muncul. | ✅ |
| 4,6–5,5 | `Lenathea` (script) **ditulis** dari kiri ke kanan (clip reveal ±0,9 dtk). | ✅ |
| 5,6 | User mulai scroll. | ✅ |
| 5,6–6,1 | Hero naik mengikuti scroll. | ✅ |
| 6,1–6,3 | Exit hero: huruf `MARSHA` melebar ke luar, `Lenathea` dan border memudar jadi abu. | 🔶 (scrub? ❓) |
| 5,7–7,0 | Band marquee masuk dari bawah lalu keluar atas. Rotasi terukur −1,47° (6,2) → −0,57° (6,9) → 0° (7,0). | 🔶 |
| 6,7–7,2 | Heading "Halo, aku Marsha!" reveal (naik dari mask, per baris). | ✅ |
| 7,2–8,2 | Foto About: dari hitam-putih menjadi berwarna sambil terungkap dari bawah. | ✅ |
| 7,3–7,4 | **Navbar muncul** (fade). | ✅ |
| 8,2–9,4 | Paragraf, 4 sel data, garis tipis muncul bertahap. | ✅ |
| 9,9–10,3 | Blockquote "Perkenalan" tampil. | ✅ |
| ±10,5–11,0 | Transisi ke Aktivitas, heading "Di atas panggung" reveal. | ✅ |
| ±11–15,8 | User menghover baris Teater/Media/Event (thumbnail, italic, panah). Terlihat jelas di 15,0–15,8 (Event). | ✅ |
| 15,8–16,5 | Background berubah ke gelap (section Quote). | ✅ |
| 16,0–16,9 | Kata-kata quote berubah dari redup ke putih bertahap. | ✅ |
| 16,4–17,2 | Atribusi `~Marsha Lenathea~` (script) ditulis kiri→kanan. | ✅ |
| 17,4–18,2 | Keluar dari Quote, masuk "Potret Marsha" (bg kembali terang). | ✅ |
| 18,2–22,9 | **Horizontal scroll** galeri (judul diam, kartu bergeser kiri). Kecepatan tertinggi ±20,2–23,4. | 🔶 |
| 23,0–23,6 | Masuk section Kontak (gelap), heading "Terima kasih sudah mampir!". | ✅ |
| 23,6–24,4 | 4 sel link muncul bergantian. `MARSHA` raksasa naik dari bawah. | ✅ |
| 24,9–25,4 | Hover JKT48: garis bawah putih menyapu, lalu sel terisi putih, kursor jadi lingkaran hitam besar. | ✅ |
| 27,0–27,7 | Kursor membesar di menu `PROFIL`. | ✅ |
| 27,8–28,8 | Klik nav → smooth scroll cepat (±1 dtk) ke atas melewati Potret dan Aktivitas, berhenti di About. | 🔶 |
| 30,0–30,8 | Scroll naik: band marquee lewat, kembali ke hero. Navbar hilang saat masuk hero (±30,4). | ✅ |
| 30,8–31,7 | Hero tampil. **Intro tidak diulang** (hanya terjadi saat load). | ✅ |
| 31,73 | Hard cut ke end card TikTok. Abaikan. | ✅ |

---

## 4. Design tokens

### Warna (diambil dari piksel; kompresi video bisa menggeser ±2 level)

```css
:root {
  --bg:        #EDEDED;   /* terukur, netral */
  --dark:      #1F1F1F;   /* terukur: preloader, quote, kontak, kartu hitam, band marquee */
  --ink:       #111111;   /* ❓ piksel tergelap pada judul hero = #000000; kemungkinan #000 / #111 */
  --on-dark:   #EDEDED;   /* ❓ teks putih pada gelap tampak sama dengan --bg */
  --line:      rgba(17,17,17,.7);        /* ❓ garis tipis 1px pada terang */
  --line-dark: rgba(237,237,237,.25);    /* ❓ garis tipis pada gelap */
}
```

### Tipografi (**tebakan terbaik**, Agent wajib mencocokkan lewat perbandingan visual)

| Peran | Ciri yang terlihat | Kandidat |
|---|---|---|
| Display serif (judul `MARSHA`, "Halo, aku", "Di atas", "Potret", "Teater/Media/Event", quote italic) | Didone kontras ekstrem, hairline sangat tipis, ball terminal | Bodoni Moda (paling mungkin), Playfair Display |
| Script (`Marsha!`, `panggung`, `Lenathea`, `mampir!`, tanggal, `Selalu nantikan aku ya!`) | Cursive/roundhand. Mungkin **lebih dari satu family** (ada yang kontras tinggi, ada yang lebih kasual/monoline) ❓ | Pinyon Script, Allura, Great Vibes, Mrs Saint Delafield, Sacramento |
| Serif teks (paragraf, nilai data, judul kecil hero, nama link sosial) | Serif buku, nilai data/link tampil bold | Newsreader, Crimson Pro, Source Serif (teks); Playfair Display Bold/Bold Italic (judul kecil hero) |
| Sans kecil (nav, label, caption, "SCROLL", "GESER UNTUK MELIHAT") | Geometris ringan, huruf kapital + letter-spacing lebar, ±9–11 px | Jost |
| Jepang (`マーシャ`) | Sans, stroke tegas | Noto Sans JP |

### Ukuran perkiraan pada viewport ±1010 px (🔶 ±15%, pakai `clamp()` / `vw`)

| Elemen | Ukuran |
|---|---|
| `MARSHA` hero | cap-height ≈125 px → font-size ≈175 px (≈17,5vw), membentang x 62→966 |
| `MARSHA` footer | cap-height ≈165 px → ≈235 px (≈23vw), hampir selebar viewport |
| "Halo, aku" / "Di atas" / "Potret" | ≈80–85 px |
| `Marsha!` (script) | ≈90 px |
| "Teater / Media / Event" | ≈56 px |
| Quote italic | ≈52 px (≈5vw), rata tengah |
| "Terima kasih sudah" | ≈50 px; `mampir!` ≈60 px |
| Paragraf About | ≈16 px, line-height ≈1,7, lebar maks ≈480 px |
| Label / nav / caption | ≈9–11 px, uppercase, tracking lebar |

### Garis dan border

- Hampir semua pemisah berupa garis 1 px tipis (nav, baris Aktivitas, sel data, sel sosial).
- Border frame hero: inset ≈20 px dari tepi viewport, abu gelap, 1–1,5 px. ✅
- Garis atas daftar Aktivitas dan garis atas sel data tampak sedikit lebih gelap/tebal. 🔶
- Tidak ada rounded corner pada foto dan kartu. Bentuk bulat hanya untuk tombol panah dan kursor. ✅

---

## 5. Spesifikasi per section

### 5.1 Preloader (0,4–3,4 dtk)

- Layar penuh `#1F1F1F`. ✅
- Tengah: `マ ー シ ャ` putih, letter-spacing sangat lebar (jarak antar karakter ≈ lebar satu karakter), tinggi karakter ≈50 px (≈5vw). ✅
- Di bawahnya, container sempit (≈190 px, ≈18vw, **lebih sempit dari teks Jepang**): garis 1 px abu-gelap, bagian terisi putih mengikuti counter; di bawah garis: kiri `MARSHA LENATHEA` (sans caps kecil, tracking lebar), kanan counter 3 digit `000`. ✅
- Urutan: karakter naik → counter 0→100 (≈1,4 dtk) → tahan → fade out konten (≈0,3 dtk) → wipe 5 kolom. 🔶

**Block wipe (terukur):**

```
kolom     : 5 kolom, lebar sama (20%), warna --bg (#EDEDED), naik dari bawah (yPercent 100 → 0)
mulai     : kol1 ≈2,77s · kol2 ≈2,87s · kol3 ≈2,93s · kol4 ≈3,00–3,07s · kol5 ≈3,1s
stagger   : ≈0,065–0,07 s (kiri → kanan)
durasi    : ≈0,45–0,5 s per kolom
easing    : in-out (pelan–cepat–pelan)  → mulai dengan power3.inOut
efek      : membentuk "tangga" menurun ke kanan saat berlangsung
```

### 5.2 Hero

- Frame border tipis inset ≈20 px. ✅
- Foto = **cutout transparan di atas teks judul**. Menutupi `R` dan sebagian besar `S`; lengkung atas `S` mengintip di atas bahu. Foto setinggi hero, pusat ≈47% lebar, kepala menyentuh ≈20 px dari atas. ✅
- `M A R S H A` serif besar, huruf merata dari tepi kiri ke kanan (cocok dengan `display:flex; justify-content:space-between`). ✅
- `マ ー シ ャ` di atas judul sisi kiri, ≈35 px, tracking lebar. ✅
- `Lenathea` script, di bawah `HA` sisi kanan, ≈50 px. ✅
- Kiri atas: badge kecil `JK|48` + logo `NEW ERA`, lalu `JIKOSOUKAI` (serif bold) + paragraf 3 baris. ✅
- Kanan atas: `Jakarta,09-01-2006` (script) + `Project By [NAMA SAYA]`, serta **7–8 garis vertikal tipis menggantung** dari border atas (panjang bervariasi 20–60 px, jarak ≈12 px, tumbuh ke bawah dengan stagger). ✅
- Kiri bawah: `Current News !!` (serif bold italic) + paragraf rata tengah. ✅
- Kanan bawah: `The Question Is:` (serif semibold) + kutipan bold kecil + `~Marsha Lenathea~`. ✅
- Tepi kanan: teks vertikal `SCROLL` + garis vertikal di bawahnya. ✅
- **Tidak ada navbar di hero.** ✅
- **Exit hero saat scroll:** hero bergerak naik, lalu pada ≈6,1–6,3 dtk huruf melebar ke luar, `Lenathea` dan border memudar. 🔶 (apakah scrub atau animasi terpicu ❓)

### 5.3 Marquee

- Band hitam (`--dark`), tinggi ≈82 px (≈8vw), **berada setelah hero** (alur normal, tidak menimpa hero). ✅
- Teks putih besar (≈40 px): `Marsha Lenathea ✦ マーシャ ✦ JKT48 ✦ New Era ✦ …` berulang. Latin pakai serif italic Didone, `マーシャ` sans, separator `✦` (bintang 4 sudut). ✅
- Arah: **ke kiri**, kecepatan konstan ≈1,05 px/frame ≈ 32 px/s (≈3vw/dtk) pada viewport ±1010 px. 🔶 terukur
- Band **miring**. Rotasi **berubah mengikuti scroll**: ≈−1,5° saat masuk menuju 0° saat keluar. Terukur −1,47° (6,2 dtk) → −0,57° (6,9 dtk). 🔶 Nilai awal sebelum 6,2 dtk tidak terukur (≈−2° ❓).

### 5.4 Navbar

- Muncul **setelah hero**, hilang lagi saat kembali ke hero. ✅ (jangan tampil di hero)
- Tanpa background. Logo kiri `Marsha ℒ.` (serif + `ℒ` script). Kanan: lima item `⁰¹ PROFIL`, `⁰² AKTIVITAS`, `⁰³ QUOTE`, `⁰⁴ GALERI`, `⁰⁵ KONTAK`: nomor superscript kecil + label caps sans tracking. ✅
- **Scroll-spy:** item aktif digarisbawahi 1 px. ✅
- Warna: hitam di atas terang, putih di atas gelap, dan **teks berbalik putih saat melewati band marquee hitam** (terlihat di 30,2 dtk). Sangat mungkin `mix-blend-mode: difference` dengan teks putih. 🔶
- Klik item = smooth scroll ke section (±1 dtk untuk jarak jauh). 🔶

### 5.5 About "Halo, aku Marsha!" (nav: PROFIL)

- Label atas: garis pendek + `01  PROFIL`. ✅
- Kiri: foto potret rasio ≈4:5 (≈341×425 px, tanpa rounded), caption di bawah: `NO. 001 — PORTRAIT` (kiri) dan `JKT48` (kanan). ✅
- Kolom vertikal `マ ー シ ャ` (karakter ditumpuk tegak, ≈16 px) di antara foto dan heading. ✅
- Kanan: `Halo, aku` (display serif) + baris kedua `Marsha!` (script besar). ✅
- Paragraf serif. ✅
- Grid data 2×2, tiap sel: garis atas 1 px, label kecil caps abu (`NAMA`, `LAHIR`, `GRUP`, `JULUKAN`), nilai serif bold ≈16 px. ✅
- Blockquote: garis vertikal kiri, label `PERKENALAN  自己紹介` (caps kecil + teks Jepang), isi script miring: *"Seperti pizza yang dinanti-nantikan semua orang, selalu nantikan aku ya!"* ✅
- **Reveal:** heading naik dari mask per baris, foto dari hitam-putih ke warna sambil naik/terungkap, teks dan data muncul bertahap. ✅

### 5.6 Aktivitas "Di atas panggung" (nav: AKTIVITAS)

- Label `02  AKTIVITAS`. Heading `Di atas` (display) + `panggung` (script), paragraf pendek di kanan. Garis tebal/gelap di atas daftar. ✅
- 3 baris, tinggi ≈112 px, garis tipis pemisah. Isi tiap baris: indeks `(01)` kecil abu (kiri), judul display besar (`Teater`, `Media`, `Event`), deskripsi serif kecil (≈x 507), tombol panah lingkaran outline `→` (kanan). ✅
- **Hover (terlihat jelas):** ✅
  - judul berganti ke **italic**
  - tombol panah **terisi gelap** (transisi abu→hitam terlihat di tengah animasi)
  - **thumbnail foto kecil (≈96×120 px) muncul dan mengikuti kursor** (agak tertinggal/lerp)
  - kursor custom membesar di atasnya
- **Tidak ada** ikon `+`, tidak ada konten yang mengembang. ✅

### 5.7 Quote (nav: QUOTE)

- Background `--dark` penuh. Label `03  THE QUESTION IS` kecil di tengah atas. ✅
- *"It's not impossible, it's just hard."* display serif italic, putih, rata tengah, 2 baris. ✅
- Muncul **per kata** (redup → putih). Terlihat di 16,0–16,9 dtk. Kemungkinan scrub terhadap scroll (❓).
- Atribusi `~Marsha Lenathea~` script, ditulis kiri→kanan (16,4–17,2 dtk). ✅
- Ornamen: huruf Jepang raksasa sangat samar di latar (opacity ≈4–6%), terlihat di ≈16,4–16,8 dtk. 🔶

### 5.8 Potret (nav: GALERI)

- Label `04  GALERI`; heading `Potret` (display) + `Marsha` (script); kanan: `GESER UNTUK MELIHAT →`. ✅
- **Horizontal scroll:** heading tetap di tempat, track kartu bergeser ke kiri (kemungkinan pin + scrub ❓ implementasi, tetapi perilakunya terlihat jelas). ✅
- Kartu portrait tinggi ≈325 px, **lebar bervariasi** (≈216–260 px), jarak ≈24 px, offset vertikal sedikit berbeda antar kartu (mis. NO. 03 lebih turun ≈10 px). Caption di bawah tiap kartu: `NO. 0X` kiri, kata kategori kanan (caps kecil tracking lebar). ✅
- Urutan: `NO. 01 STREET` · **kartu hitam** · `NO. 02 SELFIE` · `NO. 03 EDITORIAL` · `NO. 04 GOLDEN HOUR` · `NO. 05 STUDIO` · `NO. 06 TEATER` · `NO. 07 SOFT` · `NO. 08 KOSTUM` · `NO. 09 PORTRAIT` · **kartu CTA**. ✅
- **Kartu hitam:** `--dark`, kiri atas `JKT48 — NEW ERA` (kecil), `マーシャ` putih vertikal besar di kanan, kiri bawah `MARSHA LENATHEA` (kecil). ✅
- **Kartu CTA:** `Selalu nantikan aku ya!` (script abu, besar, 3 baris) + tombol pill outline `KONTAK →`. ✅

### 5.9 Kontak + Footer (nav: KONTAK)

- Background `--dark`. Label `05  KONTAK`. Heading `Terima kasih sudah` (display) + `mampir!` (script) di baris bawah. ✅
- 4 sel sejajar penuh lebar (≈222 px, tinggi ≈58 px), garis atas/bawah + pemisah vertikal tipis: `Instagram ↗`, `X / Twitter ↗`, `TikTok ↗`, `JKT48 ↗` (nama serif bold ≈18 px, panah kanan). ✅
- **Hover sel:** garis bawah putih menyapu dari kiri → sel terisi putih → teks jadi gelap, panah `↗` menjadi `→`, kursor jadi lingkaran hitam besar. ✅
- Baris kredit: kiri `PROJECT BY [NAMA SAYA]` (caps kecil tracking), tengah `Jakarta, 09-01-2006` (script) + titik, kanan `KEMBALI KE ATAS` + tombol lingkaran outline `↑`. ✅
- `MARSHA` raksasa putih membentang selebar viewport. ✅
- Paling bawah, rata tengah: `© 2026 [NAMA SAYA] — MARSHA LENATHEA PORTFOLIO` (≈8 px caps). ✅
- Reveal: link muncul bergantian, `MARSHA` naik dari bawah (mask). ✅

---

## 6. Sistem global

### Kursor custom ✅🔶

- Titik kecil hitam (≈6 px) mengikuti kursor dengan sedikit lag, terlihat di hero dan About.
- Di atas elemen interaktif (nav, baris Aktivitas, kartu galeri, sel sosial) berubah menjadi **lingkaran ≈30–40 px**.
- Warnanya **berbalik terhadap latar** (putih di atas gelap, hitam di atas putih, hijau/biru di atas foto ungu/pink). Sangat konsisten dengan `mix-blend-mode: difference` + warna putih. 🔶
- Kursor native Windows tetap terlihat, jadi ini follower tambahan (bukan `cursor: none`) ❓.

### Smooth scroll 🔶

- Gerak scroll terlihat halus (Lenis). Klik nav ke jarak jauh ≈1 dtk dengan ease cepat-lalu-melambat.

### Pola animasi masuk (berulang di seluruh situs)

| Pola | Dipakai pada |
|---|---|
| Mask rise (teks naik dari balik overflow) | Karakter preloader, huruf MARSHA, heading About/Aktivitas, `MARSHA` footer |
| Write-on (clip kiri→kanan) | `Lenathea`, atribusi quote |
| Fade abu→hitam | Teks kecil hero |
| Word reveal (redup→terang) | Quote |
| Stagger | Sel data, link sosial, garis tetesan, karakter Jepang |
| Hitam-putih → warna + reveal | Foto About |
| Kolom wipe | Preloader→hero |
| Horizontal scrub | Galeri |

---

## 7. Titik awal implementasi (angka dari pengukuran di atas, tetap dikalibrasi lewat perbandingan visual)

```js
// Preloader → wipe → hero intro (t=0 setara 0,4 dtk di video)
const tl = gsap.timeline();
tl.from('.pre__char', { yPercent: 110, duration: .5, stagger: .1, ease: 'power3.out' }, .1)
  .to(counter, { value: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: render }, .1)   // 000→100
  .to('.pre__bar', { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left' }, .1)
  .to('.pre__inner', { opacity: 0, duration: .3 }, '+=.3')
  .fromTo('.wipe__col', { yPercent: 100 },
          { yPercent: 0, duration: .5, stagger: .07, ease: 'power3.inOut' }, '+=.25')
  .add(heroIntro, '-=.1');

// heroIntro (urutan, bukan angka pasti)
// foto fade → huruf MARSHA mask-rise stagger .09 → マーシャ stagger .1
// → teks kecil fade → border + garis tetesan scaleY stagger → Lenathea write-on (~.9s)
```

- **Marquee:** konten digandakan, `x` menggeser ke kiri ≈3vw/dtk. Rotasi band di-scrub dengan ScrollTrigger (≈−2° → 0°).
- **Navbar:** tampil/sembunyi dengan ScrollTrigger di akhir hero. Teks putih + `mix-blend-mode: difference`. Scroll-spy untuk garis bawah.
- **Kursor:** `gsap.quickTo` untuk x/y (lag kecil), scale naik di elemen `[data-cursor]`.
- **Aktivitas hover:** satu thumbnail yang di-`quickTo` mengikuti kursor, gambar diganti per baris.
- **Galeri:** `ScrollTrigger` pin + scrub, `x: -(track.scrollWidth - innerWidth)`.
- **Sosial hover:** pseudo-element garis bawah (`scaleX`) lalu `::before` fill putih (`scaleY` / clip-path).

---

## 8. Konten teks (untuk `src/data/*.js`)

```text
HERO
  JIKOSOUKAI
  "Seperti pizza yang dinanti-nantikan semua orang, selalu nantikan aku ya! Halo aku Marsha!"
  Jakarta,09-01-2006  /  Project By [NAMA SAYA]
  Current News !!
  "Marsha adalah member JKT48 yang dijuluki sebagai anime hidup karena parasnya yang sangat rupawan."
  The Question Is:  /  "It's not impossible, it's just hard"  /  ~Marsha Lenathea~
  SCROLL

MARQUEE   : Marsha Lenathea ✦ マーシャ ✦ JKT48 ✦ New Era ✦ (ulang)

PROFIL
  "Marsha Lenathea adalah member JKT48 yang dijuluki sebagai anime hidup karena parasnya
   yang sangat rupawan. Lahir di Jakarta, saat ini ia aktif di berbagai kegiatan teater dan media."
  NAMA: Marsha Lenathea | LAHIR: Jakarta, 9 Januari 2006 | GRUP: JKT48 | JULUKAN: Anime hidup
  PERKENALAN 自己紹介 : "Seperti pizza yang dinanti-nantikan semua orang, selalu nantikan aku ya!"

AKTIVITAS  ("Dari teater sampai layar kaca — tempat-tempat Marsha bisa kamu temui.")
  (01) Teater : "Tampil di panggung teater JKT48 bersama member lainnya."
  (02) Media  : "Hadir di berbagai konten dan program media."
  (03) Event  : "Bertemu penggemar di berbagai event dan acara JKT48."

QUOTE : 03 THE QUESTION IS — "It's not impossible, it's just hard." — ~Marsha Lenathea~

GALERI : lihat urutan di bagian 5.8 (9 foto + kartu hitam + kartu CTA)

KONTAK : "Terima kasih sudah mampir!" · Instagram · X / Twitter · TikTok · JKT48
         PROJECT BY [NAMA SAYA] · Jakarta, 09-01-2006 · KEMBALI KE ATAS
         © 2026 [NAMA SAYA] — MARSHA LENATHEA PORTFOLIO
```

Judul tab browser: `Marsha Lenathea — Portfolio` ✅

---

## 9. Aset

- Foto di video berasal dari situs asli dan beresolusi rendah. **Pakai hanya sebagai placeholder**, jangan di-upscale berlebihan, dan ganti dengan foto yang berhak kamu pakai sebelum dipublikasikan.
- **Hero wajib PNG cutout transparan** (background dihapus, mis. `rembg`). Tanpa itu efek foto menutupi `R`/`S` tidak akan jadi.
- Foto yang sama tampak dipakai ulang (foto About = `NO. 09 PORTRAIT`). Ini aman untuk placeholder.
- Letakkan semua gambar di `public/assets/` dan referensikan dari file data supaya mudah diganti.

---

## 10. Asumsi dan hal yang belum pasti (verifikasi sebelum dianggap benar)

1. **Font** semua hanya tebakan visual (bagian 4).
2. Warna teks `--ink` (`#000` vs `#111`) dan warna garis tidak bisa dipastikan akibat kompresi video.
3. Rotasi awal band marquee sebelum 6,2 dtk tidak terukur.
4. Exit hero (huruf melebar, memudar) dipicu scroll-scrub atau animasi terpicu: tidak bisa dibedakan.
5. Kata-kata quote muncul via scrub atau trigger sekali: tidak bisa dibedakan.
6. Mekanisme galeri horizontal (pin + scrub vs yang lain): perilakunya jelas, implementasinya tidak.
7. Navbar memakai `mix-blend-mode: difference` atau ganti kelas per section: bukti kuat ke arah `difference`, tetapi belum final.
8. Video direkam di viewport ≈1010 px. **Perilaku responsif tablet/mobile tidak terlihat sama sekali.** Rancang sendiri secara konservatif dan jangan klaim itu replikasi.
9. Hover galeri dan hover kartu tidak terlihat jelas. Jangan menambah efek besar tanpa bukti.
10. Intro (preloader, wipe, hero reveal) hanya terjadi saat load halaman dan **tidak diulang** saat scroll balik ke hero.
11. Flash teks Jepang statis di 0,4–0,5 dtk dan perubahan ketebalan stroke di 1,0–1,3 dtk kemungkinan efek samping (FOUC/FOUT), bukan desain. Hindari dengan memuat font lebih dulu.
