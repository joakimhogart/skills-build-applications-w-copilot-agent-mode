import express from "express";
import { connectDatabase } from "./db";
import activityRoutes from "./routes/activityRoutes";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import workoutRoutes from "./routes/workoutRoutes";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "OctoFit Tracker backend is running." });
});

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/workouts", workoutRoutes);

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
