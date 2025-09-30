import { NextResponse } from "next/server";
import { userAuth } from "@/middleware/userAuth";

export async function GET(req) {

  try {
    const user = await userAuth(req);
    if (!user) {
      return NextResponse.json({
        message: "User Not Found",
        data: user,
      });
    }

    return NextResponse.json({
      message: "successfully get user details",
      data: user,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 400 }
    );
  }
}
