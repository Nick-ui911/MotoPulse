import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { idToken,PhotoUrl } = await req.json();

    const decoded = await adminAuth.verifyIdToken(idToken);
    const email = decoded?.email;
    const name = decoded?.name || decoded?.displayName || "Google User";

    if (!email) {
      return new Response("Invalid token", { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
      }
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: null,
          phone: null,
          PhotoUrl: PhotoUrl,
        },
      });
     
    

    const token = signJwt({ email: user.email });
    const response = NextResponse.json(
      { user, token },
      { status: 200 }
    );
    const cookieStore = cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Google signup error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
