"use client";

import { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";

interface WishlistProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  grade: string;
  imageUrl: string | null;
  brand: string;
  stockQuantity: number;
}

interface WishlistEntry {
  id: string;
  createdAt: string;
  product: WishlistProduct;
}

const gradeVariant: Record<string, "emerald" | "green" | "blue" | "amber" | "gray"> = {
  CERTIFIED_REFURBISHED: "emerald",
  EXCELLENT: "green",
  GOOD: "blue",
  FAIR: "amber",
  ACCEPTABLE: "gray",
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(wishlistItemId: string) {
    setRemovingId(wishlistItemId);
    try {
      const res = await fetch(`/api/wishlist/${wishlistItemId}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== wishlistItemId));
      }
    } finally {
      setRemovingId(null);
    }
  }

  function handleAddToCart(product: WishlistProduct) {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      slug: product.slug,
      grade: product.grade,
      brand: product.brand,
      stockQuantity: product.stockQuantity,
    });
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Wishlist</h1>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">My Wishlist</h1>
      <p className="mt-1 text-neutral-500">
        {items.length} item{items.length !== 1 ? "s" : ""} saved
      </p>

      {items.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="Your wishlist is empty"
          description="Save items you love to come back to them later."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {items.map((entry) => {
            const { product } = entry;
            const inStock = product.stockQuantity > 0;

            return (
              <div
                key={entry.id}
                className="rounded-xl border border-neutral-200 bg-white p-4 flex gap-4"
              >
                {/* Product Image */}
                <Link href={`/products/${product.slug}`} className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Heart className="h-8 w-8 text-neutral-300" />
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-500">{product.brand}</p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-medium text-neutral-900 hover:text-primary-500 line-clamp-2"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <button
                      onClick={() => handleRemove(entry.id)}
                      disabled={removingId === entry.id}
                      className="flex-shrink-0 p-1 text-neutral-400 hover:text-danger-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={gradeVariant[product.grade] || "gray"}>
                      {product.grade.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-neutral-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="ml-2 text-sm text-neutral-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      disabled={!inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {inStock ? "Add" : "Sold Out"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
