"use client";

import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/formatters";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: { title: string; sold: number; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
        <div className="mt-6 h-64 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
      <p className="mt-1 text-neutral-500">Sales performance and insights.</p>

      {/* Summary Cards */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Revenue</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-success-500">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-neutral-900">
            {formatPrice(data.totalRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Orders</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-neutral-900">
            {data.totalOrders}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Avg. Order Value</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-trust-50 text-trust-500">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-neutral-900">
            {formatPrice(data.averageOrderValue)}
          </p>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Orders by Status</h2>
        <div className="space-y-3">
          {data.ordersByStatus.map((item) => {
            const percentage = data.totalOrders > 0 ? (item.count / data.totalOrders) * 100 : 0;
            return (
              <div key={item.status}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-neutral-700">{item.status}</span>
                  <span className="text-neutral-500">{item.count} ({percentage.toFixed(0)}%)</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-neutral-400" />
            Top Products
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 text-left font-medium text-neutral-500">Product</th>
              <th className="px-4 py-3 text-center font-medium text-neutral-500">Units Sold</th>
              <th className="px-4 py-3 text-right font-medium text-neutral-500">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.topProducts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-neutral-400">
                  No sales data yet
                </td>
              </tr>
            ) : (
              data.topProducts.map((product, i) => (
                <tr key={i} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">{product.title}</td>
                  <td className="px-4 py-3 text-center text-neutral-600">{product.sold}</td>
                  <td className="px-4 py-3 text-right font-medium text-neutral-900">
                    {formatPrice(product.revenue)}
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
