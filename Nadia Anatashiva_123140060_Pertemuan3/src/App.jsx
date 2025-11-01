import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Beranda from './pages/Beranda.jsx';
import Berita from './pages/Berita.jsx';
import NotFound from './pages/NotFound.jsx';
import BeritaDetail from './pages/BeritaDetail.jsx'; // <-- Impor halaman baru

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/berita" element={<Berita />} />
        {/* Tambahkan rute dinamis di bawah ini */}
        <Route path="/berita/:postId" element={<BeritaDetail />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;