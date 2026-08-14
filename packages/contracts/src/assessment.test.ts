import { describe, expect, it } from 'vitest';
import { assessReachability } from './assessment.js';
import type { Destination } from './types.js';

const destination: Destination = {
  id: 'd1', slug: 'test-falls', name: 'Test Falls', district: 'Kandy', category: 'Waterfall', summary: 'Test',
  latitude: 7.2, longitude: 80.6, walkingDistanceMeters: 800, walkingDifficulty: 'MODERATE', confidenceScore: 82,
  status: 'OPEN', statusUpdatedAt: '2026-08-10T08:00:00.000Z', facilities: [], cautions: [],
  sourceSummary: { verifiedJourneys: 5, communityReports: 2, officialSources: 1 },
  accessSegments: [{ id: 's1', order: 1, type: 'FINAL_ROAD', title: 'Final road', distanceMeters: 1800, surface: 'Gravel', difficulty: 'MODERATE', suitableVehicles: ['SUV_4X4', 'MOTORBIKE'], instruction: 'Continue slowly.', lastConfirmedAt: '2026-08-10T08:00:00.000Z' }]
};

describe('assessReachability', () => {
  it('recommends alternative transport when the vehicle is unsuitable', () => {
    const result = assessReachability(destination, { destinationId: 'd1', vehicleCategory: 'LOW_CLEARANCE_CAR', passengerCount: 2, maxWalkingDistanceMeters: 2000, travellingWithChildren: false, travellingWithElderly: false }, new Date('2026-08-14'));
    expect(result.outcome).toBe('ALTERNATIVE_TRANSPORT_RECOMMENDED');
  });

  it('blocks a closed destination', () => {
    const result = assessReachability({ ...destination, status: 'CLOSED' }, { destinationId: 'd1', vehicleCategory: 'SUV_4X4', passengerCount: 2, maxWalkingDistanceMeters: 2000, travellingWithChildren: false, travellingWithElderly: false }, new Date('2026-08-14'));
    expect(result.outcome).toBe('CURRENTLY_UNSUITABLE');
  });
});

