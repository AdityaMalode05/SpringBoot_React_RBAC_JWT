import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isTokenValid } from "../utils/Protectedauth";

interface Props {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: Props) => {
  const tokenValid = isTokenValid();
  const userRole = getUserRole();

  if (!tokenValid) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
