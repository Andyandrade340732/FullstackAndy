import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { obtenerJuegosApi } from "../services/apiServices.js";
import { cargaInicialJuegos } from "../redux/features/juegosSlice.js";
import Juegos from "./Juegos.jsx";
import AgregarJuego from "./AgregarJuego.jsx";
import CambiarPlan from "./CambiarPlan.jsx";
import Grafica from "./Grafica.jsx";
import InformeUso from "./InformeUso.jsx";

const Contenido = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const respuesta = await obtenerJuegosApi();
        dispatch(cargaInicialJuegos(respuesta.juegos));
      } catch (error) {
        console.error(error);
      }
    };

    cargarJuegos();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <InformeUso />
          <CambiarPlan />
          <Grafica />
        </div>
        <div className="col-md-8">
          <AgregarJuego />
          <Juegos />
        </div>
      </div>
    </div>
  );
};

export default Contenido;