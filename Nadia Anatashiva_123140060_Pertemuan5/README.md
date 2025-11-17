````markdown
# Sistem Manajemen Inventaris Skincare

![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat&logo=python&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=flat)

> **Tugas Praktikum Pemrograman Berorientasi Objek - Pertemuan 5**
>
> Sistem manajemen stok produk perawatan kulit (Skincare) berbasis CLI dengan implementasi lengkap konsep Object-Oriented Programming (OOP).

---

## Identitas Pengembang

| Atribut | Detail |
| :--- | :--- |
| **Nama** | **Nadia Anatashiva** |
| **NIM** | **123140060** |
| **Prodi** | **Teknik Informatika** |
| **Kampus** | **Institut Teknologi Sumatera (ITERA)** |

---

## Deskripsi Program

Program ini adalah aplikasi *Console Line Interface* (CLI) untuk mengelola inventaris toko skincare. Program dirancang untuk memenuhi standar tugas praktikum dengan menerapkan empat pilar utama OOP serta validasi data yang ketat.

### Implementasi Konsep OOP

| Konsep | Implementasi dalam Kode |
| :--- | :--- |
| **Inheritance** | Class `Serum` dan `Moisturizer` mewarisi atribut dan method dari parent class `SkincareItem`. |
| **Encapsulation** | Atribut `__stock` bersifat private dan hanya dapat diakses/dimodifikasi melalui *getter* dan *setter* untuk mencegah nilai negatif. |
| **Polymorphism** | Method `display_info()` dan `calculate_final_price()` diimplementasikan ulang (*override*) pada setiap subclass dengan perilaku berbeda. |
| **Abstraction** | Menggunakan `ABC` (*Abstract Base Class*) untuk menetapkan kontrak struktur yang wajib diikuti oleh setiap jenis item. |

### Fitur Fungsional

1.  **CRUD System**:
    * **Create**: Menambahkan produk baru (Serum atau Moisturizer) dengan validasi ID unik.
    * **Read**: Menampilkan seluruh daftar inventaris dengan format terstruktur.
    * **Update**: Memperbarui jumlah stok barang dengan validasi input angka.
    * **Delete**: Menghapus item dari inventaris berdasarkan ID.
2.  **Advanced Search**: Pencarian data yang mencakup **Nama Produk**, **Brand**, dan **ID Barang** (Case Insensitive).
3.  **Input Validation**: Penanganan *error* (Exception Handling) untuk mencegah *crash* saat pengguna memasukkan tipe data yang salah.

---

## Diagram Class (UML)

Berikut adalah struktur kelas yang dibangun dalam sistem ini:

```mermaid
classDiagram
    class SkincareItem {
        <<Abstract>>
        +item_id : str
        +name : str
        +brand : str
        +price : int
        -stock : int
        +display_info()*
        +calculate_final_price()*
    }

    class Serum {
        +active_ingredient : str
        +display_info()
        +calculate_final_price()
    }

    class Moisturizer {
        +skin_type : str
        +display_info()
        +calculate_final_price()
    }

    class SkincareStore {
        +inventory : list
        +add_item()
        +show_inventory()
        +update_stock()
        +delete_item()
        +search_item()
        -_find_item()
    }

    SkincareItem <|-- Serum : Inherits
    SkincareItem <|-- Moisturizer : Inherits
    SkincareStore o-- SkincareItem : Aggregates
````

-----

## Cara Menjalankan Program

1.  **Pastikan Python terinstal**:
    Pastikan Anda menggunakan Python versi 3.x.

2.  **Jalankan file utama**:
    Buka terminal di direktori proyek dan ketik perintah berikut:

    ```bash
    python main.py
    ```

-----

## Contoh Output Program

Berikut adalah tampilan interaksi program saat dijalankan:

```text
=== DAFTAR PRODUK SKINCARE ===
[SERUM] Somethinc - Niacinamide 10% (Niacinamide) | ID: S01 | Stok: 10 | Rp115,000
[MOISTURIZER] Skintific - Ceratides (For: All Skin Type) | ID: M01 | Stok: 5 | Rp169,000
========================================

=== Hasil Pencarian 'somethinc' ===
[SERUM] Somethinc - Niacinamide 10% (Niacinamide) | ID: S01 | Stok: 10 | Rp115,000

[INFO] Stok diperbarui: 10 -> 50
```

---

## Screenshots & Dokumentasi Visual

Berikut adalah dokumentasi visual dari jalannya program dan fitur-fitur utama:

### Interface Menu Utama
```
![Menu Utama](./screenshots/menu_utama.png)
```
*Keterangan: Tampilan menu utama dengan pilihan CRUD dan pencarian*

### Menambah Produk Baru
```
![Tambah Produk](./screenshots/tambah_produk.png)
```
*Keterangan: Proses penambahan produk Serum atau Moisturizer baru*

### Daftar Inventaris
```
![Daftar Inventaris](./screenshots/daftar_inventaris.png)
```
*Keterangan: Tampilan lengkap semua produk dengan ID, stok, dan harga*

### Fitur Pencarian
```
![Pencarian Produk](./screenshots/pencarian_produk.png)
```
*Keterangan: Hasil pencarian berdasarkan nama, brand, atau ID barang*

### Update Stok Barang
```
![Update Stok](./screenshots/update_stok.png)
```
*Keterangan: Proses perubahan jumlah stok produk*

### Validasi Input & Error Handling
```
![Error Handling](./screenshots/error_handling.png)
```
*Keterangan: Sistem validasi ketika input tidak sesuai tipe data*

---

## Cara Menambahkan Gambar

1. **Buat folder `screenshots`** di direktori proyek:
   ```bash
   mkdir screenshots
   ```

2. **Simpan gambar-gambar Anda** di folder tersebut dengan nama deskriptif (contoh: `menu_utama.png`, `tambah_produk.png`, dll).

3. **Perbarui path di README** sesuai nama file gambar Anda. Contoh format:
   ```markdown
   ![Deskripsi Gambar](./screenshots/nama_file.png)
   ```

4. **Commit dan push** ke GitHub:
   ```bash
   git add .
   git commit -m "Tambah screenshots dokumentasi program"
   git push origin main
   ```