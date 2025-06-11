# Mantoma: Sistem Deteksi Dini Penyakit Daun Tomat

Mantoma adalah sistem deteksi dini penyakit daun tomat berbasis Convolutional Neural Network (CNN) yang dapat diakses melalui aplikasi web. Sistem ini dirancang untuk membantu petani mendeteksi penyakit daun tomat seperti Early Blight, Late Blight, dan Leaf Mold secara cepat, akurat, dan mudah dipahami.

## Fitur Utama

- **Deteksi Real-time**: Upload foto daun tomat dan dapatkan hasil diagnosis dalam hitungan detik
- **Akurasi Tinggi**: Model CNN dengan akurasi >90% berdasarkan dataset PlantVillage
- **Interface Responsif**: Desain mobile-first yang mudah digunakan di berbagai perangkat
- **Tanpa Login**: Akses langsung tanpa perlu registrasi untuk kemudahan penggunaan
- **Saran Penanganan**: Rekomendasi tindakan berdasarkan hasil deteksi penyakit

## Tech Stack

### Machine Learning
- **TensorFlow & Keras**: Untuk membangun dan melatih model CNN
- **TensorFlow.js**: Untuk inferensi langsung di browser
- **Python**: Bahasa pemrograman utama untuk ML pipeline

### Frontend
- **React.js**: Framework untuk membangun user interface
- **Tailwind CSS**: Untuk styling dan responsive design
- **Vite**: Module bundler untuk development dan build

### Backend
- **Node.js**: Runtime environment untuk server
- **Express.js**: Web framework untuk RESTful API
- **Multer**: Middleware untuk handling file upload

## Ketentuan

Pastikan memiliki:
- Node.js (v16 atau lebih baru)
- npm 
- Python 3.8+ (untuk development ML)
- Git

## Instalasi dan Setup

### 1. Clone Repository
```bash
git clone https://github.com/ibnualwan30/Mantoma.git
cd Mantoma

2. Setup Backend
bashcd mantoma-backend
npm install

3. Setup Frontend
bashcd mantoma-web
npm install
npm run dev
Model Performance

Dataset: PlantVillage Tomato Leaf Dataset (10,000+ images)
Classes: 4 (Healthy, Early Blight, Late Blight, Leaf Mold)
Accuracy: 92.5%
Precision: 91.8%
Recall: 90.3%
F1-Score: 91.0%

Penggunaan

Akses aplikasi melalui browser web
Upload foto daun tomat dengan kualitas yang baik
Tunggu proses analisis (2-3 detik)
Lihat hasil deteksi dan rekomendasi penanganan
Terapkan saran yang diberikan pada tanaman Anda

Tim Pengembang

Sandy Sanjaya (ML Engineer) 
Dimas Sukmana (ML Engineer) 
Afwa Hamzah Al Rasyid (ML Engineer) 
Reizka Fathia (Frontend Backend) 
Muhammad Ibnu Alwan (Frontend Backend ) 
