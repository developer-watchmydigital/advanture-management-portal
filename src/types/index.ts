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
  thumbnails: [string, string, string]; // preview photos or videos
  mediaGallery?: string[]; // up to 6 photos
  videos?: string[]; // MP4 videos gallery
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

export interface CasinoDrinkCategory {
  category: string; // e.g. WHISKEY, VODKA, RUM, GIN, BRANDY, BEER, WINE, BREEZERS, ENERGY DRINKS
  items: string[];
}

export interface CasinoTierPackage {
  id: string;
  name: string; // e.g. 'CLASSIC package', 'PREMIUM package', 'ELITE package', 'LADIES CLASSIC package', 'Child / Teens'
  price: number;
  originalPrice?: number;
  otpcWorth: number; // e.g. 2000, 1000
  liquorTypeLabel: string; // e.g. 'UNLIMITED HOUSE BRAND LIQUOR', 'UNLIMITED IMFL LIQUOR', 'UNLIMITED IMPORTED LIQUOR'
  drinkCategories: CasinoDrinkCategory[];
  accessTags?: string[]; // e.g. ['Vegas', 'Sky Bar']
  note?: string;
  ageRange?: string; // e.g. '5 yrs - 11 yrs' or '12 yrs - 20 yrs'
  image?: string;
  serviceHighlights?: { title: string; description: string; photo: string }[];
}

export interface CasinoVenue {
  id: string;
  slug: string;
  name: string; // e.g. 'DELTIN ROYALE', 'DELTIN JAQK'
  location: string; // e.g. 'CASINO • PANJIM • GOA'
  effectiveDate: string; // e.g. 'Effective from 29th Sept 2025'
  tagline: string;
  image: string;
  generalInclusions: string[]; // e.g. ['UNLIMITED DINNER', 'UNLIMITED DRINKS*', 'LIVE ENTERTAINMENT']
  packages: CasinoTierPackage[];
}
