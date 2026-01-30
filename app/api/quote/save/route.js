import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { SendMailClient } from "zeptomail";
import { generateInvoiceEmail } from "@/lib/emailTemplates";
import { basePackages, features, ongoingCosts } from "@/lib/pricingConfig";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

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
      ongoingCosts,
      calculations,
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

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    // Build feature names and prices for email template
    const featureNames = {};
    const featurePrices = {};
    Object.entries(selectedFeatures || {}).forEach(([key, enabled]) => {
      if (enabled && features[key]) {
        featureNames[key] = features[key].name;
        featurePrices[key] = features[key].price;
      }
    });

    const ongoingCostNames = {};
    const ongoingCostPrices = {};
    Object.entries(ongoingCosts || {}).forEach(([key, enabled]) => {
      if (enabled && ongoingCosts[key]) {
        ongoingCostNames[key] = ongoingCosts[key].name;
        ongoingCostPrices[key] = ongoingCosts[key].price;
      }
    });

    // Calculate discount amounts
    const discountPercentage = discountType === "percentage" ? parseFloat(discountValue || 0) : 0;
    const discountAmountValue = discountType === "amount" ? parseFloat(discountValue || 0) : 
                                discountType === "offer" ? parseFloat(calculations.discountAmount || 0) : 0;
    const finalTotal = calculations.total;

    // Save quote to database
    const quoteData = {
      invoiceNumber,
      clientName,
      clientEmail,
      clientCompany: clientCompany || null,
      basePackage: selectedPackage,
      selectedFeatures: selectedFeatures || {},
      featureQuantities: featureQuantities || {},
      ongoingCosts: ongoingCosts || {},
      baseTotal: calculations.baseTotal,
      featuresTotal: calculations.featuresTotal,
      subtotal: calculations.subtotal,
      vat: calculations.vat,
      total: calculations.total,
      ongoingTotal: calculations.ongoingTotal,
      firstYearTotal: calculations.firstYearTotal,
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
