import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-09090b text-white p-4 text-center space-y-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-1000">
          MEETBEAT
        </h1>
        <p className="text-xl text-zinc-400 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Connect through music. Find your rhythm. Form your band. <br />
          <span className="text-sm text-zinc-500">2-weeks free trial available.</span>
        </p>
      </div>
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <Link href="/auth/login">
          <Button variant="premium" size="lg" className="w-32">Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="outline" size="lg" className="w-32">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
