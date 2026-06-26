import mongoose from "mongoose";

const leaderboardEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true },
  period: { type: String, required: true, default: "weekly" }
}, {
  timestamps: true,
});

const LeaderboardEntry = mongoose.model("LeaderboardEntry", leaderboardEntrySchema);
export default LeaderboardEntry;
