import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await userAuth(req);
    if (!user?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      bikeId,
      serviceDate,
      odometerReading,
      remarks,
      serviceCenter,
      items,
    } = await req.json();

    // Convert to integers
    const parsedBikeId = parseInt(bikeId);
    const parsedOdometerReading = odometerReading
      ? parseInt(odometerReading)
      : null;

    // Validation
    if (!parsedBikeId || !serviceDate || !serviceCenter?.name) {
      return NextResponse.json(
        { error: "bikeId, serviceDate, and service center name are required" },
        { status: 400 }
      );
    }

    // Verify bike belongs to user
    const bike = await prisma.bike.findFirst({
      where: { id: parsedBikeId, userId: user.user.id },
    });

    if (!bike) {
      return NextResponse.json({ error: "Bike not found" }, { status: 404 });
    }

    // ✅ Check for existing center where BOTH name and address match (case-insensitive)
    let existingCenter = await prisma.serviceCenter.findFirst({
      where: {
        name: {
          equals: serviceCenter.name,
          mode: "insensitive",
        },
        address: {
          equals: serviceCenter.address,
          mode: "insensitive",
        },
      },
    });

    // If not found, create new one
    if (!existingCenter) {
      existingCenter = await prisma.serviceCenter.create({
        data: {
          name: serviceCenter.name,
          address: serviceCenter.address,
          phone: serviceCenter.phone,
        },
      });
    }

    // Create service with centerId
    const newService = await prisma.service.create({
      data: {
        bikeId: parsedBikeId,
        centerId: existingCenter.id,
        serviceDate: new Date(serviceDate),
        odometerReading: parsedOdometerReading,
        remarks,
        items: {
          create:
            items?.map((item) => ({
              itemName: item.itemName,
              cost: item.cost || 0,
            })) || [],
        },
      },
      include: {
        serviceCenter: true,
        items: true,
        bike: true,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error creating service with center:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
