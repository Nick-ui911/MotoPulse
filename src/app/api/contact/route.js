
import transporter from '@/lib/nodemailerConfig';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email to admin
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_ADMIN,
      to: process.env.EMAIL_SUPPORT,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #dc2626;">Name:</strong> ${name}</p>
            <p><strong style="color: #dc2626;">Email:</strong> ${email}</p>
            <p><strong style="color: #dc2626;">Subject:</strong> ${subject}</p>
            <p><strong style="color: #dc2626;">Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">This email was sent from your website contact form.</p>
        </div>
      `,
    };

    // Auto-reply email to user
    const mailOptionsToUser = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #dc2626;">Your Message:</strong></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Best regards,<br/>Your Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
