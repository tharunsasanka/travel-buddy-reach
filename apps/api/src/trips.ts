import type { FastifyInstance } from 'fastify';
import { prisma } from '@travel-buddy/database';
import { z } from 'zod';
import { requireUser } from './auth.js';

const stopSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).max(120),
  district: z.string().trim().min(1).max(80),
  category: z.string().trim().min(1).max(40),
  day: z.string().trim().min(1).max(40),
  plannedDate: z.string().date().or(z.literal('')),
  latitude: z.number().min(5.8).max(10),
  longitude: z.number().min(79.5).max(82),
  access: z.string().trim().min(1).max(300),
  walk: z.string().trim().min(1).max(160),
  parking: z.string().trim().min(1).max(240),
  condition: z.string().trim().min(1).max(240),
  confidence: z.number().int().min(0).max(100),
  note: z.string().trim().min(1).max(1000)
});

const tripSchema = z.object({ name: z.string().trim().min(1).max(120).default('Our Sri Lanka journey'), stops: z.array(stopSchema).max(100) });

function stopData(stop: z.infer<typeof stopSchema>, order: number) {
  return {
    order, name: stop.name, district: stop.district, category: stop.category, day: stop.day,
    plannedDate: stop.plannedDate ? new Date(`${stop.plannedDate}T00:00:00.000Z`) : null,
    latitude: stop.latitude, longitude: stop.longitude, access: stop.access, walk: stop.walk,
    parking: stop.parking, condition: stop.condition, confidence: stop.confidence, note: stop.note
  };
}

function tripResponse(trip: Awaited<ReturnType<typeof prisma.trip.findUniqueOrThrow>>) {
  const value = trip as typeof trip & { stops?: Array<Record<string, unknown>> };
  return { ...value, stops: (value.stops ?? []).map((stop) => ({ ...stop, latitude: Number(stop.latitude), longitude: Number(stop.longitude), plannedDate: stop.plannedDate ? new Date(String(stop.plannedDate)).toISOString().slice(0, 10) : '' })) };
}

export function registerTripRoutes(app: FastifyInstance) {
  app.addHook('onClose', async () => { await prisma.$disconnect(); });
  app.post('/v1/trips', async (request, reply) => {
    const ownerId = await requireUser(request, reply);
    if (!ownerId) return;
    const parsed = tripSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'INVALID_TRIP', details: parsed.error.flatten() });
    const trip = await prisma.trip.create({ data: { ownerId, name: parsed.data.name, stops: { create: parsed.data.stops.map(stopData) } }, include: { stops: { orderBy: { order: 'asc' } } } });
    return reply.code(201).send(tripResponse(trip));
  });

  app.get('/v1/trips/:id', async (request, reply) => {
    const ownerId = await requireUser(request, reply);
    if (!ownerId) return;
    const { id } = request.params as { id: string };
    const trip = await prisma.trip.findFirst({ where: { id, ownerId }, include: { stops: { orderBy: { order: 'asc' } } } });
    if (!trip) return reply.code(404).send({ error: 'TRIP_NOT_FOUND' });
    return tripResponse(trip);
  });

  app.put('/v1/trips/:id', async (request, reply) => {
    const ownerId = await requireUser(request, reply);
    if (!ownerId) return;
    const { id } = request.params as { id: string };
    const parsed = tripSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'INVALID_TRIP', details: parsed.error.flatten() });
    const exists = await prisma.trip.findFirst({ where: { id, ownerId }, select: { id: true } });
    if (!exists) return reply.code(404).send({ error: 'TRIP_NOT_FOUND' });
    const trip = await prisma.$transaction(async (tx) => {
      await tx.tripStop.deleteMany({ where: { tripId: id } });
      return tx.trip.update({ where: { id }, data: { name: parsed.data.name, stops: { create: parsed.data.stops.map(stopData) } }, include: { stops: { orderBy: { order: 'asc' } } } });
    });
    return tripResponse(trip);
  });

  app.delete('/v1/trips/:id', async (request, reply) => {
    const ownerId = await requireUser(request, reply);
    if (!ownerId) return;
    const { id } = request.params as { id: string };
    const deleted = await prisma.trip.deleteMany({ where: { id, ownerId } });
    if (!deleted.count) return reply.code(404).send({ error: 'TRIP_NOT_FOUND' });
    return reply.code(204).send();
  });
}
