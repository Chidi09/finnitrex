import { SendMailClient } from "zeptomail";
import { NextResponse } from "next/server";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

export async function POST(request) {
  try {
    const client = new SendMailClient({ url, token });
    const body = await request.json();
    const { name, email, service, message } = body;

    // Validate inputs briefly
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send via ZeptoMail
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
      subject: `[NEW LEAD] ${service}: ${name}`,
      htmlbody: `
        <div style="font-family: monospace; background: #000; color: #0f0; padding: 20px;">
          <h1>New Service Inquiry</h1>
          <hr style="border: 1px solid #333;" />
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Contact:</strong> ${email}</p>
          <p><strong>Service Sector:</strong> ${service}</p>
          <br/>
          <p><strong>Message Packet:</strong></p>
          <pre style="background: #111; padding: 10px; border: 1px solid #333; color: #fff;">${message}</pre>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Transmission Successful" });
  } catch (error) {
    console.error("ZeptoMail Error:", error);
    return NextResponse.json({ error: "Transmission Failed" }, { status: 500 });
  }
}
