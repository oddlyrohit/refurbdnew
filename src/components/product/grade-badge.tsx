import { Badge } from "@/components/ui/badge";
import { PRODUCT_GRADES } from "@/lib/constants";

interface GradeBadgeProps {
  grade: string;
  size?: "sm" | "md";
}

const gradeColorMap: Record<string, "emerald" | "green" | "blue" | "amber" | "gray"> = {
  CERTIFIED_REFURBISHED: "emerald",
  EXCELLENT: "green",
  GOOD: "blue",
  FAIR: "amber",
  ACCEPTABLE: "gray",
};

export function GradeBadge({ grade, size = "sm" }: GradeBadgeProps) {
  const gradeInfo = PRODUCT_GRADES.find((g) => g.value === grade);
  const color = gradeColorMap[grade] || "neutral";

  return (
    <Badge variant={color} size={size}>
      {gradeInfo?.shortLabel || grade}
    </Badge>
  );
}
