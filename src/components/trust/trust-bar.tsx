import { Shield, RotateCcw, CheckCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    icon: Shield,
    label: "12-Month Warranty",
    description: "Full coverage on every device",
  },
  {
    icon: RotateCcw,
    label: "30-Day Returns",
    description: "Hassle-free return policy",
  },
  {
    icon: CheckCircle,
    label: "30-Point Tested",
    description: "Rigorous quality inspection",
  },
  {
    icon: Lock,
    label: "Secure Payments",
    description: "Encrypted checkout via Stripe",
  },
];

interface TrustBarProps {
  variant?: "light" | "dark";
  className?: string;
}

export function TrustBar({ variant = "light", className }: TrustBarProps) {
  return (
    <div
      className={cn(
        "py-6",
        variant === "dark" ? "bg-neutral-900" : "bg-primary-50",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  variant === "dark"
                    ? "bg-primary-500/20 text-primary-400"
                    : "bg-primary-500/10 text-primary-600"
                )}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    variant === "dark" ? "text-white" : "text-neutral-900"
                  )}
                >
                  {item.label}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    variant === "dark" ? "text-neutral-400" : "text-neutral-500"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
