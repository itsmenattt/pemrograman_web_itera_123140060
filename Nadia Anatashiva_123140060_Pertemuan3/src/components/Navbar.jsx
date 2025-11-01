import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Perpustakaan ITERA
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Beranda</Link>
          </li>
          <li className="nav-item">
            <Link to="/berita" className="nav-links">Berita</Link>
          </li>
          <li className="nav-item">
            <a href="#kontak" className="nav-links">Kontak</a>
          </li>
          {user && (
            <li className="nav-item nav-user">
              <span>Hi, {user.name}!</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;