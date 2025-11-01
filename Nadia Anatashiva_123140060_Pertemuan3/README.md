# 📚 UTS Pemrograman Web — UPA Perpustakaan ITERA GK2

*NIM:* 123140060
*Nama:* Nadia Anatashiva

Aplikasi ini adalah implementasi sistem perpustakaan berbasis React (Vite) yang dibuat untuk memenuhi Ujian Tengah Semester mata kuliah Pemrograman Web. Proyek ini mendemonstrasikan penggunaan komponen React, hooks, context, routing, dan data fetching.

## ✅ Status Kelengkapan Fitur

Ringkasan fitur yang telah diimplementasikan:

- Komponen, Props, dan State: ✅ Minimal 5 komponen fungsional; penggunaan PropTypes pada SectionCard.jsx.
- React Hooks: ✅ Custom hook (useFetch.js), useMemo, useCallback, useRef (sesuai kebutuhan komponen).
- Data Fetching: ✅ Fetch API dengan penanganan loading & error (useFetch.js).
- Routing: ✅ React Router dengan dynamic route /berita/:postId, navigasi programatis (useNavigate), dan halaman 404 (NotFound.jsx).
- State Management: ✅ Context API (AuthContext.jsx) untuk state pengguna global.

## 🛠 Persiapan & Instalasi

Aplikasi menggunakan Vite. Ikuti langkah di bawah untuk menjalankan aplikasi secara lokal.

1) Klon repositori

bash
git clone https://github.com/<username_anda>/uts_pemrograman_web_123140060.git
cd uts_pemrograman_web_123140060


2) Instal dependensi

bash
npm install


3) Jalankan development server

bash
npm run dev


Aplikasi akan tersedia di http://localhost:5173/ (default Vite).

## 📂 Struktur Proyek (Ringkas)

uts_pemrograman_web_123140060/

- public/
	- assets/       # gambar dan aset statis
- src/
	- components/   # Navbar, Footer, SectionCard, dll.
	- context/      # AuthContext.jsx
	- hooks/        # useFetch.js
	- pages/        # Beranda, Berita, BeritaDetail, NotFound
	- App.jsx       # routing utama
	- main.jsx      # entry point & provider
	- style.css     # styling global
- index.html
- package.json