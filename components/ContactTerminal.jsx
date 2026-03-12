"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpenCheck,
  AppWindow,
  ScanEye,
  Cpu,
} from "lucide-react";

// Simplified Services List
const services = [
  {
    id: "lms",
    label: "LMS Platform",
    icon: BookOpenCheck,
    description: "Learning product strategy, delivery architecture, and rollout planning.",
  },
  {
    id: "web",
    label: "Custom Website",
    icon: AppWindow,
    description: "Public-facing or operational software tailored to your delivery model.",
  },
  {
    id: "ai",
    label: "AI Integration",
    icon: Cpu,
    description: "Automation, copilots, and workflow intelligence for your platform.",
  },
  {
    id: "optics",
    label: "Data / Optics",
    icon: ScanEye,
    description: "Computer vision and analytics infrastructure for specialist use cases.",
  },
];

export default function ContactTerminal() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", service: services[0].label });

  const handleBridge = (e) => {
    e.preventDefault();
    
    // SECURITY FIX: Use sessionStorage instead of URL parameters
    // URLs are logged in browser history, proxy logs, and server access logs.
    // This prevents PII (name, email) from being exposed in plain-text logs.
    try {
      sessionStorage.setItem('wizardFormData', JSON.stringify({
        name: form.name,
        email: form.email,
        system: form.service // Pre-select the system in the wizard
      }));
    } catch (error) {
      console.error('Failed to save form data to sessionStorage:', error);
      // Fallback: If sessionStorage fails, still navigate but log a warning
      // In production, you might want to show an error to the user
    }
    
    // Navigate without exposing PII in URL
    router.push('/start');
  };

  return (
    <section className="relative overflow-hidden border border-stone-200 bg-[#fbf8f2] shadow-[0_24px_70px_rgba(28,25,23,0.08)] dark:border-white/10 dark:bg-[#141512] dark:shadow-none">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,214,192,0.55),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(222,214,199,0.45),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(67,89,73,0.35),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(77,69,58,0.35),transparent_32%)]" />

      <div className="relative grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Start the configuration brief
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-4xl">
              Bring your LMS requirements into a calmer planning flow.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-stone-600 dark:text-stone-300">
              Share your details, choose the service track, and continue into the
              project wizard with the brief already prepared.
            </p>
          </div>

          <div className="mt-8 grid gap-4 text-sm text-stone-700 dark:text-stone-200 sm:grid-cols-2 lg:mt-12 lg:grid-cols-1 xl:grid-cols-2">
            <div className="border border-stone-200/90 bg-white/80 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Expected next step
              </p>
              <p className="mt-3 leading-6">
                Your project wizard opens with the selected service and contact
                details already staged.
              </p>
            </div>
            <div className="border border-stone-200/90 bg-[#f2ede3] p-4 dark:border-white/10 dark:bg-[#1a1c18]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Buyer-friendly signal
              </p>
              <p className="mt-3 leading-6">
                Designed for enterprise discovery: concise, clear, and ready for
                internal review.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleBridge} className="space-y-8 border border-stone-200 bg-white/90 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="contact-terminal-name"
                className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400"
              >
                Name or company
              </label>
              <input
                id="contact-terminal-name"
                type="text"
                autoComplete="organization"
                required
                className="mt-3 w-full border border-stone-300 bg-[#fcfaf6] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10 dark:border-white/10 dark:bg-[#171916] dark:text-white dark:focus:border-stone-100 dark:focus:ring-white/10"
                placeholder="e.g. Acme Learning or Jane Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="contact-terminal-email"
                className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400"
              >
                Work email
              </label>
              <input
                id="contact-terminal-email"
                type="email"
                autoComplete="email"
                required
                className="mt-3 w-full border border-stone-300 bg-[#fcfaf6] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10 dark:border-white/10 dark:bg-[#171916] dark:text-white dark:focus:border-stone-100 dark:focus:ring-white/10"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              Service focus
            </legend>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {services.map((srv) => {
                const Icon = srv.icon;
                const isSelected = form.service === srv.label;

                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setForm({ ...form, service: srv.label })}
                    aria-pressed={isSelected}
                    className={`group flex items-start gap-3 border p-4 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-stone-950/10 dark:focus:ring-white/10 ${
                      isSelected
                        ? "border-stone-900 bg-[#f3efe6] text-stone-950 shadow-[0_12px_30px_rgba(28,25,23,0.08)] dark:border-stone-100 dark:bg-white/[0.08] dark:text-white"
                        : "border-stone-200 bg-[#fcfaf6] text-stone-700 hover:border-stone-400 hover:bg-white dark:border-white/10 dark:bg-[#171916] dark:text-stone-200 dark:hover:border-white/30"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-stone-900 bg-stone-900 text-[#f6f2e9] dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
                          : "border-stone-300 bg-white text-stone-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold tracking-[-0.02em]">
                        {srv.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                        {srv.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="border-t border-stone-200 pt-6 dark:border-white/10">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-stone-950 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#f6f2e9] transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-950/15 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white"
            >
              Continue to configuration
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-xs leading-6 text-stone-500 dark:text-stone-400">
              This opens the project wizard and carries your details forward via
              secure session storage.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
