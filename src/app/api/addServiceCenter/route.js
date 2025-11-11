import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";

export async function POST(req) {
  try {
    const user = await userAuth(req);
    if (!user?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, address, phone } = await req.json();

    if (!name || !address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 }
      );
    }
    if (phone && !/^[0-9]{10}$/.test(phone)) {
        return NextResponse.json(
          { error: "Phone number must be a valid 10-digit number" },
          { status: 400 }
        );
      }

    const newCenter = await prisma.serviceCenter.create({
      data: { name, address, phone },
    });

    return NextResponse.json(
      { message: "Service center added successfully", center: newCenter },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding service center:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
