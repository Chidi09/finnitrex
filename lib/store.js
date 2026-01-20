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
};
