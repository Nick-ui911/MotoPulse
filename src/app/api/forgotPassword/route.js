import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import transporter from "@/lib/nodemailerConfig";
import { WEB_URL } from "@/constants/apiUrl";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Generate reset token (use a separate secret)
  const token = jwt.sign(
    { email },
    process.env.JWT_RESET_SECRET, // ✅ different from login secret
    { expiresIn: "15m" }
  );

  const resetLink = `${WEB_URL}/reset-password?token=${token}`;

  const htmlTemplate = `
    <div style="font-family: Arial; padding: 20px; background: #f9f9f9;">
      <h2>Password Reset Request</h2>
      <p>Click the button below to reset your password. This link is valid for 15 minutes.</p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_ADMIN}>`,
    to: email,
    subject: "Password Reset",
    html: htmlTemplate,
  });

  return NextResponse.json({ message: "Password reset link sent to your email" });
}
