# --- Data Awal Mahasiswa ---
# Tipe data dictionary
data_mahasiswa = [
    {
        'nama': 'Budi Santoso',
        'NIM': '123140001',
        'nilai_uts': 80,
        'nilai_uas': 85,
        'nilai_tugas': 90
    },
    {
        'nama': 'Ani Wijaya',
        'NIM': '123140002',
        'nilai_uts': 70,
        'nilai_uas': 75,
        'nilai_tugas': 80
    },
    {
        'nama': 'Candra Putra',
        'NIM': '123140003',
        'nilai_uts': 90,
        'nilai_uas': 92,
        'nilai_tugas': 88
    },
    {
        'nama': 'Dewi Lestari',
        'NIM': '123140004',
        'nilai_uts': 50,
        'nilai_uas': 60,
        'nilai_tugas': 55
    },
    {
        'nama': 'Eka Kurniawan',
        'NIM': '123140005',
        'nilai_uts': 65,
        'nilai_uas': 70,
        'nilai_tugas': 68
    }
]

# --- Fungsi Perhitungan ---
def hitung_nilai_akhir(uts: int, uas: int, tugas: int) -> float:
    """Menghitung nilai akhir berdasarkan bobot."""
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

# Fungsi menentukan Grade
def tentukan_grade(nilai_akhir: float) -> str:
    """Menentukan grade huruf berdasarkan nilai akhir."""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

# Fungsi untuk memproses data
def proses_data(data: list) -> list:
    """
    Helper function untuk memproses data mentah.
    Menambahkan 'nilai_akhir' dan 'grade' ke setiap dictionary mahasiswa.
    Ini penting agar data selalu ter-update untuk fungsi lain.
    """
    for mhs in data:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])
    return data

# --- Fungsi Fitur ---
def tampilkan_data(data: list):
    """
    Menampilkan seluruh data mahasiswa dalam format tabel.
    Memenuhi kriteria 'Implementasi input/output yang baik'.
    """
    if not data:
        print(">>> Tidak ada data untuk ditampilkan.")
        return

    # Cetak Header Tabel
    print("-" * 80)
    print(f"| {'NAMA':<20} | {'NIM':<10} | {'UTS':<5} | {'UAS':<5} | {'TUGAS':<7} | {'AKHIR':<6} | {'GRADE':<5} |")
    print("-" * 80)

    # Cetak Data
    for mhs in data:
        print(f"| {mhs['nama']:<20} | {mhs['NIM']:<10} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<7} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5} |")
    
    print("-" * 80)

# Fungsi input data baru
def input_data_baru() -> dict:
    """
    Meminta input dari user untuk data mahasiswa baru.
    Termasuk validasi input agar 'implementasi input/output baik'.
    """
    print("\n--- Menambah Data Mahasiswa Baru ---")
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")

    # Validasi input nilai (harus berupa angka)
    while True:
        try:
            uts = int(input("Masukkan Nilai UTS: "))
            uas = int(input("Masukkan Nilai UAS: "))
            tugas = int(input("Masukkan Nilai Tugas: "))
            break # Keluar loop jika semua input angka valid
        except ValueError:
            print(">>> ERROR: Nilai harus berupa angka. Silakan coba lagi.")

    return {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas
    }

# Fungsi cari nilai
def cari_nilai_ekstrem(data: list):
    """Mencari dan menampilkan mahasiswa dengan nilai tertinggi dan terendah."""
    if not data:
        print(">>> Data masih kosong.")
        return
        
    # Menggunakan 'max' dan 'min' dengan lambda key
    tertinggi = max(data, key=lambda mhs: mhs['nilai_akhir'])
    terendah = min(data, key=lambda mhs: mhs['nilai_akhir'])

    print(f"\nNilai Tertinggi diraih oleh: {tertinggi['nama']} (NIM: {tertinggi['NIM']}) dengan nilai {tertinggi['nilai_akhir']:.2f}")
    print(f"Nilai Terendah diraih oleh: {terendah['nama']} (NIM: {terendah['NIM']}) dengan nilai {terendah['nilai_akhir']:.2f}")

# Fungsi filter
def filter_by_grade(data: list):
    """Mencari mahasiswa berdasarkan grade tertentu."""
    if not data:
        print(">>> Data masih kosong.")
        return
        
    grade_cari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    
    # List comprehension untuk memfilter data
    hasil_filter = [mhs for mhs in data if mhs['grade'] == grade_cari]
    
    if not hasil_filter:
        print(f">>> Tidak ditemukan mahasiswa dengan grade '{grade_cari}'.")
    else:
        print(f"\n--- Mahasiswa dengan Grade '{grade_cari}' ---")
        tampilkan_data(hasil_filter)

# Fungsi hitung rata-rata
def hitung_rata_rata(data: list) -> float:
    """Menghitung rata-rata nilai akhir seluruh kelas."""
    if not data:
        return 0.0
        
    total_nilai = sum(mhs['nilai_akhir'] for mhs in data)
    return total_nilai / len(data)

# Fungsi menampilkan menu secara looping sampai pengguna menginput 0
def tampilkan_menu():
    """Menampilkan menu utama program."""
    print("\n--- Program Pengelolaan Nilai Mahasiswa ---")
    print("1. Tampilkan Data Nilai Mahasiswa")
    print("2. Tambah Data Mahasiswa")
    print("3. Cari Nilai Tertinggi dan Terendah")
    print("4. Filter Mahasiswa Berdasarkan Grade")
    print("5. Tampilkan Rata-rata Nilai Kelas")
    print("0. Keluar Program")
    return input("Pilih menu (0-5): ")

# --- Fungsi Utama (Main Loop) ---
def main():
    """Fungsi utama untuk menjalankan program."""
    data = data_mahasiswa # Salin data awal
    
    while True:
        # Selalu proses ulang data setiap loop untuk memastikan 
        # data baru (jika ada) ikut terhitung
        data = proses_data(data)
        
        pilihan = tampilkan_menu()

        if pilihan == '1':
            print("\n--- Data Nilai Mahasiswa ---")
            tampilkan_data(data)
        
        elif pilihan == '2':
            data_baru = input_data_baru()
            data.append(data_baru)
            print(">>> Data mahasiswa baru berhasil ditambahkan.")
        
        elif pilihan == '3':
            cari_nilai_ekstrem(data)
        
        elif pilihan == '4':
            filter_by_grade(data)
        
        elif pilihan == '5':
            rata_rata = hitung_rata_rata(data)
            print(f"\n>>> Rata-rata nilai akhir kelas adalah: {rata_rata:.2f}")
            
        elif pilihan == '0':
            print(">>> Terima kasih telah menggunakan program ini. Sampai jumpa!")
            break
            
        else:
            print(">>> Pilihan tidak valid. Silakan masukkan angka 0-5.")

# --- Eksekusi Program ---
if __name__ == "__main__":
    main()