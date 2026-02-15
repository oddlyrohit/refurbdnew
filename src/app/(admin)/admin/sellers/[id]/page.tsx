"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSellerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    code: "",
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    abn: "",
    nzbn: "",
    commissionRate: "15",
    bankBsb: "",
    bankAccount: "",
    bankName: "",
    notes: "",
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/sellers/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            code: data.code || "",
            businessName: data.businessName || "",
            contactName: data.contactName || "",
            email: data.email || "",
            phone: data.phone || "",
            abn: data.abn || "",
            nzbn: data.nzbn || "",
            commissionRate: data.commissionRate?.toString() || "15",
            bankBsb: data.bankBsb || "",
            bankAccount: data.bankAccount || "",
            bankName: data.bankName || "",
            notes: data.notes || "",
            isActive: data.isActive ?? true,
          });
          setLoading(false);
        });
    }
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/sellers" : `/api/admin/sellers/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          commissionRate: parseFloat(form.commissionRate),
        }),
      });
      if (res.ok) {
        router.push("/admin/sellers");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          {isNew ? "New Seller" : "Edit Seller"}
        </h1>
        <div className="mt-6 space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/sellers"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sellers
      </Link>

      <h1 className="text-2xl font-bold text-neutral-900">
        {isNew ? "Add New Seller" : "Edit Seller"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Business Info */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Business Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Seller Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              required
              placeholder="e.g. SYD01"
            />
            <Input
              label="Business Name"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              required
            />
            <Input
              label="Contact Name"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Commission Rate (%)"
              type="number"
              step="0.01"
              value={form.commissionRate}
              onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
              required
            />
            <Input
              label="ABN (Australia)"
              value={form.abn}
              onChange={(e) => setForm({ ...form, abn: e.target.value })}
            />
            <Input
              label="NZBN (New Zealand)"
              value={form.nzbn}
              onChange={(e) => setForm({ ...form, nzbn: e.target.value })}
            />
          </div>
        </div>

        {/* Bank Details */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Bank Details</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Bank Name"
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            />
            <Input
              label="BSB"
              value={form.bankBsb}
              onChange={(e) => setForm({ ...form, bankBsb: e.target.value })}
            />
            <Input
              label="Account Number"
              value={form.bankAccount}
              onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
            />
          </div>
        </div>

        {/* Notes & Status */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Notes & Status</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="rounded border-neutral-300"
            />
            Active Seller
          </label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" isLoading={saving}>
            <Save className="h-4 w-4" />
            {isNew ? "Create Seller" : "Save Changes"}
          </Button>
          <Link href="/admin/sellers">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
