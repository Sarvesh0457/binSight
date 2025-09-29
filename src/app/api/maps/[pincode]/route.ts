import { NextResponse,NextRequest } from "next/server";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  const { pincode } = await params;
  const data = (Object.keys(dumpingYards) as Pincode[]).includes(pincode as Pincode)
    ? dumpingYards[pincode as Pincode]
    : [];
  return NextResponse.json(data);
}