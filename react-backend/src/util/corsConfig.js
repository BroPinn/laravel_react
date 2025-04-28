// CORS Configuration for development
// This file provides information on how to handle CORS in development

/*
 * Cross-Origin Resource Sharing (CORS) Configuration
 *
 * For the Laravel backend:
 * 1. Laravel already includes a CORS middleware that can be configured in config/cors.php
 * 2. Ensure the following settings are configured in your Laravel application:
 *
 *    // In config/cors.php
 *    return [
 *        'paths' => ['api/*'],
 *        'allowed_methods' => ['*'],
 *        'allowed_origins' => ['http://localhost:5173'], // React dev server URL
 *        'allowed_origins_patterns' => [],
 *        'allowed_headers' => ['*'],
 *        'exposed_headers' => [],
 *        'max_age' => 0,
 *        'supports_credentials' => true,
 *    ];
 *
 * For the React frontend:
 * 1. When making API requests, ensure you're including the correct headers:
 */

// Example of configuring axios for CORS in React
import axios from 'axios';

// Create an axios instance with CORS configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-KEY': 'your-api-key-here', // Replace with your actual API key
  },
  // Enable sending cookies in cross-origin requests if needed
  withCredentials: true,
});

// Usage example:
// import { apiClient } from './corsConfig';
// 
// async function fetchData() {
//   try {
//     const response = await apiClient.get('/products');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }

export { apiClient };

/*
 * Troubleshooting CORS Issues:
 * 
 * 1. Check Laravel CORS configuration in config/cors.php
 * 2. Verify the allowed_origins includes your React app's URL
 * 3. Ensure API routes are prefixed with 'api/' to match the CORS paths
 * 4. Check that your React app is sending the correct headers
 * 5. For development, you may need to disable CORS in your browser temporarily
 *    using extensions like "CORS Unblock" or "Allow CORS"
 */