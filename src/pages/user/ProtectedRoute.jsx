import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FullScreenLoader from "../../components/FullScreenLoader"; // optional

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <FullScreenLoader />; // or null

  return isAuthenticated ? <Outlet /> : <Navigate to="/pages/user/login" replace />;
};

export default ProtectedRoute;
