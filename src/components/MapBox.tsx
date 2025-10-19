
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapBoxProps {
  yards: Array<{ lat: number; lon: number; name: string }>;
  center?: { lat: number; lon: number };
}

export default function MapBox({ yards, center }: MapBoxProps) {
  const defaultCenter = center || (yards.length > 0 ? { lat: yards[0].lat, lon: yards[0].lon } : { lat: 28.6139, lon: 77.2090 });

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lon]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {yards.map((yard, index) => (
        <Marker key={index} position={[yard.lat, yard.lon]}>
          <Popup>{yard.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}