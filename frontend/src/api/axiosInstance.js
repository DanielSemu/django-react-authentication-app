import axios from "axios";

const BASE_URL = "http://localhost:8000"; // your Django backend URL
import useAuth from "../auth/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // send httpOnly cookies
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default axiosInstance;
  

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const setupInterceptors = (store) => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (store.auth?.accessToken) {
        config.headers["Authorization"] = `Bearer ${store.auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      if (error.response?.status === 401 && !prevRequest._retry) {
        prevRequest._retry = true;
        const newAccessToken = await store.refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
};

export { axiosPrivate, setupInterceptors };

