"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Lock, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { GradeBadge } from "@/components/product/grade-badge";
import { formatPrice } from "@/lib/formatters";
import {
  AU_STATES,
  NZ_REGIONS,
  SHIPPING_METHODS,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/constants";

type Step = 1 | 2 | 3;

const steps = [
  { number: 1, label: "Information" },
  { number: 2, label: "Shipping" },
  { number: 3, label: "Payment" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    company: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postcode: "",
    country: "AU",
    phone: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard-au");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300 mb-4" />
        <h1 className="text-2xl font-bold text-neutral-900">Cart is Empty</h1>
        <p className="mt-2 text-neutral-500">
          Add some items before checking out.
        </p>
        <Link href="/products">
          <Button variant="primary" className="mt-4">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const selectedShipping = SHIPPING_METHODS.find(
    (m) => m.id === shippingMethod
  )!;
  const shippingCost =
    selectedShipping.freeAbove && subtotal >= selectedShipping.freeAbove
      ? 0
      : selectedShipping.price;
  const total = subtotal + shippingCost;
  const gstAmount = total / 11;

  const stateOptions =
    address.country === "AU"
      ? AU_STATES.map((s) => ({ value: s.value, label: s.label }))
      : NZ_REGIONS.map((r) => ({ value: r.value, label: r.label }));

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // TODO: Integrate Stripe Checkout session creation
    // For now, simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push("/checkout/success?order=RFB-20260215-DEMO");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-2xl font-bold text-primary-500">
          Refurbd
        </Link>
        <div className="flex items-center gap-1 text-sm text-neutral-500">
          <Lock className="h-4 w-4" />
          Secure Checkout
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep > step.number
                    ? "bg-success-500 text-white"
                    : currentStep === step.number
                      ? "bg-primary-500 text-white"
                      : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.number
                    ? "text-neutral-900"
                    : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-2 h-px w-12 bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          {/* Step 1: Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  Contact Information
                </h2>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                <label className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-500"
                  />
                  Create an account for order tracking
                </label>
              </div>

              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="First Name"
                      value={address.firstName}
                      onChange={(e) =>
                        setAddress({ ...address, firstName: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Last Name"
                      value={address.lastName}
                      onChange={(e) =>
                        setAddress({ ...address, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    label="Company (optional)"
                    value={address.company}
                    onChange={(e) =>
                      setAddress({ ...address, company: e.target.value })
                    }
                  />
                  <Input
                    label="Address"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    placeholder="Street address"
                    required
                  />
                  <Input
                    label="Apartment, suite, etc. (optional)"
                    value={address.line2}
                    onChange={(e) =>
                      setAddress({ ...address, line2: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="City / Suburb"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                    />
                    <Select
                      label="Country"
                      value={address.country}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          country: e.target.value,
                          state: "",
                        })
                      }
                      options={[
                        { value: "AU", label: "Australia" },
                        { value: "NZ", label: "New Zealand" },
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="State / Region"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      options={stateOptions}
                      placeholder="Select..."
                    />
                    <Input
                      label="Postcode"
                      value={address.postcode}
                      onChange={(e) =>
                        setAddress({ ...address, postcode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    label="Phone"
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    placeholder="For delivery updates"
                    required
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setCurrentStep(2)}
                disabled={
                  !email ||
                  !address.firstName ||
                  !address.lastName ||
                  !address.line1 ||
                  !address.city ||
                  !address.state ||
                  !address.postcode ||
                  !address.phone
                }
              >
                Continue to Shipping
              </Button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900">
                  Shipping Method
                </h2>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Edit Info
                </button>
              </div>

              {/* Address summary */}
              <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
                <p className="font-medium text-neutral-900">
                  {address.firstName} {address.lastName}
                </p>
                <p>
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                </p>
                <p>
                  {address.city}, {address.state} {address.postcode},{" "}
                  {address.country === "AU" ? "Australia" : "New Zealand"}
                </p>
              </div>

              {/* Shipping options */}
              <div className="space-y-3">
                {SHIPPING_METHODS.filter((m) =>
                  address.country === "AU"
                    ? !m.id.includes("nz")
                    : m.id.includes("nz") || m.id === "express-au"
                ).map((method) => {
                  const isFree =
                    method.freeAbove && subtotal >= method.freeAbove;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between rounded-lg border-2 p-4 cursor-pointer transition-colors ${
                        shippingMethod === method.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={() => setShippingMethod(method.id)}
                          className="h-4 w-4 text-primary-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {method.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        {isFree ? (
                          <span className="text-success-600">Free</span>
                        ) : (
                          formatPrice(method.price)
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setCurrentStep(3)}
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900">Payment</h2>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Edit Shipping
                </button>
              </div>

              {/* Payment form placeholder - will be replaced with Stripe Elements */}
              <div className="rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4 text-success-500" />
                  <span className="text-sm font-medium text-neutral-900">
                    Secure Payment via Stripe
                  </span>
                </div>

                <div className="space-y-3">
                  <Input label="Card Number" placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Expiry Date" placeholder="MM / YY" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                  <Input label="Name on Card" placeholder="Full name" />
                </div>

                <p className="mt-4 text-xs text-neutral-400">
                  Your payment info is encrypted and secure. We never store your
                  card details.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                isLoading={isProcessing}
              >
                Place Order — {formatPrice(total)}
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
                <span>12-month warranty</span>
                <span>30-day returns</span>
                <span>Secure checkout</span>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Order Summary ({items.length}{" "}
              {items.length === 1 ? "item" : "items"})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-lg bg-neutral-100 overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-300">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                    )}
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-500 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-700 line-clamp-2">
                      {item.title}
                    </p>
                    <GradeBadge grade={item.grade} />
                  </div>
                  <p className="text-xs font-medium text-neutral-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4 border-neutral-200" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-success-600 font-medium">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Includes GST</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>
              <hr className="my-2 border-neutral-200" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
