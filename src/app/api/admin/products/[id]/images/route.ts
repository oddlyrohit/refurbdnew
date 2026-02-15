import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const existingImages = await prisma.productImage.count({
    where: { productId: id },
  });

  const image = await prisma.productImage.create({
    data: {
      productId: id,
      url: body.url,
      altText: body.altText || null,
      sortOrder: existingImages,
      isPrimary: existingImages === 0,
    },
  });

  return NextResponse.json(image, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("imageId");

  if (!imageId) {
    return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
  }

  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
  });

  if (!image || image.productId !== id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Try to delete from R2 if URL contains our bucket path
  const urlParts = image.url.split("/products/");
  if (urlParts.length > 1) {
    try {
      await deleteFromR2(`products/${urlParts[1]}`);
    } catch {
      // Continue even if R2 delete fails
    }
  }

  await prisma.productImage.delete({ where: { id: imageId } });

  // If deleted image was primary, make the first remaining image primary
  if (image.isPrimary) {
    const firstImage = await prisma.productImage.findFirst({
      where: { productId: id },
      orderBy: { sortOrder: "asc" },
    });
    if (firstImage) {
      await prisma.productImage.update({
        where: { id: firstImage.id },
        data: { isPrimary: true },
      });
    }
  }

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  if (body.primaryImageId) {
    await prisma.productImage.updateMany({
      where: { productId: id },
      data: { isPrimary: false },
    });
    await prisma.productImage.update({
      where: { id: body.primaryImageId },
      data: { isPrimary: true },
    });
  }

  return NextResponse.json({ success: true });
}
