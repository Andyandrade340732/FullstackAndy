import { obtenerUsuarios, cambiarPlan } from "../services/user.service.js";

export const obtenerUsuariosController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const usuarios = await obtenerUsuarios(page, limit);
        res.status(200).json({ usuarios });
    } catch (error) {
        next(error);
    }
}

export const cambiarPlanController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const usuario = await cambiarPlan(userId);
        res.status(200).json({ mensaje: "Plan actualizado a premium", usuario });
    } catch (error) {
        next(error);
    }
}