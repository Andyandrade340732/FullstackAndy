import { Game } from "../models/mongo/game.model.js";

const gameRepository = {
    findAll: async (filtros = {}) => {
        return await Game.find(filtros);
    },
    findAllPaginated: async (filtros, page, limit) => {
        const skip = (page - 1) * limit;
        return await Game.find(filtros).skip(skip).limit(limit);
    },
    findById: async (id) => {
        return await Game.findById(id);
    },
    create: async (data) => {
        return await Game.create(data);
    },
    findByIdAndUpdate: async (id, data) => {
        return await Game.findByIdAndUpdate(id, data, { new: true });
    },
    findByIdAndDelete: async (id) => {
        return await Game.findByIdAndDelete(id);
    },
    countByUser: async (userId) => {
        return await Game.countDocuments({ creadoPor: userId });
    }
}

export default gameRepository;