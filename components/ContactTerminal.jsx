"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight,
  BookOpenCheck,
  AppWindow,
  ScanEye,
  Cpu
} from "lucide-react";

// Simplified Services List
const services = [
  { id: "lms", label: "LMS Platform", icon: BookOpenCheck },
  { id: "web", label: "Custom Website", icon: AppWindow },
  { id: "ai", label: "AI Integration", icon: Cpu },
  { id: "optics", label: "Data / Optics", icon: ScanEye },
];

export default function ContactTerminal() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", service: services[1].label });

  const handleBridge = (e) => {
    e.preventDefault();
    // Redirect to Wizard with pre-filled data using URL Query Params
    const query = new URLSearchParams({
      name: form.name,
      email: form.email,
      system: form.service // Pre-select the system in the wizard
    }).toString();
    
    router.push(`/start?${query}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      {/* Header Visual */}
      <div className="bg-gray-900 rounded-t-lg border border-gray-700 p-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-xs text-gray-500 font-mono ml-4">Initialize New Project Request</div>
      </div>

      {/* Main Form Body */}
      <div className="bg-black/90 backdrop-blur-md border border-t-0 border-gray-700 rounded-b-lg p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Scanline Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

        <form onSubmit={handleBridge} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Friendly Input: Name */}
            <div className="group">
              <label className="block text-gray-400 text-sm font-bold mb-2">YOUR NAME / COMPANY</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:bg-gray-900 transition-colors"
                placeholder="e.g. John Doe or Acme Corp"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* User Friendly Input: Email */}
            <div className="group">
              <label className="block text-gray-400 text-sm font-bold mb-2">EMAIL ADDRESS</label>
              <input 
                type="email" 
                required
                className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:bg-gray-900 transition-colors"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-3">PROJECT TYPE</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((srv) => {
                const Icon = srv.icon;
                const isSelected = form.service === srv.label;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setForm({ ...form, service: srv.label })}
                    className={`flex items-center gap-2 p-3 rounded border text-sm font-medium transition-all
                      ${isSelected 
                        ? "bg-cyan-900/30 border-cyan-500 text-cyan-400" 
                        : "bg-gray-900/30 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                      }`}
                  >
                    <Icon size={16} />
                    {srv.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
            >
              CONTINUE TO CONFIGURATION <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Proceeding will open the Project Wizard with your details pre-filled.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
