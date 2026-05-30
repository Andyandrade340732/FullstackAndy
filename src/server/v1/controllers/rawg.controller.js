import { buscarJuego } from "../services/rawg.service.js";

export const buscarJuegoController = async (req, res, next) => {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
        }
        const juegos = await buscarJuego(nombre);
        res.status(200).json({ juegos });
    } catch (error) {
        next(error);
    }
}