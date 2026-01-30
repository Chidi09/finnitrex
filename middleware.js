import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get("admin_session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // SECURITY FIX: Verify JWT token to prevent forged cookies
    try {
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET environment variable is not set!");
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(session, secret);
      // Token is valid
      return NextResponse.next();
    } catch (err) {
      // Token invalid, expired, or forged - redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

