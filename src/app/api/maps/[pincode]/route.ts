import { NextResponse, NextRequest } from "next/server";

type DumpingYard = { lat: number; lon: number; name: string };
type Pincode = "390001" | "380001" | "394210";

const dumpingYards: Record<Pincode, DumpingYard[]> = {
  "390001": [
    { lat: 22.23493937962596, lon: 73.20702447301618, name: "GARBAGE DUMPING GROUND" },
    { lat: 22.223500438656405, lon: 73.23078079112757, name: "Dumping Yard 2" },
    { lat: 22.3423447835361, lon: 73.19239049393504, name: "Kachre se Azadi" },
  ],
  "380001": [
    { lat: 23.015758307909195, lon: 72.6659774612416, name: "AMC DUMPING YARD" },
    { lat: 22.98330582866259, lon: 72.56534099558958, name: "Pirana Landfill Site" },
    { lat: 23.040257162015234, lon: 72.50620613314335, name: "Recycling HUB" },
  ],
  "394210": [
    { lat: 21.156820856182858, lon: 72.8174280767205, name: "Bhatar Old Garbage Dumping Site" },
    { lat: 21.168835048589468, lon: 72.79217671563197, name: "SMC Garbage Dump" },
  ]
};

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to get all yards as a flat array
function getAllYards(): (DumpingYard & { pincode: string })[] {
  const allYards: (DumpingYard & { pincode: string })[] = [];
  Object.entries(dumpingYards).forEach(([pincode, yards]) => {
    yards.forEach(yard => {
      allYards.push({ ...yard, pincode });
    });
  });
  return allYards;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  try {
    const { pincode } = await params;
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = parseFloat(searchParams.get('radius') || '50'); // Default 50km radius

    let nearbyYards: DumpingYard[] = [];

    if (lat && lon) {
      // If coordinates are provided, find yards within radius from all available yards
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lon);
      const allYards = getAllYards();
      
      nearbyYards = allYards
        .map(yard => ({
          lat: yard.lat,
          lon: yard.lon,
          name: yard.name,
          distance: calculateDistance(userLat, userLon, yard.lat, yard.lon)
        }))
        .filter(yard => yard.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10) // Limit to 10 nearest yards
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ distance, ...yard }) => yard); // Remove distance from final result

    } else {
      // Fallback: use existing pincode-based logic
      if ((Object.keys(dumpingYards) as Pincode[]).includes(pincode as Pincode)) {
        nearbyYards = dumpingYards[pincode as Pincode];
      } else {
        // If pincode not found, try to find yards from nearby areas
        // This is a simple fallback - you could improve this logic
        nearbyYards = [];
      }
    }

    return NextResponse.json(nearbyYards);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dumping yards" },
      { status: 500 }
    );
  }
}