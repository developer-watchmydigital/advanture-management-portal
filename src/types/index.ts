export interface ItineraryItem {
  id?: string;
  time?: string;
  title: string;
  description: string;
  photo?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discount: string;
  duration: string;
  rating: number;
  reviewCount: number;
  heroMedia: string;
  thumbnails: [string, string, string]; // preview photos
  mediaGallery?: string[]; // up to 6 photos/videos
  description: string;
  placesCovered: string[];
  tourRoute: string;
  timings: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryItem[];
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  tourName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending';
}

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string;
  guestCount: number;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  specialRequirements: string;
  status: 'pending' | 'contacted' | 'booked' | 'cancelled';
  paymentMode?: 'cod' | 'prepaid';
  paymentStatus?: 'pending' | 'collected';
  amount?: number;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaText: string;
  ctaLink: string;
}

export interface CinematicShowcaseData {
  videoUrl: string;
  badge: string;
  title: string;
  subtitle: string;
  activities: string[]; // max 8
  stats: {
    toursCompleted: string;
    happyExplorers: string;
    safetyRating: string;
  };
  previewCard: {
    title: string;
    location: string;
    image: string;
  };
}

export interface GalleryItem {
  id: string;
  tourSlug: string;
  tourTitle: string;
  image: string;
  mediaType?: 'image' | 'video';
  spanClass?: string;
}
