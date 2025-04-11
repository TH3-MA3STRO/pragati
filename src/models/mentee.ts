import mongoose from "mongoose";

const MenteeSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String, // Only for email/password users
    image: String,
    bio: String,
    linkedin: String,
    website: String,
    prefMeet: String,
    tags: { type: [String], default: [] },
    provider: { type: String, enum: ["email", "google", "linkedin"] },
    setupComplete: { type: Boolean, default: false }, // Tracks first-time setup
    expectations: String
  },
  { timestamps: true }
);

const Mentee = mongoose.models.Mentee || mongoose.model("Mentee", MenteeSchema);
export default Mentee;
