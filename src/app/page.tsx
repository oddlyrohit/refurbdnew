import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Laptop,
  Monitor,
  Search,
  Truck,
  ClipboardCheck,
  PiggyBank,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { TrustBar } from "@/components/trust/trust-bar";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";
import { PRODUCT_GRADES } from "@/lib/constants";

// Placeholder featured products (will be replaced with DB query)
const featuredProducts: ProductCardData[] = [
  {
    id: "1",
    slug: "dell-latitude-5520-i7-16gb-512gb",
    title: 'Dell Latitude 5520 15.6" i7-1185G7 16GB 512GB SSD',
    price: 899,
    compareAtPrice: 1899,
    grade: "EXCELLENT",
    brand: "Dell",
    stockQuantity: 5,
  },
  {
    id: "2",
    slug: "hp-elitebook-840-g8-i5-16gb-256gb",
    title: 'HP EliteBook 840 G8 14" i5-1145G7 16GB 256GB SSD',
    price: 749,
    compareAtPrice: 1599,
    grade: "GOOD",
    brand: "HP",
    stockQuantity: 3,
  },
  {
    id: "3",
    slug: "lenovo-thinkpad-x1-carbon-gen9-i7",
    title: 'Lenovo ThinkPad X1 Carbon Gen 9 14" i7 16GB 512GB',
    price: 1099,
    compareAtPrice: 2499,
    grade: "CERTIFIED_REFURBISHED",
    brand: "Lenovo",
    stockQuantity: 2,
  },
  {
    id: "4",
    slug: "apple-macbook-air-m1-8gb-256gb",
    title: 'Apple MacBook Air M1 13.3" 8GB 256GB SSD',
    price: 849,
    compareAtPrice: 1499,
    grade: "EXCELLENT",
    brand: "Apple",
    stockQuantity: 4,
  },
  {
    id: "5",
    slug: "dell-optiplex-7080-i7-16gb-512gb",
    title: "Dell OptiPlex 7080 SFF i7-10700 16GB 512GB SSD Desktop",
    price: 599,
    compareAtPrice: 1299,
    grade: "GOOD",
    brand: "Dell",
    stockQuantity: 7,
  },
  {
    id: "6",
    slug: "hp-probook-450-g8-i5-8gb-256gb",
    title: 'HP ProBook 450 G8 15.6" i5-1135G7 8GB 256GB SSD',
    price: 549,
    compareAtPrice: 1199,
    grade: "FAIR",
    brand: "HP",
    stockQuantity: 6,
  },
];

// Placeholder reviews
const reviews = [
  {
    name: "James",
    location: "Sydney",
    rating: 5,
    text: "Incredible value! My refurbished ThinkPad looks and runs like new. The grading system made it easy to know exactly what I was getting.",
  },
  {
    name: "Sarah",
    location: "Melbourne",
    rating: 5,
    text: "Ordered a Dell laptop for my home office. Arrived fast, well-packaged, and works perfectly. Will definitely buy again.",
  },
  {
    name: "Mike",
    location: "Auckland",
    rating: 4,
    text: "Great experience. The 12-month warranty gave me confidence to buy refurbished for the first time. Highly recommend!",
  },
  {
    name: "Priya",
    location: "Brisbane",
    rating: 5,
    text: "Bought 5 desktops for our small business. Saved thousands compared to new. Quality was exactly as described.",
  },
];

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Premium Refurbished Tech.{" "}
                  <span className="text-primary-500">
                    Fraction of the Price.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-neutral-600 max-w-lg">
                  Every device tested, certified, and backed by our 12-month
                  warranty. Save up to 60% on laptops and PCs from top brands.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/products/laptops">
                    <Button size="lg" variant="primary">
                      <Laptop className="h-5 w-5" />
                      Shop Laptops
                    </Button>
                  </Link>
                  <Link href="/products/desktops">
                    <Button size="lg" variant="outline">
                      <Monitor className="h-5 w-5" />
                      Shop Desktops
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <Laptop className="h-48 w-48 text-primary-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar />

        {/* Featured Products */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-900">
                Popular Right Now
              </h2>
              <Link
                href="/products"
                className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Showcase */}
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/products/laptops"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 lg:p-12 text-white transition-transform hover:scale-[1.02]"
              >
                <div className="relative z-10">
                  <Laptop className="h-12 w-12 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">Refurbished Laptops</h3>
                  <p className="mt-2 text-primary-100 max-w-xs">
                    From ultrabooks to workstations. All brands, all budgets.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Shop Now{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>

              <Link
                href="/products/desktops"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 lg:p-12 text-white transition-transform hover:scale-[1.02]"
              >
                <div className="relative z-10">
                  <Monitor className="h-12 w-12 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">
                    Refurbished Desktops & PCs
                  </h3>
                  <p className="mt-2 text-neutral-300 max-w-xs">
                    Towers, small form factors, and all-in-ones for office or
                    home.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Shop Now{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 text-center">
              How Refurbd Works
            </h2>
            <p className="mt-2 text-neutral-500 text-center max-w-2xl mx-auto">
              Every device goes through our rigorous process before reaching you.
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  title: "We Source",
                  description:
                    "We partner with certified suppliers and businesses to source quality pre-owned devices from trusted channels.",
                },
                {
                  icon: ClipboardCheck,
                  title: "We Test & Grade",
                  description:
                    "Every device undergoes our 30-point quality inspection. We grade each one honestly so you know exactly what you're getting.",
                },
                {
                  icon: PiggyBank,
                  title: "You Save",
                  description:
                    "Get premium tech at up to 60% off retail, backed by our 12-month warranty and 30-day returns.",
                },
              ].map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-500 bg-primary-50 rounded-full px-2 py-0.5">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grading System Preview */}
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 text-center">
              Our Grading System
            </h2>
            <p className="mt-2 text-neutral-500 text-center max-w-2xl mx-auto">
              We grade every device honestly so you always know what to expect.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRODUCT_GRADES.map((grade, index) => {
                const colorMap: Record<string, string> = {
                  emerald: "border-emerald-200 bg-emerald-50",
                  green: "border-green-200 bg-green-50",
                  blue: "border-blue-200 bg-blue-50",
                  amber: "border-amber-200 bg-amber-50",
                  gray: "border-gray-200 bg-gray-50",
                };
                const dotColorMap: Record<string, string> = {
                  emerald: "bg-emerald-500",
                  green: "bg-green-500",
                  blue: "bg-blue-500",
                  amber: "bg-amber-500",
                  gray: "bg-gray-500",
                };
                return (
                  <div
                    key={grade.value}
                    className={`rounded-xl border-2 p-5 ${colorMap[grade.color] || ""}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`h-3 w-3 rounded-full ${dotColorMap[grade.color] || ""}`}
                      />
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {grade.label}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600">
                      {grade.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link href="/grading">
                <Button variant="outline" size="md">
                  Learn More About Our Grading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 text-center">
              What Our Customers Say
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 bg-white p-6"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-secondary-500 text-secondary-500"
                            : "text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium text-neutral-900">
                    {review.name},{" "}
                    <span className="text-neutral-500">{review.location}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
