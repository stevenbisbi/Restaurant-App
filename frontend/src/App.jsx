import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./layouts/client/components/Footer";
import { SignUpPage } from "./layouts/client/pages/SignUpPage";
import { HomePage } from "./layouts/client/pages/HomePage";
import { SignInPage } from "./layouts/client/pages/SignInPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
