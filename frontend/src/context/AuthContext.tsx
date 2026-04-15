import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthResponse } from '../types';

interface AuthContextType {
  user: { name: string; email: string } | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to load from storage on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user info');
      }
    }
  }, []);

  const login = (data: AuthResponse) => {
    setToken(data.access_token);
    setUser({ name: data.user_name, email: data.user_email });
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify({ name: data.user_name, email: data.user_email }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
