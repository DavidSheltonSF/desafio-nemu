import { Router } from "express";
import { JourneyController } from "../controllers/JourneyController";

const router = Router();
const controller = new JourneyController();

router.post("/journeys", controller.upload)
router.get("/journeys", controller.read);

export default router