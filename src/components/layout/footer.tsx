import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Refurbished Laptops", href: "/products/laptops" },
      { name: "Refurbished Desktops", href: "/products/desktops" },
      { name: "Our Grading System", href: "/grading" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Warranty", href: "/warranty" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Refurbd", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter section */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Get $10 Off Your First Order
              </h3>
              <p className="mt-1 text-sm text-neutral-400">
                Subscribe for exclusive deals and refurbished tech tips.
              </p>
            </div>
            <form className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1 sm:w-72">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-400">
                Refurbd
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Refurbd. All rights reserved.
              Australian owned & operated.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
