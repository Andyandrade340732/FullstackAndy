import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (data) => {
    const { email, password } = data;
    const usuarioExiste = await userRepository.findByEmail(email);
    if (usuarioExiste) {
        const error = new Error("Ya existe un usuario con ese email");
        error.status = 400;
        throw error;
    }
    const hash = await bcrypt.hash(password, 10);
    const usuarioCreado = await userRepository.create({
        ...data,
        password: hash,
        role: data.role || "user",
        plan: "plus"
    });
    return usuarioCreado;
}

export const loginUsuario = async (data) => {
    const { email, password } = data;
    const usuarioDeBase = await userRepository.findByEmail(email);
    if (!usuarioDeBase) {
        const error = new Error("Hubo un error al loguearte");
        error.status = 400;
        throw error;
    }
    const isValid = await bcrypt.compare(password, usuarioDeBase.password);
    if (!isValid) {
        const error = new Error("Hubo un error al loguearte");
        error.status = 400;
        throw error;
    }
    const token = jwt.sign(
        {
            userId: usuarioDeBase._id,
            username: usuarioDeBase.username,
            email: usuarioDeBase.email,
            role: usuarioDeBase.role,
            plan: usuarioDeBase.plan
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
}