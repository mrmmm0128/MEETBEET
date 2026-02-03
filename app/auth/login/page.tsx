"use client";

import { useState, useTransition } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(() => {
      login({ email, password })
        .then((data) => {
            if (data?.error) {
                setError(data.error);
            } else {
                // NextAuth should handle redirect, but sometimes client router refresh helps
                // window.location.reload(); 
            }
        });
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <form action={onSubmit} className="space-y-4">
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
              placeholder="Enter your password" 
              disabled={isPending}
              required 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          
          {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-md">{error}</div>}
          {success && <div className="p-3 bg-emerald-500/10 text-emerald-500 text-sm rounded-md">{success}</div>}

          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-rose-400 hover:text-rose-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
