import { Routes, Route } from "react-router-dom";
import { RegisterFormPage } from "../layouts/client/forms/RegisterFormPage";
import { HomePage } from "../layouts/client/pages/HomePage";
import { LoginFormPage } from "../auth/LoginFormPage";
import NotFound from "../common/Nofound";
import ClientLayout from "../layouts/client/ClientLayout";

const ClientRoutes = () => {
  return (
    <Routes>
        <Route path="/register" element={<RegisterFormPage />} />
      <Route element={<ClientLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginFormPage />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default ClientRoutes;
