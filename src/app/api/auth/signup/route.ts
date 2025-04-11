import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    await connectDB();

    // Check if user already exists in both collections
    const existingMentor = await Mentor.findOne({ email });
    const existingMentee = await Mentee.findOne({ email });

    if (existingMentor || existingMentee) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "mentor") {
      const newMentor = new Mentor({ name, email, password: hashedPassword, provider: "email" });
      await newMentor.save();
    } else {
      const newMentee = new Mentee({ name, email, password: hashedPassword, provider: "email" });
      await newMentee.save();
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
