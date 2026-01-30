import { NextResponse } from "next/server";

// ⚠️ DEPRECATED - DO NOT USE ⚠️
// 
// This route has been replaced with Drizzle ORM migrations.
// 
// MIGRATION INSTRUCTIONS:
// 1. Use Drizzle Kit for all database schema changes
// 2. Run `npm run db:generate` to generate migration files
// 3. Run `npm run db:migrate` to apply migrations to your database
// 4. See README.md for detailed migration instructions
//
// This route is kept for backwards compatibility only and will be removed in a future version.
// If you need to initialize the database, use Drizzle migrations instead.
//
export async function GET(request) {
  return NextResponse.json({
    error: "This route is deprecated. Use Drizzle migrations instead.",
    message: "See README.md for migration instructions. Run 'npm run db:migrate' to initialize the database.",
    deprecated: true
  }, { status: 410 }); // 410 Gone - indicates the resource is permanently unavailable
  // SECURITY: Require admin authentication
  const session = request.cookies.get("admin_session")?.value;
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 });
  }

  // Verify JWT token
  try {
    const { jwtVerify } = await import("jose");
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(session, secret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  // Additional safety: Disable in production unless explicitly enabled via env var
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SETUP_ROUTE !== "true") {
    return NextResponse.json({ 
      error: "This route is disabled in production. Set ALLOW_SETUP_ROUTE=true to enable (not recommended)" 
    }, { status: 403 });
  }

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

    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id VARCHAR(255) PRIMARY KEY,
        invoice_number VARCHAR(255) UNIQUE,
        client_name VARCHAR(255),
        client_email VARCHAR(255),
        client_company VARCHAR(255),
        base_package VARCHAR(255),
        selected_features JSONB,
        feature_quantities JSONB,
        ongoing_costs JSONB,
        base_total DECIMAL(10, 2),
        features_total DECIMAL(10, 2),
        subtotal DECIMAL(10, 2),
        vat DECIMAL(10, 2),
        total DECIMAL(10, 2),
        ongoing_total DECIMAL(10, 2),
        first_year_total DECIMAL(10, 2),
        discount_percentage DECIMAL(5, 2) DEFAULT 0,
        discount_amount DECIMAL(10, 2) DEFAULT 0,
        final_total DECIMAL(10, 2),
        expires_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        id VARCHAR(255) PRIMARY KEY,
        source_type VARCHAR(50),
        source_id VARCHAR(255),
        amount DECIMAL(10, 2),
        category VARCHAR(100),
        description TEXT,
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

