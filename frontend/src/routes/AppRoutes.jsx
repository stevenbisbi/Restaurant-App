// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import StaffRoutes from "./StaffRoutes";
import NotFound from "../common/Nofound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/staff/*" element={<StaffRoutes />} />
      <Route path="/*" element={<ClientRoutes />} />
        {/* Si no se encuentra ninguna ruta válida */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
