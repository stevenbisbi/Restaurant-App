// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpAdmin } from "../layouts/admin/forms/SignUpAdmin";
import { Aside } from "../layouts/admin/components/Aside";
import {
  DashboardPage,
  HistoryPayments,
  ItemsAdminPage,
  MenuAdminPage,
  OrderAdminPage,
  ReservationsAdminPage,
  TablesAdminPage,
  UserAdminPage,
} from "../layouts/admin/pages";

import {
  MenuAdminForm,
  ItemAdminForm,
  TableAdminForm,
  OrderAdminForm,
  UserAdminForm,
} from "../layouts/admin/forms";

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
        <Route path="users" element={<UserAdminPage />} />
        <Route path="users/create" element={<UserAdminForm />} />
        <Route path="users/edit/:id" element={<UserAdminForm />} />
        <Route path="orders" element={<OrderAdminPage />} />
        <Route path="orders/create" element={<OrderAdminForm />} />
        <Route path="orders/edit/:id" element={<OrderAdminForm />} />
        <Route path="history-payments" element={<HistoryPayments />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default AdminRoutes;
