import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic2, Users, CalendarDays, Wine } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Genre Match",
    description: "好きな音楽ジャンルで繋がる。毎日新しいトピックで会話しよう。",
    icon: Music,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    href: "/dashboard/genre",
    label: "好きな音楽ジャンルで繋がる"
  },
  {
    title: "Instrument Match",
    description: "好きな楽器で繋がる。パートごとの仲間を見つけよう。",
    icon: Mic2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    href: "/dashboard/instrument",
    label: "好きな楽器で繋がる"
  },
  {
    title: "Band Recruitment",
    description: "バンドを組んでみる。求む楽器を設定してメンバー募集。",
    icon: Users,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    href: "/dashboard/band",
    label: "バンドを組んでみる"
  },
  {
    title: "Event Match",
    description: "フェス・ライブで繋がる。参戦予定のイベント仲間を探そう。",
    icon: CalendarDays,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    href: "/dashboard/event",
    label: "参戦予定のフェス、ライブで繋がる"
  },
  {
    title: "Bar Recommendations",
    description: "音楽が聴けるバー等を紹介特集。至高の音楽空間へ。",
    icon: Wine, // Wine is closest to bar/martini in standard sets often
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    href: "/dashboard/bar",
    label: "音楽が聴けるバー等を紹介特集"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to MEETBEAT</h1>
        <p className="text-zinc-400">
          音楽を通じて、新しい出会いとリズムを見つけよう。<br/>
          <span className="text-sm text-yellow-500/80">※現在無料トライアル期間中です (残り14日)</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="block group">
            <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-zinc-100 group-hover:text-white">{feature.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
