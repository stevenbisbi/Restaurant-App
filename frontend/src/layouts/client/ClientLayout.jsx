// src/layouts/client/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "../../common/Footer";

const ClientLayout = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

export default ClientLayout;
