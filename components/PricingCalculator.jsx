"use client";

import { useState, useMemo } from "react";
import { trackQuoteGeneration } from "@/lib/analytics";
import {
  Check,
  Plus,
  Minus,
  Calculator,
  FileText,
  Download,
  Loader2,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { basePackages, features, ongoingCosts } from "@/lib/pricingConfig";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function PricingCalculator() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [featureQuantities, setFeatureQuantities] = useState({});
  const [ongoing, setOngoing] = useState({});
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [showInvoice, setShowInvoice] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedQuote, setSavedQuote] = useState(null);

  // Calculate totals
  const calculations = useMemo(() => {
    let baseTotal = selectedPackage
      ? basePackages[selectedPackage].basePrice
      : 0;

    // Add feature costs
    let featuresTotal = 0;
    Object.entries(selectedFeatures).forEach(([key, enabled]) => {
      if (enabled && features[key]) {
        const quantity = featureQuantities[key] || 1;
        featuresTotal += features[key].price * quantity;
      }
    });

    // Add ongoing costs (annual)
    let ongoingTotal = 0;
    Object.entries(ongoing).forEach(([key, enabled]) => {
      if (enabled && ongoingCosts[key]) {
        ongoingTotal += ongoingCosts[key].price;
      }
    });

    const subtotal = baseTotal + featuresTotal;
    const vat = subtotal * 0.2; // 20% VAT (UK)
    const total = subtotal + vat;
    const firstYearTotal = total + ongoingTotal;

    return {
      baseTotal,
      featuresTotal,
      subtotal,
      vat,
      total,
      ongoingTotal,
      firstYearTotal,
    };
  }, [selectedPackage, selectedFeatures, featureQuantities, ongoing]);

  const toggleFeature = (key) => {
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

  const generateEstimate = async () => {
    if (!clientInfo.name || !clientInfo.email) {
      alert("Please enter your name and email to generate invoice");
      return;
    }

    // TRACKING CODE
    trackQuoteGeneration(
      calculations.total,
      basePackages[selectedPackage].name,
    );

    setSaving(true);
    try {
      const res = await fetch("/api/quote/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientInfo.name,
          clientEmail: clientInfo.email,
          clientCompany: clientInfo.company,
          selectedPackage,
          selectedFeatures,
          featureQuantities,
          ongoingCosts: ongoing,
          calculations,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedQuote(data);
        setShowInvoice(true);
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
    window.print();
  };

  return (
    <div className="min-h-screen px-6 py-8 text-[var(--foreground)] md:px-8 md:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-[var(--accent)]" size={40} />
            Project Pricing Calculator
          </h1>
          <p className="text-[var(--muted)] text-lg">
            Select your package and features. Get an instant quote with a
            professional invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Selection */}
            <div className="rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] p-6 shadow-[0_18px_45px_rgba(28,25,23,0.06)] dark:bg-white/[0.04] dark:shadow-none">
              <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">
                1. Select Base Package
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(basePackages).map(([key, pkg]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPackage(key)}
                    className={`p-6 rounded-xl border text-left transition-all ${
                      selectedPackage === key
                        ? "border-[color:rgba(91,143,61,0.35)] bg-[color:rgba(91,143,61,0.08)]"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[color:rgba(91,143,61,0.28)] dark:bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      {selectedPackage === key && (
                        <Check className="text-[var(--accent)]" size={24} />
                      )}
                    </div>
                    <p className="text-[var(--muted)] text-sm mb-3">
                      {pkg.description}
                    </p>
                    <div className="text-[var(--accent)] font-bold text-lg">
                      £{pkg.minPrice.toLocaleString()} - £
                      {pkg.maxPrice.toLocaleString()}
                    </div>
                    <ul className="mt-4 space-y-1 text-xs text-[var(--muted)]">
                      {pkg.includes.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Features Selection */}
            {selectedPackage && (
              <div className="rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] p-6 shadow-[0_18px_45px_rgba(28,25,23,0.06)] dark:bg-white/[0.04] dark:shadow-none">
                <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">
                  2. Add Features
                </h2>
                <div className="space-y-4">
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
                            ? "border-[color:rgba(91,143,61,0.35)] bg-[color:rgba(91,143,61,0.08)]"
                            : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[color:rgba(91,143,61,0.28)] dark:bg-[var(--surface)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleFeature(key)}
                              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-[var(--accent)] bg-[var(--accent)]"
                                  : "border-[var(--border)]"
                              }`}
                            >
                              {isSelected && (
                                <Check size={16} className="text-[var(--accent-contrast)]" />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="font-semibold">
                                {feature.name}
                              </div>
                              <div className="text-sm text-[var(--muted)]">
                                £{feature.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          {isSelected && needsQuantity && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(key, -1)}
                                className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface)]"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(key, 1)}
                                className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface)]"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ongoing Costs */}
            {selectedPackage && (
              <div className="rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] p-6 shadow-[0_18px_45px_rgba(28,25,23,0.06)] dark:bg-white/[0.04] dark:shadow-none">
                <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">
                  3. Ongoing Costs (Annual)
                </h2>
                <div className="space-y-3">
                  {Object.entries(ongoingCosts).map(([key, cost]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] dark:bg-[var(--surface)]"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleOngoing(key)}
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            ongoing[key]
                              ? "border-[var(--accent)] bg-[var(--accent)]"
                              : "border-[var(--border)]"
                          }`}
                        >
                          {ongoing[key] && (
                            <Check size={12} className="text-[var(--accent-contrast)]" />
                          )}
                        </button>
                        <span>{cost.name}</span>
                      </div>
                      <span className="text-[var(--accent)] font-semibold">
                        £{cost.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Summary & Invoice */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="sticky top-6 rounded-2xl border border-[var(--border)] bg-[color:rgba(255,255,255,0.74)] p-6 shadow-[0_18px_45px_rgba(28,25,23,0.06)] dark:bg-white/[0.04] dark:shadow-none">
              <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">
                Quote Summary
              </h2>

              {!selectedPackage ? (
                <p className="text-[var(--muted)] text-center py-8">
                  Select a package to begin
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Base Package:</span>
                      <span className="font-semibold">
                        £{calculations.baseTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Features:</span>
                      <span className="font-semibold">
                        £{calculations.featuresTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Subtotal:</span>
                      <span className="font-semibold">
                        £{calculations.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">VAT (20%):</span>
                      <span className="font-semibold">
                        £{calculations.vat.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-[var(--border)] pt-3 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-[var(--accent)]">
                        £{calculations.total.toLocaleString()}
                      </span>
                    </div>
                    {calculations.ongoingTotal > 0 && (
                      <div className="border-t border-[var(--border)] pt-3">
                        <div className="flex justify-between text-sm text-[var(--muted)] mb-1">
                          <span>Ongoing (Year 1):</span>
                          <span className="font-semibold">
                            £{calculations.ongoingTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>First Year Total:</span>
                          <span className="text-[var(--accent)]">
                            £{calculations.firstYearTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client Info for Invoice */}
                  <div className="space-y-3 mb-6 border-t border-[var(--border)] pt-6">
                    <input
                      type="text"
                      placeholder="Your Name / Company"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                      value={clientInfo.name}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                      value={clientInfo.email}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] dark:bg-[var(--surface)]"
                      value={clientInfo.company}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    onClick={generateEstimate}
                    disabled={saving}
                    className="w-full rounded-lg bg-[var(--foreground)] py-3 font-bold text-[var(--accent-contrast)] transition-opacity flex items-center justify-center gap-2 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[var(--accent)]"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving & Sending...
                      </>
                    ) : (
                      <>
                        <FileText size={18} />
                        Generate & Email Estimate
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Modal/View */}
        {showInvoice && savedQuote && (
          <InvoiceView
            clientInfo={clientInfo}
            selectedPackage={selectedPackage}
            selectedFeatures={selectedFeatures}
            featureQuantities={featureQuantities}
            ongoing={ongoing}
            calculations={calculations}
            invoiceNumber={savedQuote.invoiceNumber}
            expiresAt={savedQuote.expiresAt}
            onClose={() => setShowInvoice(false)}
            onPrint={printInvoice}
          />
        )}
      </div>
    </div>
  );
}

// Invoice Component - Finnitrex Branded
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
      <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-[var(--foreground)] shadow-[0_26px_70px_rgba(23,21,17,0.14)] dark:bg-[var(--surface)] dark:shadow-none md:p-12 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
        {/* Invoice Header - Finnitrex Branding */}
        <div className="mb-8 flex items-start justify-between border-b border-[var(--border)] pb-6 print:border-gray-300">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="scale-75 origin-left print:hidden">
                <FinnitrexLogo className="w-16 h-16" textVisible={false} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[var(--foreground)] print:text-black">
                  FINNI
                  <span className="text-[var(--accent)] print:text-gray-800">
                    TREX
                  </span>
                </h1>
                <p className="text-xs text-[var(--muted)] print:text-gray-600 tracking-widest">
                  SYSTEMS ARCHITECTURE
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)] print:text-gray-600">
              Solutions Ltd
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]/80 print:text-gray-500">
              483 Green Lanes, London, N13 4BS
            </p>
            <p className="text-xs text-[var(--muted)]/80 print:text-gray-500">
              United Kingdom
            </p>
          </div>
          <div className="text-right">
            <div className="mb-1 text-xs text-[var(--muted)] print:text-gray-600">
              ESTIMATE #
            </div>
            <div className="text-xl font-bold text-[var(--foreground)] print:text-black">
              {invoiceNumber}
            </div>
            <div className="mb-1 mt-4 text-xs text-[var(--muted)] print:text-gray-600">
              DATE
            </div>
            <div className="text-[var(--foreground)] print:text-black">
              {invoiceDate}
            </div>
            <div className="mb-1 mt-4 flex items-center justify-end gap-1 text-xs text-[var(--accent)] print:text-gray-700">
              <Calendar size={12} />
              VALID UNTIL
            </div>
            <div className="text-sm font-semibold text-[var(--accent)] print:text-black">
              {expiryDate}
            </div>
            <div className="mt-3 rounded-full border border-[color:rgba(91,143,61,0.18)] bg-[color:rgba(91,143,61,0.08)] px-3 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] print:border-gray-300 print:bg-gray-100 print:text-gray-700">
              Provisional Quote
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="mb-2 font-bold text-[var(--foreground)] print:text-black">
            Bill To:
          </h3>
          <p className="text-[var(--foreground)] print:text-gray-700">{clientInfo.name}</p>
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

        {/* Items Table */}
        <div className="mb-8 rounded-lg border border-[var(--border)] bg-[color:rgba(246,242,233,0.55)] p-6 print:border-gray-300 print:bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] print:border-gray-300">
                <th className="py-3 text-left text-sm font-bold text-[var(--muted)] print:text-black">
                  Description
                </th>
                <th className="py-3 text-right text-sm font-bold text-[var(--muted)] print:text-black">
                  Qty
                </th>
                <th className="py-3 text-right text-sm font-bold text-[var(--muted)] print:text-black">
                  Unit Price
                </th>
                <th className="py-3 text-right text-sm font-bold text-[var(--muted)] print:text-black">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPackage && (
                <tr className="border-b border-[var(--border)] print:border-gray-200">
                  <td className="py-3 font-semibold text-[var(--foreground)] print:text-black">
                    {basePackages[selectedPackage].name}
                  </td>
                  <td className="text-right text-[var(--foreground)] print:text-black">
                    1
                  </td>
                  <td className="text-right text-[var(--foreground)] print:text-black">
                    £{calculations.baseTotal.toLocaleString()}
                  </td>
                  <td className="text-right font-bold text-[var(--accent)] print:text-black">
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
                      className="border-b border-[var(--border)] print:border-gray-200"
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
                      className="border-b border-[var(--border)] print:border-gray-200"
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

        {/* Totals */}
          <div className="mb-8 ml-auto w-64 space-y-2">
          <div className="flex justify-between text-sm text-[var(--muted)] print:text-gray-700">
            <span>Subtotal:</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)] print:text-gray-700">
            <span>VAT (20%):</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.vat.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t-2 border-[var(--foreground)] pt-2 text-lg font-bold print:border-gray-300">
            <span className="text-[var(--foreground)] print:text-black">Total:</span>
            <span className="text-[var(--foreground)] print:text-black">
              £{calculations.total.toLocaleString()}
            </span>
          </div>
          {calculations.ongoingTotal > 0 && (
            <>
              <div className="flex justify-between pt-2 text-sm text-[var(--muted)] print:text-gray-600">
                <span>Ongoing (Year 1):</span>
                <span>
                  £{calculations.ongoingTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[var(--accent)] print:text-emerald-600">
                <span>First Year Total:</span>
                <span>
                  £{calculations.firstYearTotal.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Payment Details - Finnitrex Style */}
        <div className="mb-6 rounded-lg border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] p-6 print:border-gray-300 print:bg-gray-100">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--accent)] print:text-lime-600">
            Payment Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="mb-1 text-xs text-[var(--muted)] print:text-gray-600">
                Bank:
              </div>
              <div className="font-bold text-[var(--foreground)] print:text-black">
                Barclays UK
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-[var(--muted)] print:text-gray-600">
                Sort Code:
              </div>
              <div className="font-bold text-[var(--foreground)] print:text-black">
                20-00-00
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-[var(--muted)] print:text-gray-600">
                Account Number:
              </div>
              <div className="font-bold text-[var(--foreground)] print:text-black">
                87654321
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs font-bold text-[var(--accent)] print:text-lime-600">
                Reference:
              </div>
              <div className="text-base font-bold text-[var(--accent)] print:text-lime-600">
                {invoiceNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Expiration Notice */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] p-4 print:border-emerald-300 print:bg-emerald-50">
          <Calendar
            className="mt-0.5 shrink-0 text-[var(--accent)] print:text-emerald-600"
            size={18}
          />
          <div>
            <p className="mb-1 text-sm font-bold text-[var(--accent)] print:text-emerald-600">
              Quote Valid for 30 Days
            </p>
            <p className="text-xs text-[var(--muted)] print:text-gray-700">
              This quote expires on{" "}
              <strong className="text-[var(--accent)] print:text-emerald-700">
                {expiryDate}
              </strong>
              . Payment terms: 50% deposit required to begin work.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--muted)] print:border-gray-300 print:text-gray-600">
          <p>Thank you for your business.</p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a
              href="mailto:info@finnitrex.com"
              className="text-[var(--accent)] print:text-lime-600 hover:underline"
            >
              info@finnitrex.com
            </a>{" "}
            or{" "}
            <strong className="text-[var(--accent)] print:text-lime-600">
              +44 7521 511800
            </strong>
          </p>
          <p className="mt-2 text-[var(--muted)] print:text-gray-500">
            © {new Date().getFullYear()} Finnitrex Solutions Ltd. All rights
            reserved.
          </p>
        </div>

        {/* Success Message */}
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] p-4 print:hidden">
          <CheckCircle2 className="shrink-0 text-[var(--accent)]" size={20} />
          <div>
            <p className="text-sm font-bold text-[var(--accent)]">
              Invoice emailed successfully!
            </p>
            <p className="text-xs text-[var(--muted)]">
              Check your inbox for the detailed invoice with payment
              instructions.
            </p>
          </div>
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="mt-8 flex gap-4 print:hidden">
            <button
              onClick={onPrint}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] py-3 font-bold text-[var(--accent-contrast)] transition-opacity hover:opacity-90 dark:bg-[var(--accent)]"
            >
              <Download size={18} />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-[var(--border)] px-6 py-3 transition-colors hover:bg-[var(--surface)]"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
}
