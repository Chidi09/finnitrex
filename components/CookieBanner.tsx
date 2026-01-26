
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, X, Settings, Check } from "lucide-react";
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
                        <div className="bg-black/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-bl-3xl" />

                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-lime-900/20 p-3 rounded-xl border border-lime-500/20">
                                    <Shield className="text-lime-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Privacy Preferences</h3>
                                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                                        We use cookies to enhance your experience and analyze our traffic.
                                        Manage your preferences below. See our <Link href="/cookie-policy" className="text-lime-400 hover:underline">Cookie Policy</Link>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 bg-lime-400 hover:bg-lime-500 text-black font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95 border border-gray-700 hover:border-gray-600"
                                    >
                                        Reject All
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Settings size={14} /> Customize Settings
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Settings Modal
                        <div className="bg-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                    <Settings className="text-lime-400 w-5 h-5" /> Settings
                                </h3>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                {/* Essential */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            Essential <span className="text-[10px] bg-lime-500 text-black px-1.5 rounded font-bold">REQUIRED</span>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-0.5">Core site functionality.</p>
                                    </div>
                                    <div className="w-10 h-6 bg-lime-900/40 rounded-full border border-lime-500/30 flex items-center justify-end px-1">
                                        <div className="w-4 h-4 bg-lime-500 rounded-full shadow-lg" />
                                    </div>
                                </div>

                                {/* Performance */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <div>
                                        <div className="text-white font-medium">Performance</div>
                                        <p className="text-gray-500 text-xs mt-0.5">Analytics and usage tracking.</p>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, performance: !prev.performance }))}
                                        className={`w-10 h-6 rounded-full border flex items-center px-1 transition-all ${consent.performance
                                            ? 'bg-lime-500 border-lime-500 justify-end'
                                            : 'bg-gray-800 border-gray-600 justify-start'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className={`w-4 h-4 rounded-full shadow-lg ${consent.performance ? 'bg-white' : 'bg-gray-400'}`}
                                        />
                                    </button>
                                </div>

                                {/* Targeting */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <div>
                                        <div className="text-white font-medium">Targeting</div>
                                        <p className="text-gray-500 text-xs mt-0.5">Advertising and marketing.</p>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, targeting: !prev.targeting }))}
                                        className={`w-10 h-6 rounded-full border flex items-center px-1 transition-all ${consent.targeting
                                            ? 'bg-lime-500 border-lime-500 justify-end'
                                            : 'bg-gray-800 border-gray-600 justify-start'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className={`w-4 h-4 rounded-full shadow-lg ${consent.targeting ? 'bg-white' : 'bg-gray-400'}`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveSettings}
                                className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-2.5 px-4 rounded-xl transition-all"
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
