import { Navigate, Outlet } from "react-router-dom";

interface RoleRouteProps {
  role: "sender" | "receiver" | "admin";
}

const RoleRoute = ({ role }: RoleRouteProps) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
