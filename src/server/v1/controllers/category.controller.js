import { obtenerCategorias, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoria } from "../services/category.service.js";

export const obtenerCategoriasController = async (req, res, next) => {
    try {
        const categorias = await obtenerCategorias();
        res.status(200).json({ categorias });
    } catch (error) {
        next(error);
    }
}

export const obtenerCategoriaPorIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await obtenerCategoriaPorId(id);
        res.status(200).json({ categoria });
    } catch (error) {
        next(error);
    }
}

export const crearCategoriaController = async (req, res, next) => {
    try {
        const { body } = req;
        const nuevaCategoria = await crearCategoria(body);
        res.status(201).json({ mensaje: "Categoría creada", nuevaCategoria });
    } catch (error) {
        next(error);
    }
}

export const actualizarCategoriaController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const categoriaActualizada = await actualizarCategoria(id, body);
        res.status(200).json({ mensaje: "Categoría actualizada", categoriaActualizada });
    } catch (error) {
        next(error);
    }
}

export const eliminarCategoriaController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await eliminarCategoria(id);
        res.status(200).json({ mensaje: "Categoría eliminada" });
    } catch (error) {
        next(error);
    }
}