import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import  jwt_decode from "jwt-decode";
interface CustomJwtPayload {
  exp: number;
  role?: string;
}
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt_decode<CustomJwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp !== undefined && decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  console.log("Token in ProtectedRoute:", token);
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/auth/sign-in" replace />;
  }
  const decoded = jwt_decode<CustomJwtPayload>(token);
  const userRole = decoded.role;
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
