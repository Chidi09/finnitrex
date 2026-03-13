
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
                            <FileText className="h-8 w-8 text-[var(--accent)]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--foreground)]">
                            TERMS AND CONDITIONS
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
                            <span className="text-[var(--accent)]">01.</span> Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using <span className="font-mono text-[var(--accent)]">www.finnitrex.com</span>, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">02.</span> Intellectual Property
                        </h2>
                        <p>
                            The materials contained in www.finnitrex.com are protected by applicable copyright and trademark law. Unless otherwise stated, www.finnitrex.com and/or its licensors own the intellectual property rights for all material on this site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">03.</span> User Conduct
                        </h2>
                        <p>
                            You agree to use www.finnitrex.com only for lawful purposes. You are prohibited from:
                        </p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
                            <li>Using the site in any way that could disable, overburden, or impair the server.</li>
                            <li>Attempting to gain unauthorized access to any part of the website or its systems.</li>
                            <li>Using any robot, spider, or other automatic device to monitor or copy content.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">04.</span> Limitation of Liability
                        </h2>
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                            <p className="text-[var(--muted)]">
                                In no event shall www.finnitrex.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
                            </p>
                            <p className="mt-4 font-bold text-[var(--foreground)]">
                                Nothing in these terms shall limit or exclude our liability for death or personal injury resulting from our negligence or any other liability that cannot be excluded by English law.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                            <span className="text-[var(--accent)]">05.</span> Governing Law
                        </h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of <strong>England and Wales</strong>, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>

                </motion.div>
            </div>
        </main>
    );
}
