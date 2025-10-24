"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllYards, updateBinStatus, getWasteTypeIcon, type DumpingYard } from "@/data/dumpingYards";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bins, setBins] = useState<DumpingYard[]>(getAllYards());

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login?callbackUrl=/dashboard");
    }
  }, [session, status, router]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins => 
        prevBins.map(bin => {
          const newFillPercentage = Math.max(0, Math.min(100, (bin.fillPercentage || 0) + (Math.random() - 0.5) * 5));
          return {
            ...bin,
            fillPercentage: newFillPercentage,
            status: updateBinStatus(newFillPercentage),
            lastUpdated: new Date().toISOString()
          };
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

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

  // Calculate waste breakdown from real bin data
  const wasteData = bins.reduce((acc, bin) => {
    const wasteType = bin.wasteType || 'mixed';
    if (!acc[wasteType]) {
      acc[wasteType] = { amount: 0, count: 0 };
    }
    acc[wasteType].amount += bin.fillPercentage || 0;
    acc[wasteType].count += 1;
    return acc;
  }, {} as Record<string, { amount: number; count: number }>);

  const wasteBreakdown = Object.entries(wasteData).map(([type, data]) => ({
    category: type.charAt(0).toUpperCase() + type.slice(1),
    amount: Math.round(data.amount / data.count),
    color: type === 'mixed' ? 'bg-gray-500' : 
           type === 'recyclable' ? 'bg-blue-500' :
           type === 'organic' ? 'bg-green-500' : 'bg-yellow-500'
  }));

  const getBinStatus = (level: number) => {
    if (level >= 80) return { status: "Full", color: "text-red-400", bgColor: "bg-red-500/20" };
    if (level >= 60) return { status: "High", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
    if (level >= 30) return { status: "Medium", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    return { status: "Low", color: "text-green-400", bgColor: "bg-green-500/20" };
  };

  return (
    <main className="min-h-screen bg-black text-white bg-grid bg-noise">
      <div className="mx-auto px-6 py-20 max-w-6xl md:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Dashboard</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">
            Monitor your waste management and track your environmental impact.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
          {[
            { label: "Total Bins", value: bins.length.toString(), icon: "🗑️" },
            { label: "Avg Fill Level", value: `${Math.round(bins.reduce((acc, bin) => acc + (bin.fillPercentage || 0), 0) / bins.length)}%`, icon: "📊" },
            { label: "Points Earned", value: "1,250", icon: "⭐" },
            { label: "Active Locations", value: new Set(bins.map(bin => bin.pincode)).size.toString(), icon: "📍" },
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-lg glass text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-neutral-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Waste Breakdown Chart */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Waste Breakdown</h2>
            <div className="p-6 rounded-lg glass">
              <div className="space-y-4">
                {wasteBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{item.category}</span>
                      <span className="text-neutral-300">{item.amount}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.amount}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bin Level Indicators */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Bin Levels</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {bins.map((bin) => {
                const status = getBinStatus(bin.fillPercentage || 0);
                return (
                  <div key={`${bin.pincode}-${bin.name}`} className="p-4 rounded-lg glass">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getWasteTypeIcon(bin.wasteType || 'mixed')}</span>
                        <h3 className="font-medium text-white">{bin.name}</h3>
                      </div>
                      <span className={`text-sm font-medium ${status.color}`}>
                        {status.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">Level</span>
                        <span className="text-white">{Math.round(bin.fillPercentage || 0)}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${status.bgColor}`}
                          style={{ width: `${bin.fillPercentage || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-neutral-400">Pincode: {bin.pincode}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: "Recycled plastic bottle", time: "2 hours ago", points: "+50" },
              { action: "Composted food waste", time: "1 day ago", points: "+30" },
              { action: "Recycled cardboard", time: "2 days ago", points: "+25" },
              { action: "Properly disposed electronics", time: "3 days ago", points: "+100" },
              { action: "Recycled glass jar", time: "4 days ago", points: "+40" },
            ].map((activity, index) => (
              <div key={index} className="p-4 rounded-lg glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-neutral-400">{activity.time}</p>
                  </div>
                  <div className="text-sm font-medium text-emerald-400">
                    {activity.points}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 rounded-lg glass">
          <h2 className="text-xl font-semibold mb-4">Today&apos;s Tip</h2>
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <p className="text-white mb-2">
                Rinse containers before recycling to prevent contamination and improve recycling efficiency.
              </p>
              <p className="text-sm text-neutral-300">
                Clean materials are more likely to be successfully recycled and processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
