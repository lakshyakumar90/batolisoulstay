import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Create transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Query from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message}</p>`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export function PATCH() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
