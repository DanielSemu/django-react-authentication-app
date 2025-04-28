import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, accessToken: null });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to refresh the access token using the httpOnly cookie
        const refreshRes = await axiosInstance.post("api/auth/token/refresh/");

        // If successful, fetch the user profile
        const profileRes = await axiosInstance.get("api/auth/profile/");

        setAuth({
          user: profileRes.data, 
          accessToken: refreshRes.data.access
        });
      } catch (err) {
        console.log("No active session or refresh token expired");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
