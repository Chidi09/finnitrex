import { Suspense } from "react";
import DataViz3D from "@/components/DataViz3D";
import { ArrowLeft, TrendingUp, ShieldAlert, Activity, Lock } from "lucide-react";
import Link from "next/link";

export default function FintechPage() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      
      {/* Top Nav */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft size={20} /> Back to Hub
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold tracking-wider">FINNITREX <span className="font-light text-gray-500">ANALYTICS</span></h1>
          <p className="text-xs text-green-400 font-mono">SYSTEM STATUS: ONLINE // SPONSOR LICENCE: PENDING</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: The Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 3D Main Window */}
          <div className="bg-gray-900/40 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm relative h-[500px] shadow-2xl shadow-blue-900/10">
            <div className="absolute top-4 left-6 z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-cyan-400" /> Market Flux Simulator
              </h2>
              <p className="text-sm text-gray-400">Real-time AI prediction modeling</p>
            </div>
            {/* The 3D Component */}
            <Suspense fallback={<div className="flex items-center justify-center h-full text-cyan-500 font-mono">LOADING DATA VISUALIZATION...</div>}>
              <DataViz3D />
            </Suspense>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Predictive Accuracy</div>
              <div className="text-3xl font-bold text-green-400">99.4%</div>
              <div className="text-xs text-gray-500 mt-2">Based on historical backtesting</div>
            </div>
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Data Points Processed</div>
              <div className="text-3xl font-bold text-blue-400">4.2M/s</div>
              <div className="text-xs text-gray-500 mt-2">Latency: &lt;12ms</div>
            </div>
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Risk Assessment</div>
              <div className="text-3xl font-bold text-purple-400">LOW</div>
              <div className="text-xs text-gray-500 mt-2">AI-driven compliance active</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Service Details */}
        <div className="space-y-6">
          
          {/* Service 1: Analytics */}
          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Predictive Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Designed for investment firms and corporate finance. Our algorithms analyze market volatility to forecast trends before they happen.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex gap-2"><span className="text-cyan-500">•</span> Pattern Recognition</li>
              <li className="flex gap-2"><span className="text-cyan-500">•</span> Sentiment Analysis</li>
            </ul>
          </div>

          {/* Service 2: Compliance */}
          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-green-500/50 transition-colors">
             <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">RegTech & Compliance</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Automated compliance applications for financial institutions. Reduce risk with real-time regulatory monitoring.
            </p>
             <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex gap-2"><span className="text-green-500">•</span> AML/KYC Automation</li>
              <li className="flex gap-2"><span className="text-green-500">•</span> Smart Contracts</li>
            </ul>
          </div>

          {/* Service 3: Security */}
          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-colors">
             <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Risk Management</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Diversification of services to mitigate market fluctuations using AI modeling.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
