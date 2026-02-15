import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradeBadge } from "./grade-badge";
import { PriceDisplay } from "./price-display";
import { Button } from "@/components/ui/button";

export interface ProductCardData {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  grade: string;
  imageUrl?: string | null;
  brand?: string | null;
  stockQuantity: number;
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-neutral-200 bg-white overflow-hidden transition-shadow hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-neutral-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-neutral-500 opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-danger-500 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <GradeBadge grade={product.grade} />
        </div>

        {product.brand && (
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            {product.brand}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-medium text-neutral-900 hover:text-primary-500 transition-colors"
        >
          {product.title}
        </Link>

        <div className="mt-auto pt-3">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />

          <Button
            variant="primary"
            size="sm"
            className="mt-3 w-full"
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
