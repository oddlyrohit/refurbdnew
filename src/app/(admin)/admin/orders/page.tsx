import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";

const statusVariant: Record<string, "success" | "warning" | "info" | "danger" | "neutral"> = {
  PENDING: "warning",
  CONFIRMED: "info",
  PROCESSING: "info",
  SHIPPED: "success",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "neutral",
};

const paymentVariant: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "danger",
  REFUNDED: "neutral",
  PARTIALLY_REFUNDED: "neutral",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
        <p className="mt-1 text-neutral-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Order</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden sm:table-cell">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden lg:table-cell">Payment</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500 hidden md:table-cell">Items</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-500">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-neutral-400">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-mono text-xs font-medium text-primary-500 hover:text-primary-600"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-neutral-900 text-sm">
                      {order.user
                        ? `${order.user.firstName || ""} ${order.user.lastName || ""}`.trim() || order.user.email
                        : order.guestEmail || "Guest"}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[order.status] || "neutral"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <Badge variant={paymentVariant[order.paymentStatus] || "neutral"}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell text-neutral-600">
                    {order.items.length}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-neutral-900">
                    {formatPrice(Number(order.total))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
