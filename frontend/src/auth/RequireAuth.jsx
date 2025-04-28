import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  
  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
