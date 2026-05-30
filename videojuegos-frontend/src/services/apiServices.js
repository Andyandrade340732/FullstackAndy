import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError = {
            message: error.response?.data?.message || error.message || "Error desconocido",
            status: error.response?.status || 500,
        };
        return Promise.reject(customError);
    }
);

// auth

export const loginApi = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

export const registrarUsuarioApi = async (datos) => {
    const response = await api.post("/auth/register", datos);
    return response.data;
};

// juegos

export const obtenerJuegosApi = async () => {
    const response = await api.get("/juegos");
    return response.data;
};

export const agregarJuegoApi = async (juego) => {
    const response = await api.post("/juegos", juego);
    return response.data;
};

export const eliminarJuegoApi = async (id) => {
    const response = await api.delete(`/juegos/${id}`);
    return response.data;
};

export const editarJuegoApi = async (id, datos) => {
    const response = await api.put(`/juegos/${id}`, datos);
    return response.data;
};

// categorioas

export const obtenerCategoriasApi = async () => {
    const response = await api.get("/categorias");
    return response.data;
};

// usuario

export const cambiarPlanApi = async () => {
    const response = await api.patch("/users/plan");
    return response.data;
};