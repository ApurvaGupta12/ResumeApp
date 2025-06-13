import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;

  if (!token || role !== "ADMIN") {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};

export default AdminRoute;
