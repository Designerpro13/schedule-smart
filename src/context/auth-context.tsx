
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User } from '@/lib/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A helper function to post logs without awaiting
const postLog = (message: string, level: 'INFO' | 'ERROR', user: string) => {
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, level, user }),
  }).catch(console.error); // Log error to console but don't block
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('course-craft-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    try {
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
      
      postLog(`User '${email}' logged in successfully.`, 'INFO', email);
      
      return foundUser;

    } catch(err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      postLog(`Login attempt failed for user '${email}'. Reason: ${errorMessage}`, 'ERROR', email);
      throw err; // Re-throw the error to be handled by the UI
    }
  };

  const logout = () => {
    if (user) {
        postLog(`User '${user.email}' logged out.`, 'INFO', user.email);
    }
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
