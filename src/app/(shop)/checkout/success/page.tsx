"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("order");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/checkout/success?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.orderNumber) {
          setOrderNumber(data.orderNumber);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary-500" />
        <p className="mt-4 text-neutral-500">Loading your order details...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100">
        <CheckCircle className="h-10 w-10 text-success-500" />
      </div>

      <h1 className="text-3xl font-bold text-neutral-900">
        Thank You for Your Order!
      </h1>

      <p className="mt-3 text-neutral-500">
        Your order has been placed successfully. We&apos;ll send you a
        confirmation email shortly.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
          <Package className="h-5 w-5" />
          Order Number
        </div>
        <p className="mt-1 text-2xl font-bold text-neutral-900 font-mono">
          {orderNumber || "Processing..."}
        </p>
        {!orderNumber && (
          <p className="mt-2 text-sm text-neutral-400">
            Your order is being processed. Check your email for confirmation.
          </p>
        )}
        <p className="mt-3 text-sm text-neutral-500">
          Estimated delivery: 5-7 business days
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Link href="/products" className="block">
          <Button variant="primary" size="lg" className="w-full">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/account/orders" className="block">
          <Button variant="outline" size="lg" className="w-full">
            View My Orders
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-xs text-neutral-400">
        Need help? <Link href="/contact" className="text-primary-500 hover:text-primary-600">Contact our support team</Link>
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <OrderConfirmation />
    </Suspense>
  );
}
