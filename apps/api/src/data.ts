import type { Destination } from '@travel-buddy/contracts';

export const destinations: Destination[] = [
  {
    id: 'dst_bomburu_ella', slug: 'bomburu-ella', name: 'Bomburu Ella', district: 'Nuwara Eliya', category: 'Waterfall',
    summary: 'A broad forest waterfall reached by a narrow village road and a moderate footpath.',
    latitude: 6.9429, longitude: 80.8287, walkingDistanceMeters: 1400, walkingDifficulty: 'MODERATE', confidenceScore: 84,
    status: 'MUDDY', statusUpdatedAt: '2026-08-08T09:30:00.000Z',
    facilities: ['Community parking', 'Small food stalls', 'Ticket counter'],
    cautions: ['Forest rocks become slippery after rain', 'Final road has narrow passing points'],
    sourceSummary: { verifiedJourneys: 14, communityReports: 6, officialSources: 1 },
    accessSegments: [
      { id: 'be-1', order: 1, type: 'MAIN_ROAD', title: 'Welimada approach', distanceMeters: 8200, surface: 'Paved', difficulty: 'EASY', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Follow the main road toward Perawella.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
      { id: 'be-2', order: 2, type: 'FINAL_ROAD', title: 'Village access road', distanceMeters: 2100, surface: 'Narrow paved road with broken edges', difficulty: 'MODERATE', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Continue slowly; give way before narrow bends.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
      { id: 'be-3', order: 3, type: 'PARKING', title: 'Community parking', distanceMeters: 0, surface: 'Compacted earth', difficulty: 'EASY', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], instruction: 'Use the signed parking area and keep residential gates clear.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
      { id: 'be-4', order: 4, type: 'TRAIL', title: 'Forest footpath', distanceMeters: 1400, surface: 'Soil, roots and stone steps', difficulty: 'MODERATE', suitableVehicles: [], instruction: 'Take the marked path beyond the ticket point.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' },
      { id: 'be-5', order: 5, type: 'DESTINATION', title: 'Waterfall viewing area', distanceMeters: 0, surface: 'Wet rock and soil', difficulty: 'MODERATE', suitableVehicles: [], instruction: 'Stay within the viewing area and follow local restrictions.', lastConfirmedAt: '2026-08-08T09:30:00.000Z' }
    ]
  },
  {
    id: 'dst_liptons_seat', slug: 'liptons-seat', name: "Lipton's Seat", district: 'Badulla', category: 'Viewpoint',
    summary: 'A highland viewpoint with a steep estate road and early-morning public transport options.',
    latitude: 6.7781, longitude: 81.0153, walkingDistanceMeters: 350, walkingDifficulty: 'EASY', confidenceScore: 76,
    status: 'OPEN', statusUpdatedAt: '2026-08-04T06:15:00.000Z',
    facilities: ['Ticket counter', 'Tea kiosk', 'Limited parking'],
    cautions: ['Visibility can change quickly', 'Road is narrow near the top'],
    sourceSummary: { verifiedJourneys: 9, communityReports: 4, officialSources: 1 },
    accessSegments: [
      { id: 'ls-1', order: 1, type: 'MAIN_ROAD', title: 'Haputale to Dambatenne', distanceMeters: 10500, surface: 'Paved', difficulty: 'MODERATE', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN','PUBLIC_TRANSPORT'], instruction: 'Pass Dambatenne Tea Factory and continue through the estate.', lastConfirmedAt: '2026-08-04T06:15:00.000Z' },
      { id: 'ls-2', order: 2, type: 'FINAL_ROAD', title: 'Summit road', distanceMeters: 3600, surface: 'Narrow paved estate road', difficulty: 'MODERATE', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK'], instruction: 'Use a low gear and expect oncoming tuk-tuks.', lastConfirmedAt: '2026-08-04T06:15:00.000Z' },
      { id: 'ls-3', order: 3, type: 'PARKING', title: 'Summit parking', distanceMeters: 0, surface: 'Gravel', difficulty: 'EASY', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK'], instruction: 'Park only in the marked limited area.', lastConfirmedAt: '2026-08-04T06:15:00.000Z' },
      { id: 'ls-4', order: 4, type: 'TRAIL', title: 'Viewpoint path', distanceMeters: 350, surface: 'Compacted soil', difficulty: 'EASY', suitableVehicles: [], instruction: 'Walk uphill from the parking area to the viewpoint.', lastConfirmedAt: '2026-08-04T06:15:00.000Z' }
    ]
  }
];

