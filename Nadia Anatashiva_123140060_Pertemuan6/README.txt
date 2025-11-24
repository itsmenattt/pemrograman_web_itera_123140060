# 🎓 Aplikasi Manajemen Matakuliah API

Proyek ini adalah RESTful API sederhana untuk mengelola data Matakuliah di universitas. Dibangun menggunakan **Pyramid Framework** dan **PostgreSQL** sebagai tugas Praktikum Pemrograman Web Pertemuan 6.

![Pyramid](https://img.shields.io/badge/Framework-Pyramid-blue?style=for-the-badge&logo=python)
![Postgres](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)
![Python](https://img.shields.io/badge/Python-3.x-yellow?style=for-the-badge&logo=python)

## 📋 Fitur

* ✅ **Create:** Menambahkan data matakuliah baru.
* ✅ **Read:** Melihat daftar semua matakuliah dan detail per matakuliah.
* ✅ **Update:** Mengubah data matakuliah (SKS, Nama, Semester).
* ✅ **Delete:** Menghapus data matakuliah.

## 🛠️ Teknologi yang Digunakan

* **Language:** Python 3
* **Framework:** Pyramid 2.0
* **ORM:** SQLAlchemy
* **Database Migration:** Alembic
* **Database:** PostgreSQL

## 🚀 Cara Instalasi

Ikuti langkah ini untuk menjalankan proyek di komputer lokal:

### 1. Clone & Masuk Direktori
```bash
# Sesuaikan dengan nama folder tugasmu
cd nama_nim_pertemuan6/crud_pyramid_framework_postgreesql
````

### 2\. Setup Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3\. Install Dependensi

```bash
pip install -e .
pip install psycopg2-binary
```

### 4\. Konfigurasi Database

1.  Buat database kosong di PostgreSQL bernama `db_matakuliah`.
2.  Edit file `development.ini`, ubah baris `sqlalchemy.url`:
    ```ini
    sqlalchemy.url = postgresql://postgres:PASSWORDMU@localhost/db_matakuliah
    ```

### 5\. Migrasi Database

Jalankan perintah ini untuk membuat tabel otomatis:

```bash
alembic -c development.ini revision --autogenerate -m "init db"
alembic -c development.ini upgrade head
```

## 🏃‍♂️ Cara Menjalankan Server

```bash
pserve development.ini
```

Server akan berjalan di: `http://localhost:6543`

-----

## 🔗 Dokumentasi API Endpoints

Gunakan **Postman** atau **Thunder Client** untuk menguji endpoint berikut:

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/matakuliah` | Mengambil semua data matakuliah |
| `POST` | `/api/matakuliah` | Menambah matakuliah baru |
| `GET` | `/api/matakuliah/{id}` | Mengambil detail 1 matakuliah |
| `PUT` | `/api/matakuliah/{id}` | Update data matakuliah |
| `DELETE`| `/api/matakuliah/{id}` | Hapus data matakuliah |

### Contoh Request Body (JSON)

Gunakan format JSON ini untuk request **POST** dan **PUT**:

```json
{
  "kode_mk": "IF2024",
  "nama_mk": "Pemrograman Web Lanjut",
  "sks": 3,
  "semester": 4
}
```

-----

## 🧪 Cara Testing (cURL)

Jika ingin mengetes lewat terminal, gunakan perintah berikut:

**1. Tambah Data**

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF100", "nama_mk": "Web Dasar", "sks": 2, "semester": 2}'
```

**2. Lihat Data**

```bash
curl http://localhost:6543/api/matakuliah
```

-----

## 📸 Screenshot

*(Tambahkan screenshot hasil tes Postman/Thunder Client kamu di sini agar nilai tambah\!)*

-----

**Dibuat oleh:** Nadia Anatashiva - 123140060

```