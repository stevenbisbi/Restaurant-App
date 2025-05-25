// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpAdmin } from "../layouts/admin/forms/SignUpAdmin";
import { Aside } from "../layouts/admin/components/Aside";
import { DashboardPage } from "../layouts/admin/pages/DashboardPage";
import { TablesAdminPage } from "../layouts/admin/pages/TablesAdminPage";
import NotFound from "../common/Nofound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardPage />} />
      <Route path="signup" element={<SignUpAdmin />} />
      <Route path="aside" element={<Aside />} />
      <Route path="tables" element={<TablesAdminPage />} />
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default AdminRoutes;
