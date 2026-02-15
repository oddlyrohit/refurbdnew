"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Save, Truck, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";

interface OrderData {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  gstAmount: number;
  total: number;
  promoCode: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  shippingMethod: string | null;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string } | null;
  guestEmail: string | null;
  shippingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postcode: string;
    country: string;
  } | null;
  items: {
    id: string;
    productTitle: string;
    productSku: string;
    productGrade: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
    sellerCode: string | null;
  }[];
}

const statusOptions = [
  "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED",
];

const statusVariant: Record<string, "success" | "warning" | "info" | "danger" | "neutral"> = {
  PENDING: "warning",
  CONFIRMED: "info",
  PROCESSING: "info",
  SHIPPED: "success",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "neutral",
};

const gradeVariant: Record<string, "emerald" | "green" | "blue" | "amber" | "gray"> = {
  CERTIFIED_REFURBISHED: "emerald",
  EXCELLENT: "green",
  GOOD: "blue",
  FAIR: "amber",
  ACCEPTABLE: "gray",
};

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
        setTrackingNumber(data.trackingNumber || "");
        setTrackingUrl(data.trackingUrl || "");
        setLoading(false);
      });
  }, [id]);

  async function handleUpdate() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, trackingNumber, trackingUrl }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !order) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Order Details</h1>
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const customerName = order.user
    ? `${order.user.firstName || ""} ${order.user.lastName || ""}`.trim() || order.user.email
    : order.guestEmail || "Guest";

  return (
    <div>
      <Link
        href="/admin/orders"
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
            {new Date(order.createdAt).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" • "}{customerName}
          </p>
        </div>
        <Badge variant={statusVariant[order.status] || "neutral"} size="md">
          {order.status}
        </Badge>
      </div>

      {/* Update Status & Tracking */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Update Order</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <Input
            label="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g. AU123456789"
          />
          <Input
            label="Tracking URL"
            value={trackingUrl}
            onChange={(e) => setTrackingUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleUpdate} isLoading={saving}>
            <Save className="h-4 w-4" />
            Update Order
          </Button>
        </div>
      </div>

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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
                <Package className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900">{item.productTitle}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs">
                  <span className="text-neutral-500 font-mono">{item.productSku}</span>
                  <Badge variant={gradeVariant[item.productGrade] || "gray"}>
                    {item.productGrade.replace(/_/g, " ")}
                  </Badge>
                  {item.sellerCode && (
                    <span className="text-neutral-400">Seller: {item.sellerCode}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-neutral-900">{formatPrice(item.lineTotal)}</p>
                <p className="text-xs text-neutral-500">
                  {item.quantity} × {formatPrice(item.unitPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & Address */}
      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        {order.shippingAddress && (
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" />
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

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-success-600">
                <span>Discount{order.promoCode ? ` (${order.promoCode})` : ""}</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-500 text-xs">
              <span>GST (included)</span>
              <span>{formatPrice(order.gstAmount)}</span>
            </div>
            <div className="border-t border-neutral-100 pt-2 flex justify-between font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
