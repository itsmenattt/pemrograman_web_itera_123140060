import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" style={{ textDecoration: 'underline' }}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;