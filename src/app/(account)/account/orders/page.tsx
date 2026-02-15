import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/formatters";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" | "danger" | "neutral" }> = {
  PENDING: { label: "Pending", variant: "warning" },
  CONFIRMED: { label: "Confirmed", variant: "info" },
  PROCESSING: { label: "Processing", variant: "info" },
  SHIPPED: { label: "Shipped", variant: "success" },
  DELIVERED: { label: "Delivered", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "danger" },
  REFUNDED: { label: "Refunded", variant: "neutral" },
};

export default async function OrdersPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Orders</h1>
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12" />}
          title="No orders yet"
          description="When you place an order, it will appear here."
          actionLabel="Start Shopping"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">My Orders</h1>
      <p className="mt-1 text-neutral-500">
        Track and manage your orders.
      </p>

      <div className="mt-6 space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.PENDING;
          return (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block rounded-xl border border-neutral-200 bg-white p-5 hover:border-primary-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 font-mono text-sm">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(Number(order.total))}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
