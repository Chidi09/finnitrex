/**
 * Database Migration Script
 * 
 * This script helps you run database migrations using Drizzle.
 * 
 * Usage:
 *   npx tsx scripts/migrate.ts
 * 
 * Or use the npm scripts:
 *   npm run db:migrate
 */

import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";
import * as schema from "../lib/db/schema";

async function runMigrations() {
  try {
    console.log("🔄 Starting database migration...");
    
    const db = drizzle(sql, { schema });
    
    await migrate(db, { migrationsFolder: "./drizzle" });
    
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
