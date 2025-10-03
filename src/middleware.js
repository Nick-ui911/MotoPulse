import { NextResponse } from "next/server";
import * as jose from "jose";


/**
 * ⚠️ IMPORTANT:
 * Next.js middleware runs in the Edge runtime (not Node.js).
 * The "jsonwebtoken" library depends on Node's crypto, which is NOT supported here.
 * That's why we use the "jose" library instead.
 * 
 * If you switch back to "jsonwebtoken", you'll get:
 * "The edge runtime does not support Node.js 'crypto' module."
 */

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgotPassword") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico)$/i)
  ) {
    return NextResponse.next();
  }

  // If no token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
