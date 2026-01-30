import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function POST(request) {
  try {
    const { invoiceNumber, status } = await request.json();

    if (!invoiceNumber || !status) {
      return NextResponse.json(
        { error: "Invoice number and status are required" },
        { status: 400 }
      );
    }

    await db.updateQuoteStatus(invoiceNumber, status);

    return NextResponse.json({ success: true, message: "Quote status updated" });
  } catch (error) {
    console.error("Quote Status Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update quote status" },
      { status: 500 }
    );
  }
}
