import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '../../../content/site';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

// Best-effort, in-memory, per-instance rate limit. Resets on cold start —
// acceptable for a low-traffic personal site with no external infra.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message, company } = body;

    // Honeypot: bots fill every field, real users leave it blank.
    if (typeof company === 'string' && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !isValidEmail(email) ||
      typeof message !== 'string' ||
      message.trim().length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json({ error: 'Please check your name, email, and message.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      // Fail visibly rather than pretending the email sent.
      return NextResponse.json({ unconfigured: true }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${SITE.name} portfolio <onboarding@resend.dev>`,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
