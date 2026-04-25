import { registrarUsuario, loginUsuario } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
    try {
        const { body } = req;
        const usuario = await registrarUsuario(body);
        res.status(201).json({ usuario });
    } catch (error) {
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { body } = req;
        const token = await loginUsuario(body);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}