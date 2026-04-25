import categoryRepository from "../repositories/category.repository.js";

export const obtenerCategorias = async () => {
    return await categoryRepository.findAll();
}

export const obtenerCategoriaPorId = async (id) => {
    const categoria = await categoryRepository.findById(id);
    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }
    return categoria;
}

export const crearCategoria = async (data) => {
    return await categoryRepository.create(data);
}

export const actualizarCategoria = async (id, data) => {
    const categoria = await categoryRepository.findByIdAndUpdate(id, data);
    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }
    return categoria;
}

export const eliminarCategoria = async (id) => {
    const categoria = await categoryRepository.findByIdAndDelete(id);
    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }
    return categoria;
}