import jwt from "jsonwebtoken";
import { crearError } from "../utils/customError.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const customError = crearError(401, "Usuario no autorizado");
    if (!authHeader) {
        return next(customError);
    }
    const resultadoSplit = authHeader.split(" ");
    if (resultadoSplit[0] != "Bearer") {
        return next(customError);
    }
    const token = resultadoSplit[1];
    if (token) {
        const claveSecreta = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, claveSecreta);
            req.user = decoded;
            return next();
        } catch (error) {
            error.status = 401;
            return next(error);
        }
    } else {
        return next(customError);
    }
}