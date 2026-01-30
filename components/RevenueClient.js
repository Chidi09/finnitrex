"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Activity, Camera } from "lucide-react";

export default function RevenueClient({ stats }) {
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);

  // ⚠️ SCREENSHOT DETECTION LIMITATION ⚠️
  // This only detects keyboard shortcuts while the browser window is focused.
  // It CANNOT detect:
  // - OS-level screenshots triggered outside the browser
  // - Background screenshot tools
  // - Screen recording software
  // - Mobile device screenshots
  // 
  // DO NOT rely on this for actual security (DLP - Data Loss Prevention).
  // This is a visual gimmick only for user awareness.
  // For real security, use browser extensions or OS-level DLP solutions.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4"))) {
        triggerScreenshotEffect();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerScreenshotEffect = () => {
    setIsScreenshotMode(true);
    // Reset after effect
    setTimeout(() => setIsScreenshotMode(false), 4000);
  };

  // Mock profit breakdown
  const profitBreakdown = [
    { label: "Operational Costs", value: stats.totalRevenue * 0.2, color: "bg-red-500" },
    { label: "Tax Reserve (20%)", value: stats.totalRevenue * 0.2, color: "bg-yellow-500" },
    { label: "Net Profit", value: stats.totalRevenue * 0.6, color: "bg-lime-500" },
  ];

  return (
    <div className="relative">
      {/* Screenshot Flash Overlay */}
      <AnimatePresence>
        {isScreenshotMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none mix-blend-difference"
            transition={{ duration: 0.1, repeat: 1, repeatType: "reverse" }}
          />
        )}
      </AnimatePresence>

      {/* Main Dashboard Content */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${isScreenshotMode ? "grayscale-0" : ""}`}>
        <StatCard 
          title="Total Revenue" 
          value={`£${stats.totalRevenue.toLocaleString()}`} 
          icon={<DollarSign className="text-lime-400" />} 
          delay={0}
        />
        <StatCard 
          title="Pending Invoices" 
          value={`£${stats.pendingRevenue.toLocaleString()}`} 
          icon={<Activity className="text-yellow-400" />} 
          delay={0.1}
        />
        <StatCard 
          title="Active Projects" 
          value={stats.activeProjects} 
          icon={<TrendingUp className="text-emerald-400" />} 
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profit Breakdown Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            Profit Allocation
          </h3>
          <div className="space-y-6">
            {profitBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white font-mono">£{item.value.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / stats.totalRevenue) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Performance (Simple Bar Viz) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Monthly Performance</h3>
          <div className="flex items-end gap-4 h-48">
            {Object.entries(stats.revenueByMonth).map(([month, amount], i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-gray-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(amount / stats.totalRevenue) * 100}%` }}
                    className="w-full bg-lime-500/20 border-t-2 border-lime-500 group-hover:bg-lime-500/40 transition-colors"
                  />
                </div>
                <span className="text-xs text-gray-500 font-mono">{month}</span>
              </div>
            ))}
            {Object.keys(stats.revenueByMonth).length === 0 && (
              <p className="text-gray-500 text-sm w-full text-center self-center">No data available yet</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Screenshot Watermark (Only visible in screenshot mode) */}
      {isScreenshotMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 right-8 bg-black/90 border border-lime-500 p-4 rounded-xl z-50"
        >
          <p className="text-lime-400 font-black text-xl tracking-widest">FINNITREX</p>
          <p className="text-gray-400 text-xs font-mono">CONFIDENTIAL REVENUE REPORT</p>
          <p className="text-gray-500 text-[10px] mt-1">{new Date().toLocaleDateString()}</p>
        </motion.div>
      )}

      <div className="mt-8 flex justify-end">
        <button 
          onClick={triggerScreenshotEffect}
          className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-lime-400 transition-colors"
        >
          <Camera size={14} /> TEST SCREENSHOT EFFECT
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-lime-500/30 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-gray-800 rounded-lg">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </motion.div>
  );
}