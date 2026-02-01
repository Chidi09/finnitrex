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
  { id: 5, title: "Generate Invoice" },
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
  const [discountType, setDiscountType] = useState("none"); // "none", "percentage", "amount"
  const [discountValue, setDiscountValue] = useState(0);
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

  const handleToggleFeature = (feature) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

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

  const generateInvoice = async () => {
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

  const printInvoice = () => {
    // Browser print (jspdf can be added later if needed)
    window.print();
  };

  const canProceed = () => {
    if (step === 1 && !data.system) return false;
    if (step === 4 && (!data.name || !data.email)) return false;
    return true;
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/10 flex flex-col md:flex-row min-h-[600px]">
      {/* SIDEBAR: Progress & Info */}
      <div className="bg-gray-900/50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono text-lime-400 mb-6">
            PROJECT WIZARD v3.0
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">START PROJECT</h2>
          <p className="text-sm text-gray-400">
            Configure requirements and get instant pricing.
          </p>
        </div>

        <div className="space-y-4 mt-8 md:mt-0">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                  ${
                    isActive
                      ? "bg-lime-500 text-black border-lime-500"
                      : isCompleted
                        ? "bg-green-500/20 text-green-500 border-green-500"
                        : "bg-gray-800 text-gray-500 border-gray-700"
                  }
                `}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span
                  className={`text-sm font-mono ${isActive ? "text-white" : "text-gray-600"}`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="p-8 md:w-2/3 bg-black/80 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
          <motion.div
            className="h-full bg-lime-500"
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
            onPrint={printInvoice}
          />
        ) : status === "SUCCESS" ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Quote Generated Successfully!
            </h3>
            <p className="text-gray-400 max-w-sm">
              Your invoice has been emailed to {data.email}. Check your inbox
              for the detailed quote.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm font-mono text-white transition-colors"
            >
              Start New Sequence
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 py-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* STEP 1: SYSTEM SELECTION */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-6 text-white">
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
                        return (
                          <button
                            key={sys.id}
                            onClick={() =>
                              setData({ ...data, system: sys.label })
                            }
                            className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all
                              ${
                                data.system === sys.label
                                  ? "bg-lime-900/20 border-lime-500 shadow-[0_0_15px_rgba(190,242,100,0.2)]"
                                  : "bg-gray-900/20 border-gray-800 hover:border-gray-600"
                              }
                            `}
                          >
                            <Icon
                              className={
                                data.system === sys.label
                                  ? "text-lime-400"
                                  : "text-gray-600"
                              }
                              size={24}
                            />
                            <div>
                              <div
                                className={`font-bold ${data.system === sys.label ? "text-white" : "text-gray-400"}`}
                              >
                                {sys.label}
                              </div>
                              <div className="text-xs text-gray-500">
                                {sys.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: FEATURES & SCOPE */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 text-white">
                      Select Features
                    </h3>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {Object.entries(features).map(([key, feature]) => {
                        const isSelected = selectedFeatures[key];
                        const quantity = featureQuantities[key] || 1;
                        const needsQuantity =
                          feature.name.includes("per") ||
                          feature.name.includes("Additional");

                        return (
                          <div
                            key={key}
                            className={`p-4 rounded-lg border transition-all ${
                              isSelected
                                ? "border-lime-500 bg-lime-900/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <button
                                  onClick={() => togglePricingFeature(key)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? "border-lime-500 bg-lime-500"
                                      : "border-gray-600"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check size={12} className="text-black" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div className="font-semibold text-sm text-white">
                                    {feature.name}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    £{feature.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              {isSelected && needsQuantity && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(key, -1)}
                                    className="w-7 h-7 rounded border border-gray-600 flex items-center justify-center hover:bg-gray-800"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-6 text-center font-mono text-sm">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(key, 1)}
                                    className="w-7 h-7 rounded border border-gray-600 flex items-center justify-center hover:bg-gray-800"
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
                      placeholder="// Additional technical details..."
                      className="w-full bg-gray-900/20 border border-gray-800 rounded p-3 text-sm text-white focus:border-lime-500 focus:outline-none h-24 resize-none"
                      value={data.details}
                      onChange={(e) =>
                        setData({ ...data, details: e.target.value })
                      }
                    />
                  </motion.div>
                )}

                {/* STEP 3: CONSTRAINTS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-8 text-white">
                      Project Constraints
                    </h3>

                    <div className="mb-8">
                      <label className="block text-sm font-mono text-lime-400 mb-4">
                        ESTIMATED BUDGET
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"].map(
                          (b) => (
                            <button
                              key={b}
                              onClick={() => setData({ ...data, budget: b })}
                              className={`py-2 px-4 rounded border text-sm transition-colors
                              ${data.budget === b ? "bg-lime-500 text-black border-lime-500 font-bold" : "bg-transparent border-gray-700 text-gray-400"}
                            `}
                            >
                              {b}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-mono text-emerald-400 mb-4">
                        TARGET TIMELINE
                      </label>
                      <select
                        value={data.timeline}
                        onChange={(e) =>
                          setData({ ...data, timeline: e.target.value })
                        }
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-lime-500 outline-none"
                      >
                        <option>Urgent (&lt; 1 Month)</option>
                        <option>Standard (1-3 Months)</option>
                        <option>Long Term (3-6 Months)</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    {/* Ongoing Costs */}
                    <div>
                      <label className="block text-sm font-mono text-lime-400 mb-4">
                        ONGOING COSTS (Optional)
                      </label>
                      <div className="space-y-2">
                        {Object.entries(ongoingCosts).map(([key, cost]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleOngoing(key)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  ongoing[key]
                                    ? "border-lime-500 bg-lime-500"
                                    : "border-gray-600"
                                }`}
                              >
                                {ongoing[key] && (
                                  <Check size={12} className="text-black" />
                                )}
                              </button>
                              <span className="text-sm text-gray-300">
                                {cost.name}
                              </span>
                            </div>
                            <span className="text-lime-400 font-mono text-sm">
                              £{cost.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PRICING & CONTACT */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                      <Calculator className="text-lime-400" size={24} />
                      Pricing Summary
                    </h3>

                    {/* Price Summary */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Base Package:</span>
                          <span className="font-mono text-white">
                            £{calculations.baseTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Features:</span>
                          <span className="font-mono text-white">
                            £{calculations.featuresTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal:</span>
                          <span className="font-mono text-white">
                            £{calculations.subtotal.toLocaleString()}
                          </span>
                        </div>
                        {calculations.discountAmount > 0 && (
                          <div className="flex justify-between text-sm text-lime-400">
                            <span>Adjustment / Offer:</span>
                            <span className="font-mono">
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
                          <span className="text-gray-400">VAT (20%):</span>
                          <span className="font-mono text-white">
                            £{calculations.vat.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
                          <span className="text-white">Total:</span>
                          <span className="text-lime-400 font-mono">
                            £{calculations.total.toLocaleString()}
                          </span>
                        </div>
                        {calculations.ongoingTotal > 0 && (
                          <div className="border-t border-gray-700 pt-3">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Ongoing (Year 1):</span>
                              <span className="font-mono">
                                £{calculations.ongoingTotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span className="text-emerald-400">
                                First Year Total:
                              </span>
                              <span className="text-emerald-400 font-mono">
                                £{calculations.firstYearTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Negotiation / Offer Section */}
                    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                      <button
                        onClick={() => setShowDiscountInput(!showDiscountInput)}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
                      >
                        <HandCoins size={16} />
                        <span>Can't meet this quota? Make an offer</span>
                      </button>

                      {showDiscountInput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                £
                              </span>
                              <input
                                type="number"
                                placeholder="Enter your budget..."
                                className="w-full bg-black border border-gray-700 rounded-lg py-2 pl-8 pr-4 text-white focus:border-lime-500 outline-none"
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
                              className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                            >
                              {offerStatus === "PROCESSING" ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>

                          {offerStatus === "ACCEPTED" && (
                            <p className="text-lime-400 text-xs flex items-center gap-1">
                              <CheckCircle2 size={12} /> Offer accepted! Quote
                              updated.
                            </p>
                          )}
                          {offerStatus === "REJECTED" && (
                            <p className="text-red-400 text-xs">
                              Offer too low. Please increase your budget or
                              remove features.
                            </p>
                          )}
                          {offerStatus === "REVIEW" && (
                            <p className="text-yellow-400 text-xs">
                              Offer requires manual review. Submit quote to
                              proceed.
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-1">
                          CLIENT IDENTIFIER
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name / Company"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-lg text-white focus:border-lime-500 outline-none transition-colors"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-1">
                          RETURN ADDRESS
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-lg text-white focus:border-lime-500 outline-none transition-colors"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-1">
                          COMPANY (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-lg text-white focus:border-lime-500 outline-none transition-colors"
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

            {/* NAV BUTTONS */}
            <div className="flex justify-between pt-6 border-t border-gray-800">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={16} /> BACK
              </button>

              {step < 4 ? (
                <button
                  onClick={() => canProceed() && setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-lime-400 transition-colors disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400"
                >
                  NEXT <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={generateInvoice}
                  disabled={!canProceed() || saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-lime-500 to-lime-600 text-black px-8 py-2 rounded font-bold hover:shadow-[0_0_20px_rgba(190,242,100,0.5)] transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />{" "}
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <FileText size={16} /> GENERATE INVOICE
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
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto p-6 print:p-0 print:bg-white">
      <div className="invoice-container max-w-4xl mx-auto bg-black border border-gray-800 rounded-2xl p-8 md:p-12 print:bg-white print:border-0 print:rounded-none print:shadow-none">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6 print:border-gray-300">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="scale-75 origin-left print:hidden">
                <FinnitrexLogo className="w-16 h-16" textVisible={false} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white print:text-black">
                  FINNI
                  <span className="text-lime-400 print:text-lime-600">
                    TREX
                  </span>
                </h1>
                <p className="text-xs text-lime-400 print:text-gray-600 font-mono tracking-widest">
                  SYSTEMS ARCHITECTURE
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 print:text-gray-600 mt-2">
              Solutions Ltd
            </p>
            <p className="text-xs text-gray-500 print:text-gray-500 mt-2">
              483 Green Lanes, London, N13 4BS
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 print:text-gray-600 mb-1">
              ESTIMATE #
            </div>
            <div className="text-xl font-bold font-mono text-lime-400 print:text-black">
              {invoiceNumber}
            </div>
            <div className="text-xs text-gray-500 print:text-gray-600 mt-4 mb-1">
              DATE
            </div>
            <div className="font-mono text-gray-300 print:text-black">
              {invoiceDate}
            </div>
            <div className="text-xs text-emerald-400 print:text-emerald-600 mt-4 mb-1 flex items-center gap-1">
              <Calendar size={12} />
              VALID UNTIL
            </div>
            <div className="font-mono text-emerald-400 print:text-emerald-600 text-sm">
              {expiryDate}
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="font-bold mb-2 text-white print:text-black">
            Bill To:
          </h3>
          <p className="text-gray-300 print:text-gray-700">{clientInfo.name}</p>
          {clientInfo.company && (
            <p className="text-gray-400 print:text-gray-600 text-sm">
              {clientInfo.company}
            </p>
          )}
          {clientInfo.email && (
            <p className="text-gray-400 print:text-gray-600 text-sm">
              {clientInfo.email}
            </p>
          )}
        </div>

        {/* Items Table */}
        <div className="bg-gray-900/50 print:bg-gray-50 border border-gray-800 print:border-gray-300 rounded-lg p-6 mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 print:border-gray-300">
                <th className="text-left py-3 font-bold text-lime-400 print:text-black text-sm">
                  Description
                </th>
                <th className="text-right py-3 font-bold text-lime-400 print:text-black text-sm">
                  Qty
                </th>
                <th className="text-right py-3 font-bold text-lime-400 print:text-black text-sm">
                  Unit Price
                </th>
                <th className="text-right py-3 font-bold text-lime-400 print:text-black text-sm">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPackage && (
                <tr className="border-b border-gray-800 print:border-gray-200">
                  <td className="py-3 text-white print:text-black font-semibold">
                    {basePackages[selectedPackage].name}
                  </td>
                  <td className="text-right font-mono text-gray-300 print:text-black">
                    1
                  </td>
                  <td className="text-right font-mono text-gray-300 print:text-black">
                    £{calculations.baseTotal.toLocaleString()}
                  </td>
                  <td className="text-right font-mono font-bold text-lime-400 print:text-black">
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
                    className="border-b border-gray-800 print:border-gray-200"
                  >
                    <td className="py-2 text-sm text-gray-300 print:text-gray-700">
                      {features[key].name}
                    </td>
                    <td className="text-right font-mono text-sm text-gray-400 print:text-black">
                      {quantity}
                    </td>
                    <td className="text-right font-mono text-sm text-gray-400 print:text-black">
                      £{features[key].price.toLocaleString()}
                    </td>
                    <td className="text-right font-mono text-sm text-gray-300 print:text-black">
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
                    className="border-b border-gray-800 print:border-gray-200"
                  >
                    <td className="py-2 text-sm text-gray-300 print:text-gray-700">
                      {ongoingCosts[key].name} (Annual)
                    </td>
                    <td className="text-right font-mono text-sm text-gray-400 print:text-black">
                      1
                    </td>
                    <td className="text-right font-mono text-sm text-gray-400 print:text-black">
                      £{ongoingCosts[key].price.toLocaleString()}
                    </td>
                    <td className="text-right font-mono text-sm text-gray-300 print:text-black">
                      £{ongoingCosts[key].price.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="ml-auto w-64 space-y-2 mb-8">
          <div className="flex justify-between text-sm text-gray-400 print:text-gray-700">
            <span>Subtotal:</span>
            <span className="font-mono text-gray-300 print:text-black">
              £{calculations.subtotal.toLocaleString()}
            </span>
          </div>
          {calculations.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-lime-400 print:text-black">
              <span>Agreed Adjustment:</span>
              <span className="font-mono">
                -£
                {calculations.discountAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-400 print:text-gray-700">
            <span>VAT (20%):</span>
            <span className="font-mono text-gray-300 print:text-black">
              £{calculations.vat.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t-2 border-lime-500 print:border-gray-300 pt-2">
            <span className="text-white print:text-black">Total:</span>
            <span className="text-lime-400 print:text-lime-600 font-mono">
              £{calculations.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-lime-900/20 print:bg-gray-100 border border-lime-500/30 print:border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="font-bold mb-3 text-lime-400 print:text-lime-600 text-sm uppercase tracking-wider">
            Payment Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400 print:text-gray-600 mb-1 text-xs">
                Bank:
              </div>
              <div className="font-mono text-white print:text-black font-bold">
                Barclays UK
              </div>
            </div>
            <div>
              <div className="text-gray-400 print:text-gray-600 mb-1 text-xs">
                Sort Code:
              </div>
              <div className="font-mono text-white print:text-black font-bold">
                20-00-00
              </div>
            </div>
            <div>
              <div className="text-gray-400 print:text-gray-600 mb-1 text-xs">
                Account Number:
              </div>
              <div className="font-mono text-white print:text-black font-bold">
                87654321
              </div>
            </div>
            <div>
              <div className="text-lime-400 print:text-lime-600 mb-1 text-xs font-bold">
                Reference:
              </div>
              <div className="font-mono text-lime-400 print:text-lime-600 font-bold text-base">
                {invoiceNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Expiration */}
        <div className="bg-emerald-900/20 print:bg-emerald-50 border border-emerald-500/30 print:border-emerald-300 p-4 rounded-lg mb-6 flex items-start gap-3">
          <Calendar
            className="text-emerald-400 print:text-emerald-600 shrink-0 mt-0.5"
            size={18}
          />
          <div>
            <p className="text-emerald-400 print:text-emerald-600 font-bold text-sm mb-1">
              Quote Valid for 30 Days
            </p>
            <p className="text-gray-400 print:text-gray-700 text-xs">
              This quote expires on{" "}
              <strong className="text-emerald-300 print:text-emerald-700">
                {expiryDate}
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 print:text-gray-600 text-center border-t border-gray-800 print:border-gray-300 pt-4">
          <p>Thank you for your business.</p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a
              href="mailto:info@finnitrex.com"
              className="text-lime-400 print:text-lime-600 hover:underline"
            >
              info@finnitrex.com
            </a>{" "}
            or{" "}
            <strong className="text-lime-400 print:text-lime-600">
              +44 7521 511800
            </strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 print:hidden">
          <button
            onClick={onPrint}
            className="flex-1 bg-lime-500 text-black font-bold py-3 rounded-lg hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
