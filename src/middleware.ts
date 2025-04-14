import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";
import { connectDB } from "@/lib/mongodb";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  await connectDB();
  const mentor = await Mentor.findOne({ email: token?.email });
  const mentee = await Mentee.findOne({ email: token?.email });

  if (mentor) {
    if(!mentor.setupComplete){
      const url = request.nextUrl.clone();
      url.pathname = '/mentor-profile-setup';
      return NextResponse.redirect(url);
    }
  }
  if (mentee){
    if(!mentor.setupComplete){
      const url = request.nextUrl.clone();
      url.pathname = '/mentee-profile-setup';
      return NextResponse.redirect(url);
    }
  }
  // If setupComplete is false, redirect to /setup

  // If setupComplete is true, allow the request
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/career-chatbot',

    // '/((?!login$|signup$|resources$|forum$|legal$).*)',
  ],
};
