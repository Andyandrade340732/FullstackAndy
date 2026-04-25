import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.IA_API_KEY);

export const iaModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: {
        role: "system",
        parts: [{ text: "Eres un asistente experto en videojuegos. Tu única función es ayudar con información sobre videojuegos. Devuelve solo el texto, sin introducciones ni despedidas." }]
    }
});

export default iaModel;