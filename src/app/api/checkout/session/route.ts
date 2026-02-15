import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    items,
    shippingAddress,
    shippingMethod,
    promoCode,
    email,
  } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id || null;
  const customerEmail = email || session?.user?.email;

  // Validate products and calculate totals
  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, status: "ACTIVE" },
    include: { brand: true, seller: true },
  });

  if (products.length !== items.length) {
    return NextResponse.json({ error: "Some products are unavailable" }, { status: 400 });
  }

  // Build line items
  const lineItems = items.map((item: { productId: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      price_data: {
        currency: "aud",
        product_data: {
          name: product.title,
          description: `${product.brand.name} — Grade: ${product.grade.replace(/_/g, " ")}`,
        },
        unit_amount: Math.round(Number(product.price) * 100),
      },
      quantity: item.quantity,
    };
  });

  // Calculate shipping
  let shippingCost = 0;
  if (shippingMethod === "express-au") shippingCost = 14.95;
  else if (shippingMethod === "standard-nz") shippingCost = 19.95;
  else if (shippingMethod === "standard-au") {
    const subtotal = items.reduce((sum: number, item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + Number(product.price) * item.quantity;
    }, 0);
    shippingCost = subtotal >= 99 ? 0 : 9.95;
  }

  // Add shipping as a line item if not free
  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: "aud",
        product_data: {
          name: "Shipping",
          description: shippingMethod === "express-au" ? "Express (2-3 business days)" :
            shippingMethod === "standard-nz" ? "NZ Standard (7-14 business days)" :
            "Standard (5-7 business days)",
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });
  }

  // Apply promo code discount
  const discounts: { coupon: string }[] = [];
  if (promoCode) {
    const promo = await prisma.promoCode.findUnique({ where: { code: promoCode } });
    if (promo && promo.isActive && new Date() >= promo.validFrom && new Date() <= promo.validUntil) {
      // Create a Stripe coupon on the fly
      const coupon = await stripe.coupons.create(
        promo.type === "PERCENTAGE"
          ? { percent_off: Number(promo.value), duration: "once" }
          : { amount_off: Math.round(Number(promo.value) * 100), currency: "aud", duration: "once" }
      );
      discounts.push({ coupon: coupon.id });
    }
  }

  // Create Stripe checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    discounts: discounts.length > 0 ? discounts : undefined,
    customer_email: customerEmail,
    metadata: {
      userId: userId || "",
      shippingAddress: JSON.stringify(shippingAddress),
      shippingMethod: shippingMethod || "standard-au",
      promoCode: promoCode || "",
      items: JSON.stringify(items),
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://refurbd.vercel.app"}/checkout/success?order={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://refurbd.vercel.app"}/cart`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
