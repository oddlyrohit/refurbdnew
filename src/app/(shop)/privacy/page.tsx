export const metadata = {
  title: "Privacy Policy",
  description: "How Refurbd collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-neutral prose-sm max-w-none space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mt-0">1. Information We Collect</h2>
            <p className="text-neutral-600">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>Name, email address, phone number, and shipping/billing addresses</li>
              <li>Account credentials (email and encrypted password)</li>
              <li>Order history and transaction details</li>
              <li>Communications with our support team</li>
              <li>Product reviews and feedback</li>
            </ul>
            <p className="text-neutral-600">
              We also automatically collect certain information when you visit our website,
              including your IP address, browser type, device information, and browsing behaviour
              through cookies and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">2. How We Use Your Information</h2>
            <p className="text-neutral-600">We use your personal information to:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>Process and fulfil your orders</li>
              <li>Send order confirmations, shipping updates, and receipts</li>
              <li>Manage your account and provide customer support</li>
              <li>Process warranty claims and returns</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">3. Information Sharing</h2>
            <p className="text-neutral-600">
              We do not sell your personal information. We share your information only with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li><strong>Payment processors</strong> (Stripe) to process transactions</li>
              <li><strong>Shipping carriers</strong> to deliver your orders</li>
              <li><strong>Email service providers</strong> to send transactional and marketing emails</li>
              <li><strong>Analytics providers</strong> to understand website usage</li>
              <li><strong>Law enforcement</strong> when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">4. Data Security</h2>
            <p className="text-neutral-600">
              We implement industry-standard security measures to protect your personal information.
              All payment transactions are processed through Stripe&apos;s PCI-DSS compliant infrastructure.
              Passwords are hashed using bcrypt and never stored in plain text.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">5. Cookies</h2>
            <p className="text-neutral-600">
              We use cookies to maintain your session, remember your preferences, and analyse
              website traffic. You can control cookie settings through your browser. Disabling
              cookies may affect some features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">6. Your Rights</h2>
            <p className="text-neutral-600">
              Under the Australian Privacy Act 1988, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">7. Contact Us</h2>
            <p className="text-neutral-600">
              For privacy-related enquiries, contact us at privacy@refurbd.com.au or through
              our Contact page.
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
