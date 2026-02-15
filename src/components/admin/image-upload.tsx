"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Star, Loader2 } from "lucide-react";

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

interface ImageUploadProps {
  productId: string;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

export function ImageUpload({ productId, images, onImagesChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        // Upload file to R2
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          alert(err.error || "Upload failed");
          continue;
        }
        const { url } = await uploadRes.json();

        // Create product image record
        const imageRes = await fetch(`/api/admin/products/${productId}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, altText: file.name }),
        });
        if (imageRes.ok) {
          const newImage = await imageRes.json();
          onImagesChange([...images, newImage]);
        }
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(imageId: string) {
    const res = await fetch(
      `/api/admin/products/${productId}/images?imageId=${imageId}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      const updated = images.filter((img) => img.id !== imageId);
      // If deleted was primary, first one becomes primary
      if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
        updated[0].isPrimary = true;
      }
      onImagesChange(updated);
    }
  }

  async function handleSetPrimary(imageId: string) {
    const res = await fetch(`/api/admin/products/${productId}/images`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primaryImageId: imageId }),
    });
    if (res.ok) {
      onImagesChange(
        images.map((img) => ({ ...img, isPrimary: img.id === imageId }))
      );
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Product Images
      </h2>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative group rounded-lg border-2 overflow-hidden aspect-square ${
                image.isPrimary
                  ? "border-primary-500"
                  : "border-neutral-200"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || "Product image"}
                fill
                className="object-contain p-1"
                sizes="200px"
              />
              {image.isPrimary && (
                <span className="absolute top-1 left-1 flex items-center gap-1 rounded bg-primary-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  <Star className="h-3 w-3" />
                  Primary
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(image.id)}
                    className="rounded-full bg-white p-2 text-primary-500 hover:bg-primary-50"
                    title="Set as primary"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  className="rounded-full bg-white p-2 text-danger-500 hover:bg-red-50"
                  title="Delete"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <label
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors ${
          uploading
            ? "border-primary-300 bg-primary-50"
            : "border-neutral-300 hover:border-primary-400 hover:bg-neutral-50"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            <span className="mt-2 text-sm text-primary-600">Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="h-8 w-8 text-neutral-400" />
            <span className="mt-2 text-sm text-neutral-600">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-neutral-400 mt-1">
              JPEG, PNG, WebP or AVIF (max 10MB)
            </span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleUpload(e.target.files);
            }
          }}
        />
      </label>
    </div>
  );
}
