import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";

export async function POST(request) {
  try {
    // Authenticate user
    const authResult = await userAuth();
    if (authResult.error) {
      return authResult.response;
    }

    const { user } = authResult;

    // Parse request body
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";

    // Validate password
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already has a password
    if (user.password) {
      return NextResponse.json(
        { error: "User already has a password. Use change password instead." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        PhotoUrl: true,
        createdAt: true,
        password: true, // Include password field to indicate user has password
        bikes: true, // Include bikes to match the expected user structure
      },
    });

    return NextResponse.json(
      {
        message: "Password added successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
