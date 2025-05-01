import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/AdminPage";
import Unauthorized from "../pages/Unauthorized";
import RequireAuth from "../auth/RequireAuth";
import RequireRole from "../auth/RequireRole";
import AboutPage from "../pages/AboutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
