import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "./Login.jsx";
import Pagina404 from "./Pagina404.jsx";
import Dashboard from "./Dashboard.jsx";
import Register from "./Register.jsx";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<App />} />
        </Route>
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;