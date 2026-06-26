import { Request, Response } from "express";
import Activity from "../models/Activity.js";

export async function listActivities(req: Request, res: Response) {
  const activities = await Activity.find().sort({ performedAt: -1 });
  res.json(activities);
}

export async function createActivity(req: Request, res: Response) {
  const activity = new Activity(req.body);
  const saved = await activity.save();
  res.status(201).json(saved);
}

export async function getActivity(req: Request, res: Response) {
  const activity = await Activity.findById(req.params.id);
  if (!activity) {
    return res.status(404).json({ message: "Activity not found" });
  }
  res.json(activity);
}

export async function deleteActivity(req: Request, res: Response) {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) {
    return res.status(404).json({ message: "Activity not found" });
  }
  res.json({ message: "Activity deleted" });
}
