"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/product/grade-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { formatPrice } from "@/lib/formatters";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // Prevent hydration mismatch since cart is in localStorage
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 9.95;
  const gstAmount = (subtotal + shippingCost) / 11; // GST included
  const total = subtotal + shippingCost;
  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <EmptyState
          icon={<ShoppingBag className="h-16 w-16" />}
          title="Your cart is empty"
          description="Looks like you haven't added any refurbished gems yet."
          actionLabel="Start Shopping"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Cart" }]} />

      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4"
            >
              {/* Image */}
              <Link
                href={`/products/${item.slug}`}
                className="relative h-24 w-24 shrink-0 rounded-lg bg-neutral-100 overflow-hidden"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-300">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                )}
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <GradeBadge grade={item.grade} />
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-1 block text-sm font-medium text-neutral-900 hover:text-primary-500 line-clamp-2"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="shrink-0 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-danger-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      disabled={item.quantity >= 5 || item.quantity >= item.stockQuantity}
                      className="h-8 w-8 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <p className="text-sm font-bold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Order Summary
            </h2>

            {/* Free shipping progress */}
            {freeShippingRemaining > 0 && (
              <div className="mb-4 rounded-lg bg-primary-50 p-3">
                <p className="text-xs font-medium text-primary-700 mb-2">
                  You&apos;re {formatPrice(freeShippingRemaining)} away from
                  free shipping!
                </p>
                <div className="h-2 rounded-full bg-primary-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-500 transition-all"
                    style={{
                      width: `${Math.min(
                        (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span className="text-neutral-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span className="text-neutral-900">
                  {shippingCost === 0 ? (
                    <span className="text-success-600 font-medium">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Includes GST</span>
                <span className="text-neutral-400">
                  {formatPrice(gstAmount)}
                </span>
              </div>
              <hr className="my-3 border-neutral-200" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full rounded-lg border border-neutral-300 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <Button
                  variant="outline"
                  size="md"
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="block mt-4">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="/products"
              className="mt-3 block text-center text-sm text-primary-500 hover:text-primary-600"
            >
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="mt-4 flex items-center justify-center gap-4 pt-4 border-t border-neutral-100">
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure checkout
              </span>
              <span className="text-xs text-neutral-400">30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
