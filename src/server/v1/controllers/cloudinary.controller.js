import cloudinary from "../config/cloudinary.config.js";

export const obtenerFirmaController = async (req, res, next) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = "videojuegos";

        const signature = cloudinary.utils.api_sign_request(
            { timestamp, folder },
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            timestamp,
            signature,
            folder,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
        });
    } catch (error) {
        next(error);
    }
};

export const eliminarImagenController = async (req, res, next) => {
    try {
        const { publicId } = req.body;
        await cloudinary.uploader.destroy(publicId);
        res.status(200).json({ mensaje: "Imagen eliminada" });
    } catch (error) {
        next(error);
    }
};