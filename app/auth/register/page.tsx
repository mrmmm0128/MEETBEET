"use client";

import { useActionState } from "react"; // Changed from useFormState for React 19 compat if needed, or stick to useActionState if available in Next 15/16
// Wait, React 19 usages use `useActionState` (formerly useFormState)
import { useState, useTransition } from "react";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    startTransition(() => {
      register({ email, password, name })
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Sign Up
        </h1>
        <form action={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">Name</label>
            <Input 
              name="name" 
              type="text" 
              placeholder="Your Name" 
              disabled={isPending}
              required 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">Email</label>
            <Input 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              disabled={isPending}
              required 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">Password</label>
            <Input 
              name="password" 
              type="password" 
              placeholder="Create a password" 
              disabled={isPending}
              required 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          
          {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-md">{error}</div>}
          {success && <div className="p-3 bg-emerald-500/10 text-emerald-500 text-sm rounded-md">{success}</div>}

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isPending}>
            {isPending ? "Creating account..." : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
