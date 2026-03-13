
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--selection)] selection:text-[var(--selection-foreground)]">
            <div className="container mx-auto px-6 py-12 max-w-4xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/" className="mb-8 flex w-fit items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)] group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Return Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                            <Cookie className="h-8 w-8 text-[var(--accent)]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--foreground)]">
                            COOKIE POLICY
                        </h1>
                    </div>
                    <p className="border-l-2 border-[var(--border)] py-1 pl-4 text-sm font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                        EFFECTIVE DATE: 26 JANUARY 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg prose-stone max-w-none dark:prose-invert prose-headings:text-[var(--foreground)] prose-a:text-[var(--accent)] hover:prose-a:text-[var(--foreground)] prose-strong:text-[var(--foreground)]"
                >
                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">01.</span> What are Cookies?
                        </h2>
                        <p>
                            Cookies are small files saved to your device that track, save, and store information about your interactions and usage of www.finnitrex.com.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">02.</span> How We Use Cookies
                        </h2>
                        <div className="grid gap-6 mt-6 not-prose">
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">Essential Cookies</h3>
                                <p className="text-sm text-[var(--muted)]">Necessary for the website to function, such as maintaining your session.</p>
                            </div>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">Performance Cookies</h3>
                                <p className="text-sm text-[var(--muted)]">We use these to analyze how visitors use www.finnitrex.com so we can improve the user experience.</p>
                            </div>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">Targeting/Advertising</h3>
                                <p className="text-sm text-[var(--muted)]">These may be used to deliver relevant advertisements to you based on your interests.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">03.</span> Your Choices
                        </h2>
                        <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of www.finnitrex.com.
                        </p>
                        <div className="not-prose mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
                            <p className="mb-6 text-[var(--muted)]">Want to update your settings now?</p>
                            <button
                                onClick={() => {
                                    // Force clearing persistence for demo/reset purposes or trigger banner
                                    localStorage.removeItem('finnitrex_consent');
                                    window.location.reload();
                                }}
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-8 py-3 font-bold text-[var(--accent-contrast)] transition-transform hover:scale-105"
                            >
                                <SettingsIcon /> Manage Privacy Settings
                            </button>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">04.</span> Contact Information
                        </h2>
                        <p>
                            For any questions regarding these legal documents, please contact us at:
                        </p>
                        <ul className="list-none pl-0 space-y-2 text-[var(--muted)]">
                            <li><strong className="text-[var(--foreground)]">Email:</strong> <a href="mailto:info@finnitrex.com">info@finnitrex.com</a></li>
                            <li><strong className="text-[var(--foreground)]">Website:</strong> <Link href="/contact">www.finnitrex.com/contact</Link></li>
                        </ul>
                    </section>

                </motion.div>
            </div>
        </main>
    );
}

function SettingsIcon() {
    return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    );
}
