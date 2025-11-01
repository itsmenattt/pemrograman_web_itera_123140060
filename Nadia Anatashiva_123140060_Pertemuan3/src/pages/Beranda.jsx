import React, { useMemo } from 'react';
import SectionCard from '../components/SectionCard.jsx';

// [BARU] Impor gambar dari folder assets di bagian atas
import suasanaImg from '../assets/suasana.jpg';

function Beranda() {
  // Implementasi useMemo tetap di sini, tapi akan ditampilkan lebih natural
  const libraryFacts = useMemo(() => {
    const facts = [
      { id: 1, text: 'Diresmikan pada 30 November 2015.' },
      { id: 2, text: 'Memiliki koleksi lebih dari 18.000 judul buku.' },
      { id: 3, text: 'Luas bangunan mencapai 1.147 m².' },
    ];
    // console.log('Menghitung fakta perpustakaan...'); // Boleh dihapus jika tidak perlu
    return facts.map(fact => <li key={fact.id}>{fact.text}</li>);
  }, []);

  return (
    <div className="container">
      <main>
        <SectionCard title="Selamat Datang di Perpustakaan ITERA GK2">
          <p>Unit Pelaksana Akademik (UPA) Perpustakaan ITERA, yang sebelumnya dikenal sebagai UPT Perpustakaan, mulai beroperasi secara resmi pada 30 November 2015. Peresmian ini bersamaan dengan penetapan Organisasi dan Tata Kerja (OTK) ITERA melalui Peraturan Menteri Riset, Teknologi, dan Pendidikan Tinggi (Permenristekdikti) Nomor 37 Tahun 2015.</p>
          
          {/* [DIUBAH] Gunakan variabel 'suasanaImg' yang sudah diimpor */}
          <img src={suasanaImg} alt="Suasana Perpustakaan ITERA" className="card-image" />
          
          <p>Sebagai pusat informasi serta layanan akademik, perpustakaan ITERA memiliki koleksi sebanyak 18.746 judul dengan total 25.880 eksemplar. Koleksi tersebut meliputi berbagai jenis bahan pustaka, antara lain buku teks, karya tugas akhir, buku referensi, bacaan fiksi, catatan kuliah, buku pengembangan diri, majalah, jurnal, buletin, hingga prosiding.</p>
          <p>Dengan luas bangunan mencapai 1.147 m², perpustakaan ini dilengkapi beragam fasilitas yang mendukung kegiatan akademik, pengembangan diri, maupun rekreasi ilmiah bagi seluruh civitas akademika ITERA.</p>
        </SectionCard>
        
        {/* Bagian Hooks yang lama dihapus dan diganti dengan ini */}
        <SectionCard title="Fakta Menarik Perpustakaan ITERA">
          <ul>{libraryFacts}</ul>
        </SectionCard>
      </main>
    </div>
  );
}

export default Beranda;