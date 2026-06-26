import { Request, Response } from "express";
import User from "../models/User";

export async function listUsers(req: Request, res: Response) {
  const users = await User.find().populate("teamId");
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const user = await User.findById(req.params.id).populate("teamId");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}
