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
import { LoginFormPage } from "./layouts/client/forms/LoginFormPage";
import { Navigation } from "./layouts/client/components/Navigation";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function AppContent() {
  const { pathname } = useLocation();
  // Rutas en las que NO quieres la navbar
  const noNav = ["/", "/register"];
  const showNav = !noNav.includes(pathname);

  return (
    <>
      {showNav && <Navigation />}

      <Routes>
        <Route path="/" element={<LoginFormPage />} />
        <Route path="/register" element={<RegisterFormPage />} />
        <Route path="/home" element={<HomePage />} />
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
