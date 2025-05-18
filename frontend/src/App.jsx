import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./layouts/client/components/Footer";
import { RegisterFormPage } from "./layouts/client/forms/RegisterFormPage";
import { HomePage } from "./layouts/client/pages/HomePage";
import { LoginFormPage } from "./layouts/auth/LoginFormPage";
import { Navigation } from "./layouts/client/components/Navigation";

import { LoginAdmin } from "./layouts/admin/forms/LoginAdmin";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SignUpAdmin } from "./layouts/admin/forms/SignUpAdmin";
import { Aside } from "./layouts/admin/components/Aside";

function AppContent() {
  const { pathname } = useLocation();
  // Rutas en las que NO quieres la navbar
  const noNav = ["/", "/register", "/admin/login", "/admin/signup", "/admin/aside"];
  const showNav = !noNav.includes(pathname);

  return (
    <>
      {showNav && <Navigation />}

      <Routes>
        <Route path="/" element={<LoginFormPage />} />
        <Route path="/register" element={<RegisterFormPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/signup" element={<SignUpAdmin />} />
        <Route path="/admin/aside" element={<Aside />} />
        {/* Si intentas acceder a cualquier otra ruta, redirige */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
