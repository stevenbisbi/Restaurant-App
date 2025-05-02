import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./client/components/Footer";
import { SignUpPage } from "./client/pages/SignUpPage";
import { HomePage } from "./client/pages/HomePage";
import { SignInPage } from "./client/pages/SignInPage";

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
