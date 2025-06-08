import React, { createContext, useContext, useEffect, useState } from "react";
import apiClientJson from "../utils/api/apiClientJson";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    accessToken: null,
    user: null,
  });

  // Load from localStorage safely
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (accessToken && refreshToken) {
        setAuthData({
          isAuthenticated: true,
          accessToken,
          user,
        });
        console.log(accessToken,refreshToken,user)
      }
      setLoading(false);
    } catch (err) {
      console.error("Error parsing user data from localStorage:", err);
      logout(); // Clean up corrupted storage
    }
  }, []);

  const login = (accessToken, refreshToken, user) => {
    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthData({
        isAuthenticated: true,
        accessToken,
        user,
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setAuthData({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    });
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return logout();

    try {
      const { data } = await apiClientJson.post("/api/v1/user/refresh-token", {
        refreshToken,
      });

      localStorage.setItem("accessToken", data.data.accessToken);
      setAuthData((prev) => ({
        ...prev,
        accessToken: data.data.accessToken,
      }));

      return data.data.accessToken;
    } catch (err) {
      console.warn("Token refresh failed:", err);
      logout();
      throw new Error("Session expired. Please login again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authData,loading, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
