import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Authenticate user
    const user = await userAuth(req);
    if (!user || !user.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch all services belonging to user's bikes
    const services = await prisma.service.findMany({
      where: {
        bike: {
          userId: user.user.id,
        },
      },
      include: {
        bike: {
          select: { id: true, brand: true, model: true, registrationNo: true },
        },
        serviceCenter: {
          select: { id: true, name: true, address: true },
        },
        items: true, // include all service items
      },
      orderBy: {
        serviceDate: "desc",
      },
    });

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    );
  }
}
