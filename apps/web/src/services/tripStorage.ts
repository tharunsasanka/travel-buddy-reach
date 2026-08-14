import { starterLocations } from '../data/starterLocations';
import type { TripLocation } from '../types/trip';

const STORAGE_KEY = 'travel-buddy-reach:trip-locations:v1';

export function loadTripLocations(): TripLocation[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return starterLocations;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return starterLocations;
    return (parsed as Array<TripLocation & { mapX?: number; mapY?: number }>).map((location) => {
      if (Number.isFinite(location.latitude) && Number.isFinite(location.longitude)) return location;
      const starter = starterLocations.find((item) => item.id === location.id);
      return { ...location, latitude: starter?.latitude ?? 7.8731, longitude: starter?.longitude ?? 80.7718 };
    });
  } catch {
    return starterLocations;
  }
}

export function saveTripLocations(locations: TripLocation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch {
    // The planner remains usable when private browsing blocks storage.
  }
}

export function restoreStarterLocations() {
  saveTripLocations(starterLocations);
  return starterLocations;
}

export function createLocationId(name: string) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'destination';
  return `${slug}-${Date.now().toString(36)}`;
}
