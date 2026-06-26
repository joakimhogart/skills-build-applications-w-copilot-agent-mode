import { Router } from "express";
import { listLeaderboardEntries, getLeaderboardEntry } from "../controllers/leaderboardController";

const router = Router();
router.get("/", listLeaderboardEntries);
router.get("/:id", getLeaderboardEntry);

export default router;
