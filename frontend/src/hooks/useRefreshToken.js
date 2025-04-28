import axiosInstance from "../api/axiosInstance";
import useAuth from "../auth/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axiosInstance.get("/auth/refresh/");
    setAuth(prev => ({
      ...prev,
      accessToken: res.data.accessToken,
    }));
    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
