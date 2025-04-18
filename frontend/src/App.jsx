import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { SignIn } from "./client/pages/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./client/components/Footer";
import { SignUp } from "./client/pages/SignUp";
import { Home } from "./client/pages/Home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
