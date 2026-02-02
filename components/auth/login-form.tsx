'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
            Password
          </label>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          required
        />
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <Button type="submit" className="w-full" variant="premium" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </div>
    </form>
  );
}
