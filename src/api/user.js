import axios from 'axios';

// API istemcisi oluşturma
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Backend'in base URL'sini buraya yaz
  headers: {
    'Content-Type': 'application/json',
  },
});

// Kullanıcı profilini al
export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // JWT Token gönderimi
      },
    });
    return response.data; // Kullanıcı bilgisi
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to fetch user profile');
  }
};

// Kullanıcı bilgilerini güncelle
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await api.put('/user/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Güncellenmiş kullanıcı bilgisi
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Update failed');
  }
};

// Kullanıcı listesini al (admin için örnek)
export const getAllUsers = async (token) => {
  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Kullanıcıların listesi
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to fetch users');
  }
};
