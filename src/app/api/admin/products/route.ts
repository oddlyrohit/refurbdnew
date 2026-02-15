import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const product = await prisma.product.create({
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

  return NextResponse.json(product, { status: 201 });
}
