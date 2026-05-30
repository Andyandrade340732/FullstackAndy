import { User } from "../models/mongo/user.model.js";

const userRepository = {
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    create: async (data) => {
        return await User.create(data);
    },
    findByIdAndUpdate: async (id, data) => {
        return await User.findByIdAndUpdate(id, data, { new: true });
    },
    findAll: async (skip, limit) => {
    return await User.find().skip(skip).limit(limit);
    }
}

export default userRepository;