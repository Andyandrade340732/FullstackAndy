import userRepository from "../repositories/user.repository.js";

export const obtenerUsuarios = async (page, limit) => {
    const pagina = page || 1;
    const limite = limit || 10;
    const skip = (pagina - 1) * limite;
    const usuarios = await userRepository.findAll(skip, limite);
    return usuarios;
}

export const cambiarPlan = async (userId) => {
    const usuario = await userRepository.findById(userId);
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }
    if (usuario.plan !== "plus") {
        const error = new Error("Solo podés cambiar de plan si estás en plus");
        error.status = 400;
        throw error;
    }
    return await userRepository.findByIdAndUpdate(userId, { plan: "premium" });
}