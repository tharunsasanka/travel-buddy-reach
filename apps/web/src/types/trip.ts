export const destinationCategories = ['Waterfall', 'Viewpoint', 'Hike', 'Forest', 'Beach', 'Culture', 'Other'] as const;

export type DestinationCategory = (typeof destinationCategories)[number];

export type TripLocation = {
  id: string;
  name: string;
  district: string;
  category: DestinationCategory;
  day: string;
  plannedDate: string;
  access: string;
  walk: string;
  parking: string;
  condition: string;
  confidence: number;
  mapX: number;
  mapY: number;
  note: string;
};

export type TripLocationDraft = Omit<TripLocation, 'id'>;
