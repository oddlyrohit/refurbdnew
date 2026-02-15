import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { Plus, Edit, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";

const gradeVariant: Record<string, "emerald" | "green" | "blue" | "amber" | "gray"> = {
  CERTIFIED_REFURBISHED: "emerald",
  EXCELLENT: "green",
  GOOD: "blue",
  FAIR: "amber",
  ACCEPTABLE: "gray",
};

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  ACTIVE: "success",
  DRAFT: "warning",
  ARCHIVED: "neutral",
};

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
      seller: { select: { code: true, businessName: true } },
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
          <p className="mt-1 text-neutral-500">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Product</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden md:table-cell">SKU</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden lg:table-cell">Grade</th>
              <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-500">Price</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500 hidden md:table-cell">Stock</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Archive className="h-4 w-4 text-neutral-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-900 truncate max-w-[200px]">
                        {product.title}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {product.brand.name} • {product.category.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-neutral-500">{product.sku}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <Badge variant={gradeVariant[product.grade] || "gray"}>
                    {product.grade.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <Badge variant={statusVariant[product.status] || "neutral"}>
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium text-neutral-900">
                  {formatPrice(Number(product.price))}
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <span className={product.stockQuantity <= product.lowStockThreshold ? "text-danger-500 font-medium" : "text-neutral-600"}>
                    {product.stockQuantity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
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
