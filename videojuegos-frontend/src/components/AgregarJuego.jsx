import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarJuegoApi } from "../services/apiServices.js";
import { agregarJuegoRedux } from "../redux/features/juegosSlice.js";

const AgregarJuego = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        anioLanzamiento: "",
    });
    const [agregando, setAgregando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleClick = async () => {
        if (!form.titulo.trim() || agregando) return;

        try {
            setAgregando(true);
            const respuesta = await agregarJuegoApi(form);
            const nuevoJuego = { ...respuesta.nuevoJuego, _id: respuesta.nuevoJuego.id };
            dispatch(agregarJuegoRedux(nuevoJuego));
            setForm({ titulo: "", descripcion: "", anioLanzamiento: "" });
        } catch (error) {
            console.error(error);
        } finally {
            setAgregando(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
            />
            <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
            />
            <input
                type="number"
                name="anioLanzamiento"
                placeholder="Año"
                value={form.anioLanzamiento}
                onChange={handleChange}
            />
            <button onClick={handleClick} disabled={!form.titulo.trim() || agregando}>
                {agregando ? "Agregando..." : "Agregar juego"}
            </button>
        </div>
    );
};

export default AgregarJuego;