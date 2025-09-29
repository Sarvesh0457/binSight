"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

export type DumpingYard = { lat: number; lon: number; name: string };

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function FitToYards({ yards }: { yards: DumpingYard[] }) {
  const map = useMap();
  useEffect(() => {
    if (!yards.length) return;

    if (yards.length === 1) {
      // Single marker: zoom in close
      map.setView([yards[0].lat, yards[0].lon], 15);
      return;
    }

    // Multiple markers: fit all in view with padding
    const bounds = new L.LatLngBounds(
      yards.map((y) => [y.lat, y.lon]) as [number, number][]
    );
    map.fitBounds(bounds, {
      padding: [20, 20],
      maxZoom: 14, // Don't zoom too close when fitting bounds
    });
  }, [yards, map]);
  return null;
}

// Default export to match your import
export default function MapBox({ yards }: { yards: DumpingYard[] }) {
  const center: [number, number] = yards.length
    ? [yards[0].lat, yards[0].lon]
    : [20.5937, 78.9629]; // India

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={yards.length ? 15 : 5} // Higher zoom when markers present
        className="h-full w-full"
      >
        <TileLayer
          // Dark theme tiles to match your site
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <FitToYards yards={yards} />
        {yards.map((yard, i) => (
          <Marker key={i} position={[yard.lat, yard.lon]} icon={icon}>
            <Popup>
              <div className="font-semibold text-black">{yard.name}</div>
              <div className="text-xs text-gray-600">
                {yard.lat.toFixed(4)}, {yard.lon.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}