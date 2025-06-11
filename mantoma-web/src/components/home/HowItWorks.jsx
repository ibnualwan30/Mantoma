import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Ambil Foto',
    description: 'Gunakan kamera smartphone atau pilih foto dari galeri. Pastikan gambar daun terlihat jelas dan pencahayaan cukup.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bgColor: 'bg-green-500',
    bgLight: 'bg-green-50',         
    borderColor: 'border-green-200'
  },
  {
    number: '02',
    title: 'Unggah & Proses',
    description: 'Sistem AI kami akan memproses gambar menggunakan teknologi CNN untuk menganalisis pola dan karakteristik daun.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    bgColor: 'bg-red-500',
    bgLight: 'bg-red-50',           
    borderColor: 'border-red-200'   
  },
  {
    number: '03',
    title: 'Analisis Cerdas',
    description: 'Model machine learning mengidentifikasi jenis penyakit dengan tingkat akurasi tinggi dalam hitungan detik.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bgColor: 'bg-orange-500',
    bgLight: 'bg-orange-50',        
    borderColor: 'border-orange-200'
  },
  {
    number: '04',
    title: 'Dapatkan Solusi',
    description: 'Terima hasil diagnosis lengkap dengan rekomendasi penanganan yang tepat dan praktis untuk diterapkan.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-teal-500',
    bgLight: 'bg-teal-50',          
    borderColor: 'border-teal-200'
  }
];

const HowItWorks = () => {
  return (
    <section className="section bg-gradient-to-br from-gray-50 to-gray-100" id="how-it-works">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja <span className="text-primary-600">Mantoma</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Deteksi penyakit daun tomat dengan mudah hanya dalam 4 langkah sederhana menggunakan teknologi AI terdepan
          </p>
        </div>

        {/* Desktop Design - Zigzag Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center mb-20 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                {/* Step Content */}
                <div className="w-1/2 px-8">
                  <div className={`${step.bgLight} ${step.borderColor} border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <div className="flex items-center mb-4">
                      <div className={`${step.bgColor} text-white p-3 rounded-full mr-4`}>
                        {step.icon}
                      </div>
                      <div className={`text-2xl font-bold ${step.bgColor.replace('bg-', 'text-')} bg-gradient-to-r ${step.bgColor.replace('bg-', 'from-')} ${step.bgColor.replace('bg-', 'to-').replace('500', '600')} bg-clip-text text-transparent`}>
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="w-1/2 flex justify-center">
                  <div className={`w-32 h-32 ${step.bgColor} rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300`}>
                    <div className="text-4xl font-bold">
                      {step.number}
                    </div>
                  </div>
                </div>


              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Design - Vertical Cards */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`${step.bgLight} ${step.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex items-start space-x-4">
                    <div className={`${step.bgColor} text-white p-3 rounded-full flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`text-sm font-bold ${step.bgColor.replace('bg-', 'text-')} mr-2`}>
                          LANGKAH {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;