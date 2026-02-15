import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const seller = await prisma.seller.findUnique({ where: { id } });
  if (!seller) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(seller);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const seller = await prisma.seller.update({
    where: { id },
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

  return NextResponse.json(seller);
}
