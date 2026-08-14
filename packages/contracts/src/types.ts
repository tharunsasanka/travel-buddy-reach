import { z } from 'zod';

export const vehicleCategories = ['LOW_CLEARANCE_CAR', 'STANDARD_CAR', 'HIGH_CLEARANCE_CAR', 'SUV_4X4', 'MOTORBIKE', 'TUK_TUK', 'VAN', 'PUBLIC_TRANSPORT'] as const;
export type VehicleCategory = (typeof vehicleCategories)[number];

export const conditionStatuses = ['OPEN', 'CLOSED', 'RESTRICTED', 'UNCERTAIN', 'CROWDED', 'PARKING_FULL', 'ROAD_DAMAGED', 'MUDDY', 'SLIPPERY', 'FLOODED', 'WEAK_SIGNAL', 'TRANSIT_DISRUPTED'] as const;
export type ConditionStatus = (typeof conditionStatuses)[number];

export const accessSegmentSchema = z.object({
  id: z.string(),
  order: z.number().int().positive(),
  type: z.enum(['MAIN_ROAD', 'FINAL_ROAD', 'PARKING', 'TRAIL', 'DESTINATION']),
  title: z.string(),
  distanceMeters: z.number().nonnegative(),
  surface: z.string(),
  difficulty: z.enum(['EASY', 'MODERATE', 'DIFFICULT']),
  suitableVehicles: z.array(z.enum(vehicleCategories)),
  instruction: z.string(),
  lastConfirmedAt: z.string().datetime()
});
export type AccessSegment = z.infer<typeof accessSegmentSchema>;

export const destinationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  district: z.string(),
  category: z.string(),
  summary: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  walkingDistanceMeters: z.number().nonnegative(),
  walkingDifficulty: z.enum(['EASY', 'MODERATE', 'DIFFICULT']),
  confidenceScore: z.number().min(0).max(100),
  status: z.enum(conditionStatuses),
  statusUpdatedAt: z.string().datetime(),
  accessSegments: z.array(accessSegmentSchema),
  facilities: z.array(z.string()),
  cautions: z.array(z.string()),
  sourceSummary: z.object({ verifiedJourneys: z.number().int().nonnegative(), communityReports: z.number().int().nonnegative(), officialSources: z.number().int().nonnegative() })
});
export type Destination = z.infer<typeof destinationSchema>;

export const assessmentRequestSchema = z.object({
  destinationId: z.string(),
  vehicleCategory: z.enum(vehicleCategories),
  passengerCount: z.number().int().min(1).max(20),
  maxWalkingDistanceMeters: z.number().nonnegative(),
  travellingWithChildren: z.boolean().default(false),
  travellingWithElderly: z.boolean().default(false)
});
export type AssessmentRequest = z.infer<typeof assessmentRequestSchema>;

export type AssessmentOutcome = 'SUITABLE' | 'SUITABLE_WITH_CAUTION' | 'ALTERNATIVE_TRANSPORT_RECOMMENDED' | 'INSUFFICIENT_RECENT_INFORMATION' | 'CURRENTLY_UNSUITABLE';
export interface AssessmentResult {
  outcome: AssessmentOutcome;
  headline: string;
  reasons: string[];
  evidenceUpdatedAt: string;
  confidenceScore: number;
  disclaimer: string;
}

