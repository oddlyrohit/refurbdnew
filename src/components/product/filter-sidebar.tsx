"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_GRADES } from "@/lib/constants";
import type { AvailableFilters } from "@/types/filters";

interface FilterSidebarProps {
  filters: AvailableFilters;
  className?: string;
}

export function FilterSidebar({ filters, className }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.get(key)?.split(",").filter(Boolean) || [];

      if (isChecked) {
        existing.push(value);
      } else {
        const index = existing.indexOf(value);
        if (index > -1) existing.splice(index, 1);
      }

      if (existing.length > 0) {
        params.set(key, existing.join(","));
      } else {
        params.delete(key);
      }

      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const isChecked = (key: string, value: string) => {
    return searchParams.get(key)?.split(",").includes(value) || false;
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => !["sort", "page"].includes(key)
  );

  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-primary-500 hover:text-primary-600"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Grade */}
      <FilterGroup title="Grade">
        {PRODUCT_GRADES.map((grade) => {
          const filterGrade = filters.grades.find(
            (g) => g.value === grade.value
          );
          return (
            <FilterCheckbox
              key={grade.value}
              label={grade.label}
              count={filterGrade?.count}
              checked={isChecked("grade", grade.value)}
              onChange={(checked) =>
                updateFilter("grade", grade.value, checked)
              }
            />
          );
        })}
      </FilterGroup>

      {/* Brand */}
      {filters.brands.length > 0 && (
        <FilterGroup title="Brand">
          {filters.brands.map((brand) => (
            <FilterCheckbox
              key={brand.value}
              label={brand.label}
              count={brand.count}
              checked={isChecked("brand", brand.value)}
              onChange={(checked) =>
                updateFilter("brand", brand.value, checked)
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Price Range */}
      <FilterGroup title="Price Range">
        <div className="flex gap-2 items-center">
          <PriceInput
            placeholder="Min"
            value={searchParams.get("minPrice") || ""}
            onChange={(val) => {
              const params = new URLSearchParams(searchParams.toString());
              if (val) params.set("minPrice", val);
              else params.delete("minPrice");
              params.delete("page");
              router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }}
          />
          <span className="text-neutral-400">—</span>
          <PriceInput
            placeholder="Max"
            value={searchParams.get("maxPrice") || ""}
            onChange={(val) => {
              const params = new URLSearchParams(searchParams.toString());
              if (val) params.set("maxPrice", val);
              else params.delete("maxPrice");
              params.delete("page");
              router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }}
          />
        </div>
      </FilterGroup>

      {/* RAM */}
      {filters.ramOptions.length > 0 && (
        <FilterGroup title="RAM">
          {filters.ramOptions.map((ram) => (
            <FilterCheckbox
              key={ram.value}
              label={ram.label}
              checked={isChecked("ram", ram.value)}
              onChange={(checked) =>
                updateFilter("ram", ram.value, checked)
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Storage */}
      {filters.storageOptions.length > 0 && (
        <FilterGroup title="Storage">
          {filters.storageOptions.map((s) => (
            <FilterCheckbox
              key={s.value}
              label={s.label}
              checked={isChecked("storage", s.value)}
              onChange={(checked) =>
                updateFilter("storage", s.value, checked)
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Storage Type */}
      {filters.storageTypes.length > 1 && (
        <FilterGroup title="Storage Type">
          {filters.storageTypes.map((t) => (
            <FilterCheckbox
              key={t.value}
              label={t.label}
              checked={isChecked("storageType", t.value)}
              onChange={(checked) =>
                updateFilter("storageType", t.value, checked)
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Operating System */}
      {filters.osOptions.length > 1 && (
        <FilterGroup title="Operating System">
          {filters.osOptions.map((o) => (
            <FilterCheckbox
              key={o.value}
              label={o.label}
              checked={isChecked("os", o.value)}
              onChange={(checked) =>
                updateFilter("os", o.value, checked)
              }
            />
          ))}
        </FilterGroup>
      )}
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 text-sm hover:bg-neutral-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
      />
      <span className="text-neutral-700">{label}</span>
      {count !== undefined && (
        <span className="ml-auto text-xs text-neutral-400">({count})</span>
      )}
    </label>
  );
}

function PriceInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
        $
      </span>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 py-1.5 pl-5 pr-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}
