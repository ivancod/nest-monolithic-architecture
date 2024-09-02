import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ROUTES } from '../api/routes';
import { useNavigate } from 'react-router-dom';
import { error } from 'console';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  errors: any | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axiosInstance
        .get<User>(ROUTES.AUTH_ME)
        .then((response) => setUser(response.data))
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await axiosInstance.post(ROUTES.AUTH_LOGIN, {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const userResponse = await axiosInstance
        .get(ROUTES.AUTH_ME)
        .then((response) => response.data);

      setUser(userResponse.data);
      navigate('/user');
    } catch (error: any) {
      console.error('Login error', error);
      setErrors(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await axiosInstance.post(ROUTES.AUTH_REGISTER, {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      await axiosInstance.get(ROUTES.AUTH_ME);

      navigate('/login');
    } catch (error: any) {
      setErrors(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, loading, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
