// src/routes/StaffRoutes.jsx
import { Routes, Route } from "react-router-dom";
import{ SignUpFromStaff} from "../layouts/staff/forms/SignUpFromStaff";

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="/staff/SignUp" element={<SignUpFromStaff />} />
    </Routes>
  );
};

export default StaffRoutes;
