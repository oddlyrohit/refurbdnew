import { CheckCircle, Star, ThumbsUp, Minus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const grades = [
  {
    name: "Certified Refurbished",
    badge: "emerald" as const,
    icon: Star,
    description: "Like new condition. Manufacturer or Refurbd certified.",
    cosmetic: "Flawless — no visible scratches, dents, or marks",
    screen: "Perfect — no scratches or dead pixels",
    battery: "90-100% health",
    includes: "Original or premium packaging, all accessories",
    warranty: "12-month warranty",
  },
  {
    name: "Excellent",
    badge: "green" as const,
    icon: CheckCircle,
    description: "Minimal signs of use. Barely distinguishable from new.",
    cosmetic: "Near-perfect — may have 1-2 barely noticeable micro-scratches",
    screen: "Excellent — no visible scratches under normal use",
    battery: "85-100% health",
    includes: "Generic packaging, charger included",
    warranty: "12-month warranty",
  },
  {
    name: "Good",
    badge: "blue" as const,
    icon: ThumbsUp,
    description: "Minor cosmetic wear. Fully functional, great value.",
    cosmetic: "Light wear — small scratches or minor scuffs visible on close inspection",
    screen: "Good — may have very light scratches, not visible when screen is on",
    battery: "80-95% health",
    includes: "Generic packaging, charger included",
    warranty: "12-month warranty",
  },
  {
    name: "Fair",
    badge: "amber" as const,
    icon: Minus,
    description: "Noticeable cosmetic wear. Fully functional, best price.",
    cosmetic: "Visible scratches, scuffs, or minor dents on the casing",
    screen: "Fair — may have light scratches visible when screen is off",
    battery: "75-90% health",
    includes: "Generic packaging, charger included",
    warranty: "12-month warranty",
  },
  {
    name: "Acceptable",
    badge: "gray" as const,
    icon: AlertTriangle,
    description: "Significant cosmetic wear. Fully functional, lowest price.",
    cosmetic: "Heavy scratches, dents, or discolouration on casing",
    screen: "Acceptable — scratches may be faintly visible when screen is on",
    battery: "70-85% health",
    includes: "Generic packaging, charger included",
    warranty: "12-month warranty",
  },
];

export const metadata = {
  title: "Grading System",
  description: "Understand our 5-tier grading system for refurbished devices.",
};

export default function GradingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900">Our Grading System</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Every device is thoroughly tested and graded on a 5-tier scale. All grades
          are fully functional — the grade reflects cosmetic condition only.
        </p>
      </div>

      <div className="space-y-6">
        {grades.map((grade) => (
          <div
            key={grade.name}
            className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
          >
            <div className="flex items-center gap-4 p-6 border-b border-neutral-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-50">
                <grade.icon className="h-6 w-6 text-neutral-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-neutral-900">{grade.name}</h2>
                  <Badge variant={grade.badge}>{grade.name}</Badge>
                </div>
                <p className="text-sm text-neutral-500 mt-0.5">{grade.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
              {[
                { label: "Cosmetic Condition", value: grade.cosmetic },
                { label: "Screen", value: grade.screen },
                { label: "Battery Health", value: grade.battery },
                { label: "Packaging", value: grade.includes },
                { label: "Warranty", value: grade.warranty },
              ].map((spec) => (
                <div key={spec.label} className="bg-white p-4">
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-sm text-neutral-900">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-primary-50 p-8 text-center">
        <h2 className="text-xl font-bold text-primary-900">Every Grade, Fully Tested</h2>
        <p className="mt-2 text-primary-700 max-w-xl mx-auto">
          Regardless of grade, every device undergoes our rigorous 30-point quality
          check. We test all hardware, software, and connectivity to ensure you receive
          a fully functional device.
        </p>
      </div>
    </div>
  );
}
