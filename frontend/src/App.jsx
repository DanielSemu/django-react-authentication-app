import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { setupInterceptors } from "./api/axiosInstance";
import useAuth from "./auth/useAuth";
import useRefreshToken from "./hooks/useRefreshToken";

function App() {
  const auth = useAuth();
  const refresh = useRefreshToken();

  setupInterceptors({ auth, refresh });

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
