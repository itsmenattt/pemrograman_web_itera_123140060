import React from 'react';
import useFetch from '../hooks/useFetch.js';
import SectionCard from '../components/SectionCard.jsx';
import { Link } from 'react-router-dom'; // <-- Impor Link

function Berita() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=15');

  return (
    <div className="container">
      <main>
        <SectionCard title="Berita & Artikel Terbaru">
          {loading && <p>Memuat berita...</p>}
          {error && <p style={{ color: 'red' }}>Gagal memuat data: {error}</p>}
          {posts && posts.map(post => (
            <article key={post.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '20px', paddingBottom: '20px' }}>
              {/* Ubah h3 menjadi Link */}
              <Link to={`/berita/${post.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ textTransform: 'capitalize' }}>{post.title}</h3>
              </Link>
              <p>{post.body}</p>
            </article>
          ))}
        </SectionCard>
      </main>
    </div>
  );
}

export default Berita;