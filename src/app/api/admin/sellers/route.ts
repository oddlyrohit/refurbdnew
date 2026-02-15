import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sellers = await prisma.seller.findMany({
    where: { isActive: true },
    orderBy: { businessName: "asc" },
    select: { id: true, code: true, businessName: true },
  });
  return NextResponse.json(sellers);
}

export async function POST(request: Request) {
  const body = await request.json();

  const seller = await prisma.seller.create({
    data: {
      code: body.code,
      businessName: body.businessName,
      contactName: body.contactName,
      email: body.email,
      phone: body.phone || null,
      abn: body.abn || null,
      nzbn: body.nzbn || null,
      commissionRate: body.commissionRate,
      bankBsb: body.bankBsb || null,
      bankAccount: body.bankAccount || null,
      bankName: body.bankName || null,
      notes: body.notes || null,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(seller, { status: 201 });
}
