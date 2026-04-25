import { Category } from "../models/mongo/category.model.js";

const categoryRepository = {
    findAll: async () => {
        return await Category.find();
    },
    findById: async (id) => {
        return await Category.findById(id);
    },
    create: async (data) => {
        return await Category.create(data);
    },
    findByIdAndUpdate: async (id, data) => {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    },
    findByIdAndDelete: async (id) => {
        return await Category.findByIdAndDelete(id);
    }
}

export default categoryRepository;