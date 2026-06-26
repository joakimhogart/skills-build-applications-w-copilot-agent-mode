import { Request, Response } from "express";
import LeaderboardEntry from "../models/LeaderboardEntry";

export async function listLeaderboardEntries(req: Request, res: Response) {
  const entries = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate("userId teamId");
  res.json(entries);
}

export async function getLeaderboardEntry(req: Request, res: Response) {
  const entry = await LeaderboardEntry.findById(req.params.id).populate("userId teamId");
  if (!entry) {
    return res.status(404).json({ message: "Leaderboard entry not found" });
  }
  res.json(entry);
}
