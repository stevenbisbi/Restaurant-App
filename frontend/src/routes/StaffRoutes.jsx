// src/routes/StaffRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpFromStaff } from "../layouts/staff/forms/SignUpFromStaff";
import NotFound from "../common/Nofound";

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="SignUp" element={<SignUpFromStaff />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StaffRoutes;
