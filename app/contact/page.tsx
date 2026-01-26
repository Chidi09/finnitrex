
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "General Inquiry",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to send message");

            setStatus("success");
            setFormData({ name: "", email: "", service: "General Inquiry", message: "" });
        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err.message);
        }
    };

    return (
        <main className="min-h-screen bg-black text-gray-300 font-sans selection:bg-lime-500/30">
            <div className="container mx-auto px-6 py-12 max-w-2xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/" className="flex items-center gap-2 text-lime-400 hover:text-lime-300 mb-8 transition-colors w-fit group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Return Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-end gap-3 mb-2">
                        CONTACT <span className="text-lime-400 text-6xl">.</span>
                    </h1>
                    <p className="text-gray-500 font-mono">ESTABLISH COMMUNICATION UPLINK</p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
                >
                    {/* Decorative gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">IDENTITY / NAME</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors placeholder:text-gray-700"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">RETURN ADDRESS / EMAIL</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors placeholder:text-gray-700"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">PROTOCOL / SUBJECT</label>
                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                            >
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Data Protection / GDPR">Data Protection / GDPR</option>
                                <option value="Business Proposal">Business Proposal</option>
                                <option value="Careers">Careers</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">TRANSMISSION / MESSAGE</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors placeholder:text-gray-700 resize-none"
                                placeholder="Enter your message sequence here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                                    ? "bg-emerald-500 text-black"
                                    : status === "error"
                                        ? "bg-red-500 text-white"
                                        : "bg-lime-400 hover:bg-lime-300 text-black hover:scale-[1.02]"
                                }`}
                        >
                            {status === "loading" ? (
                                <Loader2 className="animate-spin" />
                            ) : status === "success" ? (
                                <>Message Sent <CheckCircle2 /></>
                            ) : status === "error" ? (
                                <>Retry Transmission <AlertCircle /></>
                            ) : (
                                <>INITIATE TRANSMISSION <Send size={18} /></>
                            )}
                        </button>

                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center mt-2">{errorMsg}</p>
                        )}
                        {status === "success" && (
                            <p className="text-emerald-400 text-sm text-center mt-2">
                                We have received your signal. Our team will respond shortly.
                            </p>
                        )}

                        <div className="pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
                            Protected by reCAPTCHA and Subject to our <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>.
                        </div>

                    </form>
                </motion.div>

                <div className="mt-12 text-center space-y-2">
                    <h3 className="text-white font-bold">Or reach us directly</h3>
                    <a href="mailto:info@finnitrex.com" className="text-lime-400 hover:underline flex items-center justify-center gap-2">
                        <Mail size={16} /> info@finnitrex.com
                    </a>
                    <p className="text-gray-500 text-sm">
                        483 Green Lanes, London, N13 4BS
                    </p>
                </div>

            </div>
        </main>
    );
}
