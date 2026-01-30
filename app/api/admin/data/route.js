import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  const requests = await db.getRequests();
  const projects = await db.getProjects();
  const quotes = await db.getQuotes();

  return NextResponse.json({ requests, projects, quotes });
}

