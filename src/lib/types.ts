export type Tour = {
  id: string;
  title: string;
  destination: string;
  date: string; 
  duration: string; 
  price: number;
  description: string;
  longDescription?: string;
  itinerary: { day: number; title: string; description: string }[];
  accommodation: string;
  pointsOfInterest: string[];
  image: string; // an ID from placeholder-images.json
  videoUrl?: string;
  distance?: number;
  level?: string;
  rating?: number;
  status?: string;
  fullDate?: string;
  driveType?: string;
  driveCategory?: string;
  brochureUrl?: string;
};

export type Testimonial = {
  id: string;
  rating: number;
  text: string;
  author: string;
  authorTitle: string;
  avatarId: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  content: string;
};
