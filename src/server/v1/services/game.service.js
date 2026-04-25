import gameRepository from "../repositories/game.repository.js";

export const obtenerJuegos = async (filtros, page, limit) => {
    const pagina = page || 1;
    const limite = limit || 10;
    return await gameRepository.findAllPaginated(filtros, pagina, limite);
}

export const obtenerJuegoPorId = async (id) => {
    const juego = await gameRepository.findById(id);
    if (!juego) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }
    return juego;
}

export const crearJuego = async (data, userId, plan) => {
    if (plan === "plus") {
        const cantidad = await gameRepository.countByUser(userId);
        if (cantidad >= 4) {
            const error = new Error("Límite de juegos alcanzado, cambiá a premium");
            error.status = 403;
            throw error;
        }
    }
    return await gameRepository.create({ ...data, creadoPor: userId });
}

export const actualizarJuego = async (id, data) => {
    const juego = await gameRepository.findByIdAndUpdate(id, data);
    if (!juego) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }
    return juego;
}

export const eliminarJuego = async (id) => {
    const juego = await gameRepository.findByIdAndDelete(id);
    if (!juego) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }
    return juego;
}