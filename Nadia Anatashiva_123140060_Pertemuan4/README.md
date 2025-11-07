# 🎓 Student Grade Manager

![Python Badge](https://img.shields.io/badge/Made%20with-Python-blue?style=for-the-badge&logo=python)
![Terminal Badge](https://img.shields.io/badge/Type-CLI%20Application-green?style=for-the-badge)

Hai! Selamat datang di repositori **Student Grade Manager**. 👋

Ini adalah program Python sederhana berbasis CLI (Command Line Interface) yang dirancang untuk membantu dosen atau asisten praktikum 👨‍🏫 dalam mengelola dan menghitung nilai mahasiswa dengan cepat dan akurat. Tidak perlu lagi hitung manual satu per satu!

---

## ✨ Fitur Unggulan

Program ini dilengkapi dengan menu interaktif yang mudah digunakan:

* 📋 **Tampilkan Data Lengkap**
    Melihat seluruh data mahasiswa dalam format tabel yang rapi dan mudah dibaca.
* ➕ **Tambah Mahasiswa Baru**
    Input data mahasiswa dengan validasi otomatis (anti error saat salah input angka!).
* 🏆 **Cari Juara Kelas**
    Otomatis menemukan siapa pemilik nilai tertinggi dan terendah di kelas.
* 🔍 **Filter Grade**
    Ingin tahu siapa saja yang dapat 'A'? Fitur ini solusinya.
* 📊 **Statistik Kelas**
    Menghitung rata-rata performa kelas dalam sekali klik.

---

## 📝 Sistem Penilaian

Program ini menggunakan bobot persentase standar untuk menentukan nilai akhir dan grade huruf.

### ⚖️ Bobot Nilai
| Komponen | Bobot |
| :--- | :--- |
| **UTS** | 30% |
| **UAS** | 40% |
| **Tugas** | 30% |

Rumus perhitungan:
$$Nilai Akhir = (UTS \times 0.30) + (UAS \times 0.40) + (Tugas \times 0.30)$$

### 🔠 Konversi Grade
* ✅ **A** : $\geq$ 80
* ✅ **B** : $\geq$ 70
* ✅ **C** : $\geq$ 60
* ⚠️ **D** : $\geq$ 50
* ❌ **E** : $<$ 50

---

## 🚀 Cara Menjalankan

Sangat mudah! Pastikan kamu sudah menginstal **Python 3.x** di komputermu.

1.  **Clone atau Download** repositori ini.
2.  Buka terminal/CMD di folder proyek.
3.  Jalankan perintah:
    ```bash
    python main.py
    ```
4.  Program siap digunakan! 🎉

---

## 📂 Struktur Data

Untuk yang penasaran dengan *behind the scene*-nya, data mahasiswa disimpan dalam bentuk `list of dictionaries` seperti ini:

```python
[
    {
        'nama': 'Budi Santoso',
        'NIM': '123140001',
        'nilai_uts': 80,
        'nilai_uas': 85,
        'nilai_tugas': 90,
        # 'nilai_akhir' dan 'grade' akan dihitung otomatis oleh program
    }
]