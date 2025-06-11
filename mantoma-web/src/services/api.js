// Frontend API service
import axios from 'axios';

// Backend base URL - UPDATED TO CORRECT IP
const BASE_URL = 'http://192.168.18.74:5001/api';

// Axios instance with default config - INCREASED TIMEOUT
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2 minutes to match backend
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

const api = {
  // Check backend status
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  // Upload and analyze image
  analyzeImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      console.log('Uploading image:', imageFile.name, 'size:', imageFile.size);
      
      const response = await apiClient.post('/detection/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 180000, // 3 minutes for image analysis
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${progress}%`);
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Analysis failed');
      } else if (error.request) {
        throw new Error('No response from server. Check if backend is running.');
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  },

  // Get detection history with pagination
  getDetectionHistory: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/detection/history', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get history: ${error.message}`);
    }
  },

  // Get detection detail by ID
  getDetectionById: async (id) => {
    try {
      const response = await apiClient.get(`/detection/history/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get detection: ${error.message}`);
    }
  },

  // Delete detection by ID
  deleteDetection: async (id) => {
    try {
      const response = await apiClient.delete(`/detection/history/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete detection: ${error.message}`);
    }
  }
};

export default api;