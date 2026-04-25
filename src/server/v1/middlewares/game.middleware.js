import { schemaBodyJuego, schemaParamsJuego } from "../schemas/game.validate.js";
import { validateMiddleware } from "./validate.middleware.js";

export const middlewareValidarBodyJuego = validateMiddleware(schemaBodyJuego, "body");
export const middlewareValidarParamsJuego = validateMiddleware(schemaParamsJuego, "params");