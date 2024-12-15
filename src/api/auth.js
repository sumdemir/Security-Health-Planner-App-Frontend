import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth';


// Register Fonksiyonu
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Backend'den gelen AuthenticationResponse
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Authenticate (Login) Fonksiyonu
export const authenticate = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Authentication failed');
  }
};

// Forgot Password Fonksiyonu
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Forgot password failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Forgot password failed');
  }
};
