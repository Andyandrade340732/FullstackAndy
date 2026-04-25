import express from "express";
import cors from "cors";
import { middlewareRutaNoEncontrada } from "./server/v1/middlewares/middlewareRutaNoEncontrada.js";
import { middlewareErrores } from "./server/v1/middlewares/middlewareErrores.js";
import { middlewareLogs } from "./server/v1/middlewares/middlewareLogs.js";
import { connectMongo } from "./server/v1/config/mongo.config.js";
import apiRouter from "./server/v1/routes/index.js";

connectMongo();

const app = express();

app.use(cors());
app.use(express.json());
app.use(middlewareLogs);
app.use("/api/v1", apiRouter);

app.use(middlewareRutaNoEncontrada);
app.use(middlewareErrores);

export default app;