
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
              <Shield className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--foreground)]">
              PRIVACY POLICY
            </h1>
          </div>
          <p className="border-l-2 border-[var(--border)] py-1 pl-4 text-sm font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
            LAST UPDATED: 26 JANUARY 2026 | COMPLIANT WITH UK GDPR & DUAA 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-stone max-w-none dark:prose-invert prose-headings:text-[var(--foreground)] prose-a:text-[var(--accent)] hover:prose-a:text-[var(--foreground)] prose-strong:text-[var(--foreground)]"
        >
          <p className="lead text-xl text-[var(--muted)]">
            This Privacy Policy is designed specifically for <strong>Finnitrex Ltd</strong> to meet the requirements of the UK GDPR and the Data (Use and Access) Act 2025 (DUAA), which is now the standard for UK companies in 2026.
          </p>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">01.</span> Introduction
            </h2>
            <p>
              Welcome to Finnitrex Ltd. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (Finnitrex.com) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">02.</span> Who We Are
            </h2>
            <p>Finnitrex Ltd is the &ldquo;Data Controller&rdquo; responsible for your personal data.</p>
            <div className="not-prose mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="mb-1 font-mono text-[var(--muted)]">COMPANY NAME</dt>
                  <dd className="font-bold text-[var(--foreground)]">Finnitrex Ltd</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[var(--muted)]">COMPANY NUMBER</dt>
                  <dd className="font-bold text-[var(--foreground)]">16973401</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="mb-1 font-mono text-[var(--muted)]">REGISTERED OFFICE</dt>
                  <dd className="text-[var(--foreground)]">483 Green Lanes, London, N13 4BS, United Kingdom</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="mb-1 font-mono text-[var(--muted)]">EMAIL</dt>
                  <dd className="text-[var(--accent)]">info@finnitrex.com</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">03.</span> The Data We Collect
            </h2>
            <p>We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:</p>
            <ul className="space-y-2 mt-4">
              <li><strong className="text-[var(--accent)]">Identity Data:</strong> Name, username, or similar identifier.</li>
              <li><strong className="text-[var(--accent)]">Contact Data:</strong> Email address and telephone numbers.</li>
              <li><strong className="text-[var(--accent)]">Technical Data:</strong> IP address, login data, browser type and version, time zone setting, and location (collected automatically).</li>
              <li><strong className="text-[var(--accent)]">Usage Data:</strong> Information about how you use our website, products, and services.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">04.</span> How We Use Your Data
            </h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your data in the following circumstances:</p>
            <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li><strong>Performance of a Contract:</strong> Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li><strong>Legitimate Interests:</strong> Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li><strong>Compliance with Legal Obligations:</strong> Where we need to comply with a legal or regulatory obligation.</li>
              <li><strong>Recognised Legitimate Interests (New for 2026):</strong> We may process data without a balancing test for specific purposes defined under the DUAA, such as crime prevention or safeguarding.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">05.</span> Your Rights
            </h2>
            <p>Under the UK GDPR and DUAA 2025, you have significant rights:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
              {[
                { title: "Request Access (SAR)", desc: "You can ask for a copy of your data. Note: Under 2026 rules, we may 'stop the clock' on our 30-day response time if we require further clarification." },
                { title: "Request Correction", desc: "To have any incomplete or inaccurate data we hold about you corrected." },
                { title: "Request Erasure", desc: "To ask us to delete personal data where there is no good reason for us continuing to process it." },
                { title: "Object to Processing", desc: "Where we are relying on a legitimate interest." },
                { title: "Automated Decision-Making", desc: "You have the right to challenge any significant decision made about you based solely on automated processing." }
              ].map((bg, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[color:rgba(91,143,61,0.35)]">
                  <h3 className="mb-2 font-bold text-[var(--foreground)]">{bg.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{bg.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">06.</span> Cookies
            </h2>
            <p>
              Our website uses cookies. Under the DUAA 2025, we may use &ldquo;low-risk&rdquo; cookies (such as those for basic website functionality or anonymous statistics) without your explicit prior consent, but we will always provide you with a clear option to opt-out and manage your preferences via our Cookie Banner.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">07.</span> Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business &ldquo;need to know.&rdquo;
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
              <span className="text-[var(--accent)]">08.</span> How to Complain
            </h2>
            <p>
              If you have any concerns about our use of your personal information, you can make a formal complaint to us via <Link href="/contact" className="text-[var(--accent)] hover:underline">our contact page</Link>.
              We will acknowledge your complaint within <strong>30 days</strong>.
            </p>
            <p>
              If you are still not satisfied, you have the right to complain to the <strong>Information Commissioner&rsquo;s Office (ICO)</strong>, the UK supervisory authority for data protection issues (<a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a>).
            </p>
          </section>

        </motion.div>
      </div>
    </main>
  );
}
