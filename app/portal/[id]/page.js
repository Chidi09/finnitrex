"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Activity,
  Server,
  CreditCard,
  CheckCircle2,
  Plus,
} from "lucide-react";
import FinnitrexLogo from "@/components/FinnitrexLogo";
import { motion } from "framer-motion";

export default function ClientPortal({ params }) {
  const [features] = useState([
    { name: "User Authentication", status: "complete" },
    { name: "Payment Gateway", status: "in-progress" },
    { name: "Admin Dashboard", status: "pending" },
    { name: "Email Notifications", status: "pending" },
  ]);

  return (
    <main className="min-h-screen bg-black text-white font-sans p-6 md:p-12">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="scale-50 origin-left">
            <FinnitrexLogo className="w-16 h-16" textVisible={false} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest">
              PROJECT DASHBOARD
            </h1>
            <p className="text-xs text-lime-400 font-mono">
              ID: {params.id || "UNKNOWN"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          SYSTEM ACTIVE
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-2xl">
            <h2 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
              <Activity size={14} className="text-lime-400" /> Development
              Velocity
            </h2>
            <div className="relative pt-2">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
                    Phase 2
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-lime-400">
                    45%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Currently integrating API endpoints.
            </p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CreditCard size={100} />
            </div>
            <h2 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" /> Account
              Details
            </h2>
            <div className="space-y-2 font-mono text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Bank:</span> <span className="text-white">Barclays UK</span>
              </div>
              <div className="flex justify-between">
                <span>Sort:</span> <span className="text-white">20-00-00</span>
              </div>
              <div className="flex justify-between">
                <span>Acc:</span> <span className="text-white">87654321</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-lime-500">PAYMENT STATUS</span>
                <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs border border-yellow-500/30">
                  PENDING DEPOSIT
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Server className="text-lime-400" /> Feature Matrix
              </h2>
              <a
                href="mailto:info@finnitrex.com?subject=Feature%20Request"
                className="flex items-center gap-2 text-xs bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition-colors cursor-pointer"
              >
                <Plus size={14} /> REQUEST ADD-ON
              </a>
            </div>

            <div className="space-y-4">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg group hover:border-lime-500/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {feat.status === "complete" ? (
                      <CheckCircle2 className="text-lime-500" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600 border-t-lime-500 animate-spin" />
                    )}
                    <span
                      className={
                        feat.status === "complete"
                          ? "text-gray-400 line-through"
                          : "text-white"
                      }
                    >
                      {feat.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded uppercase
                    ${
                      feat.status === "complete"
                        ? "bg-lime-900/20 text-lime-500"
                        : feat.status === "in-progress"
                        ? "bg-blue-900/20 text-blue-400"
                        : "bg-gray-800 text-gray-500"
                    }
                  `}
                  >
                    {feat.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-emerald-900/10 border border-emerald-900/50 rounded-lg text-xs text-emerald-400 flex items-start gap-3">
              <ShieldCheck size={16} className="mt-0.5 shrink-0" />
              <p>
                This workspace is encrypted. You can request feature additions
                or removals by contacting your project lead. Changes to scope
                may affect the final timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

