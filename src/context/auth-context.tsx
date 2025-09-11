
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User } from '@/lib/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
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

  const login = async (email: string, pass: string): Promise<User> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid email or password');
    }
    
    const foundUser = data.user;
    setUser(foundUser);
    localStorage.setItem('course-craft-user', JSON.stringify(foundUser));
    return foundUser;
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
