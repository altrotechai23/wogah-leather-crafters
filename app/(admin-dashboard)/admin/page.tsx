import { prisma } from "@/lib/prisma";
import DashboardCards from "@/components/admin/dashboard-cards";

export default async function AdminPage() {
  const [
    totalProducts,
    publishedProducts,
    totalOrders,
    pendingOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({
      where: {
        published: true,
      },
    }),
    prisma.order.count(),
    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),
  ]);

  return (
    <DashboardCards
      totalProducts={totalProducts}
      publishedProducts={publishedProducts}
      totalOrders={totalOrders}
      pendingOrders={pendingOrders}
    />
  );
}