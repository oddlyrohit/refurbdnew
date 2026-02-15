import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [revenueAgg, totalOrders, ordersByStatus, topProductsRaw] =
    await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { total: true },
      }),
      prisma.order.count(),
      prisma.order.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      prisma.orderItem.groupBy({
        by: ["productTitle"],
        _sum: { quantity: true, lineTotal: true },
        orderBy: { _sum: { lineTotal: "desc" } },
        take: 10,
      }),
    ]);

  const totalRevenue = Number(revenueAgg._sum.total || 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusData = ordersByStatus.map((item) => ({
    status: item.status,
    count: item._count.id,
  }));

  const topProducts = topProductsRaw.map((item) => ({
    title: item.productTitle,
    sold: item._sum.quantity || 0,
    revenue: Number(item._sum.lineTotal || 0),
  }));

  return NextResponse.json({
    totalRevenue,
    totalOrders,
    averageOrderValue,
    topProducts,
    ordersByStatus: statusData,
    revenueByMonth: [],
  });
}
