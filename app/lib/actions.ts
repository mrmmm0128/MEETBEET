"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient();
  const data = Object.fromEntries(formData.entries());
  const email = data.email as string;
  const password = data.password as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  redirect("/dashboard");
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient();
  const data = Object.fromEntries(formData.entries());
  const parsed = RegisterSchema.safeParse(data);

  if (!parsed.success) {
    return "Invalid input data";
  }

  const { email, password, name } = parsed.data;

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (authError) {
    return authError.message;
  }

  if (authData.user) {
    // Create profile in our database
    try {
      await prisma.user.create({
        data: {
          id: authData.user.id,
          email,
          name,
        },
      });
    } catch (dbError) {
      // If DB creation fails, we might want to cleanup auth user or just log it.
      // For now, logging.
      console.error("Failed to create user profile:", dbError);
      return "Account created but profile setup failed.";
    }
  }

  return "Success";
}
