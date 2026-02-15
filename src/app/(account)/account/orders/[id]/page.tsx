import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/formatters";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" | "danger" | "neutral"; icon: typeof Package }> = {
  PENDING: { label: "Pending", variant: "warning", icon: Clock },
  CONFIRMED: { label: "Confirmed", variant: "info", icon: CheckCircle },
  PROCESSING: { label: "Processing", variant: "info", icon: Package },
  SHIPPED: { label: "Shipped", variant: "success", icon: Truck },
  DELIVERED: { label: "Delivered", variant: "success", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "danger", icon: XCircle },
  REFUNDED: { label: "Refunded", variant: "neutral", icon: XCircle },
};

const statusSteps = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: true,
      shippingAddress: true,
    },
  });

  if (!order) notFound();

  const status = statusConfig[order.status] || statusConfig.PENDING;
  const StatusIcon = status.icon;
  const isCancelled = order.status === "CANCELLED" || order.status === "REFUNDED";
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div>
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-mono">
            {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge variant={status.variant} size="md">
          <StatusIcon className="h-3.5 w-3.5 mr-1" />
          {status.label}
        </Badge>
      </div>

      {/* Status Timeline */}
      {!isCancelled && (
        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Order Progress</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => {
              const isCompleted = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? "bg-primary-500 text-white"
                          : "bg-neutral-100 text-neutral-400"
                      } ${isCurrent ? "ring-2 ring-primary-200 ring-offset-2" : ""}`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`mt-1.5 text-xs ${
                        isCompleted ? "text-primary-600 font-medium" : "text-neutral-400"
                      }`}
                    >
                      {statusConfig[step]?.label || step}
                    </span>
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mt-[-1rem] ${
                        i < currentStepIndex ? "bg-primary-500" : "bg-neutral-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tracking */}
      {order.trackingNumber && (
        <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary-500" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Tracking Number</p>
              <p className="text-sm text-neutral-500 font-mono">{order.trackingNumber}</p>
            </div>
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm font-medium text-primary-500 hover:text-primary-600"
              >
                Track Package
              </a>
            )}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900">
            Items ({order.items.length})
          </h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
                <Package className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 truncate">
                  {item.productTitle}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-neutral-500 font-mono">
                    {item.productSku}
                  </span>
                  <Badge variant={
                    item.productGrade === "CERTIFIED_REFURBISHED" ? "emerald" :
                    item.productGrade === "EXCELLENT" ? "green" :
                    item.productGrade === "GOOD" ? "blue" :
                    item.productGrade === "FAIR" ? "amber" : "gray"
                  }>
                    {item.productGrade.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-neutral-900">
                  {formatPrice(Number(item.lineTotal))}
                </p>
                <p className="text-xs text-neutral-500">
                  Qty: {item.quantity} × {formatPrice(Number(item.unitPrice))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary & Shipping Address */}
      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">
              Shipping Address
            </h2>
            <div className="text-sm text-neutral-600 space-y-0.5">
              <p className="font-medium text-neutral-900">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postcode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>{formatPrice(Number(order.subtotal))}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span>
                {Number(order.shippingCost) === 0
                  ? "Free"
                  : formatPrice(Number(order.shippingCost))}
              </span>
            </div>
            {Number(order.discountAmount) > 0 && (
              <div className="flex justify-between text-success-600">
                <span>Discount{order.promoCode ? ` (${order.promoCode})` : ""}</span>
                <span>-{formatPrice(Number(order.discountAmount))}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-500 text-xs">
              <span>GST (included)</span>
              <span>{formatPrice(Number(order.gstAmount))}</span>
            </div>
            <div className="border-t border-neutral-100 pt-2 flex justify-between font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
