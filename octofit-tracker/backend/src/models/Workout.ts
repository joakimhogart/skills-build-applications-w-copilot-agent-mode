import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
