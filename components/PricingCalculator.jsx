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
  Mail,
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

  const generateInvoice = async () => {
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
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-lime-400" size={40} />
            Project Pricing Calculator
          </h1>
          <p className="text-gray-400 text-lg">
            Select your package and features. Get an instant quote with a
            professional invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-lime-400">
                1. Select Base Package
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(basePackages).map(([key, pkg]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPackage(key)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      selectedPackage === key
                        ? "border-lime-500 bg-lime-900/20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      {selectedPackage === key && (
                        <Check className="text-lime-400" size={24} />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {pkg.description}
                    </p>
                    <div className="text-lime-400 font-bold text-lg">
                      £{pkg.minPrice.toLocaleString()} - £
                      {pkg.maxPrice.toLocaleString()}
                    </div>
                    <ul className="mt-4 space-y-1 text-xs text-gray-500">
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
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-lime-400">
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
                            ? "border-lime-500 bg-lime-900/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleFeature(key)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-lime-500 bg-lime-500"
                                  : "border-gray-600"
                              }`}
                            >
                              {isSelected && (
                                <Check size={16} className="text-black" />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="font-semibold">
                                {feature.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                £{feature.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          {isSelected && needsQuantity && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(key, -1)}
                                className="w-8 h-8 rounded border border-gray-600 flex items-center justify-center hover:bg-gray-800"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-mono">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(key, 1)}
                                className="w-8 h-8 rounded border border-gray-600 flex items-center justify-center hover:bg-gray-800"
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
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-lime-400">
                  3. Ongoing Costs (Annual)
                </h2>
                <div className="space-y-3">
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
                        <span>{cost.name}</span>
                      </div>
                      <span className="text-lime-400 font-mono">
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
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-lime-400">
                Quote Summary
              </h2>

              {!selectedPackage ? (
                <p className="text-gray-500 text-center py-8">
                  Select a package to begin
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Base Package:</span>
                      <span className="font-mono">
                        £{calculations.baseTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Features:</span>
                      <span className="font-mono">
                        £{calculations.featuresTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="font-mono">
                        £{calculations.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">VAT (20%):</span>
                      <span className="font-mono">
                        £{calculations.vat.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
                      <span>Total:</span>
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
                          <span>First Year Total:</span>
                          <span className="text-emerald-400 font-mono">
                            £{calculations.firstYearTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client Info for Invoice */}
                  <div className="space-y-3 mb-6 border-t border-gray-700 pt-6">
                    <input
                      type="text"
                      placeholder="Your Name / Company"
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white text-sm focus:border-lime-500 outline-none"
                      value={clientInfo.name}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white text-sm focus:border-lime-500 outline-none"
                      value={clientInfo.email}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white text-sm focus:border-lime-500 outline-none"
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
                    onClick={generateInvoice}
                    disabled={saving}
                    className="w-full bg-lime-500 text-black font-bold py-3 rounded-lg hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving & Sending...
                      </>
                    ) : (
                      <>
                        <FileText size={18} />
                        Generate & Email Invoice
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
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto p-6 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto bg-black border border-gray-800 rounded-2xl p-8 md:p-12 print:bg-white print:border-0 print:rounded-none print:shadow-none">
        {/* Invoice Header - Finnitrex Branding */}
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
            <p className="text-xs text-gray-500 print:text-gray-500">
              United Kingdom
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 print:text-gray-600 mb-1">
              INVOICE #
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
          {calculations.ongoingTotal > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-500 print:text-gray-600 pt-2">
                <span>Ongoing (Year 1):</span>
                <span className="font-mono">
                  £{calculations.ongoingTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 print:text-emerald-600">
                <span>First Year Total:</span>
                <span className="font-mono">
                  £{calculations.firstYearTotal.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Payment Details - Finnitrex Style */}
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

        {/* Quote Expiration Notice */}
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
              . Payment terms: 50% deposit required to begin work.
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
          <p className="mt-2 text-gray-600 print:text-gray-500">
            © {new Date().getFullYear()} Finnitrex Solutions Ltd. All rights
            reserved.
          </p>
        </div>

        {/* Success Message */}
        <div className="mt-6 bg-lime-900/20 border border-lime-500/30 p-4 rounded-lg flex items-center gap-3 print:hidden">
          <CheckCircle2 className="text-lime-400 shrink-0" size={20} />
          <div>
            <p className="text-lime-400 font-bold text-sm">
              Invoice emailed successfully!
            </p>
            <p className="text-gray-400 text-xs">
              Check your inbox for the detailed invoice with payment
              instructions.
            </p>
          </div>
        </div>

        {/* Action Buttons (hidden in print) */}
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
