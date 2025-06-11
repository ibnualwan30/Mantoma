import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container-custom py-16 text-center">
        <svg
          className="h-24 w-24 text-primary-600 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          404 - Halaman Tidak Ditemukan
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dihapus.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFound;