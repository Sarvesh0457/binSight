"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllYards, updateBinStatus, getStatusColor, getStatusText, getWasteTypeIcon, type DumpingYard } from "@/data/dumpingYards";

export default function SmartBins() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bins, setBins] = useState<DumpingYard[]>(getAllYards());
  const [selectedBin, setSelectedBin] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login?callbackUrl=/smartbins");
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

  return (
    <main className="min-h-screen bg-black text-white bg-grid bg-noise">
      {/* Hero Section with Spotlight */}
      <section className="relative flex flex-col items-center justify-center mx-auto px-6 max-w-6xl py-20 text-center hero-spotlight md:px-8">
        {/* decorative gradient ring */}
        <div className="absolute left-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl pointer-events-none -top-32 -translate-x-1/2" style={{background:"radial-gradient(closest-side, rgba(22,163,74,0.15), transparent)"}} />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border mb-6">
          <span className="h-1.5 w-1.5 rounded-full" style={{background: "#16a34a"}} />
          IoT Monitoring & Analytics
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl mb-4">SmartBins</h1>
        <p className="mx-auto max-w-2xl text-sm text-neutral-300">
          Real-time monitoring of smart waste bins across the city.
        </p>
      </section>

      <div className="mx-auto px-6 py-8 max-w-7xl md:px-8">

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 p-1 rounded-lg glass">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'map' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          /* Map View */
          <div className="space-y-6">
            <div className="p-6 rounded-lg glass">
              <h2 className="text-xl font-semibold mb-4">Bin Locations</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bins.map((bin) => (
                  <div
                    key={`${bin.pincode}-${bin.name}`}
                    className={`p-4 rounded-lg glass cursor-pointer transition-all hover:scale-105 ${
                      selectedBin === `${bin.pincode}-${bin.name}` ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    onClick={() => setSelectedBin(selectedBin === `${bin.pincode}-${bin.name}` ? null : `${bin.pincode}-${bin.name}`)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getWasteTypeIcon(bin.wasteType || 'mixed')}</span>
                        <h3 className="font-medium text-white">{bin.name}</h3>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bin.status || 'low')}`}>
                        {getStatusText(bin.status || 'low')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">Fill Level</span>
                        <span className="text-white">{Math.round(bin.fillPercentage || 0)}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            (bin.fillPercentage || 0) >= 90 ? 'bg-red-500' :
                            (bin.fillPercentage || 0) >= 70 ? 'bg-yellow-500' :
                            (bin.fillPercentage || 0) >= 40 ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${bin.fillPercentage || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-neutral-400">Pincode: {bin.pincode}</p>
                      <p className="text-xs text-neutral-500">
                        Updated: {new Date(bin.lastUpdated || new Date()).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {bins.map((bin) => (
              <div
                key={`${bin.pincode}-${bin.name}`}
                className="p-6 rounded-lg glass"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{getWasteTypeIcon(bin.wasteType || 'mixed')}</span>
                    <div>
                      <h3 className="font-medium text-white">{bin.name}</h3>
                      <p className="text-sm text-neutral-300">Pincode: {bin.pincode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{Math.round(bin.fillPercentage || 0)}%</div>
                      <div className="text-xs text-neutral-300">Fill Level</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">{bin.currentWeight || 0}kg</div>
                      <div className="text-xs text-neutral-300">Weight</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">{bin.capacity || 0}</div>
                      <div className="text-xs text-neutral-300">Capacity</div>
                    </div>
                    
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(bin.status || 'low')}`}>
                      {getStatusText(bin.status || 'low')}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-300">Fill Level</span>
                    <span className="text-white">{Math.round(bin.fillPercentage || 0)}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        (bin.fillPercentage || 0) >= 90 ? 'bg-red-500' :
                        (bin.fillPercentage || 0) >= 70 ? 'bg-yellow-500' :
                        (bin.fillPercentage || 0) >= 40 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${bin.fillPercentage || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 p-6 rounded-lg glass">
          <h2 className="text-xl font-semibold mb-4">Status Legend</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { status: 'low', color: 'bg-green-500', text: 'Low (0-39%)', description: 'Bin is mostly empty' },
              { status: 'medium', color: 'bg-blue-500', text: 'Medium (40-69%)', description: 'Bin is half full' },
              { status: 'high', color: 'bg-yellow-500', text: 'High (70-89%)', description: 'Bin is nearly full' },
              { status: 'full', color: 'bg-red-500', text: 'Full (90-100%)', description: 'Bin needs emptying' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <div>
                  <div className="text-sm font-medium text-white">{item.text}</div>
                  <div className="text-xs text-neutral-300">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-emerald-400 bg-[#0e2a1d] rounded-full border border-[#1b3a29]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Data
          </div>
        </div>
      </div>
    </main>
  );
}
