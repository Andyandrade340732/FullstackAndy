import { useState } from "react";
import { useDispatch } from "react-redux";
import { eliminarJuegoRedux, actualizarJuegoRedux } from "../redux/features/juegosSlice.js";
import { eliminarJuegoApi, editarJuegoApi } from "../services/apiServices.js";

const Juego = ({ _id, id, titulo, descripcion, anioLanzamiento, imageUrl }) => {
  const idReal = _id || id;
  const dispatch = useDispatch();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ titulo, descripcion, anioLanzamiento });

  const handleEliminar = async () => {
    const confirmar = window.confirm("¿Estas seguro que queres eliminar este juego?");
    if (!confirmar) return;
    try {
      await eliminarJuegoApi(idReal);
      dispatch(eliminarJuegoRedux(idReal));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuardar = async () => {
    try {
      await editarJuegoApi(idReal, form);
      dispatch(actualizarJuegoRedux({ id: idReal, datos: form }));
      setEditando(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (editando) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex gap-2 flex-wrap">
            <input className="form-control" style={{ width: "150px" }} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Título" />
            <input className="form-control" style={{ width: "200px" }} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" />
            <input className="form-control" style={{ width: "100px" }} type="number" value={form.anioLanzamiento} onChange={(e) => setForm({ ...form, anioLanzamiento: e.target.value })} placeholder="Año" />
            <button className="btn btn-success" onClick={handleGuardar}>Guardar</button>
            <button className="btn btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{titulo}</h5>
          <div>
            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditando(true)}>Editar</button>
            <button className="btn btn-sm btn-danger" onClick={handleEliminar}>Eliminar</button>
          </div>
        </div>
        <p className="card-text mt-2">{descripcion}</p>
        {anioLanzamiento && <small className="text-muted">Año: {anioLanzamiento}</small>}
        {imageUrl && <img src={imageUrl} alt={titulo} className="img-fluid mt-2 rounded" style={{ maxWidth: "150px" }} />}
      </div>
    </div>
  );
};

export default Juego;