import React, { createContext, useState, useContext } from 'react';
import { authenticate, register } from './auth'; // API işlemlerini içe aktar

// AuthContext oluştur
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  
  const login = async (credentials) => {
    try {
      const response = await authenticate(credentials);
      console.log('response:', response);
      setAuthToken(response.token);
      setuserId(response.userid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ userId, authToken, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
