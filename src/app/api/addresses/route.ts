import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(addresses);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // If this is set as default, unset all others first
  if (body.isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company || null,
      line1: body.line1,
      line2: body.line2 || null,
      city: body.city,
      state: body.state,
      postcode: body.postcode,
      country: body.country,
      phone: body.phone || null,
      isDefault: body.isDefault || false,
    },
  });

  return NextResponse.json(address, { status: 201 });
}
