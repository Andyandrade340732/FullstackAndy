import { obtenerUsuarios, cambiarPlan } from "../services/user.service.js";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign(
            {
                userId: usuario._id,
                username: usuario.username,
                email: usuario.email,
                role: usuario.role,
                plan: usuario.plan
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ mensaje: "Plan actualizado a premium", usuario, token });
    } catch (error) {
        next(error);
    }
}