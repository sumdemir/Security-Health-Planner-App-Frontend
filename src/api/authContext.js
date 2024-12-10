import React, { createContext, useState, useContext } from 'react';
import { authenticate, register } from './auth'; // API işlemlerini içe aktar

// AuthContext oluştur
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const login = async (credentials) => {
    try {
      const response = await authenticate(credentials);
      setAuthToken(response.token);
      localStorage.setItem('authToken', response.token); // Token'ı depola
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
    <AuthContext.Provider value={{ authToken, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext kullanımı için yardımcı kanca
export const useAuth = () => useContext(AuthContext);
