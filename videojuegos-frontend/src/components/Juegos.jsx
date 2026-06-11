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
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center gap-2">
            <label className="mb-0">Filtrar:</label>
            <input
              className="form-control"
              style={{ maxWidth: "250px" }}
              type="text"
              value={textoFiltro}
              onChange={(e) => setTextoFiltro(e.target.value)}
              placeholder="Buscar por titulo..."
            />
          </div>
        </div>
      </div>

      {juegosFiltrados?.map((juego) => (
        <Juego key={juego._id || juego.id} {...juego} />
      ))}
    </div>
  );
};

export default Juegos;