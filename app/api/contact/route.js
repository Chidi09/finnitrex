import { SendMailClient } from "zeptomail";
import { NextResponse } from "next/server";

// Initialize Client with your specific credentials
const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

export async function POST(request) {
  try {
    const client = new SendMailClient({ url, token });
    
    // Parse the incoming data
    const body = await request.json();
    const { name, email, service, message } = body;

    // Basic Validation
    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Determine Subject Line based on the source (Wizard vs Terminal)
    const subjectLine = service.startsWith("WIZARD") 
      ? `[PROJECT INITIATION] ${name} - ${service}`
      : `[NEW INQUIRY] ${service}: ${name}`;

    // Send the email via ZeptoMail
    await client.sendMail({
      from: {
        address: process.env.EMAIL_FROM || "noreply@finnitrex.com",
        name: "Finnitrex System",
      },
      to: [
        {
          email_address: {
            address: process.env.EMAIL_TO || "info@finnitrex.com",
            name: "Finnitrex Admin",
          },
        },
      ],
      reply_to: [
        {
          address: email,
          name: name,
        },
      ],
      subject: subjectLine,
      htmlbody: `
        <div style="font-family: monospace; background: #000; color: #bef264; padding: 20px; border: 1px solid #333;">
          <h1 style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px;">INCOMING SIGNAL</h1>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong style="color: #fff;">CLIENT:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #fff;">RETURN ADDRESS:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong style="color: #fff;">PROTOCOL:</strong> ${service}</p>
          </div>

          <div style="background: #111; padding: 15px; border: 1px solid #333; color: #ddd; white-space: pre-wrap;">
            ${message}
          </div>
          
          <div style="margin-top: 20px; font-size: 10px; color: #555;">
            SECURE TRANSMISSION VIA FINNITREX.SYS
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Transmission Successful" });
  } catch (error) {
    console.error("ZeptoMail Error:", error);
    return NextResponse.json({ error: "Transmission Failed" }, { status: 500 });
  }
}
