import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String }
}, { timestamps: true });

categorySchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Category = mongoose.model("Category", categorySchema);