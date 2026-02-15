import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { stripeSessionId: sessionId },
    select: { orderNumber: true },
  });

  if (!order) {
    return NextResponse.json({ orderNumber: null });
  }

  return NextResponse.json({ orderNumber: order.orderNumber });
}
