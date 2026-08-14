import type { TripLocation } from './types/trip';

type Props = { locations: TripLocation[]; selectedId: string; onSelect: (id: string) => void };

export function SriLankaMap({ locations, selectedId, onSelect }: Props) {
  return <div className="islandMap" aria-label="Prototype map of planned Sri Lankan destinations">
    <svg viewBox="0 0 220 420" role="img" aria-labelledby="map-title map-description">
      <title id="map-title">Sri Lanka trip plan</title>
      <desc id="map-description">A stylised map with clickable markers for planned destinations.</desc>
      <defs>
        <linearGradient id="island-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dcebc7"/><stop offset=".55" stopColor="#80aa72"/><stop offset="1" stopColor="#2f6754"/></linearGradient>
        <filter id="map-shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#062b22" floodOpacity=".28"/></filter>
      </defs>
      <path className="islandShape" filter="url(#map-shadow)" fill="url(#island-fill)" d="M111 9 C89 11 73 29 66 51 C58 77 45 105 35 139 C25 174 28 207 42 240 C54 269 69 301 79 338 C88 371 101 405 111 412 C123 404 141 374 151 341 C162 306 177 269 184 232 C192 193 186 153 173 119 C162 86 149 53 137 29 C130 16 121 9 111 9 Z"/>
      <path className="mapContour" d="M67 81 C91 95 128 94 159 76 M45 171 C81 185 135 180 181 153 M54 262 C89 248 140 251 168 275 M82 340 C103 327 129 331 148 346"/>
      <path className="centralHills" d="M79 224 L102 175 L119 208 L135 169 L154 232 Z"/>
      {locations.map((location) => <g key={location.id} className={selectedId === location.id ? 'mapMarker active' : 'mapMarker'} onClick={() => onSelect(location.id)} role="button" tabIndex={0} aria-label={`Select ${location.name}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(location.id) }}><circle cx={location.mapX} cy={location.mapY} r="11"/><circle className="markerCore" cx={location.mapX} cy={location.mapY} r="4"/></g>)}
    </svg>
    <span className="mapNorth">N</span><span className="mapCaption">Stylised planning map · positions approximate</span>
  </div>;
}
