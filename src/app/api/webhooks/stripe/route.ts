import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  // If webhook secret is configured, verify signature
  if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // No webhook secret — parse event directly (for initial setup)
    event = JSON.parse(body) as Stripe.Event;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata!;
  const items = JSON.parse(metadata.items || "[]") as {
    productId: string;
    quantity: number;
  }[];
  const shippingAddress = JSON.parse(metadata.shippingAddress || "{}");
  const userId = metadata.userId || null;
  const promoCode = metadata.promoCode || null;

  // Fetch products for order creation
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { seller: true, brand: true },
  });

  // Calculate totals
  let subtotal = 0;
  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const lineTotal = Number(product.price) * item.quantity;
    subtotal += lineTotal;
    return {
      productId: product.id,
      productTitle: product.title,
      productSku: product.sku,
      productGrade: product.grade,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal,
      sellerCode: product.seller.code,
      sellerId: product.seller.id,
      costPrice: product.costPrice,
      commissionRate: product.seller.commissionRate,
      commissionAmount: product.costPrice
        ? Number(lineTotal) * (Number(product.seller.commissionRate) / 100)
        : null,
    };
  });

  // Shipping
  let shippingCost = 0;
  const shippingMethod = metadata.shippingMethod || "standard-au";
  if (shippingMethod === "express-au") shippingCost = 14.95;
  else if (shippingMethod === "standard-nz") shippingCost = 19.95;
  else if (subtotal < 99) shippingCost = 9.95;

  // Discount
  const discountAmount = session.total_details?.amount_discount
    ? session.total_details.amount_discount / 100
    : 0;

  const total = subtotal + shippingCost - discountAmount;
  const gstAmount = total / 11;

  // Generate order number
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const orderNumber = `RFB-${dateStr}-${randomSuffix}`;

  // Create shipping address
  const address = await prisma.address.create({
    data: {
      userId: userId || null,
      firstName: shippingAddress.firstName || "",
      lastName: shippingAddress.lastName || "",
      line1: shippingAddress.line1 || "",
      line2: shippingAddress.line2 || null,
      city: shippingAddress.city || "",
      state: shippingAddress.state || "",
      postcode: shippingAddress.postcode || "",
      country: shippingAddress.country || "AU",
      phone: shippingAddress.phone || null,
    },
  });

  // Create order
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: userId || null,
      guestEmail: session.customer_email,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      stripeSessionId: session.id,
      stripePaymentId: session.payment_intent as string,
      subtotal,
      shippingCost,
      discountAmount,
      gstAmount,
      total,
      currency: "AUD",
      shippingMethod,
      shippingAddressId: address.id,
      promoCode,
      items: {
        create: orderItems,
      },
    },
    include: { items: true },
  });

  // Decrement stock
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stockQuantity: { decrement: item.quantity } },
    });
  }

  // Update promo code usage
  if (promoCode) {
    await prisma.promoCode.update({
      where: { code: promoCode },
      data: { usedCount: { increment: 1 } },
    });
  }

  // Send confirmation email
  if (session.customer_email) {
    await sendOrderConfirmation({
      to: session.customer_email,
      orderNumber: order.orderNumber,
      items: order.items.map((i) => ({
        title: i.productTitle,
        quantity: i.quantity,
        price: Number(i.lineTotal),
      })),
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total,
      shippingAddress,
    });
  }
}
