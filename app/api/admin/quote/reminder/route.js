import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { SendMailClient } from "zeptomail";
import { generateInvoiceEmail } from "@/lib/emailTemplates";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

export async function POST(request) {
  try {
    const { invoiceNumber } = await request.json();

    if (!invoiceNumber) {
      return NextResponse.json(
        { error: "Invoice number is required" },
        { status: 400 }
      );
    }

    const quote = await db.getQuote(invoiceNumber);
    if (!quote) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    // Check if quote is expiring soon
    const expiresAt = new Date(quote.expires_at);
    const daysUntilExpiry = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      return NextResponse.json(
        { error: "Quote has already expired" },
        { status: 400 }
      );
    }

    // Reconstruct quote data for email
    const quoteData = {
      clientName: quote.client_name,
      clientEmail: quote.client_email,
      clientCompany: quote.client_company,
      basePackage: quote.base_package,
      selectedFeatures: typeof quote.selected_features === 'string' 
        ? JSON.parse(quote.selected_features) 
        : quote.selected_features,
      featureQuantities: typeof quote.feature_quantities === 'string'
        ? JSON.parse(quote.feature_quantities)
        : quote.feature_quantities,
      ongoingCosts: typeof quote.ongoing_costs === 'string'
        ? JSON.parse(quote.ongoing_costs)
        : quote.ongoing_costs,
      baseTotal: parseFloat(quote.base_total),
      featuresTotal: parseFloat(quote.features_total),
      subtotal: parseFloat(quote.subtotal),
      vat: parseFloat(quote.vat),
      total: parseFloat(quote.total),
      ongoingTotal: parseFloat(quote.ongoing_total || 0),
      firstYearTotal: parseFloat(quote.first_year_total || quote.total),
    };

    // Get feature names and prices for email
    const { features, ongoingCosts: ongoing } = await import("@/lib/pricingConfig");
    const featureNames = {};
    const featurePrices = {};
    Object.entries(quoteData.selectedFeatures || {}).forEach(([key, enabled]) => {
      if (enabled && features[key]) {
        featureNames[key] = features[key].name;
        featurePrices[key] = features[key].price;
      }
    });

    const ongoingCostNames = {};
    const ongoingCostPrices = {};
    Object.entries(quoteData.ongoingCosts || {}).forEach(([key, enabled]) => {
      if (enabled && ongoing[key]) {
        ongoingCostNames[key] = ongoing[key].name;
        ongoingCostPrices[key] = ongoing[key].price;
      }
    });

    quoteData.featureNames = featureNames;
    quoteData.featurePrices = featurePrices;
    quoteData.ongoingCostNames = ongoingCostNames;
    quoteData.ongoingCostPrices = ongoingCostPrices;

    // Send reminder email
    const client = new SendMailClient({ url, token });
    const emailHtml = generateInvoiceEmail(quoteData, invoiceNumber, quote.expires_at);

    await client.sendMail({
      from: {
        address: process.env.EMAIL_FROM || "noreply@finnitrex.com",
        name: "Finnitrex Solutions",
      },
      to: [
        {
          email_address: {
            address: quote.client_email,
            name: quote.client_name,
          },
        },
      ],
      subject: `Reminder: Your Quote ${invoiceNumber} Expires in ${daysUntilExpiry} Days`,
      htmlbody: emailHtml.replace(
        'Thank you for your interest in Finnitrex Solutions.',
        `This is a reminder that your quote expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}. Please review the details below and contact us if you have any questions.`
      ),
    });

    return NextResponse.json({ 
      success: true, 
      message: `Reminder email sent. Quote expires in ${daysUntilExpiry} days.` 
    });
  } catch (error) {
    console.error("Reminder Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send reminder email" },
      { status: 500 }
    );
  }
}
