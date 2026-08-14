import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { travelBuddyPrisma?: PrismaClient };

export const prisma = globalForPrisma.travelBuddyPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.travelBuddyPrisma = prisma;

export type { Prisma, Trip, TripStop } from '@prisma/client';
