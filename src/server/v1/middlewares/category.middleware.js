import { schemaBodyCategoria, schemaParamsCategoria } from "../schemas/category.validate.js";
import { validateMiddleware } from "./validate.middleware.js";

export const middlewareValidarBodyCategoria = validateMiddleware(schemaBodyCategoria, "body");
export const middlewareValidarParamsCategoria = validateMiddleware(schemaParamsCategoria, "params");