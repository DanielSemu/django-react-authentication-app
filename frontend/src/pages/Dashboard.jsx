import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout/");
      setAuth({ user: null, accessToken: null });
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {auth.user?.full_name}!</h2>
      <p>Your role: {auth.user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
