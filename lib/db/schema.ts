import { pgTable, varchar, text, timestamp, integer, decimal, jsonb } from "drizzle-orm/pg-core";

// Requests table - Contact form submissions
export const requests = pgTable("requests", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  service: varchar("service", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("PENDING"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects table - Active client projects
export const projects = pgTable("projects", {
  id: varchar("id", { length: 255 }).primaryKey(),
  clientName: varchar("client_name", { length: 255 }),
  clientEmail: varchar("client_email", { length: 255 }),
  projectType: varchar("project_type", { length: 255 }),
  status: varchar("status", { length: 50 }),
  paymentStatus: varchar("payment_status", { length: 50 }),
  depositAmount: varchar("deposit_amount", { length: 50 }),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quotes table - Generated quotes/invoices
export const quotes = pgTable("quotes", {
  id: varchar("id", { length: 255 }).primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 255 }).unique(),
  clientName: varchar("client_name", { length: 255 }),
  clientEmail: varchar("client_email", { length: 255 }),
  clientCompany: varchar("client_company", { length: 255 }),
  basePackage: varchar("base_package", { length: 255 }),
  selectedFeatures: jsonb("selected_features"),
  featureQuantities: jsonb("feature_quantities"),
  ongoingCosts: jsonb("ongoing_costs"),
  baseTotal: decimal("base_total", { precision: 10, scale: 2 }),
  featuresTotal: decimal("features_total", { precision: 10, scale: 2 }),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }),
  vat: decimal("vat", { precision: 10, scale: 2 }),
  total: decimal("total", { precision: 10, scale: 2 }),
  ongoingTotal: decimal("ongoing_total", { precision: 10, scale: 2 }),
  firstYearTotal: decimal("first_year_total", { precision: 10, scale: 2 }),
  discountPercentage: decimal("discount_percentage", { precision: 5, scale: 2 }).default("0"),
  discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }).default("0"),
  finalTotal: decimal("final_total", { precision: 10, scale: 2 }),
  expiresAt: timestamp("expires_at"),
  status: varchar("status", { length: 50 }).default("PENDING"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Revenue table - Revenue tracking entries
export const revenue = pgTable("revenue", {
  id: varchar("id", { length: 255 }).primaryKey(),
  sourceType: varchar("source_type", { length: 50 }),
  sourceId: varchar("source_id", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});
