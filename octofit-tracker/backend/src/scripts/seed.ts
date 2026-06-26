/**
 * Seed the octofit_db database with test data
 * This script populates MongoDB with users, teams, activities, leaderboard entries, and workouts.
 */

import { connectDatabase } from "../db";
import User from "../models/User";
import Team from "../models/Team";
import Activity from "../models/Activity";
import LeaderboardEntry from "../models/LeaderboardEntry";
import Workout from "../models/Workout";

async function seed() {
  console.log("Seed the octofit_db database with test data");

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.create([
    {
      name: "Ocean Sprinters",
      description: "A team focused on coastal running and swimming challenges."
    },
    {
      name: "Mountain Pulse",
      description: "Strength and endurance training for high-altitude adventure seekers."
    }
  ]);

  const users = await User.create([
    {
      username: "jess_fit",
      email: "jess@example.com",
      displayName: "Jess Rivera",
      passwordHash: "hashed-password-123",
      teamId: teams[0]._id,
      role: "member"
    },
    {
      username: "coachmax",
      email: "max@example.com",
      displayName: "Max Landon",
      passwordHash: "hashed-password-456",
      teamId: teams[0]._id,
      role: "coach"
    },
    {
      username: "seth_trainer",
      email: "seth@example.com",
      displayName: "Seth Carter",
      passwordHash: "hashed-password-789",
      teamId: teams[1]._id,
      role: "member"
    }
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all([teams[0].save(), teams[1].save()]);

  await Activity.create([
    {
      userId: users[0]._id,
      type: "Running",
      durationMinutes: 35,
      calories: 380,
      performedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      userId: users[0]._id,
      type: "Yoga",
      durationMinutes: 45,
      calories: 200,
      performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      userId: users[2]._id,
      type: "Cycling",
      durationMinutes: 60,
      calories: 560,
      performedAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
    }
  ]);

  await LeaderboardEntry.create([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      totalPoints: 840,
      rank: 1,
      period: "weekly"
    },
    {
      userId: users[2]._id,
      teamId: teams[1]._id,
      totalPoints: 720,
      rank: 2,
      period: "weekly"
    }
  ]);

  await Workout.create([
    {
      title: "Sunrise HIIT Circuit",
      description: "A 25-minute high intensity training session for cardio and strength.",
      difficulty: "advanced",
      durationMinutes: 25,
      caloriesBurned: 320
    },
    {
      title: "Core Stabilizer",
      description: "A beginner-friendly workout to build core strength and posture.",
      difficulty: "beginner",
      durationMinutes: 30,
      caloriesBurned: 180
    },
    {
      title: "Trail Endurance",
      description: "A longer intermediate workout designed for hiking and trail endurance.",
      difficulty: "intermediate",
      durationMinutes: 55,
      caloriesBurned: 470
    }
  ]);

  console.log("Database seed complete. Use API routes to verify inserted collections.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding error:", error);
  process.exit(1);
});
