import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductListingContent } from "./product-listing-content";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "All Refurbished Products",
  description:
    "Browse our full range of certified refurbished laptops and desktops. Up to 60% off retail with 12-month warranty.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "All Products" }]} />

      <h1 className="text-3xl font-bold text-neutral-900 mb-6">
        All Refurbished Products
      </h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListingContent searchParams={params} />
      </Suspense>
    </div>
  );
}

function ProductListingSkeleton() {
  return (
    <div className="flex gap-8">
      <div className="hidden lg:block w-64 shrink-0 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full" />
        ))}
      </div>
    </div>
  );
}
