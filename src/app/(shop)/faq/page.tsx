"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Products & Quality",
    questions: [
      {
        q: "What does 'refurbished' mean?",
        a: "Refurbished means a device has been professionally restored to full working condition. This includes thorough testing, cleaning, data wiping, and fresh software installation. Our devices come from corporate IT departments, trade-ins, and certified suppliers.",
      },
      {
        q: "How do you grade your products?",
        a: "We use a 5-tier grading system: Certified Refurbished, Excellent, Good, Fair, and Acceptable. All grades are fully functional — the grade reflects cosmetic condition only. Visit our Grading page for full details.",
      },
      {
        q: "Are all devices fully tested?",
        a: "Yes. Every device undergoes our rigorous 30-point quality check. We test all hardware components, run diagnostic software, verify battery health, and ensure all ports and connectivity work correctly.",
      },
      {
        q: "Is previous data wiped from devices?",
        a: "Absolutely. All data is securely wiped using industry-standard methods that meet government security requirements. A fresh operating system is installed on every device.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days within Australia. Express shipping (2-3 business days) is available for $14.95. New Zealand orders take 7-14 business days via standard shipping ($19.95).",
      },
      {
        q: "Is shipping free?",
        a: "Standard shipping within Australia is free on orders over $99. Orders under $99 have a flat shipping fee of $9.95.",
      },
      {
        q: "Do you ship to New Zealand?",
        a: "Yes! We ship to both Australia and New Zealand. NZ standard shipping is $19.95 and takes 7-14 business days.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order is shipped, you'll receive an email with tracking information. You can also track your order from your account dashboard.",
      },
    ],
  },
  {
    category: "Warranty & Returns",
    questions: [
      {
        q: "What warranty do you offer?",
        a: "Every device comes with a comprehensive 12-month warranty covering all hardware defects and malfunctions. Visit our Warranty page for full details.",
      },
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund. Return shipping is free for defective items.",
      },
      {
        q: "How do I make a warranty claim?",
        a: "Contact our support team with your order number and a description of the issue. We aim to resolve warranty claims within 5 business days.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. More payment options coming soon.",
      },
      {
        q: "Are prices in AUD?",
        a: "Yes, all prices on Refurbd are in Australian Dollars (AUD) and include GST.",
      },
      {
        q: "Do you offer any discounts?",
        a: "Sign up for our newsletter to receive $10 off your first order. We also run periodic sales and promotions — follow us on social media to stay updated.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-neutral-900 pr-4">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-400 flex-shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-neutral-500 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-neutral-500">
          Got questions? We&apos;ve got answers.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              {section.category}
            </h2>
            <div className="rounded-xl border border-neutral-200 bg-white px-6">
              {section.questions.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-neutral-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-neutral-900">
          Still have questions?
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Our support team is here to help.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
