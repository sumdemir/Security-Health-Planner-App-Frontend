import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth';

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

export const authenticate = async (credentials) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials, {
      
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response:', response);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('bitirmeuserid', response.data.userid);
    localStorage.setItem('userFirstName', response.data.firstname);
    localStorage.setItem('userLastName', response.data.lastname);
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Authentication failed');
  }
};

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

export const resetPassword = async (email, newPassword) => {
  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  return response.json();
};

export const updatePassword = async (email, newPassword) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-password`, {
      email,
      newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update password failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Update password failed');
  }
};
