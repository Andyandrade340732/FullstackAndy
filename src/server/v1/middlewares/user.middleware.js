import { schemaBodyRegister, schemaBodyLogin } from "../schemas/user.validate.js";
import { validateMiddleware } from "./validate.middleware.js";

export const middlewareValidarBodyRegister = validateMiddleware(schemaBodyRegister, "body");
export const middlewareValidarBodyLogin = validateMiddleware(schemaBodyLogin, "body");