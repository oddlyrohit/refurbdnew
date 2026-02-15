import { getProducts, getAvailableFilters } from "@/actions/product-actions";
import { ProductCard } from "@/components/product/product-card";
import { FilterSidebar } from "@/components/product/filter-sidebar";
import { SortDropdown } from "@/components/product/sort-dropdown";
import { ActiveFilters } from "@/components/product/active-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/product/pagination";
import { Search } from "lucide-react";
import type { ProductFilters } from "@/types/filters";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
  category?: string;
  categoryTitle?: string;
}

export async function ProductListingContent({
  searchParams,
  category,
  categoryTitle,
}: Props) {
  const filters: ProductFilters = {
    category,
    grade: (searchParams.grade as string)?.split(",").filter(Boolean),
    brand: (searchParams.brand as string)?.split(",").filter(Boolean),
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    ram: (searchParams.ram as string)
      ?.split(",")
      .filter(Boolean)
      .map(Number),
    storage: (searchParams.storage as string)
      ?.split(",")
      .filter(Boolean)
      .map(Number),
    storageType: (searchParams.storageType as string)
      ?.split(",")
      .filter(Boolean),
    os: (searchParams.os as string)?.split(",").filter(Boolean),
    sort: (searchParams.sort as ProductFilters["sort"]) || "relevance",
    search: searchParams.search as string,
    page: searchParams.page ? Number(searchParams.page) : 1,
  };

  const [{ products, total, totalPages, currentPage }, availableFilters] =
    await Promise.all([
      getProducts(filters),
      getAvailableFilters(category),
    ]);

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar - Desktop */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterSidebar filters={availableFilters} />
      </div>

      {/* Products */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-medium text-neutral-900">{total}</span>{" "}
            {total === 1 ? "product" : "products"}
            {categoryTitle && (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-neutral-900">
                  {categoryTitle}
                </span>
              </>
            )}
          </p>
          <SortDropdown />
        </div>

        {/* Active Filters */}
        <div className="mb-4">
          <ActiveFilters />
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<Search className="h-12 w-12" />}
            title="No products found"
            description="Try adjusting your filters or search terms to find what you're looking for."
            actionLabel="Clear Filters"
            actionHref={category ? `/products/${category}` : "/products"}
          />
        )}
      </div>
    </div>
  );
}
