import { connectDB } from "@/lib/mongodb";
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";

import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  try {

    const token = await getToken({
      req: req as unknown as NextRequest,
      secret: process.env.NEXTAUTH_SECRET,
    });


    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { role, email } = token;
    const data = await req.json();
    await connectDB();

    if (role === "mentor") {
      const mentor = await Mentor.findOneAndUpdate(
        { email },
        { ...data, setupComplete: true },
        { new: true }
      );
      if (!mentor) {
        return new Response(JSON.stringify({ error: "Mentor not found" }), { status: 404 });
      }
    } else if (role === "mentee") {
      const mentee = await Mentee.findOneAndUpdate(
        { email },
        { ...data, setupComplete: true },
        { new: true }
      );
      if (!mentee) {
        return new Response(JSON.stringify({ error: "Mentee not found" }), { status: 404 });
      }
    } else {
      return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Profile setup completed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
