import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  performedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
