import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[HTTP] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[HTTP Error]`, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
