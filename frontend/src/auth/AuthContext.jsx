import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { setAccessToken } from "./tokenStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to refresh the access token using the httpOnly cookie
        const refreshRes = await axiosInstance.post("api/auth/token/refresh/");
        console.log(refreshRes.data.user);
        
        setAccessToken(refreshRes.data.access)
        setAuth({
          user: refreshRes.data.user, 
        });
        console.log(user);
        
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
