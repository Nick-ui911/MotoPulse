import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await userAuth(req);
    const userId = user?.user?.id;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bikes = await prisma.bike.findMany({
      where: { userId },
    });
    return NextResponse.json(bikes, { status: 200 });
  } catch (error) {
    console.error("Error fetching bikes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
