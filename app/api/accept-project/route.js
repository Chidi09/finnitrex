import { SendMailClient } from "zeptomail";
import { NextResponse } from "next/server";
import { generateAcceptanceEmail } from "@/lib/emailTemplates";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

export async function POST(request) {
  try {
    const client = new SendMailClient({ url, token });
    const body = await request.json();

    const {
      clientName,
      clientEmail,
      projectType,
      depositAmount,
      projectId,
    } = body;

    if (!clientEmail) {
      return NextResponse.json(
        { error: "Client email required" },
        { status: 400 }
      );
    }

    const finalId =
      projectId || `FNX-${Math.floor(Math.random() * 9000) + 1000}`;

    const htmlContent = generateAcceptanceEmail(
      clientName || "Client",
      projectType || "Custom Project",
      finalId,
      depositAmount || "£500.00"
    );

    await client.sendMail({
      from: {
        address: process.env.EMAIL_FROM || "noreply@finnitrex.com",
        name: "Finnitrex Admin",
      },
      to: [
        {
          email_address: {
            address: clientEmail,
            name: clientName,
          },
        },
      ],
      subject: `[UPDATE] Project Request Accepted: ${
        projectType || "Custom Project"
      }`,
      htmlbody: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Acceptance email sent",
      projectId: finalId,
    });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send acceptance" },
      { status: 500 }
    );
  }
}

