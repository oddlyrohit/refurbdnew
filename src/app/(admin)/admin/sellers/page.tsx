import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { Plus, Edit, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminSellersPage() {
  const sellers = await prisma.seller.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Sellers</h1>
          <p className="mt-1 text-neutral-500">
            {sellers.length} seller{sellers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/sellers/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Seller
          </Button>
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Seller</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden sm:table-cell">Code</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden md:table-cell">Contact</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500">Commission</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500 hidden md:table-cell">Products</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500">Status</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sellers.map((seller) => (
              <tr key={seller.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                      <Store className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-neutral-900">
                      {seller.businessName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="font-mono text-xs text-neutral-500">{seller.code}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="text-neutral-900 text-sm">{seller.contactName}</p>
                  <p className="text-neutral-500 text-xs">{seller.email}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-medium text-neutral-900">
                    {Number(seller.commissionRate)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell text-neutral-600">
                  {seller._count.products}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={seller.isActive ? "success" : "neutral"}>
                    {seller.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/sellers/${seller.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
