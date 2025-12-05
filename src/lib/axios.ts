import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Warn if API base URL is not configured
if (!baseURL) {
  console.warn('⚠️ NEXT_PUBLIC_API_BASE_URL is not set. API calls may fail.');
}

const api = axios.create({
    baseURL: baseURL || 'https://ecommerce.routemisr.com/api/v1',
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token');
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;

