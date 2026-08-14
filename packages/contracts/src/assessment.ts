import type { AssessmentRequest, AssessmentResult, Destination } from './types.js';

const DAY = 86_400_000;

export function assessReachability(destination: Destination, request: AssessmentRequest, now = new Date()): AssessmentResult {
  const reasons: string[] = [];
  const evidenceAgeDays = Math.floor((now.getTime() - new Date(destination.statusUpdatedAt).getTime()) / DAY);
  const vehicleBlocked = destination.accessSegments
    .filter((segment) => segment.type === 'FINAL_ROAD')
    .some((segment) => !segment.suitableVehicles.includes(request.vehicleCategory));

  let outcome: AssessmentResult['outcome'] = 'SUITABLE';

  if (['CLOSED', 'RESTRICTED', 'FLOODED'].includes(destination.status)) {
    outcome = 'CURRENTLY_UNSUITABLE';
    reasons.push(`The current destination status is ${destination.status.toLowerCase().replace('_', ' ')}.`);
  } else if (evidenceAgeDays > 60 || destination.confidenceScore < 40) {
    outcome = 'INSUFFICIENT_RECENT_INFORMATION';
    reasons.push(`The newest access status is ${evidenceAgeDays} days old or has low confidence.`);
  } else if (vehicleBlocked) {
    outcome = 'ALTERNATIVE_TRANSPORT_RECOMMENDED';
    reasons.push('Your selected vehicle is not confirmed for the final access road.');
  } else if (destination.walkingDistanceMeters > request.maxWalkingDistanceMeters) {
    outcome = 'CURRENTLY_UNSUITABLE';
    reasons.push(`The ${destination.walkingDistanceMeters} m walk exceeds your ${request.maxWalkingDistanceMeters} m limit.`);
  } else if (destination.walkingDifficulty === 'DIFFICULT' && (request.travellingWithChildren || request.travellingWithElderly)) {
    outcome = 'SUITABLE_WITH_CAUTION';
    reasons.push('The walking section is difficult for a group travelling with children or elderly people.');
  } else if (['MUDDY', 'SLIPPERY', 'ROAD_DAMAGED', 'UNCERTAIN'].includes(destination.status)) {
    outcome = 'SUITABLE_WITH_CAUTION';
    reasons.push(`Recent reports mark the access as ${destination.status.toLowerCase().replace('_', ' ')}.`);
  } else {
    reasons.push('Your vehicle is confirmed for the final road.');
    reasons.push(`The ${destination.walkingDistanceMeters} m walk is within your selected limit.`);
  }

  const headline: Record<AssessmentResult['outcome'], string> = {
    SUITABLE: 'Your current profile appears suitable.',
    SUITABLE_WITH_CAUTION: 'You may be able to go, with extra caution.',
    ALTERNATIVE_TRANSPORT_RECOMMENDED: 'Use alternative transport for the final road.',
    INSUFFICIENT_RECENT_INFORMATION: 'Recent evidence is not strong enough.',
    CURRENTLY_UNSUITABLE: 'This trip is currently unsuitable for your profile.'
  };

  return {
    outcome,
    headline: headline[outcome],
    reasons,
    evidenceUpdatedAt: destination.statusUpdatedAt,
    confidenceScore: destination.confidenceScore,
    disclaimer: 'Travel Buddy Reach provides evidence-based guidance, not a safety guarantee. Confirm local conditions before travel.'
  };
}

