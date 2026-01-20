// Simple in-memory store for requests and projects.
// In production, replace this with a real database.

global.store = global.store || {
  requests: [],
  projects: [],
};

export const db = {
  addRequest: (data) => {
    const id = `REQ-${Date.now().toString().slice(-4)}`;
    const newReq = { ...data, id, status: "PENDING", timestamp: new Date() };
    global.store.requests.unshift(newReq);
    return newReq;
  },
  getRequests: () => global.store.requests,
  getRequestById: (id) => global.store.requests.find((r) => r.id === id),

  createProject: (requestData, depositAmount) => {
    const projectId = `FNX-${Math.floor(Math.random() * 9000) + 1000}`;
    const newProject = {
      id: projectId,
      clientName: requestData.name,
      clientEmail: requestData.email,
      projectType: requestData.service || "Custom Solution",
      features: [],
      status: "INITIALIZING",
      paymentStatus: "AWAITING_DEPOSIT",
      depositAmount,
      progress: 0,
      createdAt: new Date(),
    };

    global.store.requests = global.store.requests.filter(
      (r) => r.id !== requestData.id
    );
    global.store.projects.push(newProject);
    return newProject;
  },
  getProject: (id) => global.store.projects.find((p) => p.id === id),
  updateProject: (id, updates) => {
    const idx = global.store.projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      global.store.projects[idx] = {
        ...global.store.projects[idx],
        ...updates,
      };
      return global.store.projects[idx];
    }
    return null;
  },
};

