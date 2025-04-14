import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    bio: String,
    linkedin: String,
    website: String,
    tags: { type: [String], default: [] },
    provider: { type: String, enum: ["email", "google", "linkedin"] },
    setupComplete: { type: Boolean, default: false }, // Tracks first-time setup
  },
  { timestamps: true }
);

const Mentor = mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);
export default Mentor;
