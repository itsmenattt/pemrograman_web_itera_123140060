import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import SectionCard from '../components/SectionCard.jsx';

function BeritaDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="container">
      <main>
        <SectionCard>
          {loading && <p>Memuat post...</p>}
          {error && <p style={{ color: 'red' }}>Gagal memuat post: {error}</p>}
          {post && (
            <article>
              <h2 style={{ textTransform: 'capitalize' }}>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          )}
          {/* Tambahkan class back-button di bawah ini */}
          <button onClick={handleBack} className="back-button">
            &larr; Kembali ke Daftar Berita
          </button>
        </SectionCard>
      </main>
    </div>
  );
}

export default BeritaDetail;