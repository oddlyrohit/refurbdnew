"use client";

import { useState, useEffect } from "react";
import { MapPin, Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { AU_STATES, NZ_REGIONS } from "@/lib/constants";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postcode: string;
  country: "AU" | "NZ";
  phone?: string | null;
  isDefault: boolean;
  type: string;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postcode: "",
    country: "AU" as "AU" | "NZ",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    try {
      const res = await fetch("/api/addresses");
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({
          firstName: "", lastName: "", company: "", line1: "", line2: "",
          city: "", state: "", postcode: "", country: "AU", phone: "", isDefault: false,
        });
        fetchAddresses();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(id: string) {
    await fetch(`/api/addresses/${id}/default`, { method: "PUT" });
    fetchAddresses();
  }

  const regions = form.country === "AU" ? AU_STATES : NZ_REGIONS;

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Addresses</h1>
        <div className="mt-6 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Addresses</h1>
          <p className="mt-1 text-neutral-500">Manage your shipping addresses.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm">
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        )}
      </div>

      {/* Add Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">New Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
            <Input
              label="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
            <Input
              label="Company (optional)"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="sm:col-span-2"
            />
            <Input
              label="Address Line 1"
              value={form.line1}
              onChange={(e) => setForm({ ...form, line1: e.target.value })}
              required
              className="sm:col-span-2"
            />
            <Input
              label="Address Line 2 (optional)"
              value={form.line2}
              onChange={(e) => setForm({ ...form, line2: e.target.value })}
              className="sm:col-span-2"
            />
            <Input
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Country
              </label>
              <select
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value as "AU" | "NZ", state: "" })
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="AU">Australia</option>
                <option value="NZ">New Zealand</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                State / Region
              </label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select...</option>
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <Input
              label="Postcode"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              required
            />
            <Input
              label="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="tel"
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="rounded border-neutral-300"
            />
            Set as default address
          </label>

          <div className="mt-6 flex gap-3">
            <Button type="submit" isLoading={saving}>
              Save Address
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showForm ? (
        <EmptyState
          icon={<MapPin className="h-12 w-12" />}
          title="No saved addresses"
          description="Add an address to speed up your checkout process."
          actionLabel="Add Address"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-xl border border-neutral-200 bg-white p-5 relative"
            >
              {address.isDefault && (
                <Badge variant="primary" className="absolute top-3 right-3">
                  <Star className="h-3 w-3 mr-0.5" />
                  Default
                </Badge>
              )}
              <div className="text-sm text-neutral-600 space-y-0.5">
                <p className="font-medium text-neutral-900">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && <p>{address.company}</p>}
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postcode}
                </p>
                <p>{address.country === "AU" ? "Australia" : "New Zealand"}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>

              <div className="mt-4 flex gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-xs font-medium text-primary-500 hover:text-primary-600"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  disabled={deletingId === address.id}
                  className="text-xs font-medium text-danger-500 hover:text-danger-600 ml-auto flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  {deletingId === address.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
