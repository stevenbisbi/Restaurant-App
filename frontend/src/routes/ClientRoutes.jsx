import { Routes, Route } from "react-router-dom";

import NotFound from "../common/Nofound";
import { RegisterFormPage } from "../layouts/client/forms/RegisterFormPage";
import { HomePage } from "../layouts/client/pages/HomePage";
import { LoginFormPage } from "../auth/LoginFormPage";
import ClientLayout from "../layouts/client/ClientLayout";
import {
  SalchipapaPage,
  BebidasPage,
  EmparedadosPage,
  HamburguesaPage,
  PerrosPage,
} from "../layouts/client/pages/pages-menu";
import { ReservePage } from "../layouts/client/pages/ReservePage";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterFormPage />} />
      <Route path="/login" element={<LoginFormPage />} />
      <Route path="/" element={<HomePage />} />
      <Route element={<ClientLayout />}>
        <Route path="/reservar" element={<ReservePage />} />
        <Route path="/salchipapa" element={<SalchipapaPage />} />
        <Route path="/hamburguesa" element={<HamburguesaPage />} />
        <Route path="/emparedados" element={<EmparedadosPage />} />
        <Route path="/perros" element={<PerrosPage />} />
        <Route path="/bebidas" element={<BebidasPage />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default ClientRoutes;
