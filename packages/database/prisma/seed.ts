import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.destination.upsert({
    where: { slug: 'bomburu-ella' },
    update: {},
    create: {
      slug: 'bomburu-ella', name: 'Bomburu Ella', district: 'Nuwara Eliya', category: 'Waterfall',
      summary: 'A forest waterfall with a final walking section where recent ground conditions matter.',
      latitude: 6.9429, longitude: 80.8287, walkingMeters: 1400, walkingDifficulty: 'MODERATE', confidenceScore: 84, published: true,
      segments: { create: [
        { order: 1, type: 'MAIN_ROAD', title: 'Welimada approach', distanceMeters: 8200, surface: 'Paved', difficulty: 'EASY', instructionEn: 'Follow the main road toward Perawella.', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], lastConfirmedAt: new Date('2026-08-08') },
        { order: 2, type: 'FINAL_ROAD', title: 'Village access road', distanceMeters: 2100, surface: 'Narrow paved and broken edges', difficulty: 'MODERATE', instructionEn: 'Continue slowly and give way at narrow bends.', suitableVehicles: ['STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], lastConfirmedAt: new Date('2026-08-08') },
        { order: 3, type: 'PARKING', title: 'Community parking', distanceMeters: 0, surface: 'Compacted earth', difficulty: 'EASY', instructionEn: 'Park at the signed community area; do not block homes.', suitableVehicles: ['LOW_CLEARANCE_CAR','STANDARD_CAR','HIGH_CLEARANCE_CAR','SUV_4X4','MOTORBIKE','TUK_TUK','VAN'], lastConfirmedAt: new Date('2026-08-08') },
        { order: 4, type: 'TRAIL', title: 'Forest footpath', distanceMeters: 1400, surface: 'Soil, roots and steps', difficulty: 'MODERATE', instructionEn: 'Use the marked forest path; rocks may be slippery after rain.', suitableVehicles: [], lastConfirmedAt: new Date('2026-08-08') }
      ] }
    }
  });
}

main().finally(() => prisma.$disconnect());

