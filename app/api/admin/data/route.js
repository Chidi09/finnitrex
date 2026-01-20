import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  const requests = await db.getRequests();
  const projects = await db.getProjects();

  return NextResponse.json({ requests, projects });
}

