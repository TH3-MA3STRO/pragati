import { NextResponse } from "next/server";
import Mentee from "@/models/mentee";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  try {
    const token = await getToken({
      req: req as unknown as NextRequest,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("Token:", token); // Debugging: Log the token

    if (!token) {
      console.error("Unauthorized: Token missing or invalid");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const mentee = await Mentee.findOne({ email: token.email });

    if (!mentee) {
      console.error("Mentee not found for email:", token.email);
      return NextResponse.json({ error: "Mentee not found" }, { status: 404 });
    }

    return NextResponse.json(mentee, { status: 200 });
  } catch (error) {
    console.error("Error fetching mentee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
