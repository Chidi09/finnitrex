This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

**Required for production:**

- `JWT_SECRET` - Secret key for signing admin session tokens (generate a strong random string, e.g., `openssl rand -base64 32`)
- `ADMIN_ACCESS_KEY` - Password for admin login
- `REDIS_URL` - Redis connection URL (e.g., from Upstash) - **CRITICAL for rate limiting in production**
- `ZEPTOMAIL_TOKEN` - ZeptoMail API token for sending emails
- `EMAIL_FROM` - Email address for sending quotes (optional, defaults to noreply@finnitrex.com)
- Database connection variables (Vercel Postgres)

**Note:** Without `REDIS_URL`, rate limiting falls back to an insecure in-memory store that doesn't work correctly in serverless environments.

**Database connection:**
- `POSTGRES_URL` or `POSTGRES_PRISMA_URL` - Vercel Postgres connection string (automatically set when using Vercel Postgres)

## Database Migrations

This project uses **Drizzle ORM** for professional database schema management. The old `/api/setup` route has been deprecated.

📖 **For detailed migration instructions, see [doc/MIGRATION_GUIDE.md](doc/MIGRATION_GUIDE.md)**

### Initial Setup

1. **Set up your database connection:**
   - For Vercel Postgres: The connection string is automatically available as `POSTGRES_URL`
   - For local development: Create `.env.local` with your connection string:
     ```env
     POSTGRES_URL=postgresql://user:password@localhost:5432/dbname
     ```

2. **Generate and apply migrations:**
   ```bash
   # Generate migration files from schema changes
   npm run db:generate
   
   # Apply migrations to your database
   npm run db:migrate
   ```

3. **View your database (optional):**
   ```bash
   # Open Drizzle Studio (visual database browser)
   npm run db:studio
   ```

### Making Schema Changes

1. Edit `lib/db/schema.ts` to modify your table definitions
2. Run `npm run db:generate` to create migration files
3. Review the generated SQL in the `drizzle/` directory
4. Run `npm run db:migrate` to apply changes to your database

### Migration Workflow

```bash
# 1. Make changes to lib/db/schema.ts
# 2. Generate migration
npm run db:generate

# 3. Review generated SQL in drizzle/ folder
# 4. Apply migration
npm run db:migrate
```

**Important:** Always review generated migrations before applying them to production!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
