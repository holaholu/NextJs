import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Logic Paths .....This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = //only these paths are public
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" 
  const token = request.cookies.get("token")?.value || ""; //Get token from cookies

  if (isPublicPath && token) {
    //Redirects to home page if user is already logged in
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    //Redirects to login page if user is not logged in
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// 2.  Matching Paths
export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail"
  ],
};
