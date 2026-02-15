import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  Monitor,
  Search,
  ClipboardCheck,
  PiggyBank,
  Star,
  Zap,
  TrendingUp,
  Award,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { TrustBar } from "@/components/trust/trust-bar";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/actions/product-actions";
import { PRODUCT_GRADES } from "@/lib/constants";

export const dynamic = "force-dynamic";

// Static reviews
const reviews = [
  {
    name: "James T.",
    location: "Sydney, NSW",
    rating: 5,
    text: "Incredible value! My refurbished ThinkPad looks and runs like new. The grading system made it easy to know exactly what I was getting.",
    product: "Lenovo ThinkPad X1",
  },
  {
    name: "Sarah M.",
    location: "Melbourne, VIC",
    rating: 5,
    text: "Ordered a Dell laptop for my home office. Arrived fast, well-packaged, and works perfectly. Will definitely buy again.",
    product: "Dell Latitude 5520",
  },
  {
    name: "Mike R.",
    location: "Auckland, NZ",
    rating: 5,
    text: "Great experience. The 12-month warranty gave me confidence to buy refurbished for the first time. Highly recommend!",
    product: "HP EliteBook 840",
  },
  {
    name: "Priya K.",
    location: "Brisbane, QLD",
    rating: 5,
    text: "Bought 5 desktops for our small business. Saved thousands compared to new. Quality was exactly as described.",
    product: "Dell OptiPlex 7080",
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 animate-gradient">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
            <div className="max-w-3xl">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-300 mb-6">
                  <Zap className="h-4 w-4" />
                  Premium Refurbished Tech — AU & NZ
                </span>
              </div>

              <h1 className="animate-fade-in-up animation-delay-200 text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Save up to 60% on{" "}
                <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                  top-brand laptops & PCs
                </span>
              </h1>

              <p className="animate-fade-in-up animation-delay-400 mt-6 text-lg sm:text-xl text-neutral-300 max-w-xl leading-relaxed">
                Every device tested, certified, and backed by a 12-month
                warranty. Quality you can trust, prices you&apos;ll love.
              </p>

              <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-wrap gap-4">
                <Link href="/products/laptops">
                  <Button size="lg" variant="primary" className="text-base px-8 h-14">
                    <Laptop className="h-5 w-5" />
                    Shop Laptops
                  </Button>
                </Link>
                <Link href="/products/desktops">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-base px-8 h-14 text-white border-2 border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Monitor className="h-5 w-5" />
                    Shop Desktops
                  </Button>
                </Link>
              </div>

              {/* Floating stat pills */}
              <div className="animate-fade-in-up animation-delay-600 mt-12 flex flex-wrap gap-3">
                {[
                  { label: "Devices Sold", value: "2,000+" },
                  { label: "Customer Rating", value: "4.8★" },
                  { label: "Avg Savings", value: "Up to 60%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2"
                  >
                    <span className="text-sm font-bold text-primary-400">
                      {stat.value}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TRUST BAR (Glass) ==================== */}
        <TrustBar variant="glass" />

        {/* ==================== FEATURED PRODUCTS ==================== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Popular Right Now
                </h2>
                <p className="mt-2 text-neutral-500">
                  Hand-picked deals on our most popular devices
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
              >
                View All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: ProductCardData) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/products">
                <Button variant="outline">
                  View All Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
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
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-10 lg:p-14 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/20"
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3), transparent 60%)" }} />
                <div className="relative z-10">
                  <Laptop className="h-14 w-14 mb-5 opacity-80" />
                  <h3 className="text-3xl font-bold">Refurbished Laptops</h3>
                  <p className="mt-3 text-primary-100 max-w-xs text-lg">
                    From ultrabooks to workstations. All brands, all budgets.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    Shop Now{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>

              <Link
                href="/products/desktops"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-10 lg:p-14 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-neutral-800/30"
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.2), transparent 60%)" }} />
                <div className="relative z-10">
                  <Monitor className="h-14 w-14 mb-5 opacity-80" />
                  <h3 className="text-3xl font-bold">Refurbished Desktops</h3>
                  <p className="mt-3 text-neutral-300 max-w-xs text-lg">
                    Towers, small form factors, and all-in-ones for office or home.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    Shop Now{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== STATS BAR ==================== */}
        <section className="bg-neutral-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, value: "2,000+", label: "Devices Sold" },
                { icon: Award, value: "12mo", label: "Warranty Included" },
                { icon: Zap, value: "60%", label: "Average Savings" },
                { icon: Star, value: "4.8★", label: "Customer Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 mb-4">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-neutral-900">
                How Refurbd Works
              </h2>
              <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">
                Every device goes through our rigorous process before reaching you.
              </p>
            </div>

            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

              <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                {[
                  {
                    icon: Search,
                    step: "01",
                    title: "We Source",
                    description:
                      "We partner with certified suppliers and businesses to source quality pre-owned devices from trusted channels.",
                  },
                  {
                    icon: ClipboardCheck,
                    step: "02",
                    title: "We Test & Grade",
                    description:
                      "Every device undergoes our 30-point quality inspection. We grade each one honestly so you know exactly what you're getting.",
                  },
                  {
                    icon: PiggyBank,
                    step: "03",
                    title: "You Save",
                    description:
                      "Get premium tech at up to 60% off retail, backed by our 12-month warranty and 30-day returns.",
                  },
                ].map((step) => (
                  <div key={step.title} className="text-center relative">
                    {/* Step number circle */}
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-primary-200 shadow-lg shadow-primary-100/50 relative z-10">
                      <div className="flex flex-col items-center">
                        <step.icon className="h-8 w-8 text-primary-500" />
                      </div>
                    </div>
                    <span className="inline-block mt-4 text-xs font-bold text-primary-500 bg-primary-50 rounded-full px-3 py-1 tracking-wider uppercase">
                      Step {step.step}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-neutral-500 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== GRADING SYSTEM ==================== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900">
                Our Grading System
              </h2>
              <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">
                We grade every device honestly so you always know what to expect.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRODUCT_GRADES.map((grade) => {
                const borderColorMap: Record<string, string> = {
                  emerald: "border-l-emerald-500 bg-emerald-50/50",
                  green: "border-l-green-500 bg-green-50/50",
                  blue: "border-l-blue-500 bg-blue-50/50",
                  amber: "border-l-amber-500 bg-amber-50/50",
                  gray: "border-l-gray-400 bg-gray-50/50",
                };
                const dotColorMap: Record<string, string> = {
                  emerald: "bg-emerald-500",
                  green: "bg-green-500",
                  blue: "bg-blue-500",
                  amber: "bg-amber-500",
                  gray: "bg-gray-400",
                };
                return (
                  <div
                    key={grade.value}
                    className={`rounded-xl border border-neutral-100 border-l-4 p-5 transition-shadow hover:shadow-md ${borderColorMap[grade.color] || ""}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${dotColorMap[grade.color] || ""}`}
                      />
                      <h3 className="text-sm font-bold text-neutral-900">
                        {grade.label}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {grade.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link href="/grading">
                <Button variant="outline">
                  Learn More About Our Grading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== CUSTOMER REVIEWS ==================== */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900">
                What Our Customers Say
              </h2>
              <p className="mt-3 text-neutral-500 text-lg">
                Join thousands of happy customers across Australia & New Zealand
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-neutral-200 bg-white p-8 transition-shadow hover:shadow-lg"
                >
                  {/* Decorative quote */}
                  <span className="absolute top-4 right-6 text-6xl font-serif text-primary-100 leading-none select-none">
                    &ldquo;
                  </span>

                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "fill-secondary-500 text-secondary-500"
                            : "text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-neutral-600 leading-relaxed relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {review.name}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {review.location}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-success-600 bg-success-50 rounded-full px-3 py-1">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== NEWSLETTER CTA ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Mail className="mx-auto h-10 w-10 text-primary-400 mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Get $10 Off Your First Order
            </h2>
            <p className="mt-4 text-neutral-300 text-lg max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and
              tech tips delivered to your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-white/10 border border-white/10 px-5 py-3.5 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
              />
              <Button variant="primary" className="px-8 py-3.5 h-auto text-base rounded-xl">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-xs text-neutral-500">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
