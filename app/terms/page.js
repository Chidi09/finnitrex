
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-gray-300 font-sans selection:bg-lime-500/30">
            <div className="container mx-auto px-6 py-12 max-w-4xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/" className="flex items-center gap-2 text-lime-400 hover:text-lime-300 mb-8 transition-colors w-fit group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Return Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-lime-900/20 rounded-xl border border-lime-500/20">
                            <FileText className="w-8 h-8 text-lime-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            TERMS AND CONDITIONS
                        </h1>
                    </div>
                    <p className="text-emerald-500 font-mono text-sm border-l-2 border-lime-500 pl-4 py-1">
                        EFFECTIVE DATE: 26 JANUARY 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-lime-400 hover:prose-a:text-lime-300 prose-strong:text-white"
                >
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-lime-400">01.</span> Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using <span className="font-mono text-lime-400">www.finnitrex.com</span>, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-lime-400">02.</span> Intellectual Property
                        </h2>
                        <p>
                            The materials contained in www.finnitrex.com are protected by applicable copyright and trademark law. Unless otherwise stated, www.finnitrex.com and/or its licensors own the intellectual property rights for all material on this site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-lime-400">03.</span> User Conduct
                        </h2>
                        <p>
                            You agree to use www.finnitrex.com only for lawful purposes. You are prohibited from:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-300">
                            <li>Using the site in any way that could disable, overburden, or impair the server.</li>
                            <li>Attempting to gain unauthorized access to any part of the website or its systems.</li>
                            <li>Using any robot, spider, or other automatic device to monitor or copy content.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-lime-400">04.</span> Limitation of Liability
                        </h2>
                        <div className="bg-red-900/10 border border-red-900/20 p-6 rounded-xl">
                            <p className="text-gray-300">
                                In no event shall www.finnitrex.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
                            </p>
                            <p className="mt-4 font-bold text-white">
                                Nothing in these terms shall limit or exclude our liability for death or personal injury resulting from our negligence or any other liability that cannot be excluded by English law.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-lime-400">05.</span> Governing Law
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
