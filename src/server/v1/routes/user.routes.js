import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { obtenerUsuariosController, cambiarPlanController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/", obtenerUsuariosController);
userRouter.patch("/plan", cambiarPlanController);

export default userRouter;