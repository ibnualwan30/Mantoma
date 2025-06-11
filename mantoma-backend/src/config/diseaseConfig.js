const path = require("path");

const tomatoDiseaseConfig = {
  // Model config
  model: {
    path: path.join(__dirname, "../models/model.json"),
    inputShape: [224, 224, 3],
    confidenceThreshold: 0.7,
  },

  // Class names
  classes: [
    "Bacterial_spot",
    "Early_blight",
    "Healthy",
    "Late_blight",
    "Leaf_Mold",
    "Septoria_leaf_spot",
    "Target_Spot",
    "Two-spotted_spider_mite",
    "Yellow_Leaf_Curl_Virus",
    "mosaic_virus",
  ],

  // Disease data
  diseaseDatabase: {
    Bacterial_spot: {
      disease: "Bacterial Spot",
      status: "diseased",
      scientificName: "Xanthomonas campestris",
      description:
        "Bacterial spot menyebabkan bercak gelap pada daun, batang, dan buah. Daun bisa menguning dan rontok.",
      symptoms: [
        "Bercak kecil berwarna coklat atau hitam",
        "Daun menguning dan mudah gugur",
        "Buah terdapat lesi gelap",
      ],
      treatment: [
        "Hindari penyiraman dari atas",
        "Gunakan benih bebas penyakit",
        "Semprotkan fungisida tembaga",
      ],
      prevention: [
        "Rotasi tanaman",
        "Sanitasi alat dan lahan",
        "Gunakan varietas tahan penyakit",
      ],
      biologicalControl: ["Bacillus subtilis", "Streptomyces spp."],
    },

    Early_blight: {
      disease: "Early Blight",
      status: "diseased",
      scientificName: "Alternaria solani",
      description:
        "Penyakit ini menyebabkan bercak coklat konsentris pada daun tua dan dapat menyebar ke batang dan buah.",
      symptoms: [
        "Bercak bulat dengan lingkaran konsentris",
        "Daun menguning lalu gugur",
        "Luka gelap di batang dan buah",
      ],
      treatment: [
        "Semprot fungisida (chlorothalonil, mancozeb)",
        "Buang daun terinfeksi",
      ],
      prevention: [
        "Rotasi tanaman",
        "Penyiraman di pagi hari",
        "Jarak tanam cukup",
      ],
      biologicalControl: ["Trichoderma harzianum", "Bacillus subtilis"],
    },

    Healthy: {
      disease: "Tanaman Sehat",
      status: "healthy",
      description:
        "Daun tomat dalam kondisi sehat. Tidak ada penyakit yang terdeteksi. Lanjutkan perawatan yang baik untuk menjaga kesehatan tanaman.",
      maintenance: [
        "Siram secara rutin tanpa berlebihan",
        "Pastikan mendapat sinar matahari 6-8 jam sehari",
        "Berikan pupuk organik secara teratur",
        "Pantau kondisi tanaman secara berkala",
        "Jaga kebersihan area tanam dari gulma",
      ],
      careInstructions: [
        "Penyiraman teratur",
        "Sinar matahari 6-8 jam",
        "Pupuk organik",
        "Pemeriksaan rutin",
        "Area tanam bersih",
      ],
      treatment: [
        "Lanjutkan penyiraman rutin 2-3 kali seminggu, hindari genangan air",
        "Pastikan tanaman mendapat sinar matahari langsung 6-8 jam per hari",
        "Berikan pupuk organik atau kompos setiap 2-3 minggu sekali",
        "Lakukan pemeriksaan daun dan batang secara berkala untuk deteksi dini",
        "Jaga kebersihan area tanam, buang gulma dan daun kering",
        "Berikan mulsa organik di sekitar tanaman untuk menjaga kelembapan",
        "Lakukan pruning atau pemangkasan cabang yang tidak produktif",
      ],
      prevention: [
        "Rotasi tanaman setiap musim tanam",
        "Jaga jarak tanam yang cukup untuk sirkulasi udara",
        "Gunakan benih atau bibit berkualitas",
        "Hindari penyiraman berlebihan yang dapat menyebabkan jamur",
      ],
    },

    Late_blight: {
      disease: "Late Blight",
      status: "diseased",
      scientificName: "Phytophthora infestans",
      description:
        "Late blight menyebabkan bercak basah pada daun, batang, dan buah. Penyakit ini berkembang cepat dalam kondisi lembap.",
      symptoms: [
        "Bercak gelap dan basah pada daun",
        "Putih keabu-abuan di bawah daun",
        "Buah busuk dengan lesi gelap",
      ],
      treatment: [
        "Buang bagian terinfeksi",
        "Gunakan fungisida sistemik",
        "Hindari kelembapan berlebih",
      ],
      prevention: [
        "Sirkulasi udara baik",
        "Penyiraman di pangkal tanaman",
        "Rotasi tanaman",
      ],
      biologicalControl: ["Trichoderma spp.", "Pseudomonas fluorescens"],
    },

    Leaf_Mold: {
      disease: "Leaf Mold",
      status: "diseased",
      scientificName: "Fulvia fulva",
      description:
        "Leaf mold menyerang bagian bawah daun, menyebabkan bercak kuning di atas dan jamur berwarna di bawah.",
      symptoms: [
        "Bercak kuning di permukaan atas daun",
        "Jamur kehijauan atau abu di bawah daun",
        "Daun menggulung dan mengering",
      ],
      treatment: [
        "Ventilasi rumah kaca yang baik",
        "Gunakan fungisida organik",
        "Buang daun terinfeksi",
      ],
      prevention: [
        "Jaga kelembapan rendah",
        "Penyiraman di pagi hari",
        "Rotasi tanaman",
      ],
      biologicalControl: ["Trichoderma viride", "Bacillus subtilis"],
    },

    Septoria_leaf_spot: {
      disease: "Septoria Leaf Spot",
      status: "diseased",
      scientificName: "Septoria lycopersici",
      description:
        "Penyakit ini menyebabkan bercak kecil berwarna abu-abu dengan tepi gelap di daun bawah.",
      symptoms: [
        "Bercak bulat kecil, abu-abu dengan tepi gelap",
        "Daun menguning dan gugur",
        "Mulai dari daun bawah lalu menyebar ke atas",
      ],
      treatment: [
        "Buang daun bawah yang terinfeksi",
        "Semprot fungisida (chlorothalonil, copper)",
        "Hindari penyiraman dari atas",
      ],
      prevention: [
        "Rotasi tanaman",
        "Jarak tanam cukup",
        "Penyiraman di pagi hari",
      ],
      biologicalControl: ["Bacillus subtilis", "Trichoderma spp."],
    },

    Target_Spot: {
      disease: "Target Spot",
      status: "diseased",
      scientificName: "Corynespora cassiicola",
      description:
        "Target Spot menyebabkan bercak berbentuk target pada daun dan buah, menyebabkan daun rontok.",
      symptoms: [
        "Bercak bulat dengan pusat lebih terang",
        "Daun mengering dan gugur",
        "Buah terdapat luka coklat",
      ],
      treatment: ["Gunakan fungisida", "Buang bagian tanaman yang sakit"],
      prevention: [
        "Jaga kebersihan kebun",
        "Rotasi tanaman",
        "Ventilasi yang baik",
      ],
      biologicalControl: ["Trichoderma spp.", "Pseudomonas spp."],
    },

    "Two-spotted_spider_mite": {
      disease: "Two-Spotted Spider Mite",
      status: "diseased",
      scientificName: "Tetranychus urticae",
      description:
        "Two-Spotted Spider Mite adalah hama kecil banget mirip laba-laba mini yang suka nyerang bagian bawah daun tomat. Warnanya kekuningan atau hijau muda dengan dua bintik gelap di punggungnya.",
      symptoms: [
        "Daun bercak kuning seperti bintik-bintik kecil",
        "Daun mengering dan rontok",
        "Jaring halus di bawah daun atau batang pada serangan parah",
        "Tanaman stress dan hasil panen turun",
      ],
      treatment: [
        "Semprot pakai air kuat",
        "Pakai musuh alami (Phytoseiulus persimilis, ladybug)",
        "Jaga kelembapan tanaman",
        "Buang daun yang terlalu rusak",
        "Gunakan minyak neem atau sabun serangga",
        "Rotasi tanaman & jaga kebun bersih",
        "Pakai acarisida jika parah (abamectin, spiromesifen, bifenazate)",
      ],
      prevention: [
        "Menjaga kelembapan tinggi",
        "Menggunakan predator alami",
        "Sanitasi kebun yang baik",
      ],
      biologicalControl: [
        "Phytoseiulus persimilis",
        "Ladybug (kumbang kecil)",
        "Sistem irigasi tetes untuk kelembapan",
      ],
    },

    Yellow_Leaf_Curl_Virus: {
      disease: "Tomato Yellow Leaf Curl Virus",
      status: "diseased",
      scientificName: "Begomovirus",
      description:
        "Virus ini menyebabkan daun menggulung, mengecil, dan menguning. Tanaman tumbuh kerdil dan hasil panen menurun drastis.",
      symptoms: [
        "Daun menggulung ke atas",
        "Daun mengecil dan menguning",
        "Pertumbuhan tanaman terhambat",
        "Buah kecil dan cacat",
      ],
      treatment: [
        "Cabut tanaman yang sakit",
        "Gunakan mulsa plastik untuk menghalau kutu putih",
        "Gunakan varietas tahan virus",
      ],
      prevention: [
        "Pengendalian kutu putih (Bemisia tabaci)",
        "Rotasi tanaman",
        "Gunakan jaring pelindung",
      ],
      biologicalControl: ["Encarsia formosa", "Beauveria bassiana"],
    },

    mosaic_virus: {
      disease: "Mosaic Virus",
      status: "diseased",
      scientificName: "Tobamovirus",
      description:
        "Mosaic virus menyebabkan daun belang kuning-hijau seperti mozaik. Pertumbuhan tanaman terganggu.",
      symptoms: [
        "Warna daun belang seperti mozaik",
        "Daun keriting atau melintir",
        "Tanaman tumbuh kerdil",
        "Buah kecil dan cacat",
      ],
      treatment: [
        "Cabut tanaman yang terinfeksi",
        "Desinfeksi alat berkebun",
        "Gunakan benih bebas virus",
      ],
      prevention: [
        "Hindari kontak antar tanaman",
        "Rotasi tanaman",
        "Kendali vektor (aphid)",
      ],
      biologicalControl: ["Neem oil", "Mycorrhizae"],
    },
  },

  // App settings
  settings: {
    language: "id",
    confidenceDisplay: true,
    showTreatmentSteps: true,
    enablePreventionTips: true,
    maxRecommendations: 5,
  },

  // Utility functions
  utils: {
    getDiseaseInfo: function (className) {
      // Enhanced with fallback and logging
      const info = this.diseaseDatabase[className];
      if (!info) {
        console.warn(`⚠️ Disease info not found for class: ${className}`);
        console.log("Available classes:", Object.keys(this.diseaseDatabase));
      }
      return info || null;
    },

    getClassIndex: function (className) {
      const index = this.classes.indexOf(className);
      if (index === -1) {
        console.warn(`⚠️ Class not found in classes array: ${className}`);
        console.log("Available classes:", this.classes);
      }
      return index;
    },

    isHealthy: function (className) {
      return className === "Healthy";
    },

    getDiseasesByStatus: function (status) {
      return Object.keys(this.diseaseDatabase).filter(
        (key) => this.diseaseDatabase[key].status === status
      );
    },

    // Validation function to check ML-Config sync
    validateMLSync: function (mlClassNames) {
      const configClasses = this.classes;
      const differences = [];

      // Check if arrays have same length
      if (mlClassNames.length !== configClasses.length) {
        differences.push(
          `Length mismatch: ML has ${mlClassNames.length}, Config has ${configClasses.length}`
        );
      }

      // Check each class name
      mlClassNames.forEach((mlClass, index) => {
        if (configClasses[index] !== mlClass) {
          differences.push(
            `Index ${index}: ML="${mlClass}" vs Config="${configClasses[index]}"`
          );
        }
      });

      // Check if all ML classes have disease data
      mlClassNames.forEach((mlClass) => {
        if (!this.diseaseDatabase[mlClass]) {
          differences.push(`Missing disease data for ML class: ${mlClass}`);
        }
      });

      return {
        isSync: differences.length === 0,
        differences: differences,
      };
    },
  },
};

// Export for Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = tomatoDiseaseConfig;
}

// Export for browser
if (typeof window !== "undefined") {
  window.tomatoDiseaseConfig = tomatoDiseaseConfig;
}
