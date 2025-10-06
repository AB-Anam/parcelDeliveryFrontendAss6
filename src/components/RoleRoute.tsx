import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const RoleRoute: React.FC<{ role: string | string[]; children: React.ReactNode }> = ({ role, children }) => {
  const currentRole = useSelector((state: RootState) => state.auth.role);
  if (!currentRole) return <Navigate to="/login" replace />;
  const allowed = Array.isArray(role) ? role.includes(currentRole) : currentRole === role;
  if (!allowed) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default RoleRoute;
