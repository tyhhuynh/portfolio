import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const { name, email, message } = await request.json();

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'fill in all fields' },
        { status: 400 }
      );
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'invalid email format' },
        { status: 400 }
      );
    }

    // send email
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@tyhh.dev>',
      to: [process.env.CONTACT_EMAIL!],
      subject: `PORTFOLIO: Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p> 
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
      // <strong>?
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'message sent successfully!', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}