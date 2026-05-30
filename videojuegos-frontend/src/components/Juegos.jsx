import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Juego from "./Juego.jsx";

const Juegos = () => {
  const juegos = useSelector((state) => state.juegosSlice);
  const [textoFiltro, setTextoFiltro] = useState("");

  const juegosFiltrados = useMemo(() => {
    const filtro = textoFiltro.trim().toLowerCase();
    if (!filtro) return juegos;
    return juegos.filter((juego) =>
      String(juego.titulo ?? "").toLowerCase().includes(filtro)
    );
  }, [juegos, textoFiltro]);

  return (
    <div>
      <label>Filtrar:</label>
      <input
        type="text"
        value={textoFiltro}
        onChange={(e) => setTextoFiltro(e.target.value)}
      />

      {juegosFiltrados?.map((juego) => {
        console.log("juego", juego);
        return <Juego key={juego._id || juego.id} {...juego} />;
      })}
    </div>
  );
};

export default Juegos;