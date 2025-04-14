import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Validate token and set user state
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setCurrentUser(null);
        } else {
          // Valid token
          setAuthToken(token);
          setCurrentUser(decoded);
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  // Set auth token for API requests
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', userData);
      const { token } = res.data;
      
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', userData);
      const { token } = res.data;
      
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;