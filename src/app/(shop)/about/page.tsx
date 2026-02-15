import { Heart, Leaf, Shield, Users } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about Refurbd — premium refurbished tech for Australia and New Zealand.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900">About Refurbd</h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Making premium technology accessible and sustainable.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mt-0 mb-4">Our Mission</h2>
          <p className="text-neutral-600">
            At Refurbd, we believe that high-quality technology shouldn&apos;t cost the earth —
            literally or figuratively. We&apos;re on a mission to make premium refurbished laptops
            and PCs accessible to everyone in Australia and New Zealand, while reducing the
            environmental impact of electronic waste.
          </p>
          <p className="text-neutral-600 mb-0">
            Every device we sell has been professionally tested, graded, and certified to
            meet our exacting standards. We stand behind every product with a comprehensive
            12-month warranty and a 30-day return policy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: Shield,
              title: "Quality Guaranteed",
              desc: "Every device undergoes a 30-point quality check. We test every component, from the CPU to the speakers, to ensure you receive a fully functional device.",
            },
            {
              icon: Heart,
              title: "Customer First",
              desc: "We believe in transparency. Our grading system gives you an honest assessment of every device's condition, and our support team is always here to help.",
            },
            {
              icon: Leaf,
              title: "Sustainable Choice",
              desc: "By choosing refurbished, you're helping reduce e-waste and the carbon footprint of electronics manufacturing. Every device given a second life matters.",
            },
            {
              icon: Users,
              title: "Australian Owned",
              desc: "Refurbd is proudly Australian-owned and operated. We serve customers across Australia and New Zealand with local support and fast shipping.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500 mb-3">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-neutral-900 text-white p-8 text-center">
          <h2 className="text-xl font-bold mt-0 mb-2 text-white">Refurbd by the Numbers</h2>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {[
              { value: "30+", label: "Point Quality Check" },
              { value: "12", label: "Month Warranty" },
              { value: "60%", label: "Average Savings" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary-400">{stat.value}</p>
                <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
