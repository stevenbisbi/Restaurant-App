// src/layouts/client/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import { Footer } from "../../common/Footer";

const ClientLayout = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

export default ClientLayout;
