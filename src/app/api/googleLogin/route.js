import { adminAuth } from "@/lib/firebaseAdmin";
import { signJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { idToken } = await req.json();


    // ✅ Verify ID Token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email) {
      return new Response("Invalid token", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { bikes: true }, // ✅ include related bikes
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // 🎟️ Generate your app's JWT

    const token = signJwt({ email: user.email });


    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      path: "/",
    });

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
