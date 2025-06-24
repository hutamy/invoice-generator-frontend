import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/authService";
import { apiClient } from "../services/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = AuthService.getAccessToken();
        if (token) {
          // Fetch user data
          const userData = await apiClient.get("/v1/protected/auth/me");
          setUser(userData);
        }
      } catch (error) {
        // If fetching user fails, attempt token refresh
        const newToken = await AuthService.refreshToken();
        if (!newToken) {
          AuthService.clearTokens();
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/v1/public/auth/sign-in", {
        email,
        password,
      });
      AuthService.storeTokens(response.data);

      // Fetch user data
      const userData = await apiClient.get("/v1/protected/auth/me");
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.clearTokens();
    setUser(null);
  };

  const signUp = async (userData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(
        "/v1/public/auth/sign-up",
        userData
      );
      AuthService.storeTokens(response.data);

      // Fetch user data
      const userDataResponse = await apiClient.get("/v1/protected/auth/me");
      setUser(userDataResponse);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
