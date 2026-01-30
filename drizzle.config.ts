import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Vercel Postgres uses POSTGRES_URL or POSTGRES_PRISMA_URL
    // For local development, use .env.local with your connection string
    url: process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL!,
  },
} satisfies Config;
