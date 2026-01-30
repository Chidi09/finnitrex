# Database Migration Guide

This project uses **Drizzle ORM** for professional database schema management. The old `/api/setup` route has been deprecated and replaced with proper migrations.

## Quick Start

### 1. Initial Database Setup

If this is your first time setting up the database:

```bash
# Generate initial migration files from the schema
npm run db:generate

# Apply migrations to your database
npm run db:migrate
```

### 2. Making Schema Changes

When you need to modify the database schema:

1. **Edit the schema file:**
   ```bash
   # Open lib/db/schema.ts and make your changes
   ```

2. **Generate migration:**
   ```bash
   npm run db:generate
   ```
   This creates SQL migration files in the `drizzle/` directory.

3. **Review the migration:**
   ```bash
   # Check the generated SQL files in drizzle/ folder
   # Make sure they look correct before applying
   ```

4. **Apply the migration:**
   ```bash
   npm run db:migrate
   ```

### 3. Viewing Your Database

Use Drizzle Studio to visually browse your database:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:4983` where you can view and edit your data.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate migration files from schema changes |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:studio` | Open Drizzle Studio (database browser) |

## Environment Variables

Make sure you have the following environment variable set:

- **`POSTGRES_URL`** or **`POSTGRES_PRISMA_URL`** - Your PostgreSQL connection string
  - For Vercel Postgres: Automatically set by Vercel
  - For local development: Add to `.env.local`:
    ```env
    POSTGRES_URL=postgresql://user:password@localhost:5432/dbname
    ```

## Schema Files

- **Schema Definition:** `lib/db/schema.ts`
- **Drizzle Config:** `drizzle.config.ts`
- **Migration Files:** `drizzle/` directory (auto-generated)

## Migration Best Practices

1. **Always review generated migrations** before applying them
2. **Test migrations locally** before deploying to production
3. **Backup your database** before running migrations in production
4. **Use version control** - commit migration files to git
5. **Never edit migration files manually** - regenerate them instead

## Troubleshooting

### Migration fails with connection error

- Check that `POSTGRES_URL` is set correctly
- Verify your database is accessible
- For Vercel Postgres, ensure the database is linked to your project

### Schema changes not detected

- Make sure you've saved `lib/db/schema.ts`
- Run `npm run db:generate` again
- Check for TypeScript errors in the schema file

### Need to rollback a migration

Drizzle doesn't support automatic rollbacks. You'll need to:
1. Manually write a reverse migration
2. Or restore from a database backup

## Deprecated: /api/setup Route

The `/api/setup` route has been **deprecated** and will return a 410 Gone status. 

**Do not use it anymore.** Use Drizzle migrations instead.

## Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Drizzle Kit Documentation](https://orm.drizzle.team/kit-docs/overview)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
