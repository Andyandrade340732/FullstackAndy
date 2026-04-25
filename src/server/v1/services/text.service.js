import iaModel from "../config/ia.config.js";

export const embellishText = async (text, tone = "elegante") => {
    try {
        const prompt = `Transforma el siguiente texto con un tono ${tone}: "${text}"`;
        const result = await iaModel.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error('error', error);
        if (error.message.includes("429")) {
            console.log("Cuota excedida. Reintentando en 2 segundos...");
            await new Promise(res => setTimeout(res, 2000));
            return embellishText(text, tone);
        }
        throw new Error("Error al procesar el texto con la IA");
    }
};