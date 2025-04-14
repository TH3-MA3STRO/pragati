import { NextResponse } from "next/server";
import Mentor from "@/models/mentor";
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

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    };
    const mentor = await Mentor.findOne({ email: token.email });

    if (!mentor) {
      return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    }

    return NextResponse.json(mentor, { status: 200 });
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
