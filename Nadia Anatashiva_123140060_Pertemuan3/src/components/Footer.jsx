import React, { useRef, useCallback } from 'react';

// Impor semua gambar dari folder assets di bagian atas
import emailLogo from '../assets/email-logo.jpg';
import instagramLogo from '../assets/Instagram.png';
import youtubeLogo from '../assets/youtube.png';

function Footer() {
  const emailInputRef = useRef(null);

  const handleSubscribe = useCallback(() => {
    const emailValue = emailInputRef.current.value;

    // Definisikan pola RegEx untuk validasi email
    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailValue) {
      alert('Mohon masukkan email Anda.');
      return;
    }

    // Gunakan RegEx untuk menguji format email
    if (!emailPattern.test(emailValue)) {
      alert('Format email tidak valid. Pastikan formatnya benar (contoh: email@domain.com).');
      return;
    }

    // Jika semua validasi lolos
    alert(`Terima kasih! ${emailValue} telah didaftarkan.`);
    emailInputRef.current.value = '';
    
  }, []);

  return (
    <footer id="kontak" className="site-footer">
      <div className="container footer-container">
        {/* Kolom 1: Tentang & Kontak */}
        <div className="footer-column">
          <div className="footer-widget">
            <h3>Tentang Kami</h3>
            <p>UPA Perpustakaan Institut Teknologi Sumatera berkomitmen menjadi pusat informasi yang mendukung kegiatan pendidikan dan riset.</p>
          </div>
          <div className="footer-widget">
            <h3>Kontak</h3>
            <div className="contact-item">
              <img src={emailLogo} alt="Email" />
              <a href="mailto:perpustakaan@itera.ac.id">perpustakaan@itera.ac.id</a>
            </div>
            <div className="contact-item">
              <img src={instagramLogo} alt="Instagram" />
              <a href="https://www.instagram.com/library.itera/" target="_blank" rel="noopener noreferrer">library.itera</a>
            </div>
            <div className="contact-item">
              <img src={youtubeLogo} alt="YouTube" />
              <a href="#" target="_blank" rel="noopener noreferrer">UPA Perpustakaan ITERA</a>
            </div>
          </div>
        </div>

        {/* Kolom 2: Website Penting & Jam Operasional */}
        <div className="footer-column">
          <div className="footer-widget">
            <h3>Website Penting</h3>
            <ul className="footer-links">
              <li><a href="#">Website ITERA</a></li>
              <li><a href="#">Website UPA TIK</a></li>
              <li><a href="#">SIAKAD ITERA</a></li>
            </ul>
          </div>
          <div className="footer-widget">
            <h3>Jam Operasional</h3>
            <ul className="footer-links">
              <li>Senin - Kamis: 08.00 - 16.00 WIB</li>
              <li>Jumat: 08.00 - 16.30 WIB</li>
            </ul>
          </div>
        </div>

        {/* Kolom 3: Berlangganan */}
        <div className="footer-column">
          <div className="footer-widget">
            <h3>Berlangganan Info Terbaru</h3>
            <p>Dapatkan update koleksi buku dan event terbaru dari kami.</p>
            <div className="subscribe-form">
              <input ref={emailInputRef} type="email" placeholder="Masukkan email Anda" />
              <button onClick={handleSubscribe}>Daftar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 UTS Pemrograman Web - Institut Teknologi Sumatera</p>
      </div>
    </footer>
  );
}

export default Footer;