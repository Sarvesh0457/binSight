"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAllYards } from "@/data/dumpingYards";

export default function Rewards() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login?callbackUrl=/rewards");
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

  // Get real bin data for context
  const bins = getAllYards();
  
  // Mock data for rewards
  const currentPoints = 732;
  const pointsHistory = [
    { date: "2025-01-24", action: "Recycled plastic bottle at AMC DUMPING YARD", points: 50 },
    { date: "2025-01-23", action: "Composted food waste at Kachre se Azadi", points: 30 },
    { date: "2025-01-22", action: "Recycled cardboard at Recycling HUB", points: 25 },
    { date: "2025-01-21", action: "Properly disposed electronics at GARBAGE DUMPING GROUND", points: 100 },
    { date: "2025-01-20", action: "Recycled glass jar at Pirana Landfill Site", points: 40 },
  ];

  const availableRewards = [
    { name: "$5 Amazon Gift Card", cost: 500, available: true },
    { name: "$10 Starbucks Gift Card", cost: 1000, available: true },
    { name: "$20 Local Restaurant Voucher", cost: 2000, available: false },
    { name: "Eco-friendly Water Bottle", cost: 300, available: true },
    { name: "Sustainable Shopping Bag Set", cost: 200, available: true },
  ];

  return (
    <main className="min-h-screen bg-black text-white bg-grid bg-noise">
      {/* Hero Section with Spotlight */}
      <section className="relative flex flex-col items-center justify-center mx-auto px-6 max-w-6xl py-20 text-center hero-spotlight md:px-8">
        {/* decorative gradient ring */}
        <div className="absolute left-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl pointer-events-none -top-32 -translate-x-1/2" style={{background:"radial-gradient(closest-side, rgba(22,163,74,0.15), transparent)"}} />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border mb-6">
          <span className="h-1.5 w-1.5 rounded-full" style={{background: "#16a34a"}} />
          Gamification & Rewards
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl mb-4">Rewards</h1>
        <p className="mx-auto max-w-2xl text-sm text-neutral-300">
          Earn points for responsible waste management and redeem them for rewards.
        </p>
      </section>

      <div className="mx-auto px-6 py-8 max-w-6xl md:px-8">

        {/* Current Points */}
        <div className="mb-8">
          <div className="p-6 rounded-lg glass text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-emerald-400 bg-[#0e2a1d] rounded-full border border-[#1b3a29] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Current Balance
            </div>
            <div className="text-4xl font-bold text-white mb-2">{currentPoints.toLocaleString()}</div>
            <div className="text-sm text-neutral-300">Points Available</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Redeem Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Redeem Rewards</h2>
            <div className="space-y-3">
              {availableRewards.map((reward, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg glass ${
                    reward.available ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{reward.name}</h3>
                      <p className="text-sm text-neutral-300">{reward.cost} points</p>
                    </div>
                    <button
                      disabled={!reward.available || currentPoints < reward.cost}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        reward.available && currentPoints >= reward.cost
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {!reward.available ? 'Unavailable' : 
                       currentPoints < reward.cost ? 'Insufficient Points' : 'Redeem'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points History */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Points History</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pointsHistory.map((entry, index) => (
                <div key={index} className="p-4 rounded-lg glass">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">{entry.action}</p>
                      <p className="text-xs text-neutral-400">{entry.date}</p>
                    </div>
                    <div className="text-sm font-medium text-emerald-400">
                      +{entry.points}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="mt-12 p-6 rounded-lg glass">
          <h2 className="text-xl font-semibold mb-4">How to Earn Points</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { action: "Recycle items", points: "25-50 points", icon: "♻️" },
              { action: "Compost organic waste", points: "30 points", icon: "🌱" },
              { action: "Properly dispose electronics", points: "100 points", icon: "📱" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-medium text-white">{item.action}</h3>
                <p className="text-sm text-emerald-400">{item.points}</p>
              </div>
            ))}
          </div>
          
          {/* Available Locations */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">Available Locations</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {bins.map((bin, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className="text-emerald-400">📍</span>
                  <span>{bin.name} ({bin.pincode})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
