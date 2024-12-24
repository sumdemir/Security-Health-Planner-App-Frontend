import React, { createContext, useState, useContext } from 'react';
import { authenticate, register } from './auth'; // API işlemlerini içe aktar

// AuthContext oluştur
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [userId, setuserId] = useState(localStorage.getItem('userId') || null);

  const login = async (credentials) => {
    try {
      const response = await authenticate(credentials);
      setAuthToken(response.token);
      setuserId(response.userId);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userId', response.userId);
      console.log('Giriş başarılı:', response.userId);
      console.log('Giriş başarılı:', response.authToken);
      return response; // Giriş başarılı olduğunda döndür
    } catch (error) {
      throw error; // Hata durumunu çağıran tarafa ilet
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      return response; // Kayıt başarılı olduğunda döndür
    } catch (error) {
      throw error; // Hata durumunu çağıran tarafa ilet
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Token'ı kaldır
  };

  return (
    <AuthContext.Provider value={{ userId, authToken, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext kullanımı için yardımcı kanca
export const useAuth = () => useContext(AuthContext);
