import { Shield, CheckCircle, Clock, Phone } from "lucide-react";

export const metadata = {
  title: "Warranty",
  description: "12-month warranty on all refurbished devices from Refurbd.",
};

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <Shield className="h-8 w-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">12-Month Warranty</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Every device sold on Refurbd comes with a comprehensive 12-month warranty.
          Buy with confidence.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: CheckCircle,
            title: "Full Coverage",
            desc: "All hardware defects and malfunctions are covered for 12 months from the date of purchase.",
          },
          {
            icon: Clock,
            title: "Fast Resolution",
            desc: "We aim to resolve warranty claims within 5 business days, including repair or replacement.",
          },
          {
            icon: Phone,
            title: "Easy Claims",
            desc: "Contact our support team to start a warranty claim. No complicated processes.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-neutral-900">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">What&apos;s Covered</h2>
        <div className="space-y-4">
          {[
            "Hardware defects including motherboard, CPU, RAM, and storage failures",
            "Screen defects (dead pixels appearing after purchase, backlight failure)",
            "Battery failures (capacity drops below 70% within warranty period)",
            "Keyboard and trackpad malfunctions",
            "Port and connectivity failures (USB, HDMI, Wi-Fi, Bluetooth)",
            "Speaker and microphone issues",
            "Power adapter defects (if supplied with purchase)",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-neutral-700">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mt-8 mb-6">What&apos;s Not Covered</h2>
        <div className="space-y-4">
          {[
            "Physical damage caused after purchase (drops, spills, impact damage)",
            "Software issues or operating system corruption",
            "Cosmetic wear disclosed at the time of purchase (as per grade)",
            "Unauthorised modifications or repairs by third parties",
            "Consumable parts beyond normal wear (e.g. thermal paste)",
            "Accessories not supplied by Refurbd",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="h-5 w-5 flex items-center justify-center text-neutral-400 flex-shrink-0">✕</span>
              <p className="text-sm text-neutral-500">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
