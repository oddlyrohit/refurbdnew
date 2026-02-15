import { cn } from "@/lib/utils";

interface Spec {
  label: string;
  value: string | number | null | undefined;
}

interface SpecsTableProps {
  specs: Spec[];
  className?: string;
}

export function SpecsTable({ specs, className }: SpecsTableProps) {
  const filteredSpecs = specs.filter(
    (s) => s.value !== null && s.value !== undefined && s.value !== ""
  );

  if (filteredSpecs.length === 0) return null;

  return (
    <div className={cn("overflow-hidden rounded-lg border border-neutral-200", className)}>
      <table className="w-full text-sm">
        <tbody>
          {filteredSpecs.map((spec, index) => (
            <tr
              key={spec.label}
              className={index % 2 === 0 ? "bg-neutral-50" : "bg-white"}
            >
              <td className="px-4 py-2.5 font-medium text-neutral-600 w-1/3">
                {spec.label}
              </td>
              <td className="px-4 py-2.5 font-mono text-neutral-900">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
