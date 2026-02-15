export interface ProductFilters {
  category?: string;
  grade?: string[];
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  processor?: string[];
  ram?: number[];
  storage?: number[];
  storageType?: string[];
  screenSize?: string[];
  os?: string[];
  sort?: "relevance" | "price-asc" | "price-desc" | "newest" | "grade";
  search?: string;
  page?: number;
  limit?: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface AvailableFilters {
  brands: FilterOption[];
  grades: FilterOption[];
  ramOptions: FilterOption[];
  storageOptions: FilterOption[];
  storageTypes: FilterOption[];
  osOptions: FilterOption[];
  priceRange: { min: number; max: number };
}
