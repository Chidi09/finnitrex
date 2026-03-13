
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
        } catch (err: unknown) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[color:rgba(91,143,61,0.22)]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(91,143,61,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(177,159,123,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(244,241,236,0.92))] dark:bg-[radial-gradient(circle_at_top_left,rgba(74,120,53,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(103,93,74,0.16),transparent_28%),linear-gradient(180deg,rgba(16,20,15,0.95),rgba(14,16,13,0.98))]" />
            <div className="container mx-auto px-6 py-12 max-w-2xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--foreground)] mb-8 transition-colors w-fit group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Return Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-end gap-3 mb-2 text-[var(--foreground)]">
                        CONTACT <span className="text-[var(--accent)] text-6xl">.</span>
                    </h1>
                    <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-[0.2em]">ESTABLISH COMMUNICATION UPLINK</p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[color:rgba(255,255,255,0.78)] border border-[var(--border)] rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden shadow-[0_22px_60px_rgba(28,25,23,0.08)] dark:bg-white/[0.04] dark:shadow-none"
                >
                    {/* Decorative gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[color:rgba(91,143,61,0.14)] rounded-full blur-3xl -z-10 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ml-1">IDENTITY / NAME</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)] dark:bg-[var(--surface)]"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ml-1">RETURN ADDRESS / EMAIL</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)] dark:bg-[var(--surface)]"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ml-1">PROTOCOL / SUBJECT</label>
                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer dark:bg-[var(--surface)]"
                            >
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Data Protection / GDPR">Data Protection / GDPR</option>
                                <option value="Business Proposal">Business Proposal</option>
                                <option value="Careers">Careers</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ml-1">TRANSMISSION / MESSAGE</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)] resize-none dark:bg-[var(--surface)]"
                                placeholder="Enter your message sequence here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                                    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                                    : status === "error"
                                        ? "bg-red-500 text-white"
                                        : "bg-[var(--foreground)] hover:opacity-90 text-[var(--accent-contrast)] hover:scale-[1.02] dark:bg-[var(--accent)]"
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
                            <p className="text-[var(--accent)] text-sm text-center mt-2">
                                We have received your signal. Our team will respond shortly.
                            </p>
                        )}

                        <div className="pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--muted)]">
                            Protected by reCAPTCHA and Subject to our <Link href="/privacy" className="text-[var(--foreground)] hover:text-[var(--accent)]">Privacy Policy</Link>.
                        </div>

                    </form>
                </motion.div>

                <div className="mt-12 text-center space-y-2">
                    <h3 className="text-[var(--foreground)] font-bold">Or reach us directly</h3>
                    <a href="mailto:info@finnitrex.com" className="text-[var(--accent)] hover:underline flex items-center justify-center gap-2">
                        <Mail size={16} /> info@finnitrex.com
                    </a>
                    <p className="text-[var(--muted)] text-sm">
                        483 Green Lanes, London, N13 4BS
                    </p>
                </div>

            </div>
        </main>
    );
}
