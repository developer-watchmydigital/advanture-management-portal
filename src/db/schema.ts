import {
  pgTable,
  text,
  varchar,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
  uuid
} from 'drizzle-orm/pg-core';

// ----------------------------------------------------
// 1. ADMIN USERS TABLE
// ----------------------------------------------------
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).default('superadmin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 2. REGISTERED APP USERS TABLE
// ----------------------------------------------------
export const appUsers = pgTable('app_users', {
  id: text('id').primaryKey(), // Firebase UID or generated string
  displayName: text('display_name').notNull(),
  email: text('email'),
  phone: varchar('phone', { length: 20 }),
  photoUrl: text('photo_url'),
  loginMethod: varchar('login_method', { length: 20 }).notNull(), // 'email' | 'phone' | 'google'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow(),
});

// ----------------------------------------------------
// 3. USER LOGIN LOGS TABLE
// ----------------------------------------------------
export const loginLogs = pgTable('login_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id'),
  userName: text('user_name').notNull(),
  userEmail: text('user_email'),
  userPhone: varchar('user_phone', { length: 20 }),
  loginMethod: varchar('login_method', { length: 20 }).notNull(),
  hasBooked: boolean('has_booked').default(false).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// ----------------------------------------------------
// 4. TOURS TABLE
// ----------------------------------------------------
export const tours = pgTable('tours', {
  id: text('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: text('title').notNull(),
  tagline: text('tagline'),
  price: integer('price').notNull(),
  originalPrice: integer('original_price').notNull(),
  discount: varchar('discount', { length: 20 }),
  duration: varchar('duration', { length: 100 }).notNull(),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('4.90'),
  reviewCount: integer('review_count').default(0),
  heroMedia: text('hero_media').notNull(),
  thumbnails: jsonb('thumbnails').$type<[string, string, string]>().notNull(),
  mediaGallery: jsonb('media_gallery').$type<string[]>(),
  videos: jsonb('videos').$type<string[]>(),
  description: text('description').notNull(),
  placesCovered: jsonb('places_covered').$type<string[]>().notNull(),
  tourRoute: text('tour_route'),
  timings: varchar('timings', { length: 100 }),
  inclusions: jsonb('inclusions').$type<string[]>().notNull(),
  exclusions: jsonb('exclusions').$type<string[]>(),
  itinerary: jsonb('itinerary').$type<Array<{
    id?: string;
    time?: string;
    title: string;
    description: string;
    photo?: string;
  }>>(),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 5. BOOKINGS & PAYMENTS TABLE
// ----------------------------------------------------
export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  tourId: text('tour_id'), // Supports regular tour IDs & casino venue package IDs (e.g. 'casino-deltin-royale-elite')
  tourTitle: text('tour_title').notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  guestCount: integer('guest_count').default(1).notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: varchar('customer_phone', { length: 25 }).notNull(),
  pickupLocation: text('pickup_location'),
  specialRequirements: text('special_requirements'),
  status: varchar('status', { length: 25 }).default('pending').notNull(), // 'pending' | 'contacted' | 'booked' | 'cancelled' | 'refunded'
  paymentMode: varchar('payment_mode', { length: 25 }).default('cod'), // 'cod' | 'prepaid' | 'advance_30'
  paymentStatus: varchar('payment_status', { length: 25 }).default('pending'), // 'pending' | 'partial_paid' | 'collected'
  amount: integer('amount').notNull(),
  advancePaid: integer('advance_paid').default(0),
  balanceDue: integer('balance_due').default(0),
  
  // Razorpay Gateway Verification Fields
  razorpayOrderId: text('razorpay_order_id'),
  razorpayPaymentId: text('razorpay_payment_id'),
  razorpaySignature: text('razorpay_signature'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 6. CASINO VENUES & PACKAGES TABLES
// ----------------------------------------------------
export const casinoVenues = pgTable('casino_venues', {
  id: text('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  effectiveDate: text('effective_date'),
  tagline: text('tagline'),
  image: text('image'),
  generalInclusions: jsonb('general_inclusions').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const casinoPackages = pgTable('casino_packages', {
  id: text('id').primaryKey(),
  venueId: text('venue_id').references(() => casinoVenues.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  otpcWorth: integer('otpc_worth').default(0),
  liquorTypeLabel: text('liquor_type_label'),
  drinkCategories: jsonb('drink_categories').$type<Array<{
    category: string;
    items: string[];
  }>>(),
  accessTags: jsonb('access_tags').$type<string[]>(),
  ageRange: varchar('age_range', { length: 50 }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 7. REVIEWS TABLE
// ----------------------------------------------------
export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  author: text('author').notNull(),
  avatar: text('avatar'),
  tourName: text('tour_name').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'approved' | 'pending'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 8. HERO SLIDES TABLE
// ----------------------------------------------------
export const heroSlides = pgTable('hero_slides', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  badge: text('badge'),
  mediaType: varchar('media_type', { length: 10 }).notNull(), // 'image' | 'video'
  mediaUrl: text('media_url').notNull(),
  ctaText: text('cta_text'),
  ctaLink: text('cta_link'),
  sortOrder: integer('sort_order').default(0),
});

// ----------------------------------------------------
// 9. CINEMATIC SHOWCASE CMS TABLE
// ----------------------------------------------------
export const cinematicShowcase = pgTable('cinematic_showcase', {
  id: integer('id').primaryKey(),
  videoUrl: text('video_url').notNull(),
  badge: text('badge'),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  activities: jsonb('activities').$type<string[]>(),
  stats: jsonb('stats').$type<{
    toursCompleted: string;
    happyExplorers: string;
    safetyRating: string;
  }>(),
  previewCard: jsonb('preview_card').$type<{
    title: string;
    location: string;
    image: string;
  }>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ----------------------------------------------------
// 10. GALLERY ITEMS TABLE
// ----------------------------------------------------
export const galleryItems = pgTable('gallery_items', {
  id: text('id').primaryKey(),
  tourSlug: varchar('tour_slug', { length: 100 }),
  tourTitle: text('tour_title'),
  image: text('image').notNull(),
  mediaType: varchar('media_type', { length: 10 }).default('image'),
  spanClass: text('span_class'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
