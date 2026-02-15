import { cn } from "@/lib/utils";

interface StockIndicatorProps {
  quantity: number;
  threshold?: number;
}

export function StockIndicator({
  quantity,
  threshold = 3,
}: StockIndicatorProps) {
  if (quantity === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-danger-600">
        <span className="h-2 w-2 rounded-full bg-danger-500" />
        Out of Stock
      </span>
    );
  }

  if (quantity <= threshold) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-600">
        <span className="h-2 w-2 rounded-full bg-secondary-500" />
        Only {quantity} left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success-600">
      <span className="h-2 w-2 rounded-full bg-success-500" />
      In Stock
    </span>
  );
}
