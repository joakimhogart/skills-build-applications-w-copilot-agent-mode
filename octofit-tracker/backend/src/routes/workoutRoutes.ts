import { Router } from "express";
import { listWorkouts, getWorkout } from "../controllers/workoutController";

const router = Router();
router.get("/", listWorkouts);
router.get("/:id", getWorkout);

export default router;
