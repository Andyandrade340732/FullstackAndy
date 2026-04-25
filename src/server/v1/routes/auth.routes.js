import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller.js";
import { middlewareValidarBodyRegister, middlewareValidarBodyLogin } from "../middlewares/user.middleware.js";

const authRouter = Router();

authRouter.post("/register", middlewareValidarBodyRegister, registerController);
authRouter.post("/login", middlewareValidarBodyLogin, loginController);

export default authRouter;