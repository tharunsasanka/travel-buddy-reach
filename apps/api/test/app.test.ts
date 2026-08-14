import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

const app = buildApp();
afterAll(() => app.close());

describe('API', () => {
  it('returns health status', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json().status).toBe('ok');
  });

  it('returns a Can I Go assessment', async () => {
    const response = await app.inject({ method: 'POST', url: '/v1/assessments/can-i-go', payload: { destinationId: 'dst_bomburu_ella', vehicleCategory: 'LOW_CLEARANCE_CAR', passengerCount: 2, maxWalkingDistanceMeters: 2000, travellingWithChildren: false, travellingWithElderly: false } });
    expect(response.statusCode).toBe(200);
    expect(response.json().outcome).toBe('ALTERNATIVE_TRANSPORT_RECOMMENDED');
  });
});

