import { Router } from "express";
import { handleTransform } from "../controllers/text.controller.js";
import { getTokenImage } from "../controllers/image.controller.js";
import limiter from "../middlewares/rateLimiter.middleware.js";

const v1PublicRoutes = Router();

v1PublicRoutes.post("/transform", handleTransform);
v1PublicRoutes.post("/imagen", getTokenImage);

v1PublicRoutes.use(limiter);
v1PublicRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "Estoy vivo" });
});

export default v1PublicRoutes;