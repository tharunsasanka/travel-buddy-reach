import type { DestinationCategory, TripLocation } from '../types/trip';

const API_BASE = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const TRIP_ID_KEY = 'travel-buddy-reach:cloud-trip-id:v1';

export const cloudEnabled = Boolean(API_BASE);

type CloudTrip = { id: string; name: string; stops: Array<TripLocation & { category: string }> };

function normaliseTrip(trip: CloudTrip): TripLocation[] {
  return trip.stops.map((stop) => ({ ...stop, category: stop.category as DestinationCategory }));
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers: { 'content-type': 'application/json', ...init?.headers } });
  if (!response.ok) throw new Error(`Cloud request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}

export async function loadCloudTrip() {
  if (!cloudEnabled) return null;
  const id = localStorage.getItem(TRIP_ID_KEY);
  if (!id) return null;
  try {
    const trip = await request(`/trips/${encodeURIComponent(id)}`) as CloudTrip;
    return normaliseTrip(trip);
  } catch {
    localStorage.removeItem(TRIP_ID_KEY);
    return null;
  }
}

export async function syncCloudTrip(locations: TripLocation[]) {
  if (!cloudEnabled) throw new Error('Cloud API is not configured');
  const id = localStorage.getItem(TRIP_ID_KEY);
  const payload = JSON.stringify({ name: 'Our Sri Lanka journey', stops: locations });
  let trip: CloudTrip;
  try {
    trip = await request(id ? `/trips/${encodeURIComponent(id)}` : '/trips', { method: id ? 'PUT' : 'POST', body: payload }) as CloudTrip;
  } catch (error) {
    if (!id) throw error;
    trip = await request('/trips', { method: 'POST', body: payload }) as CloudTrip;
  }
  localStorage.setItem(TRIP_ID_KEY, trip.id);
  return { id: trip.id, locations: normaliseTrip(trip) };
}
