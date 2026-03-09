import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BOOKING_EMAIL } from "@/data/units";

export async function POST(req: NextRequest) {
  const { name, email, unit, checkIn, checkOut, message } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return NextResponse.json(
      { error: "Email sending is not configured yet. Please email the owner directly." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const unitLine = unit && unit !== "Not specified" ? `Unit: ${unit}` : null;
  const checkInLine = checkIn && checkIn !== "Not specified" ? `Check-in: ${checkIn}` : null;
  const checkOutLine = checkOut && checkOut !== "Not specified" ? `Check-out: ${checkOut}` : null;
  const datePart = [unitLine, checkInLine, checkOutLine].filter(Boolean).join("\n");

  const text = [
    `From: ${name} <${email}>`,
    "",
    datePart,
    datePart ? "" : null,
    message?.trim() || "(no message)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const subject = unit && unit !== "Not specified"
    ? `Inquiry – Unit ${unit} | Kiahuna Condos`
    : `Inquiry – Kiahuna Condos`;

  await transporter.sendMail({
    from: `"Kiahuna Condos Website" <${gmailUser}>`,
    replyTo: `"${name}" <${email}>`,
    to: BOOKING_EMAIL,
    subject,
    text,
  });

  return NextResponse.json({ ok: true });
}
