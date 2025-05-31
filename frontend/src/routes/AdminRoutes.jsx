// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpAdmin } from "../layouts/admin/forms/SignUpAdmin";
import { Aside } from "../layouts/admin/components/Aside";
import { DashboardPage } from "../layouts/admin/pages/DashboardPage";
import { TablesAdminPage } from "../layouts/admin/pages/TablesAdminPage";
import { MenuAdminPage } from "../layouts/admin/pages/MenuAdminPage";
import { MenuAdminForm } from "../layouts/admin/forms/MenuAdminForm";
import { ItemAdminForm } from "../layouts/admin/forms/ItemAdminForm";
import { ItemsAdminPage } from "../layouts/admin/pages/ItemsAdminPage";
import { TableAdminForm } from "../layouts/admin/forms/TableAdminForm";
import AdminLayout from "../layouts/admin/AdminLayout";
import NotFound from "../common/Nofound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="" element={<DashboardPage />} />
        <Route path="signup" element={<SignUpAdmin />} />
        <Route path="aside" element={<Aside />} />
        <Route path="menu" element={<MenuAdminPage />} />
        <Route path="menu/create" element={<MenuAdminForm />} />
        <Route path="menu/edit/:id" element={<MenuAdminForm />} />
        <Route path="items" element={<ItemsAdminPage />} />
        <Route path="items/create" element={<ItemAdminForm />} />
        <Route path="items/edit/:id" element={<ItemAdminForm />} />
        <Route path="tables" element={<TablesAdminPage />} />
        <Route path="tables/create" element={<TableAdminForm />} />
        <Route path="tables/edit/:id" element={<TableAdminForm />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default AdminRoutes;
