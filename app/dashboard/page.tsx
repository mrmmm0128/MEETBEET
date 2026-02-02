import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic2, Users, Calendar, Wine } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  
  if (!session) {
      redirect("/auth/login");
  }

  return (
     <div className="min-h-screen p-8 space-y-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Welcome, {session?.user?.name || "Music Lover"}
              </h1>
              <p className="text-zinc-400">Total connection through music.</p>
            </div>
            
            <div className="flex items-center gap-4">
                 <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full border border-yellow-500/20">
                    2 Weeks Free Trial Active
                 </div>
                <form action={async () => {
                  'use server';
                  await signOut({ redirectTo: "/" });
                }}>
                  <Button variant="ghost" size="sm">Sign Out</Button>
                </form>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
                title="Genre Match" 
                icon={<Music className="w-8 h-8 text-indigo-500" />} 
                description="Connect with people who love the same genre. Daily topics available." 
            />
            <FeatureCard 
                title="Instrument Match" 
                icon={<Mic2 className="w-8 h-8 text-purple-500" />} 
                description="Find musicians by instrument (Guitar, Drum, Bass, etc)." 
            />
            <FeatureCard 
                title="Form a Band" 
                icon={<Users className="w-8 h-8 text-pink-500" />} 
                description="Recruit members and start a band based on matched genres." 
            />
            <FeatureCard 
                title="Festival Connect" 
                icon={<Calendar className="w-8 h-8 text-orange-500" />} 
                description="Find peers for festivals and lives you plan to attend." 
            />
            <FeatureCard 
                title="Music Spots" 
                icon={<Wine className="w-8 h-8 text-red-500" />} 
                description="Discover music bars and live houses in your area." 
            />
        </div>
     </div>
  );
}

function FeatureCard({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) {
  return (
    <Card className="hover:bg-zinc-900/80 transition-all hover:scale-[1.02] border-zinc-800 cursor-pointer group bg-zinc-950/40 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium text-zinc-100">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground group-hover:text-zinc-300 transition-colors">{description}</p>
      </CardContent>
    </Card>
  )
}
