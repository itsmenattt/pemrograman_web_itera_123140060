# Aplikasi Manajemen Tugas Mahasiswa

Aplikasi web sederhana yang dirancang untuk membantu mahasiswa dalam mengelola daftar tugas akademik mereka secara efisien. Aplikasi ini memungkinkan pengguna untuk menambah, melihat, menandai selesai, dan menghapus tugas. Semua data disimpan secara lokal di browser pengguna menggunakan `localStorage`.

## Screenshot Aplikasi

Berikut adalah beberapa tampilan dari aplikasi:

**1. Tampilan Utama & Form Tambah Tugas**


**2. Daftar Tugas dengan Filter**


**3. Notifikasi Validasi Form**


## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini murni menggunakan HTML, CSS, dan JavaScript (frontend), sehingga tidak memerlukan server atau instalasi khusus.

1.  **Clone repository ini atau unduh file proyek** ke komputer Anda.
2.  Pastikan Anda memiliki tiga file: `index.html`, `style.css`, dan `script.js` dalam satu folder yang sama.
3.  **Buka file `index.html`** menggunakan browser web modern apa pun (seperti Google Chrome, Firefox, atau Edge).
4.  Aplikasi siap digunakan!

## ✨ Fitur yang Diimplementasikan

-   **CRUD Tugas (Create, Read, Update, Delete):**
    -   **Menambah Tugas Baru:** Pengguna dapat menambahkan tugas dengan informasi nama tugas, mata kuliah, dan tanggal deadline.
    -   **Melihat Daftar Tugas:** Semua tugas ditampilkan dalam daftar yang rapi.
    -   **Menandai Tugas Selesai/Belum Selesai:** Status tugas dapat diubah dengan satu klik tombol. Tugas yang selesai akan ditandai secara visual.
    -   **Menghapus Tugas:** Tugas yang sudah tidak relevan dapat dihapus.
-   **Penyimpanan Lokal:**
    -   Aplikasi menggunakan `localStorage` browser untuk menyimpan semua data tugas. Data akan tetap ada meskipun browser ditutup atau halaman di-refresh.
-   **Validasi Form:**
    -   Input **Nama Tugas**, **Mata Kuliah**, dan **Deadline** wajib diisi.
    -   Input **Deadline** tidak boleh tanggal yang sudah lewat.
    -   Pemberitahuan (alert) akan muncul jika validasi gagal.
-   **Filter dan Pencarian:**
    -   **Pencarian:** Pengguna dapat mencari tugas berdasarkan nama tugas atau mata kuliah secara real-time.
    -   **Filter Status:** Tugas dapat difilter berdasarkan statusnya (Semua, Selesai, Belum Selesai).
-   **Statistik Tugas:**
    -   Aplikasi secara dinamis menampilkan **jumlah total tugas yang belum selesai**.

## 🔧 Penjelasan Teknis

### 1. Penggunaan `localStorage`

`localStorage` adalah mekanisme penyimpanan data di sisi klien (browser) yang memungkinkan data tetap tersimpan bahkan setelah jendela browser ditutup.

-   **Menyimpan Data:**
    Setiap kali ada perubahan pada data tugas (menambah, mengubah status, atau menghapus), array `tasks` yang berisi semua objek tugas akan diubah menjadi format string JSON dan disimpan ke `localStorage` dengan *key* `'tasks'`.
    ```javascript
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    ```
-   **Mengambil Data:**
    Saat halaman pertama kali dimuat, aplikasi akan mencoba mengambil data dari `localStorage` menggunakan *key* yang sama. Data yang diambil masih dalam format string JSON, sehingga perlu di-parse kembali menjadi array JavaScript. Jika tidak ada data (`localStorage.getItem('tasks')` mengembalikan `null`), aplikasi akan menggunakan array kosong sebagai nilai awal.
    ```javascript
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    ```

### 2. Validasi Form

Validasi dilakukan di sisi klien menggunakan JavaScript sebelum data tugas disimpan. Ini memastikan integritas data dasar.

-   **Pengecekan Input Kosong:**
    Sebelum form disubmit, skrip memeriksa apakah nilai dari input `taskName`, `courseName`, dan `taskDeadline` sudah diisi (tidak kosong setelah di-`trim`).
    ```javascript
    if (taskName === '' || courseName === '' || taskDeadline === '') {
        # Aplikasi Manajemen Tugas Mahasiswa

        Sebuah aplikasi web sederhana (HTML/CSS/JavaScript) untuk membantu mahasiswa mencatat dan mengelola tugas kuliah: menambah tugas, mengedit, menandai selesai/belum, menghapus, mencari, dan memfilter berdasarkan status. Semua data disimpan di browser pengguna menggunakan localStorage, sehingga tidak diperlukan server.

        ## Preview / Screenshot

        Letakkan minimal 3 screenshot di folder `images/` (buat folder `TUGAS1/images/`) dan beri nama `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`. Contoh referensi di bawah — ganti file/filepath jika Anda menggunakan nama lain.

        1) Tampilan utama & form tambah tugas
        ![Tampilan Utama](Nadia Anatashiva_123140060_Pertemuan1\image\tampilan-utama.png)

        2) Daftar tugas + filter & hasil pencarian
        ![Daftar Tugas dan Filter](Nadia Anatashiva_123140060_Pertemuan1\image\daftar-tugas-dan-filtering.png)

        3) Edit form (Selesai, Batal, Edit, dan Hapus)
        ![Edit dan Validasi](Nadia Anatashiva_123140060_Pertemuan1\image\edit-form.png)

        4) Validasi form (contoh notifikasi)
        ![Edit dan Validasi](Nadia Anatashiva_123140060_Pertemuan1\image\validasi-form.png)

        Jika Anda belum membuat screenshot, buka `index.html` di browser, ambil screenshot dari bagian-bagian yang ingin ditunjukkan, lalu simpan ke `TUGAS1/images/` dengan nama di atas.

        ## Cara Menjalankan Aplikasi

        1. Pastikan file berikut berada di folder `TUGAS1/`: `index.html`, `style.css`, `script.js`.
        2. Buka `index.html` di browser (double-click atau klik kanan -> Open with -> pilih browser seperti Chrome/Edge/Firefox).
        3. Aplikasi akan berjalan langsung tanpa instalasi.

        Catatan (Windows): jika file Anda berada di folder yang dilindungi, pastikan browser dapat mengakses file lokal. Tidak perlu server — namun Anda bisa menjalankan server statis sederhana (opsional) seperti `Live Server` di VS Code untuk kemudahan hot-reload.

        ## Daftar Fitur yang Telah Diimplementasikan

        - Menambah tugas baru (nama tugas, mata kuliah, deadline)
        - Menampilkan daftar tugas
        - Menandai tugas sebagai selesai / membatalkan tanda selesai
        - Mengedit tugas melalui modal
        - Menghapus tugas (dengan konfirmasi)
        - Pencarian real-time berdasarkan nama tugas atau mata kuliah
        - Filter berdasarkan status: Semua / Selesai / Belum Selesai
        - Menyimpan semua data di `localStorage` sehingga tersimpan setelah reload
        - Menampilkan jumlah tugas yang belum selesai (statistik sederhana)

        ## Penjelasan Teknis (localStorage & Validasi Form)

        Berikut ringkasan bagaimana bagian penting diimplementasikan di `script.js`.

        1) Inisialisasi data

        ```javascript
        // Ambil data tasks dari localStorage, jika tidak ada gunakan array kosong
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        ```

        2) Menyimpan perubahan ke localStorage

        ```javascript
        const saveTasks = () => {
          // Konversi array tasks ke string JSON dan simpan
          localStorage.setItem('tasks', JSON.stringify(tasks));
        };
        ```

        Setiap kali menambah, mengedit, menghapus, atau mengubah status tugas, fungsi ini dipanggil untuk memastikan keadaan terbaru tersimpan.

        3) Struktur objek tugas

        Setiap tugas disimpan sebagai objek sederhana:

        ```javascript
        {
          id: Date.now(),      // angka unik berbasis timestamp
          name: 'Nama tugas',
          course: 'Mata kuliah',
          deadline: 'YYYY-MM-DD',
          completed: false
        }
        ```

        4) Validasi Form (tambahan & pengecekan yang dilakukan sebelum simpan)

        - Pastikan semua field terisi (trim teks untuk menghindari spasi kosong):

        ```javascript
        if (taskName.trim() === '' || courseName.trim() === '' || taskDeadline === '') {
        # Aplikasi Manajemen Tugas Mahasiswa

        Sebuah aplikasi web sederhana (HTML/CSS/JavaScript) untuk membantu mahasiswa mencatat dan mengelola tugas kuliah: menambah tugas, mengedit, menandai selesai/belum, menghapus, mencari, dan memfilter berdasarkan status. Semua data disimpan di browser pengguna menggunakan localStorage, sehingga tidak diperlukan server.

        ## Preview / Screenshot

        Letakkan minimal 3 screenshot di folder `images/` (buat folder `TUGAS1/images/`) dan beri nama:

        - `screenshot-1.png` — Tampilan utama & form tambah tugas
        - `screenshot-2.png` — Daftar tugas dengan filter & pencarian
        - `screenshot-3.png` — Modal edit / notifikasi validasi

        Contoh referensi (ganti jika Anda menggunakan nama atau path berbeda):

        ![Tampilan Utama](images/screenshot-1.png)
        ![Daftar Tugas dan Filter](images/screenshot-2.png)
        ![Modal Edit dan Validasi](images/screenshot-3.png)

        > Jika belum ada screenshot: buka `index.html` di browser, ambil screenshot bagian-bagian yang ingin ditampilkan, lalu simpan ke `TUGAS1/images/` dengan nama di atas.

        ## Cara Menjalankan Aplikasi

        1. Pastikan file berikut berada di folder `TUGAS1/`: `index.html`, `style.css`, `script.js`.
        2. Buka `index.html` di browser (double-click atau klik kanan → Open with → pilih browser seperti Chrome/Edge/Firefox).
        3. Aplikasi berjalan langsung tanpa instalasi.

        Opsional (jalankan server statis lokal):

        Jika ingin menggunakan server lokal (mis. untuk Live Server atau CORS), Anda bisa menjalankan server sederhana dari terminal:

        PowerShell (Windows):
        ```powershell
        # Jika Anda menggunakan Python 3
        python -m http.server 8000
        # lalu buka http://localhost:8000/TUGAS1/
        ```

        ## Daftar Fitur yang Telah Diimplementasikan

        - Menambah tugas baru (nama tugas, mata kuliah, deadline)
        - Menampilkan daftar tugas
        - Menandai tugas sebagai selesai / membatalkan tanda selesai
        - Mengedit tugas melalui modal
        - Menghapus tugas (dengan konfirmasi)
        - Pencarian real-time berdasarkan nama tugas atau mata kuliah
        - Filter berdasarkan status: Semua / Selesai / Belum Selesai
        - Menyimpan semua data di `localStorage` sehingga tersimpan setelah reload
        - Menampilkan jumlah tugas yang belum selesai (statistik sederhana)

        ## Penjelasan Teknis (localStorage & Validasi Form)

        Berikut ringkasan bagaimana bagian penting diimplementasikan di `script.js`.

        ### 1) Penggunaan `localStorage`

        `localStorage` adalah mekanisme penyimpanan data di sisi klien (browser) yang memungkinkan data tetap tersimpan meski jendela browser ditutup.

        - Inisialisasi data (ambil dari localStorage atau gunakan array kosong):

        ```javascript
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        ```

        - Menyimpan data setelah perubahan:

        ```javascript
        const saveTasks = () => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        };
        ```

        Setiap kali menambah, mengedit, menghapus, atau mengubah status tugas, fungsi `saveTasks()` dipanggil agar keadaan terbaru tersimpan.

        ### 2) Struktur objek tugas

        Setiap tugas disimpan sebagai objek sederhana:

        ```javascript
        {
          id: Date.now(),
          name: 'Nama tugas',
          course: 'Mata kuliah',
          deadline: 'YYYY-MM-DD',
          completed: false
        }
        ```

        ### 3) Validasi Form

        Sebelum menyimpan tugas, aplikasi memvalidasi input di sisi klien:

        - Pastikan semua field terisi (menggunakan `trim()` untuk teks):

        ```javascript
        if (taskName.trim() === '' || courseName.trim() === '' || taskDeadline === '') {
          alert('Semua field harus diisi!');
          return;
        }
        ```

        - Pastikan deadline tidak di masa lalu:

        ```javascript
        const deadlineDate = new Date(taskDeadline);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (deadlineDate < today) {
          alert('Tanggal deadline tidak boleh tanggal yang sudah lewat.');
          return;
        }
        ```

        Jika validasi gagal, aplikasi menampilkan pesan (`alert`) dan tidak menyimpan data.

        ## Alur Singkat Implementasi (fungsi penting)

        - `addTask(name, course, deadline)`: membuat objek tugas baru, menambah ke array, panggil `saveTasks()` dan `renderTasks()`.
        - `toggleTaskComplete(id)`: toggle nilai `completed` pada tugas tertentu, lalu simpan dan render ulang.
        - `deleteTask(id)`: hapus tugas dari array, lalu simpan dan render.
        - `openEditModal(id)` / `updateTask(...)`: buka modal untuk edit lalu perbarui tugas.
        - `renderTasks()`: tampilkan daftar tugas sesuai filter/pencarian dan hitung jumlah tugas belum selesai.

        ---

        Jika Anda ingin, saya bisa:

        - Membuat folder `TUGAS1/images/` dan menambahkan 3 gambar placeholder kecil agar README menampilkan gambar secara langsung.
        - Menambahkan instruksi singkat untuk menjalankan server lokal lain (mis. Live Server extension).

        Beritahu saya pilihan Anda dan saya akan lanjutkan.
