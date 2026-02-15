import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";
import { v4 } from "@/lib/uuid";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, WebP, or AVIF." },
      { status: 400 }
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Maximum 10MB." },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const key = `products/${v4()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const url = await uploadToR2(key, buffer, file.type);
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error("R2 upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
