import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductListingContent } from "../product-listing-content";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Refurbished Laptops",
  description:
    "Browse our range of certified refurbished laptops from Dell, HP, Lenovo, Apple, and more. Up to 60% off retail with 12-month warranty.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LaptopsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Laptops" },
        ]}
      />

      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        Refurbished Laptops
      </h1>
      <p className="text-neutral-500 mb-6 max-w-2xl">
        Browse our range of certified refurbished laptops from Dell, HP, Lenovo,
        Apple, and more. Up to 60% off retail with 12-month warranty.
      </p>

      <Suspense fallback={<ListingSkeleton />}>
        <ProductListingContent
          searchParams={params}
          category="laptops"
          categoryTitle="Refurbished Laptops"
        />
      </Suspense>
    </div>
  );
}

function ListingSkeleton() {
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
