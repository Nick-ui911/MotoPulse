import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const user = await userAuth(req);
    if (!user?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ await params to avoid Next.js warning
    const { bikeId } = await context.params;
    const id = Number(bikeId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });
    }

    const services = await prisma.service.findMany({
      where: {
        bikeId: id,
        bike: { userId: user.user.id },
      },
      include: {
        bike: true,
        serviceCenter: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!services.length) {
      return NextResponse.json([], { status: 200 }); // ✅ return empty array instead of 404
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching specific bike services:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
