import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Convert Decimal fields to numbers for JSON serialization
  return NextResponse.json({
    ...product,
    price: Number(product.price),
    costPrice: product.costPrice ? Number(product.costPrice) : null,
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    screenSizeInch: product.screenSizeInch ? Number(product.screenSizeInch) : null,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      sku: body.sku,
      sellerProductCode: body.sellerProductCode || null,
      shortDescription: body.shortDescription || null,
      description: body.description,
      categoryId: body.categoryId,
      brandId: body.brandId,
      sellerId: body.sellerId,
      grade: body.grade,
      gradeNotes: body.gradeNotes || null,
      price: body.price,
      costPrice: body.costPrice,
      compareAtPrice: body.compareAtPrice,
      processor: body.processor || null,
      ramGb: body.ramGb,
      storageGb: body.storageGb,
      storageType: body.storageType || null,
      screenSizeInch: body.screenSizeInch,
      gpu: body.gpu || null,
      operatingSystem: body.operatingSystem || null,
      batteryHealth: body.batteryHealth,
      stockQuantity: body.stockQuantity || 1,
      status: body.status || "DRAFT",
      isFeatured: body.isFeatured || false,
    },
  });

  return NextResponse.json(product);
}
