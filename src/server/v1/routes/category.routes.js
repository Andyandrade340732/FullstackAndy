import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { obtenerCategoriasController, obtenerCategoriaPorIdController, crearCategoriaController, actualizarCategoriaController, eliminarCategoriaController } from "../controllers/category.controller.js";
import { middlewareValidarBodyCategoria, middlewareValidarParamsCategoria } from "../middlewares/category.middleware.js";

const categoryRouter = Router();

categoryRouter.use(authMiddleware);

categoryRouter.get("/", obtenerCategoriasController);
categoryRouter.get("/:id", middlewareValidarParamsCategoria, obtenerCategoriaPorIdController);
categoryRouter.post("/", middlewareValidarBodyCategoria, crearCategoriaController);
categoryRouter.put("/:id", middlewareValidarParamsCategoria, middlewareValidarBodyCategoria, actualizarCategoriaController);
categoryRouter.delete("/:id", middlewareValidarParamsCategoria, eliminarCategoriaController);

export default categoryRouter;