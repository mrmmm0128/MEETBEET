import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-500/30">
        <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    MEETBEAT
                </div>
                <div className="flex items-center gap-4">
                     <form
                        action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                        }}
                    >
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Sign Out
                        </Button>
                    </form>
                </div>
            </div>
        </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
