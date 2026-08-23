import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'PAYLOAD_VALIDATION_FAILED: MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Fallback sandbox simulation if backend URL is not configured
    if (!BACKEND_URL) {
      console.log('\n--- CONNECTED_SOCKET_CONTACT_TRACER (SANDBOX_STUB) ---');
      console.log(`SENDER:    ${name} <${email}>`);
      console.log(`SUBJECT:   ${subject}`);
      console.log(`PAYLOAD:   ${message}`);
      console.log('------------------------------------------------------\n');
      return NextResponse.json({
        success: true,
        message: 'TRANSMISSION_RECEIVED_BY_SANDBOX_STUB',
      });
    }

    // Forward to FastAPI backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/v1/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: 'SOCKET_TRANSMISSION_ERROR_500' },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json({
      success: data.success ?? true,
      message: 'TRANSMISSION_FORWARDED_TO_BACKEND',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'SOCKET_TRANSMISSION_ERROR_500' },
      { status: 500 }
    );
  }
}
