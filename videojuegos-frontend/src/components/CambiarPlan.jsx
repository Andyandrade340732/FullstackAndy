import { useDispatch, useSelector } from "react-redux";
import { cambiarPlanApi } from "../services/apiServices.js";
import { loginRedux } from "../redux/features/authSlice.js";
import { jwtDecode } from "jwt-decode";

const CambiarPlan = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authSlice.usuario);

  if (!usuario) return null;

  const handleCambiarPlan = async () => {
    try {
      const respuesta = await cambiarPlanApi();
      const tokenString = respuesta.token;
      localStorage.setItem("token", tokenString);
      const decoded = jwtDecode(tokenString);
      dispatch(loginRedux({ usuario: decoded, token: tokenString }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Plan actual: <span className="badge bg-dark">{usuario.plan}</span></h5>
        {usuario.plan === "plus" ? (
          <button className="btn btn-warning btn-sm" onClick={handleCambiarPlan}>
            Mejorar a Premium
          </button>
        ) : (
          <p className="text-success">Ya sos premium</p>
        )}
      </div>
    </div>
  );
};

export default CambiarPlan;