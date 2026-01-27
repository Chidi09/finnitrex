import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    // Rate Limit: 5 attempts per 10 minutes
    const { success } = await rateLimit({
      ip,
      action: "login",
      limit: 5,
      windowMs: 10 * 60 * 1000 // 10 minutes
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { accessKey } = await request.json();

    if (accessKey === process.env.ADMIN_ACCESS_KEY) {
      const response = NextResponse.json({ success: true });

      response.cookies.set("admin_session", "active", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return response;
    }

    // Artificial delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (e) {
    console.error("Login Error:", e);
    return NextResponse.json({ error: "Auth Error" }, { status: 500 });
  }
}

