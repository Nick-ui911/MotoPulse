// app/dashboard/services/page.js
import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middleware/userAuth";
import { cookies } from "next/headers";
import ServicesClient from "../components/ServicesClient";

export default async function ServicesPage() {
  // Get cookies from the current request
  const cookieStore = cookies();

  // Pass cookies to your userAuth middleware
  const user = await userAuth({ cookies: cookieStore });

  if (!user?.user?.id) {
    return <div>Unauthorized</div>;
  }

  // Fetch user’s bike services
  const services = await prisma.service.findMany({
    where: {
      bike: { userId: user.user.id },
    },
    include: {
      bike: true,
    },
    orderBy: { serviceDate: "desc" },
  });

  return <ServicesClient services={services} />;
}

