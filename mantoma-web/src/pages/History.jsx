import React, { useState, useEffect } from 'react';
import api from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load history when component mounts
  useEffect(() => {
    loadHistory();
  }, [currentPage]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getDetectionHistory(currentPage, 5);
      
      if (response.success) {
        setHistory(response.data.history);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading history:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus deteksi ini?')) {
      return;
    }

    try {
      await api.deleteDetection(id);
      // Reload history after deletion
      loadHistory();
    } catch (error) {
      console.error('Error deleting detection:', error);
      alert('Gagal menghapus deteksi: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat riwayat deteksi...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Riwayat Deteksi
            </h1>
            <p className="text-lg text-gray-700">
              Lihat hasil deteksi penyakit daun tomat yang telah dilakukan sebelumnya
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {history.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum Ada Riwayat Deteksi
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai deteksi penyakit daun tomat untuk melihat riwayat di sini
              </p>
              <a href="/detection" className="btn btn-primary">
                Mulai Deteksi
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <div className="md:w-1/3">
                        <img
                          src={`http://localhost:5000${item.image.url}`}
                          alt={item.image.originalName}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                              item.result.status === 'healthy' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.result.status === 'healthy' ? '✅ Sehat' : '⚠️ Terdeteksi Penyakit'}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {item.result.disease}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(item.timestamp)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-semibold ${
                              item.result.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {item.result.confidence.toFixed(1)}%
                            </span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Hapus deteksi"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {item.result.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.result.treatment.slice(0, 2).map((treatment, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {index + 1}. {treatment.length > 40 ? treatment.substring(0, 40) + '...' : treatment}
                            </span>
                          ))}
                          {item.result.treatment.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                              +{item.result.treatment.length - 2} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sebelumnya
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? 'text-white bg-primary-600 border border-primary-600'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;