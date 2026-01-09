"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Send, 
  Cpu, 
  BookOpenCheck, // For LMS
  AppWindow,     // For Static Sites/Software
  ScanEye,       // For Optics/Data
  Loader2 
} from "lucide-react";

const services = [
  { id: "lms", label: "LMS Architecture", icon: BookOpenCheck },
  { id: "software", label: "Custom Software & Web", icon: AppWindow },
  { id: "ai", label: "AI & Data Analytics", icon: Cpu },
  { id: "optics", label: "Optics & Vision Systems", icon: ScanEye },
  { id: "robotics", label: "Future Labs (Robotics)", icon: Terminal }, // Kept as secondary
];

export default function ContactTerminal() {
  const [form, setForm] = useState({ name: "", email: "", service: services[0].label, message: "" });
  const [status, setStatus] = useState("IDLE"); // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("SUCCESS");
        setForm({ name: "", email: "", service: services[0].label, message: "" });
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      {/* Terminal Window Header */}
      <div className="bg-gray-900 rounded-t-lg border border-gray-700 p-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-xs text-gray-500 font-mono ml-4">root@finnitrex:~/communications-uplink</div>
      </div>

      {/* Terminal Body */}
      <div className="bg-black/90 backdrop-blur-md border border-t-0 border-gray-700 rounded-b-lg p-6 md:p-10 font-mono text-sm md:text-base shadow-2xl shadow-cyan-900/20 relative overflow-hidden">
        
        {/* Background Grid Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Input: Name */}
          <div className="group">
            <label className="block text-cyan-600 mb-1 opacity-70">
              <span className="text-purple-500">const</span> clientName =
            </label>
            <div className="flex items-center border-b border-gray-800 group-focus-within:border-cyan-500 transition-colors">
              <span className="text-gray-500 mr-2">"</span>
              <input 
                type="text" 
                required
                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-700 py-2"
                placeholder="Enter identifier..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <span className="text-gray-500">";</span>
            </div>
          </div>

          {/* Input: Email */}
          <div className="group">
            <label className="block text-cyan-600 mb-1 opacity-70">
              <span className="text-purple-500">const</span> returnAddress =
            </label>
            <div className="flex items-center border-b border-gray-800 group-focus-within:border-cyan-500 transition-colors">
              <span className="text-gray-500 mr-2">"</span>
              <input 
                type="email" 
                required
                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-700 py-2"
                placeholder="email@server.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <span className="text-gray-500">";</span>
            </div>
          </div>

          {/* Input: Service Selection (Custom Icons) */}
          <div className="group">
            <label className="block text-cyan-600 mb-3 opacity-70">
              <span className="text-purple-500">let</span> targetModule = 
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((srv) => {
                const Icon = srv.icon;
                const isSelected = form.service === srv.label;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setForm({ ...form, service: srv.label })}
                    className={`relative flex items-center gap-3 p-3 rounded border text-left transition-all duration-300
                      ${isSelected 
                        ? "bg-cyan-900/20 border-cyan-500 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                        : "bg-gray-900/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                      }`}
                  >
                    <Icon size={18} className={isSelected ? "text-cyan-400" : "text-gray-600"} />
                    <span>{srv.label}</span>
                    {isSelected && (
                      <motion.div 
                        layoutId="active-glow"
                        className="absolute inset-0 border border-cyan-400 rounded opacity-50"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Input: Message */}
          <div className="group">
            <label className="block text-cyan-600 mb-1 opacity-70">
              <span className="text-purple-500">function</span> executeMessage() {"{"}
            </label>
            <div className="pl-4 border-l-2 border-gray-800 group-focus-within:border-cyan-500 transition-colors">
              <textarea 
                required
                rows={4}
                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-700 py-2 resize-none"
                placeholder="// Write your system requirements here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <span className="text-cyan-600 opacity-70">{"}"}</span>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={status === "SENDING" || status === "SUCCESS"}
              className={`w-full group relative py-4 px-6 font-bold tracking-widest uppercase text-sm border transition-all duration-300
                ${status === "SUCCESS" 
                  ? "bg-green-900/20 border-green-500 text-green-500 cursor-default" 
                  : "bg-cyan-950/30 border-cyan-800 text-cyan-500 hover:bg-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                {status === "SENDING" ? (
                  <>
                    <Loader2 className="animate-spin" /> ESTABLISHING UPLINK...
                  </>
                ) : status === "SUCCESS" ? (
                  <>
                     TRANSMISSION COMPLETE
                  </>
                ) : (
                  <>
                    <span className="text-xs font-mono mr-2">./send_packet.sh</span> <Send size={18} />
                  </>
                )}
              </div>
            </button>
            
            {status === "ERROR" && (
              <p className="text-red-500 text-xs mt-2 font-mono text-center">
                [ERROR]: Connection refused. Check network protocols.
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
