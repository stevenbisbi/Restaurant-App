import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { SignIn } from "./pages/SignIn";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
