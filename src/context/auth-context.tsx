
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { users, User } from '@/lib/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('course-craft-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, pass: string): User => {
    const foundUser = users.find(u => u.email === email && u.password === pass);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('course-craft-user', JSON.stringify(foundUser));
      return foundUser;
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('course-craft-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
