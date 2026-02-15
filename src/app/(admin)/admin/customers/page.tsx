import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Customers</h1>
        <p className="mt-1 text-neutral-500">
          {customers.length} registered customer{customers.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500">Orders</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden md:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-400">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No customers yet
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-neutral-900">
                      {`${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-neutral-600">
                    {customer.email}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-500">
                    {customer.phone || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={customer._count.orders > 0 ? "primary" : "neutral"}>
                      {customer._count.orders}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-neutral-500">
                    {new Date(customer.createdAt).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
