import { CURRENCY_SYMBOL, GST_RATE } from "./constants";

export function formatPrice(priceInDollars: number): string {
  return `${CURRENCY_SYMBOL}${priceInDollars.toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatSavings(
  originalPrice: number,
  salePrice: number
): { amount: string; percentage: number } {
  const savingsAmount = originalPrice - salePrice;
  const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);
  return {
    amount: formatPrice(savingsAmount),
    percentage: savingsPercentage,
  };
}

export function calculateGST(totalIncGST: number): number {
  return totalIncGST / (1 + 1 / GST_RATE);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatOrderNumber(id: string, date: Date): string {
  const dateStr = new Date(date)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  return `RFB-${dateStr}-${id.slice(-4).toUpperCase()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
