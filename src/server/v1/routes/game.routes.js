import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { obtenerJuegosController, obtenerJuegoPorIdController, crearJuegoController, actualizarJuegoController, eliminarJuegoController } from "../controllers/game.controller.js";
import { middlewareValidarBodyJuego, middlewareValidarParamsJuego } from "../middlewares/game.middleware.js";

const gameRouter = Router();

gameRouter.use(authMiddleware);

gameRouter.get("/", obtenerJuegosController);
gameRouter.get("/:id", middlewareValidarParamsJuego, obtenerJuegoPorIdController);
gameRouter.post("/", middlewareValidarBodyJuego, crearJuegoController);
gameRouter.put("/:id", middlewareValidarParamsJuego, middlewareValidarBodyJuego, actualizarJuegoController);
gameRouter.delete("/:id", middlewareValidarParamsJuego, eliminarJuegoController);

export default gameRouter;