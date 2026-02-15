export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Refurbd.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Terms & Conditions</h1>

      <div className="prose prose-neutral prose-sm max-w-none space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mt-0">1. Introduction</h2>
            <p className="text-neutral-600">
              Welcome to Refurbd. These Terms and Conditions govern your use of our website
              (refurbd.com.au) and the purchase of products from us. By accessing our website
              or placing an order, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">2. Products</h2>
            <p className="text-neutral-600">
              All products sold on Refurbd are refurbished electronic devices. Product descriptions,
              specifications, and grading are provided to the best of our ability. Minor variations
              may occur. All product images are representative.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">3. Pricing</h2>
            <p className="text-neutral-600">
              All prices are listed in Australian Dollars (AUD) and include GST (Goods and Services Tax)
              where applicable. We reserve the right to modify prices without prior notice.
              The price applicable to your order is the price displayed at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">4. Orders</h2>
            <p className="text-neutral-600">
              An order is confirmed when you receive an order confirmation email. We reserve the right
              to cancel orders if products are unavailable, pricing errors occur, or fraudulent
              activity is suspected. In such cases, you will receive a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">5. Payment</h2>
            <p className="text-neutral-600">
              Payment is processed securely through Stripe. We accept major credit and debit cards.
              All transactions are encrypted and we never store your full card details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">6. Shipping</h2>
            <p className="text-neutral-600">
              Shipping rates and delivery times are detailed on our Shipping page.
              Risk of loss and title for items pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">7. Warranty</h2>
            <p className="text-neutral-600">
              All products come with a 12-month warranty covering hardware defects and malfunctions.
              Full warranty terms are available on our Warranty page. This warranty is in addition to
              your rights under the Australian Consumer Law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">8. Returns</h2>
            <p className="text-neutral-600">
              We offer a 30-day return policy. Full return terms and conditions are available on
              our Returns page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">9. Limitation of Liability</h2>
            <p className="text-neutral-600">
              To the maximum extent permitted by law, Refurbd shall not be liable for any indirect,
              incidental, special, or consequential damages. Our total liability shall not exceed
              the amount paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">10. Governing Law</h2>
            <p className="text-neutral-600">
              These terms are governed by the laws of Australia. Any disputes shall be subject to
              the jurisdiction of the courts of New South Wales, Australia.
            </p>
          </section>

          <p className="text-xs text-neutral-400 mt-8">
            Last updated: February 2026
          </p>
        </div>
      </div>
    </div>
  );
}
