"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, ProductGrade, StorageType } from "@prisma/client";
import type { ProductFilters } from "@/types/filters";

const PRODUCTS_PER_PAGE = 12;

export async function getProducts(filters: ProductFilters = {}) {
  const {
    category,
    grade,
    brand,
    minPrice,
    maxPrice,
    processor,
    ram,
    storage,
    storageType,
    os,
    sort = "relevance",
    search,
    page = 1,
    limit = PRODUCTS_PER_PAGE,
  } = filters;

  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
  };

  // Category filter
  if (category) {
    where.category = { slug: category };
  }

  // Grade filter
  if (grade && grade.length > 0) {
    where.grade = { in: grade as ProductGrade[] };
  }

  // Brand filter
  if (brand && brand.length > 0) {
    where.brand = { slug: { in: brand } };
  }

  // Price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  // RAM filter
  if (ram && ram.length > 0) {
    where.ramGb = { in: ram };
  }

  // Storage filter
  if (storage && storage.length > 0) {
    where.storageGb = { in: storage };
  }

  // Storage type filter
  if (storageType && storageType.length > 0) {
    where.storageType = { in: storageType as StorageType[] };
  }

  // OS filter
  if (os && os.length > 0) {
    where.operatingSystem = { in: os };
  }

  // Search
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { processor: { contains: search, mode: "insensitive" } },
    ];
  }

  // Sort
  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { isFeatured: "desc" };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { url: true, altText: true },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      grade: p.grade,
      brand: p.brand.name,
      brandSlug: p.brand.slug,
      category: p.category.name,
      categorySlug: p.category.slug,
      imageUrl: p.images[0]?.url || null,
      stockQuantity: p.stockQuantity,
      processor: p.processor,
      ramGb: p.ramGb,
      storageGb: p.storageGb,
      screenSizeInch: p.screenSizeInch ? Number(p.screenSizeInch) : null,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      brand: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isApproved: true },
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) return null;

  const reviewCount = product.reviews.length;
  const avgRating =
    reviewCount > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  return {
    ...product,
    price: Number(product.price),
    costPrice: product.costPrice ? Number(product.costPrice) : null,
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    screenSizeInch: product.screenSizeInch ? Number(product.screenSizeInch) : null,
    reviewCount,
    avgRating: Math.round(avgRating * 10) / 10,
  };
}

export async function getFeaturedProducts(limit = 6) {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      brand: { select: { name: true } },
      images: {
        where: { isPrimary: true },
        take: 1,
        select: { url: true },
      },
    },
  });

  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
    grade: p.grade,
    brand: p.brand.name,
    imageUrl: p.images[0]?.url || null,
    stockQuantity: p.stockQuantity,
  }));
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      categoryId,
      id: { not: productId },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      brand: { select: { name: true } },
      images: {
        where: { isPrimary: true },
        take: 1,
        select: { url: true },
      },
    },
  });

  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
    grade: p.grade,
    brand: p.brand.name,
    imageUrl: p.images[0]?.url || null,
    stockQuantity: p.stockQuantity,
  }));
}

export async function getAvailableFilters(category?: string) {
  const where: Prisma.ProductWhereInput = { status: "ACTIVE" };
  if (category) {
    where.category = { slug: category };
  }

  const products = await prisma.product.findMany({
    where,
    select: {
      price: true,
      grade: true,
      ramGb: true,
      storageGb: true,
      storageType: true,
      operatingSystem: true,
      screenSizeInch: true,
      brand: { select: { name: true, slug: true } },
    },
  });

  const brands = new Map<string, { slug: string; count: number }>();
  const grades = new Map<string, number>();
  const ramOptions = new Set<number>();
  const storageOptions = new Set<number>();
  const storageTypes = new Set<string>();
  const osOptions = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const p of products) {
    const price = Number(p.price);
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;

    const existing = brands.get(p.brand.name);
    if (existing) {
      existing.count++;
    } else {
      brands.set(p.brand.name, { slug: p.brand.slug, count: 1 });
    }

    grades.set(p.grade, (grades.get(p.grade) || 0) + 1);
    if (p.ramGb) ramOptions.add(p.ramGb);
    if (p.storageGb) storageOptions.add(p.storageGb);
    if (p.storageType) storageTypes.add(p.storageType);
    if (p.operatingSystem) osOptions.add(p.operatingSystem);
  }

  return {
    brands: Array.from(brands.entries())
      .map(([name, data]) => ({
        value: data.slug,
        label: name,
        count: data.count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    grades: Array.from(grades.entries()).map(([grade, count]) => ({
      value: grade,
      label: grade.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      count,
    })),
    ramOptions: Array.from(ramOptions)
      .sort((a, b) => a - b)
      .map((r) => ({ value: String(r), label: `${r}GB` })),
    storageOptions: Array.from(storageOptions)
      .sort((a, b) => a - b)
      .map((s) => ({
        value: String(s),
        label: s >= 1000 ? `${s / 1000}TB` : `${s}GB`,
      })),
    storageTypes: Array.from(storageTypes).map((t) => ({
      value: t,
      label: t === "SSD_HDD" ? "SSD + HDD" : t,
    })),
    osOptions: Array.from(osOptions)
      .sort()
      .map((o) => ({ value: o, label: o })),
    priceRange: {
      min: minPrice === Infinity ? 0 : Math.floor(minPrice),
      max: Math.ceil(maxPrice),
    },
  };
}
