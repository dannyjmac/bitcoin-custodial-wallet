import { Router } from "express";
import { lightningRoutes } from "./lightning.routes";

const router = Router();

router.use("/lightning", lightningRoutes);

export { router };
