import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    anioLanzamiento: { type: Number },
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

gameSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Game = mongoose.model("Game", gameSchema);