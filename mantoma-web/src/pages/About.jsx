import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang Mantoma
            </h1>
            <p className="text-xl text-gray-700">
              Sistem Deteksi Dini Penyakit Daun Tomat Berbasis Convolutional Neural Network (CNN)
            </p>
          </div>
        </div>
      </section>

      {/* Card Grid Layout */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Pernyataan Masalah */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pernyataan Masalah</h2>
                <p className="text-gray-700 mb-4">
                  Saat ini, banyak petani tomat di Indonesia mengalami kesulitan dalam mendeteksi dini penyakit daun pada tanaman mereka. Penyakit tanaman seperti karat daun dan serangan jamur Phytophthora sering kali menyebar dengan cepat tanpa disadari sejak awal.
                </p>
                <p className="text-gray-700">
                  Akibatnya, banyak petani melakukan penanganan yang tidak tepat, termasuk penggunaan pestisida secara berlebihan, yang justru memperburuk kondisi tanaman serta meningkatkan biaya produksi.
                </p>
              </div>
            </div>

            {/* Card 2: Solusi Mantoma */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Solusi Mantoma</h2>
                <p className="text-gray-700 mb-4">
                  Mantoma hadir sebagai solusi teknologi untuk membantu petani mengenali jenis penyakit daun tomat secara dini dan akurat, agar mereka dapat melakukan penanganan yang sesuai sejak awal.
                </p>
                <p className="text-gray-700">
                  Dengan menggunakan teknologi machine learning, khususnya Convolutional Neural Network (CNN), Mantoma mampu menganalisis gambar daun tomat dan mengidentifikasi jenis penyakit yang menyerang dengan tingkat akurasi yang tinggi.
                </p>
              </div>
            </div>

            {/* Card 3: Fitur Utama */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
                <ul className="space-y-2 mb-4 list-disc pl-6">
                  <li className="text-gray-700">Deteksi beberapa jenis penyakit daun tomat umum (Early Blight, Late Blight, Leaf Mold, dll.)</li>
                  <li className="text-gray-700">Antarmuka pengguna yang sederhana dan mudah digunakan</li>
                  <li className="text-gray-700">Hasil diagnosis instan dengan rekomendasi penanganan</li>
                  <li className="text-gray-700">Tidak memerlukan registrasi atau login</li>
                  <li className="text-gray-700">Dapat diakses dari perangkat smartphone maupun desktop</li>
                </ul>
              </div>
            </div>

            {/* Card 4: Visi Kami */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
                <p className="text-gray-700">
                  Kami percaya bahwa teknologi dapat menjadi jembatan yang efektif untuk mengatasi kesenjangan pengetahuan dalam bidang pertanian. Dengan Mantoma, kami berharap dapat memberikan kontribusi nyata dalam meningkatkan produktivitas petani tomat dan mendukung ketahanan pangan lokal melalui penerapan teknologi kecerdasan buatan yang tepat guna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;