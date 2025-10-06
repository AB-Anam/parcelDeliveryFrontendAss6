import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
