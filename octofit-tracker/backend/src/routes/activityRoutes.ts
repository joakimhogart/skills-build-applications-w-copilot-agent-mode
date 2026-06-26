import { Router } from "express";
import {
  listActivities,
  createActivity,
  getActivity,
  deleteActivity
} from "../controllers/activityController";

const router = Router();

router.get("/", listActivities);
router.post("/", createActivity);
router.get("/:id", getActivity);
router.delete("/:id", deleteActivity);

export default router;
