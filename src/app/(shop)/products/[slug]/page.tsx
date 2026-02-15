import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, Shield, RotateCcw, Truck, Star } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/actions/product-actions";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { GradeBadge } from "@/components/product/grade-badge";
import { PriceDisplay } from "@/components/product/price-display";
import { SpecsTable } from "@/components/product/specs-table";
import { StockIndicator } from "@/components/product/stock-indicator";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCT_GRADES } from "@/lib/constants";
import { formatPrice } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description.slice(0, 160),
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.categoryId,
    4
  );

  const gradeInfo = PRODUCT_GRADES.find((g) => g.value === product.grade);
  const isOutOfStock = product.stockQuantity === 0;

  const specs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ramGb ? `${product.ramGb}GB` : null },
    {
      label: "Storage",
      value: product.storageGb
        ? `${product.storageGb >= 1000 ? `${product.storageGb / 1000}TB` : `${product.storageGb}GB`} ${product.storageType === "SSD_HDD" ? "SSD + HDD" : product.storageType || ""}`
        : null,
    },
    {
      label: "Display",
      value: product.screenSizeInch ? `${product.screenSizeInch}"` : null,
    },
    { label: "Graphics", value: product.gpu },
    { label: "Operating System", value: product.operatingSystem },
    {
      label: "Battery Health",
      value: product.batteryHealth ? `${product.batteryHealth}%` : null,
    },
    { label: "Weight", value: product.weight },
    { label: "Dimensions", value: product.dimensions },
    { label: "Ports", value: product.ports },
    { label: "Model Year", value: product.modelYear },
    { label: "SKU", value: product.sku },
  ];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription || product.description,
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: product.brand.name,
    },
    sku: product.sku,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
      priceCurrency: "AUD",
      price: product.price,
      availability: isOutOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/RefurbishedCondition",
      seller: {
        "@type": "Organization",
        name: "Refurbd",
      },
    },
    ...(product.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.avgRating,
        reviewCount: product.reviewCount,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            {
              label: product.category.name,
              href: `/products/${product.category.slug}`,
            },
            { label: product.title },
          ]}
        />

        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <ProductImageGallery
            images={product.images}
            productTitle={product.title}
          />

          {/* Product Info */}
          <div>
            <GradeBadge grade={product.grade} size="md" />

            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-neutral-900">
              {product.title}
            </h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.avgRating)
                          ? "fill-secondary-500 text-secondary-500"
                          : "text-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">
                  {product.avgRating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-4">
              <PriceDisplay
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="lg"
              />
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="mt-1 text-sm text-success-600 font-medium">
                  You save{" "}
                  {formatPrice(product.compareAtPrice - product.price)}
                </p>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="mt-4 text-neutral-600">
                {product.shortDescription}
              </p>
            )}

            {/* Stock */}
            <div className="mt-4">
              <StockIndicator
                quantity={product.stockQuantity}
                threshold={product.lowStockThreshold}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button
                size="lg"
                variant="primary"
                className="flex-1"
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button size="lg" variant="outline" aria-label="Add to wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "12-Month Warranty" },
                { icon: RotateCcw, label: "30-Day Returns" },
                { icon: Truck, label: "Free Ship $99+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 rounded-lg bg-neutral-50 p-3 text-center"
                >
                  <item.icon className="h-5 w-5 text-primary-500" />
                  <span className="text-xs font-medium text-neutral-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Specifications
              </h2>
              <SpecsTable specs={specs} />
            </div>

            {/* Condition / Grade Details */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Condition Details
              </h2>
              <div className="rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <GradeBadge grade={product.grade} size="md" />
                  <span className="text-sm text-neutral-500">
                    {gradeInfo?.description}
                  </span>
                </div>
                {product.conditionDesc && (
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {product.conditionDesc}
                  </p>
                )}
                <Link
                  href="/grading"
                  className="mt-4 inline-block text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  Learn more about our grading system →
                </Link>
              </div>

              {/* Warranty Info */}
              <h2 className="text-xl font-bold text-neutral-900 mb-4 mt-8">
                Warranty & Returns
              </h2>
              <div className="rounded-xl border border-neutral-200 p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-trust-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      12-Month Warranty
                    </p>
                    <p className="text-sm text-neutral-500">
                      Full coverage against hardware defects.{" "}
                      <Link
                        href="/warranty"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-trust-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      30-Day Returns
                    </p>
                    <p className="text-sm text-neutral-500">
                      Not happy? Return it hassle-free.{" "}
                      <Link
                        href="/returns"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        Return policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-neutral-200 pt-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
