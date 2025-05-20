// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);

  useEffect(() => {
    localStorage.setItem('role', role || '');
    localStorage.setItem('username', username || '');
  }, [role, username]);

  const login = (newRole, newUsername) => {
    setRole(newRole);
    setUsername(newUsername);
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
