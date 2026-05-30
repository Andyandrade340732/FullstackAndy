import { useDispatch, useSelector } from "react-redux";
import { cambiarPlanApi } from "../services/apiServices.js";
import { actualizarPlanRedux } from "../redux/features/authSlice.js";

const CambiarPlan = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authSlice.usuario);

  if (!usuario) return null;
  if (usuario.plan === "premium") return <p>Ya sos premium ✅</p>;

  const handleCambiarPlan = async () => {
    try {
      await cambiarPlanApi();
      dispatch(actualizarPlanRedux());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>Plan actual: {usuario.plan}</p>
      <button onClick={handleCambiarPlan}>Cambiar a Premium</button>
    </div>
  );
};

export default CambiarPlan;