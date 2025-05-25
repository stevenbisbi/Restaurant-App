import { Outlet } from "react-router-dom";
import { Footer } from "../../common/Footer";
import { Aside } from "./components/Aside";

const AdminLayout = () => (
  <>
    <Aside />
    <main className="container py-4">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AdminLayout;
