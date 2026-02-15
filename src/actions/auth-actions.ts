"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod/v4";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export async function registerUser(formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  const { firstName, lastName, email, password } = parsed.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      role: "CUSTOMER",
    },
  });

  return { success: true };
}
