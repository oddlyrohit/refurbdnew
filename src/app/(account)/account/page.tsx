import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Heart, MapPin, ArrowRight } from "lucide-react";

export default async function AccountDashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  let stats = { orders: 0, wishlist: 0, addresses: 0 };

  if (userId) {
    const [orders, wishlist, addresses] = await Promise.all([
      prisma.order.count({ where: { userId } }),
      prisma.wishlistItem.count({ where: { userId } }),
      prisma.address.count({ where: { userId } }),
    ]);
    stats = { orders, wishlist, addresses };
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">
        Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
      </h1>
      <p className="mt-1 text-neutral-500">
        Manage your orders, addresses, and preferences.
      </p>

      {/* Quick Stats */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Link
          href="/account/orders"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">{stats.orders}</p>
            <p className="text-sm text-neutral-500">Orders</p>
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-danger-50 text-danger-500">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">
              {stats.wishlist}
            </p>
            <p className="text-sm text-neutral-500">Wishlist</p>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-trust-50 text-trust-500">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">
              {stats.addresses}
            </p>
            <p className="text-sm text-neutral-500">Addresses</p>
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="space-y-2">
          {[
            { href: "/products", label: "Browse Products", desc: "Find your next refurbished gem" },
            { href: "/account/orders", label: "View Orders", desc: "Track your order status" },
            { href: "/account/settings", label: "Account Settings", desc: "Update your profile and password" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 hover:border-primary-200 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {link.label}
                </p>
                <p className="text-xs text-neutral-500">{link.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
