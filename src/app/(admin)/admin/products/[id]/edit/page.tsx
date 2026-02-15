"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/image-upload";

interface SelectOption {
  id: string;
  name: string;
}

interface SellerOption {
  id: string;
  code: string;
  businessName: string;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [brands, setBrands] = useState<SelectOption[]>([]);
  const [sellers, setSellers] = useState<SellerOption[]>([]);

  const [images, setImages] = useState<{ id: string; url: string; altText: string | null; isPrimary: boolean; sortOrder: number }[]>([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    categoryId: "",
    brandId: "",
    sellerId: "",
    sellerProductCode: "",
    sku: "",
    grade: "GOOD",
    gradeNotes: "",
    price: "",
    costPrice: "",
    compareAtPrice: "",
    processor: "",
    ramGb: "",
    storageGb: "",
    storageType: "SSD",
    screenSizeInch: "",
    gpu: "",
    operatingSystem: "",
    batteryHealth: "",
    stockQuantity: "1",
    status: "DRAFT",
    isFeatured: false,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/brands").then((r) => r.json()),
      fetch("/api/admin/sellers").then((r) => r.json()),
    ]).then(([product, cats, brs, sls]) => {
      setCategories(cats);
      setBrands(brs);
      setSellers(sls);
      setImages(product.images || []);
      setForm({
        title: product.title || "",
        slug: product.slug || "",
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
        brandId: product.brandId || "",
        sellerId: product.sellerId || "",
        sellerProductCode: product.sellerProductCode || "",
        sku: product.sku || "",
        grade: product.grade || "GOOD",
        gradeNotes: product.gradeNotes || "",
        price: product.price?.toString() || "",
        costPrice: product.costPrice?.toString() || "",
        compareAtPrice: product.compareAtPrice?.toString() || "",
        processor: product.processor || "",
        ramGb: product.ramGb?.toString() || "",
        storageGb: product.storageGb?.toString() || "",
        storageType: product.storageType || "SSD",
        screenSizeInch: product.screenSizeInch?.toString() || "",
        gpu: product.gpu || "",
        operatingSystem: product.operatingSystem || "",
        batteryHealth: product.batteryHealth?.toString() || "",
        stockQuantity: product.stockQuantity?.toString() || "1",
        status: product.status || "DRAFT",
        isFeatured: product.isFeatured || false,
      });
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          costPrice: form.costPrice ? parseFloat(form.costPrice) : null,
          compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
          ramGb: form.ramGb ? parseInt(form.ramGb) : null,
          storageGb: form.storageGb ? parseInt(form.storageGb) : null,
          screenSizeInch: form.screenSizeInch ? parseFloat(form.screenSizeInch) : null,
          batteryHealth: form.batteryHealth ? parseInt(form.batteryHealth) : null,
          stockQuantity: parseInt(form.stockQuantity),
        }),
      });
      if (res.ok) {
        router.push("/admin/products");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Product</h1>
        <div className="mt-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-2xl font-bold text-neutral-900">Edit Product</h1>
      <p className="mt-1 text-neutral-500 font-mono text-sm">{form.sku}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="sm:col-span-2"
            />
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Short Description</label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <ImageUpload
          productId={id}
          images={images}
          onImagesChange={setImages}
        />

        {/* Classification */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Classification</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="">Select...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Brand</label>
              <select value={form.brandId} onChange={(e) => setForm({ ...form, brandId: e.target.value })} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="">Select...</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Seller</label>
              <select value={form.sellerId} onChange={(e) => setForm({ ...form, sellerId: e.target.value })} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="">Select...</option>
                {sellers.map((s) => <option key={s.id} value={s.id}>[{s.code}] {s.businessName}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grading & Pricing */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Grading & Pricing</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Grade</label>
              <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="CERTIFIED_REFURBISHED">Certified Refurbished</option>
                <option value="EXCELLENT">Excellent</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="ACCEPTABLE">Acceptable</option>
              </select>
            </div>
            <Input label="Price (AUD)" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <Input label="Cost Price" type="number" step="0.01" value={form.costPrice} onChange={(e) => setForm({ ...form, costPrice: e.target.value })} />
            <Input label="Compare At Price" type="number" step="0.01" value={form.compareAtPrice} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })} />
          </div>
        </div>

        {/* Specs */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Specifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Processor" value={form.processor} onChange={(e) => setForm({ ...form, processor: e.target.value })} />
            <Input label="RAM (GB)" type="number" value={form.ramGb} onChange={(e) => setForm({ ...form, ramGb: e.target.value })} />
            <Input label="Storage (GB)" type="number" value={form.storageGb} onChange={(e) => setForm({ ...form, storageGb: e.target.value })} />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Storage Type</label>
              <select value={form.storageType} onChange={(e) => setForm({ ...form, storageType: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
                <option value="SSD_HDD">SSD + HDD</option>
              </select>
            </div>
            <Input label="Screen Size" type="number" step="0.1" value={form.screenSizeInch} onChange={(e) => setForm({ ...form, screenSizeInch: e.target.value })} />
            <Input label="GPU" value={form.gpu} onChange={(e) => setForm({ ...form, gpu: e.target.value })} />
            <Input label="OS" value={form.operatingSystem} onChange={(e) => setForm({ ...form, operatingSystem: e.target.value })} />
            <Input label="Battery Health (%)" type="number" value={form.batteryHealth} onChange={(e) => setForm({ ...form, batteryHealth: e.target.value })} />
          </div>
        </div>

        {/* Inventory & Status */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Inventory & Status</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="Stock Quantity" type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} required />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded border-neutral-300" />
                Featured Product
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" isLoading={saving}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
