import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';
import { assessReachability, assessmentRequestSchema } from '@travel-buddy/contracts';
import { destinations } from './data.js';

export function buildApp() {
  const app = Fastify({ logger: process.env.NODE_ENV !== 'test' });
  app.register(helmet);
  app.register(cors, { origin: process.env.WEB_ORIGIN?.split(',') ?? ['http://localhost:5173'] });
  app.register(rateLimit, { max: 100, timeWindow: '1 minute' });

  app.get('/health', async () => ({ status: 'ok', service: 'travel-buddy-api', version: '0.1.0' }));

  app.get('/v1/destinations', async (request) => {
    const query = request.query as { q?: string; category?: string };
    const q = query.q?.toLowerCase();
    return destinations.filter((item) => (!q || `${item.name} ${item.district} ${item.category}`.toLowerCase().includes(q)) && (!query.category || item.category === query.category));
  });

  app.get('/v1/destinations/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const destination = destinations.find((item) => item.slug === slug);
    if (!destination) return reply.code(404).send({ error: 'DESTINATION_NOT_FOUND', message: 'Destination was not found.' });
    return destination;
  });

  app.post('/v1/assessments/can-i-go', async (request, reply) => {
    const parsed = assessmentRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'INVALID_REQUEST', details: parsed.error.flatten() });
    const destination = destinations.find((item) => item.id === parsed.data.destinationId);
    if (!destination) return reply.code(404).send({ error: 'DESTINATION_NOT_FOUND' });
    return assessReachability(destination, parsed.data);
  });

  app.post('/v1/ask-buddy', async (request, reply) => {
    const body = request.body as { destinationId?: string; question?: string };
    const destination = destinations.find((item) => item.id === body.destinationId);
    if (!destination || !body.question) return reply.code(400).send({ error: 'DESTINATION_AND_QUESTION_REQUIRED' });
    const parking = destination.accessSegments.find((segment) => segment.type === 'PARKING');
    return {
      answer: `${destination.name} currently has a ${destination.confidenceScore}% Journey Confidence Score. ${parking?.instruction ?? 'Parking information is not confirmed.'} The remaining walk is approximately ${destination.walkingDistanceMeters} m and is rated ${destination.walkingDifficulty.toLowerCase()}.`,
      evidence: { verified: destination.sourceSummary.verifiedJourneys, community: destination.sourceSummary.communityReports, official: destination.sourceSummary.officialSources, updatedAt: destination.statusUpdatedAt },
      disclaimer: 'This answer summarises current platform data and is not a safety guarantee.'
    };
  });

  return app;
}

