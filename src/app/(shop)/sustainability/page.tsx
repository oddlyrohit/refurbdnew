import { Leaf, Recycle, Zap, Globe, TreePine, Droplets } from "lucide-react";

export const metadata = {
  title: "Sustainability",
  description: "How choosing refurbished tech with Refurbd helps the planet.",
};

export default function SustainabilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <Leaf className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">
          Sustainability at Refurbd
        </h1>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Every refurbished device is a step towards a more sustainable future.
          Here&apos;s the impact your purchase makes.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Recycle,
            stat: "1.2kg",
            label: "E-waste diverted per device",
            color: "bg-green-50 text-green-500",
          },
          {
            icon: Zap,
            stat: "80%",
            label: "Less energy than new production",
            color: "bg-blue-50 text-blue-500",
          },
          {
            icon: Droplets,
            stat: "190L",
            label: "Water saved per device",
            color: "bg-cyan-50 text-cyan-500",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
            <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-neutral-900">{item.stat}</p>
            <p className="mt-1 text-sm text-neutral-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-8 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-neutral-900">The E-Waste Problem</h2>
          </div>
          <p className="text-neutral-600">
            Australia generates over 550,000 tonnes of e-waste each year, making it one of
            the fastest-growing waste streams. Only 10% of e-waste is properly recycled —
            the rest ends up in landfill, leaching toxic chemicals into our soil and water.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-neutral-900">How Refurbd Helps</h2>
          </div>
          <div className="space-y-3 text-neutral-600">
            <p>
              By choosing a refurbished device, you&apos;re directly contributing to a circular economy.
              Here&apos;s how:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Extending product lifespan:</strong> A refurbished laptop gets 3-5 more years of active use</li>
              <li><strong>Reducing manufacturing demand:</strong> One refurbished sale means one fewer new device needs to be manufactured</li>
              <li><strong>Saving resources:</strong> Manufacturing a new laptop requires rare earth minerals, water, and energy</li>
              <li><strong>Proper handling:</strong> Devices we can&apos;t refurbish are sent to certified e-waste recyclers</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-green-50 p-8 text-center">
        <h2 className="text-xl font-bold text-green-900">Make a Difference Today</h2>
        <p className="mt-2 text-green-700 max-w-xl mx-auto">
          Every refurbished device purchased is a vote for a more sustainable future.
          Browse our collection and find premium tech that&apos;s better for your wallet and the planet.
        </p>
        <a
          href="/products"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          Shop Refurbished
        </a>
      </div>
    </div>
  );
}
