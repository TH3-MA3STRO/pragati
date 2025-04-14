// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/signup",
  "/contact",
  "/resources",
  "/forum",
  "/legal",
  "/mentee-profile-setup",
  "/mentor-profile-setup"
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  // Fetch token from JWT
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token?.setup) {
    if (token?.role === "mentee") return NextResponse.redirect(new URL("/mentee-profile-setup", request.url));
    if (token?.role === "mentor") return NextResponse.redirect(new URL("/mentor-profile-setup", request.url));
  }
  return NextResponse.next();
}

// Apply to all routes except static and API assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
