import { Request, Response } from "express";
import Workout from "../models/Workout";

export async function listWorkouts(req: Request, res: Response) {
  const workouts = await Workout.find();
  res.json(workouts);
}

export async function getWorkout(req: Request, res: Response) {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }
  res.json(workout);
}
