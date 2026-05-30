import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { crearError } from "./customError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loggerUtils = async (req) => {
    try {
        const { method, path: pathURL } = req;
        const fechaActual = new Date();
        const fechaISO = fechaActual.toISOString();
        const fechaSeparada = fechaISO.split("T");
        const fecha = fechaSeparada[0];
        const horaJunta = fechaSeparada[1];
        const horaSeparada = horaJunta.split(".");
        const hora = horaSeparada[0];
        const textoAGuardar = `[${hora}] ${method} ${pathURL}\n`;
        const logDir = path.join(__dirname, "..", "..", "..", "logger");
        const filePath = path.join(logDir, `${fecha}.txt`);
        await fs.appendFile(filePath, textoAGuardar);
    } catch (error) {
        const errorALanzar = crearError(500, "Error al crear logger");
        throw errorALanzar;
    }
}