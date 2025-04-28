import axios from 'axios';

// Load API key from environment
const API_KEY = import.meta.env.VITE_API_KEY || 'q5IDFHNGcgCVG82PlNSzmjynnes2lrBPimlCObG4TMw=';

// Create an axios instance with default config
const clientApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-KEY': API_KEY,
  },
});

// Response interceptor for handling errors
clientApi.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          console.error('Unauthorized: API key may be invalid');
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('Not Found: The requested resource could not be found');
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server');
          break;
        default:
          console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } else {
      console.error('Network Error: Could not connect to the server');
    }
    return Promise.reject(error);
  }
);

// API functions
export const fetchProducts = async (params = {}) => {
  try {
    const response = await clientApi.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await clientApi.get(`/products/${id}`);
    console.log('fetchProductById response:', response.data); // Debug
    return response.data; // Adjust based on Laravel response
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await clientApi.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchBrands = async () => {
  try {
    const response = await clientApi.get('/brands');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export default clientApi;