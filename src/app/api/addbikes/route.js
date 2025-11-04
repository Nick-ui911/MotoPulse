import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Authentication
    const user = await userAuth(req);
    if (!user || !user.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.user.id;

    // 2. Parse and validate input
    const { brand, model, registrationNo, purchaseDate } = await req.json();

    if (!brand || !model || !registrationNo) {
      return NextResponse.json(
        { error: "Brand, model, and registration number are required" },
        { status: 400 }
      );
    }

// Strict Indian registration number validation
function isValidIndianRegistrationNo(regNo) {
    // Format: AA ## AA #### or AA ## ####
    // Examples: MP09AB1234, DL1CAB1234, MH02AB1234, UP16AT1234
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{1,4}$/;
    return pattern.test(regNo);
  }
  
  // In your API:
  const cleanRegNo = registrationNo.toUpperCase().replace(/[\s-]/g, '');
  
  if (!isValidIndianRegistrationNo(cleanRegNo)) {
    return NextResponse.json(
      { error: "Invalid registration number format. Expected format: MP09AB1234" },
      { status: 400 }
    );
  }

    // 4. Check for duplicates
    const existingBike = await prisma.bike.findFirst({
      where: {
        registrationNo: cleanRegNo,
      },
    });

    if (existingBike) {
      return NextResponse.json(
        { error: "Bike with this registration number already exists" },
        { status: 409 }
      );
    }

    // 5. Validate purchase date
    const parsedDate = purchaseDate ? new Date(purchaseDate) : null;
    if (parsedDate && parsedDate > new Date()) {
      return NextResponse.json(
        { error: "Purchase date cannot be in the future" },
        { status: 400 }
      );
    }

    // 6. Create bike
    const newBike = await prisma.bike.create({
      data: {
        userId,
        brand: brand.trim(),
        model: model.trim(),
        registrationNo: registrationNo.toUpperCase(),
        purchaseDate: parsedDate,
      },
    });

    return NextResponse.json(newBike, { status: 201 });
  } catch (error) {
    console.error("Error creating bike:", error);

    // Handle Prisma-specific errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bike with this registration number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}