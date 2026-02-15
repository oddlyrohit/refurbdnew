"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "RFB-XXXXXXXX";

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
          {orderNumber}
        </p>
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
