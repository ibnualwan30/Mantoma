import React, { useState, useRef } from "react";
import api from "../services/api";

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset previous errors
      setError(null);

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Hanya file JPEG, PNG, dan WebP yang diizinkan. File Anda: " +
            file.type
        );
        return;
      }

      // Validate file size (10MB max, 1KB min)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const minSize = 1024; // 1KB

      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setError(`Ukuran file terlalu besar (${fileSizeMB}MB). Maksimal 10MB.`);
        return;
      }

      if (file.size < minSize) {
        setError(
          "File terlalu kecil. Minimal 1KB. Pastikan ini adalah gambar yang valid."
        );
        return;
      }

      console.log("📁 File selected:", {
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(2) + " KB",
      });

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.onerror = () => {
        setError("Gagal membaca file. Pastikan file tidak rusak.");
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setLoadingStep("Mengunggah gambar...");

    try {
      console.log("🔍 Starting detection with real API...");

      // Update loading step
      setTimeout(() => setLoadingStep("Menganalisis gambar..."), 500);

      // Call real API
      const response = await api.analyzeImage(selectedImage);

      if (response.success) {
        setLoadingStep("Memproses hasil...");

        // ===== DEBUGGING - TAMBAHAN BARIS 80-95 =====
        console.log("✅ Detection successful:", response.data.result);
        console.log("🔍 DEBUGGING INFO:");
        console.log("📦 Full result object:", response.data.result);
        console.log("📝 Description field:", response.data.result?.description);
        console.log("💊 Treatment field:", response.data.result?.treatment);
        console.log("🧪 Prevention field:", response.data.result?.prevention);
        console.log(
          "🧬 Biological Control:",
          response.data.result?.biologicalControl
        );
        console.log(
          "🏷️ All available properties:",
          Object.keys(response.data.result || {})
        );

        // Cek apakah treatment adalah array
        if (response.data.result?.treatment) {
          console.log(
            "📋 Treatment is array?",
            Array.isArray(response.data.result.treatment)
          );
          console.log("📋 Treatment content:", response.data.result.treatment);
        } else {
          console.log("❌ Treatment field is missing or null");
        }

        // Cek description
        if (!response.data.result?.description) {
          console.log("❌ Description field is missing or empty");
        }
        // ===== AKHIR DEBUGGING =====

        setResult(response.data.result);
      } else {
        throw new Error(response.message || "Detection failed");
      }
    } catch (error) {
      console.error("❌ Detection error:", error);

      // Better error messages for users
      let userMessage = "Terjadi kesalahan saat menganalisis gambar";

      if (error.message.includes("No response from server")) {
        userMessage =
          "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.";
      } else if (error.message.includes("timeout")) {
        userMessage =
          "Proses terlalu lama. Silakan coba lagi dengan gambar yang lebih kecil.";
      } else if (error.message.includes("Network Error")) {
        userMessage =
          "Masalah koneksi internet. Periksa koneksi Anda dan coba lagi.";
      } else if (error.message.includes("413")) {
        userMessage = "File terlalu besar. Maksimal ukuran file adalah 10MB.";
      } else if (error.message.includes("400")) {
        userMessage =
          "Format file tidak didukung atau ukuran file tidak sesuai. Gunakan file JPEG, PNG, atau WebP (1KB - 10MB).";
      } else if (error.message) {
        userMessage = error.message;
      }

      setError(userMessage);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Deteksi Penyakit Daun Tomat
            </h1>
            <p className="text-lg text-gray-700">
              Unggah foto daun tomat untuk mendeteksi penyakit dan mendapatkan
              rekomendasi penanganan
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-400">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {!selectedImage && (
              <div className="p-8">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 group cursor-pointer"
                  onClick={handleUpload}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4 group-hover:text-primary-500 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    Unggah Foto Daun Tomat
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Klik area ini atau tombol di bawah untuk memilih foto dari
                    galeri Anda
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    className="btn btn-primary py-4 px-8 text-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl mx-auto"
                  >
                    <svg
                      className="h-6 w-6 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    📁 Pilih dari Galeri
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="mt-6 text-xs text-gray-500 bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="font-semibold mb-1">
                      📋 Persyaratan File:
                    </div>
                    <div>• Format: JPEG, PNG, WebP</div>
                    <div>• Ukuran: 1KB - 10MB</div>
                    <div>• Pastikan gambar daun terlihat jelas</div>
                  </div>
                </div>
              </div>
            )}

            {selectedImage && !result && (
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Pratinjau Gambar
                  </h3>
                  <div className="relative rounded-lg overflow-hidden max-h-96 flex justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-contain max-h-96"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={resetDetection}
                    className="btn btn-secondary w-full py-3 text-base font-medium"
                  >
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Pilih Gambar Lain
                  </button>
                  <button
                    onClick={handleDetect}
                    className="btn btn-primary w-full py-4 text-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-6 w-6 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <div className="text-center">
                          <div className="font-medium">Memproses...</div>
                          {loadingStep && (
                            <div className="text-sm opacity-75">
                              {loadingStep}
                            </div>
                          )}
                        </div>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg
                          className="h-6 w-6 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        Deteksi Penyakit
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="p-8 animate-fade-in">
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="rounded-lg overflow-hidden max-h-80 shadow-md">
                      <img
                        src={preview}
                        alt="Daun terdeteksi"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div
                      className={`${
                        result.status === "healthy"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      } border rounded-lg p-4 mb-4 animate-pulse-once`}
                    >
                      <div className="flex items-center mb-2">
                        {result.status === "healthy" ? (
                          <svg
                            className="h-6 w-6 text-green-500 mr-2 animate-bounce-once"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-6 w-6 text-red-500 mr-2 animate-bounce-once"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {result.status === "healthy"
                            ? "✅ Hasil Deteksi"
                            : "⚠️ Penyakit Terdeteksi"}
                        </h3>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {result.disease || "Tidak diketahui"}
                      </h2>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-700">
                          Tingkat kepercayaan:
                          <span
                            className={`font-bold ml-1 text-lg ${
                              result.status === "healthy"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.confidence
                              ? result.confidence.toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                      </div>

                      {result.scientificName && (
                        <div className="mt-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">Nama Ilmiah: </span>
                            <span className="italic">
                              {result.scientificName}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        📝 Deskripsi
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {result?.description ||
                          "Deskripsi tidak tersedia untuk kondisi ini."}
                      </p>
                    </div>
                  </div>
                </div>

                {result?.symptoms &&
                  Array.isArray(result.symptoms) &&
                  result.symptoms.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        🔍 Gejala yang Terdeteksi
                      </h3>
                      <ul className="space-y-2">
                        {result.symptoms.map((symptom, index) => (
                          <li
                            key={index}
                            className="flex items-start animate-slide-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 mt-0.5 flex-shrink-0 font-semibold text-xs">
                              {index + 1}
                            </span>
                            <span className="text-gray-800">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {result?.status === "healthy"
                      ? "🌱 Rekomendasi Perawatan"
                      : "💊 Rekomendasi Penanganan"}
                  </h3>

                  <ul className="space-y-3">
                    {(result?.treatment &&
                    Array.isArray(result.treatment) &&
                    result.treatment.length > 0
                      ? result.treatment
                      : result?.status === "healthy"
                      ? [
                          "Lanjutkan perawatan rutin",
                          "Monitor kondisi tanaman secara berkala",
                          "Jaga kebersihan area tanam",
                        ]
                      : [
                          "Konsultasikan dengan ahli pertanian",
                          "Lakukan tindakan pencegahan",
                          "Monitor perkembangan tanaman",
                        ]
                    ).map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span
                          className={`inline-flex items-center justify-center h-7 w-7 rounded-full mr-3 mt-0.5 flex-shrink-0 font-semibold text-sm ${
                            result?.status === "healthy"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result?.prevention &&
                  Array.isArray(result.prevention) &&
                  result.prevention.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        🛡️ Tips Pencegahan
                      </h3>
                      <ul className="space-y-2">
                        {result.prevention.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start animate-slide-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0 font-semibold text-xs">
                              {index + 1}
                            </span>
                            <span className="text-gray-800">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {result?.biologicalControl &&
                  Array.isArray(result.biologicalControl) &&
                  result.biologicalControl.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        🧬 Pengendalian Biologis
                      </h3>
                      <ul className="space-y-2">
                        {result.biologicalControl.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start animate-slide-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3 mt-0.5 flex-shrink-0 font-semibold text-xs">
                              {index + 1}
                            </span>
                            <span className="text-gray-800">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="border-t pt-6">
                  <button
                    onClick={resetDetection}
                    className="btn btn-primary w-full py-3 text-base font-medium hover:scale-105 transition-transform duration-200"
                  >
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Deteksi Gambar Lain
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;
