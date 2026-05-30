import { Router } from "express";
import { obtenerFirmaController, eliminarImagenController } from "../controllers/cloudinary.controller.js";

const cloudinaryRouter = Router();

cloudinaryRouter.get("/signature", obtenerFirmaController);
cloudinaryRouter.delete("/destroy", eliminarImagenController);

export default cloudinaryRouter;