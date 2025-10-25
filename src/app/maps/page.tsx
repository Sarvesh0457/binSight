"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

type DumpingYard = { lat: number; lon: number; name: string };

// Dynamic import to avoid SSR issues
const Map = dynamic(() => import("@/components/MapBox"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-neutral-400">Loading map...</div>
});

export default function HomePage() {
  const [pincode, setPincode] = useState("");
  const [yards, setYards] = useState<DumpingYard[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get coordinates from pincode
  const getCoordinatesFromPincode = async (pincode: string) => {
    try {
      // Using Nominatim (OpenStreetMap) geocoding service - free and no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&country=India&postalcode=${pincode}&limit=1`
      );
      
      if (!response.ok) throw new Error("Geocoding service unavailable");
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
      
      throw new Error("Location not found for this pincode");
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  };

  const fetchYards = async () => {
    const code = pincode.trim();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit pincode.");
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      // First, get coordinates from pincode
      const coordinates = await getCoordinatesFromPincode(code);
      setMapCenter(coordinates);
      
      // Then fetch nearby yards using coordinates for better accuracy
      const res = await fetch(
        `/api/maps/${code}?lat=${coordinates.lat}&lon=${coordinates.lon}&radius=25`
      );
      
      if (!res.ok) {
        // If API fails, create a dummy yard at the pincode location
        setYards([{
          lat: coordinates.lat,
          lon: coordinates.lon,
          name: `Location for ${code}`
        }]);
      } else {
        const data = await res.json();
        setYards(Array.isArray(data) ? data : []);
        if (!data?.length) {
          // If no yards found, show the pincode location
          setYards([{
            lat: coordinates.lat,
            lon: coordinates.lon,
            name: `Location for ${code}`
          }]);
        }
      }
    } catch (e: unknown) {
      setError((e instanceof Error ? e.message : "Failed to load location."));
      setYards([]);
      setMapCenter(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-h-screen text-white bg-black bg-grid bg-noise hero-spotlight">
      <div className="mx-auto px-4 py-14 max-w-5xl md:px-8">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
            Yards Near Me
          </div>
        </header>

        <section className="p-6 h-44 bg-[#0a160f]/70 rounded-xl border-[#1b3a29] border backdrop-blur-md">
          <h1 className="mb-1 text-2xl font-semibold">Dumping Yard Locator</h1>
          <p className="mb-5 text-sm text-neutral-300">
            Enter your 6-digit pincode to locate nearby authorized yards.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor="pincode" className="block mb-1 text-sm text-neutral-300">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                inputMode="numeric"
                maxLength={6}
                className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40"
                onKeyDown={(e) => e.key === 'Enter' && fetchYards()}
              />
              {error && (
                <p className="mt-1 text-sm text-red-300">{error}</p>
              )}
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchYards}
                disabled={loading}
                className="relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg cursor-pointer group disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
                <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
                {loading ? "Loading..." : "Search"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="mt-4 p-2 bg-[#0a160f]/70 rounded-xl border-[#1b3a29] border backdrop-blur-md">
          <div className="overflow-hidden h-[400px] rounded-lg">
            {yards.length > 0 && mapCenter ? (
              <Map key={`${mapCenter?.lat}-${mapCenter?.lon}`} yards={yards} center={mapCenter} />
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-400">
                {loading ? "Loading..." : error ? error : "Enter a pincode to search"}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}