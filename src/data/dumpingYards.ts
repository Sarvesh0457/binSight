export type DumpingYard = { 
  lat: number; 
  lon: number; 
  name: string; 
  pincode: string;
  capacity?: number;
  currentWeight?: number;
  fillPercentage?: number;
  wasteType?: 'mixed' | 'recyclable' | 'organic' | 'general';
  status?: 'low' | 'medium' | 'high' | 'full';
  lastUpdated?: string;
};

export type Pincode = "390001" | "380001" | "394210";

export const dumpingYards: Record<Pincode, DumpingYard[]> = {
  "390001": [
    { 
      lat: 22.23493937962596, 
      lon: 73.20702447301618, 
      name: "GARBAGE DUMPING GROUND",
      pincode: "390001",
      capacity: 120,
      currentWeight: 90,
      fillPercentage: 75,
      wasteType: 'mixed',
      status: 'high'
    },
    { 
      lat: 22.223500438656405, 
      lon: 73.23078079112757, 
      name: "Dumping Yard 2",
      pincode: "390001",
      capacity: 80,
      currentWeight: 20,
      fillPercentage: 25,
      wasteType: 'recyclable',
      status: 'low'
    },
    { 
      lat: 22.3423447835361, 
      lon: 73.19239049393504, 
      name: "Kachre se Azadi",
      pincode: "390001",
      capacity: 100,
      currentWeight: 90,
      fillPercentage: 90,
      wasteType: 'organic',
      status: 'full'
    },
  ],
  "380001": [
    { 
      lat: 23.015758307909195, 
      lon: 72.6659774612416, 
      name: "AMC DUMPING YARD",
      pincode: "380001",
      capacity: 150,
      currentWeight: 68,
      fillPercentage: 45,
      wasteType: 'mixed',
      status: 'medium'
    },
    { 
      lat: 22.98330582866259, 
      lon: 72.56534099558958, 
      name: "Pirana Landfill Site",
      pincode: "380001",
      capacity: 90,
      currentWeight: 54,
      fillPercentage: 60,
      wasteType: 'recyclable',
      status: 'medium'
    },
    { 
      lat: 23.040257162015234, 
      lon: 72.50620613314335, 
      name: "Recycling HUB",
      pincode: "380001",
      capacity: 110,
      currentWeight: 17,
      fillPercentage: 15,
      wasteType: 'general',
      status: 'low'
    },
  ],
  "394210": [
    { 
      lat: 21.156820856182858, 
      lon: 72.8174280767205, 
      name: "Bhatar Old Garbage Dumping Site",
      pincode: "394210",
      capacity: 100,
      currentWeight: 85,
      fillPercentage: 85,
      wasteType: 'mixed',
      status: 'high'
    },
    { 
      lat: 21.168835048589468, 
      lon: 72.79217671563197, 
      name: "SMC Garbage Dump",
      pincode: "394210",
      capacity: 80,
      currentWeight: 35,
      fillPercentage: 44,
      wasteType: 'organic',
      status: 'medium'
    },
  ]
};

// Function to get all yards as a flat array
export function getAllYards(): DumpingYard[] {
  const allYards: DumpingYard[] = [];
  Object.entries(dumpingYards).forEach(([pincode, yards]) => {
    yards.forEach(yard => {
      allYards.push({ ...yard, pincode });
    });
  });
  return allYards;
}

// Function to calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to update bin status based on fill percentage
export function updateBinStatus(fillPercentage: number): 'low' | 'medium' | 'high' | 'full' {
  if (fillPercentage >= 90) return 'full';
  if (fillPercentage >= 70) return 'high';
  if (fillPercentage >= 40) return 'medium';
  return 'low';
}

// Function to get status color classes
export function getStatusColor(status: string) {
  switch (status) {
    case 'low': return 'text-green-400 bg-green-500/20';
    case 'medium': return 'text-blue-400 bg-blue-500/20';
    case 'high': return 'text-yellow-400 bg-yellow-500/20';
    case 'full': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
}

// Function to get status text
export function getStatusText(status: string) {
  switch (status) {
    case 'low': return 'Low';
    case 'medium': return 'Medium';
    case 'high': return 'High';
    case 'full': return 'Full';
    default: return 'Unknown';
  }
}

// Function to get waste type icon
export function getWasteTypeIcon(wasteType: string) {
  switch (wasteType) {
    case 'mixed': return '🗑️';
    case 'recyclable': return '♻️';
    case 'organic': return '🌱';
    case 'general': return '📦';
    default: return '🗑️';
  }
}
