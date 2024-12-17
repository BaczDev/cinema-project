// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo context cho trạng thái đăng nhập
const AuthContext = createContext();

// Provider để cung cấp trạng thái và hành động cho các component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext trong các component khác
export const useAuth = () => useContext(AuthContext);
