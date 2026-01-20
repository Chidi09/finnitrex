import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS requests (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        service VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        client_name VARCHAR(255),
        client_email VARCHAR(255),
        project_type VARCHAR(255),
        status VARCHAR(50),
        payment_status VARCHAR(50),
        deposit_amount VARCHAR(50),
        progress INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({
      message: "Database Initialized Successfully ✅",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

