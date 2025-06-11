import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container-custom py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6 lg:mb-8">
              Mantoma: <span className="text-primary-600">Sistem Deteksi Dini</span> Penyakit Daun Tomat
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 lg:mb-10 leading-relaxed">
              Deteksi penyakit daun tomat secara cepat dan akurat menggunakan teknologi Machine Learning. Cukup ambil foto dan dapatkan hasil diagnosis dalam hitungan detik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link to="/detection" className="btn btn-primary text-center text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                Mulai Deteksi
              </Link>
              <Link to="/about" className="btn btn-secondary text-center text-lg px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="/images/gambar1.png"
              alt="Tanaman Tomat Sehat"
              className="rounded-xl shadow-lg max-h-64 sm:max-h-80 lg:max-h-[500px] xl:max-h-[600px] object-cover w-full max-w-sm lg:max-w-none hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
