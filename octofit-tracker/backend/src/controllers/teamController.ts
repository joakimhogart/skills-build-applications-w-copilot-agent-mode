import { Request, Response } from "express";
import Team from "../models/Team";

export async function listTeams(req: Request, res: Response) {
  const teams = await Team.find().populate("members");
  res.json(teams);
}

export async function getTeam(req: Request, res: Response) {
  const team = await Team.findById(req.params.id).populate("members");
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }
  res.json(team);
}
