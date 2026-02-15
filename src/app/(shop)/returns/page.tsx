import { RotateCcw, Package, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Returns & Refunds",
  description: "30-day hassle-free return policy at Refurbd.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <RotateCcw className="h-8 w-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">Returns & Refunds</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Not happy with your purchase? No worries. We offer a 30-day return policy
          on all products.
        </p>
      </div>

      {/* Steps */}
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            step: "1",
            icon: Package,
            title: "Request Return",
            desc: "Contact us within 30 days of delivery with your order number. We'll provide a return shipping label.",
          },
          {
            step: "2",
            icon: RotateCcw,
            title: "Ship It Back",
            desc: "Pack the item securely in its original packaging and ship it back using the provided label.",
          },
          {
            step: "3",
            icon: CheckCircle,
            title: "Get Refunded",
            desc: "Once we receive and inspect the item, we'll process your refund within 3-5 business days.",
          },
        ].map((item) => (
          <div key={item.step} className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm mb-4">
              {item.step}
            </div>
            <h3 className="font-semibold text-neutral-900">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Return Policy</h2>
          <div className="space-y-3 text-sm text-neutral-700">
            <p>You may return any product within <strong>30 days</strong> of delivery for a full refund, subject to the following conditions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The item must be in the same condition as when you received it</li>
              <li>All original accessories and packaging must be included</li>
              <li>Return shipping is free for defective items or incorrect orders</li>
              <li>For change-of-mind returns, a flat $9.95 return shipping fee applies</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Refund Timeline</h2>
          <div className="space-y-3 text-sm text-neutral-700">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Processing Time</p>
                <p className="text-neutral-500">Refunds are processed within 3-5 business days after we receive and inspect your return.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Bank Processing</p>
                <p className="text-neutral-500">Your bank may take an additional 5-10 business days to reflect the refund in your account.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Non-Returnable Items</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-500">
            <li>Items with physical damage caused after delivery</li>
            <li>Items missing original accessories or packaging</li>
            <li>Items returned after the 30-day return window</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
