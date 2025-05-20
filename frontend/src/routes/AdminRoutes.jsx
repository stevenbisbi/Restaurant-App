// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpAdmin } from "../layouts/admin/forms/SignUpAdmin";
import { Aside } from "../layouts/admin/components/Aside";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/signup" element={<SignUpAdmin />} />
      <Route path="/admin/aside" element={<Aside />} />
    </Routes>
  );
};

export default AdminRoutes;
