"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Check, X, Calendar } from "lucide-react";
import RevenueDashboard from "@/components/RevenueDashboard";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
        setProjects(data.projects || []);
        setQuotes(data.quotes || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (reqId) => {
    const deposit = window.prompt(
      "Enter Deposit Amount (e.g., £5,000):",
      "£2,500"
    );
    if (!deposit) return;

    const res = await fetch("/api/admin/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reqId, deposit }),
    });

    if (res.ok) {
      await fetchData();
      alert("Project initialized and acceptance email sent.");
    } else {
      alert("Failed to accept request.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono p-8">
      <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <h1 className="text-2xl font-bold text-white">MISSION CONTROL</h1>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-lime-400 hover:text-white transition-colors"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />{" "}
          REFRESH DATA
        </button>
      </header>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded font-bold ${
            activeTab === "requests" ? "bg-lime-500 text-black" : "bg-gray-800"
          }`}
        >
          INCOMING REQUESTS ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded font-bold ${
            activeTab === "projects" ? "bg-lime-500 text-black" : "bg-gray-800"
          }`}
        >
          ACTIVE PROJECTS ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-2 rounded font-bold ${
            activeTab === "quotes" ? "bg-lime-500 text-black" : "bg-gray-800"
          }`}
        >
          QUOTES ({quotes.length})
        </button>
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-2 rounded font-bold ${
            activeTab === "revenue" ? "bg-lime-500 text-black" : "bg-gray-800"
          }`}
        >
          REVENUE
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === "requests" && requests.length === 0 && (
          <div className="text-gray-600 italic">
            No pending requests in buffer.
          </div>
        )}

        {activeTab === "requests" &&
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg flex justify-between items-start"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lime-400 font-bold">{req.name}</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                    {req.email}
                  </span>
                </div>
                <p className="text-white font-bold mb-2">{req.service}</p>
                <p className="text-sm text-gray-400 max-w-xl">
                  {req.message}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {req.timestamp &&
                    new Date(req.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(req.id)}
                  className="bg-lime-600 hover:bg-lime-500 text-black px-4 py-2 rounded font-bold flex items-center gap-2"
                >
                  <Check size={16} /> ACCEPT
                </button>
                <button className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-4 py-2 rounded font-bold flex items-center gap-2">
                  <X size={16} /> REJECT
                </button>
              </div>
            </div>
          ))}

        {activeTab === "projects" &&
          projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-gray-900/50 border border-emerald-900/30 p-6 rounded-lg"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-xl text-white font-bold">
                    {proj.clientName}
                  </h3>
                  <p className="text-emerald-500 text-sm">
                    ID: {proj.id} | TYPE: {proj.projectType}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">PAYMENT STATUS</div>
                  <div
                    className={`font-bold ${
                      proj.paymentStatus === "PAID"
                        ? "text-lime-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {proj.paymentStatus}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 border-t border-gray-800 pt-4">
                <button className="text-xs bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">
                  UPDATE PROGRESS
                </button>
                <button className="text-xs bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">
                  CONFIRM PAYMENT
                </button>
              </div>
            </div>
          ))}

        {activeTab === "quotes" && quotes.length === 0 && (
          <div className="text-gray-600 italic">No quotes in system.</div>
        )}

        {activeTab === "quotes" &&
          quotes.map((quote) => {
            const expiresAt = new Date(quote.expires_at);
            const isExpired = expiresAt < new Date();
            const daysUntilExpiry = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div
                key={quote.id}
                className={`bg-gray-900/50 border p-6 rounded-lg ${
                  isExpired ? "border-red-900/30" : daysUntilExpiry <= 7 ? "border-yellow-900/30" : "border-blue-900/30"
                }`}
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-white font-bold">{quote.client_name}</h3>
                    <p className="text-blue-400 text-sm">
                      Invoice: {quote.invoice_number} | Package: {quote.base_package}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{quote.client_email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">STATUS</div>
                    <div
                      className={`font-bold ${
                        quote.status === "ACCEPTED"
                          ? "text-lime-500"
                          : quote.status === "EXPIRED"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {quote.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">TOTAL</div>
                    <div className="text-lime-400 font-mono font-bold">£{parseFloat(quote.total).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 border-t border-gray-800 pt-4">
                  <button
                    onClick={async () => {
                      const res = await fetch("/api/admin/quote/status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          invoiceNumber: quote.invoice_number, 
                          status: "ACCEPTED" 
                        }),
                      });
                      if (res.ok) {
                        await fetchData();
                        alert("Quote status updated to ACCEPTED");
                      }
                    }}
                    className="text-xs bg-lime-600 hover:bg-lime-500 text-black px-3 py-2 rounded font-bold"
                  >
                    ACCEPT
                  </button>
                  <button
                    onClick={async () => {
                      const res = await fetch("/api/admin/quote/status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          invoiceNumber: quote.invoice_number, 
                          status: "EXPIRED" 
                        }),
                      });
                      if (res.ok) {
                        await fetchData();
                        alert("Quote marked as EXPIRED");
                      }
                    }}
                    className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-500 px-3 py-2 rounded font-bold"
                  >
                    MARK EXPIRED
                  </button>
                  {!isExpired && daysUntilExpiry <= 7 && (
                    <button
                      onClick={async () => {
                        const res = await fetch("/api/admin/quote/reminder", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            invoiceNumber: quote.invoice_number
                          }),
                        });
                        if (res.ok) {
                          alert("Reminder email sent to client");
                        }
                      }}
                      className="text-xs bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-500 px-3 py-2 rounded font-bold"
                    >
                      SEND REMINDER
                    </button>
                  )}
                  <div className="ml-auto text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {isExpired ? (
                      <span className="text-red-500">Expired {Math.abs(daysUntilExpiry)} days ago</span>
                    ) : (
                      <span>Expires in {daysUntilExpiry} days</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        {activeTab === "revenue" && (
          <RevenueDashboard />
        )}
      </div>
    </div>
  );
}

