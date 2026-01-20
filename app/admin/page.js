"use client";

import { useState } from "react";

export default function AdminConsole() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    projectType: "",
    projectId: "",
    depositAmount: "",
  });
  const [status, setStatus] = useState("");

  const handleAccept = async (e) => {
    e.preventDefault();
    setStatus("SENDING...");

    try {
      const res = await fetch("/api/accept-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(
          `EMAIL SENT ✅ | PROJECT ID: ${data.projectId || formData.projectId}`
        );
      } else {
        setStatus("ERROR SENDING EMAIL ❌");
      }
    } catch (err) {
      setStatus("ERROR SENDING EMAIL ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-lime-400 font-mono p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md border border-lime-900 p-8 rounded bg-gray-900/50">
        <h1 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
          ADMIN: ACCEPT PROJECT
        </h1>

        <form onSubmit={handleAccept} className="space-y-4">
          <div>
            <label className="block text-xs mb-1 text-gray-500">CLIENT NAME</label>
            <input
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-lime-500 outline-none"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-gray-500">
              CLIENT EMAIL
            </label>
            <input
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-lime-500 outline-none"
              type="email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-gray-500">
              PROJECT TYPE
            </label>
            <input
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-lime-500 outline-none"
              value={formData.projectType}
              onChange={(e) =>
                setFormData({ ...formData, projectType: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-gray-500">
              PROJECT ID (OPTIONAL)
            </label>
            <input
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-lime-500 outline-none font-mono"
              placeholder="FNX-8080"
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-gray-500">
              DEPOSIT AMOUNT
            </label>
            <input
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-lime-500 outline-none font-mono"
              placeholder="£2,500.00"
              value={formData.depositAmount}
              onChange={(e) =>
                setFormData({ ...formData, depositAmount: e.target.value })
              }
            />
          </div>

          <button className="w-full bg-lime-500 text-black font-bold py-3 hover:bg-lime-400 mt-4">
            SEND ACCEPTANCE EMAIL
          </button>
        </form>

        {status && <div className="mt-4 text-center text-sm">{status}</div>}
      </div>
    </div>
  );
}

