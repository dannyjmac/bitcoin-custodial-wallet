import { Router } from "express";
import LightningController from "../controllers/lightning";

const lightningRoutes = Router();

lightningRoutes.post("/connect", LightningController.connect);

export { lightningRoutes };
