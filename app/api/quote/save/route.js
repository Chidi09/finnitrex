import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { SendMailClient } from "zeptomail";
import { generateInvoiceEmail } from "@/lib/emailTemplates";
import { basePackages, features, ongoingCosts as ongoingCostsConfig } from "@/lib/pricingConfig";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

// Helper function to round currency values to 2 decimal places
function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientCompany,
      selectedPackage,
      selectedFeatures,
      featureQuantities,
      ongoingCosts: ongoingCostsSelected, // Renamed to avoid conflict with import
      discountType,
      discountValue,
      offerAmount,
      offerStatus,
    } = body;

    if (!clientName || !clientEmail) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Recalculate all pricing on server-side
    // DO NOT trust calculations from client - they can be tampered with
    
    // 1. Recalculate Base Package Price
    const baseTotal = basePackages[selectedPackage]?.basePrice || 0;

    // 2. Recalculate Features Total
    let featuresTotal = 0;
    const featureNames = {};
    const featurePrices = {};
    Object.entries(selectedFeatures || {}).forEach(([key, enabled]) => {
      if (enabled && features[key]) {
        const qty = featureQuantities?.[key] || 1;
        const featurePrice = features[key].price * qty;
        featuresTotal += featurePrice;
        featureNames[key] = features[key].name;
        featurePrices[key] = features[key].price;
      }
    });

    // 3. Recalculate Ongoing Costs Total
    let ongoingTotal = 0;
    const ongoingCostNames = {};
    const ongoingCostPrices = {};
    Object.entries(ongoingCostsSelected || {}).forEach(([key, enabled]) => {
      if (enabled && ongoingCostsConfig[key]) {
        ongoingTotal += ongoingCostsConfig[key].price;
        ongoingCostNames[key] = ongoingCostsConfig[key].name;
        ongoingCostPrices[key] = ongoingCostsConfig[key].price;
      }
    });

    // 4. Recalculate Subtotal, VAT, and Total
    const subtotal = roundCurrency(baseTotal + featuresTotal);
    const vat = roundCurrency(subtotal * 0.20);
    const total = roundCurrency(subtotal + vat);
    const firstYearTotal = roundCurrency(total + ongoingTotal);

    // 5. Calculate discount amounts (server-side validation)
    const discountPercentage = discountType === "percentage" ? parseFloat(discountValue || 0) : 0;
    let discountAmountValue = 0;
    
    if (discountType === "amount") {
      discountAmountValue = roundCurrency(parseFloat(discountValue || 0));
    } else if (discountType === "offer" && offerAmount) {
      // Calculate discount from offer amount
      discountAmountValue = roundCurrency(total - parseFloat(offerAmount || 0));
    } else if (discountType === "percentage") {
      discountAmountValue = roundCurrency(total * (discountPercentage / 100));
    }

    // 6. Calculate final total after discount
    const finalTotal = roundCurrency(Math.max(0, total - discountAmountValue));

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    // Save quote to database with SERVER-CALCULATED values
    const quoteData = {
      invoiceNumber,
      clientName,
      clientEmail,
      clientCompany: clientCompany || null,
      basePackage: selectedPackage,
      selectedFeatures: selectedFeatures || {},
      featureQuantities: featureQuantities || {},
      ongoingCosts: ongoingCostsSelected || {},
      baseTotal,
      featuresTotal,
      subtotal,
      vat,
      total,
      ongoingTotal,
      firstYearTotal,
      discountPercentage,
      discountAmount: discountAmountValue,
      finalTotal,
      // Add feature details for email template
      featureNames,
      featurePrices,
      ongoingCostNames,
      ongoingCostPrices,
    };

    const savedQuote = await db.saveQuote(quoteData);

    // Send invoice email
    const client = new SendMailClient({ url, token });
    const emailHtml = generateInvoiceEmail(quoteData, invoiceNumber, expiresAt);

    await client.sendMail({
      from: {
        address: process.env.EMAIL_FROM || "noreply@finnitrex.com",
        name: "Finnitrex Solutions",
      },
      to: [
        {
          email_address: {
            address: clientEmail,
            name: clientName,
          },
        },
      ],
      subject: `Your Quote from Finnitrex - ${invoiceNumber}`,
      htmlbody: emailHtml,
    });

    return NextResponse.json({
      success: true,
      invoiceNumber,
      quoteId: savedQuote.id,
      expiresAt: expiresAt.toISOString(),
      message: "Quote saved and invoice emailed successfully",
    });
  } catch (error) {
    console.error("Quote Save Error:", error);
    return NextResponse.json(
      {
        error: "Failed to save quote",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
