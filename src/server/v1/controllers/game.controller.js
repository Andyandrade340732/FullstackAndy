import { obtenerJuegos, obtenerJuegoPorId, crearJuego, actualizarJuego, eliminarJuego } from "../services/game.service.js";

export const obtenerJuegosController = async (req, res, next) => {
    try {
        const { page, limit, titulo, categoriaId } = req.query;
        const filtros = {};
        if (titulo) filtros.titulo = { $regex: titulo, $options: "i" };
        if (categoriaId) filtros.categoriaId = categoriaId;
        const juegos = await obtenerJuegos(filtros, page, limit);
        res.status(200).json({ juegos });
    } catch (error) {
        next(error);
    }
}

export const obtenerJuegoPorIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const juego = await obtenerJuegoPorId(id);
        res.status(200).json({ juego });
    } catch (error) {
        next(error);
    }
}

export const crearJuegoController = async (req, res, next) => {
    try {
        const { body, user } = req;
        const nuevoJuego = await crearJuego(body, user.userId, user.plan);
        res.status(201).json({ mensaje: "Juego creado", nuevoJuego });
    } catch (error) {
        next(error);
    }
}

export const actualizarJuegoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const juegoActualizado = await actualizarJuego(id, body);
        res.status(200).json({ mensaje: "Juego actualizado", juegoActualizado });
    } catch (error) {
        next(error);
    }
}

export const eliminarJuegoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await eliminarJuego(id);
        res.status(200).json({ mensaje: "Juego eliminado" });
    } catch (error) {
        next(error);
    }
}