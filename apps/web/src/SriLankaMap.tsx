import { divIcon, latLngBounds } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { TripLocation } from './types/trip';

type Props = { locations: TripLocation[]; selectedId: string; onSelect: (id: string) => void };

function FitLocations({ locations }: { locations: TripLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (!locations.length) return;
    if (locations.length === 1) map.setView([locations[0]!.latitude, locations[0]!.longitude], 12);
    else map.fitBounds(latLngBounds(locations.map((item) => [item.latitude, item.longitude])), { padding: [45, 45], maxZoom: 11 });
  }, [locations, map]);
  return null;
}

function markerIcon(active: boolean) {
  return divIcon({ className: '', html: `<span class="realMapMarker${active ? ' active' : ''}"><i></i></span>`, iconSize: [30, 38], iconAnchor: [15, 36], popupAnchor: [0, -34] });
}

export function SriLankaMap({ locations, selectedId, onSelect }: Props) {
  return <div className="islandMap realMap" aria-label="Interactive map of planned Sri Lankan destinations">
    <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom className="leafletMap">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitLocations locations={locations} />
      {locations.map((location) => <Marker key={location.id} position={[location.latitude, location.longitude]} icon={markerIcon(location.id === selectedId)} eventHandlers={{ click: () => onSelect(location.id) }}><Popup><strong>{location.name}</strong><br/>{location.district} · {location.day}<br/><small>{location.condition}</small></Popup></Marker>)}
    </MapContainer>
    <span className="mapCaption">Interactive OpenStreetMap · confirm coordinates before travel</span>
  </div>;
}
