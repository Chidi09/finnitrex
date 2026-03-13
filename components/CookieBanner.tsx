
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Settings } from "lucide-react";
import { getConsent, saveConsent, type ConsentState, DEFAULT_CONSENT } from "@/lib/cookieManager";
import Link from "next/link";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

    useEffect(() => {
        // Check if consent is already saved
        const savedConsent = getConsent();
        if (!savedConsent) {
            // Small delay to prevent hydration mismatch flicker
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const fullConsent = { essential: true, performance: true, targeting: true };
        saveConsent(fullConsent);
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        const minConsent = { essential: true, performance: false, targeting: false };
        saveConsent(minConsent);
        setShowBanner(false);
    };

    const handleSaveSettings = () => {
        saveConsent(consent);
        setShowSettings(false);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[450px] z-50"
                >
                    {!showSettings ? (
                        // Main Banner
                        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.9)] p-6 shadow-[0_24px_70px_rgba(28,25,23,0.14)] backdrop-blur-xl dark:bg-[var(--surface)] dark:shadow-none">
                            <div className="absolute top-0 right-0 p-4 bg-gradient-to-bl from-[color:rgba(91,143,61,0.16)] to-transparent rounded-bl-3xl" />

                            <div className="flex items-start gap-4 mb-4">
                                <div className="rounded-xl border border-[color:rgba(91,143,61,0.28)] bg-[color:rgba(91,143,61,0.12)] p-3">
                                    <Shield className="h-6 w-6 text-[var(--accent)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--foreground)]">Privacy Preferences</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                                        We use cookies to enhance your experience and analyze our traffic.
                                        Manage your preferences below. See our <Link href="/cookie-policy" className="text-[var(--accent)] hover:underline">Cookie Policy</Link>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 rounded-xl bg-[var(--foreground)] px-4 py-2.5 font-bold text-[var(--accent-contrast)] transition-all hover:opacity-90 active:scale-95 dark:bg-[var(--accent)]"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 font-bold text-[var(--foreground)] transition-all hover:bg-[var(--surface)] active:scale-95 dark:bg-[var(--surface)]"
                                    >
                                        Reject All
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="flex w-full items-center justify-center gap-2 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                                >
                                    <Settings size={14} /> Customize Settings
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Settings Modal
                        <div className="relative rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.94)] p-6 shadow-[0_24px_70px_rgba(28,25,23,0.14)] backdrop-blur-xl dark:bg-[var(--surface)] dark:shadow-none">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
                                    <Settings className="h-5 w-5 text-[var(--accent)]" /> Settings
                                </h3>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                {/* Essential */}
                                <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface)]">
                                    <div>
                                        <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                                            Essential <span className="rounded bg-[var(--accent)] px-1.5 text-[10px] font-bold text-[var(--accent-contrast)]">REQUIRED</span>
                                        </div>
                                        <p className="mt-0.5 text-xs text-[var(--muted)]">Core site functionality.</p>
                                    </div>
                                    <div className="flex h-6 w-10 items-center justify-end rounded-full border border-[color:rgba(91,143,61,0.34)] bg-[color:rgba(91,143,61,0.18)] px-1">
                                        <div className="h-4 w-4 rounded-full bg-[var(--accent)] shadow-sm" />
                                    </div>
                                </div>

                                {/* Performance */}
                                <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface)]">
                                    <div>
                                        <div className="font-medium text-[var(--foreground)]">Performance</div>
                                        <p className="mt-0.5 text-xs text-[var(--muted)]">Analytics and usage tracking.</p>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, performance: !prev.performance }))}
                                        className={`flex h-6 w-10 items-center rounded-full border px-1 transition-all ${consent.performance
                                            ? 'justify-end border-[var(--accent)] bg-[var(--accent)]'
                                            : 'justify-start border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface-elevated)]'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className={`h-4 w-4 rounded-full shadow-sm ${consent.performance ? 'bg-[var(--accent-contrast)]' : 'bg-[var(--muted)]/70'}`}
                                        />
                                    </button>
                                </div>

                                {/* Targeting */}
                                <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface)]">
                                    <div>
                                        <div className="font-medium text-[var(--foreground)]">Targeting</div>
                                        <p className="mt-0.5 text-xs text-[var(--muted)]">Advertising and marketing.</p>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, targeting: !prev.targeting }))}
                                        className={`flex h-6 w-10 items-center rounded-full border px-1 transition-all ${consent.targeting
                                            ? 'justify-end border-[var(--accent)] bg-[var(--accent)]'
                                            : 'justify-start border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface-elevated)]'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className={`h-4 w-4 rounded-full shadow-sm ${consent.targeting ? 'bg-[var(--accent-contrast)]' : 'bg-[var(--muted)]/70'}`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveSettings}
                                className="w-full rounded-xl bg-[var(--foreground)] px-4 py-2.5 font-bold text-[var(--accent-contrast)] transition-all hover:opacity-90 dark:bg-[var(--accent)]"
                            >
                                Save Preferences
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
