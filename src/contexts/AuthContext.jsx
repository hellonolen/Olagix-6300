import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For development - auto-login with mock user
    const isDevelopment = import.meta.env.DEV;
    if (isDevelopment) {
      const mockUser = {
        id: 'dev-user-1',
        email: 'dev@ologix.com',
        name: 'Dev User',
        membershipLevel: 'professional',
        joinDate: new Date().toISOString(),
        personalFundingScore: 720,
        businessProfiles: [],
        onboardingCompleted: false // Set to false to test onboarding
      };
      setUser(mockUser);
      setLoading(false);
      return;
    }

    // Check for existing session in production
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        membershipLevel: 'basic',
        joinDate: new Date().toISOString(),
        personalFundingScore: 650,
        businessProfiles: [],
        onboardingCompleted: false
      };

      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        membershipLevel: userData.selectedPlan?.name.toLowerCase() || 'basic',
        joinDate: new Date().toISOString(),
        personalFundingScore: null,
        businessProfiles: [],
        onboardingCompleted: false
      };

      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};