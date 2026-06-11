import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarJuegoApi } from "../services/apiServices.js";
import { agregarJuegoRedux } from "../redux/features/juegosSlice.js";
import SubirImagen from "./SubirImagen.jsx";

const AgregarJuego = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    anioLanzamiento: "",
  });
  const [imagen, setImagen] = useState(null);
  const [agregando, setAgregando] = useState(false);
  const [errorAgregar, setErrorAgregar] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleClick = async () => {
    if (!form.titulo.trim() || agregando) return;

    try {
      setErrorAgregar("");
      setAgregando(true);
      const juego = { ...form };
      if (imagen) {
        juego.imageUrl = imagen.imageUrl;
        juego.imagePublicId = imagen.imagePublicId;
      }
      const respuesta = await agregarJuegoApi(juego);
      const nuevoJuego = { ...respuesta.nuevoJuego, _id: respuesta.nuevoJuego.id };
      dispatch(agregarJuegoRedux(nuevoJuego));
      setForm({ titulo: "", descripcion: "", anioLanzamiento: "" });
      setImagen(null);
    } catch (error) {
      setErrorAgregar(error.message || "Error al agregar el juego");
    } finally {
      setAgregando(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Agregar juego</h5>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input className="form-control" style={{ width: "150px" }} type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
          <input className="form-control" style={{ width: "200px" }} type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
          <input className="form-control" style={{ width: "100px" }} type="number" name="anioLanzamiento" placeholder="Año" value={form.anioLanzamiento} onChange={handleChange} />
          <SubirImagen onImageUploaded={setImagen} imagen={imagen} />
          <button className="btn btn-dark" onClick={handleClick} disabled={!form.titulo.trim() || !form.descripcion.trim() || !form.anioLanzamiento || agregando}>
            {agregando ? "Agregando..." : "Agregar"}
          </button>
        </div>
        {errorAgregar && <div className="alert alert-danger mt-2 py-2">{errorAgregar}</div>}
      </div>
    </div>
  );
};

export default AgregarJuego;