# Weather Dashboard Pro

Sebuah aplikasi dashboard cuaca personal modern yang dibangun menggunakan ES6+ dan arsitektur modular. Aplikasi ini menampilkan informasi cuaca konteks-aware dalam tata letak 3 kolom, lengkap dengan otentikasi sederhana, penyimpanan data pengguna di localStorage, dan fitur Life Index untuk rekomendasi gaya hidup.

✨ Highlights
- Modern JS (ES6+) — modules, classes, async/await, template literals.
- Layout 3 kolom: lokasi saat ini, pencarian cuaca, dan perkiraan 7 hari.
- Life Index: rekomendasi berdasarkan suhu terasa (dehidrasi, olahraga, pakaian, dsb.).
- Data pengguna disimpan terisolasi di localStorage per akun.

## Demo & Screenshot

Tambahkan screenshot ke folder `assets/` lalu gunakan path di sini.

- Layar Login/Register: `assets/screenshot-login.png`
- Halaman Home (3 kolom): `assets/screenshot-home.png`
- Halaman Life Index: `assets/screenshot-life-index.png`

![Login]([Uploading image.png…])
![Home](assets/screenshot-home.png)
![Life Index](assets/screenshot-life-index.png)

> Jika belum ada gambar, hapus baris gambar atau ganti dengan screenshot Anda.

## Fitur Utama

- Register / Login sederhana (data pengguna disimpan di localStorage)
- Tampilan Home 3 kolom:
	- Kolom kiri: Cuaca real-time berdasarkan Geolocation (fallback ke wilayah tersimpan)
	- Kolom tengah: Pencarian cuaca
	- Kolom kanan: Perkiraan 7 hari untuk lokasi yang ditampilkan di kolom tengah
- Life Index: rekomendasi gaya hidup berdasarkan suhu terasa
- Pengguna dapat mengedit nama sapaan dan wilayah tersimpan

## Struktur Proyek (ringkasan)

```
src/
	├─ app.js
	├─ authManager.js
	├─ main.js
	├─ storageManager.js
	├─ uiManager.js
	├─ userDataManager.js
	└─ weatherManager.js
assets/
	└─ (gambar & aset lain)
index.html
src/style.css
```

## Cara Menjalankan (lokal)

1. Buka folder proyek di editor (VS Code atau lainnya).
2. Untuk melihat aplikasi cukup buka `index.html` di browser. Cara cepat:

```powershell
# Di PowerShell (Windows):
Start-Process index.html
```

3. Untuk pengembangan, rekomendasi: gunakan ekstensi Live Server di VS Code untuk reload otomatis.

## Catatan Teknis

- Semua modul JS menggunakan import/export (ES modules). Jika membuka file langsung tanpa server, pastikan browser mendukung module import dari file lokal.
- Data pengguna disimpan di localStorage menggunakan key yang terisolasi per username (`user_data_[username]`).

## Kontribusi

Sangat terbuka untuk kontribusi kecil: perbaikan UI/CSS, penanganan error, penambahan test, atau integrasi API cuaca berbeda. Silakan buat issue atau pull request.

## Lisensi

Letakkan lisensi yang Anda inginkan di sini (mis. MIT). Jika belum, tambahkan `LICENSE` file.

---


Terima kasih telah menggunakan/proyek ini — jika ingin bantuan menambahkan badge, GitHub Actions, atau dokumentasi tambahan, beri tahu saya!

