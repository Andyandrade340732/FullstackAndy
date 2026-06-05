import "./App.css";
import Contenido from "./components/Contenido.jsx";
import GlobalLoading from "./components/GlobalLoading.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutRedux } from "./redux/features/authSlice.js";
import { useNavigate } from "react-router-dom";

function App() {
  const usuario = useSelector((state) => state.authSlice.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutRedux());
    navigate("/login");
  };

  return (
    <>
      <GlobalLoading />
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">🎮 Videojuegos</span>
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