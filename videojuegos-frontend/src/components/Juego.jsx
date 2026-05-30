import { useState } from "react";
import { useDispatch } from "react-redux";
import { eliminarJuegoRedux, actualizarJuegoRedux } from "../redux/features/juegosSlice.js";
import { eliminarJuegoApi, editarJuegoApi } from "../services/apiServices.js";

const Juego = ({ _id, id, titulo, descripcion, anioLanzamiento }) => {
  const idReal = _id || id;
  const dispatch = useDispatch();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ titulo, descripcion, anioLanzamiento });

  const handleEliminar = async () => {
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
      <div>
        <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
        <input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
        <input type="number" value={form.anioLanzamiento} onChange={(e) => setForm({ ...form, anioLanzamiento: e.target.value })} />
        <button onClick={handleGuardar}>Guardar</button>
        <button onClick={() => setEditando(false)}>Cancelar</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleEliminar}>Eliminar</button>
      <button onClick={() => setEditando(true)}>Editar</button>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      {anioLanzamiento && <p>Año: {anioLanzamiento}</p>}
    </div>
  );
};

export default Juego;