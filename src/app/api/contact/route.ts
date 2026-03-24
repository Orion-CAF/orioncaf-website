import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Email service not configured." }, { status: 503 });
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "OrionCAF Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}
