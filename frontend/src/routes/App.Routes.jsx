// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./Client.Routes";
import AdminRoutes from "./Admin.Routes";
import StaffRoutes from "./Staff.Routes";
import NotFound from "../common/Nofound";
import { HomePage } from "../layouts/client/pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/staff/*" element={<StaffRoutes />} />
      <Route path="/*" element={<ClientRoutes />} />
      {/* Si no se encuentra ninguna ruta válida */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
