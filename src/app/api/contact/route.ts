import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with placeholder/env key
// IMPORTANT: User must set RESEND_API_KEY in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_xyz');

export async function POST(request: Request) {
  try {
    const { name, email, product, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: 'OrionCAF Contact Form <contact@orioncaf.com>',
        to: ['info@orioncaf.com'],
        subject: `[OrionCAF Web] New Lead from ${name}`,
        html: `
          <h3>New Project Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>R&D Focus / Product:</strong> ${product || 'Not Specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
      return NextResponse.json({ success: true, data });
    } 

    // Simulate success if no API key is set yet (for testing UI)
    await new Promise(r => setTimeout(r, 1000));
    return NextResponse.json({ success: true, message: "Placeholder response since RESEND_API_KEY is missing." });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
