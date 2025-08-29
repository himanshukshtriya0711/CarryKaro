import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  const response = await authApi.post('/auth/token/', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await authApi.post('/auth/register/', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await authApi.get('/auth/me/');
  return response.data;
};

export default authApi;
