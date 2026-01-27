"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert, ChevronRight, Loader2 } from "lucide-react";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function LoginPage() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("LOCKED");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("VERIFYING");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessKey: key }),
    });

    if (res.ok) {
      setStatus("ACCESS GRANTED");
      setTimeout(() => router.push("/admin"), 800);
    } else if (res.status === 429) {
      setStatus("LOCKED");
      alert("Too many attempts. Please wait.");
    } else {
      setStatus("DENIED");
      setKey("");
      setTimeout(() => setStatus("LOCKED"), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <FinnitrexLogo className="w-16 h-16" textVisible={false} />
          </div>
          <h1 className="text-red-500 font-bold tracking-[0.3em] text-xl mb-2 flex items-center justify-center gap-2">
            <ShieldAlert size={20} /> RESTRICTED AREA
          </h1>
          <p className="text-gray-600 text-xs">
            AUTHORIZED PERSONNEL ONLY. ALL IP ADDRESSES LOGGED.
          </p>
        </div>

        <div
          className={`border rounded-xl p-8 transition-colors duration-500 ${status === "DENIED"
              ? "border-red-600 bg-red-950/10"
              : status === "ACCESS GRANTED"
                ? "border-lime-500 bg-lime-950/10"
                : "border-gray-800 bg-gray-900/50"
            }`}
        >
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
            <span className="text-xs text-gray-500">ENCRYPTION: AES-256</span>
            <div className="flex gap-2">
              <div
                className={`w-2 h-2 rounded-full ${status === "LOCKED"
                    ? "bg-red-500 animate-pulse"
                    : "bg-gray-700"
                  }`}
              />
              <div
                className={`w-2 h-2 rounded-full ${status === "VERIFYING"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-gray-700"
                  }`}
              />
              <div
                className={`w-2 h-2 rounded-full ${status === "ACCESS GRANTED" ? "bg-lime-500" : "bg-gray-700"
                  }`}
              />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                ENTER ACCESS KEY
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-600 w-4 h-4 group-focus-within:text-lime-500 transition-colors" />
                <input
                  type="password"
                  autoFocus
                  className="w-full bg-black border border-gray-700 rounded p-2 pl-10 text-white focus:border-lime-500 outline-none font-mono tracking-widest transition-colors"
                  placeholder="••••••••••••••"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={status === "VERIFYING" || status === "ACCESS GRANTED"}
              className={`w-full py-3 rounded font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all
                ${status === "DENIED"
                  ? "bg-red-600 text-white cursor-not-allowed"
                  : status === "ACCESS GRANTED"
                    ? "bg-lime-500 text-black cursor-default"
                    : "bg-gray-800 hover:bg-gray-700 text-white hover:text-lime-400"
                }
              `}
            >
              {status === "VERIFYING" ? (
                <Loader2 className="animate-spin" />
              ) : status === "DENIED" ? (
                "ACCESS DENIED"
              ) : status === "ACCESS GRANTED" ? (
                "LOADING..."
              ) : (
                <>
                  AUTHENTICATE <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

