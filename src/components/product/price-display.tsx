import { formatPrice, formatSavings } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const savings =
    compareAtPrice && compareAtPrice > price
      ? formatSavings(compareAtPrice, price)
      : null;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn("font-bold text-neutral-900", {
          "text-lg": size === "sm",
          "text-2xl": size === "md",
          "text-3xl": size === "lg",
        })}
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <span
          className={cn("text-neutral-400 line-through", {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          })}
        >
          {formatPrice(compareAtPrice)}
        </span>
      )}
      {savings && (
        <span
          className={cn("font-medium text-success-600", {
            "text-xs": size === "sm",
            "text-sm": size === "md",
            "text-base": size === "lg",
          })}
        >
          Save {savings.percentage}%
        </span>
      )}
    </div>
  );
}
