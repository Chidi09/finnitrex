import { NextResponse } from "next/server";

export async function POST(request) {
  try {
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

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: "Auth Error" }, { status: 500 });
  }
}

