import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/sign-in", "/verify-otp"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = pathname.startsWith("/dashboard");
  const isPublicAuthRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (sessionCookie && isPublicAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/verify-otp"],
};
