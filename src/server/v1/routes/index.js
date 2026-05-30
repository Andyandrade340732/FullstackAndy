import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import gameRouter from "./game.routes.js";
import categoryRouter from "./category.routes.js";
import v1PublicRoutes from "./v1.public.routes.js";
import cloudinaryRouter from "./cloudinary.routes.js";

const v1Router = Router();

v1Router.use("/public", v1PublicRoutes);
v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/juegos", gameRouter);
v1Router.use("/categorias", categoryRouter);
v1Router.use("/cloudinary", cloudinaryRouter);

export default v1Router;