import { sql } from "@vercel/postgres";

export const db = {
  // Incoming requests
  addRequest: async (data) => {
    const id = `REQ-${Date.now().toString().slice(-4)}`;
    await sql`
      INSERT INTO requests (id, name, email, service, message, status)
      VALUES (${id}, ${data.name}, ${data.email}, ${data.service}, ${data.message}, 'PENDING')
    `;
    return { ...data, id };
  },

  getRequests: async () => {
    const { rows } =
      await sql`SELECT * FROM requests ORDER BY created_at DESC`;
    return rows;
  },

  getRequestById: async (id) => {
    const { rows } = await sql`SELECT * FROM requests WHERE id = ${id}`;
    return rows[0];
  },

  // Projects
  createProject: async (reqData, depositAmount) => {
    const projectId = `FNX-${Math.floor(Math.random() * 9000) + 1000}`;

    await sql`
      INSERT INTO projects (id, client_name, client_email, project_type, status, payment_status, deposit_amount, progress)
      VALUES (
        ${projectId},
        ${reqData.name},
        ${reqData.email},
        ${reqData.service || "Custom Solution"},
        'INITIALIZING',
        'AWAITING_DEPOSIT',
        ${depositAmount},
        0
      )
    `;

    await sql`UPDATE requests SET status = 'ACCEPTED' WHERE id = ${reqData.id}`;

    return {
      id: projectId,
      clientName: reqData.name,
      clientEmail: reqData.email,
      projectType: reqData.service || "Custom Solution",
      depositAmount,
    };
  },

  getProjects: async () => {
    const { rows } =
      await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    return rows.map((p) => ({
      id: p.id,
      clientName: p.client_name,
      clientEmail: p.client_email,
      projectType: p.project_type,
      status: p.status,
      paymentStatus: p.payment_status,
      progress: p.progress,
    }));
  },

  // Quotes
  saveQuote: async (quoteData) => {
    const id = `QUO-${Date.now().toString().slice(-4)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

    await sql`
      INSERT INTO quotes (
        id, invoice_number, client_name, client_email, client_company,
        base_package, selected_features, feature_quantities, ongoing_costs,
        base_total, features_total, subtotal, vat, total, ongoing_total, first_year_total,
        discount_percentage, discount_amount, final_total,
        expires_at, status
      )
      VALUES (
        ${id},
        ${quoteData.invoiceNumber},
        ${quoteData.clientName},
        ${quoteData.clientEmail},
        ${quoteData.clientCompany || null},
        ${quoteData.basePackage},
        ${JSON.stringify(quoteData.selectedFeatures)},
        ${JSON.stringify(quoteData.featureQuantities)},
        ${JSON.stringify(quoteData.ongoingCosts)},
        ${quoteData.baseTotal},
        ${quoteData.featuresTotal},
        ${quoteData.subtotal},
        ${quoteData.vat},
        ${quoteData.total},
        ${quoteData.ongoingTotal},
        ${quoteData.firstYearTotal},
        ${quoteData.discountPercentage || 0},
        ${quoteData.discountAmount || 0},
        ${quoteData.finalTotal || quoteData.total},
        ${expiresAt.toISOString()},
        'PENDING'
      )
    `;
    return { ...quoteData, id, expiresAt };
  },

  getQuote: async (invoiceNumber) => {
    const { rows } = await sql`SELECT * FROM quotes WHERE invoice_number = ${invoiceNumber}`;
    return rows[0];
  },

  getQuotes: async () => {
    const { rows } = await sql`SELECT * FROM quotes ORDER BY created_at DESC`;
    return rows;
  },

  updateQuoteStatus: async (invoiceNumber, status) => {
    await sql`UPDATE quotes SET status = ${status} WHERE invoice_number = ${invoiceNumber}`;
    return { success: true };
  },

  // Revenue
  getRevenueData: async () => {
    // Get all accepted quotes and projects with payments
    const { rows: acceptedQuotes } = await sql`
      SELECT total, final_total, discount_amount, created_at 
      FROM quotes 
      WHERE status = 'ACCEPTED'
    `;
    
    const { rows: paidProjects } = await sql`
      SELECT deposit_amount, created_at 
      FROM projects 
      WHERE payment_status = 'PAID' OR payment_status = 'AWAITING_DEPOSIT'
    `;

    return {
      quotes: acceptedQuotes,
      projects: paidProjects
    };
  },

  addRevenueEntry: async (data) => {
    const id = `REV-${Date.now().toString().slice(-4)}`;
    await sql`
      INSERT INTO revenue (id, source_type, source_id, amount, category, description)
      VALUES (${id}, ${data.sourceType}, ${data.sourceId}, ${data.amount}, ${data.category}, ${data.description})
    `;
    return { ...data, id };
  },
};
