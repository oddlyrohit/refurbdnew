import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          brand: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formatted = items.map((item) => ({
    id: item.id,
    createdAt: item.createdAt.toISOString(),
    product: {
      id: item.product.id,
      slug: item.product.slug,
      title: item.product.title,
      price: Number(item.product.price),
      compareAtPrice: item.product.compareAtPrice
        ? Number(item.product.compareAtPrice)
        : null,
      grade: item.product.grade,
      imageUrl: item.product.images[0]?.url || null,
      brand: item.product.brand.name,
      stockQuantity: item.product.stockQuantity,
    },
  }));

  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();

  const existing = await prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId,
      },
    },
  });

  if (existing) {
    return NextResponse.json({ id: existing.id });
  }

  const item = await prisma.wishlistItem.create({
    data: {
      userId: session.user.id,
      productId,
    },
  });

  return NextResponse.json({ id: item.id }, { status: 201 });
}
