import React from "react";
import WorkShopClient from "../components/WorkShopClient";
import { cookies } from "next/headers";
import { userAuth } from "@/middleware/userAuth";
import { prisma } from "@/lib/prisma";

const Page = async () => {
  const cookieStore = cookies();
  const user = await userAuth({ cookies: cookieStore });

  if (!user?.user?.id) {
    return <div>Unauthorized</div>;
  }

  // ✅ Fetch all service centers
  const centers = await prisma.serviceCenter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <WorkShopClient centers={centers} />
    </div>
  );
};

export default Page;
