import { Outlet } from "react-router-dom";
import { Footer } from "../../common/Footer";
import { Aside } from "./components/Aside";

const AdminLayout = () => (
  <>
    <Outlet />
    <Aside />
    {/* Aquí puedes agregar más componentes comunes como el Header si es necesario */}
    <Footer />
  </>
);

export default AdminLayout;
