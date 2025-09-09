// src/routes/StaffRoutes.jsx
import { Routes, Route } from "react-router-dom";

import { SignUpFromStaff } from "../layouts/staff/forms/SignUpFromStaff";
import NotFound from "../common/Nofound";
import {
  DashboardStaff,
  OrderStatusPage,
  TableStaffPage,
  ReservationStaffPage,
  PaymentStaffPage,
} from "../layouts/staff/pages";

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="SignUp" element={<SignUpFromStaff />} />
      <Route path="dashboard" element={<DashboardStaff />} />
      <Route path="orders" element={<OrderStatusPage />} />
      <Route path="table" element={<TableStaffPage />} />
      <Route path="reservation" element={<ReservationStaffPage />} />
      <Route path="payment" element={<PaymentStaffPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StaffRoutes;
