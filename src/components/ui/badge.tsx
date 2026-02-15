import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "neutral"
    | "emerald"
    | "green"
    | "blue"
    | "amber"
    | "gray";
  size?: "sm" | "md";
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary-100 text-primary-800",
  secondary: "bg-secondary-100 text-secondary-800",
  success: "bg-success-100 text-success-800",
  danger: "bg-danger-100 text-danger-800",
  warning: "bg-secondary-100 text-secondary-800",
  info: "bg-trust-100 text-trust-800",
  neutral: "bg-neutral-100 text-neutral-700",
  emerald: "bg-emerald-100 text-emerald-800",
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  gray: "bg-gray-100 text-gray-800",
};

export function Badge({
  className,
  variant = "primary",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantStyles[variant] || variantStyles.primary,
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-2.5 py-1 text-sm": size === "md",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
