import mongoose from "mongoose";

let isConnected = false;

export async function connectMongo() {
    if (isConnected) {
        console.log("Ya esta conectado a MongoDB");
        return;
    }
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("Falta MONGO_URI");
    }
    try {
        await mongoose.connect(mongoUri, {
            dbName: process.env.MONGO_DATABASE || "test",
            serverSelectionTimeoutMS: 10000,
        });
        isConnected = true;
        console.log("Conectado a MongoDB correctamente");
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err.message);
        process.exit(1);
    }
}