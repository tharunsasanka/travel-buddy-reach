import type { Destination } from '@travel-buddy/contracts';

export const demoDestination: Destination = {
  id: 'dst_bomburu_ella', slug: 'bomburu-ella', name: 'Bomburu Ella', district: 'Nuwara Eliya', category: 'Waterfall', summary: 'A broad forest waterfall.', latitude: 6.9429, longitude: 80.8287,
  walkingDistanceMeters: 1400, walkingDifficulty: 'MODERATE', confidenceScore: 84, status: 'MUDDY', statusUpdatedAt: '2026-08-08T09:30:00.000Z', facilities: ['Community parking'], cautions: ['Slippery after rain'], sourceSummary: { verifiedJourneys: 14, communityReports: 6, officialSources: 1 },
  accessSegments: [
    { id: '1', order: 1, type: 'MAIN_ROAD', title: 'Welimada approach', distanceMeters: 8200, surface: 'Paved', difficulty: 'EASY', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Follow the road toward Perawella.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
    { id: '2', order: 2, type: 'FINAL_ROAD', title: 'Village access road', distanceMeters: 2100, surface: 'Broken edge', difficulty: 'MODERATE', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Continue slowly.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
    { id: '3', order: 3, type: 'PARKING', title: 'Community parking', distanceMeters: 0, surface: 'Earth', difficulty: 'EASY', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Use the signed area.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
    { id: '4', order: 4, type: 'TRAIL', title: 'Forest footpath', distanceMeters: 1400, surface: 'Soil & roots', difficulty: 'MODERATE', suitableVehicles: [], instruction: 'Take the marked path.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
    { id: '5', order: 5, type: 'DESTINATION', title: 'Waterfall', distanceMeters: 0, surface: 'Wet rock', difficulty: 'MODERATE', suitableVehicles: [], instruction: 'Stay in the viewing area.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' }
  ]
};

