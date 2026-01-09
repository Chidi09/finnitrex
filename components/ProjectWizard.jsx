"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Layers, 
  Database,
  Loader2
} from "lucide-react";

// Steps Configuration
const STEPS = [
  { id: 1, title: "Select Core System" },
  { id: 2, title: "Define Scope" },
  { id: 3, title: "Project Constraints" },
  { id: 4, title: "Establish Uplink" }
];

// Options for Step 1
const SYSTEMS = [
  { id: "lms", label: "LMS Architecture", icon: Layers, desc: "Education & Training Platforms" },
  { id: "web", label: "High-Perf Web", icon: Globe, desc: "Next.js Static Sites & SaaS" },
  { id: "ai", label: "AI Integration", icon: Cpu, desc: "LLMs, Agents & Automation" },
  { id: "data", label: "Data Pipeline", icon: Database, desc: "Analytics & Optics" },
];

export default function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("IDLE");
  const [data, setData] = useState({
    system: "",
    features: [],
    budget: "$5k - $15k",
    timeline: "Standard (1-3 Months)",
    name: "",
    email: "",
    details: ""
  });

  const handleToggleFeature = (feature) => {
    setData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async () => {
    setStatus("SENDING");
    
    // Format the complex wizard data into a readable message for your email
    const formattedMessage = `
      PROJECT SPECIFICATIONS:
      -----------------------
      Target System: ${data.system}
      Required Features: ${data.features.join(", ") || "None specified"}
      Budget Range: ${data.budget}
      Timeline: ${data.timeline}
      
      ADDITIONAL NOTES:
      ${data.details}
    `;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: `WIZARD: ${data.system.toUpperCase()}`,
          message: formattedMessage
        }),
      });

      if (res.ok) {
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    } catch (e) {
      setStatus("ERROR");
    }
  };

  // Helper to check validation before moving next
  const canProceed = () => {
    if (step === 1 && !data.system) return false;
    if (step === 4 && (!data.name || !data.email)) return false;
    return true;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/10 flex flex-col md:flex-row min-h-[500px]">
      
      {/* SIDEBAR: Progress & Info */}
      <div className="bg-gray-900/50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono text-cyan-500 mb-6">INSTALLATION WIZARD v2.0</div>
          <h2 className="text-2xl font-bold text-white mb-2">Initialize Project</h2>
          <p className="text-sm text-gray-400">Configure your system requirements to begin the development sequence.</p>
        </div>

        <div className="space-y-6 mt-8 md:mt-0">
          {STEPS.map((s, i) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                  ${isActive ? "bg-cyan-500 text-black border-cyan-500" : 
                    isCompleted ? "bg-green-500/20 text-green-500 border-green-500" : "bg-gray-800 text-gray-500 border-gray-700"}
                `}>
                  {isCompleted ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span className={`text-sm font-mono ${isActive ? "text-white" : "text-gray-600"}`}>{s.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="p-8 md:w-2/3 bg-black/80 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
          <motion.div 
            className="h-full bg-cyan-500"
            initial={{ width: "25%" }}
            animate={{ width: `${step * 25}%` }}
          />
        </div>

        {status === "SUCCESS" ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">System Request Queued</h3>
            <p className="text-gray-400 max-w-sm">
              Your specifications have been transmitted to our engineering team. We will analyze the data packet and respond shortly.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm font-mono text-white transition-colors"
            >
              Start New Sequence
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 py-4">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SYSTEM SELECTION */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-xl font-bold mb-6 text-white">Target Architecture</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {SYSTEMS.map((sys) => (
                        <button
                          key={sys.id}
                          onClick={() => setData({ ...data, system: sys.label })}
                          className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all
                            ${data.system === sys.label 
                              ? "bg-cyan-900/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                              : "bg-gray-900/20 border-gray-800 hover:border-gray-600"}
                          `}
                        >
                          <sys.icon className={data.system === sys.label ? "text-cyan-400" : "text-gray-600"} size={24} />
                          <div>
                            <div className={`font-bold ${data.system === sys.label ? "text-white" : "text-gray-400"}`}>{sys.label}</div>
                            <div className="text-xs text-gray-500">{sys.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SCOPE */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold mb-6 text-white">Functional Requirements</h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {["User Authentication", "Payment Gateway", "3D Graphics/WebGL", "CMS / Admin Panel", "AI Chatbot", "Mobile Responsiveness"].map((feat) => (
                        <label key={feat} className="flex items-center gap-3 p-3 bg-gray-900/30 rounded border border-gray-800 cursor-pointer hover:border-gray-600">
                          <input 
                            type="checkbox" 
                            checked={data.features.includes(feat)}
                            onChange={() => handleToggleFeature(feat)}
                            className="w-4 h-4 rounded border-gray-600 bg-black text-cyan-500 focus:ring-offset-black"
                          />
                          <span className="text-sm text-gray-300">{feat}</span>
                        </label>
                      ))}
                    </div>
                    <textarea
                      placeholder="// Additional technical details..."
                      className="w-full bg-gray-900/20 border border-gray-800 rounded p-3 text-sm text-white focus:border-cyan-500 focus:outline-none h-32 resize-none"
                      value={data.details}
                      onChange={(e) => setData({...data, details: e.target.value})}
                    />
                  </motion.div>
                )}

                {/* STEP 3: CONSTRAINTS */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold mb-8 text-white">Project Constraints</h3>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-mono text-cyan-500 mb-4">ESTIMATED BUDGET</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"].map((b) => (
                          <button
                            key={b}
                            onClick={() => setData({ ...data, budget: b })}
                            className={`py-2 px-4 rounded border text-sm transition-colors
                              ${data.budget === b ? "bg-cyan-500 text-black border-cyan-500 font-bold" : "bg-transparent border-gray-700 text-gray-400"}
                            `}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-mono text-purple-500 mb-4">TARGET TIMELINE</label>
                      <select 
                        value={data.timeline}
                        onChange={(e) => setData({...data, timeline: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 outline-none"
                      >
                        <option>Urgent (&lt; 1 Month)</option>
                        <option>Standard (1-3 Months)</option>
                        <option>Long Term (3-6 Months)</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold mb-6 text-white">Final Uplink</h3>
                    <div className="space-y-4">
                      <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT IDENTIFIER</label>
                        <input 
                          type="text" 
                          placeholder="Your Name / Company"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-lg text-white focus:border-cyan-500 outline-none transition-colors"
                          value={data.name}
                          onChange={(e) => setData({...data, name: e.target.value})}
                        />
                      </div>
                      <div className="group pt-4">
                        <label className="block text-xs font-mono text-gray-500 mb-1">RETURN ADDRESS</label>
                        <input 
                          type="email" 
                          placeholder="name@company.com"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-lg text-white focus:border-cyan-500 outline-none transition-colors"
                          value={data.email}
                          onChange={(e) => setData({...data, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="mt-8 p-4 bg-gray-900/50 rounded border border-gray-800 text-xs text-gray-400 font-mono">
                        <p className="mb-2">SUMMARY:</p>
                        <p>SYST: {data.system || "PENDING"}</p>
                        <p>FEAT: {data.features.length} selected</p>
                        <p>BUDG: {data.budget}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* NAV BUTTONS */}
            <div className="flex justify-between pt-6 border-t border-gray-800">
              <button 
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={16} /> BACK
              </button>

              {step < 4 ? (
                <button 
                  onClick={() => canProceed() && setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400"
                >
                  NEXT <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={!canProceed() || status === "SENDING"}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all disabled:opacity-50"
                >
                  {status === "SENDING" ? <Loader2 className="animate-spin" /> : "INITIALIZE"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
