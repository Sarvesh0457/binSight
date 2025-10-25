"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLeaderboardData, type LeaderboardEntry } from "@/data/leaderboard";

export default function Leaderboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const leaderboardData = getLeaderboardData();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login?callbackUrl=/leaderboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-neutral-300">Loading...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case 2:
        return "text-gray-300 bg-gray-500/20 border-gray-500/30";
      case 3:
        return "text-amber-600 bg-amber-500/20 border-amber-500/30";
      default:
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white bg-grid bg-noise">
      {/* Hero Section with Spotlight */}
      <section className="relative flex flex-col items-center justify-center mx-auto px-6 max-w-6xl py-20 text-center hero-spotlight md:px-8">
        {/* decorative gradient ring */}
        <div className="absolute left-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl pointer-events-none -top-32 -translate-x-1/2" style={{background:"radial-gradient(closest-side, rgba(22,163,74,0.15), transparent)"}} />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border mb-6">
          <span className="h-1.5 w-1.5 rounded-full" style={{background: "#16a34a"}} />
          Weekly Rankings
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl mb-4">Leaderboard</h1>
        <p className="mx-auto max-w-2xl text-sm text-neutral-300">
          Top performers this week based on reward points earned through sustainable actions.
        </p>
      </section>

      {/* Leaderboard Content */}
      <div className="mx-auto px-6 max-w-4xl md:px-8">
        {/* Header Info */}
        <div className="mb-8 p-6 rounded-lg glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Weekly Rankings</h2>
            <div className="text-sm text-neutral-300">
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            Rankings are based on points earned from recycling, composting, and other eco-friendly actions.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3">
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.username}
              className={`p-6 rounded-lg glass transition-all duration-300 hover:scale-[1.02] ${
                entry.rank <= 3 ? "ring-1 ring-emerald-500/30" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Rank and User Info */}
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border ${getRankColor(entry.rank)}`}>
                    <span className="text-lg font-bold">
                      {getRankIcon(entry.rank)}
                    </span>
                  </div>

                  {/* User Details */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-10 h-10 text-white/90 bg-[#0e2a1d] rounded-full ring-1 ring-[#1b3a29]">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{entry.username}</h3>
                        {entry.badge && (
                          <span className="text-lg">{entry.badge}</span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400">
                        {entry.rank === 1 && "Eco Champion"}
                        {entry.rank === 2 && "Green Leader"}
                        {entry.rank === 3 && "Demo User"}
                        {entry.rank > 3 && "Active Contributor"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    {entry.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-neutral-400">points</div>
                </div>
              </div>

              {/* Progress Bar for Visual Appeal */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((entry.points / leaderboardData[0].points) * 100)}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      entry.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                      entry.rank === 2 ? "bg-gradient-to-r from-gray-300 to-gray-500" :
                      entry.rank === 3 ? "bg-gradient-to-r from-amber-500 to-amber-600" :
                      "bg-gradient-to-r from-emerald-500 to-emerald-600"
                    }`}
                    style={{ width: `${(entry.points / leaderboardData[0].points) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* How Points Work */}
          <div className="p-6 rounded-lg glass">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⭐</span>
              How Points Work
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-300">Recycling plastic</span>
                <span className="text-emerald-400">+50 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Composting food waste</span>
                <span className="text-emerald-400">+30 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Proper e-waste disposal</span>
                <span className="text-emerald-400">+100 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Using smart bins</span>
                <span className="text-emerald-400">+25 pts</span>
              </div>
            </div>
          </div>

          {/* Weekly Reset Info */}
          <div className="p-6 rounded-lg glass">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔄</span>
              Weekly Reset
            </h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <p>Leaderboard resets every Monday at 12:00 AM.</p>
              <p>Top 3 performers receive special badges and rewards.</p>
              <p>Your points contribute to your overall environmental impact score.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 rounded-lg glass text-center">
          <h3 className="text-lg font-semibold mb-2">Want to climb the leaderboard?</h3>
          <p className="text-sm text-neutral-300 mb-4">
            Start recycling, composting, and making eco-friendly choices to earn points!
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/classify"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white rounded-md transition-colors hover:bg-emerald-600/20"
            >
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-md -z-10" />
                <span className="absolute inset-0 rounded-md -z-20 ring-1 ring-[#1b3a29]" />
                Start Classifying
              </span>
            </a>
            <a
              href="/rewards"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white rounded-md transition-colors hover:bg-emerald-600/20"
            >
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-md -z-10" />
                <span className="absolute inset-0 rounded-md -z-20 ring-1 ring-[#1b3a29]" />
                View Rewards
              </span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
