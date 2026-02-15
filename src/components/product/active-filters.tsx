"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { PRODUCT_GRADES } from "@/lib/constants";

const filterLabels: Record<string, string> = {
  grade: "Grade",
  brand: "Brand",
  minPrice: "Min Price",
  maxPrice: "Max Price",
  ram: "RAM",
  storage: "Storage",
  storageType: "Storage Type",
  os: "OS",
  search: "Search",
};

function getValueLabel(key: string, value: string): string {
  if (key === "grade") {
    const grade = PRODUCT_GRADES.find((g) => g.value === value);
    return grade?.label || value;
  }
  if (key === "ram") return `${value}GB`;
  if (key === "storage") {
    const num = Number(value);
    return num >= 1000 ? `${num / 1000}TB` : `${value}GB`;
  }
  if (key === "minPrice" || key === "maxPrice") return `$${value}`;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilters: { key: string; value: string; label: string }[] = [];

  for (const [key, rawValue] of searchParams.entries()) {
    if (["sort", "page"].includes(key)) continue;

    if (["minPrice", "maxPrice", "search"].includes(key)) {
      activeFilters.push({
        key,
        value: rawValue,
        label: `${filterLabels[key] || key}: ${getValueLabel(key, rawValue)}`,
      });
    } else {
      for (const val of rawValue.split(",")) {
        activeFilters.push({
          key,
          value: val,
          label: getValueLabel(key, val),
        });
      }
    }
  }

  if (activeFilters.length === 0) return null;

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (["minPrice", "maxPrice", "search"].includes(key)) {
      params.delete(key);
    } else {
      const existing = params.get(key)?.split(",").filter(Boolean) || [];
      const updated = existing.filter((v) => v !== value);
      if (updated.length > 0) {
        params.set(key, updated.join(","));
      } else {
        params.delete(key);
      }
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((filter, i) => (
        <button
          key={`${filter.key}-${filter.value}-${i}`}
          onClick={() => removeFilter(filter.key, filter.value)}
          className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
        >
          {filter.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-neutral-500 hover:text-neutral-700 underline"
      >
        Clear all
      </button>
    </div>
  );
}
