import { Router } from "express";
import { JourneyController } from "../controllers/JourneyController";

const router = Router();
const controller = new JourneyController();

router.post("/journeys", controller.upload)

export default router