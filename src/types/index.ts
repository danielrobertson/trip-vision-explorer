
export interface TimestampType {
  seconds: number;
  formatted: string;
}

export interface AttractionType {
  id: string;
  name: string;
  description: string;
  category: 'Landmark' | 'Cultural' | 'Restaurant' | 'Nature';
  timestamp: TimestampType;
  screenshot: string;
  relevanceScore: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
