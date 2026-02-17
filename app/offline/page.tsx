import { Metadata } from "next";
import Link from "next/link";
import { WifiOff, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline | Finnitrex",
  description: "You are currently offline.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
          <WifiOff className="w-10 h-10 text-gray-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          <span className="text-gray-500">YOU ARE</span>{" "}
          <span className="text-lime-400">OFFLINE</span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          It looks like you have lost your internet connection. Some cached
          pages may still be available.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-black font-bold text-lg transition-all hover:bg-lime-300"
          >
            <RefreshCw className="w-5 h-5" />
            TRY AGAIN
          </Link>
        </div>

        <p className="text-xs text-gray-600 mt-12 font-mono tracking-wider uppercase">
          // CONNECTION_STATUS: OFFLINE
        </p>
      </div>
    </div>
  );
}
