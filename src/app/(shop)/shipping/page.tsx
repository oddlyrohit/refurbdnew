import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata = {
  title: "Shipping Information",
  description: "Shipping rates and delivery times for Refurbd orders across Australia and New Zealand.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <Truck className="h-8 w-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">Shipping Information</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          We ship across Australia and New Zealand. Free standard shipping on orders over $99.
        </p>
      </div>

      {/* Shipping Options Table */}
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-6 py-4 text-left font-medium text-neutral-500">Method</th>
              <th className="px-6 py-4 text-left font-medium text-neutral-500">Delivery Time</th>
              <th className="px-6 py-4 text-right font-medium text-neutral-500">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-neutral-900">Standard (Australia)</p>
                    <p className="text-xs text-neutral-500">All metro and regional areas</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-neutral-600">5-7 business days</td>
              <td className="px-6 py-4 text-right">
                <span className="font-medium text-success-600">Free over $99</span>
                <br />
                <span className="text-xs text-neutral-500">$9.95 otherwise</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-neutral-900">Express (Australia)</p>
                    <p className="text-xs text-neutral-500">Priority handling</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-neutral-600">2-3 business days</td>
              <td className="px-6 py-4 text-right font-medium text-neutral-900">$14.95</td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-neutral-900">Standard (New Zealand)</p>
                    <p className="text-xs text-neutral-500">All NZ addresses</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-neutral-600">7-14 business days</td>
              <td className="px-6 py-4 text-right font-medium text-neutral-900">$19.95</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-8 space-y-6">
        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-neutral-900">Order Processing</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Orders placed before 2:00 PM AEST on business days are processed the same day.
              Orders placed after 2:00 PM or on weekends are processed the next business day.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Package className="h-6 w-6 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-neutral-900">Packaging</h3>
            <p className="mt-1 text-sm text-neutral-500">
              All devices are carefully packaged in protective materials to ensure safe delivery.
              Certified Refurbished products include premium packaging with all original accessories.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Truck className="h-6 w-6 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-neutral-900">Tracking</h3>
            <p className="mt-1 text-sm text-neutral-500">
              All orders include tracking. You&apos;ll receive a shipping confirmation email
              with tracking details once your order has been dispatched.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
