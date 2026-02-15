import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatters";

export const dynamic = "force-dynamic";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const statusVariant: Record<string, "warning" | "info" | "success" | "danger" | "neutral"> = {
  PENDING: "warning",
  CONFIRMED: "info",
  PROCESSING: "info",
  SHIPPED: "success",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "neutral",
};

export default async function AdminDashboard() {
  const [
    totalRevenue,
    totalOrders,
    activeProducts,
    totalCustomers,
    pendingOrders,
    recentOrders,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }),
    prisma.order.count(),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        items: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(Number(totalRevenue._sum.total || 0)),
      icon: DollarSign,
      color: "bg-success-50 text-success-500",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-primary-50 text-primary-500",
    },
    {
      label: "Active Products",
      value: activeProducts.toString(),
      icon: Package,
      color: "bg-trust-50 text-trust-500",
    },
    {
      label: "Customers",
      value: totalCustomers.toString(),
      icon: Users,
      color: "bg-secondary-50 text-secondary-500",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="mt-1 text-neutral-500">
            Overview of your store&apos;s performance.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">{stat.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-neutral-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pending Orders Alert */}
      {pendingOrders > 0 && (
        <Link
          href="/admin/orders?status=PENDING"
          className="mt-6 flex items-center gap-3 rounded-xl border border-secondary-200 bg-secondary-50 p-4 hover:bg-secondary-100 transition-colors"
        >
          <Clock className="h-5 w-5 text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">
            {pendingOrders} order{pendingOrders !== 1 ? "s" : ""} pending review
          </span>
          <ArrowUpRight className="h-4 w-4 text-secondary-600 ml-auto" />
        </Link>
      )}

      {/* Quick Actions */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Add Product</p>
            <p className="text-xs text-neutral-500">List a new item</p>
          </div>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust-50 text-trust-500">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Manage Orders</p>
            <p className="text-xs text-neutral-500">View and process orders</p>
          </div>
        </Link>
        <Link
          href="/admin/analytics"
          className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-500">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Analytics</p>
            <p className="text-xs text-neutral-500">View sales reports</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            View all
          </Link>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-4 py-3 text-left font-medium text-neutral-500">Order</th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500 hidden sm:table-cell">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-neutral-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono text-xs font-medium text-primary-500 hover:text-primary-600"
                      >
                        {order.orderNumber}
                      </Link>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-AU")}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-neutral-900">
                        {order.user
                          ? `${order.user.firstName || ""} ${order.user.lastName || ""}`.trim() || order.user.email
                          : order.guestEmail || "Guest"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[order.status] || "neutral"}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-neutral-900">
                      {formatPrice(Number(order.total))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
