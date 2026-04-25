import { handleUpload } from "@vercel/blob/client";

export const getTokenImage = async (req, res) => {
    try {
        const body = req.body;
        const jsonResponse = await handleUpload({
            body,
            request: req,
            async onBeforeGenerateToken(pathname) {
                if (!pathname) {
                    throw new Error("Pathname inválido");
                }
                return {
                    allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({
                        folder: "juegos",
                        uploadedAt: new Date().toISOString(),
                    }),
                };
            },
            async onUploadCompleted({ blob, tokenPayload }) {
                console.log("Upload completado");
                console.log("URL:", blob.url);
            },
        });
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.error("Error al obtener token de la imagen:", error);
        return res.status(400).json({
            ok: false,
            error: error.message || "Error generando upload token",
        });
    }
};