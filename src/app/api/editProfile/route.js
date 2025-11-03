import { NextResponse } from "next/server";
import { userAuth } from "@/middleware/userAuth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
  try {
    const user = await userAuth(req);

    const body = await req.json();
    const { name, email, phone, PhotoUrl } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        PhotoUrl,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", data: { user: updatedUser } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile", error: error.message },
      { status: 500 }
    );
  }
}
