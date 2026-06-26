import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  role: { type: String, enum: ["member", "coach", "admin"], default: "member" },
  joinedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
