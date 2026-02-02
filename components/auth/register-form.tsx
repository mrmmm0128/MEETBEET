'use client';

import { useActionState, useEffect } from 'react';
import { register } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state === 'Success') {
      router.push('/auth/login');
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <Input id="name" name="name" placeholder="Your Name" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" name="password" required />
      </div>
      
      {state && state !== 'Success' && (
        <div className="text-red-500 text-sm">{state}</div>
      )}

      <Button type="submit" className="w-full" variant="premium" disabled={isPending}>
        {isPending ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Login
        </Link>
      </div>
    </form>
  );
}
