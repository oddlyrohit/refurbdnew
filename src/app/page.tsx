import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  Monitor,
  Search,
  ClipboardCheck,
  PiggyBank,
  Shield,
  RotateCcw,
  CheckCircle,
  Leaf,
  Heart,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/actions/product-actions";
import { PRODUCT_GRADES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-white">
          {/* Warm gradient orbs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-100/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.08] tracking-tight">
                Refurbished tech you can{" "}
                <span className="relative">
                  <span className="text-primary-500">actually trust</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5C47 2 154 2 199 5.5" stroke="#0d7377" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                  </svg>
                </span>
              </h1>

              <p className="animate-fade-in-up animation-delay-200 mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Every laptop and desktop is inspected, graded honestly, and
                backed by a real 12-month warranty. Australian-owned, shipping
                across AU & NZ.
              </p>

              <div className="animate-fade-in-up animation-delay-400 mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/products/laptops">
                  <Button size="lg" variant="primary" className="text-base px-8 h-14 shadow-lg shadow-primary-500/20">
                    <Laptop className="h-5 w-5" />
                    Shop Laptops
                  </Button>
                </Link>
                <Link href="/products/desktops">
                  <Button size="lg" variant="outline" className="text-base px-8 h-14">
                    <Monitor className="h-5 w-5" />
                    Shop Desktops
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TRUST PROMISES ==================== */}
        <section className="bg-primary-500 py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: Shield, text: "12-Month Warranty" },
                { icon: RotateCcw, text: "30-Day Returns" },
                { icon: CheckCircle, text: "30-Point Tested" },
                { icon: Leaf, text: "Eco-Friendly Choice" },
              ].map((item) => (
                <div key={item.text} className="flex items-center justify-center gap-2 text-white">
                  <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FEATURED PRODUCTS ==================== */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Featured Devices
                </h2>
                <p className="mt-2 text-neutral-500">
                  Quality-checked and ready to ship
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: ProductCardData) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {featuredProducts.length === 0 && (
              <div className="text-center py-16">
                <Laptop className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                <p className="text-neutral-500">Products coming soon. Check back shortly.</p>
              </div>
            )}
            <div className="mt-8 text-center sm:hidden">
              <Link href="/products">
                <Button variant="outline">
                  View All Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== WHY REFURBD ==================== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-neutral-900">
                Why Buy Refurbished from Us?
              </h2>
              <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">
                We do things differently. No gimmicks — just honest quality at fair prices.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: "Honestly Graded",
                  description: "Every device is graded on a clear 5-tier system. We show you exactly what to expect — no surprises. What you see is what you get.",
                  color: "bg-emerald-50 text-emerald-600 border-emerald-100",
                },
                {
                  icon: Shield,
                  title: "12-Month Warranty",
                  description: "Every device comes with a full 12-month warranty. If something goes wrong, we'll make it right. That's our promise, not a marketing line.",
                  color: "bg-primary-50 text-primary-600 border-primary-100",
                },
                {
                  icon: Heart,
                  title: "Better for the Planet",
                  description: "Buying refurbished keeps electronics out of landfill and reduces the demand for new manufacturing. Good tech doesn't need to be new.",
                  color: "bg-amber-50 text-amber-600 border-amber-100",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-100 bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl border ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-neutral-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CATEGORY SHOWCASE ==================== */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-10 text-center">
              Shop by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/products/laptops"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 p-10 lg:p-14 text-white transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
                <div className="relative z-10">
                  <Laptop className="h-12 w-12 mb-5 opacity-90" />
                  <h3 className="text-2xl lg:text-3xl font-bold">Laptops</h3>
                  <p className="mt-2 text-white/80 max-w-xs">
                    Ultrabooks, workstations & everyday laptops from Dell, HP, Lenovo, Apple & more.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Browse Laptops{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>

              <Link
                href="/products/desktops"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-800 p-10 lg:p-14 text-white transition-all duration-300 hover:shadow-xl hover:shadow-neutral-700/25"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
                <div className="relative z-10">
                  <Monitor className="h-12 w-12 mb-5 opacity-90" />
                  <h3 className="text-2xl lg:text-3xl font-bold">Desktops & PCs</h3>
                  <p className="mt-2 text-white/70 max-w-xs">
                    Towers, small form factors & all-in-ones for office or home.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Browse Desktops{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-neutral-900">
                How It Works
              </h2>
              <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">
                From sourcing to your doorstep — here&apos;s our process.
              </p>
            </div>

            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-14 left-[16.67%] right-[16.67%] h-px bg-primary-200" />

              <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                {[
                  {
                    icon: Search,
                    num: "1",
                    title: "We Source Carefully",
                    description: "We work with trusted Australian suppliers and certified businesses — no mystery stock, no grey imports.",
                  },
                  {
                    icon: ClipboardCheck,
                    num: "2",
                    title: "We Test & Grade Honestly",
                    description: "Every device goes through a 30-point inspection. We grade it on a clear 5-tier scale — what you see is what you get.",
                  },
                  {
                    icon: PiggyBank,
                    num: "3",
                    title: "You Save (a lot)",
                    description: "Quality refurbished tech at fair prices, backed by our 12-month warranty and 30-day hassle-free returns.",
                  },
                ].map((step) => (
                  <div key={step.title} className="text-center relative">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary-50 border-4 border-white shadow-md relative z-10">
                      <step.icon className="h-10 w-10 text-primary-500" />
                    </div>
                    <div className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm font-bold">
                      {step.num}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-neutral-500 leading-relaxed max-w-sm mx-auto">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== GRADING SYSTEM ==================== */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900">
                Our Grading System
              </h2>
              <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">
                No vague labels. Five clear grades so you know exactly what you&apos;re buying.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRODUCT_GRADES.map((grade) => {
                const styles: Record<string, string> = {
                  emerald: "border-l-emerald-500 hover:bg-emerald-50/80",
                  green: "border-l-green-500 hover:bg-green-50/80",
                  blue: "border-l-blue-500 hover:bg-blue-50/80",
                  amber: "border-l-amber-500 hover:bg-amber-50/80",
                  gray: "border-l-gray-400 hover:bg-gray-50/80",
                };
                const dotColor: Record<string, string> = {
                  emerald: "bg-emerald-500",
                  green: "bg-green-500",
                  blue: "bg-blue-500",
                  amber: "bg-amber-500",
                  gray: "bg-gray-400",
                };
                return (
                  <div
                    key={grade.value}
                    className={`rounded-xl bg-white border border-neutral-100 border-l-4 p-5 transition-all hover:shadow-md ${styles[grade.color] || ""}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${dotColor[grade.color] || ""}`} />
                      <h3 className="text-sm font-bold text-neutral-900">{grade.label}</h3>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">{grade.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link href="/grading">
                <Button variant="outline">
                  See Full Grading Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== NEWSLETTER CTA ==================== */}
        <section className="bg-primary-500 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Mail className="mx-auto h-8 w-8 text-white/80 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get $10 Off Your First Order
            </h2>
            <p className="mt-3 text-primary-100 max-w-lg mx-auto">
              Join our mailing list for new arrivals and exclusive deals. No spam — just good tech at good prices.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl bg-white/15 border border-white/20 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button
                type="submit"
                className="rounded-xl bg-white text-primary-600 font-semibold px-8 py-3.5 hover:bg-primary-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
