"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  Database,
  Loader2,
  Calculator,
  Check,
  Plus,
  Minus,
  FileText,
  Download,
  Calendar,
  HandCoins,
} from "lucide-react";
import {
  basePackages,
  features,
  ongoingCosts,
  negotiationConfig,
} from "@/lib/pricingConfig";
import FinnitrexLogo from "@/components/FinnitrexLogo";

// Steps Configuration
const STEPS = [
  { id: 1, title: "Select Core System" },
  { id: 2, title: "Define Scope & Features" },
  { id: 3, title: "Project Constraints" },
  { id: 4, title: "Pricing & Quote" },
  { id: 5, title: "Generate Estimate" },
];

// System to Package Mapping
const SYSTEM_TO_PACKAGE = {
  "LMS Architecture": "bespoke",
  "High-Perf Web": "business",
  "AI Integration": "bespoke",
  "Data Pipeline": "bespoke",
};

export default function ProjectPricingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("IDLE");
  const [data, setData] = useState({
    system: "",
    features: [],
    budget: "$5k - $15k",
    timeline: "Standard (1-3 Months)",
    name: "",
    email: "",
    company: "",
    details: "",
  });

  // Pricing state
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [featureQuantities, setFeatureQuantities] = useState({});
  const [ongoing, setOngoing] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedQuote, setSavedQuote] = useState(null);
  const [discountType] = useState("none"); // "none", "percentage", "amount"
  const [discountValue] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerStatus, setOfferStatus] = useState("IDLE"); // IDLE, PROCESSING, ACCEPTED, REJECTED, REVIEW

  // Auto-select package based on system
  useEffect(() => {
    if (data.system && SYSTEM_TO_PACKAGE[data.system]) {
      setSelectedPackage(SYSTEM_TO_PACKAGE[data.system]);
    }
  }, [data.system]);

  // SECURITY FIX: Load data from sessionStorage instead of URL parameters
  // This prevents PII (name, email) from being exposed in browser history and server logs
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("wizardFormData");
      if (storedData) {
        const formData = JSON.parse(storedData);
        setData((prev) => ({
          ...prev,
          name: formData.name || prev.name,
          email: formData.email || prev.email,
          system: formData.system || prev.system,
        }));

        // Clean up after reading (optional - keeps data for page refresh)
        // sessionStorage.removeItem('wizardFormData');
      }
    } catch (error) {
      console.error("Failed to load form data from sessionStorage:", error);
      // Fallback: Try URL params for backwards compatibility (remove after migration)
      const nameParam = searchParams.get("name");
      const emailParam = searchParams.get("email");
      const systemParam = searchParams.get("system");

      if (nameParam || emailParam || systemParam) {
        console.warn("Using URL params (deprecated - will be removed)");
        setData((prev) => ({
          ...prev,
          name: nameParam || prev.name,
          email: emailParam || prev.email,
          system: systemParam || prev.system,
        }));
      }
    }
  }, [searchParams]);

  // Calculate totals
  const calculations = useMemo(() => {
    let baseTotal = selectedPackage
      ? basePackages[selectedPackage].basePrice
      : 0;

    let featuresTotal = 0;
    Object.entries(selectedFeatures).forEach(([key, enabled]) => {
      if (enabled && features[key]) {
        const quantity = featureQuantities[key] || 1;
        featuresTotal += features[key].price * quantity;
      }
    });

    let ongoingTotal = 0;
    Object.entries(ongoing).forEach(([key, enabled]) => {
      if (enabled && ongoingCosts[key]) {
        ongoingTotal += ongoingCosts[key].price;
      }
    });

    let subtotal = baseTotal + featuresTotal;

    // Apply discount
    let discountAmount = 0;

    // Priority to Offer if Accepted
    if (offerStatus === "ACCEPTED" && offerAmount) {
      const targetTotal = parseFloat(offerAmount);
      // Reverse calculate subtotal from the target total (Total = Subtotal * 1.2)
      const targetSubtotal = targetTotal / 1.2;
      discountAmount = Math.max(0, subtotal - targetSubtotal);
    } else if (discountType === "percentage" && discountValue > 0) {
      discountAmount = subtotal * (discountValue / 100);
    } else if (discountType === "amount" && discountValue > 0) {
      discountAmount = discountValue;
    }
    // discountAmount = Math.min(discountAmount, subtotal); // Allow full discount if needed, but logic above handles it

    const discountedSubtotal = subtotal - discountAmount;
    const vat = discountedSubtotal * 0.2;
    const total = discountedSubtotal + vat;
    const firstYearTotal = total + ongoingTotal;

    return {
      baseTotal,
      featuresTotal,
      subtotal,
      discountAmount,
      discountedSubtotal,
      vat,
      total,
      ongoingTotal,
      firstYearTotal,
    };
  }, [
    selectedPackage,
    selectedFeatures,
    featureQuantities,
    ongoing,
    discountType,
    discountValue,
    offerStatus,
    offerAmount,
  ]);

  const togglePricingFeature = (key) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateQuantity = (key, delta) => {
    setFeatureQuantities((prev) => {
      const current = prev[key] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [key]: newValue };
    });
  };

  const toggleOngoing = (key) => {
    setOngoing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmitOffer = () => {
    if (!offerAmount || isNaN(offerAmount)) return;

    const originalTotal = calculations.subtotal * 1.2; // Original Total with VAT
    const offer = parseFloat(offerAmount);
    const ratio = offer / originalTotal;

    setOfferStatus("PROCESSING");

    setTimeout(() => {
      if (ratio >= negotiationConfig.minAcceptableThreshold) {
        setOfferStatus("ACCEPTED");
      } else if (ratio < negotiationConfig.autoRejectThreshold) {
        setOfferStatus("REJECTED");
      } else {
        // Between 70% and 85%
        setOfferStatus("REVIEW");
        // In a real app, this would flag the quote for admin review
      }
    }, 1500);
  };

  const generateEstimate = async () => {
    if (!data.name || !data.email) {
      alert("Please enter your name and email to generate invoice");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/quote/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: data.name,
          clientEmail: data.email,
          clientCompany: data.company,
          selectedPackage,
          selectedFeatures,
          featureQuantities,
          ongoingCosts: ongoing,
          calculations,
          discountType: offerStatus === "ACCEPTED" ? "offer" : discountType,
          discountValue:
            offerStatus === "ACCEPTED"
              ? calculations.discountAmount
              : discountValue,
          offerAmount: offerStatus === "ACCEPTED" ? offerAmount : null,
          offerStatus,
        }),
      });

      if (res.ok) {
        const quoteData = await res.json();
        setSavedQuote(quoteData);
        setShowInvoice(true);
        setStatus("SUCCESS");
      } else {
        const error = await res.json();
        alert(`Failed to save quote: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving quote:", error);
      alert("Failed to save quote. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const printEstimate = () => {
    // Browser print (jspdf can be added later if needed)
    window.print();
  };

  const canProceed = () => {
    if (step === 1 && !data.system) return false;
    if (step === 4 && (!data.name || !data.email)) return false;
    return true;
  };

  return (
    <div className="mx-auto flex min-h-[600px] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.82)] text-[var(--foreground)] shadow-[0_28px_70px_rgba(28,25,23,0.08)] backdrop-blur md:flex-row dark:bg-[var(--surface-elevated)] dark:shadow-none">
      <div className="flex flex-col justify-between border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,241,236,0.92))] p-8 md:w-[31%] md:border-b-0 md:border-r dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
        <div>
          <div className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Guided estimate v3.0
          </div>
          <h2 className="mb-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Start your project
          </h2>
          <p className="text-sm leading-6 text-[var(--muted)]">
            Configure requirements and get instant pricing.
          </p>
        </div>

        <div className="mt-8 space-y-4 md:mt-0">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors ${
                  isActive
                    ? "border-[color:rgba(91,143,61,0.24)] bg-[color:rgba(91,143,61,0.1)] dark:border-[color:rgba(159,211,109,0.2)] dark:bg-[color:rgba(159,211,109,0.08)]"
                    : "border-transparent bg-white/40 dark:bg-white/[0.02]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                    isActive
                      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--accent-contrast)] dark:border-[var(--accent)] dark:bg-[var(--accent)]"
                      : isCompleted
                        ? "border-[color:rgba(91,143,61,0.24)] bg-[color:rgba(91,143,61,0.12)] text-[var(--accent)] dark:border-[color:rgba(159,211,109,0.25)]"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted)] dark:bg-[var(--surface)]"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,247,241,0.64))] p-8 md:w-[69%] dark:bg-transparent">
        <div className="absolute left-0 top-0 h-1 w-full bg-[color:rgba(0,0,0,0.06)] dark:bg-white/10">
          <motion.div
            className="h-full bg-[var(--accent)]"
            initial={{ width: "20%" }}
            animate={{ width: `${step * 20}%` }}
          />
        </div>

        {status === "SUCCESS" && showInvoice && savedQuote ? (
          <InvoiceView
            clientInfo={{
              name: data.name,
              email: data.email,
              company: data.company,
            }}
            selectedPackage={selectedPackage}
            selectedFeatures={selectedFeatures}
            featureQuantities={featureQuantities}
            ongoing={ongoing}
            calculations={calculations}
            invoiceNumber={savedQuote.invoiceNumber}
            expiresAt={savedQuote.expiresAt}
            onClose={() => {
              setShowInvoice(false);
              setStep(1);
              setStatus("IDLE");
            }}
            onPrint={printEstimate}
          />
        ) : status === "SUCCESS" ? (
          <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.1)] dark:border-[color:rgba(159,211,109,0.24)] dark:bg-[color:rgba(159,211,109,0.08)]">
              <CheckCircle2 className="h-10 w-10 text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Quote Generated Successfully!
            </h3>
            <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
              Your invoice has been emailed to {data.email}. Check your inbox
              for the detailed quote.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:bg-[var(--surface)]"
            >
              Start new estimate
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="mb-6 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      Target Architecture
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        {
                          id: "lms",
                          label: "LMS Architecture",
                          icon: Layers,
                          desc: "Education & Training Platforms",
                        },
                        {
                          id: "web",
                          label: "High-Perf Web",
                          icon: Globe,
                          desc: "Next.js Static Sites & SaaS",
                        },
                        {
                          id: "ai",
                          label: "AI Integration",
                          icon: Cpu,
                          desc: "LLMs, Agents & Automation",
                        },
                        {
                          id: "data",
                          label: "Data Pipeline",
                          icon: Database,
                          desc: "Analytics & Optics",
                        },
                      ].map((sys) => {
                        const Icon = sys.icon;
                        const selected = data.system === sys.label;

                        return (
                          <button
                            key={sys.id}
                            onClick={() => setData({ ...data, system: sys.label })}
                            className={`flex items-center gap-4 rounded-[1.2rem] border p-4 text-left transition-all ${
                              selected
                                ? "border-[color:rgba(91,143,61,0.28)] bg-[color:rgba(91,143,61,0.08)] shadow-[0_16px_34px_rgba(91,143,61,0.08)] dark:border-[color:rgba(159,211,109,0.24)] dark:bg-[color:rgba(159,211,109,0.08)] dark:shadow-none"
                                : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[color:rgba(91,143,61,0.24)] dark:bg-[var(--surface)]"
                            }`}
                          >
                            <Icon
                              className={selected ? "text-[var(--accent)]" : "text-[var(--muted)]"}
                              size={24}
                            />
                            <div>
                              <div className="font-semibold text-[var(--foreground)]">
                                {sys.label}
                              </div>
                              <div className="text-xs text-[var(--muted)]">
                                {sys.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="mb-6 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      Select Features
                    </h3>

                    <div className="max-h-96 space-y-3 overflow-y-auto">
                      {Object.entries(features).map(([key, feature]) => {
                        const isSelected = selectedFeatures[key];
                        const quantity = featureQuantities[key] || 1;
                        const needsQuantity =
                          feature.name.includes("per") ||
                          feature.name.includes("Additional");

                        return (
                          <div
                            key={key}
                            className={`rounded-[1.15rem] border p-4 transition-all ${
                              isSelected
                                ? "border-[color:rgba(91,143,61,0.26)] bg-[color:rgba(91,143,61,0.08)] dark:border-[color:rgba(159,211,109,0.22)] dark:bg-[color:rgba(159,211,109,0.08)]"
                                : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[color:rgba(91,143,61,0.22)] dark:bg-[var(--surface)]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex flex-1 items-center gap-3">
                                <button
                                  onClick={() => togglePricingFeature(key)}
                                  className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                                    isSelected
                                      ? "border-[var(--accent)] bg-[var(--accent)]"
                                      : "border-[var(--border)] bg-transparent"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check
                                      size={12}
                                      className="text-[var(--accent-contrast)]"
                                    />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-[var(--foreground)]">
                                    {feature.name}
                                  </div>
                                  <div className="text-xs text-[var(--muted)]">
                                    £{feature.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              {isSelected && needsQuantity && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(key, -1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:bg-[var(--surface-elevated)]"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-6 text-center text-sm font-medium text-[var(--foreground)]">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(key, 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:bg-[var(--surface-elevated)]"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <textarea
                      placeholder="Additional technical details, context, or dependencies..."
                      className="h-28 w-full resize-none rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]/80 focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                      value={data.details}
                      onChange={(e) =>
                        setData({ ...data, details: e.target.value })
                      }
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="mb-8 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      Project Constraints
                    </h3>

                    <div className="mb-8">
                      <label className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Estimated budget
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"].map(
                          (b) => (
                            <button
                              key={b}
                              onClick={() => setData({ ...data, budget: b })}
                              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                                data.budget === b
                                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--accent-contrast)] dark:border-[var(--accent)] dark:bg-[var(--accent)]"
                                  : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] dark:bg-[var(--surface)]"
                              }`}
                            >
                              {b}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Target timeline
                      </label>
                      <select
                        value={data.timeline}
                        onChange={(e) =>
                          setData({ ...data, timeline: e.target.value })
                        }
                        className="w-full rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-3 text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                      >
                        <option>Urgent (&lt; 1 Month)</option>
                        <option>Standard (1-3 Months)</option>
                        <option>Long Term (3-6 Months)</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Ongoing costs (optional)
                      </label>
                      <div className="space-y-2">
                        {Object.entries(ongoingCosts).map(([key, cost]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between rounded-[1rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface)]"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleOngoing(key)}
                                className={`flex h-5 w-5 items-center justify-center rounded border ${
                                  ongoing[key]
                                    ? "border-[var(--accent)] bg-[var(--accent)]"
                                    : "border-[var(--border)] bg-transparent"
                                }`}
                              >
                                {ongoing[key] && (
                                  <Check
                                    size={12}
                                    className="text-[var(--accent-contrast)]"
                                  />
                                )}
                              </button>
                              <span className="text-sm text-[var(--foreground)]/84">
                                {cost.name}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--accent)]">
                              £{cost.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      <Calculator className="text-[var(--accent)]" size={24} />
                      Pricing Summary
                    </h3>

                    <div className="mb-6 rounded-[1.35rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,242,233,0.82))] p-6 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]">
                      <div className="mb-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted)]">Base Package:</span>
                          <span className="font-medium text-[var(--foreground)]">
                            £{calculations.baseTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted)]">Features:</span>
                          <span className="font-medium text-[var(--foreground)]">
                            £{calculations.featuresTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted)]">Subtotal:</span>
                          <span className="font-medium text-[var(--foreground)]">
                            £{calculations.subtotal.toLocaleString()}
                          </span>
                        </div>
                        {calculations.discountAmount > 0 && (
                          <div className="flex justify-between text-sm text-[var(--accent)]">
                            <span>Adjustment / Offer:</span>
                            <span className="font-medium">
                              -£
                              {calculations.discountAmount.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted)]">VAT (20%):</span>
                          <span className="font-medium text-[var(--foreground)]">
                            £{calculations.vat.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[var(--border)] pt-3 text-lg font-semibold">
                          <span className="text-[var(--foreground)]">Total:</span>
                          <span className="text-[var(--accent)]">
                            £{calculations.total.toLocaleString()}
                          </span>
                        </div>
                        {calculations.ongoingTotal > 0 && (
                          <div className="border-t border-[var(--border)] pt-3">
                            <div className="mb-1 flex justify-between text-sm text-[var(--muted)]">
                              <span>Ongoing (Year 1):</span>
                              <span className="font-medium text-[var(--foreground)]">
                                £{calculations.ongoingTotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span className="text-[var(--accent)]">
                                First Year Total:
                              </span>
                              <span className="text-[var(--accent)]">
                                £{calculations.firstYearTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.7)] p-4 dark:bg-white/[0.03]">
                      <button
                        onClick={() => setShowDiscountInput(!showDiscountInput)}
                        className="flex w-full items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                      >
                        <HandCoins size={16} />
                        <span>Need more flexibility? Make an offer</span>
                      </button>

                      {showDiscountInput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                                £
                              </span>
                              <input
                                type="number"
                                placeholder="Enter your budget..."
                                className="w-full rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] py-2.5 pl-8 pr-4 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                                value={offerAmount}
                                onChange={(e) => setOfferAmount(e.target.value)}
                                disabled={offerStatus === "ACCEPTED"}
                              />
                            </div>
                            <button
                              onClick={handleSubmitOffer}
                              disabled={
                                offerStatus === "ACCEPTED" ||
                                offerStatus === "PROCESSING"
                              }
                              className="rounded-full bg-[var(--foreground)] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-contrast)] transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-[var(--accent)]"
                            >
                              {offerStatus === "PROCESSING" ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>

                          {offerStatus === "ACCEPTED" && (
                            <p className="flex items-center gap-1 text-xs text-[var(--accent)]">
                              <CheckCircle2 size={12} /> Offer accepted! Quote
                              updated.
                            </p>
                          )}
                          {offerStatus === "REJECTED" && (
                            <p className="text-xs text-red-500 dark:text-red-300">
                              Offer too low. Please increase your budget or
                              remove features.
                            </p>
                          )}
                          {offerStatus === "REVIEW" && (
                            <p className="text-xs text-amber-600 dark:text-amber-300">
                              Offer requires manual review. Submit quote to
                              proceed.
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4 rounded-[1.25rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.64)] p-5 dark:bg-white/[0.03]">
                      <div>
                        <label className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                          Client identifier
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name / Company"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                          Return address
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                          Company (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                          value={data.company}
                          onChange={(e) =>
                            setData({ ...data, company: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-between border-t border-[var(--border)] pt-6">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft size={16} /> Back
              </button>

              {step < 4 ? (
                <button
                  onClick={() => canProceed() && setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-contrast)] transition-opacity hover:opacity-90 disabled:bg-[var(--border)] disabled:text-[var(--muted)] disabled:opacity-70 dark:bg-[var(--accent)]"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={generateEstimate}
                  disabled={!canProceed() || saving}
                  className="flex items-center gap-2 rounded-full bg-[var(--foreground)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-contrast)] transition-opacity hover:opacity-90 disabled:bg-[var(--border)] disabled:text-[var(--muted)] disabled:opacity-70 dark:bg-[var(--accent)]"
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText size={16} /> Generate estimate
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Invoice Component - Same as before but imported
function InvoiceView({
  clientInfo,
  selectedPackage,
  selectedFeatures,
  featureQuantities,
  ongoing,
  calculations,
  invoiceNumber,
  expiresAt,
  onClose,
  onPrint,
}) {
  const invoiceDate = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const expiryDate = new Date(expiresAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[color:rgba(23,21,17,0.45)] p-6 backdrop-blur-sm print:bg-white print:p-0">
      <div className="invoice-container mx-auto max-w-4xl rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-[var(--foreground)] shadow-[0_26px_70px_rgba(23,21,17,0.14)] dark:bg-[var(--surface)] dark:shadow-none md:p-12 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
        <div className="mb-8 flex items-start justify-between border-b border-[var(--border)] pb-6 print:border-gray-300">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="origin-left scale-75 print:hidden">
                <FinnitrexLogo className="h-16 w-16" textVisible={false} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] print:text-black">
                  FINNI
                  <span className="text-[var(--accent)] print:text-gray-800">
                    TREX
                  </span>
                </h1>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] print:text-gray-600">
                  Systems architecture
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)] print:text-gray-600">
              Solutions Ltd
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]/80 print:text-gray-500">
              483 Green Lanes, London, N13 4BS
            </p>
          </div>
          <div className="text-right">
            <div className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] print:text-gray-600">
              Estimate #
            </div>
            <div className="text-xl font-semibold text-[var(--foreground)] print:text-black">
              {invoiceNumber}
            </div>
            <div className="mb-1 mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] print:text-gray-600">
              Date
            </div>
            <div className="text-sm text-[var(--foreground)] print:text-black">
              {invoiceDate}
            </div>
            <div className="mt-4 mb-1 flex items-center justify-end gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] print:text-gray-700">
              <Calendar size={12} />
              Valid until
            </div>
            <div className="text-sm font-medium text-[var(--accent)] print:text-black">
              {expiryDate}
            </div>
            <div className="mt-3 rounded-full border border-[color:rgba(91,143,61,0.18)] bg-[color:rgba(91,143,61,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] print:border-gray-300 print:bg-gray-100 print:text-gray-700">
              Provisional Quote
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)] print:text-gray-700">
            Bill to
          </h3>
          <p className="text-base font-medium text-[var(--foreground)] print:text-black">
            {clientInfo.name}
          </p>
          {clientInfo.company && (
            <p className="text-sm text-[var(--muted)] print:text-gray-600">
              {clientInfo.company}
            </p>
          )}
          {clientInfo.email && (
            <p className="text-sm text-[var(--muted)] print:text-gray-600">
              {clientInfo.email}
            </p>
          )}
        </div>

        <div className="mb-8 rounded-[1.2rem] border border-[var(--border)] bg-[color:rgba(246,242,233,0.55)] p-6 print:rounded-none print:border print:border-gray-300 print:bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] print:border-gray-300">
                <th className="py-3 text-left text-sm font-semibold text-[var(--muted)] print:text-gray-700">
                  Description
                </th>
                <th className="py-3 text-right text-sm font-semibold text-[var(--muted)] print:text-gray-700">
                  Qty
                </th>
                <th className="py-3 text-right text-sm font-semibold text-[var(--muted)] print:text-gray-700">
                  Unit Price
                </th>
                <th className="py-3 text-right text-sm font-semibold text-[var(--muted)] print:text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPackage && (
                <tr className="border-b border-[var(--border)]/70 print:border-gray-200">
                  <td className="py-3 font-semibold text-[var(--foreground)] print:text-black">
                    {basePackages[selectedPackage].name}
                  </td>
                  <td className="text-right text-sm text-[var(--foreground)] print:text-black">
                    1
                  </td>
                  <td className="text-right text-sm text-[var(--foreground)] print:text-black">
                    £{calculations.baseTotal.toLocaleString()}
                  </td>
                  <td className="text-right text-sm font-semibold text-[var(--accent)] print:text-black">
                    £{calculations.baseTotal.toLocaleString()}
                  </td>
                </tr>
              )}
              {Object.entries(selectedFeatures).map(([key, enabled]) => {
                if (!enabled || !features[key]) return null;
                const quantity = featureQuantities[key] || 1;
                const total = features[key].price * quantity;
                return (
                  <tr
                    key={key}
                    className="border-b border-[var(--border)]/70 print:border-gray-200"
                  >
                    <td className="py-2 text-sm text-[var(--foreground)]/88 print:text-gray-700">
                      {features[key].name}
                    </td>
                    <td className="text-right text-sm text-[var(--muted)] print:text-black">
                      {quantity}
                    </td>
                    <td className="text-right text-sm text-[var(--muted)] print:text-black">
                      £{features[key].price.toLocaleString()}
                    </td>
                    <td className="text-right text-sm text-[var(--foreground)] print:text-black">
                      £{total.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              {Object.entries(ongoing).map(([key, enabled]) => {
                if (!enabled || !ongoingCosts[key]) return null;
                return (
                  <tr
                    key={key}
                    className="border-b border-[var(--border)]/70 print:border-gray-200"
                  >
                    <td className="py-2 text-sm text-[var(--foreground)]/88 print:text-gray-700">
                      {ongoingCosts[key].name} (Annual)
                    </td>
                    <td className="text-right text-sm text-[var(--muted)] print:text-black">
                      1
                    </td>
                    <td className="text-right text-sm text-[var(--muted)] print:text-black">
                      £{ongoingCosts[key].price.toLocaleString()}
                    </td>
                    <td className="text-right text-sm text-[var(--foreground)] print:text-black">
                      £{ongoingCosts[key].price.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mb-8 ml-auto w-64 space-y-2">
          <div className="flex justify-between text-sm text-[var(--muted)] print:text-gray-700">
            <span>Subtotal:</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.subtotal.toLocaleString()}
            </span>
          </div>
          {calculations.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-[var(--accent)] print:text-black">
              <span>Agreed Adjustment:</span>
              <span>
                -£
                {calculations.discountAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm text-[var(--muted)] print:text-gray-700">
            <span>VAT (20%):</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.vat.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t-2 border-[var(--foreground)] pt-2 text-lg font-semibold print:border-gray-300">
            <span className="text-[var(--foreground)] print:text-black">Total:</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mb-6 rounded-[1.2rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.6)] p-6 print:rounded-none print:border-gray-300 print:bg-gray-100">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)] print:text-gray-700">
            Payment Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)] print:text-gray-600">
                Bank
              </div>
              <div className="font-medium text-[var(--foreground)] print:text-black">
                Barclays UK
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)] print:text-gray-600">
                Sort Code
              </div>
              <div className="font-medium text-[var(--foreground)] print:text-black">
                20-00-00
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)] print:text-gray-600">
                Account Number
              </div>
              <div className="font-medium text-[var(--foreground)] print:text-black">
                87654321
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)] print:text-gray-600">
                Reference
              </div>
              <div className="font-semibold text-[var(--foreground)] print:text-black">
                {invoiceNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-[1.1rem] border border-[color:rgba(91,143,61,0.18)] bg-[color:rgba(91,143,61,0.08)] p-4 print:rounded-none print:border-gray-300 print:bg-white">
          <Calendar
            className="mt-0.5 shrink-0 text-[var(--accent)] print:text-gray-700"
            size={18}
          />
          <div>
            <p className="mb-1 text-sm font-semibold text-[var(--foreground)] print:text-black">
              Quote Valid for 30 Days
            </p>
            <p className="text-xs text-[var(--muted)] print:text-gray-700">
              This quote expires on <strong>{expiryDate}</strong>.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--muted)] print:border-gray-300 print:text-gray-600">
          <p>Thank you for your business.</p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a href="mailto:info@finnitrex.com" className="text-[var(--foreground)] hover:underline print:text-black">
              info@finnitrex.com
            </a>{" "}
            or <strong className="text-[var(--foreground)] print:text-black">+44 7521 511800</strong>
          </p>
        </div>

        <div className="mt-8 flex gap-4 print:hidden">
          <button
            onClick={onPrint}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--foreground)] py-3 font-semibold uppercase tracking-[0.16em] text-[var(--accent-contrast)] transition-opacity hover:opacity-90 dark:bg-[var(--accent)]"
          >
            <Download size={18} />
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
