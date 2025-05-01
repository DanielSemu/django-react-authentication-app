import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or show a spinner
  }

  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
