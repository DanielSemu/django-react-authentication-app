import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireRole = ({ allowedRoles }) => {
  const { auth } = useAuth();

  return auth?.user && allowedRoles.includes(auth.user.role)
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
};

export default RequireRole;
