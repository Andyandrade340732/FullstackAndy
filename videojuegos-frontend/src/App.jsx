import "./App.css";
import { useEffect } from "react";
import Contenido from "./components/Contenido.jsx";
import GlobalLoading from "./components/GlobalLoading.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux, loginRedux } from "./redux/features/authSlice.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function App() {
  const usuario = useSelector((state) => state.authSlice.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const ahora = Date.now() / 1000;
        if (decoded.exp < ahora) {
          localStorage.removeItem("token");
          dispatch(logoutRedux());
          navigate("/login");
        } else {
          dispatch(loginRedux({ usuario: decoded, token }));
        }
      } catch {
        localStorage.removeItem("token");
        dispatch(logoutRedux());
        navigate("/login");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutRedux());
    navigate("/login");
  };

  return (
    <>
      <GlobalLoading />
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Videojuegos</span>
        {usuario && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">{usuario.username} | {usuario.plan}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
      <Contenido />
    </>
  );
}

export default App;