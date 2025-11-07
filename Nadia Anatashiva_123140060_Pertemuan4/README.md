# Program Pengelolaan Nilai Mahasiswa

Program ini adalah aplikasi berbasis Command Line Interface (CLI) sederhana yang ditulis dalam bahasa Python untuk membantu pengelolaan data nilai mahasiswa. Program ini dapat menghitung nilai akhir berdasarkan bobot tertentu, menentukan grade huruf, dan menyediakan berbagai fitur analisis data dasar.

## Fitur Utama

Program ini memiliki menu interaktif dengan fitur-fitur berikut:

1.  **Tampilkan Data**: Melihat seluruh data mahasiswa dalam format tabel yang rapi.
2.  **Tambah Data**: Menginput data mahasiswa baru (Nama, NIM, Nilai UTS, UAS, Tugas) dengan validasi input angka.
3.  **Cari Nilai Ekstrem**: Menampilkan mahasiswa dengan nilai tertinggi dan terendah di kelas.
4.  **Filter Grade**: Mencari dan menampilkan daftar mahasiswa berdasarkan grade tertentu (misal: hanya grade 'A').
5.  **Rata-rata Kelas**: Menghitung nilai rata-rata akhir dari seluruh mahasiswa.

## Formula Penilaian

Nilai akhir dihitung dengan bobot sebagai berikut:

  * **UTS**: 30%
  * **UAS**: 40%
  * **Tugas**: 30%

$$Nilai Akhir = (UTS \times 0.30) + (UAS \times 0.40) + (Tugas \times 0.30)$$

Kriteria Grade:

  * **A**: $\geq$ 80
  * **B**: $\geq$ 70
  * **C**: $\geq$ 60
  * **D**: $\geq$ 50
  * **E**: $<$ 50

## Cara Menjalankan Program

### Prasyarat

  * Python 3.x terinstal di sistem Anda.

### Langkah-langkah

1.  Simpan kode program dalam file bernama `main.py` (atau nama lain yang diinginkan).
2.  Buka terminal atau command prompt.
3.  Jalankan perintah berikut:
    ```bash
    python main.py
    ```

## Struktur Data

Data mahasiswa disimpan sementara dalam `list` of `dictionary`. Setiap entri mahasiswa memiliki struktur awal:

```python
{
    'nama': 'Nama Mahasiswa',
    'NIM': '123456',
    'nilai_uts': 80,
    'nilai_uas': 85,
    'nilai_tugas': 90
}
```

Program akan secara otomatis menambahkan *key* `'nilai_akhir'` dan `'grade'` setelah data diproses.