# HTTP API outline

Base path: `/v1`. JSON is used for requests and responses.

## Implemented starter endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Service health |
| GET | `/v1/destinations` | Search/filter published destinations |
| GET | `/v1/destinations/:slug` | Full Access Intelligence Profile |
| POST | `/v1/assessments/can-i-go` | Explainable personalised reachability result |
| POST | `/v1/ask-buddy` | Evidence-labelled starter response |

### Assessment request

```json
{
  "destinationId": "dst_bomburu_ella",
  "vehicleCategory": "LOW_CLEARANCE_CAR",
  "passengerCount": 5,
  "maxWalkingDistanceMeters": 2000,
  "travellingWithChildren": false,
  "travellingWithElderly": true
}
```

### Assessment response

```json
{
  "outcome": "ALTERNATIVE_TRANSPORT_RECOMMENDED",
  "headline": "Use alternative transport for the final road.",
  "reasons": ["Your selected vehicle is not confirmed for the final access road."],
  "evidenceUpdatedAt": "2026-08-08T09:30:00.000Z",
  "confidenceScore": 84,
  "disclaimer": "Travel Buddy Reach provides evidence-based guidance, not a safety guarantee. Confirm local conditions before travel."
}
```

## Next endpoints

- `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- `/me`, `/me/vehicle-passport`, `/me/saved-destinations`
- `/destinations/:id/journeys`, `/destinations/:id/conditions`, `/destinations/:id/questions`
- `/journeys/verify`, using privacy-trimmed evidence
- `/reports`, `/blocks`, `/notifications`
- `/moderation/queue`, `/moderation/decisions`, `/audit-logs`
- `/destinations/:id/responsible-reveal`

All write endpoints require authentication, idempotency keys for retried submissions, rate limits, and audit events for moderator operations.

