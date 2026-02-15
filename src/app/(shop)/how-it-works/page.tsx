import { Search, ClipboardCheck, Truck, ThumbsUp, Shield, Leaf } from "lucide-react";

export const metadata = {
  title: "How It Works",
  description: "Learn how Refurbd sources, tests, and delivers premium refurbished tech.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-neutral-900">How Refurbd Works</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          From sourcing to your doorstep — here&apos;s how we deliver premium
          refurbished tech at a fraction of the price.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-200 hidden sm:block" />

        <div className="space-y-12">
          {[
            {
              icon: Search,
              title: "We Source",
              desc: "We partner with trusted suppliers, corporate IT departments, and certified refurbishers across Australia and New Zealand. Every device has a verified history.",
            },
            {
              icon: ClipboardCheck,
              title: "We Inspect & Test",
              desc: "Every device undergoes our rigorous 30-point quality check. We test all hardware components, run diagnostic software, and ensure everything works perfectly.",
            },
            {
              icon: Shield,
              title: "We Grade & Certify",
              desc: "Each device is graded on our 5-tier scale based on cosmetic condition. Functional performance is guaranteed regardless of grade. We back every device with a 12-month warranty.",
            },
            {
              icon: Leaf,
              title: "We Prepare",
              desc: "All data is securely wiped using industry-standard methods. A fresh operating system is installed, batteries are tested, and the device is professionally cleaned.",
            },
            {
              icon: Truck,
              title: "We Ship",
              desc: "Devices are carefully packaged and shipped with tracking. Standard shipping is free on orders over $99. Express options are available.",
            },
            {
              icon: ThumbsUp,
              title: "You Save",
              desc: "You receive a premium, fully-tested device at up to 60% off the retail price — backed by warranty, free returns, and ongoing support.",
            },
          ].map((step, i) => (
            <div key={step.title} className="flex gap-6 relative">
              <div className="flex-shrink-0 relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-white border-2 border-primary-200 text-primary-500">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mt-1">{step.title}</h2>
                <p className="mt-2 text-neutral-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-xl bg-primary-50 p-8 text-center">
        <h2 className="text-xl font-bold text-primary-900">Ready to Save?</h2>
        <p className="mt-2 text-primary-700">
          Browse our collection of tested, graded, and warrantied refurbished devices.
        </p>
        <a
          href="/products"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
