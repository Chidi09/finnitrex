import { Suspense } from "react";
import DataViz3D from "@/components/DataViz3D";
import FAQSection from "@/components/FAQSection"; // Import
import {
  ArrowLeft,
  TrendingUp,
  ShieldAlert,
  Activity,
  Lock,
} from "lucide-react";
import Link from "next/link";

// ... [Keep existing metadata] ...
export const metadata = {
  title: "Fintech & Predictive Analytics",
  description:
    "AI-powered fintech solutions including predictive analytics, market flux simulation, RegTech compliance automation, AML/KYC systems, and risk management. Real-time data processing with 99.4% predictive accuracy.",
  keywords: [
    "fintech solutions",
    "predictive analytics",
    "AI trading algorithms",
    "RegTech compliance",
    "AML KYC automation",
    "risk management software",
    "market analysis AI",
    "financial data analytics",
    "UK fintech company",
  ],
  openGraph: {
    title: "Fintech & Predictive Analytics | Finnitrex",
    description:
      "AI-powered fintech solutions for investment firms and corporate finance. Predictive analytics with 99.4% accuracy.",
    url: "https://finnitrex.com/fintech",
  },
  alternates: {
    canonical: "https://finnitrex.com/fintech",
  },
};

const fintechFAQs = [
  {
    question: "What is the latency on your predictive analytics engine?",
    answer:
      "Our core engine typically operates with <12ms latency for data ingestion and processing. We utilize edge computing and optimized gRPC pipelines to ensure real-time analysis of market fluctuations.",
  },
  {
    question:
      "How do you ensure data privacy and regulatory compliance (GDPR/FCA)?",
    answer:
      "We implement 'Privacy by Design'. All PII (Personally Identifiable Information) is encrypted at rest (AES-256) and in transit (TLS 1.3). Our RegTech modules are specifically updated to adhere to current FCA and GDPR requirements regarding data sovereignty and audit trails.",
  },
  {
    question: "Can the AI model adapt to our specific risk parameters?",
    answer:
      "Yes. We don't use a 'black box' model. We fine-tune our base models on your historical data and specific risk tolerance levels. You maintain control over the sensitivity thresholds for fraud detection and automated trading signals.",
  },
  {
    question: "What data sources does the system integrate with?",
    answer:
      "Our system is agnostic. It can ingest data from standard financial feeds (Bloomberg, Reuters), legacy banking APIs, and alternative data sources (sentiment analysis, blockchain ledgers) simultaneously.",
  },
];

export default function FintechPage() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* ... [Keep existing Top Nav] ... */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Hub
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold tracking-wider">
            FINNITREX{" "}
            <span className="font-light text-gray-500">ANALYTICS</span>
          </h1>
          <p className="text-xs text-green-400 font-mono">
            SYSTEM STATUS: ONLINE
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ... [Keep existing Left Column] ... */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3D Main Window */}
          <div className="bg-gray-900/40 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm relative h-[500px] shadow-2xl shadow-lime-900/10">
            {/* ... */}
            <div className="absolute top-4 left-6 z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-lime-400" /> Market Flux Simulator
              </h2>
              <p className="text-sm text-gray-400">
                Real-time AI prediction modeling
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full text-lime-400 font-mono">
                  LOADING DATA VISUALIZATION...
                </div>
              }
            >
              <DataViz3D />
            </Suspense>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ... */}
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">
                Predictive Accuracy
              </div>
              <div className="text-3xl font-bold text-green-400">99.4%</div>
              <div className="text-xs text-gray-500 mt-2">
                Based on historical backtesting
              </div>
            </div>
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">
                Data Points Processed
              </div>
              <div className="text-3xl font-bold text-emerald-400">4.2M/s</div>
              <div className="text-xs text-gray-500 mt-2">
                Latency: &lt;12ms
              </div>
            </div>
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Risk Assessment</div>
              <div className="text-3xl font-bold text-lime-300">LOW</div>
              <div className="text-xs text-gray-500 mt-2">
                AI-driven compliance active
              </div>
            </div>
          </div>
        </div>

        {/* ... [Keep existing Right Column] ... */}
        <div className="space-y-6">
          {/* Service Cards */}
          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-lime-500/50 transition-colors">
            <div className="w-12 h-12 bg-lime-500/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-lime-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Predictive Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Designed for investment firms and corporate finance. Our
              algorithms analyze market volatility to forecast trends before
              they happen.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex gap-2">
                <span className="text-lime-400">•</span> Pattern Recognition
              </li>
              <li className="flex gap-2">
                <span className="text-lime-400">•</span> Sentiment Analysis
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">RegTech & Compliance</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Automated compliance applications for financial institutions.
              Reduce risk with real-time regulatory monitoring.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex gap-2">
                <span className="text-green-500">•</span> AML/KYC Automation
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">•</span> Smart Contracts
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Risk Management</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Diversification of services to mitigate market fluctuations using
              AI modeling.
            </p>
          </div>
        </div>
      </div>

      {/* --- ADDED FAQ SECTION HERE --- */}
      <div className="mt-16">
        <FAQSection
          title="Fintech Systems FAQ"
          description="Technical specifications regarding our AI models and compliance architecture."
          items={fintechFAQs}
        />
      </div>
    </main>
  );
}
