import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { SendMailClient } from "zeptomail";
import { generateAcceptanceEmail } from "@/lib/emailTemplates";

const url = "https://api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

export async function POST(request) {
  const { reqId, deposit } = await request.json();

  const reqData = await db.getRequestById(reqId);
  if (!reqData) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  const newProject = await db.createProject(reqData, deposit);

  const client = new SendMailClient({ url, token });

  const bankDetails = {
    bank: process.env.BANK_NAME,
    sort: process.env.BANK_SORT,
    acc: process.env.BANK_ACC,
  };

  const html = generateAcceptanceEmail(
    newProject.clientName,
    newProject.projectType,
    newProject.id,
    deposit,
    bankDetails
  );

  await client.sendMail({
    from: {
      address: process.env.EMAIL_FROM || "noreply@finnitrex.com",
      name: "Finnitrex Admin",
    },
    to: [
      {
        email_address: {
          address: newProject.clientEmail,
          name: newProject.clientName,
        },
      },
    ],
    subject: `Project Initialized: ${newProject.projectType}`,
    htmlbody: html,
  });

  return NextResponse.json({ success: true, projectId: newProject.id });
}

