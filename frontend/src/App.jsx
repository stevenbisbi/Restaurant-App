import {  BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Footer } from "./common/Footer";
import  AppRoutes  from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { Navigation } from "./layouts/client/components/Navigation";
import { useLocation } from "react-router-dom";

function AppContent() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}


export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
